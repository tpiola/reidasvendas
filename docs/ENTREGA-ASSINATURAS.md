# Rei das Vendas — ecossistema de assinatura digital

Entrega de engenharia e operação em 23/10/2026. Atualiza **tpiola/reidasvendas**, projeto Vercel **reidasvendas/prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL**, domínio **https://www.reidasvendas.com.br**. Não cria outro repositório ou projeto. O código foi implementado; a oferta recorrente permanece uma proposta a validar, sem cobrança ativa. Nenhuma cobrança, campanha ou lead real foi criado pelos testes.

## 1. Resumo executivo

A oferta combina implantação de site e uma rotina contratada de presença digital: SEO técnico/local conforme escopo, WhatsApp contextual, captura conectada ao CRM quando configurado, manutenção, relatório e melhoria. O mecanismo é explícito: organizar oferta → publicar e conferir → facilitar contato → registrar o que aconteceu → revisar a prioridade mensal. O visitante compara preços e limites antes de oferecer dados pessoais. O prestador protege margem com capacidade definida, implantação separada e custos externos declarados.

A promessa defensável: **sua empresa com uma presença digital clara e uma rotina definida para mantê-la em operação e melhorar o caminho até o contato.** A meta de R$ 15 mil de MRR pertence ao planejamento do negócio; não é resultado atingido nem promessa ao comprador.

## 2. Auditoria factual

[AUDITORIA-ASSINATURAS-ANTES.md](AUDITORIA-ASSINATURAS-ANTES.md) contém a tabela de 27 itens `item | status atual | risco comercial | correção obrigatória | prioridade`, verificada ao vivo antes da evolução. A base `ec35312` já tinha HTTPS, www canônico, consentimento e estrutura técnica; faltavam oferta recorrente, comparação e contratação. `/planos` respondia com redirecionamento 308 para `/servicos`, não era uma página de assinatura. Não confundir os números Lighthouse históricos com a nova validação.

## 3. Oferta e meta de R$ 15 mil de MRR

[ASSINATURAS-ESTRATEGIA.md](ASSINATURAS-ESTRATEGIA.md) documenta planos, custos, margem, capacidade, CAC/churn/LTV/payback, cenários, upsells e trade-offs. [OPERACAO-RECORRENTE.md](OPERACAO-RECORRENTE.md) liga aquisição, CRM, scripts e retenção aos fatos financeiros.

| Plano proposto |   Mensal | Implantação | Páginas | Artigos/mês | Ajustes/mês |
| -------------- | -------: | ----------: | ------: | ----------: | ----------: |
| Essencial      |   R$ 497 |    R$ 1.497 |   até 5 |           0 |           2 |
| Profissional   |   R$ 997 |    R$ 2.497 |  até 10 |           1 |           4 |
| Escala         | R$ 1.997 |    R$ 3.997 |  até 15 |           2 |           8 |

Cada ajuste corresponde a uma unidade de até 20 minutos e não inclui uma funcionalidade nova. Domínio, licenças, mídia, gestão de anúncios e social media dependem de inclusão expressa no escopo. Suporte é em dias úteis conforme fila, sem SLA numérico inventado. Hospedagem, exportação, propriedade, período mínimo, renovação, cancelamento, restituições e cronograma precisam constar no contrato. Não há garantia nova de resultado.

Anual proposto: 12 mensalidades menos 8%, cobradas uma vez ao ano; implantação separada e sem desconto. O equivalente mensal não é parcelamento. O desconto troca margem por previsibilidade de caixa e exige serviço contínuo durante o contrato.

| Cenário matemático, não previsão                           |        MRR antes de custos |
| ---------------------------------------------------------- | -------------------------: |
| Exemplo do briefing: 19 × R$ 797                           |                  R$ 15.143 |
| 10 Essenciais × R$ 497 + 8 Profissionais × R$ 997          | R$ 12.946 — abaixo da meta |
| 5 planos Escala × R$ 1.997 + 8 Profissionais × R$ 997      |                  R$ 17.961 |
| 16 Profissionais × R$ 997                                  |                  R$ 15.952 |
| 17 Profissionais no anual × R$ 917,24 equivalentes por mês |               R$ 15.593,08 |

