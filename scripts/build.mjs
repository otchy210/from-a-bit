import Eleventy from "@11ty/eleventy";
import { mkdir, mkdtemp, readFile, readdir, rename, rm } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

process.chdir(fileURLToPath(new URL("../", import.meta.url)));
const output = "public";
const checkOnly = process.argv.includes("--check");

async function filesIn(directory) {
  const entries = await readdir(directory, { recursive: true, withFileTypes: true });
  return entries.filter((entry) => !entry.isDirectory())
    .map((entry) => relative(directory, join(entry.parentPath, entry.name)).replaceAll(sep, "/"))
    .sort();
}

function checkStructure(files) {
  const pagesAndBundles = ["index.html", "assets/style.css", "assets/script.js"];
  for (const path of [".nojekyll", "favicon.png", "robots.txt", "sitemap.xml", "assets/social-card.png", "assets/bluesky-wordmark.svg", ...pagesAndBundles]) {
    if (!files.includes(path)) throw new Error(`Missing generated file: ${path}`);
  }
  for (const path of files) {
    if (/\.(html|css|js)$/.test(path) && !pagesAndBundles.includes(path)) {
      throw new Error(`Unexpected page or bundle: ${path}`);
    }
  }
}

async function checkGenerated(staging, expected) {
  const actual = await filesIn(output);
  if (actual.length !== expected.length || expected.some((path, index) => actual[index] !== path)) {
    throw new Error("Generated file list differs from public/. Run npm run build.");
  }
  await Promise.all(expected.map(async (path) => {
    const [fresh, published] = await Promise.all([readFile(join(staging, path)), readFile(join(output, path))]);
    if (!fresh.equals(published)) throw new Error(`Outdated ${output}/${path}. Run npm run build.`);
  }));
}

async function replaceOutput(staging, backup) {
  // Move whole directories on the same filesystem. A failed build never copies
  // a partial set of files over the previous preview.
  await mkdir(output, { recursive: true });
  await rename(output, backup);
  try {
    await rename(staging, output);
  } catch (error) {
    await rename(backup, output);
    throw error;
  }
  await rm(backup, { recursive: true });
}

await mkdir("work", { recursive: true });
const temporary = await mkdtemp("work/build-");
const staging = join(temporary, "site");
try {
  const generator = new Eleventy("src", staging, { configPath: "eleventy.config.mjs" });
  await generator.write();
  const files = await filesIn(staging);
  checkStructure(files);
  if (checkOnly) {
    await checkGenerated(staging, files);
    console.log("public/ matches a fresh production build.");
  } else {
    await replaceOutput(staging, `${temporary}-previous`);
    console.log("Production files generated in public/.");
  }
} finally {
  await rm(temporary, { recursive: true, force: true });
}
