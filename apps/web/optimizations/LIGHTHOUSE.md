# Lighthouse — checklist (Rei das Vendas)

Executar após deploy em produção:

```bash
pnpm -C apps/web build
npx lighthouse https://reidasvendas.com.br/ --only-categories=performance,accessibility,best-practices,seo --view
```

## Já aplicado no código

- Imagens Unsplash com `fm=webp` e `srcset`
- Vídeos lazy abaixo da dobra; hero com poster + UHD desktop
- Code-splitting (router, motion, form) no Vite
- JSON-LD dinâmico (LocalBusiness, FAQ, Review, Product em planos)
- Fonts com `media="print"` + `onload`
- CSP e headers de segurança em `vercel.json`

## Metas sugeridas

| Métrica | Meta |
|---------|------|
| LCP | &lt; 2.5s mobile |
| CLS | &lt; 0.1 |
| SEO | ≥ 95 |
| A11y | ≥ 95 |

Salve o relatório HTML do Lighthouse como `lighthouse-audit.html` nesta pasta após rodar localmente.