O setup corresponde à implantação e fica separado do MRR; não confundir receita recorrente, receita de implantação e caixa recebido. Desconto anual reduz MRR normalizado. CAC, churn, imposto, taxas do provedor e horas reais são **[VERIFICAR]**; exercícios têm **[PREMISSA]** e não são números de mercado.

## 4. Arquitetura e slugs

Preservadas home, método, serviços e oito detalhes, resultados, cases, blog/guia, FAQ, sobre, contato, privacidade, termos, obrigado e redirect WhatsApp. Adicionadas:

- `/planos`, com mensal/anual, comparativo, implantação e custo do primeiro ano.
- `/sites-para-pequenos-negocios`, `/seo-local-franca`, `/whatsapp-que-vende`, `/painel-de-leads`, `/manutencao-de-site`, `/otimizacao-de-conversao`, `/automacao-comercial`.
- `/casos` com portfólio verificável e `/casos/[slug]` reservado para casos autorizados; não há caso comercial fictício. `/cases` continua com critérios de evidência próprios.
- `/simulador`, `/checkout`, `/onboarding`, `/area-do-cliente`.
- Oito novos artigos; coleção em `lib/editorial.ts` agrega `data/content.json` e `data/subscription-articles.json`.

Internal linking: home → planos → diagnóstico por plano → revisão de contratação; módulos → planos/casos/guia; artigo → módulo/simulador/diagnóstico; FAQ e WhatsApp em todas as decisões. Breadcrumbs em páginas internas. Canonical absoluto ignora UTM; query de plano/ciclo não cria URL indexável. Não há paginação ou filtros indexáveis sem necessidade: ao crescer, criar paginação real com canonical por página e não indexar combinações vazias. Não gerar cidades/bairros em massa sem conteúdo e serviço reais.

## 5. Marca e visual

O logo geométrico de coroa comercial com eixo central ascendente foi preservado: próprio, vetorial, sem joias/brilho. `public/logo/` contém símbolo, mono, favicon, lockups claro/escuro, SVGs de ícones e OG; `public/icons/` e `public/og/` contêm exports raster. [MARCA.md](MARCA.md) documenta aplicação, área de proteção, tamanhos, exportação e outlines. Sora WOFF2 local com licença OFL e `font-display:swap`; corpo system-ui. Tokens centralizam midnight/graphite/gold/gold-light/gold-dark/whatsapp/success/danger/muted/white.

A home usa hero editorial escuro à esquerda, contraste com superfícies claras e ofertas comparáveis. Não há foto de cliente inventada, browser/telefone falso nem painel fingindo dados reais. A comparação antes/depois é rotulada **ilustrativa**, não case. Fotos e depoimentos dependem de [INSERIR_FOTO_REAL]/[INSERIR_CASE_REAL] e autorização.

## 6. Estrutura funcional

