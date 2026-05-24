# Lighthouse — checklist (Rei das Vendas)

Executar após deploy em produção:

```bash
pnpm -C apps/web build
npx lighthouse https://reidasvendas.com.br/ --only-categories=performance,accessibility,best-practices,seo --view
```

## Já aplicado no código

- Imagens Unsplash com `fm=webp` e `srcset`
- Vídeos lazy abaixo da dobra; hero com poster 1200w (mobile) + UHD desktop; `preload="metadata"` no 1º clip
- Hero Home sem framer-motion no H1; `Reveal` via CSS + `IntersectionObserver` (sem blur)
- `page-surface` + tokens de tema nas rotas públicas; bandas `.section-dark` onde o fundo é fixo escuro
- Code-splitting (router, engagement, vídeos) no Vite
- JSON-LD dinâmico (LocalBusiness, FAQ, Review, Product em planos)
- Fonts com `media="print"` + `onload`; Playfair reduzido a 600/700
- Poster LCP preload com `media` mobile/desktop em `index.html`
- CSP e headers de segurança em `vercel.json`
- Barra sticky de conversão + tracking `whatsapp_click` em FAB/sticky/footer

## Metas sugeridas

| Métrica | Meta |
|---------|------|
| LCP | &lt; 2.5s mobile |
| CLS | &lt; 0.1 |
| SEO | ≥ 95 |
| A11y | ≥ 95 |

Salve o relatório HTML do Lighthouse como `lighthouse-audit.html` nesta pasta após rodar localmente.
