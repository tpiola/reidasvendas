# Estado atual — Rei das Vendas

## Home objetiva — 30/10/2026

Pedido do dono: reduzir conteúdo desnecessário e executar de ponta a ponta. Base confirmada: 03334475350bc4a2b6f688476dc72279b202054c, origin/main sem divergência; mesmos repositório, projeto Vercel e domínio. Implementação Codex /root: home de 11 para cinco seções (oferta, projetos, investimento, dúvidas, contato), menu com três destinos, rodapé compacto e comparação resumida dos planos com custos preservados. Removidas da home as tabs de intenção, catálogo ilustrado, diagramas, ecossistema/protótipo, comparação conceitual e quiz; rotas dedicadas e componentes permanecem no repositório. Páginas detalhadas continuam acessíveis. Sem migração de URLs, dependências, preços ou ativação de pagamento. Duas revisões auxiliares de leitura para layout e pré-scan; um escritor. Detector de layout ausente no pacote; limitação registrada, sem simular execução. Check/lint/build/budget aprovados; 59 testes unitários e 39 E2E; oito larguras, nove verificações axe. Lighthouse da nova home, três medições mobile de laboratório: 97/98/98, CLS 0. Produção sem vulnerabilidades conhecidas no audit; oito avisos herdados na ferramenta de desenvolvimento @lhci/cli. Evidências em docs/QA-HOME-OBJETIVA-2026-10-30.md. Sem lease ativo. Identificação exata de commit/deployment deve ser conferida no histórico/provedor; só declarar publicação após READY e verificação do domínio.

## Correção da jornada comercial — 30/10/2026

Implementação: Codex /root em 2026-10-30. Base verificada: 43799531a1ce090626316dcbee7cb4052bf7fed0, main limpo, origin tpiola/reidasvendas; projeto prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL, time team_X4bKucsxm1xNovRCzLleI3JC. O dono apresentou o prompt de execução da auditoria de 30/10. Escopo: oferta clara no hero, correção de copy, proposta consultiva direta por plano, consolidação de /cases em /casos e SEO local em /seo-local-franca, metadados da demonstração, atendimento ao cliente e verificação das jornadas. Preços, garantia, infraestrutura, identidade e controles de pagamento preservados. Sem acesso a Search Console/backlinks: consolidação segue os destinos já usados na navegação principal e preserva o conteúdo útil. Não declarar cobrança ou plataforma operacional. Validação desta revisão: check/lint/build, 59 testes unitários, 39 E2E, nove medições Lighthouse mobile e orçamento inicial aprovados; nove superfícies axe e oito larguras verificadas. pnpm audit --prod sem vulnerabilidades; oito avisos herdados de desenvolvimento em @lhci/cli, sem mudança de lockfile. Evidências e limites em docs/QA-CORRECOES-2026-10-30.md. Sem lease de edição ativo. Identificação da publicação deve ser conferida no histórico e no provedor.


## Redesign autorizado — 26/10/2026

Implementação: Codex /root em 2026-10-26. O dono solicitou restaurar o logo antigo e melhorar design, animações e copy de conversão do domínio existente. Base verificada: c872fd9, main, tpiola/reidasvendas; Vercel prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL, team_X4bKucsxm1xNovRCzLleI3JC. Símbolo original recuperado do histórico 7a007ab:apps/web/public/logo-mark.svg, sem redesenho. Escopo: home, identidade compartilhada, motion, estilos e ícones associados. Preservar arquitetura Next, dados comerciais, consentimento, rotas e integrações. Publicação confirmada: PR #91 integrado em main, commit 230f096525d7cbedfcf1901a5a0b2b25ab0792d5. Deployment dpl_36Ej88EMGDEvHfJ5RnnZKGWZHF1V READY no projeto/time canônicos, região gru1, domínios preservados. Inspeção visual do domínio oficial confirmou a home; seis leituras públicas HTTP 200 e SHA-256 do logo servido idêntico à fonte. Preview hospedado também teve pausa/retomada e navegação ao briefing conferidas manualmente. Sem lease de edição ativo.

Qualidade desta revisão: check/lint/build, 59 testes unitários e 35 E2E aprovados; 50 rotas públicas, seis larguras, oito jornadas axe, teclado, consentimento, planos e pausa de animação. Lighthouse mobile local, nove execuções: home 97/98/99; diagnóstico 96–98 e planos 98, CLS zero e portões aprovados. Orçamento inicial da home: 149.863 B de JS moderno gzip, CSS 19.830 B. Fonte SVG da coroa original idêntica byte a byte ao histórico 7a007ab. Sem mudança de dependências, preços ou condições. pnpm audit --prod sem vulnerabilidades; auditoria completa registra oito avisos herdados da ferramenta @lhci/cli, sem uso em runtime. Evidência: docs/QA-REDESIGN-2026-10-26.md e docs/qa/2026-10-26/lighthouse-summary.json. CI remoto 40344199349: check/lint/test/build/budget aprovados; instalação do navegador ainda em andamento no registro da publicação. Não atribuir os 35 E2E locais ao CI remoto.


