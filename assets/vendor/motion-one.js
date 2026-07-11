/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/motion@10.16.2/dist/main.es.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import {
  animate as o,
  withControls as i,
} from "/npm/@motionone/dom@10.16.2/+esm";
export * from "/npm/@motionone/dom@10.16.2/+esm";
export * from "/npm/@motionone/types@10.15.1/+esm";
import { isFunction as a } from "/npm/@motionone/utils@10.15.1/+esm";
import { Animation as m } from "/npm/@motionone/animation@10.15.1/+esm";
function e(t, r = {}) {
  return i(
    [
      () => {
        const n = new m(t, [0, 1], r);
        return (n.finished.catch(() => {}), n);
      },
    ],
    r,
    r.duration,
  );
}
function f(t, r, n) {
  return (a(t) ? e : o)(t, r, n);
}
export { f as animate };
