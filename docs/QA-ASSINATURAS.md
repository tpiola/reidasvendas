# QA da jornada de assinaturas — 23/10/2026

Status: **34/34 cenários integrados aprovados no build de produção local**, com Pricing SSR, visibilidade real dos ciclos e rádio anual sem JavaScript. Inspeção visual independente concluída; última execução atribuída ao integrador. Este documento não declara checkout, pagamento, CRM ou portal externo ativos.

## Escopo e fonte de evidência

A linha de base pública anterior está em `docs/AUDITORIA-ASSINATURAS-ANTES.md`, verificada ao vivo no commit `ec35312`. A implementação nova mantém o repositório e o projeto Vercel existentes.

A suíte específica de assinatura está em `tests/e2e/subscriptions.spec.ts`. Os cenários antigos continuam em `tests/e2e/journeys.spec.ts`; somente dois foram realinhados, por autorização do integrador, à nova arquitetura:

1. Calculadora e quiz são exercitados em `/simulador`, preservando as mesmas verificações de cálculo, resultado, validação e obrigado honesto.
2. A navegação por intenção da home agora verifica os cinco tabs do `IntentNavigator`, incluindo foco, seleção, ArrowRight, ArrowLeft, Home, End e destino `/planos`.

O integrador executa o conjunto completo com o servidor de produção e a suíte no mesmo namespace de rede. O auditor não executa outra rodada concorrente. Os resultados do integrador são identificados como tal; a inspeção visual dos arquivos de screenshot foi realizada diretamente pelo auditor.

## Cobertura da suíte nova

| Área                          | Critério efetivamente verificado                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| Mensalidade e implantação     | Valores de Essencial, Profissional e Escala separados, sem implantação escondida na recorrência          |
| Total anual                   | 12 mensalidades menos 8%, implantação sem desconto, total anual e primeiro ano explícitos                |
| Equivalência mensal           | O valor equivalente do anual não é apresentado como parcelamento                                         |
| Limites                       | Páginas e unidades de ajuste com capacidade definida; ajuste de até 20 minutos e limites visíveis        |
| Cancelamento e oferta         | Status de proposta e condições contratuais visíveis; escolha não ativa cobrança                          |
| Contexto de seleção           | Profissional/anual preservados entre plano, diagnóstico com três selects e revisão de checkout           |
| Minimização                   | Etapa de escolha sem nome, email, telefone ou cartão; URL só leva identificadores de plano/ciclo         |
| Indisponibilidade de checkout | Endpoint local retorna 503 sem URL de pagamento, ID de assinatura ou falso sucesso                       |
| Plano ausente/inválido        | Orienta escolher um plano e não confirma pedido ou pagamento                                             |
| Portal e onboarding           | Não expõe cliente/fatura nem simula autenticação; checklist não confirma contratação                     |
| Metadados                     | Canonical estável sem query; checkout, cliente e onboarding em noindex; sitemap sem fluxo transacional   |
| Mobile                        | Planos, diagnóstico selecionado, checkout e home em 320 e 390 px; sem overflow ou texto de botão cortado |
| Acessibilidade                | Axe WCAG A/AA em planos e checkout; alvos, estados e teclado dos controles relevantes                    |
| Processo conceitual           | Quatro etapas manuais por teclado, anúncios aria-live e SVG decorativo corretamente oculto               |
| Comparação                    | Dois botões com aria-pressed e conteúdo anunciado; rótulo deixa claro que não é resultado de cliente     |
| Movimento reduzido            | Conteúdo e escolhas permanecem disponíveis; transições espaciais decorativas reduzidas                   |

Nenhum teste cria uma cobrança, envia cartão, cria lead real ou manda mensagem de WhatsApp. A chamada técnica de checkout é feita somente no servidor de teste, com ativação de pagamentos desabilitada.

## Primeira rodada e correção motivada por teste

O integrador relatou **31 aprovados e 2 falhas em 33 cenários**. As duas falhas eram de mobile, a 320 e 390 px: o texto “Confirmar meu plano no WhatsApp” ultrapassava o espaço do botão no checkout.

A correção de runtime encurtou o texto para **“Validar plano no WhatsApp”**. Os seletores acessíveis foram alinhados ao mesmo nome; as asserções de bounds, texto sem clipping, altura mínima de 44 px, contexto, destino e ausência de pagamento continuam presentes. Não houve relaxamento do critério para fazer a suíte passar.

Também foram corrigidos pelo integrador: espaço entre frases no hero mobile e ícone explícito de WhatsApp no CTA compacto do header.

## Inspeção visual independente

