# Rei das Vendas — assinatura de presença digital

Reconstrução de 23/10/2026 no repositório e projeto Vercel existentes. Next.js 16.4.2, React19, TypeScript strict, pnpm11. Código anterior preservado no histórico e branch `backup/pre-rebuild-2026-10-23`.

## Executar

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm lint
pnpm test
pnpm build
pnpm e2e
pnpm budget
pnpm readiness
```

## O que está implementado

Ecossistema de assinatura para PMEs: home modular, planos mensal/anual com custos e limites, sete módulos de serviço, diagnóstico curto, revisão de checkout, onboarding preparatório e atendimento ao cliente. As páginas anteriores, oito serviços locais e a garantia histórica estão preservados. A coleção editorial reúne 16 artigos/guias; portfólio técnico verificável, sem resultados comerciais inventados. Fontes locais, marca em SVG/curvas, ícones, OG, sitemap, robots, manifest e llms.txt documental.

Essencial R$ 497/mês, Profissional R$ 997/mês e Escala R$ 1.997/mês são **propostas em validação**, com implantação separada. Oferta e contrato ainda bloqueiam cobrança. O adapter Stripe verifica preços no servidor, origem, idempotência e assinatura de webhook com ledger durável; não há checkout liberado, pagamentos reais nem portal autenticado simulado. Veja `docs/PAGAMENTOS.md`.

O formulário prepara mensagem no WhatsApp quando não há CRM/controle anti-spam configurado. Quando habilitado, confirma recebimento somente após resposta positiva com ID do CRM. Contato de marketing futuro não é presumido. O navegador recebe erros acessíveis e nunca vê chaves privadas.

Google/Meta são adapters reais, desativados sem IDs e sem consentimento. GA4 e Pixel carregam só por finalidade autorizada. CAPI usa o mesmo event_id do navegador para deduplicação, server-side consent e controle durável de tentativas. Abertura do WhatsApp não comprova mensagem enviada. A página obrigado não dispara Lead por visita.

## Arquitetura

```text
app/                 páginas RSC, APIs, sitemap/robots/manifest
components/          shell, navegação, formulários e módulos interativos
lib/                 consentimento, tracking, CRM/CAPI, pagamentos e limites
content/             reservado para evolução editorial aprovada
data/                planos, serviços, artigos, feed e portfólio verificável
public/logo/         SVG símbolo, mono, favicon e lockups em curvas
public/icons/        Apple/PWA/maskable PNG
public/og/           OG1200×630
public/fonts/        Sora Latin local + licença OFL
public/downloads/    guia de follow-up
styles/              layout, componentes e responsividade
proxy.ts             middleware Next16: domínio/HTTPS e noindex de preview
next.config.ts       headers, imagens e redirects legados específicos
vercel.json          build Next raiz, pnpm, região gru1
tests/               invariantes de segurança e jornadas Playwright
scripts/             relatório de prontidão sem imprimir secrets
docs/                estratégia, marca, deploy, mensuração e evidências
```

## Por que esta stack

Páginas editoriais são estáticas e revalidadas a cada24h nas rotas de detalhe; handlers de contato rodam sob demanda. RSC mantém conteúdo fora do bundle interativo. CSS/IntersectionObserver/requestAnimationFrame substituem bibliotecas de animação. O LCP é texto; não existe vídeo, canvas ou hero pesado.

Astro poderia reduzir a hidratação de um site editorial simples; Next facilita o mesmo modelo para integrações CRM, consentimento e futuras áreas de produto. Remix/Nuxt seriam escolhas viáveis, mas adicionariam migração de ecossistema sem ganho demonstrado aqui. Um CMS headless acrescenta custo e superfície de segurança: o conteúdo começa tipado em JSON, pronto para adapter editorial. Não há CMS/admin exposto nem autenticação simulada.

## Documentação

- [Entrega completa em 20 seções](docs/ENTREGA-ASSINATURAS.md)
- [Oferta, margem e matemática de R$ 15 mil MRR](docs/ASSINATURAS-ESTRATEGIA.md)
- [Aquisição, CRM, onboarding e retenção](docs/OPERACAO-RECORRENTE.md)
- [Auditoria pública antes da evolução](docs/AUDITORIA-ASSINATURAS-ANTES.md)
- [Pagamentos e limites de ativação](docs/PAGAMENTOS.md)
- [QA e revisão como comprador](docs/QA-ASSINATURAS.md)
- [Performance mobile do build final](docs/PERFORMANCE-ASSINATURAS.json)
- [Orçamento inicial HTML/CSS/JS](docs/PERFORMANCE-BUDGET.json)
- [Calendário editorial e operação 30/60/90 dias](docs/CONTEUDO-90-DIAS.md)
- [Estratégia anterior preservada](docs/ESTRATEGIA.md)
- [Marca e regras de uso](docs/MARCA.md)
- [Consentimento e mensuração](docs/PRIVACIDADE-MENSURACAO.md)
- [Deploy, Google, Meta e checklist](docs/DEPLOY.md)
- [Segurança e limites](docs/SECURITY.md)
- [QA e auditoria como comprador](docs/QA-REVIEW.md)
- [Evidências de validação](docs/VALIDACAO.md)

## Pendências reais de ativação

A presença de código não configura contas externas. IDs GA4/Pixel, verificação Search Console/Meta, token CAPI/versão Graph, CRM/contrato de payload, Redis/rate-limit, preços/contrato/conta de cobrança, identidade jurídica e retenção efetiva precisam ser confirmados no projeto existente. Veja `.env.example` e `pnpm readiness`. Não versionar secrets nem substituir valores reais por placeholders.

A evolução usa o mesmo repositório `tpiola/reidasvendas` e o mesmo projeto Vercel `prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL`. O histórico do primeiro rebuild e seu backup permanecem disponíveis. O estado de publicação vigente é registrado em `docs/ESTADO-ATUAL.md`; não inferir produção a partir de um build local. Apex → www com 308, sem loop; previews protegidos.

Campo CWV/INP, disponibilidade, entrega real CRM e recebimento no EventsManager não são demonstrados por um build ou Lighthouse. Logs CSP são deliberadamente descartados até existir coletor sanitizado; política ampla está em Report-Only e política mínima é aplicada.
