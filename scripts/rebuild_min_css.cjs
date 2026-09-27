const esbuild = require('esbuild'), fs = require('fs'), path = require('path');
function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return walk(p);
    return p.endsWith('.css') && !p.includes('/min/') ? [p] : [];
  });
}
let n = 0;
for (const dir of ['assets/css', 'assets/css-tools']) {
  for (const f of walk(dir)) {
    const out = path.join(path.dirname(f), 'min', path.basename(f, '.css') + '.min.css');
    try { esbuild.buildSync({ entryPoints: [f], outfile: out, minify: true, allowOverwrite: true }); n++; }
    catch (e) { console.log('SKIP', f, e.message.split('\n')[0]); }
  }
}
console.log('rebuilt', n, 'minified css files');
