import { test, expect } from '@playwright/test';

test('home carrega e exibe CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /vendendo como as gigantes/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Quero minha máquina de vendas/i }).first()).toBeVisible();
  await expect(page.locator('#demo')).toBeVisible();
  await expect(page.locator('#evolucao')).toBeVisible();
  await expect(page.locator('#projetos')).toBeVisible();
  await expect(page.getByRole('link', { name: /Ver planos/i }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: /escalou/i })).toBeVisible();
});

test('navegação sobe ao topo', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Projetos' }).click();
  await page.waitForURL('**/projetos');
  await page.waitForFunction(() => window.scrollY < 80);
});
