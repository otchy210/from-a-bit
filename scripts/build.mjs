import Eleventy from "@11ty/eleventy";
import { cp, mkdir, readFile, readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

process.chdir(fileURLToPath(new URL("../", import.meta.url)));
const checkOnly = process.argv.includes("--check");
const staging = "work/build";
await rm(staging, { recursive: true, force: true });
const generator = new Eleventy("src", staging, { configPath: "eleventy.config.mjs" });
await generator.write();

async function filesIn(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(join(directory, prefix), { withFileTypes: true })) {
    const path = join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(directory, path));
    else files.push(path);
  }
  return files.sort();
}

const expected = await filesIn(staging);
for (const path of [".nojekyll", "assets/script.js", "assets/style.css", "en/index.html", "ja/index.html"]) {
  if (!expected.includes(path)) throw new Error(`Missing generated file: ${path}`);
}
for (const [extension, count] of [[".html", 2], [".css", 1], [".js", 1]]) {
  if (expected.filter((path) => path.endsWith(extension)).length !== count) {
    throw new Error(`Expected ${count} generated ${extension} file(s).`);
  }
}
if (expected.includes("index.html")) throw new Error("The root page has not been specified yet.");

if (checkOnly) {
  const actual = await filesIn("public");
  let matches = JSON.stringify(expected) === JSON.stringify(actual);
  for (const path of expected) {
    if (!actual.includes(path)) continue;
    const [a, b] = await Promise.all([readFile(join(staging, path)), readFile(join("public", path))]);
    if (!a.equals(b)) matches = false;
  }
  if (!matches) throw new Error("Generated files are out of date. Run npm run build and include public/ in the commit.");
  console.log("public/ matches a fresh production build.");
} else {
  // Do not touch public/ until the complete build and metadata validation succeed.
  await rm("public", { recursive: true, force: true });
  await mkdir("public", { recursive: true });
  await cp(staging, "public", { recursive: true });
  console.log("Production files generated in public/.");
}
