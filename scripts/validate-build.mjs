import { execFileSync } from 'node:child_process';

execFileSync(process.execPath, ['scripts/run-python.mjs', 'scripts/validate_build.py'], {
  stdio: 'inherit',
});
