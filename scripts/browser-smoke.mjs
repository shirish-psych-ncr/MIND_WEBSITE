import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const failures = [];
for (const route of ['/', '/fees.html', '/dr-anita-sharma.html']) {
  const page = await browser.newPage();
  page.on('console', (message) => {
    if (message.type() === 'error') failures.push(`${route} console: ${message.text()}`);
  });
  page.on('pageerror', (error) => failures.push(`${route} page: ${error.message}`));
  await page.goto(`http://127.0.0.1:8765${route}`, { waitUntil: 'networkidle' });
  const retiredAnalytics = await page.locator('script[src*="amplitude"], script[src*="/cdn-cgi/zaraz/"], script[src*="zaraz-tracking"]').count();
  if (retiredAnalytics) failures.push(`${route}: found ${retiredAnalytics} retired analytics script(s)`);
  if (route === '/fees.html') {
    const text = await page.locator('.fee-terms').textContent();
    if (!text?.includes('each additional 15 minutes costs ₹200')) failures.push('/fees: fee term missing');
  }
  await page.close();
}
await browser.close();
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('Browser smoke passed for /, /fees, and /dr-anita-sharma with no console or page errors.');
