/**
 * Rebuilds app/fonts/NotoSerifSC-subset.woff2 with exactly the Chinese
 * characters used in the site, so the CJK font costs a few KB instead of MB.
 *
 * Run after adding new Chinese text anywhere in app/, components/ or content/:
 *   node scripts/fetch-sc-subset.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DIRS = ["app", "components", "content"];
const OUT = path.join(ROOT, "app/fonts/NotoSerifSC-subset.woff2");
const CJK = /[㐀-鿿]/g;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(tsx?|mdx?|css)$/.test(entry.name)) out.push(p);
  }
  return out;
}

const chars = new Set();
for (const dir of DIRS) {
  for (const file of await walk(path.join(ROOT, dir))) {
    const text = await readFile(file, "utf8");
    for (const m of text.matchAll(CJK)) {
      // skip the range boundaries that appear inside regex literals
      if (m[0] !== "㐀" && m[0] !== "鿿") chars.add(m[0]);
    }
  }
}

const text = [...chars].sort().join("");
console.log(`${chars.size} characters: ${text}`);

const css = await fetch(
  `https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@700&text=${encodeURIComponent(text)}&display=swap`,
  { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0 Safari/537.36" } },
).then((r) => r.text());

const url = css.match(/url\((https:[^)]+)\)/)?.[1];
if (!url) throw new Error(`No font url in response:\n${css}`);

const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
await writeFile(OUT, buf);
console.log(`wrote ${OUT} (${(buf.length / 1024).toFixed(1)} KB)`);
