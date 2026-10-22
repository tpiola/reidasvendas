# Estado atual — Rei das Vendas

Documento canônico de estado deste repositório. **Todo agente lê este arquivo antes de editar
qualquer coisa.** Ele diz o que está no ar, o que está aprovado, o que não pode ser revertido e
o que está pendente. Sem ler isto, uma alteração é chute — e chute já custou 4 horas de site
errado (ver _Incidentes_).

## Como este documento é versionado

A **revisão de política** é o SHA do último commit que tocou este arquivo:

```bash
git log -1 --format=%H -- docs/ESTADO-ATUAL.md
```

Leia este documento e `docs/GOVERNANCA-AGENTES.md` **a partir dessa revisão**
(`git show <SHA>:docs/ESTADO-ATUAL.md`). Se não conseguir estabelecer a revisão — sem rede,
checkout que não é o repositório certo, política ausente — faça **apenas inspeção estática**:
não edite, não commite. Relate a lacuna.

## Identidade canônica

| Recurso                | Valor                                                                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repositório            | `tpiola/reidasvendas` (público)                                                                                                                                 |
| Branch de produção     | `main` — protegida contra force-push e exclusão (`enforce_admins: true`)                                                                                        |
| Projeto Vercel         | `reidasvendas` · `prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL` · time `thiagopiola`                                                                                        |
| Domínio canônico       | `reidasvendas.com.br` (`www` deve redirecionar para ele)                                                                                                        |
| Diretório da aplicação | `apps/web` — Vite + React + Tailwind, SPA com pré-render                                                                                                        |
| Monorepo               | `pnpm` + `turbo` — **nunca npm ou yarn** (há um `package-lock.json` órfão na raiz: não use, não propague)                                                       |
| Identidade de commit   | `178150229+tpiola@users.noreply.github.com` — o GitHub **recusa** push com e-mail privado. Nunca use `-c user.email=` para sobrescrever a identidade deste repo |

## O que está no ar — verifique antes de confiar

Última verificação: **12/10/2026** · commit `e299631` · bundle `index-Bcir6itP.js` ·
**sha256 do bundle servido idêntico ao build local** (`b1c52c32b469ffd18394c110bb7aa534`) — ou seja,
o que está no ar é exatamente o build deste commit · TTFB 24/40/164 ms (mediana 40 ms) ·
`/`, `/diagnostico`, `/planos` e `/obrigado` em 200 · `/obrigado` com `noindex, follow` ·
sitemap com 58 URLs · `www` responde 307 para o domínio canônico.
Não acredite neste parágrafo sem conferir:

```bash
git fetch origin && git rev-parse --short origin/main
curl -sI https://reidasvendas.com.br | head -3
curl -s https://reidasvendas.com.br | grep -oE 'index-[A-Za-z0-9_-]+\.js' | head -1
sha256sum apps/web/dist/assets/index-*.js      # compare com o publicado
```

O bundle publicado tem de casar com o build local do commit publicado. Divergência = deploy
pendente ou falho, não "provavelmente foi".

Para conferir o `noindex` de `/obrigado`, use parser multi-linha (`python3 -c` com regex): a tag vem
quebrada em três linhas e o `grep` devolve falso negativo.

## Dependências e overrides — onde eles realmente valem

Medido em **12/10/2026**, dentro deste repo (não em diretório de teste):

- O `package.json` fixa `packageManager: pnpm@9.15.0`. **É essa a versão que roda aqui**, e ela lê
  os overrides **apenas** de `package.json` → `pnpm.overrides`.
- O console imprime `[WARN] The "pnpm" field in package.json is no longer read by pnpm ... ignored:
pnpm.overrides` — **falso alarme na 9.15**. Os overrides são lidos e aplicados: comprovado com
  quatro variantes (só `package.json` → aplica; os dois arquivos → aplica; **só
  `pnpm-workspace.yaml` → não aplica nada**, e o install ainda passa, silencioso).
- Em pnpm **10+/11** a mecânica inverte: lá o `overrides` tem de estar no `pnpm-workspace.yaml` e o
  campo do `package.json` é realmente ignorado. **Ao subir o `packageManager`, mova o bloco antes** —
  senão as 23 travas deixam de valer sem avisar.
- **Nunca mantenha as duas listas em paralelo**: divergem em silêncio.
- **Nunca teste mecânica de pnpm em `/tmp`**: sem o campo `packageManager`, o shim resolve o pnpm
  global (aqui, 11.22.0) e a conclusão sai ao contrário. Use `pnpm install --lockfile-only` dentro
  do repo — resolve a árvore sem baixar nada e é rápido.
