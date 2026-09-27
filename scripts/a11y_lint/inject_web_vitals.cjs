#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * inject_web_vitals.cjs — web-vitals instrumentation for performance adaptability.
 *
 * Tool used:
 *   5. web-vitals -> injects an ES-module snippet (onLCP/onCLS/onINP/onFCP/onTTFB)
 *                    into every HTML file's <head>. Metrics are logged to console,
 *                    stored on window.__webVitals, and sent via navigator.sendBeacon
 *                    to /__metrics (no-op endpoint) when served.
 *
 * Idempotent: skips files that already contain the marker comment.
 * Use --dry-run to preview without writing.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'output', 'skills', '.claude', '.agents', '.codex', '.opencode', '.cursor']);
const MARKER = 'web-vitals-instrumentation';
const DRY = process.argv.includes('--dry-run');

// Uses the locally installed web-vitals module URL; CDN fallback keeps it working in built static sites.
const SNIPPET = `<!-- ${MARKER} v1 (tool #5: web-vitals) -->
<script type="module">
  // Injected by scripts/a11y_lint/inject_web_vitals.cjs using the npm 'web-vitals' package.
  const WV = (() => { try { return import('/node_modules/web-vitals/dist/modules/index.js'); } catch (e) { return null; } })();
  let mod = null;
  try { mod = await WV; } catch { /* fall through to CDN */ }
  if (!mod) { try { mod = await import('https://unpkg.com/web-vitals@6/dist/web-vitals.js'); } catch { console.warn('web-vitals unavailable'); } }
  if (mod) {
    const store = (m) => {
      (window.__webVitals ||= {})[m.name] = { value: m.value, rating: m.rating };
      console.info('[web-vitals]', m.name, m.value.toFixed(2), m.rating);
      try { navigator.sendBeacon && navigator.sendBeacon('/__metrics', JSON.stringify({ name: m.name, value: m.value, rating: m.rating, page: location.pathname })); } catch { /* offline-safe */ }
    };
    mod.onLCP(store); mod.onCLS(store); mod.onINP(store); mod.onFCP(store); mod.onTTFB(store);
  }
</script>`;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (SKIP_DIRS.has(e.name)) return [];
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : /\.html?$/i.test(e.name) ? [p] : [];
  });
}

let injected = 0, skipped = 0;
for (const f of walk(ROOT)) {
  let html = fs.readFileSync(f, 'utf8');
  if (html.includes(MARKER)) { skipped++; continue; }
  if (/<head[^>]*>/i.test(html)) html = html.replace(/<head[^>]*>/i, (m) => m + '\n' + SNIPPET);
  else html = SNIPPET + '\n' + html;
  if (!DRY) fs.writeFileSync(f, html, 'utf8');
  injected++;
  console.log(`${DRY ? '[dry-run] would inject' : 'injected'} -> ${path.relative(ROOT, f)}`);
}
console.log(`[web-vitals] ${injected} file(s) ${DRY ? 'to update' : 'instrumented'}, ${skipped} already had instrumentation`);