Documento canônico de estado deste repositório. **Todo agente lê este arquivo antes de editar
qualquer coisa.** Ele diz o que está no ar, o que está aprovado, o que não pode ser revertido e
o que está pendente. Sem ler isto, uma alteração é chute — e chute já custou 4 horas de site
errado (ver _Incidentes_).

## Publicação de assinaturas confirmada — 23/10/2026

Esta seção prevalece sobre os estados históricos abaixo. PR #90 integrado: código fonte `821ffbf6862fa2929cc0d04fd816eb62b4a49d96`, árvore validada `3b2539387efd692316fb3ef422e74ad820c524f1`. Deployment `dpl_7du22Fu3oZQmTjSrkvT4QXBTtHsg` READY, produção/main, projeto e time canônicos existentes, região gru1. www confirmado publicamente; apex verificado na Vercel com redirect 308 para www e sem regra inversa.

O workflow GitHub Quality gates 40005811619 passou por completo. Check/lint, 59 testes unitários, build com 60 entradas, 34 E2E (50 páginas), oito páginas axe e seis larguras aprovados. Nove medições mobile de laboratório: 97–99; desktop 100; CLS zero. JS moderno inicial da home 149.742 B gzip. Isso não comprova CWV/INP em campo, faturamento ou conversão.

Auditoria pública posterior: 50/50 páginas com status 200, título único, canonical correto, um H1 e JSON-LD válido; 46 URLs no sitemap. Quatro fluxos noindex fora do sitemap permanecem rastreáveis. Headers de segurança, robots e manifest conferidos. Checkout Profissional/anual mostra R$11.006,88 de recorrência anual, R$13.503,88 com implantação e ausência de cobrança nesta página. Consulta de logs de error/fatal neste deployment nos últimos 15 minutos retornou zero grupos; não é prova de uptime contínuo.

Oferta recorrente continua como proposta, sem cobrança ativa. IDs/contas Google e Meta, CRM/Redis, processador, condições contratuais, identidade jurídica e prova comercial real continuam pendentes. Não declarar contas externas configuradas nem assinaturas/receita criadas. Fonte comercial em data/subscription-plans.ts; planos históricos avulsos e garantias preservados.

Comprovante factual: docs/PUBLICACAO-ASSINATURAS.json. Entrega em 20 seções: docs/ENTREGA-ASSINATURAS.md. O commit documental posterior apenas registra esta publicação; não altera o runtime validado. Integração /root e seis subagentes concluída, todos os leases de edição encerrados.

## Registro da implementação de assinaturas — 23/10/2026

Integração concluída: Codex /root em 2026-10-23, branch feat/assinaturas-pme-2026-10-23. O dono solicitou evolução para assinatura digital (site, SEO local, WhatsApp rastreado, captura de leads, manutenção, relatórios e otimização) e planejamento de R$15 mil MRR sem garantia. A nova oferta é proposta comercial, não altera preços avulsos/garantia anteriores. Pagamentos permanecem fechados até aprovação da oferta/termos e configuração real do provedor. Seis subagentes concluíram escopos isolados e liberaram os leases; /root integra e publica layout, rotas, jornada, SEO, políticas, ambiente e documentação. Repositório, projeto Vercel e domínio permanecem os mesmos. A base anterior desta evolução era ec35312; foi substituída pela publicação registrada acima. Candidato validado localmente: check, lint, 59 testes unitários, build com 60 entradas e 34 E2E aprovados (50 páginas verificadas), Lighthouse mobile 97–99 em nove execuções e desktop 100 em uma execução, todos de laboratório. Home JS moderno 149.742 B gzip e CSS 15.351 B, sem alegação de CWV/INP de campo. Oferta: Essencial R$497/mês + implantação R$1.497; Profissional R$997/mês + R$2.497; Escala R$1.997/mês + R$3.997, em status proposal. Anual proposto: 8% sobre 12 mensalidades, uma cobrança anual; implantação separada. Fonte única em data/subscription-plans.ts; preços históricos avulsos preservados. Checkout permanece indisponível sem aprovação de oferta/termos, conta Stripe e ledger durável. Todos os SVGs da marca, dados editoriais, sitemap e rotas anteriores são preservados ou ampliados. Documentação completa em docs/ENTREGA-ASSINATURAS.md; testes e limites em docs/QA-ASSINATURAS.md. Publicação só pode ser declarada após confirmar o commit/deployment e o domínio.

## Estado anterior publicado — 23/10/2026

Esta seção e a decisão explícita do dono de 23/10/2026 prevalecem sobre o histórico abaixo.

