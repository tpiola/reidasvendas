/** First-party initial payload in static production HTML, gzip level9. No visitor data. */
import { readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
const budgets = { html: 50_000, css: 50_000, modernJs: 150_000 };
const gzip = (buffer) => gzipSync(buffer, { level: 9 }).length;
const routes = [['/', 'index'], ['/planos', 'planos'], ['/simulador', 'simulador']];
const rows = [];
for (const [route, file] of routes) {
  const buffer = await readFile(`.next/server/app/${file}.html`);
  const html = buffer.toString('utf8');
  const js = new Map();
  const css = new Set();
  for (const match of html.matchAll(/<script\b([^>]*)>/gi)) {
    const src = match[1].match(/\bsrc="([^"]+)"/i)?.[1];
    if (src?.startsWith('/_next/')) js.set(src, /\bnomodule\b/i.test(match[1]));
  }
  for (const match of html.matchAll(/<link\b([^>]*)>/gi)) {
    if (!/\brel="stylesheet"/i.test(match[1])) continue;
    const href = match[1].match(/\bhref="([^"]+)"/i)?.[1];
    if (href?.startsWith('/_next/')) css.add(href);
  }
  async function compressedAsset(url) {
    const pathname = new URL(url, 'https://www.reidasvendas.com.br').pathname;
    const location = path.resolve('.next', pathname.slice('/_next/'.length));
    if (!location.startsWith(path.resolve('.next') + path.sep)) throw new Error('Invalid asset path');
    return gzip(await readFile(location));
  }
  let modernJs = 0, legacyJs = 0, cssBytes = 0;
  for (const [src, legacy] of js) {
    const bytes = await compressedAsset(src);
    if (legacy) legacyJs += bytes; else modernJs += bytes;
  }
  for (const src of css) cssBytes += await compressedAsset(src);
  const values = { html: gzip(buffer), css: cssBytes, modernJs };
  rows.push({ route, gzipBytes: values, noModuleFallbackGzipBytes: legacyJs, pass: Object.entries(values).every(([key, value]) => value <= budgets[key]) });
}
const report = { measuredAt: new Date().toISOString(), method: 'Built initial HTML; deduplicated script and stylesheet references; gzip level9; modern browsers skip noModule fallback. This is not wire RUM or field CWV.', budgetsDecimalBytes: budgets, pages: rows };
console.log(JSON.stringify(report, null, 2));
const target = process.argv.find((value) => value.startsWith('--report='))?.slice('--report='.length);
if (target) await writeFile(target, JSON.stringify(report, null, 2) + '\n');
if (rows.some((row) => !row.pass)) process.exitCode = 1;
