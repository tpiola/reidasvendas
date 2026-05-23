# apps/web — Site Rei das Vendas

SPA em **Vite 6** + **React 18** + **Tailwind**. Deploy na Vercel com funções em `api/`.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Dev server (porta Vite padrão) |
| `pnpm build` | `tsc` + `vite build` → `dist/` |
| `pnpm check` | Typecheck |
| `pnpm e2e` | Playwright (home, links, a11y) |

## Pastas relevantes

- `src/pages/` — rotas ativas (`Home`, `Projetos`, `Contato`, …)
- `src/components/` — header, footer, logo, formulário
- `src/lib/` — SEO, brand, conteúdo da home
- `public/` — favicon, sitemap, robots
- `api/` — `lead.ts`, `chat.ts` (serverless)

## Tema

Dark/light via `ThemeProvider` (`src/hooks/useTheme.tsx`). Preferência em `localStorage`.
