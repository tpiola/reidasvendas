# Rei das Vendas

Site institucional e captura de leads — [reidasvendas.com.br](https://reidasvendas.com.br).

Monorepo **pnpm** + **Turbo**. Aplicação pública em `apps/web` (Vite 6, React 18, TypeScript).

## Estrutura

```
apps/web/          Site de produção (Vite + React)
apps/docs/         Storybook / design system
apps/admin/        Back-office (placeholder)
packages/ui/       Componentes compartilhados
packages/utils/    Utilitários (cn, etc.)
packages/types/    Tipos TypeScript
api/               Funções serverless (lead) — raiz do deploy Vercel
docs/              Documentação operacional
n8n/workflows/     Automação de leads
```

## Comandos

```bash
pnpm install --frozen-lockfile
pnpm dev              # desenvolvimento (turbo paralelo)
pnpm run ci           # check + lint + test + build:web + e2e
pnpm build:web        # build só do site
```

## Deploy

Vercel, Root Directory `apps/web`. Ver [docs/DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md).

Variável obrigatória em produção: `LEAD_WEBHOOK_URL`.

## Licença

Projeto privado — uso restrito ao titular da marca Rei das Vendas.