```text
app/
  page.tsx                    # hub de assinatura
  planos/page.tsx
  [solution]/page.tsx          # sete módulos com conteúdo próprio
  diagnostico/page.tsx
  checkout/page.tsx
  onboarding/page.tsx
  area-do-cliente/page.tsx
  casos/page.tsx; casos/[slug]/page.tsx
  blog/; guia/; servicos/      # coleções preservadas/ampliadas
  api/lead/route.ts
  api/checkout/route.ts
  api/payments/webhook/route.ts
  go/whatsapp/route.ts
  privacidade/; termos/; obrigado/
  layout.tsx; sitemap.ts; robots.ts; manifest.ts
components/
  Header.tsx; Footer.tsx; Experience.tsx
  Pricing.tsx; IntentNavigator.tsx; DynamicFeed.tsx
  BillingSelector.tsx; MaturityQuiz.tsx
  CommercialFlow.tsx; Interactive.tsx
  SubscriptionJourney.tsx; TrackingNavigation.tsx
lib/
  tracking.ts; consent.tsx; whatsapp.ts
  payments.ts; payment-store.ts; server-events.ts
  editorial.ts; site.ts; subscription-context.ts
  api-lead.ts; request-body.ts
data/
  subscription-plans.ts; subscription-solutions.ts
  subscription-faq.ts; subscription-articles.json
  content.json; portfolio.json; commercial-contract.ts
styles/; public/logo/; public/og/; public/icons/
tests/; docs/; scripts/
next.config.ts; proxy.ts; vercel.json; lighthouse-ci.config.js
```

## 7. Stack e arquitetura de renderização

Next.js App Router 16, React 19, TypeScript strict e Tailwind CSS 4, com componentes server-first. Componentes de cliente são usados apenas para estado, consentimento, rastreamento e interação. O conteúdo versionado forma uma coleção tipada; não foi criado CMS administrativo sem autenticação. ISR é uma possibilidade para as coleções; o conteúdo versionado recebe geração estática (SSG), e o checkout e o diagnóstico contextual usam renderização no servidor (SSR). Não ativar flags experimentais por estética. Trade-offs vs Astro/Nuxt/Remix/headless estão em [DEPLOY.md](DEPLOY.md): Next tem mais JS de base que Astro, mas mantém rotas, APIs e contratação no mesmo projeto. Nenhuma biblioteca pesada de animação foi instalada.

## 8. Configuração Next.js e Vercel

`next.config.ts` define AVIF/WebP, padrões remotos vazios e headers; `proxy.ts` é o nome atual da convenção de middleware no Next.js 16. Aplica o domínio canônico www e HTTPS, além de impedir a indexação dos previews. Não inventa autenticação para uma área privada inexistente. O redirecionamento externo da Vercel, do apex para www, já está configurado com status 308; www não redireciona para apex. A regra antiga `/planos` → `/servicos` foi removida. Parâmetros de consulta e caminhos são preservados.

## 9. Metadados por página

Cada rota define título, descrição, canonical, robots, Open Graph e Twitter Card. Obrigado, checkout, onboarding e atendimento ficam fora do sitemap com noindex, mas rastreáveis para o buscador ler essa diretiva; robots.txt restringe APIs e redirects, não substitui controle de acesso. O layout inclui idioma pt-BR, theme-color, fonte local, favicon, apple-touch icon e manifest. As verificações de propriedade usam somente IDs reais.

## 10. SEO técnico, dados estruturados e GEO

JSON-LD usa Organization, WebSite, Service, FAQPage, Article e BreadcrumbList quando há conteúdo correspondente. **Sem AggregateRating, Offer ou AggregateOffer para preço ainda não aprovado**, nem VideoObject/SoftwareApplication sem produto/vídeo real. LocalBusiness com endereço não é usado para inventar ponto físico. `llms.txt` explica entidade/rotas/limites e não é garantia de citação. FAQPage é semântico: o Google descontinuou o FAQ rich result em maio de 2026, conforme seu changelog oficial; não vender esse markup como expansão visual no resultado da busca.

## 11. Componentes e decisões de conversão

