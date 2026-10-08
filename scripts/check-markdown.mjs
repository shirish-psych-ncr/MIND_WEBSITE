import { readFile, readdir } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const root = fileURLToPath(new URL('../', import.meta.url));
const ignored = new Set(['.git', 'node_modules', 'dist', 'output']);
const files = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.toLowerCase().endsWith('.md')) files.push(path);
  }
}

await walk(root);
const failures = [];

for (const file of files) {
  const source = await readFile(file, 'utf8');
  const name = relative(root, file).replaceAll('\\', '/');
  if (!source.trim()) failures.push(`${name}: empty document`);
  if (source.includes('\uFFFD') || source.includes('\0')) failures.push(`${name}: invalid replacement or null character`);
  if (!/^#\s+\S/m.test(source) && !source.startsWith('---\n')) failures.push(`${name}: missing top-level heading or front matter`);

  const isMirror = name.startsWith('scripts/') && existsSync(join(root, name.slice('scripts/'.length)));
  if (isMirror) continue;
  for (const match of source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    let target = match[1].trim().replace(/^<|>$/g, '').split(/\s+["']/)[0];
    if (!target || /^(?:https?:|mailto:|tel:|data:|#)/i.test(target)) continue;
    target = target.split('#')[0].split('?')[0];
    if (!target) continue;
    let decoded;
    try { decoded = decodeURIComponent(target); } catch { decoded = target; }
    const absolute = decoded.startsWith('/') ? resolve(root, `.${decoded}`) : resolve(dirname(file), decoded);
    if (!existsSync(absolute)) failures.push(`${name}: broken local link ${match[1]}`);
  }
}

const mirrorPairs = [];
for (const file of files) {
  const name = relative(root, file).replaceAll('\\', '/');
  if (name.startsWith('scripts/')) continue;
  const mirror = join(root, 'scripts', name);
  if (existsSync(mirror)) mirrorPairs.push([file, mirror]);
}
for (const [sourceFile, mirrorFile] of mirrorPairs) {
  if ((await readFile(sourceFile, 'utf8')) !== (await readFile(mirrorFile, 'utf8'))) {
    failures.push(`${relative(root, mirrorFile)}: mirror differs from ${relative(root, sourceFile)}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Validated ${files.length} Markdown files and ${mirrorPairs.length} mirrored pairs.`);
