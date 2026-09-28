// Rebuilds minified JS twins for assets/js/*.js -> assets/js/min/*.min.js
// Mirrors scripts/rebuild_min_css.cjs. Run via `npm run build:min:js`.
const esbuild = require('esbuild'), fs = require('fs'), path = require('path');
function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return walk(p);
    return p.endsWith('.js') && !p.includes('/min/') ? [p] : [];
  });
}
let n = 0;
for (const f of walk('assets/js')) {
  const out = path.join(path.dirname(f), 'min', path.basename(f, '.js') + '.min.js');
  try { esbuild.buildSync({ entryPoints: [f], outfile: out, minify: true, allowOverwrite: true }); n++; }
  catch (e) { console.log('SKIP', f, e.message.split('\n')[0]); }
}
console.log(`Rebuilt ${n} minified JS files`);
