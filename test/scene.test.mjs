import test from "node:test";
import assert from "node:assert/strict";
import { layoutScene, visibleLayers } from "../lib/scene.mjs";
import { areaScale, cameraLog2, capacityLog2, chapterOpacity } from "../lib/scale.mjs";

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

test("a passing chapter fades smoothly to zero while incoming chapters stay opaque", () => {
  assert.equal(chapterOpacity(-1.5), 1);
  assert.equal(chapterOpacity(0), 1);
  assert.equal(chapterOpacity(5), 0);
  assert.equal(chapterOpacity(6), 0);
  let previous = 1;
  for (let step = 1; step <= 500; step++) {
    const opacity = chapterOpacity(step / 100);
    assert.ok(opacity < previous && previous - opacity < 0.005);
    previous = opacity;
  }
});

test("a short viewport or a single chapter uses normal document flow", () => {
  assert.equal(layoutScene([250, 500], 400), null);
  assert.equal(layoutScene([180], 800), null);
  assert.equal(layoutScene([], 800), null);
});

test("each chapter reaches reference scale at its native scroll anchor", () => {
  const capacities = [0, 3, 3, 10, 18, 24, 32, 40];
  const layout = layoutScene(capacities.map((_, i) => 160 + i * 11), 720);
  for (const [index, chapter] of layout.chapters.entries()) {
    const layers = visibleLayers(layout, capacities, Math.floor(chapter.offset));
    const current = layers.find((layer) => layer.index === index);
    assert.equal(current.scale, 1);
    assert.equal(current.opacity, 1);
    assert.ok(current.interactive);
    assert.ok(current.top >= 0 && current.top + chapter.height <= layout.viewportHeight);
    assert.ok(layers.every((layer) => layer.zIndex <= current.zIndex));
  }
  const last = layout.chapters.at(-1);
  assert.equal(last.scrollHeight, layout.viewportHeight);
  assert.deepEqual(visibleLayers(layout, capacities, last.offset + last.scrollHeight), []);
});

test("incoming graphics and links stay clear of the next enlargement", () => {
  // A large jump followed by two similar capacities used to overlap at entry.
  const capacities = [0, 9, 9.1, 9.1];
  const layout = layoutScene([170, 220, 140, 200], 800);
  for (let scroll = -75; scroll <= layout.chapters.at(-1).offset; scroll += 3) {
    const layers = visibleLayers(layout, capacities, scroll);
    let previousBottom = -Infinity;
    for (const layer of layers) {
      const bottom = layer.top + layout.chapters[layer.index].height * layer.scale;
      assert.ok(bottom > 0 && layer.top < layout.viewportHeight);
      if (layout.chapters[layer.index].offset < scroll) continue;
      assert.ok(layer.interactive && layer.opacity === 1 && layer.copyOpacity === 1);
      assert.ok(layer.top >= previousBottom);
      previousBottom = bottom;
    }
  }
});

test("departing chapters recede and fade, then drop out of the visible layers", () => {
  const capacities = Array.from({ length: 12 }, (_, index) => index);
  const layout = layoutScene(capacities.map(() => 180), 800);
  const chapter = layout.chapters[5];
  let lastTop = Infinity;
  let lastOpacity = Infinity;
  let sawFadedCopy = false;
  for (let scroll = chapter.offset; scroll < layout.chapters[10].offset; scroll += 12) {
    const layer = visibleLayers(layout, capacities, scroll).find((entry) => entry.index === 5);
    if (!layer) break;
    assert.ok(layer.top < lastTop && layer.opacity < lastOpacity);
    assert.ok(layer.copyOpacity <= layer.opacity);
    if (!layer.interactive) {
      assert.equal(layer.copyOpacity, 0);
      assert.ok(layer.opacity > 0);
      sawFadedCopy = true;
    }
    lastTop = layer.top;
    lastOpacity = layer.opacity;
  }
  assert.ok(sawFadedCopy);
  assert.ok(visibleLayers(layout, capacities, layout.chapters[10].offset).every((layer) => layer.index > 5));
});

test("departing text fades fastest in the first quarter of the transition", () => {
  const capacities = [0, 3, 6];
  const layout = layoutScene([180, 180, 180], 800);
  const { scrollHeight } = layout.chapters[0];
  const samples = [0, 0.25, 0.5, 0.75, 1].map((fraction) => {
    const layer = visibleLayers(layout, capacities, fraction * scrollHeight).find(({ index }) => index === 0);
    return layer.opacity * layer.copyOpacity;
  });
  assert.equal(samples[0], 1);
  assert.ok(samples[1] < 0.5);
  const drops = samples.slice(1).map((opacity, index) => samples[index] - opacity);
  assert.ok(drops.every((drop, index) => drop > 0 && (index === 0 || drop < drops[index - 1])));
});

test("paint order favors the closest chapter and the later one at a tie", () => {
  const capacities = [0, 0, 0, 0];
  const layout = layoutScene([120, 120, 120, 120], 720);
  const chapter = layout.chapters[1];
  for (const [fraction, expected] of [[0.49, 1], [0.5, 2], [0.51, 2]]) {
    const layers = visibleLayers(layout, capacities, chapter.offset + fraction * chapter.scrollHeight);
    const order = layers.toSorted((a, b) => a.zIndex - b.zIndex || a.index - b.index);
    assert.equal(order.at(-1).index, expected);
  }
});
