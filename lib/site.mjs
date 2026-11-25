import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { parseCapacityBits } from "./capacity.mjs";
import { masterWidth } from "./graphics.mjs";

function requireValue(condition, message) {
  if (!condition) throw new Error(message);
}

function requireText(value, path) {
  requireValue(typeof value === "string" && value.trim().length > 0, `${path} must be non-empty text.`);
}

function requireLines(value, path) {
  requireValue(Array.isArray(value) && value.length > 0, `${path} must be a non-empty list.`);
  value.forEach((line, index) => requireText(line, `${path}[${index}]`));
}

function requireHttps(value, path) {
  requireText(value, path);
  requireValue(URL.canParse(value), `${path} must be an absolute HTTPS URL.`);
  const url = new URL(value);
  requireValue(url.protocol === "https:", `${path} must use HTTPS.`);
  return url;
}

function requireLinks(links, path) {
  requireValue(Array.isArray(links), `${path} must be a list.`);
  for (const [index, link] of links.entries()) {
    requireText(link?.label, `${path}[${index}].label`);
    requireHttps(link.url, `${path}[${index}].url`);
  }
}

function validateConfig(config) {
  requireValue(config && typeof config === "object", "Site configuration is required.");
  const origin = requireHttps(config.origin, "site.origin");
  requireValue(config.origin === origin.origin, "site.origin must be an origin without a path or trailing slash.");
  if (config.analyticsId !== undefined) {
    requireValue(typeof config.analyticsId === "string" && /^G-[A-Z0-9]+$/.test(config.analyticsId),
      "site.analyticsId must be a GA4 measurement ID.");
  }
  requireValue(/^#[0-9a-f]{6}$/i.test(config.themeColor), "site.themeColor must be a hex color.");
  for (const field of ["name", "title", "description", "socialImageAlt", "skipLink", "backToStart"]) {
    requireText(config[field], `site.${field}`);
  }
  requireText(config.authorName, "site.authorName");
  requireLinks(config.authorLinks, "site.authorLinks");
  if (config.capacityNotes !== undefined) {
    const notes = config.capacityNotes;
    requireValue(notes && typeof notes === "object", "site.capacityNotes must be an object.");
    requireText(notes.heading, "site.capacityNotes.heading");
    requireValue(Array.isArray(notes.entries) && notes.entries.length > 0, "site.capacityNotes.entries must be a non-empty list.");
    for (const [index, entry] of notes.entries.entries()) {
      const path = `site.capacityNotes.entries[${index}]`;
      requireText(entry?.heading, `${path}.heading`);
      requireText(entry?.description, `${path}.description`);
    }
  }
}

function normalizeItem(item, path) {
  requireValue(item && typeof item === "object", `${path} must be an object.`);
  requireValue(typeof item.id === "string" && /^[a-z][a-z0-9-]*$/.test(item.id), `${path}.id is invalid.`);
  requireValue(["capacity", "outlook"].includes(item.kind), `${path}.kind is invalid.`);

  let capacityBits = null;
  if (item.kind === "capacity") {
    try {
      capacityBits = parseCapacityBits(item.capacityBits);
    } catch (error) {
      throw new Error(`${path}.capacityBits: ${error.message}`);
    }
    requireValue(typeof item.graphic?.src === "string" && /^graphics\/[a-z][a-z0-9-]*\.webp$/.test(item.graphic.src),
      `${path}.graphic.src must reference a WebP inside assets/graphics/.`);
    if (item.graphic.alt !== undefined) requireText(item.graphic.alt, `${path}.graphic.alt`);
  } else {
    requireValue(item.capacityBits === undefined && item.graphic === undefined,
      `${path}: an outlook must not declare a capacity or graphic.`);
  }

  requireLinks(item.sources, `${path}.sources`);
  const text = item.text;
  const textPath = `${path}.text`;
  requireValue(text && typeof text === "object", `${textPath} is required.`);
  requireLines(text.heading, `${textPath}.heading`);
  requireLines(text.description, `${textPath}.description`);
  if (capacityBits !== null) {
    requireText(text.capacity, `${textPath}.capacity`);
    requireText(text.era, `${textPath}.era`);
  }
  if (text.note !== undefined) requireText(text.note, `${textPath}.note`);
  return { ...item, capacityBits };
}

export function validateSite(config, items) {
  validateConfig(config);
  requireValue(Array.isArray(items) && items.length > 0, "Items must be a non-empty list.");

  // Reserve page and heading anchors in the same namespace as chapter IDs.
  const ids = new Set(["main", "capacity-notes", "top", "new-window", "external-link"]);
  let previousCapacity = 0n;
  const normalizedItems = items.map((raw, index) => {
    const path = `items[${index}]`;
    const item = normalizeItem(raw, path);
    for (const id of [item.id, `${item.id}-title`]) {
      requireValue(!ids.has(id), `Duplicate item ID or reserved anchor: ${id}.`);
      ids.add(id);
    }
    if (item.capacityBits !== null) {
      requireValue(item.capacityBits >= previousCapacity, `${path}.capacityBits must be in ascending order.`);
      previousCapacity = item.capacityBits;
    }
    return item;
  });
  return { ...config, items: normalizedItems };
}

export async function validateGraphics(site) {
  await Promise.all(site.items.filter((item) => item.graphic).map(async (item) => {
    const file = new URL(`../src/assets/${item.graphic.src}`, import.meta.url);
    let metadata;
    try {
      metadata = await sharp(fileURLToPath(file)).metadata();
    } catch {
      throw new Error(`Missing or unreadable graphic for ${item.id}: ${item.graphic.src}`);
    }
    requireValue(metadata.format === "webp" && metadata.width === masterWidth && metadata.height === masterWidth && metadata.hasAlpha,
      `Graphic for ${item.id} must be a square ${masterWidth}px WebP with transparency.`);
  }));
}

async function readYaml(name) {
  const file = new URL(`../src/data/${name}.yaml`, import.meta.url);
  return parse(await readFile(file, "utf8"), { version: "1.2", uniqueKeys: true });
}

export async function loadSite() {
  const [config, items] = await Promise.all([readYaml("site"), readYaml("items")]);
  const site = validateSite(config, items);
  await validateGraphics(site);
  return site;
}