- `braces` (GHSA-vfj7-8cjw-p6xm, alto) **não tem versão corrigida publicada**: 3.0.3, a última,
  segue afetada. Não escreva override para ele — `>=3.0.4` derruba o install inteiro com
  `ERR_PNPM_NO_MATCHING_VERSION`. Risco aceito e documentado: só entra em cadeia de build
  (`chokidar` via `tailwindcss`, `fast-glob` via `micromatch`), nunca no bundle publicado.
- Prova de que um override valeu é a **versão resolvida no `pnpm-lock.yaml`**, não a saída do
  `pnpm audit`.

## Arquitetura comercial aprovada

A home deixou de ser página de vendas e passou a ser **engenharia de conversão** (decisão do dono,
04–05/10/2026). Isto é o que está aprovado:

- **Hero clínico:** H1 "Você não perde venda por falta de tráfego. Perde na engenharia da
  conversão." — sem canvas 3D, sem hero pesado.
- **Caminho de entrada é qualificação, nunca WhatsApp direto:** CTA principal abre
  `/diagnostico?estagio=triagem` (4 perguntas: segmento, faturamento aproximado, tráfego atual,
  quem decide). Microcopy: triagem remunerada, creditada integralmente no Setup aprovado,
  nenhuma conversa comercial antes do laudo.
- **Esteira de conversão — fonte única `apps/web/src/lib/esteira.ts`:**
  01 Triagem Clínica R$ 1.500–2.500 (creditada) · 02 Setup R$ 8.000–25.000 (ancorado em ROI) ·
  03 Otimização Contínua R$ 2.000–5.000/mês (sem fidelidade).
- **`/planos`** mostra a esteira no topo; a tabela antiga permanece abaixo como
  "Execução: serviço uma vez" — não foi removida.
- **`/obrigado`** responde 200, com `noindex, follow`, fora do sitemap.
- **`ConversionJourney`** (jornada comercial interativa) faz parte da home: preservada.
- Conteúdo pré-renderizado sai do registro de SEO (`apps/web/src/lib/growth.ts`), não do
  componente React. Rota sem entrada no pré-render = 404 em produção.

## Copy que pertence ao dono — intocável

Não altere, não "melhore", não reverta sem decisão nova registrada neste arquivo:

- Preços e faixas da esteira acima (confirmados pelo dono).
- Texto da garantia de 30 dias.
- Faixas de preço sinalizadas como **CONFIRMADO PELO DONO**.

Reverter isto sem decisão registrada é **incidente**, não mudança de escopo.

## Vocabulário vetado e proibições

Palavras e construções proibidas na comunicação do site: "soluções digitais", "sites incríveis",
"parceiro ideal", "sem compromisso". Preço de commodity no topo da página. CTA direto para
WhatsApp sem passar pela triagem. Número, avaliação, depoimento ou certificação inventados —
a regra é **sem número inventado**: só laudo medido, e resultado sem medição aparece como
"A INSTRUMENTAR".

Proibições técnicas: hero com canvas/3D (mata o LCP), vídeo com áudio, reprocessar imagem no
mesmo caminho de arquivo.

## Diário de decisões

| Data          | SHA       | Decisão                                                                                                                                                               |
| ------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 04–05/10/2026 | `43bd5f9` | Home vira engenharia de conversão; triagem remunerada no lugar do CTA de WhatsApp                                                                                     |
| 05/10/2026    | `76d173c` | Alinha o discurso do diagnóstico; remove o vão do hero antigo                                                                                                         |
| 05/10/2026    | `afcedc9` | Link da esteira aponta para a tabela de execução real                                                                                                                 |
| 05/10/2026    | `c98c2d4` | Merge de reconciliação: arquitetura de conversão + jornada comercial do outro agente                                                                                  |
| 05/10/2026    | `5ad57c8` | Cobre a jornada comercial com testes; realinha o e2e ao hero publicado                                                                                                |
| 05/10/2026    | `1dab5a5` | Esteira no topo de `/planos`; `/obrigado` deixa de responder 404                                                                                                      |
| 05/10/2026    | `ff65401` | Remove o "por mês" duplicado no cartão da Otimização Contínua                                                                                                         |
| 09/10/2026    | `91ea4b3` | Fonte de verdade, protocolo multi-agente e pré-voo contra reversão silenciosa                                                                                         |
| 12/10/2026    | `e299631` | Corrige 3 vulnerabilidades de dependência (`postcss-selector-parser` 7.1.6, `smol-toml` 1.9.1, `source-map-js` 1.2.2); audit 4 → 1; documenta a mecânica de overrides |

