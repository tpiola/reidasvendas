# Assinatura digital para PME — proposta de oferta e operação

Versão de trabalho de 23/10/2026. **Proposta de oferta a validar; não há cobrança ativa nem garantia de atingir R$ 15 mil de receita recorrente mensal.** Fonte reutilizável: `data/subscription-plans.ts`. A esteira avulsa histórica de `data/commercial-contract.ts`, seus preços e garantias permanecem inalterados. A assinatura é um escopo separado, não desconto ou substituição automática de contrato anterior.

## Oferta específica

Presença digital organizada para a pequena empresa apresentar sua oferta, receber contatos e manter o site atualizado sem renegociar cada alteração simples. O setup estrutura e implanta; a recorrência mantém uma rotina limitada e verificável de conteúdo, revisão e ajustes. O cliente contrata uma operação definida, não volume garantido de vendas.

| Proposta     | Mensalidade | Setup separado | Páginas iniciais | Artigos/mês | Ajustes/mês |
| ------------ | ----------: | -------------: | ---------------: | ----------: | ----------: |
| Essencial    |   R$ 497,00 |    R$ 1.497,00 |            Até 5 |           0 |           2 |
| Profissional |   R$ 997,00 |    R$ 2.497,00 |           Até 10 |           1 |           4 |
| Escala       | R$ 1.997,00 |    R$ 3.997,00 |           Até 15 |           2 |           8 |

Cada ajuste equivale a uma unidade de até 20 minutos em texto, imagem ou configuração existente. Nova funcionalidade, nova página, integração complexa, reestruturação visual e migração exigem escopo separado. Solicitações maiores podem consumir várias unidades somente após aceite do cliente. Páginas legais operacionais não consomem a contagem comercial. Expansão do número de páginas depende de proposta; não apresentar a franquia como páginas novas todo mês.

Todos incluem site responsivo, caminho de contato, revisão técnica compatível e relatório mensal de entregas e indicadores disponíveis. Suporte em dias úteis; Profissional e Escala recebem prioridade sobre a fila regular. Não há atendimento imediato nem SLA numérico aprovado. Horário, canais, prazo de implantação, rodadas de revisão, acumulação/reposição de unidades, tamanho e aprovação dos artigos precisam constar do contrato validado.

SEO Essencial: títulos, descrições, sitemap, estrutura elegível para indexação e integridade técnica. Profissional: base mais um artigo e revisão mensal de uma página prioritária. Escala: base mais dois artigos e até duas páginas prioritárias. Revisões dentro do conteúdo existente; não promessa de SEO ilimitado, ranking ou citação por IA. Uma escolha editorial por serviço e intenção vale mais que dezenas de páginas de cidades duplicadas.

Ficam fora, salvo inclusão expressa: mídia e gestão de anúncios, social media, captação de foto/vídeo, domínio, ferramentas externas, licenças, CRM personalizado, e-commerce, aplicativo e área autenticada. Hospedagem, orçamento de infraestrutura e excedentes precisam ser resolvidos antes de vender; não prometer hospedagem ilimitada. Publicação depende de conteúdo correto e direitos de uso fornecidos ou aprovados pelo cliente.

## Comparação anual — desconto proposto de 8%

Premissa: `total anual = arredondar(12 × mensalidade × 0,92, 2)`. O setup fica fora do desconto. O equivalente mensal é apenas comparativo, não afirmação de parcelamento. Forma e momento de pagamento, renovação, prazo contratual e cancelamento ainda serão definidos e aprovados.

| Plano        | 12 mensalidades sem desconto | Total anual proposto | Equivalente mensal | Economia anual | Setup + anual no primeiro ciclo |
| ------------ | ---------------------------: | -------------------: | -----------------: | -------------: | ------------------------------: |
| Essencial    |                  R$ 5.964,00 |          R$ 5.486,88 |          R$ 457,24 |      R$ 477,12 |                     R$ 6.983,88 |
| Profissional |                 R$ 11.964,00 |         R$ 11.006,88 |          R$ 917,24 |      R$ 957,12 |                    R$ 13.503,88 |
| Escala       |                 R$ 23.964,00 |         R$ 22.046,88 |        R$ 1.837,24 |    R$ 1.917,12 |                    R$ 26.043,88 |

O contrato deve esclarecer titularidade, portabilidade, backups, licenças, exclusões, direitos de cancelamento aplicáveis e o que continua disponível ao encerrar a assinatura. Não importar automaticamente a garantia avulsa histórica para esta oferta. O selo “recomendado” pode significar adequação ao perfil, nunca “mais vendido” sem dados.

