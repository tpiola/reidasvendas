# Correções da jornada comercial — 30/10/2026

Implementação sobre o repositório existente `tpiola/reidasvendas`, base `43799531a1ce090626316dcbee7cb4052bf7fed0`, produção `main`. Projeto Vercel preservado: `prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL`, time `team_X4bKucsxm1xNovRCzLleI3JC`. Nenhum repositório, projeto, domínio, preço ou configuração de cobrança foi criado ou substituído.

## Resultado implementado

- Home com serviço, público e próximo passo explícitos; título e descrições revisados. Fundo branco, coroa original e controles de movimento preservados. Menor dominância da marca no hero.
- Portfólio imediatamente depois do hero. Removidas a faixa redundante de público e a vitrine editorial da home; artigos continuam em `/blog`. As possibilidades da futura plataforma continuam identificadas como demonstração.
- Corrigidas as frases malformadas da home. CTAs, menu e atendimento ao cliente agora descrevem o destino real.
- Planos exibem recursos comuns uma vez, diferenças por plano e exemplos de ajuste dentro dos limites existentes. Implantação, recorrência, desconto anual e total do período preservados.
- Plano → resumo da proposta → WhatsApp. Removidas três perguntas obrigatórias e seu armazenamento temporário. O resumo inclui limites de escopo, preço e prévia da mensagem. A conversa inicial gratuita é diferenciada da contratação e do diagnóstico profissional pago.
- Contexto de plano/ciclo segue ao redirect fixo de WhatsApp e à mensagem. O site não envia uma mensagem, não confirma venda e não ativa assinatura por abrir a conversa.
- Botão flutuante oculto nas telas de formulário/proposta; os CTAs contextuais permanecem. Safe area preservada nas demais telas.
- `/casos` reúne portfólio e critérios de comprovação. Features observadas aparecem em cada referência técnica. Sem métricas, depoimentos ou resultados inventados.
- `/seo-local-franca` reúne o escopo local de SEO. Sem acesso a Search Console/backlinks nesta execução; o destino segue a URL já utilizada nos links principais, com conteúdo útil incorporado antes do redirect.
- Demonstração com título e canonical próprios, `noindex, follow`, fora do sitemap e tema claro. Sem autenticação, armazenamento multiempresa ou assinatura operacional.
- Correção de navegação do Next.js 16: `data-scroll-behavior="smooth"` permite que o framework faça o scroll instantâneo nas trocas de rota, preservando a rolagem suave das âncoras. A jornada verifica título visível e `scrollY === 0` ao abrir a proposta.
- Navegador de intenções usa escolha explícita/intenção de campanha; não presume que uma visita vinda do Google procura SEO. A atribuição analítica continua no mecanismo existente, sujeita a consentimento.

## Mapa de URLs

| Origem | Destino | Resultado esperado |
|---|---|---|
| `/cases` | `/casos` | 308 permanente, parâmetros preservados |
| `/servicos/seo-local-franca` | `/seo-local-franca` | 308 permanente, parâmetros preservados |
| `/servicos/google-e-presenca-local` | `/seo-local-franca` | Um salto, sem passar pela URL consolidada |
| `/solucoes/seo-local-google-business` | `/seo-local-franca` | Um salto, sem passar pela URL consolidada |
| `/diagnostico?plano=...&ciclo=...` | Mesma URL | Resumo direto da proposta selecionada |
| `/checkout?plano=...&ciclo=...` | Mesma URL | Compatibilidade como revisão; pagamento continua condicionado aos controles existentes |
| `/area-do-cliente` | Mesma URL | Rótulo “Atendimento ao cliente”; noindex preservado |
| `/plataforma/demo` | Mesma URL | Canonical próprio, noindex; sem oferta operacional |

As demais URLs úteis foram preservadas. Slugs de casos não publicados continuam em 404. O sitemap contém 44 URLs canônicas depois das duas consolidações.

## Verificação local

