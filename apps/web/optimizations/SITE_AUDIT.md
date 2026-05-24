# Auditoria de site — Rei das Vendas

> Skill: `.cursor/skills/site-analyst/SKILL.md`  
> Capturas: `optimizations/audit-screenshots/` (gerar com `pnpm -C apps/web e2e site-audit-screenshots.spec.ts`)

## Resumo executivo

| Área | Estado | Notas |
|------|--------|-------|
| Tema claro/escuro | OK | Tokens `page-surface`, `section-ink`, `text-gradient-accent` |
| Home — mídia | OK | Hero, Pexels, depoimentos com fallback + poster |
| Blog | OK | Capas WebP Unsplash em cards e post |
| Rodapé / lead | OK | Vídeo, WhatsApp, selos |
| Governança | OK | Vídeo Pexels (CSP) |
| Depoimentos YouTube | P1 | Definir `VITE_TESTIMONIAL_YT_1` / `_2` na Vercel |
| Hero local | P2 | Opcional `public/videos/hero.mp4` para LCP |

## Matriz P0 / P1 / P2

### P0 — bloqueia confiança ou conversão

| ID | Bloco/rota | Gap | Ação |
|----|------------|-----|------|
| — | — | Nenhum aberto pós `ff52706` | Manter CI verde |

### P1 — completude editorial / SEO

| ID | Bloco/rota | Gap | Ação |
|----|------------|-----|------|
| P1-YT | Home · depoimentos | IDs YouTube vazios em prod | Env na Vercel |
| P1-BLOG | `/blog` | Poucos posts (3) | Conteúdo editorial contínuo |
| P1-LH | Global | Lighthouse não automatizado no CI | Ver `LIGHTHOUSE.md` |

### P2 — polish e performance

| ID | Bloco/rota | Gap | Ação |
|----|------------|-----|------|
| P2-HERO | Hero | Sem `hero.mp4` local | Upload opcional em `public/videos/` |
| P2-NICHE | `/saude`, `/negocios` | Rotas secundárias | Revisar mídia se forem promovidas no menu |
| P2-ANIM | Home lazy | Cinemático/testimonials só após scroll | Aceitável (perf); validar em mobile real |

## Checklist bloco a bloco (Home)

| Bloco | Seletor | Mídia | Tema dual | Print |
|-------|---------|-------|-----------|-------|
| Hero | `.hero-dark` | vídeo + poster | hero-ink | `home-hero-{theme}.png` |
| Demo | `#demo` | InlineVideo | tokens | `home-demo-{theme}.png` |
| Evolução | `#evolucao` | salesFunnel | tokens | `home-evolucao-{theme}.png` |
| Como funciona | `#como-funciona` | — | section-white | `home-como-funciona-{theme}.png` |
| Cinemático | `[aria-labelledby="cinematic-heading"]` | manifesto | tokens | scroll + screenshot manual |
| Projetos | `#projetos` | Unsplash | tokens | `home-projetos-{theme}.png` |
| Planos CTA | band | — | section-dark | via `/planos` |
| Depoimentos texto | marquee | — | tokens | — |
| Vídeo social | `aria-label=Depoimentos em vídeo` | Pexels/YT | tokens + `.media-band` | scroll |
| Garantias | TrustGuarantee | — | tokens | — |
| FAQ | `#faq` | — | section-white | `home-faq-{theme}.png` |
| CTA final | `#diagnostico-form` | — | tokens | `home-cta-final-{theme}.png` |

## Rotas auditadas

`/`, `/planos`, `/projetos`, `/blog`, `/blog/:slug`, `/diagnostico`, `/contato`, `/governanca`, `/templates`

## Comandos

```bash
pnpm run ci
pnpm -C apps/web e2e site-audit-screenshots.spec.ts
```

## Histórico

| Data | Branch | Alterações |
|------|--------|------------|
| 2026-05-23 | `cursor/site-analyst-audit-d11b` | Skill site-analyst, blog capas, `.media-band`, Pexels testimonials/governança, e2e screenshots |
