#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * measure_web_vitals.cjs — actively MEASURE CLS/LCP/INP/FCP/TTFB using the
 * npm `web-vitals` module inside a real headless browser (Playwright).
 *
 * Tool used:
 *   5. web-vitals -> onCLS/onLCP/onINP/onFCP/onTTFB callbacks collected per page.
 *
 * How it works:
 *   - Bundles the installed web-vitals ESM package into one IIFE with esbuild
 *     (already a dependency of this repo), exposing window.__webVitalsInstrument.
 *   - Serves the repo over http://127.0.0.1:<port> so pages load their real CSS/JS.
 *   - Injects the bundle on every page, calls all five getters, waits for metrics
 *     to settle, then records them.
 *
 * Usage:
 *   node scripts/a11y_lint/measure_web_vitals.cjs [route1 route2 ...]
 *   (no routes = every *.html file found in the repo)
 *
 * Output: output/a11y-lint/web-vitals.json
 */
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { build } = require('esbuild');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'output', 'a11y-lint');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'output', 'skills', '.claude', '.agents', '.codex', '.opencode', '.cursor']);
const PORT = Number(process.env.A11Y_PORT || 8766);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (SKIP_DIRS.has(e.name)) return [];
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : /\.html?$/i.test(e.name) ? [path.relative(ROOT, p).replaceAll('\\', '/')] : [];
  });
}

const MIME = { '.html': 'text/html', '.htm': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain', '.xml': 'application/xml', '.manifest': 'application/manifest+json' };

function startServer() {
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '');
    const file = path.join(ROOT, rel || 'index.html');
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); res.end('not found'); return;
    }
    res.writeHead(200, { 'content-type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, '127.0.0.1', () => resolve(server)));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const routes = process.argv.slice(2).length ? process.argv.slice(2) : walk(ROOT);

  // 1. Bundle the real npm web-vitals module into a browser IIFE.
  const entryTmp = path.join(OUT, '_wv_entry.mjs');
  const bundleTmp = path.join(OUT, '_wv_bundle.js');
  const wvIndex = path.join(ROOT, 'node_modules', 'web-vitals', 'dist', 'modules', 'index.js').replaceAll(path.sep, '/');
  fs.writeFileSync(entryTmp, `
import { onCLS, onLCP, onINP, onFCP, onTTFB } from '${wvIndex}';
window.__webVitalsInstrument = (cb) => {
  onCLS(cb, { reportAllChanges: true });
  onLCP(cb, { reportAllChanges: true });
  onINP(cb, { reportAllChanges: true });
  onFCP(cb);
  onTTFB(cb);
};
`);
  await build({ entryPoints: [entryTmp], bundle: true, format: 'iife', outfile: bundleTmp, logLevel: 'silent' });
  const bundle = fs.readFileSync(bundleTmp, 'utf8');

  // 2. Serve the site and measure each page.
  const server = await startServer();
  const base = `http://127.0.0.1:${PORT}`;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
  await context.addInitScript(() => { window.__wv = {}; });
  const results = [];
  let failures = 0;

  for (const route of routes) {
    const page = await context.newPage();
    try {
      await page.goto(base + '/' + route, { waitUntil: 'load', timeout: 20000 });
      await page.addScriptTag({ content: bundle });
      await page.evaluate(() => {
        window.__webVitalsInstrument((entry) => {
          window.__wv[entry.name] = { value: entry.value, rating: entry.rating || null };
        });
      });
      // simulate an interaction so INP has data, then let CLS/LCP settle
      await page.mouse.click(10, 10).catch(() => {});
      await page.waitForTimeout(2500);
      const metrics = await page.evaluate(() => window.__wv);
      const bad = Object.values(metrics).filter((m) => m.rating === 'poor').length;
      const ni = Object.values(metrics).filter((m) => m.rating === 'needs-improvement').length;
      if (bad) failures++;
      results.push({ route, metrics, poorCount: bad, needsImprovementCount: ni });
      console.log(`${route}: ${Object.entries(metrics).map(([k, v]) => `${k}=${Number(v.value).toFixed(1)}${v.rating ? ' (' + v.rating + ')' : ''}`).join(' ') || 'no metrics'}`);
    } catch (e) {
      results.push({ route, error: String(e.message).slice(0, 200) });
      console.log(`${route}: ERROR ${String(e.message).slice(0, 80)}`);
    }
    await page.close();
  }
  await browser.close();
  server.close();
  fs.rmSync(entryTmp, { force: true });
  fs.rmSync(bundleTmp, { force: true });

  fs.writeFileSync(path.join(OUT, 'web-vitals.json'), JSON.stringify({
    tool: 'web-vitals',
    version: JSON.parse(fs.readFileSync(path.join(ROOT, 'node_modules', 'web-vitals', 'package.json'), 'utf8')).version,
    pagesMeasured: results.length,
    pagesWithPoorMetrics: failures,
    results,
  }, null, 2));
  console.log(`[web-vitals] measured ${results.length} pages, ${failures} with poor metric(s) -> output/a11y-lint/web-vitals.json`);
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
