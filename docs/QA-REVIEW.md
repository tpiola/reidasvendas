# Auditoria independente da reconstrução — 23/10/2026

Escopo: revisão de código, segurança do contato, integridade de medição e jornada de compra da Rei das Vendas. Não houve envio de lead ou mensagem real, criação de campanha ou alteração de conta de anúncios nesta auditoria.

## Testes preparados

- `tests/seo-security.test.ts`: identidade canônica, robots de obrigado, vínculo de entidade/breadcrumb, escaping de JSON-LD, redirect de domínio e preservação de query, TLS do proxy, headers e migrações legadas.
- `tests/lead-api.test.ts`: origem, tipo/tamanho do corpo, rate limit indisponível/excedido, validação e honeypot, CRM ausente, confirmação insuficiente e confirmação efetiva, minimização de atribuição, redirect WhatsApp fixo e recusa de conversão com referência externa.
- `tests/server-privacy.test.ts`: validação de consentimento no servidor, origem exata, falha fechada em produção, chave de rate limit pseudonimizada e bloqueio de CAPI sem consentimento.
- `tests/e2e/journeys.spec.ts`: rotas e metadados, sitemap/robots/manifest, 6 larguras, baseline axe em 6 páginas, escolhas independentes de cookies, revogação, calculadora, quiz, validação de formulário, obrigado honesto, teclado e reduced-motion.

A suíte de API usa mocks: nenhum teste unitário envia dados a CRM ou Meta. A suíte de navegador usa o servidor de teste e não envia mensagem no WhatsApp.

## Evidência e resultado final

Comando: `pnpm exec vitest run tests/seo-security.test.ts tests/lead-api.test.ts`.

Resultado inicial: 14 aprovados e 1 falha em 15 testes. A falha revelou escaping ineficaz de JSON-LD: a string JavaScript `\u003c` estava sendo interpretada como `<`, permitindo fechar o elemento script com conteúdo malicioso. Achado comunicado ao integrador para correção no runtime; o teste permanece como prevenção de regressão. Correção aplicada pelo integrador e reexecução: **20/20 aprovados**, 3 arquivos, em 356 ms (inclui a ampliação de segurança do servidor). Após os ajustes finais de runtime (corpo de request limitado, atribuição consentida, Footer Server Component, menu e WhatsApp móvel), executei `pnpm test`: **28/28 testes aprovados**, 5 arquivos, 422 ms. Execução final de navegador em build de produção local: **19/19 aprovados em 13,8 segundos**. A suíte cobre 29 rotas públicas (13 páginas base, 8 serviços, 8 artigos/guias), 6 larguras, axe em 6 páginas, consentimento, quiz/calculadora/formulário e teclado, além de bounds e alvo de CTA nas páginas de criação de sites e social media a 320 px. A canonical raiz é comparada como URL normalizada, porque Next.js serializa o endereço raiz sem a barra terminal. Após a escolha de cookies, o teste de primeiro Tab recarrega a página para reiniciar a ordem de foco do navegador, preservando a preferência.

Na rodada final, o servidor foi iniciado automaticamente pelo `webServer` da configuração Playwright na porta 3000, no mesmo comando da suíte: os comandos do ambiente possuem redes locais isoladas. Uma tentativa anterior contra um processo iniciado em outro comando falhou por conexão recusada antes de testar o site; isso não foi interpretado como falha funcional.

Comando final da suíte (sem `BASE_URL`, para usar o `webServer` da configuração): `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/workspace/scratch/bbe758822ff0/browser-tools/chromium pnpm e2e`.

Screenshots internos gerados nos próprios testes: `test-results/home-desktop.png`, `home-mobile.png`, `home-desktop-viewport.png` e `home-mobile-viewport.png`. Desktop 1440 px e mobile 390 px inspecionados visualmente. Não são entregáveis públicos.

## Revisão como comprador de um negócio local

