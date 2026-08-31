import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL("C:/Users/lenovo/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs").href);
const browser = await chromium.launch({ headless: true });
for (const viewport of [{ width: 1440, height: 900 }, { width: 1024, height: 768 }, { width: 390, height: 844 }, { width: 844, height: 390 }]) {
  const page = await browser.newPage({ viewport });
  await page.goto("http://127.0.0.1:4173/tools/butterfly-tapper.html", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(350);
  await page.locator("#L").click();
  await page.waitForTimeout(250);
  console.log(JSON.stringify({ viewport, state: await page.evaluate(() => ({ innerWidth, scrollWidth: document.documentElement.scrollWidth, nodes: [...document.querySelectorAll("body *")].map((e) => ({ tag: e.tagName, id: e.id, cls: typeof e.className === "string" ? e.className : "", left: e.getBoundingClientRect().left, right: e.getBoundingClientRect().right, width: e.getBoundingClientRect().width })).filter((e) => e.left < -1 || e.right > innerWidth + 1).slice(0, 12) })) }));
  await page.close();
}
await browser.close();
