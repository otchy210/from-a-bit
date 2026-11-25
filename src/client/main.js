import { capacityBoundaries, capacityFill, visibleCapacityBands } from "../../lib/capacity.mjs";
import { capacityLog2 } from "../../lib/scale.mjs";
import { layoutScene, visibleLayers } from "../../lib/scene.mjs";
import { enableBackToStart } from "./back-to-start.js";

const main = document.querySelector("main");
const chapters = [...main.querySelectorAll("[data-capacity-bits]")];
const bits = chapters.map((chapter) => BigInt(chapter.dataset.capacityBits));
const capacities = bits.map(capacityLog2);
const nodes = chapters.map((chapter, index) => {
  const content = chapter.querySelector(".chapter-content");
  const bar = content.querySelector(".capacity-scale");
  const mark = bar.querySelector(".capacity-mark");
  return {
    content, bar, mark,
    markPosition: Number(mark?.dataset.position),
    line: bar.querySelector(".capacity-line"),
    copy: content.querySelector(".chapter-copy"),
    boundaries: capacityBoundaries(bits[index]),
    barScale: 1,
    layer: null,
  };
});
const progressBar = document.querySelector(".reading-progress");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let layout;
let barWidth = 0;
let sceneStart = 0;
let scrollableHeight = 0;
let framePending = false;
let lastScroll;
let visible = [];

function paintCapacityBar(node, layer, previous) {
  const { scale, copyOpacity } = layer;
  // The parent and bar each contribute one factor of the graphic scale.
  const bands = layer.top + node.barHeight * scale > 0
    ? visibleCapacityBands(node.boundaries, barWidth * scale ** 2)
    : null;
  const old = previous?.bands;
  if (Boolean(old) !== Boolean(bands)) node.bar.classList.toggle("is-visible", Boolean(bands));
  if (bands) {
    // The parent already scales the line. Refresh its own transform when the
    // resulting endpoint would drift by at least a quarter of a CSS pixel.
    if (!old || barWidth * scale * Math.abs(node.barScale - scale) >= 0.25) {
      node.barScale = scale;
      node.line.style.transform = `scaleX(${scale})`;
      if (node.mark) node.mark.style.transform = `translateX(${node.markPosition * scale}%)`;
    }
    if (!old || old.start !== bands.start || old.end !== bands.end) {
      node.line.style.background = capacityFill(node.boundaries, bands);
    }
    if (node.mark && (!old || previous.copyOpacity !== copyOpacity)) node.mark.style.opacity = copyOpacity;
  }
  layer.bands = bands;
}

function paint(layers) {
  for (const layer of layers) {
    // Avoid style changes smaller than one alpha step on an 8-bit display.
    layer.opacity = Math.round(layer.opacity * 255) / 255;
    layer.copyOpacity = Math.round(layer.copyOpacity * 255) / 255;
    const { index, top, scale, opacity, copyOpacity, interactive, zIndex } = layer;
    const node = nodes[index];
    const { content, layer: previous } = node;
    node.layer = layer;
    paintCapacityBar(node, layer, previous);
    if (!previous) content.classList.add("is-in-scene");
    if (previous?.interactive !== interactive) content.classList.toggle("has-visible-copy", interactive);
    if (previous?.opacity !== opacity) content.style.opacity = opacity;
    if (previous?.copyOpacity !== copyOpacity) node.copy.style.opacity = copyOpacity;
    if (previous?.zIndex !== zIndex) content.style.zIndex = zIndex;
    if (!previous || previous.top !== top || previous.scale !== scale) {
      content.style.transform = `translateY(${top}px) scale(${scale})`;
    }
  }
  for (const old of visible) {
    const node = nodes[old.index];
    if (node.layer !== old) continue;
    node.layer = null;
    node.content.classList.remove("is-in-scene", "has-visible-copy");
    node.content.removeAttribute("style");
    node.copy.style.opacity = "";
    node.bar.classList.remove("is-visible");
  }
  visible = layers;
}

function scheduleFrame() {
  if (framePending || reducedMotion.matches) return;
  framePending = true;
  window.requestAnimationFrame(() => {
    framePending = false;
    const scroll = window.scrollY;
    if (scroll === lastScroll) return;
    lastScroll = scroll;
    if (layout) paint(visibleLayers(layout, capacities, scroll - sceneStart));
    const progress = scrollableHeight > 0 ? scroll / scrollableHeight : 0;
    progressBar.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
  });
}

function measure() {
  const viewportHeight = window.innerHeight;
  // Without the chapter grid (for example, if the stylesheet failed to load),
  // inline transforms would move text out of the normal document flow.
  const canZoom = !reducedMotion.matches && nodes.length > 1 && getComputedStyle(nodes[0].content).display === "grid";
  // Include the bars and milestone labels in the reference height.
  main.classList.toggle("is-zooming", canZoom);
  const previousLayout = layout;
  const heights = canZoom && nodes.map((node) => {
    node.barHeight = node.bar.offsetHeight;
    return node.content.offsetHeight;
  });
  layout = heights ? layoutScene(heights, viewportHeight) : null;
  barWidth = layout ? Number.parseFloat(getComputedStyle(nodes[0].bar).width) : 0;
  main.classList.toggle("is-zooming", Boolean(layout));
  chapters.forEach((chapter, index) => {
    const height = layout?.chapters[index].scrollHeight;
    if (height !== previousLayout?.chapters[index].scrollHeight) chapter.style.height = height ? `${height}px` : "";
  });
  if (!layout) paint([]);
  sceneStart = layout ? chapters[0].getBoundingClientRect().top + window.scrollY : 0;
  scrollableHeight = document.documentElement.scrollHeight - viewportHeight;
  lastScroll = undefined;
  scheduleFrame();
}

function showChapter(chapter) {
  const index = chapters.indexOf(chapter);
  if (layout && index >= 0) window.scrollTo({ top: sceneStart + layout.chapters[index].offset, behavior: "instant" });
}

function followAnchor() {
  const target = document.getElementById(window.location.hash.slice(1));
  if (target?.id === "top") window.scrollTo({ top: 0, behavior: "instant" });
  else if (target?.id === "capacity-notes") target.scrollIntoView();
  else showChapter(target);
}

// Keep offscreen links reachable by keyboard without moving the page on a mouse click.
main.addEventListener("focusin", ({ target }) => {
  if (target.matches(":focus-visible")) showChapter(target.closest("[data-capacity-bits]"));
});
window.addEventListener("scroll", scheduleFrame, { passive: true });
window.addEventListener("resize", measure);
window.addEventListener("hashchange", followAnchor);
window.addEventListener("load", followAnchor);
reducedMotion.addEventListener("change", measure);
enableBackToStart(reducedMotion);
measure();