## CRO e jornada de aquisição

Promessa do bloco de planos: **Seu site em operação. Escopo claro todo mês.** Complemento: Compare páginas, conteúdo e ajustes incluídos; escolha a base compatível com sua rotina. Preço visível com setup separado e status de proposta. A ação inicial deve ser **Conversar sobre o plano**, sem checkout ativo ou urgência inventada.

Visitante com intenção de criar site → serviço relacionado → comparador de planos → FAQ sobre escopo/propriedade → seleção de plano → conversa contextual ou diagnóstico → proposta e contrato → cobrança confirmada no provedor → onboarding. Conteúdo e ferramentas ajudam quem ainda não sabe o que contratar. O CTA não deve exigir formulário longo antes de mostrar preço e limites.

No comparador, mostrar: total anual e premissa; conteúdo incluído; o que não entra; unidade do ajuste; custo do setup; forma de contato. Controle mensal/anual acessível por teclado, sem preço anual que pareça mensalidade cobrada em doze parcelas. Não criar economia falsa por ancoragem contra preço nunca praticado.

Eventos implementados para a jornada: `plan_view`, `plan_select`, `click_cta_planos`, `click_cta_diagnostico`, `form_start`, `form_submit`, `lead_created`, `whatsapp_click` e `checkout_start`. A taxonomia completa e as condições de emissão estão em `lib/tracking.ts` e `docs/PRIVACIDADE-MENSURACAO.md`. Plano sempre `essencial`, `profissional` ou `escala`; ciclo de interface/analytics `mensal` ou `anual`, convertido para `monthly` ou `annual` no contrato do checkout. Eventos financeiros `purchase`, `subscription_created` e `subscription_renewal` são reservados ao servidor e não estão ativados como conversão de publicidade sem confirmação e vínculo válido de consentimento. Sem nome, telefone, empresa, texto livre ou email no analytics. A seleção é intenção; assinatura ativa depende de confirmação server-side do provedor, nunca da URL de obrigado. Mensuração opcional respeita consentimento; pagamento não depende de consentir publicidade.

Taxas por etapa: visualização → seleção; seleção → contato; contato → qualificação; qualificação → proposta; proposta → contrato; contrato → ativação paga. Toda taxa precisa de período, denominador e volume. Não atribuir venda ao último clique sem verificar origem. Teste inicial: clareza do escopo e setup no cartão; critério é redução de dúvidas e aumento de contatos adequados, sem concluir causalidade com amostra pequena.

## Meta de R$ 15 mil de MRR: cenários aritméticos

MRR é receita recorrente normalizada por mês. Setup é receita não recorrente e fica fora. Caixa recebido antecipadamente no anual não deve virar MRR do mês inteiro. Os cenários abaixo são simulações solicitadas, sem previsão de demanda ou prazo para aquisição.

| Cenário                   | Clientes | MRR sem desconto anual | Diferença para R$ 15 mil | Se todos estivessem no anual com 8% |
| ------------------------- | -------: | ---------------------: | -----------------------: | ----------------------------------: |
| 19 × R$ 797               |       19 |           R$ 15.143,00 |               +R$ 143,00 |                        R$ 13.931,56 |
| 10 × R$ 497 + 8 × R$ 997  |       18 |           R$ 12.946,00 |             −R$ 2.054,00 |                        R$ 11.910,32 |
| 5 × R$ 1.997 + 8 × R$ 997 |       13 |           R$ 17.961,00 |             +R$ 2.961,00 |                        R$ 16.524,12 |

R$ 797 é ticket médio hipotético para comparação; não é um quarto plano aprovado. O segundo cenário não atinge a meta. O primeiro cruza R$ 15 mil somente sem o desconto aplicado a todos. O terceiro cruza no cálculo bruto, mas exige mais produção e retenção. Estar acima da meta de MRR não equivale a lucro de R$ 15 mil.

Setup pontual dos dois mixes reais: R$ 34.946,00 para dez Essenciais e oito Profissionais; R$ 39.961,00 para cinco Escalas e oito Profissionais. Não reconhecer esses montantes como caixa certo; contratação, cobrança, inadimplência, execução e regras contábeis ainda precisam ser consideradas.

## Economia unitária: medir antes de escalar