| Comando/inspeção | Resultado |
|---|---|
| `pnpm install --frozen-lockfile` | Aprovado; sem mudança de dependências/lockfile |
| `pnpm check` | Aprovado |
| `pnpm lint` | Aprovado |
| `pnpm test` | 59 testes aprovados |
| `pnpm build` | Aprovado; 61 entradas de geração/build, incluindo rotas auxiliares |
| `pnpm e2e` | 39 testes aprovados na execução final completa |
| Verificação HTTP da suíte | 49 páginas, títulos únicos, um H1, canonical e JSON-LD válidos |
| Responsividade | 320, 360, 375, 390, 414, 768, 1024 e 1440 px |
| Acessibilidade automática | Nove superfícies com axe, incluindo demonstração; sem violações A/AA detectadas nos estados testados |
| Jornada anual e mensal | Preços, implantação, desconto, total, seleção e mensagem de proposta conferidos |
| Privacidade | Default denied, categorias independentes, reabertura, sanitização e redirect fixo conferidos |
| Orçamento inicial | Home: JS moderno 149.901 B gzip; CSS 20.279 B. Planos e simulador também dentro dos limites existentes |
| `pnpm audit --prod` | Sem vulnerabilidades conhecidas |
| `pnpm audit` | Oito avisos herdados da ferramenta de desenvolvimento `@lhci/cli`: seis altos, um moderado e um baixo. Lockfile inalterado; não fazem parte das dependências de produção |
| `git diff --check` | Aprovado |

As suítes usam o build de produção local. O servidor é iniciado pelo processo de testes no mesmo namespace. O download padrão do Chromium retornou um arquivo inválido neste ambiente; foi utilizado o Chromium 153 já disponível, pelo suporte `PLAYWRIGHT_CHROMIUM_EXECUTABLE` existente na configuração. O preview gerenciado acrescenta parâmetros exclusivos do Vite ao comando Next e não foi utilizado como prova de QA. A inspeção visual foi feita sobre capturas dos testes reais de navegador, com conferência pública adicional após publicação.

As verificações de pagamento asseguram a falha fechada sem configuração (HTTP 503 sem URL de pagamento). Não houve cobrança, envio de mensagem, criação de lead real ou modificação de conta externa.

## Performance de laboratório

No build final: nove execuções mobile (três por página: home, diagnóstico e planos), com os portões do Lighthouse CI aprovados. Valores completos no JSON vinculado abaixo. Essas medições não representam Core Web Vitals de campo.

## Evidência visual

As capturas anteriores vieram da auditoria pública desta data. As posteriores foram capturadas no build de produção local e inspecionadas. Tamanhos de viewport distintos são identificados; não são uma comparação pixel a pixel.

- [Home anterior, 1348 px](qa/2026-10-30/before-home.jpg)
- [Revisão anterior sem contratação online](qa/2026-10-30/before-checkout.jpg)
- [Home corrigida, 1440 px](qa/2026-10-30/home-desktop.png)
- [Home corrigida, 390 px](qa/2026-10-30/home-mobile.png)
- [Proposta direta com mensagem revisável](qa/2026-10-30/proposal-desktop.png)
- [Medições Lighthouse](qa/2026-10-30/lighthouse-summary.json)

## Limites e pendências de operação

Pronto para receber pedidos de proposta, sujeito à confirmação pública da versão. Assinatura online não foi ativada. Identidade jurídica, condições contratuais, SLA, processador de pagamento, CRM durável, contas de medição e portal autenticado dependem de dados/configurações reais e não foram simulados. Os avisos de oferta proposta e os controles de cobrança permanecem.

Lighthouse é medição de laboratório; não comprova INP/CWV em campo, taxa de conversão, faturamento ou efeito em neurotransmissores. A avaliação automática de acessibilidade não equivale a certificação completa nem a teste em aparelhos e leitores de tela reais.

A publicação e sua identificação final devem ser confirmadas no provedor e no domínio canônico antes de declarar a entrega em produção.
