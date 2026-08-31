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
const browser = await chromium.launch({ headless: true });
const failures = [];
const rows = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.setDefaultTimeout(2500);
  let consoleErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => consoleErrors.push(`pageerror: ${error.message}`));
  for (const route of routes) {
    consoleErrors = [];
    let response;
    try {
      response = await page.goto(`${base}${route}`, { waitUntil: "commit", timeout: 2000 });
      // The site shell is deferred intentionally; a short settled interval
      // is enough to observe its normalized DOM without waiting on remote
      // font/icon work or background network requests.
      await page.waitForTimeout(180);
      await page.evaluate(() => window.scrollTo(0, 0));
      const state = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        headers: document.querySelectorAll("header.site-header").length,
        footers: document.querySelectorAll("footer.site-footer").length,
        mains: document.querySelectorAll("main").length,
        bodyText: document.body.innerText.trim().length,
        brokenImages: [...document.images].filter((image) => image.src && image.naturalWidth === 0 && !image.hidden).map((image) => image.src).slice(0, 3),
        title: document.title,
        styleTail: [...document.querySelectorAll("link[rel=stylesheet]")].slice(-4).map((link) => link.href)
      }));
      const bad = state.scrollWidth > state.width + 1 || state.headers !== 1 || state.footers !== 1 || state.mains !== 1 || !state.bodyText || state.brokenImages.length || consoleErrors.length;
      const row = { viewport: viewport.name, route, status: response?.status(), ...state, consoleErrors };
      rows.push(row);
      if (bad) failures.push(row);
    } catch (error) {
      const row = { viewport: viewport.name, route, status: response?.status() ?? 0, error: error.message, consoleErrors };
      rows.push(row);
      failures.push(row);
    }
  }
  await page.close();
  await context.close();
}

async function menuCheck() {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  page.setDefaultTimeout(3000);
  await page.goto(`${base}/gallery.html`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(350);
  await page.locator("#burgerMenuBtn").click();
  const rootCount = await page.locator(".mobile-nav-tree > li").count();
  const visibleBefore = await page.locator(".mobile-nav-tree-panel").evaluateAll((panels) => panels.filter((panel) => !panel.hidden).length);
  const care = page.locator('.mobile-nav-tree-parent[data-nav-label="Care and services"]');
  await care.click();
  const carePanelId = await care.getAttribute("aria-controls");
  const careOpen = await page.locator(`#${carePanelId}`).evaluate((panel) => !panel.hidden);
  const careTransform = await care.locator(".mobile-nav-branch-chevron").evaluate((svg) => getComputedStyle(svg).transform);
  const who = page.locator('.mobile-nav-tree-parent[data-nav-label="Who we support"]');
  await who.click();
  const whoPanelId = await who.getAttribute("aria-controls");
  const whoOpen = await page.locator(`#${whoPanelId}`).evaluate((panel) => !panel.hidden);
  await context.close();
  return { rootCount, visibleBefore, careOpen, careTransform, whoOpen };
}

async function galleryCheck(viewport) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await context.newPage();
  await page.goto(`${base}/gallery.html`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(550);
  const initial = await page.locator("#stage-image").getAttribute("src");
  const initialScroll = await page.evaluate(() => ({ y: scrollY, x: scrollX }));
  const nextBox = await page.locator("#next-btn").boundingBox();
  await page.locator("#next-btn").click();
  await page.waitForTimeout(200);
  const afterNext = await page.locator("#stage-image").getAttribute("src");
  const nextIndex = await page.evaluate(() => window.galleryPlayer?.getIndex());
  await page.locator("#prev-btn").click();
  await page.waitForTimeout(200);
  const afterPrev = await page.locator("#stage-image").getAttribute("src");
  const thumbCount = await page.locator(".gallery-thumb").count();
  await page.locator(".gallery-thumb").nth(4).click();
  await page.waitForTimeout(150);
  const thumbIndex = await page.evaluate(() => window.galleryPlayer?.getIndex());
  const category = page.locator('.meta-btn[data-target-index="15"]');
  await category.click();
  await page.waitForTimeout(150);
  const categoryIndex = await page.evaluate(() => window.galleryPlayer?.getIndex());
  const state = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, width: innerWidth, active: document.querySelector(".gallery-thumb.is-active")?.getAttribute("aria-label"), errorVisible: !document.querySelector("#stage-error")?.hidden }));
  await context.close();
  return { viewport: viewport.name, initial, afterNext, nextIndex, afterPrev, thumbCount, thumbIndex, categoryIndex, initialScroll, nextBox, state };
}

const menu = await menuCheck();
const galleries = [];
for (const viewport of viewports) galleries.push(await galleryCheck(viewport));

console.log(JSON.stringify({ routeCount: routes.length, failureCount: failures.length, failures, menu, galleries, styleTailSamples: rows.filter((row) => row.route === "/process.html" || row.route === "/tools/guided-breathing.html").slice(0, 8).map((row) => ({ viewport: row.viewport, route: row.route, styleTail: row.styleTail })) }, null, 2));
await browser.close();