- CAC de uma coorte = custos de aquisição e vendas atribuíveis à coorte / novos clientes pagantes dessa coorte. Incluir tempo comercial, comissão, mídia e ferramentas pertinentes. Mês sem aquisição não deve gerar CAC zero enganoso.
- Churn de clientes mensal = clientes encerrados no mês / clientes ativos no início. Separar inadimplência, cancelamento voluntário, downgrade e renovação anual. Poucos contratos tornam a taxa instável.
- Margem de contribuição recorrente = receita líquida contratual menos custos variáveis de entrega, ferramentas, taxas e tributos aplicáveis. Não confundir com lucro, pois despesas fixas e pró-labore ainda precisam ser cobertos.
- Payback de CAC = CAC / contribuição recorrente mensal por cliente; premissa de contribuição estável. Se o setup tiver contribuição própria positiva, mostrar à parte, sem escondê-lo no resultado recorrente.
- LTV simplificado de contribuição ≈ contribuição mensal por cliente / churn mensal. Só usar com coortes maduras, churn estável e definição consistente; contratos anuais, expansão e cancelamento não uniforme exigem análise por coorte. Churn observado zero em poucos meses não significa LTV infinito.

Exercício de viabilidade, **não orçamento ou carga observada**: custo de execução R$ 70/h; horas mensais máximas planejadas de 2,2 / 4,4 / 7,2 por cliente; ferramentas variáveis R$ 50 / 80 / 120; taxas de cobrança 3% e tributos 6%, ambos hipotéticos. Confirmar regime tributário e custos reais antes de usar em proposta. As horas incluem suporte, revisão, relatório e a franquia de ajustes; artigos exigem pauta e revisão viáveis dentro dessa estimativa.

| Plano        | Receita mensal | Entrega + ferramentas + 9% hipotéticos | Contribuição estimada | Margem aproximada |
| ------------ | -------------: | -------------------------------------: | --------------------: | ----------------: |
| Essencial    |      R$ 497,00 |                              R$ 248,73 |             R$ 248,27 |             50,0% |
| Profissional |      R$ 997,00 |                              R$ 477,73 |             R$ 519,27 |             52,1% |
| Escala       |    R$ 1.997,00 |                              R$ 803,73 |           R$ 1.193,27 |             59,8% |

O anual reduz receita com praticamente o mesmo trabalho. Sob as mesmas premissas, contribuição mensal comparativa cai aproximadamente para R$ 212,09 / R$ 446,69 / R$ 1.047,89. Antes de conceder 8%, testar caixa, capacidade, eventual custo financeiro, renovação e margem. Nenhum percentual aqui é benchmark de mercado ou performance atual da Rei das Vendas.

Exemplo puramente matemático: com CAC R$ 600, contribuição R$ 300/mês e churn estável hipotético de 5%/mês, payback seria 2 meses e LTV simplificado de contribuição R$ 6.000. Isso não valida CAC, churn ou vida útil reais. Começar pelo registro de coortes, motivo de cancelamento, horas e contribuição realizada.

## Capacidade e proteção do escopo

No mix de dez Essenciais e oito Profissionais, estimativa de 57,2 horas mensais de entrega, oito artigos e até 52 unidades de ajuste (17h20 apenas na franquia). No mix de cinco Escalas e oito Profissionais, 71,2 horas de entrega, dezoito artigos e 72 unidades (24 horas na franquia). Esses volumes não incluem toda a implantação inicial, aquisição comercial, administração ou contingências fora do modelo.

Hipótese operacional: reservar 80 horas/mês para entrega recorrente e manter o restante da disponibilidade real para implantação, vendas e administração; confirmar agenda e equipe. Reservar folga dentro da capacidade, não vender 80 horas como se todas fossem previsíveis. Se a fila consumir capacidade ou os artigos ultrapassarem o custo projetado, reduzir entradas, rever a oferta e ajustar apenas contratos futuros conforme condições aceitas.

Setup precisa cobrir diagnóstico de escopo, conteúdo, construção, publicação e onboarding. Estimar horas de cada contratação antes de aceitar; não usar quantidade de páginas como único custo. Limitar novas implantações à capacidade verificada. Uma meta comercial não autoriza assumir prazo inexequível.

## Onboarding e retenção em 30/60/90 dias

Antes da ativação: proposta aprovada; identidade do cliente e responsável; contrato e titularidade; consentimentos/finalidades; cobrança confirmada pelo provedor; checklist de acesso mínimo; orçamento de infraestrutura; conteúdo e direitos; escopo/cronograma. A assinatura não começa só porque alguém clicou em um botão.

