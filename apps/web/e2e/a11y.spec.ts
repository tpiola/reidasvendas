import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('a11y: home sem violações críticas', async ({ page }) => {
  test.setTimeout(60000);
  await page.addStyleTag({
    content:
      '*{animation-duration:0.001ms !important;animation-iteration-count:1 !important;transition-duration:0.001ms !important;scroll-behavior:auto !important;}',
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  const results = await new AxeBuilder({ page }).analyze();
  const criticalOrSerious = results.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
  expect(criticalOrSerious).toEqual([]);
});

