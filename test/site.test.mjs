import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { capacityBoundaries, capacityFill, parseCapacityBits, visibleCapacityBands } from "../lib/capacity.mjs";
import { escapeHtml } from "../lib/html.mjs";
import { loadSite, validateSite, validateGraphics } from "../lib/site.mjs";
import Page from "../src/index.11ty.mjs";

const metadata = {
  config: parse(await readFile(new URL("../src/data/site.yaml", import.meta.url), "utf8")),
  items: parse(await readFile(new URL("../src/data/items.yaml", import.meta.url), "utf8")),
};

test("capacity parsing preserves integers beyond Number's range", () => {
  const exact = "12345678901234567890123456789012345678901234567890";
  assert.equal(parseCapacityBits(exact).toString(), exact);
  for (const value of [9007199254740992, "1.2", "1e30", "-1", "0", "", " 8", "08"]) {
    assert.throws(() => parseCapacityBits(value), /positive decimal integer string/);
  }
});

test("decimal capacity marks use exact bit thresholds and proportional positions", () => {
  assert.deepEqual(capacityBoundaries(7_999n, 1n), []);
  assert.deepEqual(capacityBoundaries(8_000n, 7_999n), [{ unit: "KB", percent: 100, crossed: false }]);
  assert.deepEqual(capacityBoundaries(8_008n, 8_000n), [{ unit: "KB", percent: 99.9000999, crossed: true }]);
  assert.deepEqual(capacityBoundaries(500_000n, 2_048n), [{ unit: "KB", percent: 1.6, crossed: true }]);
  assert.deepEqual(capacityBoundaries(16_000_000n, 8_000_001n), [
    { unit: "KB", percent: 0.05, crossed: false },
    { unit: "MB", percent: 50, crossed: false },
  ]);
});

test("capacity bars skip subpixel widths and restore visible bands when enlarged", () => {
  const boundaries = capacityBoundaries(16_000_000n);
  assert.equal(visibleCapacityBands(boundaries, 0.99), null);
  assert.equal(capacityFill(boundaries, visibleCapacityBands(boundaries, 1)), "var(--capacity-mb)");
  assert.equal(
    capacityFill(boundaries, visibleCapacityBands(boundaries, 400)),
    "linear-gradient(to right, var(--capacity-kb) 0%, var(--capacity-kb) 50%, var(--capacity-mb) 50%, var(--capacity-mb) 100%)",
  );
  assert.match(capacityFill(boundaries, visibleCapacityBands(boundaries, 2000)), /var\(--capacity-b\)/);

  const justOverKilobyte = capacityBoundaries(8_008n);
  assert.equal(capacityFill(justOverKilobyte, visibleCapacityBands(justOverKilobyte, 250)), "var(--capacity-b)");
});

test("invalid metadata fails before it can be rendered", () => {
  for (const [mutate, message] of [
    [({ items }) => { items[1].id = items[0].id; }, /Duplicate item ID/],
    [({ items }) => { items[0].id = "new-window"; }, /reserved anchor/],
    [({ items }) => { items[0].id = items[1].id + "-title"; }, /Duplicate item ID/],
    [({ items }) => { delete items[0].text; }, /text is required/],
    [({ items }) => { items[0].capacityBits = 9007199254740992; }, /integer string/],
    [({ items }) => { items[0].graphic.src = "graphics/dots.png"; }, /graphic.src/],
    [({ items }) => { items[0].graphic.src = "graphics/../other.svg"; }, /graphic.src/],
    [({ items }) => { items[0].text.heading = []; }, /non-empty list/],
    [({ items }) => { delete items[0].text.capacity; }, /text.capacity/],
    [({ items }) => { delete items[0].text.era; }, /text.era/],
    [({ items }) => { [items[1], items[2]] = [items[2], items[1]]; }, /ascending order/],
    [({ items }) => { items[0].sources = [{ label: "Source", url: "javascript:alert(1)" }]; }, /HTTPS/],
    [({ config }) => { config.origin += "/wrong-path"; }, /without a path/],
  ]) {
    const value = structuredClone(metadata);
    mutate(value);
    assert.throws(() => validateSite(value.config, value.items), message);
  }
});

test("the Japanese root page has canonical assets and exact capacity attributes", () => {
  const { config, items } = structuredClone(metadata);
  const exact = "123456789012345678901234567890";
  items.at(-1).capacityBits = exact;
  const site = validateSite(config, items);
  const html = new Page().render({ site });
  assert.ok(html.includes('<html lang="ja">'));
  assert.ok(html.includes(`rel="canonical" href="${site.origin}/"`));
  assert.ok(html.includes(`data-capacity-bits="${exact}"`));
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/<section\b/g) || []).length, site.items.length);
  assert.equal((html.match(/<script\b[^>]*\bsrc=/g) || []).length, 1);
  assert.equal((html.match(/rel="stylesheet"/g) || []).length, 1);
  assert.ok(html.includes(site.items[0].text.description[0]));
  assert.ok(html.includes(site.items.at(-1).text.era));
  assert.ok(html.includes(site.items.at(-1).text.capacity));
  assert.ok(html.includes('src="assets/graphics/bit.svg"'));
  assert.ok(html.includes('href="assets/style.css"'));
  assert.ok(html.includes('src="assets/script.js"'));
  assert.equal(new Page().data().permalink, "index.html");
  assert.doesNotMatch(html, /figcaption|eyebrow|next-chapter|hreflang|language-nav|data-language-link/);
});

