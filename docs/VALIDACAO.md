# Validação — reconstrução23/10/2026

## Identidade

- Repositório: `https://github.com/tpiola/reidasvendas`, branch anterior `main`, HEAD de origem `33d3bb5f45b10a1eea3f5f5fa65ecef82936edc4`.
- Backup remoto: `backup/pre-rebuild-2026-10-23`, com árvore antiga completa e histórico preservado.
- Projeto Vercel: `reidasvendas`, `prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL`, time `thiagopiola`/`team_X4bKucsxm1xNovRCzLleI3JC`.
- A aplicação nova parte da raiz e usa Next.js16.4.2/React19.3.1/TypeScript5.9.3, sem o monorepo Vite antigo.

## Verificações realizadas

| Verificação                      | Resultado                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| TypeScript strict (`pnpm check`) | Aprovado                                                                                                           |
| ESLint (`pnpm lint`)             | Aprovado                                                                                                           |
| Vitest (`pnpm test`)             | 28 testes em5 arquivos aprovados; origem, validação, CRM, rate-limit, consentimento, JSON-LD e corpo HTTP limitado |
| Build (`pnpm build`)             | Aprovado;37 entradas Next entre páginas, metadados e handlers                                                      |
| Navegador Playwright             | 19 cenários finais aprovados, incluindo2 cenários de serviço em320px                             |
| Rotas públicas                   | 29 rotas com200, título único, canonical e1H1; inexistentes/case não publicado404                                  |
| Mobile                           | 320,375,390,414,768,1440px avaliados sem overflow nos cenários cobertos                                            |
| Acessibilidade automatizada      | axe: zero violações nas6 páginas testadas; teclado e reduced-motion aprovados                                      |
| Privacidade                      | Sem scripts opcionais antes de consentir; finalidades separadas; recusa/reabertura/revogação testadas              |
| WhatsApp                         | Destino fixo5516992333344, sem open redirect; evento do navegador e CAPI compartilham event_id                     |
| Obrigado                         | Visita direta não afirma recebimento, agendamento, pagamento nem dispara Lead                                      |
| Produção/dependências            | `pnpm audit --prod`:0 vulnerabilidades                                                                             |

Testes do navegador usam Chromium153 fornecido pelo pacote npm oficial @sparticuz/chromium; o download padrão do Chrome156 estava truncado neste ambiente. Servidor e testes precisam executar no mesmo namespace de rede. Nenhuma mensagem de WhatsApp foi enviada e nenhum lead real foi criado nos testes.

## Performance em laboratório

LighthouseCI, perfil mobile, três execuções por URL, servidor de produção Next local. Todas as assertions passaram: performance>=90; mediana LCP<=2s; CLS<=0,1; pesos/TTFB abaixo dos warnings. Evidências numéricas: `PERFORMANCE-LAB.json`. Relatórios completos HTML/JSON gerados localmente em `reports/lighthouse` (ignorados no Git por volume).

| Página      | Performance3 execuções | LCP observado | CLS | Transferência total |
| ----------- | ---------------------- | ------------- | --- | ------------------- |
| Home        | 95,97,97               | 1,738–1,807s  | 0   | 237.472B            |
| Diagnóstico | 97,97,98               | 1,597–1,839s  | 0   | 228.449B            |
| Serviços    | 98,98,99               | 1,597–1,613s  | 0   | 237.610B            |

Caminho crítico final: JS inicial moderno146.063B gzip (exclui polyfill noModule que navegadores modernos não carregam); HTML inicial~14,5KB gzip; CSS transferido~11KB; fonte local~27KB; sem terceiros no estado recusado. O fallback para navegadores antigos adiciona polyfills. O LCP é texto; não existe hero raster/vídeo.

Não são medições de campo. LCP/INP/CLS reais, efeito no faturamento, retenção e uptime precisam de observação após publicação. INP não é inferido do Lighthouse.

## Correções motivadas por QA

- Escape seguro de `<` em JSON-LD para evitar fechamento de script por conteúdo editorial.
- Uma única âncora de pulo válida; `+` de menu com suporte tipográfico universal.
- Contato Meta com UUID comum navegador/servidor; nenhuma conversão de lead por visita.
- Leitura de corpo HTTP com limite durante streaming, além do Content-Length.
- Controles de cookies equivalentes e revogáveis; sem PII em dimensões/eventos.
- Formulário sem CRM prepara uma mensagem revisável no WhatsApp e não afirma que recebeu um pedido.
- Portfólio de três projetos verificados; sem confundir projeto técnico com case financeiro ou cliente autorizado.
- Botão flutuante compacto no celular, reduzindo cobertura do conteúdo.

## Auditoria das ferramentas de desenvolvimento

O audit completo encontrou dependências transitivas vulneráveis apenas no ferramental de testes/build (`tmp`, `uuid`, `extract-zip`, `basic-ftp`, `braces`), principalmente na cadeia do LighthouseCI. O relatório é distinto do audit de produção, que retornou zero. Não há extração de arquivos ZIP enviados por visitantes ou uso dessas ferramentas no runtime publicado. Substituição/atualização da cadeia de Lighthouse e patches transitivos são manutenção pendente; não apresentar o ambiente de desenvolvimento como livre de vulnerabilidades. CI executa somente código revisado e sem secrets do projeto em testes de PR.

## Limites de publicação e contas externas

A API permite atualizar build e criar deploy no projeto existente, mas recusou consultar env vars (403). A CLI não está autenticada e a interface Vercel exige login. IDs e secrets não foram inventados. GA4/Pixel/CAPI/GSC/CRM/Redis não podem ser considerados configurados nem validados nas contas.

O domínio `www.reidasvendas.com.br` ainda tem redirect externo307 para o apex. `proxy.ts` faz apex→www308, portanto publicar em produção antes de limpar essa regra criaria loop. Uma tentativa suportada de reatribuir o alias com redirect nulo não alterou a configuração de domínio nem a resposta pública. Por isso a versão nova deve permanecer em preview do MESMO projeto até corrigir o domínio e validar novamente.

Cadastro jurídico, CNPJ, endereço quando houver divulgação física, identidade do controlador, fornecedores/contrato CRM e retenção efetiva precisam de confirmação. Não há selo ou certificação LGPD fictícia. A política de privacidade é uma implementação revisável, não uma certificação jurídica.
