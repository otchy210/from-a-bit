export function enableBackToStart(reducedMotion) {
  let returnFrame = 0;
  let interrupts;

  function stopReturn() {
    if (returnFrame) window.cancelAnimationFrame(returnFrame);
    returnFrame = 0;
    interrupts?.abort();
    interrupts = undefined;
  }

  function finishReturn() {
    stopReturn();
    window.scrollTo({ top: 0, behavior: "instant" });
    if (window.location.hash) {
      const url = new URL(window.location.href);
      url.hash = "";
      window.history.pushState(null, "", url);
    }
    document.getElementById("top").focus({ preventScroll: true });
  }

  function returnToTop(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    stopReturn();
    const startY = window.scrollY;
    if (reducedMotion.matches || startY <= 0) {
      finishReturn();
      return;
    }

    interrupts = new AbortController();
    for (const type of ["wheel", "pointerdown", "keydown", "hashchange"]) {
      window.addEventListener(type, stopReturn, { passive: true, signal: interrupts.signal });
    }

    const duration = Math.min(2000, Math.max(850, 600 + 9 * Math.sqrt(startY)));
    const start = performance.now();
    function move(now) {
      const progress = Math.max(0, Math.min(1, (now - start) / duration));
      if (progress === 1 || reducedMotion.matches) {
        finishReturn();
        return;
      }
      const eased = progress * progress * (3 - 2 * progress);
      window.scrollTo({ top: startY * (1 - eased), behavior: "instant" });
      returnFrame = window.requestAnimationFrame(move);
    }
    returnFrame = window.requestAnimationFrame(move);
  }

  document.querySelectorAll("[data-back-to-start]").forEach((link) => link.addEventListener("click", returnToTop));
}
