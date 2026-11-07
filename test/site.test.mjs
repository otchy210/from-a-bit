import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { parseCapacityBits } from "../lib/capacity.mjs";
import { loadSite, validateSite } from "../lib/site.mjs";
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
    [({ items }) => { delete items[0].text.en; }, /Missing item translation/],
    [({ items }) => { items[0].capacityBits = 9007199254740992; }, /integer string/],
    [({ items }) => { items[0].graphic.count = 1000000000; }, /from 1 to 64/],
    [({ items }) => { items[0].graphic.type = "missing-image"; }, /graphic.type/],
    [({ items }) => { items[0].text.en.heading = []; }, /non-empty list/],
    [({ items }) => { items[0].sources = [{ label: "Source", url: "javascript:alert(1)" }]; }, /HTTPS/],
    [({ config }) => { config.origin += "/wrong-path"; }, /without a path/],
  ]) {
    const value = await fixture();
    mutate(value);
    assert.throws(() => validateSite(value.config, value.items), message);
  }
});

test("one page template renders both languages and exact capacity attributes", async () => {
  const { config, items } = await fixture();
  const exact = "123456789012345678901234567890";
  items[0].capacityBits = exact;
  const site = validateSite(config, items);
  for (const language of site.languages) {
    const html = new Page().render({ site, language });
    assert.ok(html.includes(`<html lang="${language}">`));
    assert.ok(html.includes(`rel="canonical" href="${site.origin}/${language}/"`));
    assert.ok(html.includes(`data-capacity-bits="${exact}"`));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.equal((html.match(/<section\b/g) || []).length, site.items.length);
    assert.equal((html.match(/<script\b/g) || []).length, 1);
    assert.equal((html.match(/rel="stylesheet"/g) || []).length, 1);
    assert.ok(html.includes(site.items[0].text[language].figure.caption));
  }
});

test("text and attribute values are escaped without losing the original content", async () => {
  const { config, items } = await fixture();
  const text = '<em title="quoted">A & B\'s</em>';
  const escaped = "&lt;em title=&quot;quoted&quot;&gt;A &amp; B&#39;s&lt;/em&gt;";
  config.locales.en.description = text;
  items[0].text.en.heading = [text];
  const html = new Page().render({ site: validateSite(config, items), language: "en" });
  assert.ok(html.includes(`content="${escaped}"`));
  assert.ok(html.includes(`>${escaped}</h1>`));
  assert.ok(!html.includes(text));
});

test("a new item participates in both pages and in next-section links", async () => {
  const { config, items } = await fixture();
  const item = structuredClone(items[1]);
  item.id = "another-capacity";
  items.splice(2, 0, item);
  const site = validateSite(config, items);
  for (const language of site.languages) {
    const html = new Page().render({ site, language });
    assert.ok(html.includes('id="another-capacity"'));
    assert.ok(html.includes('href="#another-capacity"'));
  }
});

test("the checked-in metadata loads as BigInt without changing the bounded graphic count", async () => {
  const site = await loadSite();
  assert.equal(site.items[0].capacityBits, 1n);
  assert.equal(site.items[1].capacityBits, 8n);
  assert.equal(typeof site.items[1].graphic.count, "number");
});
