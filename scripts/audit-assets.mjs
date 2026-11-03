import { createHash } from "node:crypto";
import { access, readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const mib = (bytes) => `${(bytes / 1024 ** 2).toFixed(2)} MiB`;

async function inventory(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await inventory(path));
    else if (entry.isFile()) files.push({ path, bytes: (await stat(path)).size });
  }
  return files;
}

const files = await inventory(join(root, "public"));
console.log(`Public assets: ${files.length} files, ${mib(files.reduce((n, f) => n + f.bytes, 0))}`);

// Check literal public URLs; template-generated URLs are exercised in the browser.
const sources = (await inventory(join(root, "src"))).filter((f) => /\.(tsx?|css)$/.test(f.path));
const urls = new Set();
for (const source of sources) {
  const contents = await readFile(source.path, "utf8");
  for (const match of contents.matchAll(/["'`(](\/[^"'`\s)]+\.(?:mp4|png|jpg|webp|woff2|ico))/g)) {
    if (!match[1].includes("${")) urls.add(match[1]);
  }
}
for (const url of urls) {
  try {
    await access(join(root, "public", url));
  } catch {
    throw new Error(`Missing referenced asset: ${url}`);
  }
}
console.log(`Checked ${urls.size} literal media URLs: all exist.`);

if (process.argv.includes("--verify-originals")) {
  const baseline = JSON.parse(await readFile(join(root, "docs/media-originals.json"), "utf8"));
  for (const file of baseline.files) {
    const bytes = await readFile(join(root, file.path));
    const hash = createHash("sha256").update(bytes).digest("hex");
    if (bytes.length !== file.bytes || hash !== file.sha256) {
      throw new Error(`Original asset changed: ${file.path}`);
    }
  }
  console.log(`Verified ${baseline.files.length} assets: every byte matches the originals.`);
}

console.log("\nLargest assets:");
for (const file of files.sort((a, b) => b.bytes - a.bytes).slice(0, 10)) {
  console.log(`${mib(file.bytes).padStart(12)}  ${relative(root, file.path)}`);
}
