import { execFileSync } from 'node:child_process';
execFileSync(process.env.PYTHON || 'python', ['scripts/validate_build.py'], {stdio:'inherit'});
