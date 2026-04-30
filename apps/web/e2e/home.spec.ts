import { test, expect } from '@playwright/test';

test('home carrega e exibe CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Arquitetura digital com IA/i })).toBeVisible();
  const hero = page.getByRole('region', { name: /Arquitetura digital com IA/i });
  await expect(hero.getByRole('link', { name: /Solicitar diagnóstico/i })).toBeVisible();
});

