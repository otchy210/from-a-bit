"use strict";

// Preserve the current section when following the static language links.
const languageLinks = document.querySelectorAll("[data-language-link]");

function updateLanguageLinks() {
  for (const link of languageLinks) {
    const path = link.getAttribute("href").split("#")[0];
    link.setAttribute("href", `${path}${window.location.hash}`);
  }
}

updateLanguageLinks();
window.addEventListener("hashchange", updateLanguageLinks);

// This measures reading position, not data capacity or the future zoom scale.
const progressBar = document.querySelector(".reading-progress");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let updatePending = false;

function updateReadingProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
}

function scheduleProgressUpdate() {
  if (!progressBar || updatePending || reducedMotion.matches) return;
  updatePending = true;
  window.requestAnimationFrame(() => {
    updateReadingProgress();
    updatePending = false;
  });
}

window.addEventListener("scroll", scheduleProgressUpdate, { passive: true });
window.addEventListener("resize", scheduleProgressUpdate);
window.addEventListener("load", scheduleProgressUpdate);
reducedMotion.addEventListener("change", scheduleProgressUpdate);
scheduleProgressUpdate();
