import { test, expect } from '@playwright/test';

test('home carrega e exibe CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /as gigantes/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Agendar diagnóstico/i }).first()).toBeVisible();
  await expect(page.locator('#demo')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Investimento/i })).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Catálogo completo|Ver todos os nichos/i }),
  ).toBeVisible();
});
