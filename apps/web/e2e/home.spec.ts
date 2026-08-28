import { test, expect } from '@playwright/test';

test('home apresenta a marca e a jornada principal', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.loading-gold')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1, name: /seu cliente já está pesquisando/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /quero parar de perder cliente/i }).first()).toHaveAttribute('href', '/solucoes');
  await expect(page.getByRole('link', { name: /ver onde estou perdendo cliente/i }).first()).toHaveAttribute('href', /\/diagnostico/);
  await expect(page.locator('#method-title')).toBeVisible();
  await expect(page.locator('#proof-title')).toBeVisible();
});

test('experiência permanece dark-only sem alternador de tema', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: /modo (claro|escuro)|tema do sistema/i })).toHaveCount(0);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('hero preserva atribuição ao abrir o diagnóstico', async ({ page }) => {
  await page.goto('/?utm_source=campanha-local');
  await page.locator('.rdv-hero').getByRole('link', { name: /ver onde estou perdendo cliente/i }).click();
  await expect(page).toHaveURL(/\/diagnostico\?.*utm_source=campanha-local/);
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
  expect(html).toContain('Seu cliente já está pesquisando');
  expect(html).toContain('Quero parar de perder cliente');
});

test('biblioteca conecta soluções, comparação e ferramentas', async ({ page }) => {
  await page.goto('/solucoes');
  await expect(page.getByRole('heading', { level: 1, name: /pare de perder cliente/i })).toBeVisible();
  await expect(page.getByText(/24 possibilidades encontradas/i)).toBeVisible();
  await page.getByPlaceholder(/vender online/i).fill('representantes');
  await expect(page.getByRole('heading', { level: 3, name: /catálogo para representantes/i })).toBeVisible();
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
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();

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
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
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
  await page.getByRole('button', { name: 'Linha de produto' }).click();
  await expect(page.getByText('Referência PR-410')).toBeVisible();
  await page.getByRole('button', { name: 'Adicionar à cotação' }).first().click();
  await expect(page.getByText(/1 item selecionado/)).toBeVisible();
});

for (const viewport of [
  { name: 'mobile', width: 360, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]) {
  test(`home não cria overflow em ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: /seu cliente já está pesquisando/i })).toBeVisible();
    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(horizontalOverflow).toBeLessThanOrEqual(1);
  });
}
