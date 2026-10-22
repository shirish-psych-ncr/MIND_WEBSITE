// Audit only the published build, using installed modules (no AXE_PATH required).
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');
const args = process.argv.slice(2);
const option = (name, fallback) => args.find(a => a.startsWith(`--${name}=`))?.split('=')[1] ?? fallback;
const out = path.resolve('output/accessibility-audit', option('out', 'latest'));
const widths = option('widths', '390,1440').split(',').map(Number);
const themes = option('themes', 'light,dark').split(',');
const scenario = option('scenario', 'default');
const root = path.resolve('dist');
const manifest = JSON.parse(await readFile(path.join(root, 'route-manifest.json'), 'utf8'));
const selected = args.filter(a => !a.startsWith('--')).map(a => a.startsWith('/') ? a : '/' + a);
const routes = selected.length ? selected : [...new Set([...manifest.routes, '/offline.html'])];
await mkdir(out, { recursive: true });
const server = createServer(async (req, res) => {
  let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (name === '/') name = '/index.html';
  if (!path.extname(name)) name += '.html';
  const file = path.resolve(root, '.' + name);
  if (!file.startsWith(root + path.sep)) return res.writeHead(403).end();
  try {
    res.setHeader('Content-Type', ({ '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.json':'application/json', '.png':'image/png', '.webp':'image/webp', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.ico':'image/x-icon' })[path.extname(file)] || 'application/octet-stream');
    res.end(await readFile(file));
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true });
const jobs = routes.flatMap(route => widths.flatMap(width => themes.map(theme => ({ route, width, theme }))));
const results = [];
let next = 0;
function measureLayout() {
  const selector = el => {
    if (el.id) return '#' + CSS.escape(el.id);
    const classes = [...el.classList].filter(c => !/astro-|is-visible|fade/.test(c)).slice(0, 3);
    return el.tagName.toLowerCase() + classes.map(c => '.' + CSS.escape(c)).join('');
  };
  const visible = el => {
    const c = getComputedStyle(el), r = el.getBoundingClientRect();
    return r.width > 2 && r.height > 2 && c.visibility !== 'hidden' && c.display !== 'none' && c.opacity !== '0' && !el.closest('[hidden], .visually-hidden, .sr-only, [inert]');
  };
  const surfaces = 'main :is(.card,.service-card,.feature-card,.condition-card,.price-card,.contact-card,.testimonial-card,.resource-card,.article-card,.tool-card,.seo-card,.mg-card,.panel,.notice-box,.info-box,.callout,.blog-answer,.seo-answer,.direct-answer,.badge,.pill,.chip,.tag,.filter-chip,.mg-pill,.mg-chip,.eyebrow,.service-tag,.expertise-tag,.section-badge,.hero-badge,button,a.btn,a.button,a.button-primary,a.button-ghost)';
  const issues = [];
  const candidates = new Set(document.querySelectorAll(surfaces));
  // Include page-specific boxed styles, not just the shared class names.
  for (const el of document.querySelectorAll('main *')) {
    if (el.matches('input,select,textarea,svg,svg *,canvas,img,table,thead,tbody,tr,th,td,hr,fieldset,legend')) continue;
    const c = getComputedStyle(el);
    if (['Top','Right','Bottom','Left'].every(side => parseFloat(c[`border${side}Width`]) > 0) && el.textContent.trim()) candidates.add(el);
  }
  for (const el of candidates) {
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect(), c = getComputedStyle(el);
    // A deliberate scroll region contains wider content; audit its cells and
    // the document reflow separately, rather than calling scrolling clipping.
    if (['auto', 'scroll'].includes(c.overflowX) && el.scrollWidth > el.clientWidth + 2) continue;
    const compact = el.matches('button,a,.badge,.pill,.chip,.tag,.filter-chip,.mg-pill,.mg-chip,.eyebrow,.service-tag,.expertise-tag,.section-badge,.hero-badge');
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const rects = [];
    let node;
    while ((node = walker.nextNode()) && rects.length < 60) {
      if (!node.textContent.trim() || !visible(node.parentElement)) continue;
      const nestedScroller = node.parentElement.closest('.table-scroll,.table-responsive,.table-wrapper,.programme-tables');
      if (nestedScroller && nestedScroller !== el && el.contains(nestedScroller)) continue;
      const range = document.createRange(); range.selectNodeContents(node);
      for (const t of range.getClientRects()) if (t.width > 2 && t.height > 2) rects.push(t);
    }
    if (!rects.length) continue;
    const inset = { left: Math.min(...rects.map(t => t.left)) - r.left, right: r.right - Math.max(...rects.map(t => t.right)), top: Math.min(...rects.map(t => t.top)) - r.top, bottom: r.bottom - Math.max(...rects.map(t => t.bottom)) };
    const clipping = Object.values(inset).some(n => n < -2);
    const cramped = compact ? Math.min(inset.left, inset.right) < 6 || Math.min(inset.top, inset.bottom) < 2 : Math.min(inset.left, inset.right) < 10 || Math.min(inset.top, inset.bottom) < 6;
    if (clipping || cramped) issues.push({ kind: clipping ? 'text-outside-surface' : 'small-text-inset', selector: selector(el), text: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 110), inset: Object.fromEntries(Object.entries(inset).map(([k,v]) => [k, Math.round(v*10)/10])), padding: c.padding, html: el.outerHTML.slice(0, 260) });
  }
  const overflow = [...document.querySelectorAll('main *')].filter(el => {
    if (!visible(el) || el.closest('[role="region"],.table-scroll,.table-responsive,.table-wrapper,.stage-viewport,canvas,svg')) return false;
    const r = el.getBoundingClientRect();
    return r.left < -2 || r.right > innerWidth + 2;
  }).slice(0, 20).map(el => ({ selector: selector(el), text: el.textContent.trim().replace(/\s+/g, ' ').slice(0,80) }));
  return { issues, overflow, documentOverflow: document.documentElement.scrollWidth > innerWidth + 2 };
}
async function worker() {
  while (next < jobs.length) {
    const job = jobs[next++];
    const context = await browser.newContext({ viewport: { width: job.width, height: 900 }, colorScheme: job.theme, reducedMotion: 'reduce', serviceWorkers: 'block' });
    await context.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
    const page = await context.newPage();
    try {
      const response = await page.goto(origin + job.route, { waitUntil:'load' });
      if (!response?.ok()) throw new Error(`Route returned HTTP ${response?.status()}`);
      await page.waitForFunction(() => document.body.dataset.shellBound === 'true');
      await page.evaluate(() => document.fonts.ready);
      if (scenario === 'text-spacing') await page.addStyleTag({ content: '* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }' });
      if (scenario === 'large-text') await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
      if (scenario === 'high-contrast') {
        await page.locator('#accessibility-toggle').click();
        await page.locator('[data-accessibility="contrast"]').click();
        await page.keyboard.press('Escape');
      }
      if (scenario === 'menu') {
        if (job.width <= 1100) {
          await page.locator('#burgerMenuBtn').click();
          await page.locator('.mobile-nav-disclosure').first().click();
        } else await page.locator('.nav-funnel-trigger').first().click();
      }
      if (scenario === 'accessibility') await page.locator('#accessibility-toggle').click();
      if (await page.locator('[data-feed-grid]').count()) await page.waitForFunction(() => document.querySelector('[data-feed-grid]')?.children.length > 0);
      await page.addScriptTag({ path: axePath });
      const audit = await page.evaluate(async () => {
        const r = await axe.run(document, { runOnly: { type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice'] } });
        const compact = v => ({ id:v.id, impact:v.impact, help:v.help, nodes:v.nodes.map(n => ({ target:n.target, html:n.html, summary:n.failureSummary, checks:[...n.any,...n.all,...n.none].map(c => ({id:c.id,message:c.message,data:c.data})) })) });
        const criticalContrast = r.incomplete.filter(v=>v.id==='color-contrast').flatMap(v=>v.nodes.filter(n=>[...n.any,...n.all,...n.none].some(c=>c.data?.messageKey==='equalRatio')));
        return { axeVersion:axe.version, violations:r.violations.map(compact), incomplete:r.incomplete.filter(v=>v.id==='color-contrast').map(compact), criticalContrast:criticalContrast.map(n=>({target:n.target,html:n.html,summary:n.failureSummary})), passes:r.passes.length };
      });
      const layout = await page.evaluate(measureLayout);
      results.push({ ...job, ...audit, layout });
    } catch (error) { results.push({ ...job, error: String(error) }); }
    finally { await context.close(); }
    if (results.length % 20 === 0 || results.length === jobs.length) {
      await writeFile(path.join(out, 'results.json'), JSON.stringify(results, null, 2));
      console.log(`${results.length}/${jobs.length} scans; ${results.reduce((n,r)=>n+(r.violations?.length||0),0)} rule violations`);
    }
  }
}
try {
  await Promise.all(Array.from({length:Number(option('workers','4'))}, worker));
  const rules = {}, surfaces = {};
  for (const r of results) {
    for (const v of r.violations || []) { const s = rules[v.id] ||= { scans:0,nodes:0,samples:[] }; s.scans++; s.nodes += v.nodes.length; if (s.samples.length < 6) s.samples.push({route:r.route,theme:r.theme,width:r.width,nodes:v.nodes.slice(0,4)}); }
    for (const v of r.layout?.issues || []) { const k=v.kind+': '+v.selector; const s=surfaces[k] ||= {count:0,samples:[]};s.count++;if(s.samples.length<3)s.samples.push({route:r.route,theme:r.theme,width:r.width,...v}); }
  }
  const summary = { scans:results.length, routes:routes.length, widths, themes, scenario, errors:results.filter(r=>r.error), criticalContrast:results.filter(r=>r.criticalContrast?.length).map(r=>({route:r.route,width:r.width,theme:r.theme,nodes:r.criticalContrast})), rules, surfaces:Object.fromEntries(Object.entries(surfaces).sort((a,b)=>b[1].count-a[1].count)), overflow:results.filter(r=>r.layout?.documentOverflow).map(r=>({route:r.route,width:r.width,theme:r.theme})) };
  await writeFile(path.join(out, 'results.json'), JSON.stringify(results,null,2));
  await writeFile(path.join(out, 'summary.json'), JSON.stringify(summary,null,2));
  console.log(JSON.stringify({scans:summary.scans,errors:summary.errors.length,criticalContrast:summary.criticalContrast.length,rules:Object.fromEntries(Object.entries(rules).map(([k,v])=>[k,{scans:v.scans,nodes:v.nodes}])),spacing:results.reduce((n,r)=>n+(r.layout?.issues.length||0),0),overflow:summary.overflow.length},null,2));
  if (summary.errors.length || summary.criticalContrast.length || Object.keys(rules).length) process.exitCode = 1;
} finally { await browser.close(); server.close(); }