| Bloco da home    | Objetivo do comprador         | Evento/critério                              | Razão da escolha                                        |
| ---------------- | ----------------------------- | -------------------------------------------- | ------------------------------------------------------- |
| Header + hero    | entender oferta e ação        | view_hero, click_cta_planos, whatsapp_click  | preço e contato acessíveis sem leitura longa            |
| Intenção         | reconhecer seu problema       | click_cta_secundario                         | cinco cenários úteis, UTM permitida sem PII             |
| Dor + solução    | entender continuidade         | scroll_50 + teste de navegação               | linguagem operacional, sem retorno garantido            |
| Planos           | comparar custo e limites      | plan_view, plan_select                       | setup/primeiro ano visíveis, anual não confunde parcela |
| Método/pipeline  | entender sequência            | controle manual, foco e leitura              | explica fluxo, sem animação automática de dados         |
| Módulos          | avaliar escopo específico     | click_cta_planos/whatsapp_click              | páginas úteis com SEO próprio                           |
| Comparativo      | entender diferença estrutural | botão manual, aria-live                      | ilustração identificada, sem ROI fictício               |
| Trabalhos        | conferir execução             | visita ao projeto                            | links reais e limites de prova                          |
| Quiz/simulador   | preparar decisão              | quiz_start/complete, calculator_start/result | resultado sem exigir contato                            |
| Feed             | continuar consideração        | navegação e leitura                          | JSON atualizável, controles e scroll-snap sem autoplay  |
| FAQ              | resolver risco e preço        | expansão nativa; teste de objeções           | respostas claras, sem esconder cancelamento             |
| CTA final/footer | iniciar contexto              | whatsapp_click, click_cta_diagnostico        | baixa fricção, políticas e telefone rastreáveis         |

## 12. Movimento e interação

[MOTION-IDENTITY.md](MOTION-IDENTITY.md) traz tokens e critérios. `Experience` usa uma escuta passiva de rolagem com requestAnimationFrame (rAF), progresso com transform, compactação visual do logo e revelação com IntersectionObserver e atraso limitado. A coroa decorativa tem parallax limitado a 12 px; preferência reduzida remove movimento. Hover é restrito a ponteiro fino. O controle de preço não faz contagem animada de dinheiro. Os controles de pipeline/antes-depois atualizam texto imediatamente e animam só ilustração; quem lê ou usa teclado não espera animação. Magnetismo/tilt global e transições que atrasam rota foram evitados por custo e previsibilidade. Não fingir contadores de leads/clientes: não há dado real para animar esse tipo de prova.

## 13. Copy, objeções e próximos passos

Copy e objeções estão nas páginas, no FAQ e nos documentos de estratégia/operação. A ação “Escolher [plano]” leva a diagnóstico e revisão; não usa “assinar” antes de existir uma contratação ativa. O CTA de WhatsApp comunica conversa, não confirmação de venda. Risco reverso é escopo e custo claros, sem promessa nova de devolução/cancelamento ainda não aprovada.

## 14. Tracking, WhatsApp e consentimento

[PRIVACIDADE-MENSURACAO.md](PRIVACIDADE-MENSURACAO.md), [SECURITY.md](SECURITY.md) e [PAGAMENTOS.md](PAGAMENTOS.md) detalham comportamento e configuração. O consentimento usa o modo básico: antes da escolha, tags opcionais não carregam. O Google recebe o estado inicial negado para `analytics_storage`, `ad_storage`, `ad_user_data` e `ad_personalization`. As finalidades são separadas, com recusa, configuração e aceite equivalentes, além de revogação no rodapé. Nada de consentimento de marketing acoplado à proposta.

```ts
// API usada pelos componentes; não adicionar outro listener duplicado.
import { track } from '@/lib/tracking';
track('plan_select', {
  page: '/planos',
  plan_id: 'profissional',
  billing_cycle: 'mensal',
});
// A implementação aceita somente eventos/campos permitidos e depende de consentimento.
// purchase/subscription_created/subscription_renewal NÃO são aceitos no browser.
```

O WhatsApp sempre aponta para o número 5516992333344. `/go/whatsapp?src=planos&plano=profissional&ciclo=anual` cria mensagem de contexto, permite source/medium/campaign sanitizados e nunca aceita destino arbitrário. O navegador e o evento Contact da CAPI compartilham `event_id` quando habilitados e consentidos; Redis protege a medição opcional, mas uma falha não bloqueia o contato. Sem CRM o formulário prepara mensagem revisável, sem afirmar envio. Cliques, conversa recebida e venda são fatos distintos.

