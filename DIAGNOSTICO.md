# DIAGNÓSTICO DO PROJETO — 2026-04-26

> Resultado da varredura completa. Atualizar após cada sessão de trabalho.

---

## Estrutura do monorepo

```
thiagobuilder-main/
├── apps/
│   ├── web/          ← site principal (Vite + React 18 + Tailwind) ✅
│   ├── docs/         ← Storybook / design system ⚠️ placeholder
│   └── admin/        ← painel administrativo ⚠️ placeholder
├── packages/
│   ├── ui/           ← Button, Input, cn ✅
│   ├── utils/        ← isEmail, A/B, UTM, visitorId ✅
│   ├── types/        ← LeadPayload, LeadSource, AbVariant ✅
│   └── config/       ← configurações compartilhadas ✅
├── n8n/workflows/    ← 2 workflows (WhatsApp + Leads intake) ✅
├── apps/web/api/     ← lead.ts, chat.ts (serverless Vercel) ✅
└── public/           ← build de produção gerado pelo vite ✅
```

---

## Score de saúde por área

| Área | Score | Observação |
|---|---|---|
| **Testes** | 9/10 | 9 testes passam, exit 0 em 7 pacotes |
| **Arquitetura de pacotes** | 8/10 | Packages bem divididos; cn/useTheme ainda duplicados nos apps |
| **Deploy/Vercel** | 8/10 | `vite.config.ts` aponta `outDir: ../../public` corretamente |
| **SEO / Schema.org** | 9/10 | JSON-LD completo, OG, Twitter Card, canonical dinâmico |
| **Performance front** | 8/10 | Lazy images, chunking manual, SW, PWA manifest, preconnect fonts |
| **Acessibilidade** | 7/10 | aria-label nos botões, role="alert" nos erros, reduzedMotion OK |
| **Segurança headers** | 9/10 | CSP, HSTS-ready, X-Frame, nosniff, Referrer-Policy |
| **Analytics** | 4/10 | `initTracking` não estava sendo chamado (corrigido agora); GTM/GA4/Meta Pixel prontos mas sem IDs |
| **Git** | 0/10 | Repositório sem git init — risco máximo de perda de trabalho |
| **Rotas nav** | 5/10 | Nav tinha 2 links mortos + login inexistente (corrigidos agora) |

---

## Correções aplicadas nesta sessão

| # | Arquivo | Problema | Ação |
|---|---|---|---|
| 1 | `apps/web/src/main.tsx` | `initTracking()` nunca chamado | Adicionada chamada na inicialização |
| 2 | `apps/web/src/components/SiteHeader.tsx` | Nav com `/produtos/...` e `/recursos` inexistentes | Links corrigidos para `/solucoes`, `/projetos`, `/negocios` |
| 3 | `apps/web/src/components/SiteHeader.tsx` | Link `/login` inexistente | Substituído por `/contato` |
| 4 | `api/lead.ts` (raiz) | Re-export morto | Removido |
| 5–7 | `apps/*/src/assets/react.svg` | Logo Vite não referenciado | Removidos (sessão anterior) |

## Correções HTML/SEO (2026-04-26 23:00)

| # | Arquivo | Problema | Ação |
|---|---|---|---|
| 8 | `apps/web/index.html` | `color-scheme: light` num site dark | Corrigido para `dark` |
| 9 | `apps/web/index.html` | `canonical` sem `/` final | Corrigido para `https://reidasvendas.com/` |
| 10 | `apps/web/index.html` | `apple-touch-icon` apontava para `.png` inexistente | Substituído por `/pwa-192.svg` existente |
| 11 | `apps/web/index.html` | JSON-LD sem `DigitalMarketingAgency`, `LocalBusiness`, `inLanguage`, `SearchAction` | JSON-LD expandido e alinhado com `seo.ts` |
| 12 | `apps/web/index.html` | Faltava `og:locale`, `twitter:site`, `twitter:creator`, `og:image:alt` | Adicionados |
| 13 | `apps/web/index.html` | Faltava `<link rel="manifest">` | Adicionado |
| 14 | `apps/web/index.html` | `<link rel="preload" as="video">` — spec inválida | Corrigido para `as="fetch"` com `crossorigin` |
| 15 | `apps/web/index.html` | Critical CSS minimalista com apenas `body` | Expandido com `box-sizing`, `scroll-behavior`, `min-height` |
| 16 | `apps/docs/index.html` | Ordem incorreta de metas, `charset` não era o primeiro | Corrigido; adicionada `description` |
| 17 | `apps/admin/index.html` | Mesmos problemas que docs | Corrigido |
| 18 | `public/index.html` | Mesmos metadados deficientes, `color-scheme: light` | Corrigido completo (build regenera os assets) |
| 19 | `apps/web/public/manifest.webmanifest` | Nome `ALTIQ` errado, faltava `id`, `lang`, `dir`, `scope`, `categories`, `maskable` | Corrigido completo |
| 20 | `apps/web/public/robots.txt` | Domínio `.com.br` errado, regras obsoletas | Corrigido para `reidasvendas.com` |
| 21 | `apps/web/public/sitemap.xml` | 90+ URLs fantasma com `.com.br` e rotas inexistentes | Substituído por apenas as 9 rotas reais do router |
| 22 | `apps/web/public/sw.js` | Cache `altiq-pwa-v1` com nome errado | Atualizado para `rdv-pwa-v2` |
| 23 | Build completo | Validação pós-correção | `pnpm build` executado — exit 0, 3 pacotes, sem erros |

