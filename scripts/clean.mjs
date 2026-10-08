import { rmSync } from 'node:fs';

const generatedPaths = [
  'output/responsive-audit',
  'output/layout',
  'output/playwright',
  'tests/__pycache__',
  'scripts/__pycache__',
];

for (const path of generatedPaths) {
  rmSync(path, { recursive: true, force: true });
}

console.log(`Removed ${generatedPaths.length} generated paths.`);