Google: criar ou confirmar o fluxo GA4 e a propriedade no Search Console, enviar sitemap e inspecionar URL; marcar eventos próprios como eventos principais somente após a validação no DebugView. GTM é alternativa ao adaptador direto, não segunda instalação duplicada. Server-side não é justificativa para ignorar consentimento. Meta: confirmar Business/pixel/domínio, token e versão da Graph API, Test Events e deduplicação antes de iniciar campanha. O evento Purchase exige pagamento verificado e vínculo seguro de consentimento; não foi falsamente ativado pelo callback.

## 15. Segurança de formulários e pagamentos

Formulários usam origem exata, validação de tipo/corpo durante streaming, honeypot, rate limit durável HMAC e indisponibilidade honesta em produção sem infraestrutura. O checkout aceita apenas plano, ciclo, UUID e aceite de termos; calcula valores no servidor e confere os objetos Price da Stripe. O webhook verifica a assinatura do corpo bruto, a janela de tempo, o modo e a versão, além de usar um ledger durável; não depende de um Origin fictício. Os estados de cobrança e assinatura são separados, com leituras canônicas sob lease. Sem endpoint de portal que aceite customer_id de navegador e permita ver outro cliente.

Headers: HTTPS/HSTS, nosniff, DENY/frame-ancestors, Referrer-Policy, Permissions-Policy e CORP. CSP completa permanece Report-Only e a política mínima é aplicada. O coletor de CSP continua descartando conteúdo bruto; revisar violações sanitizadas antes de enforcement com nonce/hash. Vercel fornece proteção de plataforma; regras específicas WAF, CAPTCHA e uptime precisam ser configuradas conforme plano e evidência de abuso. Não habilitar desafio em todo comprador por hipótese.

## 16. Acessibilidade

Acessibilidade: link para pular ao conteúdo, landmarks, H1 único, rótulos e erros de formulário, foco visível, disclosure nativo, seleção de cobrança por radio, abas operáveis com setas/Home/End, alvos de toque e movimento reduzido. Axe/teclado são baseline, não certificação integral WCAG ou substituto de leitor de tela humano.

## 17. Deploy e operação

[DEPLOY.md](DEPLOY.md) é o procedimento detalhado. Nesta missão **atualizar o projeto Vercel existente**, não criar outro. Configuração: framework Next.js; aplicação na raiz; instalação com `pnpm install --frozen-lockfile`; build com `pnpm build`; diretório de saída padrão; Node.js 24; funções em gru1. Preview e produção separados, proteção de preview preservada. `.env.example` e `pnpm readiness` listam variáveis sem mostrar secrets. Mesmo variáveis presentes não provam conta/configuração válida.

Pagamentos: adaptador de Checkout hospedado da Stripe implementado, com cartão para recorrência; Pix/boleto e taxas não foram prometidos. [VERIFICAR] conta, elegibilidade, métodos e operação no Brasil. Asaas/Pagar.me exigem adaptador próprio com contrato/webhook e novos testes se forem escolhidos. A área mínima atual orienta o atendimento; não é um portal de cobrança autenticado. A integração com o Customer Portal da Stripe é uma etapa futura e exige configuração, validação e identificação segura do titular antes de disponibilizar acesso. Dunning, upgrade/downgrade, nota fiscal e cancelamento dependem do provedor/contrato; o código não simula essas operações como concluídas.

Antes da publicação em produção: checks, testes unitários, build, E2E, mobile, axe e Lighthouse; revisão dos dados/termos; preview no mesmo projectId; confirmar commit. Depois: www com status 200 e apex com status 308, plano e contato, metadados/sitemap/robots, ausência de tags pré-consentimento, logs sem PII e monitoramento. Rollback de código antigo requer verificar também orientação dos redirects externos. Registrar commit/deployment no estado vigente.

