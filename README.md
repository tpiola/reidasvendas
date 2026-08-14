# Rei das Vendas

Repositório canônico do site institucional e da captação de leads do **Rei das Vendas**.

- Produção: [reidasvendas.com.br](https://reidasvendas.com.br)
- Branch de produção: `main`
- Projeto Vercel: `reidasvendas`
- Aplicação pública: `apps/web`

## Stack

Monorepo **pnpm** + **Turbo**, com Vite, React e TypeScript na aplicação pública.

## Estrutura

```text
apps/web/          Site de produção
apps/docs/         Storybook e design system
apps/admin/        Back-office
packages/ui/       Componentes compartilhados
packages/utils/    Utilitários
packages/types/    Tipos TypeScript
api/               Funções serverless
docs/              Documentação operacional
n8n/workflows/     Automação de leads
```

## Desenvolvimento

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm ci
```

O comando `pnpm ci` executa typecheck, lint, testes, build, testes E2E e acessibilidade.

## Deploy

A integração Git da Vercel publica:

- `main` em produção;
- branches e pull requests como previews;
- somente o projeto canônico `reidasvendas`.

Consulte [docs/DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md) e [docs/GOVERNANCE.md](docs/GOVERNANCE.md).

Variável obrigatória em produção: `LEAD_WEBHOOK_URL`. Segredos nunca devem ser registrados no Git.

## Licença

Projeto privado — uso restrito ao titular da marca Rei das Vendas.