## Incidentes registrados

**05/10/2026 — reversão silenciosa de trabalho aprovado.** O commit `7a007ab` ("restaura hero com
logo e comunicação de soluções para negócios locais") removeu **412 linhas** da arquitetura de
conversão, sem decisão registrada, e o site rodou ~4 horas na versão antiga. Causa raiz: não havia
fonte de verdade nem portão de qualidade — só um `AGENTS.md` sobre acionar skills. Remédio: este
documento, `docs/GOVERNANCA-AGENTES.md` e o lease de escrita. **Reverter trabalho aprovado exige
decisão explícita do dono registrada aqui antes da edição.**

**12/10/2026 — quase desligamento silencioso dos overrides.** Ao trocar o bloco de overrides de
lugar (seguindo o aviso enganoso do console), a resolução voltou **para baixo**: `smol-toml`
1.8.0 → 1.5.2 e `postcss-selector-parser` para 6.1.3 — as versões vulneráveis — **sem nenhum erro**.
Detectado apenas porque a versão resolvida foi lida no lockfile, não a saída do `audit`. Regra que
fica: depois de mexer em override, conferir a versão **no lockfile** e comparar com o backup.

**12/10/2026 — push recusado por e-mail privado.** O push com `-c user.email=...@gmail.com` foi
recusado pelo GitHub ("email privacy restrictions"). A identidade correta deste repo é
`178150229+tpiola@users.noreply.github.com`. Não sobrescreva a identidade configurada.

## Pendências abertas

| Pendência                     | Estado                                                                                                                                                                                       |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/obrigado` autocontraditório | "Mensagem enviada" vs "Pagamento Confirmado"; entrega 7 dias (página) vs 12 dias úteis (FAQ) — **aguarda a verdade do dono**                                                                 |
| Black Friday 30%              | Desconto ainda incide sobre tiers legados; converter para desconto na Triagem exige percentual definido pelo dono                                                                            |
| Higiene da raiz               | `24_hour_action_plan.md`, `AUDITORIA_COMPLETA.md`, `DIAGNOSTICO.md`, `REBUILD_PLAN.md`, `design-qa.md`, `package-lock.json` — o próprio `docs/GOVERNANCE.md` proíbe docs temporários na raiz |
| Portão no GitHub              | `main` bloqueia force-push e exclusão, mas **não exige PR nem check** — qualquer escrita entra direto. Decisão do dono                                                                       |
| `braces` (1 high)             | Sem correção publicada pelo upstream. Build-only. Aceito e documentado acima                                                                                                                 |
| 404 em `text/plain`           | A aplicação não tem página de 404 própria: rota inexistente devolve `NOT_FOUND` cru da Vercel (79 B, sem marca nem caminho de volta)                                                         |
| `og:image` única              | Um único JPEG (236 KB) para todas as rotas — compartilhamento social genérico                                                                                                                |
| CSS render-blocking           | 178.819 B de CSS em arquivo único + 9.680 B inline, sem code-split por rota                                                                                                                  |

Resolvido em 09/10/2026: `www.reidasvendas.com.br` deixou de ser NXDOMAIN — responde 307 para
`reidasvendas.com.br`, que é o comportamento que o `docs/GOVERNANCE.md` exige.

## Portão obrigatório antes de commitar

```bash
git fetch origin && git merge --ff-only origin/main   # ou rebase, nunca force-push
pnpm check    # tsc --noEmit
pnpm lint
pnpm test     # baseline 09/10/2026: 36 testes em 7 arquivos
pnpm build    # pré-render: ~59 páginas (medido em 05/10/2026)
pnpm audit    # baseline 12/10/2026: 1 high (braces, sem correção publicada no upstream)
```

Portão vermelho = **não commite, não empurre**. Se falhar, relate o erro real; não declare sucesso.

## Atualizar este documento

Toda mudança de runtime (rota, preço, copy aprovada, comportamento no ar) atualiza este arquivo no
**mesmo commit** da mudança. Decisão sem registro aqui não existe para o próximo agente.

## Decisão do dono — 22/10/2026

O MASTER PROMPT desta sessão substitui o hero clínico, a obrigatoriedade de auditoria para implantação e a proibição de WhatsApp após qualificação. Duas portas: implantação direta com tabela existente; auditoria profissional R$ 1.500–2.500 e Setup R$ 8.000–25.000 para operações com tráfego. Microquiz de três escolhas com envio voluntário no WhatsApp. Identidade Obsidian Editorial; sem cortina de carregamento. Garantias e faixas existentes preservadas. Simulador é hipótese explícita, não resultado de cliente. Métricas de projetos sem laudo não serão inventadas.

### Verificação ampliada solicitada em 22/10/2026
O dono solicitou testes completos e uso dos projetos do GitHub como autoridade. Fontes públicas verificadas: tpiola/sentinela-saude-ambiental (rotas em site/src/app), tpiola/saudegpt, tpiola/thiagopiola e tpiola/spes. Nenhum resultado financeiro foi inferido do código. O pré-render usa os mesmos componentes React das 59 páginas (58 indexáveis, /obrigado fora do sitemap). /obrigado deixa de afirmar pagamento sem verificação; mantém o texto de garantia de 30 dias. A hidratação preserva o HTML inicial e as animações não ocultam o conteúdo antes do primeiro paint.

### Portão da versão Obsidian — 22/10/2026
TypeScript, lint, 50 testes unitários e build do monorepo aprovados. Playwright: 20 testes aprovados, incluindo 58 rotas, acessibilidade, preços, privacidade, três viewports e HTML sem JavaScript. Relatório: docs/VERIFICACAO-OBSIDIAN.md. Dependências atualizadas para Vite 6.4.4, Vitest 4.1.12 e Storybook 8.6.19; permanece apenas braces sem patch. O parágrafo de publicação de 12/10 acima é histórico: confirmar o SHA deste release no GitHub e na Vercel, em vez de reutilizar o identificador antigo.

### Publicação e otimização do caminho crítico
Release 2aa52ab publicado em produção no projeto canônico, deployment dpl_ARsRFm653ru6DrnDVcqPiARVdUyL READY. Domínio confirmado com novo Hero, sem boot overlay e com headers de segurança. A segunda passagem remove motion dos preloads da Home e conserva essa biblioteca nas rotas que precisam dela; as profundidades da Home usam CSS nativo. Portão completo e 20 testes de navegador revalidados. O SHA publicado deve ser confirmado no deployment correspondente, e não inferido de um preview.

### Correção final de contraste e rasterização — 22/10/2026
O release e8401e9 foi confirmado READY no projeto original e nas 58 URLs do domínio, com bundle idêntico ao build por SHA-256. A auditoria revelou contraste reduzido na animação e duas texturas SVG globais; removidas nesta revisão. Movimento decorativo móvel fica estático. O teste de acessibilidade agora cobre movimento normal e impede o retorno das texturas. TypeScript, lint, 50 testes unitários e build aprovados. Lighthouse móvel local final: 82/100/100/100, LCP 2,2 s, CLS 0, TBT 580 ms; não representa dado de campo nem nota 10/10. Relatório registra também a medição anterior de produção por proxy e suas limitações.
Todos os 21 cenários de navegador aprovados: 20 na rodada completa e o teste adicional de axe isoladamente após ajuste do limite de tempo, sem relaxar as asserções.

### Nova direção aprovada pelo dono — 22/10/2026
O dono rejeitou a fonte condensada e o visual escuro por não transmitirem confiança. Solicitou inspiração no espaço e no ritmo de meta.ai, formulário na abertura, menu e rodapé estratégicos, coroa dourada, redes sociais e animações de scroll. Esta decisão substitui a identidade Obsidian anterior, preservando preços, rotas, garantias e integrações. Referência visual inspecionada publicamente; aplicação própria, sem afiliação à Meta.

Portão desta direção: pnpm check, lint, 50 testes unitários e build aprovados. Playwright final: 25 testes aprovados em 1,1 min, incluindo 58 rotas, seis larguras (320, 375, 390, 414, 768, 1440), axe nas seis jornadas, movimento normal, preços, privacidade e formulário até a mensagem preparada. Formulário GET com objetivo de até 600 caracteres mantém o contexto no microquiz e no WhatsApp. A coroa também atualiza favicon e ícones do manifest. Nenhum número de desempenho anterior é atribuído a este novo design; não foi rodada nova medição de campo.
