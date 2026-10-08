import { spawnSync } from 'node:child_process';

const candidates = process.env.PYTHON
  ? [[process.env.PYTHON, []]]
  : process.platform === 'win32'
    ? [['py', ['-3']], ['python', []]]
    : [['python3', []], ['python', []]];

for (const [command, prefix] of candidates) {
  const result = spawnSync(command, [...prefix, ...process.argv.slice(2)], {
    stdio: 'inherit',
  });
  if (!result.error || result.error.code !== 'ENOENT') {
    process.exit(result.status ?? 1);
  }
}

console.error('Python 3 was not found. Install Python 3 or set the PYTHON environment variable.');
process.exit(1);
