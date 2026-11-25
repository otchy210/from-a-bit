export const graphicWidths = [128, 256, 512, 768, 1280];
export const masterWidth = graphicWidths.at(-1);
// Match --graphic-size in style.css for the ordinary, untransformed layout.
export const graphicSizes = "(max-width: 480px) 3.25rem, clamp(4.5rem, 12vw, 8rem)";

export function graphicVariant(src, width) {
  return width === masterWidth ? src : src.replace(/\.webp$/, `-${width}.webp`);
}
