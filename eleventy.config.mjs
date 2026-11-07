import { build } from "esbuild";
import { join } from "node:path";

export default function (eleventyConfig) {
  eleventyConfig.addWatchTarget("src/data/");
  eleventyConfig.addWatchTarget("src/client/");
  eleventyConfig.addWatchTarget("lib/");
  eleventyConfig.addPassthroughCopy({ "src/assets/": "assets/" });
  eleventyConfig.addPassthroughCopy({ "src/static/.nojekyll": ".nojekyll" });

  eleventyConfig.on("eleventy.before", async ({ directories, runMode }) => {
    await build({
      entryPoints: ["src/client/main.js"],
      bundle: true,
      outfile: join(directories.output, "assets/script.js"),
      format: "iife",
      target: "es2020",
      minify: runMode === "build",
      legalComments: "none",
    });
  });
  return { dir: { input: "src" }, templateFormats: ["11ty.js"] };
}
