import { capacityLog2 } from "../../lib/scale.mjs";
import { layoutScene, visibleLayers } from "../../lib/scene.mjs";
import { enableBackToStart } from "./back-to-start.js";

const main = document.querySelector("main");
const chapters = [...main.querySelectorAll("[data-capacity-bits]")];
const contents = chapters.map((chapter) => chapter.querySelector(".chapter-content"));
const capacities = chapters.map((chapter) => capacityLog2(BigInt(chapter.dataset.capacityBits)));
const progressBar = document.querySelector(".reading-progress");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let layout;
let sceneStart = 0;
let scrollableHeight = 0;
let framePending = false;
let visible = new Map();

function paint(layers) {
  const nextVisible = new Map();
  for (const layer of layers) {
    const { index, top, scale, opacity, copyOpacity, interactive, zIndex } = layer;
    const previous = visible.get(index);
    const content = contents[index];
    nextVisible.set(index, layer);
    if (!previous) content.classList.add("is-in-scene");
    if (previous?.interactive !== interactive) content.classList.toggle("has-visible-copy", interactive);
    if (previous?.opacity !== opacity) content.style.opacity = opacity;
    if (previous?.copyOpacity !== copyOpacity) content.style.setProperty("--copy-opacity", copyOpacity);
    if (previous?.zIndex !== zIndex) content.style.zIndex = zIndex;
    content.style.transform = `translateY(${top}px) scale(${scale})`;
  }
  for (const index of visible.keys()) {
    if (nextVisible.has(index)) continue;
    contents[index].classList.remove("is-in-scene", "has-visible-copy");
    contents[index].removeAttribute("style");
  }
  visible = nextVisible;
}

function scheduleFrame() {
  if (framePending || reducedMotion.matches) return;
  framePending = true;
  window.requestAnimationFrame(() => {
    framePending = false;
    const scroll = window.scrollY;
    if (layout) paint(visibleLayers(layout, capacities, scroll - sceneStart));
    const progress = scrollableHeight > 0 ? scroll / scrollableHeight : 0;
    progressBar.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
  });
}

function measure() {
  const viewportHeight = window.innerHeight;
  // Without the chapter grid (for example, if the stylesheet failed to load),
  // inline transforms would move text out of the normal document flow.
  const canZoom = !reducedMotion.matches && contents.length > 1 && getComputedStyle(contents[0]).display === "grid";
  layout = canZoom ? layoutScene(contents.map((content) => content.offsetHeight), viewportHeight) : null;
  main.classList.toggle("is-zooming", Boolean(layout));
  chapters.forEach((chapter, index) => {
    chapter.style.height = layout ? `${layout.chapters[index].scrollHeight}px` : "";
  });
  if (!layout) paint([]);
  sceneStart = layout ? chapters[0].getBoundingClientRect().top + window.scrollY : 0;
  scrollableHeight = document.documentElement.scrollHeight - viewportHeight;
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
window.addEventListener("load", () => { measure(); followAnchor(); });
reducedMotion.addEventListener("change", measure);
enableBackToStart(reducedMotion);
measure();