Arquivos inspecionados diretamente pelo auditor: `test-results/home-desktop-viewport.png`, `home-mobile-viewport.png` e `home-desktop.png` na primeira rodada; após a correção, foram reabertos `home-desktop-viewport.png`, `home-mobile-viewport.png` e `home-mobile.png`. O arquivo final `test-results/.last-run.json` registra `status: passed` e `failedTests: []`.

- **Desktop 1440 px:** promessa de site com continuidade, CTA para planos e caminho de conversa aparecem na primeira tela. Implantação e recorrência têm papéis distintos. O comparador não se apresenta como checkout liberado.
- **Mobile 390 px:** hierarquia e texto principal legíveis, CTA de planos com alvo amplo e WhatsApp flutuante compacto. A captura final confirma o espaço entre frases no subtítulo e o ícone explícito de WhatsApp no CTA compacto do header.
- **Página longa:** alterna serviços incluídos, processo, limites, planos, comparação conceitual, portfólio e conteúdo. Os projetos próprios não são apresentados como retorno financeiro de clientes.
- **Clareza comercial:** os preços dos planos são referências em validação, com implantação separada; gestão de tráfego e social media permanecem serviços específicos, sem serem incluídos silenciosamente na assinatura.

## Leitura como comprador exigente

| Pergunta do comprador             | Leitura crítica                                                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| O que pago agora e depois?        | O fluxo distingue implantação, recorrência e primeira cobrança. O anual explicita cobrança anual e equivalência mensal. |
| Posso pedir qualquer mudança?     | Não. Há unidades e limites; funções novas e terceiros precisam de escopo próprio.                                       |
| Isso já contrata ou cobra?        | Não no estado atual. Oferta está em validação e checkout informa indisponibilidade.                                     |
| O que acontece após escolher?     | Três perguntas sem cadastro e revisão dos valores antes de qualquer pagamento.                                          |
| Como encerro ou transfiro o site? | Essas condições precisam constar na proposta/contrato; não há promessa de portabilidade irrestrita sem validação.       |
| Onde gerencio a conta?            | A página atual orienta atendimento e verifica titularidade, sem fingir um portal autenticado.                           |
| Vocês comprovam retorno?          | Há prova de execução por portfólio próprio; retorno comercial continua dependendo de casos autorizados e dados reais.   |

## Limites de aceite

- Oferta recorrente permanece `proposal`. Ativação exige aprovação comercial/contratual real e configuração completa, sem contornar o bloqueio do código.
- Stripe, Redis, webhooks, portal autenticado, faturamento e cancelamento precisam de testes nas contas apropriadas antes de operação real.
- Cadastro jurídico/controlador, condições de contratação, retenção e fornecedores efetivos continuam dependentes de confirmação.
- Axe e testes de teclado constituem baseline automatizado; não certificam todos leitores de tela ou dispositivos.
- Não houve nova execução Lighthouse por este auditor. Números anteriores estão identificados como laboratório na auditoria “antes”; as telas novas exigem medição própria do integrador.
- Não há evidência de MRR real, clientes pagantes, vendas, retenção ou CWV de campo. Cenários financeiros do material são hipóteses de planejamento.

## Resultado anterior e portão após a refatoração SSR

Execução atribuída ao integrador `/root`, usando a configuração Playwright com `webServer` e Chromium oficial fornecido pelo pacote `@sparticuz/chromium`:

- **34/34 cenários E2E aprovados em 17,2 segundos**: 19 da jornada preservada e 15 específicos de assinatura, incluindo troca anual sem JavaScript.
- **8 páginas sem violações axe nos critérios automatizados testados**: seis páginas da base, planos e checkout.
- **6 larguras da home** verificadas pela suíte base; novos fluxos em 320/390 px com verificação de bounds e texto de botão sem clipping.
- **59 testes unitários aprovados**, conforme a execução mais recente informada pelo integrador; a cobertura inclui a camada de pagamentos.
- **Build aprovado com 60 entradas Next**, além de check e lint aprovados, conforme execução do integrador.
- Capturas finais inspecionadas diretamente pelo auditor e artefato `.last-run.json` final sem testes falhos.

As duas falhas reais de clipping da primeira rodada foram corrigidas no produto. O nome acessível continua correspondente ao texto visível, atendendo ao princípio de label in name; a suite não ganhou um seletor que escondesse a falha.

**Veredito como comprador:** avançaria para conversar sobre o plano adequado, porque implantação, recorrência, capacidade e próximo passo estão explícitos. Não interpretaria esta apresentação como contrato ativo nem autorização de cobrança. Ativação de pagamento, cancelamento contratual, identidade jurídica e operação do portal ainda dependem das validações externas descritas acima.

