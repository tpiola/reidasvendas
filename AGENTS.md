# AGENTS.md — Orientação para Agentes de IA neste repositório

> Lido automaticamente por Cursor, Claude Code, GPT Codex e outros agentes compatíveis com a convenção `AGENTS.md`. Define como as **skills** disponíveis devem ser ativadas, padrões de prompting do projeto e regras de qualidade.

## Stack e regras inegociáveis

- Monorepo `pnpm` + `turbo`. **Nunca usar npm ou yarn.**
- Next.js 15 / React 18 / TypeScript strict / Vite (apps) / Supabase / Vercel.
- **Não reescrever ficheiros inteiros** — só fornecer trechos alterados.
- **Não alterar classes Tailwind de design** (glassmorphism / bento) sem pedido explícito.
- Se a mesma solução falhar 2x, parar e pedir logs de debug em vez de retentar.
- Responder em **português**.

## Skills do Cursor — quando acionar

As skills abaixo já vêm com plugins instalados (Vercel, Supabase, Notion, Meta Quest). O agente deve ativá-las automaticamente quando o trigger casar.

### Web / UI / DX
| Skill | Disparar quando |
|---|---|
| `shadcn` | Adicionar/compor componentes UI, configurar tema, registries, theming Tailwind. |
| `react-best-practices` | Após editar 2+ arquivos `.tsx` — checklist de hooks, a11y, perf, TS. |
| `nextjs` | Qualquer trabalho em App Router, Server Components, Server Actions, middleware. |
| `next-cache-components` | Migração para `use cache`, `cacheLife`, `cacheTag`, PPR. |
| `next-upgrade` | Upgrade de versão Next.js. |
| `turbopack` | Configurar bundler, HMR, debug de build. |
| `routing-middleware` | Rewrites, redirects, personalização antes do cache. |
| `runtime-cache` | Cache key-value compartilhado entre Functions/Middleware/Builds. |

### Plataforma e deploy
| Skill | Disparar quando |
|---|---|
| `bootstrap` | Setup inicial / reparar repo + recursos Vercel-linked. |
| `deployments-cicd` | Deploy, promote, rollback, CI workflows, `--prebuilt`. |
| `env-vars` | `.env`, `vercel env`, OIDC tokens. |
| `vercel-cli` | Operações via CLI Vercel. |
| `vercel-functions` | Serverless / Edge / Fluid Compute / streaming / Cron. |
| `vercel-storage` | Blob, Edge Config, Neon Postgres, Upstash Redis. |
| `vercel-sandbox` | Executar código não confiável em microVM. |
| `marketplace` | Discovery, install, build de integrações Marketplace. |
| `vercel-agent` | Code review e investigação de incidentes via Vercel Agent. |
| `verification` | Triggera ao iniciar dev server ou em sintomas "isto não funciona". |

### Dados / IA
| Skill | Disparar quando |
|---|---|
| `supabase` | Qualquer task com Supabase: Auth, RLS, Edge Functions, Realtime, Storage. |
| `supabase-postgres-best-practices` | Performance / schema / queries Postgres. |
| `ai-sdk` | Qualquer feature de IA: chat, gen, tools, streaming, embeddings, MCP. |
| `ai-gateway` | Roteamento entre providers, failover, custo. |
| `chat-sdk` | Bots multi-plataforma (Slack/Telegram/Teams/Discord). |
| `workflow` | Workflows duráveis (WDK), pause/resume, retries. |
| `auth` | Clerk, Descope, Auth0 + Next.js. |
| `next-forge` | Trabalho em monorepo next-forge. |

### Notion / produtividade
| Skill | Disparar quando |
|---|---|
| `find` / `search` / `database-query` | Buscar conteúdo Notion. |
| `create-page` / `create-database-row` / `create-task` | Criar artefatos Notion com defaults sensatos. |
| `meeting-intelligence` | Preparar materiais de reunião. |
| `knowledge-capture` | Transformar conversas em docs estruturados. |
| `research-documentation` | Pesquisa multi-página com citações. |
| `spec-to-implementation` / `tasks-plan` / `tasks-build` | Spec → tasks → implementação. |
| `tasks-explain-diff` | Documento explicando code changes. |

