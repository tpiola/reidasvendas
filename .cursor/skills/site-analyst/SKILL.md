# Site Analyst — Rei das Vendas

## Quando acionar

- Auditoria de completude (conteúdo, mídia, conversão)
- Contraste tema claro/escuro bloco a bloco
- Lighthouse, a11y, SEO técnico
- Matriz de gaps antes de deploy

## Fluxo (4D)

1. **Descrição** — rotas em `App.tsx`; checklist em `apps/web/optimizations/SITE_AUDIT.md`
2. **Discernimento** — validar premissas (env YouTube, vídeo local em `public/videos/`)
3. **Delegation** — capturas via `pnpm -C apps/web e2e site-audit-screenshots.spec.ts`
4. **Diligence** — `pnpm run ci` + revisar `optimizations/audit-screenshots/`

## Checklist bloco a bloco (Home)

| Bloco | ID/seletor | Mídia | Tema dual |
|-------|------------|-------|-----------|
| Hero | `.hero-dark` | vídeo + poster | hero-ink |
| Demo | `#demo` | InlineVideo performance | tokens |
| Meio | `#evolucao` | salesFunnel | tokens |
| Como funciona | `#como-funciona` | — | section-white |
| Cinemático | lazy band | manifesto | tokens |
| Projetos | `#projetos` | imagens Unsplash | tokens |
| Planos CTA | band | — | accent |
| Depoimentos | marquee | — | tokens |
| Vídeo social | TestimonialsVideo | Pexels/YouTube | tokens |
| Garantias | TrustGuarantee | — | tokens |
| FAQ | `#faq` | — | section-white |
| CTA final | `#diagnostico-form` | — | tokens |

## Tokens obrigatórios

- Superfície clara: `page-surface`, `text-surface`, `text-surface-muted`
- Banda escura: `.section-dark` + `section-ink` (nunca `text-white` solto em glass no tema claro)
- Destaque título: `text-gradient-accent`

## Saída esperada

Atualizar `SITE_AUDIT.md` com matriz Prioridade (P0/P1/P2), prints em `audit-screenshots/`, e PR focado.
