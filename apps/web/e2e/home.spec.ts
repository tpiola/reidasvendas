import { test, expect } from '@playwright/test';

test('home apresenta a marca e a jornada principal', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.loading-gold')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1, name: /engenharia que transforma presença digital/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /iniciar diagnóstico/i }).first()).toHaveAttribute('href', '/diagnostico');
  await expect(page.getByRole('link', { name: /ver soluções/i })).toHaveAttribute('href', '/solucoes');
  await expect(page.locator('#solucoes')).toBeVisible();
  await expect(page.locator('#metodo')).toBeVisible();
});

test('alternador inicia claro, ativa escuro e persiste a preferência', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Ativar modo escuro' }).first().click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('opções do diagnóstico preservam o estágio escolhido', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /já tenho algo no ar/i }).click();
  await expect(page).toHaveURL(/\/diagnostico\?estagio=evolucao$/);
});

test('navegação principal abre todas as rotas internas', async ({ page }) => {
  await page.goto('/');
  const routes = ['/solucoes', '/templates', '/portfolio', '/sobre', '/diagnostico'];
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    await expect(page).not.toHaveURL(/404/);
  }
});


test('HTML inicial entrega a proposta de valor sem depender de JavaScript', async ({ request }) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).toContain('Engenharia que transforma presença digital em');
  expect(html).toContain('Iniciar diagnóstico');
});
