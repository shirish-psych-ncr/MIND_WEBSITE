// Run after build. Audit every generated route using real browser geometry.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const out = path.resolve('output/shell-audit');
await mkdir(out, { recursive: true });
const server = createServer(async (req, res) => {
  let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (name === '/') name = '/index.html';
  if (!path.extname(name)) name += '.html';
  const file = path.resolve(root, '.' + name);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  try {
    const data = await readFile(file);
    res.setHeader('Content-Type', ({ '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' })[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(8766, '127.0.0.1', resolve));
const browser = await chromium.launch({ headless: true });
const manifest = JSON.parse(await readFile(path.join(root, 'route-manifest.json')));
const routes = process.argv.slice(2).length ? process.argv.slice(2) : [...new Set([...manifest.routes, '/offline.html'])];
const results = [];
try {
  for (const width of [320, 360, 768, 1100, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
    await context.route('**/*', route => route.request().url().startsWith('http://127.0.0.1:8766') ? route.continue() : route.abort());
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto('http://127.0.0.1:8766' + route, { waitUntil: 'load' });
      await page.waitForFunction(() => document.body.dataset.shellBound === 'true');
      const issues = await page.evaluate(() => {
        const issues = [];
        const vw = innerWidth;
        for (const selector of ['.site-header', '.site-footer']) {
          if (document.querySelectorAll(selector).length !== 1) issues.push(`count ${selector}`);
          const shell = document.querySelector(selector);
          for (const el of [shell, ...shell.querySelectorAll('a, button, h2, p, address')]) {
            const r = el.getBoundingClientRect();
            if (!r.width || !r.height) continue;
            if (r.left < -1 || r.right > vw + 1) issues.push(`overflow ${el.className || el.tagName}: ${Math.round(r.left)}..${Math.round(r.right)}`);
          }
        }
        const logo = document.querySelector('.logo-link').getBoundingClientRect();
        const actions = document.querySelector('.header-actions').getBoundingClientRect();
        if (logo.right > actions.left + 1) issues.push('logo overlaps actions');
        const nav = document.querySelector('.desktop-nav');
        const menu = document.querySelector('#burgerMenuBtn');
        if ((vw <= 1100) !== (getComputedStyle(nav).display === 'none')) issues.push('wrong navigation breakpoint');
        if (vw <= 1100 && !menu.getBoundingClientRect().width) issues.push('missing menu');
        for (const dropdown of document.querySelectorAll('.nav-funnel-menu')) {
          if (dropdown.getBoundingClientRect().height) issues.push('dropdown visible while closed');
        }
        return [...new Set(issues)];
      });
      results.push({ route, width, issues });
      if (route === '/') {
        await page.locator('.skip-link').focus();
        const skipUsable = await page.locator('.skip-link').evaluate(el => {
          const r = el.getBoundingClientRect();
          return r.y >= 0 && r.left >= 0 && r.right <= innerWidth && el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
        });
        if (!skipUsable) throw new Error('Focused skip link is hidden or covered');
        await page.locator('.skip-link').press('Enter');
        if (!await page.locator('main').evaluate(el => el === document.activeElement)) throw new Error('Skip link did not focus main content');
        await page.evaluate(() => window.scrollTo(0, 0));
      }
      if (route === '/' || route === '/contact' || route === '/academic-training') {
        await page.screenshot({ path: path.join(out, `${route.replaceAll('/', '') || 'home'}-${width}.png`), fullPage: true });
      }
      if (route === '/' && width <= 1100) {
        await page.locator('#burgerMenuBtn').click();
        await page.locator('.mobile-nav-panel').waitFor({ state: 'visible' });
        const closeUsable = await page.locator('.close-mobile-menu').evaluate(el => {
          const r = el.getBoundingClientRect();
          return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
        });
        if (!closeUsable) throw new Error('Mobile menu close control is covered');
        await page.keyboard.press('Escape');
        if (await page.locator('#burgerMenuBtn').getAttribute('aria-expanded') !== 'false') throw new Error('Menu failed to close');
        if (!await page.locator('#burgerMenuBtn').evaluate(el => el === document.activeElement)) throw new Error('Menu did not restore keyboard focus');
      }
      if (route === '/' && width > 1100) {
        const funnelTrigger = page.locator('.nav-funnel-trigger').first();
        await funnelTrigger.focus();
        await funnelTrigger.press('Enter');
        await page.locator('.nav-funnel-menu').first().waitFor({ state: 'visible' });
        await page.keyboard.press('Tab');
        if (!await page.locator('.nav-funnel-menu a').first().evaluate(el => el === document.activeElement)) throw new Error('Dropdown keyboard navigation failed');
        await page.keyboard.press('Escape');
        if (await funnelTrigger.getAttribute('aria-expanded') !== 'false') throw new Error('Dropdown failed to close with Escape');
      }
      if (route === '/' && width === 360) {
        await page.locator('#theme-toggle').click();
        await page.locator('#accessibility-toggle').click();
        await page.locator('[data-accessibility="contrast"]').click();
        await page.keyboard.press('Escape');
        if (!await page.locator('html').evaluate(el => el.dataset.theme === 'light' && el.classList.contains('a11y-contrast'))) throw new Error('High contrast did not select its coherent palette');
        await page.reload({ waitUntil: 'load' });
        await page.waitForFunction(() => document.body.dataset.shellBound === 'true');
        if (!await page.locator('html').evaluate(el => el.dataset.theme === 'light' && el.classList.contains('a11y-contrast'))) throw new Error('Contrast preference did not survive reload');
        await page.locator('#accessibility-toggle').click();
        await page.locator('[data-accessibility="reset"]').click();
        await page.keyboard.press('Escape');
        if (await page.locator('html').getAttribute('data-theme') !== 'dark') throw new Error('Reset did not restore the saved dark theme');
        await page.locator('#theme-toggle').click();
      }
    }
    console.log(`${width}px: ${results.filter(r => r.width === width && r.issues.length).length} failing routes / ${routes.length}`);
    await context.close();
  }
  await writeFile(path.join(out, 'results.json'), JSON.stringify(results, null, 2));
  const failures = results.filter(r => r.issues.length);
  console.log(JSON.stringify(failures.slice(0, 12), null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close();
  server.close();
}
