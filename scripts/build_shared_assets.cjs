// npm install --no-save esbuild, or set NODE_PATH to an existing installation.
const esbuild = require('esbuild');
const path = require('node:path');
for (const file of ['assets/css/site-foundation.css', 'assets/js/visitor-friendly.js', 'assets/js/translate.js', 'assets/js/crisis-banner.js', 'assets/js/main.js', 'sw.js']) {
  const extension = path.extname(file);
  esbuild.buildSync({ entryPoints: [file], outfile: file === 'sw.js' ? 'assets/js/min/sw.min.js' : path.join(path.dirname(file), 'min', path.basename(file, extension) + '.min' + extension), minify: true });
}
