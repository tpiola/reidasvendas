# Estado atual — Rei das Vendas

Documento canônico de estado deste repositório. **Todo agente lê este arquivo antes de editar
qualquer coisa.** Ele diz o que está no ar, o que está aprovado, o que não pode ser revertido e
o que está pendente. Sem ler isto, uma alteração é chute — e chute já custou 4 horas de site
errado (ver *Incidentes*).

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

| Recurso | Valor |
|---|---|
| Repositório | `tpiola/reidasvendas` (público) |
| Branch de produção | `main` — protegida contra force-push e exclusão (`enforce_admins: true`) |
| Projeto Vercel | `reidasvendas` · `prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL` · time `thiagopiola` |
| Domínio canônico | `reidasvendas.com.br` (`www` deve redirecionar para ele) |
| Diretório da aplicação | `apps/web` — Vite + React + Tailwind, SPA com pré-render |
| Monorepo | `pnpm` + `turbo` — **nunca npm ou yarn** (há um `package-lock.json` órfão na raiz: não use, não propague) |

## O que está no ar — verifique antes de confiar

Última verificação: **09/10/2026** · commit `ff65401` · bundle `index-SPAa1Izf.js` (idêntico ao
`apps/web/dist/index.html` local, ou seja: o publicado é o build deste commit) · TTFB 109 ms ·
`/`, `/diagnostico`, `/planos` e `/obrigado` em 200 · `/obrigado` com `noindex, follow` ·
`www` responde 307 para o domínio canônico.
Não acredite neste parágrafo sem conferir:

```bash
git fetch origin && git rev-parse --short origin/main
curl -sI https://reidasvendas.com.br | head -3
curl -s https://reidasvendas.com.br | grep -oE 'index-[A-Za-z0-9_-]+\.js' | head -1
```

O bundle publicado tem de casar com o build local do commit publicado. Divergência = deploy
pendente ou falho, não "provavelmente foi".

Para conferir o `noindex` de `/obrigado`, use parser multi-linha (`python3 -c` com regex): a tag vem
quebrada em três linhas e o `grep` devolve falso negativo.

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

| Data | SHA | Decisão |
|---|---|---|
| 04–05/10/2026 | `43bd5f9` | Home vira engenharia de conversão; triagem remunerada no lugar do CTA de WhatsApp |
| 05/10/2026 | `76d173c` | Alinha o discurso do diagnóstico; remove o vão do hero antigo |
| 05/10/2026 | `afcedc9` | Link da esteira aponta para a tabela de execução real |
| 05/10/2026 | `c98c2d4` | Merge de reconciliação: arquitetura de conversão + jornada comercial do outro agente |
| 05/10/2026 | `5ad57c8` | Cobre a jornada comercial com testes; realinha o e2e ao hero publicado |
| 05/10/2026 | `1dab5a5` | Esteira no topo de `/planos`; `/obrigado` deixa de responder 404 |
| 05/10/2026 | `ff65401` | Remove o "por mês" duplicado no cartão da Otimização Contínua |

## Incidentes registrados

**05/10/2026 — reversão silenciosa de trabalho aprovado.** O commit `7a007ab` ("restaura hero com
logo e comunicação de soluções para negócios locais") removeu **412 linhas** da arquitetura de
conversão, sem decisão registrada, e o site rodou ~4 horas na versão antiga. Causa raiz: não havia
fonte de verdade nem portão de qualidade — só um `AGENTS.md` sobre acionar skills. Remédio: este
documento, `docs/GOVERNANCA-AGENTES.md` e o lease de escrita. **Reverter trabalho aprovado exige
decisão explícita do dono registrada aqui antes da edição.**

## Pendências abertas

| Pendência | Estado |
|---|---|
| `/obrigado` autocontraditório | "Mensagem enviada" vs "Pagamento Confirmado"; entrega 7 dias (página) vs 12 dias úteis (FAQ) — **aguarda a verdade do dono** |
| Black Friday 30% | Desconto ainda incide sobre tiers legados; converter para desconto na Triagem exige percentual definido pelo dono |
| Higiene da raiz | `24_hour_action_plan.md`, `AUDITORIA_COMPLETA.md`, `DIAGNOSTICO.md`, `REBUILD_PLAN.md`, `design-qa.md`, `package-lock.json` — o próprio `docs/GOVERNANCE.md` proíbe docs temporários na raiz |
| Portão no GitHub | `main` bloqueia force-push e exclusão, mas **não exige PR nem check** — qualquer escrita entra direto. Decisão do dono |

Resolvido em 09/10/2026: `www.reidasvendas.com.br` deixou de ser NXDOMAIN — responde 307 para
`reidasvendas.com.br`, que é o comportamento que o `docs/GOVERNANCE.md` exige.

## Portão obrigatório antes de commitar

```bash
git fetch origin && git merge --ff-only origin/main   # ou rebase, nunca force-push
pnpm check    # tsc --noEmit
pnpm lint
pnpm test     # baseline 09/10/2026: 36 testes em 7 arquivos
pnpm build    # pré-render: ~59 páginas (medido em 05/10/2026)
```

Portão vermelho = **não commite, não empurre**. Se falhar, relate o erro real; não declare sucesso.

## Atualizar este documento

Toda mudança de runtime (rota, preço, copy aprovada, comportamento no ar) atualiza este arquivo no
**mesmo commit** da mudança. Decisão sem registro aqui não existe para o próximo agente.
