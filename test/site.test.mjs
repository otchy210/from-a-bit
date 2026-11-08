import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { parseCapacityBits } from "../lib/capacity.mjs";
import { loadSite, validateSite, validateGraphics } from "../lib/site.mjs";
import { areaScale, cameraLog2, capacityLog2 } from "../lib/scale.mjs";
import Page from "../src/index.11ty.mjs";

async function fixture() {
  return {
    config: parse(await readFile(new URL("../src/data/site.yaml", import.meta.url), "utf8")),
    items: parse(await readFile(new URL("../src/data/items.yaml", import.meta.url), "utf8")),
  };
}

test("capacity parsing preserves integers beyond Number's range", () => {
  const exact = "12345678901234567890123456789012345678901234567890";
  assert.equal(parseCapacityBits(exact).toString(), exact);
  for (const value of [9007199254740992, "1.2", "1e30", "-1", "0", "", " 8", "08"]) {
    assert.throws(() => parseCapacityBits(value), /positive decimal integer string/);
  }
});

test("invalid metadata fails before it can be rendered", async () => {
  for (const [mutate, message] of [
    [({ items }) => { items[1].id = items[0].id; }, /Duplicate item ID/],
    [({ items }) => { delete items[0].text; }, /text is required/],
    [({ items }) => { items[0].capacityBits = 9007199254740992; }, /integer string/],
    [({ items }) => { items[0].graphic.src = "graphics/dots.png"; }, /graphic.src/],
    [({ items }) => { items[0].graphic.src = "graphics/../other.svg"; }, /graphic.src/],
    [({ items }) => { items[0].text.heading = []; }, /non-empty list/],
    [({ items }) => { items[0].sources = [{ label: "Source", url: "javascript:alert(1)" }]; }, /HTTPS/],
    [({ config }) => { config.origin += "/wrong-path"; }, /without a path/],
  ]) {
    const value = await fixture();
    mutate(value);
    assert.throws(() => validateSite(value.config, value.items), message);
  }
});

test("the Japanese root page has canonical assets and exact capacity attributes", async () => {
  const { config, items } = await fixture();
  const exact = "123456789012345678901234567890";
  items[0].capacityBits = exact;
  const site = validateSite(config, items);
  const html = new Page().render({ site });
  assert.ok(html.includes('<html lang="ja">'));
  assert.ok(html.includes(`rel="canonical" href="${site.origin}/"`));
  assert.ok(html.includes(`data-capacity-bits="${exact}"`));
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/<section\b/g) || []).length, site.items.length);
  assert.equal((html.match(/<script\b/g) || []).length, 1);
  assert.equal((html.match(/rel="stylesheet"/g) || []).length, 1);
  assert.ok(html.includes(site.items[0].text.description[0]));
  assert.ok(html.includes('src="assets/graphics/bit.svg"'));
  assert.ok(html.includes('href="assets/style.css"'));
  assert.ok(html.includes('src="assets/script.js"'));
  assert.equal(new Page().data().permalink, "index.html");
  assert.doesNotMatch(html, /figcaption|eyebrow|next-chapter|hreflang|language-nav|data-language-link/);
});

test("text and attribute values are escaped without losing the original content", async () => {
  const { config, items } = await fixture();
  const text = '<em title="quoted">A & B\'s</em>';
  const escaped = "&lt;em title=&quot;quoted&quot;&gt;A &amp; B&#39;s&lt;/em&gt;";
  config.description = text;
  items[0].text.heading = [text];
  const html = new Page().render({ site: validateSite(config, items) });
  assert.ok(html.includes(`content="${escaped}"`));
  assert.ok(html.includes(`>${escaped}</h1>`));
  assert.ok(!html.includes(text));
});

test("a new item participates in the page without separate label or navigation metadata", async () => {
  const { config, items } = await fixture();
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
});

test("missing SVG files are rejected during the build", async () => {
  const site = await loadSite();
  site.items[0].graphic = { src: "graphics/not-present.svg" };
  await assert.rejects(validateGraphics(site), /Missing SVG graphic/);
});

test("the camera preserves capacity area ratios throughout the transition", () => {
  const logs = [capacityLog2(1n), capacityLog2(8n)];
  assert.equal(areaScale(logs[0], cameraLog2(logs, 0)), 1);
  assert.equal(areaScale(logs[1], cameraLog2(logs, 1)), 1);
  for (const position of [0, 0.2, 0.5, 0.8, 1]) {
    const camera = cameraLog2(logs, position);
    const ratio = areaScale(logs[1], camera) / areaScale(logs[0], camera);
    assert.ok(Math.abs(ratio ** 2 - 8) < 1e-12);
  }
  const huge = capacityLog2(10n ** 1000n);
  assert.ok(Number.isFinite(huge));
  assert.ok(Math.abs(huge - 1000 * Math.log2(10)) < 1e-10);
  assert.equal(areaScale(huge, huge), 1);
});

test("bit and byte SVGs have equal reference ink areas", async () => {
  const areas = await Promise.all(["bit", "byte"].map(async (name) => {
    const svg = await readFile(new URL(`../src/assets/graphics/${name}.svg`, import.meta.url), "utf8");
    return [...svg.matchAll(/\br="([\d.]+)"/g)].reduce((sum, match) => sum + Math.PI * Number(match[1]) ** 2, 0);
  }));
  assert.ok(areas[0] > 0);
  assert.ok(Math.abs(areas[0] / areas[1] - 1) < 1e-10);
});
