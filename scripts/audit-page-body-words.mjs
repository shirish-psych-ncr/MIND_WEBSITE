import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const exceptions = new Set([
  '404.html', 'thank-you.html', 'offline.html', 'privacy.html', 'terms.html',
  'consent.html', 'disclaimer.html',
]);
const utilityRoute = /(?:^|\\)tools(?:\\|$)|(?:^|\\)resources\\[^\\]+\.html$/i;
const files = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith('.html')) files.push(path);
  }
}

function visibleMainText(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
  return main
    .replace(/<(script|style|svg|noscript|nav)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&(?:quot|#34);/gi, '"')
    .replace(/&(?:#39|apos);/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

await walk(DIST);
const failures = [];
const report = [];
for (const file of files) {
    const route = relative(DIST, file);
  const html = await readFile(file, 'utf8');
  if (exceptions.has(route) || utilityRoute.test(route) || /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html)) continue;
  const words = visibleMainText(html).match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  report.push({ route, words });
  if (words < 500) failures.push(`${route}: ${words} visible main-body words (minimum 500)`);
}
report.sort((a, b) => a.words - b.words || a.route.localeCompare(b.route));
console.log(`Audited ${report.length} indexable informational pages; minimum body length is 500 words.`);
for (const row of report.filter((item) => item.words < 500)) console.log(`SHORT ${row.words}\t${row.route}`);
if (failures.length) process.exitCode = 1;
