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
  const blocking = results.violations.filter((violation) =>
    violation.impact === 'critical' || violation.impact === 'serious');
  expect(blocking).toEqual([]);
});