Até dia 30 após início contratual: coletar oferta e informações reais; publicar conforme cronograma aceito; testar contato e consentimento; registrar ponto de partida e lacunas; ensinar como pedir ajuste; confirmar responsável por atender. Não prometer conclusão até dia 30 se dependências não estiverem cumpridas.

Até dia 60: revisar entregas e uso da franquia; identificar conteúdo que ajuda decisão; conferir qualidade dos contatos quando houver dados; remover obstáculos observados; ajustar processo de solicitação. Perguntar se o escopo está adequado antes de sugerir upgrade.

Até dia 90: apresentar histórico de entregas e indicadores disponíveis; avaliar contribuição e horas; registrar satisfação com exemplos; combinar continuidade e plano do próximo ciclo. Solicitar depoimento ou indicação somente de forma voluntária, com autorização e sem inventar resultado. Não divulgar cliente só porque assinou.

Scripts operacionais:

- Acolhimento: “Vamos organizar o início. Quem aprova o conteúdo e quem atende os contatos? Envio o checklist de acessos e o escopo para conferirmos antes da implantação.”
- Cliente sem enviar material: “Falta [ITEM] para avançar em [ETAPA]. Você prefere enviar esse material ou combinar outra abordagem? Vou registrar o impacto no cronograma para mantermos a expectativa clara.”
- Solicitação fora da franquia: “Esta alteração inclui [NOVA FUNÇÃO] e não cabe na unidade simples de ajuste. Posso detalhar um escopo separado antes de executar.”
- Revisão 30/60 dias: “Entregamos [ITENS VERIFICADOS]. Em [PONTO] ainda faltam dados. O que mudou na rotina e qual dificuldade merece prioridade agora?”
- Sinal de cancelamento: “Qual é o motivo principal: escopo, custo, uso, atendimento ou outro? Vamos registrar com clareza. Posso explicar as opções previstas no contrato, sem dificultar o encerramento.”
- Encerramento: “Confirmamos sua solicitação conforme as condições contratadas. Vamos informar datas, acessos, exportações e o que deixa de ser mantido. Dados e comunicações seguirão a política aplicável.”

Retenção deve vir de utilidade e clareza. Não criar obstáculos de cancelamento, esconder cobrança, usar renovação surpresa ou prometer resultado para impedir saída. Adicionar alertas internos de atraso e revisão de cartão somente após prover infraestrutura aprovada e contato compatível com contrato e privacidade.

## Plano de execução em 90 dias

Dias 1–30: validar oferta, custo e contrato; preparar comparador e diagnóstico; entrevistas com empresários reais de Franca; registrar objeções; publicar primeiras peças; prospectar de forma individual e relevante, sem disparos indiscriminados. Meta de processo definida pela agenda real, não promessa de clientes.

Dias 31–60: executar primeiros onboardings aceitos; medir horas e qualidade; revisar taxa de proposta e motivos de perda; comparar margem prevista com realizada; corrigir escopo antes de acelerar aquisição. Se cobrança ou onboarding falham, pausar aquisição paga até corrigir.

Dias 61–90: revisar coortes, cancelamentos, capacidade e contribuição; ajustar oferta futura com base em evidências; somente ampliar mídia quando medição, oferta, atendimento e margem sustentarem o risco. Monitorar MRR contratado, MRR efetivamente ativo e recebimentos separadamente.

## Pendências para aprovar a oferta

Responsável jurídico/controlador e CNPJ; regime tributário; preços e limites aprovados por escrito; contrato recorrente; forma de pagamento anual e renovação; cancelamento e devoluções aplicáveis; domínio/hospedagem/licenças; prazos e disponibilidade; capacidade de produção; processador e taxas; CRM; rotina financeira; acessos às ferramentas; eventuais portfólio e depoimentos autorizados. Configuração de IDs e secrets não equivale a conta integrada e validada.

## Referências primárias

Consultadas em 23/10/2026. São referências de definição e implementação, não validação de demanda, preços ou taxas desta oferta.

- Stripe, métricas SaaS: https://stripe.com/resources/more/essential-saas-metrics . Referência para distinguir aquisição, retenção e economia da assinatura; as fórmulas e premissas deste documento foram explicitadas para o modelo de serviço.
- Stripe, MRR: https://stripe.com/resources/more/what-is-monthly-recurring-revenue . Referência para receita recorrente normalizada.
- Google Search Central, recursos de IA: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide . Base de SEO útil, sem garantia de aparição em busca generativa.
- Google Search Central, artigos: https://developers.google.com/search/docs/appearance/structured-data/article . Schema deve acompanhar artigo real e dados editoriais verdadeiros.
