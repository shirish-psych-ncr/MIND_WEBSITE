/* eslint-disable no-console */
const { astroToJsx } = require('./scripts/a11y_lint/structure_lint.cjs');
const acorn = require('acorn');
const jsx = require('acorn-jsx');
const P = acorn.Parser.extend(jsx());
const fs = require('node:fs');
for (const f of ['src/components/Shell.astro','src/layouts/Layout.astro']) {
  const src = astroToJsx(f, { strict: true });
  try { P.parse(src, { ecmaVersion: 2022, sourceType: 'module', locations: true }); console.log(f, 'OK'); }
  catch (e) {
    console.log(f, 'FAIL:', e.message);
    if (e.loc) {
      const L = src.split('\n');
      for (let i = Math.max(0, e.loc.line - 3); i < Math.min(L.length, e.loc.line + 1); i++) console.log(String(i+1).padStart(5), L[i].slice(0, 240));
    }
  }
}
