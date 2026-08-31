import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL("C:/Users/lenovo/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs").href);

const root = "C:/Users/lenovo/Documents/mind_grace/Website/preview";
const base = "http://127.0.0.1:4173";
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "mobile", width: 390, height: 844 },
  { name: "landscape", width: 844, height: 390 }
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".")) return walk(full);
    return entry.isFile() && entry.name.endsWith(".html") ? [full] : [];
  });
}

const routes = walk(root)
  .filter((file) => !file.includes(`${path.sep}assets${path.sep}components${path.sep}`))
  .map((file) => `/${path.relative(root, file).replaceAll("\\", "/")}`);
const renderedRoutes = [
  "/index.html", "/about.html", "/services.html", "/process.html", "/contact.html",
  "/faq.html", "/gallery.html", "/resources.html", "/terms.html", "/blog/index.html",
  "/blog/pages/adult/overthinking-vs-anxiety.html", "/tools/guided-breathing.html",
  "/tools/eye-movement.html", "/tools/hypnos-fractal.html", "/tools/leaf-on-stream.html"
];

const staticPages = await Promise.all(routes.map(async (route) => {
  try {
    const response = await fetch(`${base}${route}`);
    const html = await response.text();
    return { route, status: response.status, hasTitle: /<title\b/i.test(html), hasBody: /<body\b/i.test(html), length: html.length };
  } catch (error) {
    return { route, status: 0, error: error.message };
  }
}));
const uniqueAssets = new Set();
for (const page of staticPages) {
  if (page.status !== 200) continue;
  const html = await (await fetch(`${base}${page.route}`)).text();
  for (const match of html.matchAll(/(?:src|href)=["'](\/[^"'#?]+)(?:[?#][^"']*)?["']/gi)) {
    const asset = match[1];
    if (/\.(?:css|js|png|jpe?g|webp|svg|ico|woff2?|mp4|webm)$/i.test(asset)) uniqueAssets.add(asset);
  }
}
const assetChecks = await Promise.all([...uniqueAssets].map(async (asset) => {
  try { return { asset, status: (await fetch(`${base}${asset}`, { method: "HEAD" })).status }; }
  catch (error) { return { asset, status: 0, error: error.message }; }
}));

const browser = await chromium.launch({ headless: true });
const renderFailures = [];
const renderRows = [];
for (const viewport of viewports) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await context.newPage();
  page.setDefaultTimeout(5000);
  for (const route of renderedRoutes) {
    const errors = [];
    const onConsole = (message) => { if (message.type() === "error") errors.push(message.text()); };
    const onPageError = (error) => errors.push(`pageerror: ${error.message}`);
    page.on("console", onConsole);
    page.on("pageerror", onPageError);
    try {
      const response = await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded", timeout: 6000 });
      await page.waitForTimeout(450);
      await page.evaluate(() => window.scrollTo(0, 0));
      const row = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        headers: document.querySelectorAll("header.site-header").length,
        footers: document.querySelectorAll("footer.site-footer").length,
        mains: document.querySelectorAll("main").length,
        bodyText: document.body.innerText.trim().length,
        brokenImages: [...document.images].filter((image) => image.src && image.naturalWidth === 0 && !image.hidden).map((image) => image.src).slice(0, 4),
        breadcrumbLinks: document.querySelectorAll(".breadcrumbs a").length,
        hasTheme: document.documentElement.dataset.theme === "light" || document.documentElement.dataset.theme === "dark"
      }));
      const issue = row.scrollWidth > row.width + 1 || row.headers !== 1 || row.footers !== 1 || row.mains !== 1 || !row.bodyText || row.brokenImages.length || errors.length;
      const result = { viewport: viewport.name, route, status: response?.status(), ...row, errors };
      renderRows.push(result);
      if (issue) renderFailures.push(result);
    } catch (error) {
      const result = { viewport: viewport.name, route, status: 0, error: error.message, errors };
      renderRows.push(result);
      renderFailures.push(result);
    }
    page.off("console", onConsole);
    page.off("pageerror", onPageError);
  }
  await page.close();
  await context.close();
}

async function menuCheck() {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${base}/gallery.html`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(450);
  await page.locator("#burgerMenuBtn").click();
  const rootCount = await page.locator(".mobile-nav-tree > li").count();
  const visibleBefore = await page.locator(".mobile-nav-children").evaluateAll((panels) => panels.filter((panel) => !panel.hidden).length);
  const care = page.locator('.mobile-nav-tree-parent[data-nav-label="Care and services"]');
  await care.click();
  const carePanel = page.locator(`#${await care.getAttribute("aria-controls")}`);
  const careOpen = await carePanel.evaluate((panel) => !panel.hidden);
  const careTransform = await care.locator(".mobile-nav-branch-chevron").evaluate((svg) => getComputedStyle(svg).transform);
  const who = page.locator('.mobile-nav-tree-parent[data-nav-label="Who we support"]');
  await who.click();
  const whoOpen = await page.locator(`#${await who.getAttribute("aria-controls")}`).evaluate((panel) => !panel.hidden);
  await context.close();
  return { rootCount, visibleBefore, careOpen, careTransform, whoOpen };
}

async function galleryCheck(viewport) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await context.newPage();
  await page.goto(`${base}/gallery.html`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(650);
  const initial = await page.locator("#stage-image").getAttribute("src");
  const startScroll = await page.evaluate(() => ({ x: scrollX, y: scrollY }));
  await page.locator("#next-btn").click();
  await page.waitForTimeout(450);
  const afterNext = await page.locator("#stage-image").getAttribute("src");
  const indexAfterNext = await page.evaluate(() => window.galleryPlayer?.getIndex());
  await page.locator("#prev-btn").click();
  await page.waitForTimeout(450);
  const afterPrev = await page.locator("#stage-image").getAttribute("src");
  await page.locator('.meta-btn[data-target-index="15"]').click();
  await page.waitForTimeout(250);
  const categoryIndex = await page.evaluate(() => window.galleryPlayer?.getIndex());
  const values = await page.evaluate(() => ({ x: scrollX, y: scrollY, thumbs: document.querySelectorAll(".gallery-thumb").length, width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  await context.close();
  return { viewport: viewport.name, initial, afterNext, afterPrev, indexAfterNext, categoryIndex, startScroll, values };
}

const menu = await menuCheck();
const galleries = [];
for (const viewport of viewports) galleries.push(await galleryCheck(viewport));

const dark = [];
for (const route of ["/index.html", "/gallery.html", "/process.html", "/tools/guided-breathing.html"]) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(550);
  await page.evaluate(() => { document.documentElement.dataset.theme = "dark"; });
  dark.push({ route, values: await page.evaluate(() => {
    const pick = (selector) => { const e = document.querySelector(selector); if (!e) return null; const style = getComputedStyle(e); return { bg: style.backgroundColor, color: style.color }; };
    return { body: pick("body"), header: pick(".site-header"), footer: pick(".site-footer"), card: pick(".card, .tool-card"), accordion: pick(".accordion-trigger"), caption: pick(".stage-caption") };
  }) });
  await context.close();
}

console.log(JSON.stringify({
  routeCount: routes.length,
  staticFailures: staticPages.filter((page) => page.status !== 200 || !page.hasTitle || !page.hasBody),
  assetCount: assetChecks.length,
  assetFailures: assetChecks.filter((asset) => asset.status < 200 || asset.status >= 400),
  renderedRouteCount: renderedRoutes.length,
  renderFailureCount: renderFailures.length,
  renderFailures,
  menu,
  galleries,
  dark
}, null, 2));
await browser.close();
