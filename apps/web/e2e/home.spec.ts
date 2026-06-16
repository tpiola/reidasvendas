import { test, expect } from '@playwright/test';

test('home carrega e exibe hero + CTAs', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { level: 1, name: /infraestrutura digital/i }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Diagnóstico Digital Gratuito/i }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Ver Soluções/i }).first(),
  ).toBeVisible();
});

test('navegação principal leva a Serviços', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'Serviços' })
    .click();
  await page.waitForURL('**/servicos');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
