import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('homepage should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // 3 seconds
  });
});