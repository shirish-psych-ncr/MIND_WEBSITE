import { pathToFileURL } from "node:url";

const { chromium } = await import(pathToFileURL("C:/Users/lenovo/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs").href);
const base = "http://127.0.0.1:4173/tools";
const checks = [
  { file: "guided-breathing.html", start: "#start-btn", stop: "#stop-btn", active: "#session" },
  { file: "eye-movement.html", start: "#eye-start-btn", stop: "#eye-stop-btn", active: "#active-view" },
  { file: "horizon-scan.html", start: "#horizon-start-btn", stop: "#horizon-stop-btn", active: "#horizon-active" },
  { file: "hypnos-fractal.html", start: "#min-btn", active: "#fractal-ui" },
  { file: "leaf-on-stream.html", start: "#ui-trigger", active: "#ui" },
  { file: "butterfly-tapper.html", start: "#L", active: "#label" }
];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "mobile", width: 390, height: 844 },
  { name: "landscape", width: 844, height: 390 }
];

const browser = await chromium.launch({ headless: true });
const results = [];
for (const viewport of viewports) for (const check of checks) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  await page.goto(`${base}/${check.file}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(450);
  const before = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  const startExists = await page.locator(check.start).count();
  let interaction = "not-run";
  if (startExists) {
    await page.locator(check.start).click();
    await page.waitForTimeout(250);
    interaction = await page.locator(check.active).evaluate((element) => ({ hidden: element.classList.contains("hidden"), display: getComputedStyle(element).display, text: element.textContent.trim().slice(0, 80) }));
    if (check.stop && await page.locator(check.stop).count()) await page.locator(check.stop).click();
  }
  const after = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, header: document.querySelectorAll("header.site-header").length, footer: document.querySelectorAll("footer.site-footer").length, overflowNodes: [...document.querySelectorAll("body *")].map((element) => ({ tag: element.tagName, id: element.id, className: element.className, right: Math.round(element.getBoundingClientRect().right), left: Math.round(element.getBoundingClientRect().left) })).filter(({ right, left }) => right > innerWidth + 1 || left < -1).slice(0, 8) }));
  results.push({ viewport: viewport.name, file: check.file, startExists, interaction, before, after, errors });
  await context.close();
}
console.log(JSON.stringify(results, null, 2));
await browser.close();
