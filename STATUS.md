# STATUS DO PROJETO — 2026-04-26 (snapshot)

> Arquivo de checkpoint para retomar o trabalho amanhã sem entrar em loop de autenticação/configuração.

---

## 1. Estado atual do workspace

### Stack identificada
- Monorepo `pnpm` + `turbo` (`pnpm-workspace.yaml`, `turbo.json`).
- Apps: `apps/web` (site principal — Vite + React 18 + Tailwind), `apps/docs` (Storybook), `apps/admin` (placeholder).
- Packages: `packages/ui`, `packages/utils`, `packages/types`, `packages/config`.
- Deploy: `vercel.json` aponta `outputDirectory: "public"` com SPA rewrites.
- Workflows externos: `n8n/workflows`, função `api/lead.ts`.

### Erros / pontos críticos detectados
1. Não é repositório git (`git status` falhou com "not a git repository"). Recomendado inicializar antes de mais alterações.
2. OneDrive cloud provider gerou warning ao executar PowerShell ("provedor do arquivo de nuvem não está em execução") — pode causar falhas intermitentes em I/O.
3. `vercel.json` aponta build output para `public/` na raiz, mas o build do Vite (`apps/web`) gera em `apps/web/dist`. A pasta `public/` da raiz parece um build manual antigo (`/assets/index-B-FETEhN.js` referenciado em `public/index.html`). **Validar amanhã** se o deploy real vem dessa pasta ou se precisa ajuste no `buildCommand`/`outputDirectory`.
4. `24_hour_action_plan.md` na raiz parece auto-gerado e desatualizado (fala em "thiagobuilder" mas o projeto é `altiq` / domínio `reidasvendas.com`). Candidato a remoção depois de confirmar.

### Arquivos duplicados (não removidos hoje — precisam refactor cuidadoso)
Idênticos em `apps/admin`, `apps/docs` e `apps/web`:
- `src/lib/utils.ts` (função `cn`)
- `src/hooks/useTheme.ts`
- `src/components/Empty.tsx`

Plano: mover `cn` para `@altiq/utils` e `useTheme` + `Empty` para `@altiq/ui`, depois substituir imports.

### Limpeza realizada hoje
- Removidos 3 ficheiros de logo padrão Vite não utilizados (confirmado por busca, sem referências):
  - `apps/admin/src/assets/react.svg`
  - `apps/docs/src/assets/react.svg`
  - `apps/web/src/assets/react.svg`

### Adicionado em 2026-04-26 23:00 — Varredura HTML/SEO
- `apps/web/index.html` reescrito: dark mode, canonical correto, manifest link, preload válido, OG/Twitter completos, JSON-LD expandido com `DigitalMarketingAgency + LocalBusiness + SearchAction`.
- `apps/docs/index.html` e `apps/admin/index.html` corrigidos (charset primeiro, description adicionada, color-scheme dark).
- `public/index.html` corrigido com mesmos metadados (regenerado pelo `pnpm build`).
- `apps/web/public/manifest.webmanifest`: nome `ALTIQ` → `Rei das Vendas`, adicionados `id`, `lang`, `dir`, `scope`, `categories`, ícone `maskable`.
- `apps/web/public/robots.txt`: domínio `.com.br` errado → `reidasvendas.com`; regras simplificadas.
- `apps/web/public/sitemap.xml`: 90+ URLs fantasma removidas → apenas 9 rotas reais do router.
- `apps/web/public/sw.js`: cache `altiq-pwa-v1` → `rdv-pwa-v2`.
- `pnpm build` — exit 0, 3 pacotes, sem erros.

### Adicionado em 2026-04-26 22:50
- Criado [`AGENTS.md`](AGENTS.md) na raiz: programa as skills do Cursor (quando acionar cada uma), padrões de prompting (tags XML, 4D, personas) e convenções do monorepo.
- Criado [`docs/perfil-usuario.md`](docs/perfil-usuario.md): dossier do usuário revisado, desduplicado e formatado.

### Resultado de `pnpm test` (2026-04-26 22:40)
Tudo verde — 9 testes em 7 pacotes, ~3m42s total (turbo run test, exit 0).

