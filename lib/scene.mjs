import { areaScale, cameraLog2, chapterOpacity, fadeChapters } from "./scale.mjs";

const chapterGap = 24;
const scrollLengthMultiplier = 1.8;
const initialAnchor = 28;
const minimumVisibleOpacity = 0.012;

// Layout is measured at reference scale, once per resize. Offsets are relative
// to the start of the first chapter in the normal scrollable document.
export function layoutScene(heights, viewportHeight) {
  const travel = Math.min(30, Math.max(22, viewportHeight * 0.036));
  const maxAnchor = Math.min(6 * travel + 8, viewportHeight - Math.max(...heights) - chapterGap);
  if (heights.length < 2 || maxAnchor < initialAnchor) return null;

  let offset = 0;
  const chapters = heights.map((height, index) => {
    // Leave a full viewport for the final chapter before scrolling into the footer.
    const scrollHeight = index === heights.length - 1 ? viewportHeight : (height + chapterGap) * scrollLengthMultiplier;
    const chapter = { offset, height, scrollHeight };
    offset += scrollHeight;
    return chapter;
  });
  return { chapters, viewportHeight, maxAnchor, travel };
}

function chapterAt(chapters, scroll) {
  let low = 0;
  let high = chapters.length - 1;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    // A native jump to a fractional chapter offset may round down to a pixel.
    if (chapters[mid].offset - scroll < 1) low = mid;
    else high = mid - 1;
  }
  return low;
}

function departingDistance(age, logCapacityRatio, travel) {
  // Integrate the shrinking scale over the first transition. Older chapters
  // continue upwards at the slower, constant speed even for equal capacities.
  const fraction = Math.min(age, 1);
  const rate = logCapacityRatio * Math.LN2 / 2;
  const scaledTravel = rate > 0 ? -Math.expm1(-rate * fraction) / rate : fraction;
  return travel * (age + 0.75 * scaledTravel);
}

export function visibleLayers(layout, capacities, scroll) {
  const { chapters, viewportHeight, maxAnchor, travel } = layout;
  const last = chapters.length - 1;
  const end = chapters[last].offset;
  const current = chapterAt(chapters, scroll);
  const chapter = chapters[current];
  const offset = Math.max(chapter.offset, Math.min(scroll, end));
  const next = chapters[current + 1];
  const fraction = next ? (offset - chapter.offset) / (next.offset - chapter.offset) : 0;
  const position = current + fraction;
  const camera = cameraLog2(capacities, position);
  // Before the first chapter and after the last, the scene follows the document.
  const anchor = Math.min(maxAnchor, initialAnchor + position * travel * 0.8)
    + Math.max(0, -scroll) - Math.max(0, scroll - end);

  const layers = [];
  let nextIncomingTop = -Infinity;
  for (let index = Math.max(0, current - fadeChapters + 1); index <= last; index++) {
    const age = position - index;
    const opacity = chapterOpacity(age);
    if (opacity < minimumVisibleOpacity) continue;

    let top;
    if (age > 0) {
      top = anchor - departingDistance(age, capacities[index + 1] - capacities[index], travel);
    } else {
      top = Math.max(nextIncomingTop, anchor + (chapters[index].offset - offset) / scrollLengthMultiplier);
    }
    if (top >= viewportHeight) break;
    const scale = areaScale(capacities[index], camera);
    if (!Number.isFinite(scale) || scale <= 0) continue;
    const bottom = top + chapters[index].height * scale;
    if (age <= 0) nextIncomingTop = bottom + chapterGap;
    if (bottom <= 0) continue;

    // Figures linger while shrinking text fades sooner.
    const copyOpacity = chapterOpacity(age * 2.8);
    // Each half-chapter of distance moves a layer back one level. At an exact
    // tie the later chapter paints on top by ordinary document order.
    const zIndex = 2 * last + 1 - Math.floor(2 * Math.abs(age));
    layers.push({ index, top, scale, zIndex, opacity, copyOpacity, interactive: opacity * copyOpacity >= minimumVisibleOpacity });
  }
  return layers;
}