## 18. QA e critérios de aceite

O resultado da rodada integrada deve ser registrado em `QA-ASSINATURAS.md`; o baseline anterior está em AUDITORIA. Não declarar aprovação sem a evidência correspondente. Critérios: rotas e metadados válidos, custo anual e setup preservados, contexto de plano sem PII, pagamento indisponível sem credenciais, APIs sem falsa confirmação, cookies e teclado, zero overflow nas larguras cobertas, performance ≥ 90 e orçamentos de desempenho respeitados. Não inferir INP de Lighthouse. As metas de campo no percentil 75 — LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1 — exigem amostra de RUM/CrUX após tráfego.

## 19. Operação em 30/60/90 dias

[CONTEUDO-90-DIAS.md](CONTEUDO-90-DIAS.md) e [ASSINATURAS-ESTRATEGIA.md](ASSINATURAS-ESTRATEGIA.md) trazem a pauta densa semanal, fontes, links/CTA/eventos e rotina. Oito artigos completos adicionais foram incluídos na coleção do código, não apenas no calendário. A publicação deve ser confirmada no deployment registrado em ESTADO-ATUAL.md. Primeiros 30 dias: validar oferta/contrato/custos e processo; próximos 30 dias: medir horas, propostas, entrega e qualidade; até 90 dias: comparar coortes, retenção e margem antes de ampliar aquisição. A meta não define demanda real, prazo ou garantia de atingir R$ 15 mil.

## 20. Dados e decisões pendentes

- `[INSERIR_GA4_ID]`, propriedade no Search Console e acesso adequado; `[INSERIR_GTM_ID]` somente se optar por GTM.
- `[INSERIR_META_PIXEL_ID]`, Business, verificação de domínio, token e versão da CAPI e Test Events.
- `[INSERIR_CNPJ]`, razão social/controlador, contato de privacidade, `[INSERIR_ENDERECO]` somente se houver endereço divulgável; revisão de finalidade, retenção e contratos.
- `[INSERIR_PRECO_FINAL]`, limites, implantação, prazo, hospedagem, cancelamento, fidelidade/restituição, propriedade/exportação e suporte aprovados.
- `[INSERIR_PROVEDOR_PAGAMENTO]`, conta, chaves e preços reais, webhook, sandbox, conciliação e processo fiscal. No adaptador Stripe, usar STRIPE_WEBHOOK_SECRET; PAYMENT_WEBHOOK_SECRET é campo genérico documental, não chave consumida por este código.
- CRM escolhido, contrato de API e chaves, Redis durável e responsável por atendimento.
- `[INSERIR_FOTO_REAL]`, `[INSERIR_CASE_REAL]`, depoimentos autorizados e revisão final da marca/copy quando desejada.
- Domínio/DNS já verificados no projeto atual; acesso ao DNS só será necessário para verificações externas pendentes, sem trocar nameservers por conveniência.

## Referências primárias verificadas

- ANPD, Cookies: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf
- Google Consent Mode: https://developers.google.com/tag-platform/security/guides/consent
- Google server-side consent: https://developers.google.com/tag-platform/tag-manager/server-side/consent-mode
- Stripe Checkout/webhooks/portal: https://docs.stripe.com/billing/subscriptions/build-subscriptions; https://docs.stripe.com/webhooks; https://docs.stripe.com/customer-management
- Métodos dependem da conta e fluxo: https://docs.stripe.com/payments/payment-methods/payment-method-support

As referências sustentam os padrões técnicos, não uma afirmação de conformidade jurídica, ganho comercial ou aprovação das contas.

Nota de atualização técnica: a referência de FAQ foi conferida em https://developers.google.com/search/updates (entradas de 8 de maio e 15 de junho de 2026). A documentação Meta Pixel retornou 429 nesta consulta; a implementação padrão exige validação no Events Manager com o ID real.
