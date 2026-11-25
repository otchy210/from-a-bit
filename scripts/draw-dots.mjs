// At reference scale the eight dots together cover the same area as the
// single dot. The scene's area scaling then makes one dot represent one bit.
import sharp from "sharp";
import { masterWidth as size } from "../lib/graphics.mjs";

async function draw(name, centers, radius) {
  const pixels = Buffer.alloc(size * size * 4);
  const r = radius * size / 100;
  for (const [x, y] of centers) {
    const cx = x * size / 100;
    const cy = y * size / 100;
    for (let row = Math.floor(cy - r); row < Math.ceil(cy + r); row++) {
      for (let col = Math.floor(cx - r); col < Math.ceil(cx + r); col++) {
        const dx = col + 0.5 - cx;
        const dy = row + 0.5 - cy;
        const coverage = Math.min(1, r + 0.5 - Math.hypot(dx, dy));
        if (coverage <= 0) continue;
        const light = Math.max(0, -(dx + dy) / (2 * r));
        const offset = (row * size + col) * 4;
        pixels[offset] = Math.round(32 + light * 25);
        pixels[offset + 1] = Math.round(46 + light * 30);
        pixels[offset + 2] = Math.round(40 + light * 24);
        pixels[offset + 3] = Math.round(255 * coverage);
      }
    }
  }
  await sharp(pixels, { raw: { width: size, height: size, channels: 4 } })
    .webp({ lossless: true }).toFile(`src/assets/graphics/${name}.webp`);
}

await draw("bit", [[50, 50]], 10 * Math.sqrt(8));
await draw("byte", [38, 62].flatMap((y) => [14, 38, 62, 86].map((x) => [x, y])), 10);
