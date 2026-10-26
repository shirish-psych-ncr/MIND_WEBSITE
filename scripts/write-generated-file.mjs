import { writeFile } from 'node:fs/promises';
import { setTimeout } from 'node:timers/promises';

// Windows file scanners can briefly hold generated HTML while it is replaced.
// Retry only transient access failures; never suppress a persistent write error.
export async function writeGeneratedFile(file, content) {
  for (let attempt = 0; ; attempt++) {
    try { return await writeFile(file, content); }
    catch (error) {
      if (attempt >= 3 || !['UNKNOWN','EBUSY','EPERM','EACCES'].includes(error.code)) throw error;
      await setTimeout(100 * 2 ** attempt);
    }
  }
}