### Cursor-internas
| Skill | Disparar quando |
|---|---|
| `canvas` | Auditorias visuais, dashboards, comparativos, qualquer artefato analítico rico. **Preferir canvas a tabela markdown** para resultados de MCP (Datadog/Linear/Sentry). |
| `babysit` | Manter PR merge-ready (triagem + CI loop). |
| `split-to-prs` | Quebrar trabalho em PRs pequenos. |
| `create-rule` / `create-skill` / `create-hook` | Criar regras, skills ou hooks novos para o Cursor. |
| `update-cursor-settings` | Mexer em `settings.json` do Cursor/VSCode. |
| `statusline` | Customizar status line da CLI. |
| `playwright` | Automação de browser via terminal. |
| `site-analyst` | Auditoria bloco a bloco, contraste dark/light, gaps de mídia/SEO/conversão. Ver `.cursor/skills/site-analyst/SKILL.md`. |
| `cursor-guide` | Dúvidas sobre o produto Cursor. |

### Meta Quest / XR
| Skill / Tool | Disparar quando |
|---|---|
| `hzdb / search_docs` (categoria DESIGN) | Guidelines de design XR/MR. |
| `hzdb / search_api_reference` | API reference Horizon OS. |
| Demais ferramentas `hzdb / *` | ADB, logcat, traces, perfetto — só com autorização explícita. |

## Padrões de prompting a respeitar

Inspirados na "PROMPT LIBRARY PARA HUB DE OPORTUNIDADES" e nos "SYSTEM PROMPTS AVANÇADOS" do usuário (ver [perfil-usuario.md](docs/perfil-usuario.md)).

1. **Tags XML para separar contextos** quando o input misturar instrução e dados:
   `<instrucoes>`, `<texto>`, `<formato_saida>`.
2. **Framework 4D** — toda task complexa deve ser tratada com:
   - **Delegation**: o que delegar a sub-agente vs. fazer inline.
   - **Description**: descrição inequívoca do estado desejado.
   - **Discernment**: validar premissas antes de agir.
   - **Diligence**: verificar resultado antes de finalizar.
3. **Output estruturado** — preferir matrizes acionáveis ou JSON estrito. Evitar prosa solta para resultados quantitativos.
4. **Persona "Analista de Dados Sênior"** — sempre validar qualidade de dados, questionar premissas estatísticas, alertar sobre significância quando *n* < 30.
5. **Persona "Revisor de Código Security-First"** — três leituras progressivas focadas em **OWASP Top 10** (XSS, CSRF, SQLi, IDOR, etc.).
6. **Tom** — direto, sem introduções, sem pedidos de desculpa, sem emoji.

## Convenções do monorepo

- `apps/web` — site público (Vite + React + Tailwind).
- `apps/docs` — Storybook / design system.
- `apps/admin` — placeholder para back-office.
- `packages/ui` — componentes compartilhados.
- `packages/utils` — utilitários (`cn`, etc.).
- `packages/types` — tipos compartilhados.
- `packages/config` — config compartilhada.
- `api/lead.ts` — função serverless de captura de leads.
- `n8n/workflows` — workflows de automação.

### Comandos canônicos
```bash
pnpm dev      # turbo run dev --parallel
pnpm build    # turbo run build
pnpm test     # turbo run test  (vitest)
pnpm lint     # turbo run lint
pnpm check    # turbo run check (tsc --noEmit)
pnpm e2e      # Playwright
pnpm a11y     # Playwright -g a11y
pnpm storybook
```

## Status de integrações MCP

Ver [STATUS.md](STATUS.md) para o snapshot vivo (atualizado a cada sessão).

| MCP | Estado | Notas |
|---|---|---|
| Supabase | Autenticado | Pronto para uso. |
| Meta Quest (`hzdb`) | OK | Validado com `search_docs`. |
| Vercel | Falha OAuth | URL de redirecionamento inválida no provedor. Fallback via Vercel CLI + token pessoal. |
| Notion | Pendente | Reabrir popup de OAuth e completar login. |
| Firecrawl / Hugging Face / Freepik | Não instalados | Adicionar via Marketplace Cursor (Firecrawl, HF) ou wrapper REST (Freepik). |