test("the home page identifies the site and its canonical URL to search engines", () => {
  const site = validateSite(metadata.config, metadata.items);
  const html = new Page().render({ site });
  const data = html.match(/<script type="application\/ld\+json">([^<]*)<\/script>/)[1];
  assert.deepEqual(JSON.parse(data), {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: `${site.origin}/`,
  });
  assert.ok(html.includes('<link rel="icon" href="favicon.png" type="image/png" sizes="96x96">'));
});

test("all citations share an icon and an accessible new-window description", () => {
  const site = validateSite(metadata.config, metadata.items);
  const html = new Page().render({ site });
  const count = site.items.reduce((total, item) => total + item.sources.length, 0);
  assert.equal((html.match(/target="_blank" rel="noopener" aria-describedby="new-window"/g) ?? []).length, count);
  assert.equal((html.match(/<use href="#external-link"/g) ?? []).length, count);
  assert.equal((html.match(/id="external-link"/g) ?? []).length, 1);
  assert.equal((html.match(/id="new-window"/g) ?? []).length, 1);
});

test("the page advertises the same sized, accessible image on Open Graph and X", async () => {
  const site = validateSite(metadata.config, metadata.items);
  const html = new Page().render({ site });
  const imageUrl = `${site.origin}/assets/social-card.png`;
  const png = await readFile(new URL("../src/static/social-card.png", import.meta.url));
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  assert.ok(html.includes(`<meta property="og:url" content="${site.origin}/">`));
  assert.ok(html.includes(`<meta property="og:image" content="${imageUrl}">`));
  assert.ok(html.includes(`<meta name="twitter:image" content="${imageUrl}">`));
  assert.ok(html.includes('<meta name="twitter:card" content="summary_large_image">'));
  assert.ok(html.includes(`<meta property="og:image:width" content="${png.readUInt32BE(16)}">`));
  assert.ok(html.includes(`<meta property="og:image:height" content="${png.readUInt32BE(20)}">`));
  const alt = escapeHtml(site.socialImageAlt);
  assert.ok(html.includes(`<meta property="og:image:alt" content="${alt}">`));
  assert.ok(html.includes(`<meta name="twitter:image:alt" content="${alt}">`));
});

test("an outlook can provide prose without taking part in the capacity scale", () => {
  const { config, items } = structuredClone(metadata);
  items.push({ id: "outlook", kind: "outlook", text: { heading: ["展望"], description: ["本文"] }, sources: [] });
  const site = validateSite(config, items);
  assert.equal(site.items.at(-1).capacityBits, null);
  const html = new Page().render({ site });
  assert.match(html, /id="outlook" aria-labelledby="outlook-title">/);
  assert.match(html, /<h2 id="outlook-title">展望<\/h2>/);
});

test("text and attribute values are escaped without losing the original content", () => {
  const { config, items } = structuredClone(metadata);
  const text = '<em title="quoted">A & B\'s</em>';
  const escaped = "&lt;em title=&quot;quoted&quot;&gt;A &amp; B&#39;s&lt;/em&gt;";
  config.description = text;
  config.name = "Name </script>";
  items[0].text.heading = [text];
  const html = new Page().render({ site: validateSite(config, items) });
  assert.ok(html.includes(`content="${escaped}"`));
  assert.ok(html.includes(`>${escaped}</h1>`));
  assert.ok(!html.includes(text));
  const data = html.match(/<script type="application\/ld\+json">([^<]*)<\/script>/)[1];
  assert.equal(JSON.parse(data).name, config.name);
});

test("a new item participates in the page without separate label or navigation metadata", () => {
  const { config, items } = structuredClone(metadata);
  const item = structuredClone(items[1]);
  item.id = "another-capacity";
  items.splice(2, 0, item);
  const site = validateSite(config, items);
  const html = new Page().render({ site });
  assert.ok(html.includes('id="another-capacity"'));
  assert.ok(html.includes('id="another-capacity-title"'));
});

test("the checked-in metadata loads exact capacities and SVG references", async () => {
  const site = await loadSite();
  assert.equal(site.items[0].capacityBits, 1n);
  assert.equal(site.items[1].capacityBits, 8n);
  assert.equal(site.items[1].graphic.src, "graphics/byte.svg");
  assert.equal(site.items.find(({ id }) => id === "tape-library").capacityBits, 645120000000000000n);
  assert.equal(site.items.at(-1).id, "global-data-created");
  assert.equal(site.items.at(-1).capacityBits, 1747464000000000000000000n);
});

test("missing SVG files are rejected during the build", async () => {
  const site = await loadSite();
  site.items[0].graphic = { src: "graphics/not-present.svg" };
  await assert.rejects(validateGraphics(site), /Missing SVG graphic/);
});

test("bit and byte SVGs have equal reference ink areas", async () => {
  const areas = await Promise.all(["bit", "byte"].map(async (name) => {
    const svg = await readFile(new URL(`../src/assets/graphics/${name}.svg`, import.meta.url), "utf8");
    return [...svg.matchAll(/\br="([\d.]+)"/g)].reduce((sum, match) => sum + Math.PI * Number(match[1]) ** 2, 0);
  }));
  assert.ok(areas[0] > 0);
  assert.ok(Math.abs(areas[0] / areas[1] - 1) < 1e-10);
});
