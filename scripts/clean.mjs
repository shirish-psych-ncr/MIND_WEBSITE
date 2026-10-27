import { rmSync } from 'node:fs';

const generatedPaths = [
  'dist',
  '.astro',
  'output',
  '.playwright-cli',
  'build-ci.log',
  'tests/__pycache__',
  'scripts/__pycache__',
];

for (const path of generatedPaths) {
  rmSync(path, { recursive: true, force: true });
}

console.log(`Removed ${generatedPaths.length} generated paths.`);
