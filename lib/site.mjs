import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { parseCapacityBits } from "./capacity.mjs";

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
  const url = new URL(value);
  requireValue(url.protocol === "https:", `${path} must use HTTPS.`);
  return url;
}

export function validateSite(config, items) {
  requireValue(config && typeof config === "object", "Site configuration is required.");
  requireText(config.name, "site.name");
  const origin = requireHttps(config.origin, "site.origin");
  requireValue(config.origin === origin.origin, "site.origin must be an origin without a path or trailing slash.");
  requireValue(/^#[0-9a-f]{6}$/i.test(config.themeColor), "site.themeColor must be a hex color.");
  const languages = ["ja", "en"];
  for (const language of languages) {
    const locale = config.locales?.[language];
    requireValue(locale && typeof locale === "object", `Missing site locale: ${language}.`);
    for (const field of ["name", "title", "description", "skipLink", "languageLabel", "backToStart"]) {
      requireText(locale[field], `site.locales.${language}.${field}`);
    }
  }

  requireValue(Array.isArray(items) && items.length > 0, "Items must be a non-empty list.");
  const ids = new Set();
  const normalizedItems = items.map((item, index) => {
    const path = `items[${index}]`;
    requireValue(item && typeof item === "object", `${path} must be an object.`);
    requireValue(typeof item.id === "string" && /^[a-z][a-z0-9-]*$/.test(item.id), `${path}.id is invalid.`);
    requireValue(item.id !== "main", `${path}.id is reserved.`);
    requireValue(!ids.has(item.id), `Duplicate item ID: ${item.id}.`);
    ids.add(item.id);
    requireValue(["capacity", "outlook"].includes(item.kind), `${path}.kind is invalid.`);

    let capacityBits = null;
    if (item.kind === "capacity") {
      try {
        capacityBits = parseCapacityBits(item.capacityBits);
      } catch (error) {
        throw new Error(`${path}.capacityBits: ${error.message}`);
      }
      requireValue(typeof item.graphic?.src === "string" && /^graphics\/[a-z0-9/_-]+\.svg$/.test(item.graphic.src),
        `${path}.graphic.src must reference an SVG inside assets/graphics/.`);
    } else {
      requireValue(item.capacityBits === undefined && item.graphic === undefined,
        `${path}: an outlook must not declare a capacity or graphic.`);
    }

    requireValue(Array.isArray(item.sources), `${path}.sources must be a list.`);
    for (const [sourceIndex, source] of item.sources.entries()) {
      requireText(source.label, `${path}.sources[${sourceIndex}].label`);
      requireHttps(source.url, `${path}.sources[${sourceIndex}].url`);
    }
    for (const language of languages) {
      const text = item.text?.[language];
      const textPath = `${path}.text.${language}`;
      requireValue(text && typeof text === "object", `Missing item translation: ${item.id}/${language}.`);
      requireLines(text.heading, `${textPath}.heading`);
      requireLines(text.description, `${textPath}.description`);
      if (text.note !== undefined) requireText(text.note, `${textPath}.note`);
    }
    return { ...item, capacityBits };
  });
  // Section IDs must not collide with the heading IDs derived from them.
  for (const id of ids) requireValue(!ids.has(`${id}-title`), `Item ID conflicts with a heading ID: ${id}-title.`);
  return { ...config, languages, items: normalizedItems };
}

export async function validateGraphics(site) {
  await Promise.all(site.items.filter((item) => item.graphic).map(async (item) => {
    const file = new URL(`../src/assets/${item.graphic.src}`, import.meta.url);
    let svg;
    try {
      svg = await readFile(file, "utf8");
    } catch {
      throw new Error(`Missing SVG graphic for ${item.id}: ${item.graphic.src}`);
    }
    requireValue(/<svg\b[^>]*\bviewBox\s*=/.test(svg), `Graphic for ${item.id} must be an SVG with a viewBox.`);
  }));
}

export async function loadSite() {
  const [config, items] = await Promise.all([
    readFile(new URL("../src/data/site.yaml", import.meta.url), "utf8"),
    readFile(new URL("../src/data/items.yaml", import.meta.url), "utf8"),
  ]);
  const site = validateSite(parse(config, { version: "1.2", uniqueKeys: true }), parse(items, { version: "1.2", uniqueKeys: true }));
  await validateGraphics(site);
  return site;
}
