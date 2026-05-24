import { test, expect } from '@playwright/test';

test('home carrega e exibe CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /as gigantes/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Quero minha máquina de vendas/i }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: /sua máquina de vendas/i })).toBeVisible();
  await expect(page.locator('#demo')).toBeVisible();
  await expect(page.locator('#projetos')).toBeVisible();
  await expect(page.getByRole('link', { name: /Ver planos e investimento/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /ritmo no funil/i })).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Catálogo completo|Ver todos os nichos/i }),
  ).toBeVisible();
});
