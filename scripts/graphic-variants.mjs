import { copyFile, mkdir, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { graphicVariant, graphicWidths, masterWidth } from "../lib/graphics.mjs";

// Retain the lossless master at the widest zoom. During watch builds only
// artwork edited since the last successful conversion needs re-encoding.
export function graphicBuilder() {
  const previous = new Map();
  return async function buildGraphics(output) {
    const source = "src/assets/graphics";
    const destination = join(output, "assets/graphics");
    await mkdir(destination, { recursive: true });
    for (const file of await readdir(source)) {
      if (!file.endsWith(".webp")) continue;
      const path = join(source, file);
      const { mtimeMs } = await stat(path);
      if (previous.get(path) === mtimeMs) continue;
      await copyFile(path, join(destination, file));
      await Promise.all(graphicWidths.filter((width) => width !== masterWidth).map((width) =>
        sharp(path).resize(width, width).webp({ quality: 94, alphaQuality: 100, smartSubsample: true })
          .toFile(join(destination, graphicVariant(file, width)))
      ));
      previous.set(path, mtimeMs);
    }
  };
}