| Critério                        | Leitura crítica                                                                                                                                           | Decisão                                                                                                            |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| O que posso contratar?          | Site, tráfego, social media, SEO local e operação comercial são nomeados e têm escopo próprio.                                                            | Adequado, sujeito à revisão visual.                                                                                |
| Quanto custa?                   | A página de serviços preserva os preços já publicados e separa implantação de auditoria/gestão.                                                           | Adequado se visível em um clique a partir da home.                                                                 |
| Qual é o próximo passo?         | WhatsApp e diagnóstico curto reduzem o esforço para iniciar.                                                                                              | Adequado; clique não deve ser reportado como mensagem ou venda.                                                    |
| Por que confiar nesta agência?  | Método e limites são claros. Há portfólio de três projetos próprios verificáveis; ainda não há casos comerciais com métricas autorizadas na nova coleção. | Prova de execução presente por portfólio. Resultados comerciais continuam pendentes de documentação e autorização. |
| O que será meu?                 | Propriedade, acesso, terceiros e responsabilidades dependem da proposta.                                                                                  | Exigir contrato e entrega de acessos; não prometer cessão que não está documentada.                                |
| Minha privacidade é respeitada? | Rejeição e categorias independentes estão implementadas; dados opcionais ficam bloqueados antes do opt-in.                                                | Testar com IDs reais e revisar cadastro do controlador/retencão no CRM.                                            |
| O diagnóstico é gratuito?       | A conversa inicial é distinta da auditoria remunerada, com faixas explícitas.                                                                             | Manter a distinção em todos CTAs para evitar surpresa de preço.                                                    |
| Vou vender mais?                | Calculadora e documentação deixam claros os limites da hipótese.                                                                                          | Adequado; medição real deve chegar do CRM, não de uma simulação.                                                   |

## Achados de integração comunicados

1. Escaping de JSON-LD corrigido e coberto por teste de tentativa de fechamento do script.
2. `event_id` único agora é gerado no clique e compartilhado com o redirect para deduplicação de Contact no navegador/servidor. A validação com Pixel/CAPI reais permanece pendente.
3. Segundo skip link do Header removido; o alvo válido é `#main-content`. Teclado e axe aprovados.
4. Mensagem do quiz agora aceita somente score de 0 a 3, com texto fixo. Não aceita mensagem arbitrária da query.
5. Não ativar redirect apex→www enquanto o domínio Vercel mantiver www→apex; isso criaria loop.

## Limites que impedem certificação completa

- WCAG AA automatizado é baseline, não certificação de todos leitores de tela e aparelhos.
- Core Web Vitals em campo exige dados de usuários por período; Lighthouse de laboratório não é conversão nem INP de campo.
- GA4, Search Console, Meta Pixel/CAPI, domínio e CRM só podem ser declarados configurados após acesso e teste com IDs reais.
- CNPJ/identidade jurídica, endereço quando aplicável, responsável pelo tratamento, retenção efetiva e fornecedores do CRM precisam de confirmação.
- CSP completa está em Report-Only. A política mínima bloqueia framing/objetos/base, mas não equivale a CSP de scripts com nonce/hashes.
- Feed editorial sem resultados e casos sem métricas não devem ser apresentados como prova social dinâmica. Portfólio próprio comprova execução, sem comprovar retorno comercial.

## Inspeção visual final

A home apresenta agência completa e próximo passo na primeira tela, com escopo em páginas próprias e preços acessíveis em serviços. Desktop 1440 e mobile 390 legíveis; nenhuma rolagem horizontal indevida nas larguras testadas. O botão flutuante de WhatsApp foi compactado para círculo no mobile, reduzindo sobreposição. O glifo fullwidth ausente foi substituído por sinal + comum. A nova captura mobile 390 px confirma ambos os ajustes. As páginas de criação de sites e social media a 320 px têm CTAs dentro dos limites e altura mínima de 44 px.
