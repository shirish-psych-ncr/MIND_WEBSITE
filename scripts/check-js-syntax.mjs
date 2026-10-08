import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const ignored = new Set(['.astro', '.git', 'dist', 'node_modules', 'output']);
const extensions = new Set(['.js', '.cjs', '.mjs']);

function* sourceFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* sourceFiles(path);
    else if (extensions.has(extname(entry.name))) yield path;
  }
}

let checked = 0;
for (const path of sourceFiles('.')) {
  execFileSync(process.execPath, ['--check', path], { stdio: 'inherit' });
  checked += 1;
}
console.log(`Syntax checked ${checked} JavaScript files.`);
