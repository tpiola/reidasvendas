# Relatório SEO e performance — Rei das Vendas

> Snapshot técnico por rota pública (`apps/web`). Métricas Lighthouse devem ser medidas em produção após deploy.

## Rotas canónicas

| Rota | Title (resumo) | Meta única | Schema.org | CTA principal |
|------|----------------|------------|------------|---------------|
| `/` | Rei das Vendas — gigantes | Sim | Organization, Service, WebSite, FAQ | Diagnóstico |
| `/planos` | Planos | Sim | Organization | Ver plano |
| `/planos/essencial` | Plano Essencial | Sim | Product + Offer + Service | Garantir minha vaga |
| `/planos/crescimento` | Plano Crescimento | Sim | Product + Offer + Service | Quero minha máquina de vendas |
| `/planos/escala` | Plano Escala | Sim | Product + Offer + Service | Falar com especialista |
| `/planos/sob-medida` | Sob medida | Sim | Product + Offer + Service | Montar meu pacote |
| `/projetos` | Projetos por segmento | Sim | Organization | Ver case |
| `/projetos/*` | Por slug | Sim | Organization | CTA por nicho |
| `/diagnostico` | Diagnóstico 24h | Sim | Organization | Formulário lead |
| `/contato` | Contato Franca-SP | Sim | LocalBusiness | WhatsApp + mapa |
| `/blog` | Blog | Sim | Organization | Artigos |
| `/blog/:slug` | Por artigo | Sim | Article (via SEO page) | Leitura |
| `/templates` | Amostras | Sim | Organization | Preview |

## Redirects 301 (legado)

- `/projetos/hub-clinico` → `/projetos/clube-digital`
- `/projetos/imobiliario-premium` → `/projetos/vitrine-imobiliaria-3d`
- `/projetos/e-commerce-elite` → `/projetos/maquina-de-varejo`

Config: `apps/web/vercel.json`.

## Performance (checklist)

- [x] Code-splitting por rota (`React.lazy`)
- [x] Imagens Unsplash com `fm=webp`
- [x] Vídeos externos com `preload` escalonado no hero
- [x] Cache longo em `/assets/*` (Vercel headers)
- [x] Hero poster com `fetchPriority="high"`
- [ ] Vídeo local `/videos/hero.mp4` (opcional — ver `public/videos/README.md`)
- [ ] Medir LCP/CLS em PageSpeed (meta: 90+ mobile)

## Analytics e testes

- GA4: `AnalyticsProvider` (requer consentimento cookie)
- A/B: CTA catálogo (`ab-catalog-cta.ts`)
- Heatmaps: configurar no GTM após consentimento

## LGPD

- `CookieConsent` antes de tracking
- Formulários com checkbox de consentimento
- `/politica` e `/termos` linkados no footer

## Acessibilidade

- `alt` em capas de plano e projetos
- Navegação por teclado nos CTAs e assistente
- `prefers-reduced-motion` no hero e animações

## Próximos passos operacionais

1. Upload do clip hero em `public/videos/`.
2. Search Console: enviar `sitemap.xml`.
3. Definir `VITE_CHAT_ENABLED` + `OPENAI_API_KEY` na Vercel para chat IA.
4. Rodar `pnpm e2e` e Lighthouse CI em PR.
