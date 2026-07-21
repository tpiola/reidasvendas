import { test, expect } from '@playwright/test';

test('home soberana carrega e apresenta a jornada principal', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /seu negócio é local/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /solicitar diagnóstico/i }).first()).toBeVisible();
  await expect(page.locator('#solucoes')).toBeVisible();
  await expect(page.locator('#metodo')).toBeVisible();
  await expect(page.getByRole('link', { name: /iniciar diagnóstico/i })).toBeVisible();
});

test('navegação interna preserva retorno ao topo', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 800));
  await page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'Sobre' })
    .click();
  await page.waitForURL('**/sobre');
  await page.waitForFunction(() => window.scrollY < 80);
});
