import { test, expect } from '@playwright/test';

test('home apresenta a marca e a jornada principal', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.loading-gold')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1, name: /sua empresa não precisa de mais software/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /mapear minha operação/i }).first()).toHaveAttribute('href', '/diagnostico');
  await expect(page.getByRole('link', { name: /explorar arquiteturas/i }).first()).toHaveAttribute('href', '/solucoes');
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
  const routes = ['/solucoes', '/demonstracoes', '/ferramentas', '/portfolio', '/diagnostico'];
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
  expect(html).toContain('Sua empresa não precisa de mais software');
  expect(html).toContain('Mapear minha operação');
});

test('biblioteca conecta soluções, comparação e ferramentas', async ({ page }) => {
  await page.goto('/solucoes');
  await expect(page.getByRole('link', { name: /catálogo inteligente para representantes comerciais/i }).first()).toBeVisible();
  await page.goto('/solucoes/catalogo-para-representantes');
  await expect(page.getByRole('heading', { level: 1, name: /catálogo inteligente para representantes comerciais/i })).toBeVisible();
  await page.goto('/alternativas/wix');
  await expect(page.getByRole('heading', { level: 1, name: /alternativa ao wix/i })).toBeVisible();
  await page.goto('/ferramentas/calculadora-roi');
  await expect(page.getByRole('heading', { level: 1, name: /calculadora de roi comercial/i })).toBeVisible();
});

test('diagnóstico mantém WhatsApp atrás do gate de qualificação', async ({ page }) => {
  await page.goto('/diagnostico?solucao=catalogo-para-representantes');
  await expect(page.getByRole('link', { name: /abrir conversa qualificada/i })).toHaveCount(0);
  await expect(page.getByLabel('O que você precisa?')).toHaveValue('catalogo-para-representantes');
});

test('demonstração comercial permite filtrar e selecionar produtos', async ({ page }) => {
  await page.goto('/demonstracoes/representacao-comercial');
  await page.getByRole('button', { name: 'Linha premium' }).click();
  await expect(page.getByText('Referência PR-410')).toBeVisible();
  await page.getByRole('button', { name: 'Adicionar à cotação' }).first().click();
  await expect(page.getByText(/1 item selecionado/)).toBeVisible();
});
