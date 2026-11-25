import { build } from "esbuild";
import { join } from "node:path";

export default function (eleventyConfig) {
  for (const path of ["src/data/", "src/client/", "src/assets/style.css", "lib/"]) {
    eleventyConfig.addWatchTarget(path);
  }
  eleventyConfig.addPassthroughCopy({ "src/assets/graphics/": "assets/graphics/" });
  eleventyConfig.addPassthroughCopy({ "src/static/.nojekyll": ".nojekyll" });

  eleventyConfig.on("eleventy.before", async ({ directories, runMode }) => {
    await build({
      entryPoints: { script: "src/client/main.js", style: "src/assets/style.css" },
      bundle: true,
      outdir: join(directories.output, "assets"),
      format: "iife",
      target: "es2020",
      minify: runMode === "build",
      legalComments: "none",
    });
  });
  return { dir: { input: "src" }, templateFormats: ["11ty.js"] };
}