A produção pública ainda não tinha sido atualizada ao finalizar esta revisão local. Não houve nova medição Lighthouse por este auditor; a rodada nova do integrador estava em curso e deve ser registrada separadamente, sem reaproveitar as notas anteriores como resultado deste release.

## Preparação da verificação adicional de Pricing SSR

O conteúdo de preços agora é renderizado no servidor. Os ciclos mensal e anual coexistem no HTML, com visibilidade controlada por seleção nativa e CSS. Por isso, testar apenas `textContent` poderia passar mesmo mostrando o preço errado.

A suíte `tests/e2e/subscriptions.spec.ts` foi reforçada, sem alterar runtime e sem executar navegador nesta revisão:

- Asserções de `toBeVisible` no slot selecionado e `toBeHidden` no oposto para preço, unidade de cobrança, explicação do pagamento, total do primeiro ano e CTA.
- Valores exatos do preço visível são comparados separadamente: mensal em `data-cycle="mensal"`; equivalente anual em `data-cycle="anual"`.
- Legenda da comparação confirma qual ciclo está efetivamente visível.
- Novo cenário com `javaScriptEnabled: false`: visita `/planos` sem esperar banner de cookies, confere mensal, seleciona o rádio anual nativo, verifica os valores/CTAs visíveis e segue o link Profissional/anual para o diagnóstico.

A suíte de assinatura passa de 14 para **15 cenários**; o conjunto esperado passa de 33 para **34 cenários**. Esse era o estado de preparação ao concluir a edição do auditor. A execução posterior do integrador confirmou os 34/34, conforme a seção final abaixo; os 33/33 anteriores não eram usados para validar o novo cenário.

Nenhum servidor, browser, cobrança, mensagem ou lead foi acionado por este auditor durante esta alteração restrita. Novas notas Lighthouse continuam dependentes da medição do integrador.

## Rodada final integrada

O integrador executou novamente check, lint, 59 testes unitários, build (60 entradas), orçamento inicial e os 34 E2E após a revisão dos slots SSR de preço. Todos passaram. As asserções conferem o preço/CTA realmente visível e o slot oposto oculto; o teste com JavaScript desativado confere o rádio nativo e o link anual de contratação. A rodada final de navegador levou 17,2 segundos.

Orçamento em `PERFORMANCE-BUDGET.json`: home HTML 20.736 B, CSS 15.351 B, JS moderno 149.742 B, todos gzip. O fallback legado noModule é discriminado; não é baixado por navegadores modernos.

`robots.txt` permite ler noindex em obrigado/checkout/onboarding/atendimento; essas páginas não integram sitemap. Robots não funciona como controle de acesso. Relatórios Lighthouse finais e a confirmação de produção são registrados pelo integrador, separadamente da inspeção independente.

Auditoria de dependências: `pnpm audit --prod` não encontrou vulnerabilidades na árvore de produção. A auditoria completa da cadeia de desenvolvimento retornou 1 baixa, 1 moderada e 4 altas (tmp, uuid, extract-zip e basic-ftp, via ferramentas de teste/auditoria); isso permanece risco de manutenção, não uma declaração de ambiente integralmente livre de falhas. Não há endpoint público de upload/extração ZIP. Atualizações devem ser verificadas na árvore do lockfile antes de alterar dependências transitivas. Nenhum pacote foi adicionado nesta evolução.

## Lighthouse final do integrador

Nove medições mobile do build final, três por página, passaram nas assertions de `lighthouse-ci.config.js`. Home: 98/98/98, LCP 1,641–1,686 s; diagnóstico: 99/99/99, LCP 1,530–1,544 s; planos: 97/98/99, LCP 1,591–1,685 s. CLS foi 0 em todas. Resultados compactos em `PERFORMANCE-ASSINATURAS.json`; relatórios brutos locais em reports/subscriptions-mobile-*. São dados de laboratório, não comprovam tráfego, receita ou CWV de campo.

Medição desktop da home: performance 100, LCP 613 ms e CLS 0, uma execução local. Relatório recuperado após indisponibilidade temporária do ambiente; sem perda de código ou testes.

A cobertura de metadados foi ampliada de 29 para 50 páginas (46 do sitemap e quatro fluxos noindex). Encontrou título duplicado em `/seo-local-franca` e no serviço anterior; a página nova recebeu contexto “para PME”, preservando URL e conteúdo. A rodada completa posterior passou: 34/34 em 17,2 segundos, com as 50 páginas conferidas. JS e CSS iniciais da home permaneceram idênticos por SHA-256 após a correção apenas nos metadados do módulo; as medições Lighthouse registradas continuam correspondentes aos mesmos assets.