| Pacote | Test Files | Tests | Estado |
|---|---|---|---|
| `@altiq/config` | 1 | 1 | passou |
| `@altiq/types` | 1 | 3 | passou |
| `@altiq/utils` | 1 | 1 | passou |
| `@altiq/ui` | 1 | 1 (Button) | passou |
| `apps/docs` | 1 | 1 (App renderiza) | passou |
| `apps/admin` | 1 | 1 (App renderiza) | passou |
| `apps/web` | 1 | 1 (LeadForm) | passou |

Stack: pnpm 9.15.0, Node 22.22.0, vitest 3.2.4, turbo 2.9.6.

---

## 2. MCPs / Integrações

| Integração | Estado | Próximo passo |
|---|---|---|
| Supabase MCP | Autenticado | Listar projetos e validar schema/RLS |
| Meta Reality Labs / Horizon (`hzdb`) | Operacional (testado com `search_docs`) | Usar para guidelines de design XR se relevante |
| Vercel MCP | Auth falhou: erro "URL de redirecionamento do app é inválida" no provedor OAuth | Aguardar correção do provedor ou conectar via `vercel login` CLI + token manual |
| Notion MCP | Auth timeout (2 min) — fluxo OAuth não foi concluído no browser | Reabrir popup de auth e completar login |
| Firecrawl | Não instalado nesta instância | Instalar plugin no Cursor → autenticar com API key |
| Hugging Face | Não instalado | Instalar plugin → token `HF_TOKEN` |
| Freepik Spaces | Não há plugin oficial conhecido no marketplace Cursor | Avaliar acesso via API REST direto + token; documentar limitação |

---

## 3. O QUE SERÁ FEITO AMANHÃ

### Bloco A — Saúde do projeto (rápido, ~30 min)
- [ ] Inicializar git (`git init`) e fazer primeiro commit como baseline.
- [ ] Rodar `pnpm install` + `pnpm check` + `pnpm lint` + `pnpm test` para validar baseline.
- [ ] Confirmar/ajustar `vercel.json` (output real do build vs pasta `public/` da raiz).
- [ ] Decidir destino do `24_hour_action_plan.md` (mover para `docs/legacy/` ou apagar).

### Bloco B — Refactor de duplicados (~45 min)
- [ ] Mover `cn` (`utils.ts`) para `packages/utils/src/cn.ts` e exportar via `@altiq/utils`.
- [ ] Mover `useTheme.ts` para `packages/ui/src/hooks/useTheme.ts`.
- [ ] Mover `Empty.tsx` para `packages/ui/src/components/Empty.tsx`.
- [ ] Atualizar imports em `apps/web`, `apps/docs`, `apps/admin`.
- [ ] Apagar duplicados após `pnpm check` passar.

### Bloco C — MCPs e integrações (~60 min)
- [ ] Notion MCP: completar fluxo OAuth no browser e validar com listagem de páginas.
- [ ] Vercel MCP: tentar reauth; se persistir erro do provedor, fallback via Vercel CLI + token pessoal.
- [ ] Instalar Firecrawl MCP (plugin marketplace Cursor) com API key.
- [ ] Instalar Hugging Face MCP com `HF_TOKEN`.
- [ ] Freepik Spaces: confirmar inexistência de MCP oficial; configurar wrapper REST minimalista usando API key (rota `api/freepik.ts` ou similar) — só se ainda for prioridade.

### Bloco D — Skills de design ativadas (~10 min, só leitura)
Skills já disponíveis no Cursor que serão usadas automaticamente quando o trigger casar:
- `shadcn` — componentes UI e tema.
- `react-best-practices` — review de TSX após edições múltiplas.
- `nextjs` — caso o projeto evolua para Next App Router.
- `next-cache-components` — quando migrar para padrão de cache moderno.
- `meta-quest-agentic-tools-hzdb / search_docs` (DESIGN) — guidelines de design XR.
- `canvas` — para auditorias visuais ricas.

Não exigem instalação; ficam ativas pelo próprio agente.

### Bloco E — Verificações finais
- [ ] Rodar `pnpm build` e abrir preview local.
- [ ] Atualizar este `STATUS.md` com o que ficou feito vs pendente.
- [ ] Commit final do dia.

---

## 4. Convenções a respeitar (do `.cursorrules`)
- Sempre `pnpm`, nunca `npm`/`yarn`.
- Não reescrever ficheiros inteiros — só trechos.
- Não alterar classes Tailwind de design (glassmorphism / bento) sem pedido explícito.
- Se algo falhar 2x, parar e pedir logs em vez de tentar de novo.
