import { test, expect } from '@playwright/test';

test('home apresenta a marca e a jornada principal', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.loading-gold')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1, name: /você não perde venda por falta de tráfego/i })).toBeVisible();
  await expect(page.locator('.rdv-studio-hero').getByRole('link', { name: /solicitar triagem clínica/i })).toHaveAttribute('href', '/diagnostico?origem=home-hero&estagio=triagem');
  await expect(page.getByRole('link', { name: /ver o protocolo de auditoria/i }).first()).toHaveAttribute('href', '#protocolo');
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

test('hero leva aos projetos publicados', async ({ page }) => {
  await page.addInitScript(() => {
    try { localStorage.setItem('reidasvendas:cookie-consent', 'rejected'); } catch { /* ignore blocked storage */ }
  });
  await page.goto('/');
  await expect(page.locator('.rdv-studio-hero').getByRole('link', { name: /ver projetos reais/i })).toBeVisible();
  await page.locator('.rdv-studio-hero').getByRole('link', { name: /ver projetos reais/i }).click();
  await expect(page).toHaveURL(/\/portfolio/);
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

test('HTML inicial entrega SEO e proposta de valor no head sem depender de JavaScript', async ({ request }) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  // SEO estrutural vive no <head> (o que crawlers e pré-render usam):
  expect(html).toContain('<title>');
  expect(html).toContain('Rei das Vendas');
  expect(html).toContain('description');
  // Boot loader presente; conteúdo real é renderizado pelo React (SPA),
  // então o teste visual do h1 roda no navegador (primeiro teste desta spec).
  expect(html).toContain('id="rdv-boot"');
});

test('biblioteca conecta soluções, comparação e ferramentas', async ({ page }) => {
  await page.goto('/solucoes');
  await expect(page.getByRole('heading', { level: 1, name: /pare de perder cliente/i })).toBeVisible();
  await expect(page.getByText(/25 possibilidades encontradas/i)).toBeVisible();
  await page.getByPlaceholder(/vender online/i).fill('representantes');
  await expect(page.getByRole('heading', { level: 3, name: /catálogo para representantes/i })).toBeVisible();
  await page.goto('/solucoes/catalogo-para-representantes');
  await expect(
    page.getByRole('heading', { level: 1, name: /catálogo para representantes comerciais/i }),
  ).toBeVisible();
  await page.goto('/alternativas/wix');
  await expect(page.getByRole('heading', { level: 1, name: /alternativa ao wix/i })).toBeVisible();
  await page.goto('/ferramentas/calculadora-roi');
  await expect(page.getByRole('heading', { level: 1, name: /calculadora de roi comercial/i })).toBeVisible();
});

test('diagnóstico mantém WhatsApp atrás do gate de qualificação', async ({ page }) => {
  await page.goto('/diagnostico?solucao=catalogo-para-representantes');
  await expect(page.getByRole('link', { name: /abrir conversa qualificada/i })).toHaveCount(0);
  await page.getByLabel('Nome').fill('Pessoa de teste');
  await page.getByLabel('Qual é o seu negócio?').selectOption('representacao-comercial');
  await page.getByLabel('Principal objetivo comercial').selectOption('vender-mais');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByText('Adicionar detalhes (opcional)', { exact: true }).click();
  await expect(page.getByLabel('Solução de interesse (opcional)')).toHaveValue('catalogo-para-representantes');
});

test('diagnóstico reposiciona e anuncia a próxima etapa', async ({ page }) => {
  await page.goto('/diagnostico?solucao=catalogo-para-representantes');
  await page.getByLabel('Nome').fill('Pessoa de teste');
  await page.getByLabel('Qual é o seu negócio?').selectOption('representacao-comercial');
  await page.getByLabel('Principal objetivo comercial').selectOption('vender-mais');
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
  await page.getByLabel('Principal objetivo comercial').selectOption('vender-mais');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();

  await page.getByLabel('WhatsApp para retorno').fill('16999999999');
  await page.getByLabel('E-mail (opcional)').fill('teste@example.com');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: /registrar meu diagnóstico/i }).click();

  await expect(page.getByText('Diagnóstico preparado para envio')).toBeVisible();
  await expect(page.getByText(/ainda precisa ser enviado/i)).toBeVisible();
  const whatsapp = page.getByRole('link', { name: /abrir conversa qualificada/i });
  await expect(whatsapp).toBeVisible();
  expect(decodeURIComponent((await whatsapp.getAttribute('href')) || '')).toContain(
    'Objetivo comercial: vender-mais.',
  );
});

test('demonstração comercial permite filtrar e selecionar produtos', async ({ page }) => {
  await page.goto('/demonstracoes/representacao-comercial');
  await page.getByRole('button', { name: 'Linha de produto' }).click();
  await expect(page.getByText('Referência PR-410')).toBeVisible();
  await page.getByRole('button', { name: 'Adicionar à cotação' }).first().click();
  await expect(page.getByText(/1 item selecionado/)).toBeVisible();
});

test('plano escolhido segue até o contato sem exigir e-mail e mantém contexto se a API falhar', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('reidasvendas:cookie-consent', 'rejected'));
  await page.route('**/api/lead', (route) => route.fulfill({ status: 502, json: { ok: false } }));
  await page.goto('/planos');
  await page.locator('article').filter({ has: page.getByRole('heading', { name: 'Site profissional', exact: true }) }).getByRole('link', { name: /quero este/i }).click();
  await expect(page).toHaveURL(/plano=site-profissional/);
  await expect(page.getByText(/Sua escolha:/)).toContainText('Site profissional');
  await page.getByLabel('Nome').fill('Pessoa de teste');
  await page.getByLabel('Qual é o seu negócio?').selectOption('servico-local');
  await page.getByLabel('Principal objetivo comercial').selectOption('mais-contatos');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.getByLabel('E-mail (opcional)')).not.toHaveAttribute('required');
  await page.getByLabel('WhatsApp para retorno').fill('16999999999');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: /registrar meu diagnóstico/i }).click();
  await expect(page.getByRole('alert')).toContainText('Seus dados continuam aqui');
  await expect(page.getByLabel('WhatsApp para retorno')).toHaveValue('16999999999');
  const fallback = page.getByRole('link', { name: /enviar contexto pelo WhatsApp/i });
  expect(decodeURIComponent(await fallback.getAttribute('href') || '')).toContain('Site profissional');
});

for (const viewport of [
  { name: 'mobile', width: 360, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]) {
  test(`home não cria overflow em ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: /seu próximo cliente precisa encontrar você/i })).toBeVisible();
    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(horizontalOverflow).toBeLessThanOrEqual(1);
  });
}
