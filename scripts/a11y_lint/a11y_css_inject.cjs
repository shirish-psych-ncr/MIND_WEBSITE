#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * a11y_css_inject.cjs — inject vendored a11y.css into HTML files and parse
 * the resulting visual warnings from the DOM (pure-CSS accessibility flags).
 *
 * Tool used:
 *   6. a11y.css -> downloaded to vendor/a11y.css/ (no npm install needed);
 *                  injected into <head>, then every element whose ::before/::after
 *                  content is rendered by a11y.css selectors is collected as a warning.
 *
 * Requires playwright (already a devDependency of this repo).
 * Output: output/a11y-lint/a11ycss.json
 */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'output', 'a11y-lint');
const VENDOR = path.join(ROOT, 'vendor', 'a11y.css');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'output', 'skills', 'vendor', '.claude', '.agents', '.codex', '.opencode', '.cursor']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (SKIP_DIRS.has(e.name)) return [];
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : /\.html?$/i.test(e.name) ? [p] : [];
  });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const errCss = fs.readFileSync(path.join(VENDOR, 'a11y-en_error.css'), 'utf8');
  const warnCss = fs.readFileSync(path.join(VENDOR, 'a11y-en_warning.css'), 'utf8');

  const htmlFiles = walk(ROOT);
  if (!htmlFiles.length) { console.log('[a11y.css] no html files found at repo root scope'); }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  for (const f of htmlFiles) {
    let html = fs.readFileSync(f, 'utf8');
    // inject a11y.css into <head> (idempotent marker)
    const injection = `<style id="a11y-css-injected">${errCss}\n${warnCss}</style>`;
    if (/<head[^>]*>/i.test(html)) html = html.replace(/<head[^>]*>/i, (m) => m + injection);
    else html = injection + html;

    await page.setContent(html, { waitUntil: 'load' });
    const findings = await page.evaluate(() => {
      const out = [];
      const all = document.querySelectorAll('*');
      for (const el of all) {
        for (const pseudo of ['::before', '::after']) {
          const cs = getComputedStyle(el, pseudo);
          const content = cs.content;
          if (!content || content === 'none' || content === 'normal' || content === '""' || content === "''") continue;
          // a11y.css messages are quoted strings; skip generic bullets/decorations
          const text = content.replace(/^["']|["']$/g, '').replace(/\\[^\s]+/g, ' ').trim();
          if (text.length > 3 && /a11y|aria|alt|label|heading|lang|contrast|focus|keyboard|role|title|table|caption|link|button|image|missing|empty|invalid/i.test(text)) {
            out.push({ tag: el.tagName.toLowerCase(), id: el.id || null, class: (el.className && String(el.className).slice(0, 60)) || null, message: text.slice(0, 140), level: pseudo });
          }
        }
      }
      return out.slice(0, 60);
    });
    results.push({ file: path.relative(ROOT, f), flaggedElements: findings.length, findings });
    console.log(`[a11y.css] ${path.relative(ROOT, f)}: ${findings.length} CSS-flagged issues`);
  }
  await browser.close();

  fs.writeFileSync(path.join(OUT, 'a11ycss.json'), JSON.stringify({
    tool: 'a11y.css', version: '5.3.0 (vendored in vendor/a11y.css)',
    filesChecked: htmlFiles.length,
    totalFlagged: results.reduce((n, r) => n + r.flaggedElements, 0),
    results,
  }, null, 2));
  console.log(`[a11y.css] done: ${results.reduce((n, r) => n + r.flaggedElements, 0)} total flags across ${htmlFiles.length} files`);
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
