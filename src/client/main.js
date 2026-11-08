import { areaScale, cameraLog2, capacityLog2 } from "../../lib/scale.mjs";

const main = document.querySelector("main");
const chapters = [...document.querySelectorAll("[data-capacity-bits]")];
const contents = chapters.map((chapter) => chapter.querySelector(".chapter-content"));
const capacities = chapters.map((chapter) => capacityLog2(BigInt(chapter.dataset.capacityBits)));
const progressBar = document.querySelector(".reading-progress");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let framePending = false;
let sceneStart = 0;
let stride = 1;
let viewportHeight = window.innerHeight;
let anchorY = 0;

function measure() {
  const enabled = chapters.length > 1 && !reducedMotion.matches;
  main?.classList.toggle("is-zooming", enabled);
  viewportHeight = window.innerHeight;
  stride = Math.max(320, viewportHeight * 0.62);
  anchorY = Math.min(120, Math.max(72, viewportHeight * 0.14));
  chapters.forEach((chapter, index) => {
    chapter.style.height = enabled ? `${index === chapters.length - 1 ? viewportHeight : stride}px` : "";
    if (!enabled) contents[index].removeAttribute("style");
  });
  sceneStart = chapters[0] ? chapters[0].getBoundingClientRect().top + window.scrollY : 0;
  scheduleFrame();
}

function update() {
  framePending = false;
  const scrollY = window.scrollY;
  if (main?.classList.contains("is-zooming")) {
    const position = Math.max(0, Math.min(chapters.length - 1, (scrollY - sceneStart) / stride));
    const camera = cameraLog2(capacities, position);
    const entry = Math.max(0, sceneStart - scrollY);
    const exit = Math.max(0, scrollY - sceneStart - (chapters.length - 1) * stride);
    chapters.forEach((chapter, index) => {
      const scale = areaScale(capacities[index], camera);
      const distance = index - position;
      // Previous items leave a small trace above the current one; the next item
      // approaches from below at the very same capacity scale.
      const spacing = distance < 0 ? anchorY * 0.8 : stride;
      const y = anchorY + distance * spacing + entry - exit;
      contents[index].style.transform = Number.isFinite(scale)
        ? `translate3d(0, ${y}px, 0) scale(${scale})`
        : "scale(0)";
    });
  }
  const scrollable = document.documentElement.scrollHeight - viewportHeight;
  if (progressBar && !reducedMotion.matches) {
    progressBar.style.transform = `scaleX(${Math.max(0, Math.min(1, scrollable > 0 ? scrollY / scrollable : 0))})`;
  }
}

function scheduleFrame() {
  if (framePending) return;
  framePending = true;
  window.requestAnimationFrame(update);
}

function followAnchor() {
  const index = chapters.findIndex((chapter) => `#${chapter.id}` === window.location.hash);
  if (index !== -1 && main?.classList.contains("is-zooming")) {
    window.scrollTo({ top: sceneStart + index * stride, behavior: "instant" });
  }
  scheduleFrame();
}

window.addEventListener("scroll", scheduleFrame, { passive: true });
window.addEventListener("resize", measure);
window.addEventListener("hashchange", followAnchor);
window.addEventListener("load", () => { measure(); followAnchor(); });
reducedMotion.addEventListener("change", measure);
measure();
