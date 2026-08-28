import { test, expect } from '@playwright/test';

test('home apresenta a marca e a jornada principal', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.loading-gold')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1, name: /antes de pedir outro site/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /abrir diagnóstico/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /ver casos reais/i })).toHaveAttribute('href', '/portfolio');
  await expect(page.locator('#method-title')).toBeVisible();
  await expect(page.locator('#proof-title')).toBeVisible();
});

test('alternador oferece sistema, claro e escuro e persiste a preferência', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'system');
  await page.getByRole('button', { name: /tema do sistema ativo/i }).first().click();
  await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'light');
  await page.getByRole('button', { name: /modo claro ativo/i }).first().click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: /modo escuro ativo/i }).first().click();
  await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'system');
});

test('hero preserva atribuição e antecipa o e-mail no diagnóstico', async ({ page }) => {
  await page.goto('/?utm_source=campanha-local');
  await page.getByLabel('E-mail profissional').fill('comercial@example.com');
  await page.getByRole('button', { name: /abrir diagnóstico/i }).click();
  await expect(page).toHaveURL(/\/diagnostico\?.*utm_source=campanha-local/);
  await expect(page.getByLabel('E-mail')).toHaveValue('comercial@example.com');
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
  expect(html).toContain('Antes de pedir outro site');
  expect(html).toContain('Abrir diagnóstico');
});

test('biblioteca conecta soluções, comparação e ferramentas', async ({ page }) => {
  await page.goto('/solucoes');
  await expect(
    page.getByRole('link', { name: /catálogo inteligente para representantes comerciais/i }).first(),
  ).toBeVisible();
  await page.goto('/solucoes/catalogo-para-representantes');
  await expect(
    page.getByRole('heading', { level: 1, name: /catálogo inteligente para representantes comerciais/i }),
  ).toBeVisible();
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

test('diagnóstico reposiciona e anuncia a próxima etapa', async ({ page }) => {
  await page.goto('/diagnostico?solucao=catalogo-para-representantes');
  await page.getByLabel('Nome').fill('Pessoa de teste');
  await page.getByLabel('Qual é o seu negócio?').selectOption('representacao-comercial');
  await page.getByLabel('Qual problema você quer resolver?').fill('Organizar pedidos enviados pelo WhatsApp.');
  await page.getByRole('button', { name: 'Continuar' }).click();

  const nextStepHeading = page.getByRole('heading', { level: 2, name: /como devemos encaminhar seu diagnóstico/i });
  await expect(nextStepHeading).toBeInViewport();
  await expect(nextStepHeading).toBeFocused();
});

test('diagnóstico conclui o encaminhamento honesto pelo WhatsApp quando não existe webhook', async ({ page }) => {
  await page.route('**/api/lead', async (route) => {
    await route.fulfill({ status: 202, json: { ok: true, delivery: 'whatsapp_handoff' } });
  });
  await page.goto('/diagnostico?solucao=catalogo-para-representantes');
  await page.getByLabel('Nome').fill('Pessoa de teste');
  await page.getByLabel('Qual é o seu negócio?').selectOption('representacao-comercial');
  await page.getByLabel('Qual problema você quer resolver?').fill('Organizar pedidos enviados pelo WhatsApp.');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByLabel('Faixa de investimento disponível').selectOption('5000-10000');
  await page.getByLabel('WhatsApp para retorno').fill('16999999999');
  await page.getByLabel('E-mail').fill('teste@example.com');
  await page.getByLabel('Principal objetivo comercial').selectOption('vender-mais');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: /registrar meu diagnóstico/i }).click();

  await expect(page.getByText('Diagnóstico preparado para envio')).toBeVisible();
  await expect(page.getByText(/ainda precisa ser enviado/i)).toBeVisible();
  const whatsapp = page.getByRole('link', { name: /abrir conversa qualificada/i });
  await expect(whatsapp).toBeVisible();
  expect(decodeURIComponent((await whatsapp.getAttribute('href')) || '')).toContain(
    'Organizar pedidos enviados pelo WhatsApp.',
  );
});

test('demonstração comercial permite filtrar e selecionar produtos', async ({ page }) => {
  await page.goto('/demonstracoes/representacao-comercial');
  await page.getByRole('button', { name: 'Linha premium' }).click();
  await expect(page.getByText('Referência PR-410')).toBeVisible();
  await page.getByRole('button', { name: 'Adicionar à cotação' }).first().click();
  await expect(page.getByText(/1 item selecionado/)).toBeVisible();
});