---

## Pendências técnicas (fazer amanhã)

### P0 — Crítico (risco imediato)
- [ ] **`git init` + primeiro commit** — o projeto não tem histórico de versão. Qualquer erro de edição é irreversível.

### P1 — Alto impacto
- [ ] **Configurar variáveis de ambiente reais** — `VITE_GTM_ID`, `VITE_GA4_ID`, `LEAD_WEBHOOK_URL`, `OPENAI_API_KEY` precisam de valores reais no Vercel para o site funcionar em produção.
- [ ] **Ativar Meta Pixel** — `AnalyticsProvider.tsx` tem os hooks prontos e comentados; só falta o ID + descomentar.
- [ ] **Mover duplicados** para packages — `cn`, `useTheme`, `Empty` ainda existem em 3 apps cada.

### P2 — Médio prazo
- [ ] **Storybook** (`apps/docs`) — está como placeholder; nenhum componente do `packages/ui` tem história.
- [ ] **Admin** (`apps/admin`) — placeholder sem conteúdo real.
- [ ] **Supabase leads** — `LeadForm.tsx` tem o código comentado para inserir leads diretamente no Supabase; desbloquear quando `VITE_SUPABASE_URL` for configurado.
- [ ] **ChatWidget** — só aparece se `VITE_CHAT_ENABLED=true`; `api/chat.ts` usa `OpenAI Responses API` (rota `/v1/responses` — confirmar que o modelo do `.env.example` existe nessa rota).
- [ ] **SW / PWA** — `apps/web/public/sw.js` existe, manifesto também; falta testar offline.

### P3 — Cosmético / qualidade
- [ ] Normalizar indentação de `SiteHeader.tsx` (mistura tabs + espaços).
- [ ] `HeroVideo.tsx` — remover prop `src` completamente após confirmar zero usages.
- [ ] `apps/web/src/lib/analytics.ts` — `trackEvent` nunca chamado diretamente; avaliar se é necessário ou remover.

---

## O que deve ficar pronto AMANHÃ

| Projeto / entregável | Prioridade | Bloqueio atual |
|---|---|---|
| **1. `git init` + commit baseline** | URGENTE | Nenhum — 5 min |
| **2. Variáveis de ambiente no Vercel** | URGENTE | Precisa acessar o Vercel dashboard; autenticar MCP Vercel primeiro |
| **3. Auth Notion MCP** | Alto | Popup OAuth pendente no browser |
| **4. Auth Vercel MCP** | Alto | Erro URL redirecionamento no provedor (bug do plugin) |
| **5. Firecrawl + Hugging Face** | Médio | Instalar plugins + fornecer API keys |
| **6. Mover `cn/useTheme/Empty` para packages** | Médio | Nenhum — ~45 min de refactor |
| **7. Preencher Storybook com componentes reais** | Médio | Nenhum |

---

## Minha opinião sobre o futuro deste projeto

### Pontos fortes reais

O código é sólido acima da média. O monorepo está bem estruturado com `turbo`, os packages têm responsabilidades claras, o design system está limpo (glassmorphism/bento é coerente e não exagerado), o SEO técnico está a um nível raramente visto em projetos independentes (JSON-LD LocalBusiness + DigitalMarketingAgency, canonical dinâmico, OG completo), e a `LeadForm` com A/B test, UTM capture e rastreamento de consentimento já está production-ready.

### Risco principal: falta de histórico git

O maior risco hoje é que o projeto não tem git. Uma edição errada, um `pnpm build` que limpa `public/`, ou um problema no OneDrive (que já está a mostrar warnings) pode apagar semanas de trabalho sem recuperação possível.

### Visão para os próximos 30 dias

O site `reidasvendas.com` já tem a base para um funil de alta conversão: hero com vídeo, marquee de social proof, grid de templates, formulário de lead com A/B e UTM, chat widget com IA. O que falta é **dados reais e integração ativa**:

1. Conectar GTM/GA4 + Meta Pixel para medir tráfego real.
2. Ligar o webhook n8n para que os leads do formulário cheguem ao CRM/WhatsApp.
3. Alimentar os templates com projetos reais (as imagens são Unsplash placeholder).
4. Lançar o Storybook com os componentes de `packages/ui` para acelerar iterações de design.

Com estas 4 ações, o projeto passa de "vitrine técnica" para **funil operacional**. A arquitetura já suporta escalar para múltiplos nichos do "Guia Supremo de Negócios Locais" sem reescrever nada — basta parametrizar `BRAND` e as rotas.

### Potencial de alto impacto a médio prazo

O `PIOLA BUILD & AGENT-OS` descrito no `docs/perfil-usuario.md` é ambicioso e a arquitetura de pacotes deste monorepo é exatamente o fundamento correto para escalar para múltiplos produtos (`Saúde GPT`, `Farmacêutico Shop`, `OpenZap`). Quando esses produtos chegarem, o padrão de `@altiq/ui`, `@altiq/utils`, `@altiq/types` vai economizar meses de duplicação.
