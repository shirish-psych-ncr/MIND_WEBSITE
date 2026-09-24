// Run against a local server. Requires playwright; NODE_PATH is supported.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const base = process.env.AUDIT_URL || 'http://127.0.0.1:8765';
const out = path.join(root, 'output', 'responsive-audit');
fs.mkdirSync(out, { recursive: true });
function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => ['.git', 'node_modules', 'output'].includes(e.name) ? [] : e.isDirectory() ? files(path.join(dir, e.name)) : e.name.endsWith('.html') ? [path.relative(root, path.join(dir, e.name)).replaceAll('\\', '/')] : []);
}
(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  for (const mode of [{width:320,height:740,colorScheme:'light'}, {width:844,height:390,colorScheme:'dark'}, {width:1440,height:900,colorScheme:'light'}]) {
    const context = await browser.newContext({ viewport: mode, colorScheme: mode.colorScheme, reducedMotion: 'reduce', serviceWorkers: 'block' });
    await context.route('**/*', r => r.request().url().startsWith(base) ? r.continue() : r.abort());
    const page = await context.newPage();
    let errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const file of files(root)) {
      errors = [];
      await page.goto(base + '/' + file, { waitUntil: 'load' });
      const result = await page.evaluate(() => {
        const visible = el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
        const overflow = [...document.querySelectorAll('main *, .site-header *, .site-footer *')].filter(el => {
          if (!visible(el) || el.closest('[hidden]') || getComputedStyle(el).position === 'absolute') return false;
          let ancestor = el.parentElement;
          while (ancestor && ancestor !== document.body) {
            if (['auto','scroll'].includes(getComputedStyle(ancestor).overflowX) && ancestor.scrollWidth > ancestor.clientWidth) return false;
            ancestor = ancestor.parentElement;
          }
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > innerWidth + 2 || r.left < -2) && !el.closest('.sr-only, .visually-hidden');
        }).slice(0, 8).map(el => ({tag:el.tagName, cls:el.className, text:el.textContent.trim().slice(0,50)}));
        return { header:document.querySelectorAll('.site-header').length, footer:document.querySelectorAll('.site-footer').length, main:document.querySelectorAll('main').length, h1:document.querySelectorAll('h1').length, overflow, theme:document.documentElement.dataset.theme, foundation:document.querySelectorAll('link[href*="site-foundation"]').length };
      });
      results.push({file, ...mode, ...result, errors:[...errors]});
      if (['index.html','blog/index.html','tools/guided-breathing.html'].includes(file)) await page.screenshot({path:path.join(out, `${file.replaceAll('/','-')}-${mode.width}.png`)});
    }
    await context.close();
    console.log('Completed viewport ' + mode.width);
  }
  fs.writeFileSync(path.join(out, 'all-pages.json'), JSON.stringify(results,null,2));
  const issues = results.filter(r => r.header!==1 || r.footer!==1 || r.main!==1 || r.h1!==1 || r.foundation!==1 || r.overflow.length || r.errors.length);
  fs.writeFileSync(path.join(out, 'issues.json'), JSON.stringify(issues,null,2));
  console.log(JSON.stringify({checked:results.length,issues:issues.length}));
  await browser.close();
})().catch(e => { console.error(e); process.exitCode=1; });