- Aplicação: Next.js App Router 16 / React 19, na raiz; pnpm 11.25.0.
- Canônico: https://www.reidasvendas.com.br. Apex redireciona 308 para www, inclusive na configuração de domínio Vercel.
- Repositório e projeto existentes preservados: tpiola/reidasvendas / prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL.
- Runtime publicado: merge 5aaaa148df46a8b918953f7c8a0f4fac4a4f228d, PR #89.
- Deployment de produção: dpl_BtLc73GHj7HnRSRKhKYZNCiV5Lxi, READY, região gru1, Git main.
- Nova home confirmada publicamente, sem loop de domínio. Páginas críticas, metadados, headers, sitemap, robots, manifest e 404 conferidos após publicação.
- 28 testes unitários, 19 E2E, build/check/lint e workflow GitHub aprovados. Lighthouse mobile de laboratório 95–99 conforme página; nenhuma alegação de INP/CWV de campo.
- Integrações GA4/Meta/CAPI/GSC/CRM/Redis aguardam IDs, credenciais e validação das contas. Tags opcionais desativadas; diagnóstico prepara mensagem revisável no WhatsApp quando o CRM não está configurado.
- Cadastro jurídico, controlador, retenção e provas comerciais dependem de dados reais. Não publicar métricas, reviews ou identidade inventados.
- Backup: backup/pre-rebuild-2026-10-23 no commit 33d3bb5f45b10a1eea3f5f5fa65ecef82936edc4. Reverter runtime antigo exige reavaliar também a orientação dos redirects externos.

Integração e publicação: Codex /root, com seis subagentes de escopo isolado. Não há lease de edição ativo após esta atualização documental.

## Histórico anterior — não usar como configuração vigente

As descrições Vite, domínio apex e funil sem WhatsApp abaixo registram decisões anteriores, substituídas pela solicitação expressa de reconstrução em 23/10/2026. Preservadas para auditoria.

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

### Diretriz de conversão brasileira e auditoria comparativa — 22/10/2026

O dono solicitou benchmark disciplinar de Squarespace, sem cópia visual; coroa comercial com seta, ouro contido, CTA dominante, FAQ, sticky mobile após hero, consentimento por finalidade, tracking limpo e orçamento Lighthouse mobile >=90 como portão. Preservar repo, projeto e 58 rotas; não inventar métricas, endereço, prova, condições de pagamento ou acesso a GA4/GSC.

Portão desta revisão: check, lint, 57 testes unitários e build aprovados. Lighthouse local mobile em três execuções: 99/100/100/100; LCP 1,806–1,966 s, CLS 0. Desktop: 100 nas quatro categorias. Evidências completas em docs/auditoria/2026-10-22 e relatório AUDITORIA-CONVERSAO-BRASILEIRA.md. Consentimento básico bloqueia tags até autorização; briefing sai da URL e usa rascunho essencial de 30 minutos. GA4/GSC e INP de campo não disponíveis.
Playwright final desta revisão: 30 aprovados em 48,5 s, incluindo as 58 rotas. Screenshots desktop/mobile revisados. Relatório comparativo sem extrapolar laboratório para conversão real.
Verificação pública do runtime 612fb1f: deployment dpl_4i7RdApDswatnSuZZfKFqSDktLSx READY no domínio; 58 rotas200, cinco assets iniciais idênticos por SHA-256, fonte/AVIF/canonical/headers conferidos. Lighthouse público mobile92/100/100/100 (LCP1,768s, CLS0), desktop93/100/100/100. JSONs arquivados. Esta atualização documental não altera o runtime.

## Decisão explícita do dono — 23/10/2026

O dono solicitou apagar o código do projeto e reconstruir do zero com Next.js App Router, agência completa de marketing digital e WhatsApp direto como principal canal. Autorizou reconstrução no mesmo repositório GitHub e no mesmo projeto Vercel, novo logo, domínio canônico www, mensuração consentida e auditoria com subagentes. Esta decisão substitui restrições de preservação da arquitetura Vite, design, rotas legadas e funil anteriores. Histórico Git e branch backup/pre-rebuild-2026-10-23 preservam integralmente a versão anterior, sem force-push. Preços comerciais e garantia permanecem conforme contrato histórico, sem inventar condições.
Integração: Codex /root em 2026-10-23; subagentes com propriedade isolada de arquivos; implementação concluída e publicada; configuração de domínio corrigida conforme seção vigente.

### Implementação e portão da reconstrução23/10/2026

Aplicação Next16/React19 na raiz, oito serviços locais, oito artigos/guias, páginas institucionais, consentimento por finalidade, adapters Google/Meta/CRM e WhatsApp fixo. Identidade clara com coroa vetorial própria, Sora local e corpo de sistema. Prova de trabalho de três projetos verificados, sem resultado comercial inventado. Faixas de preço e garantia preservadas. Check/lint28 testes e build aprovados. Lighthouse mobile9 execuções: home95–97, diagnóstico97–98, serviços98–99, CLS0; dados de laboratório. O bloqueio inicial www→apex307 foi resolvido por sessão autenticada no mesmo projeto. Publicação confirmada no merge5aaaa14; detalhes e limites em docs/VALIDACAO.md.
