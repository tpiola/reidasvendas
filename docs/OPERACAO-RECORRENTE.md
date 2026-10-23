# Aquisição, CRM e retenção — operação proposta

Plano de execução, não resultado observado. Aplicável à nova oferta recorrente da Rei das Vendas. [VERIFICAR] responsável, agenda, custos, contratos e ferramentas antes de executar contatos. O código foi implementado; a oferta segue como proposta a validar, sem cobrança ativa. Nenhuma mensagem, campanha ou cobrança foi enviada por esta implementação.

## Matemática do funil

A meta é MRR ativo, não soma de contratos assinados nem caixa de setup. No plano Profissional proposto de R$ 997, 16 clientes ativos com cobrança mensal representam R$ 15.952/mês; 15 representam R$ 14.955. Se todos pagarem anual com 8% de desconto, o MRR normalizado por cliente será R$ 917,24: 17 clientes representam R$ 15.593,08. O dinheiro recebido uma vez por ano não é todo receita recorrente de um mês.

Exercício **[PREMISSA]**, não taxa de mercado: para 16 novos clientes sem considerar churn, se 25% das propostas forem aceitas, seriam necessárias 64 propostas; se 50% das conversas qualificadas virarem proposta, 128 conversas qualificadas. Com 50% de qualificação dos contatos, seriam 256 contatos. A sequência 256 contatos → 128 conversas qualificadas → 64 propostas → 16 novos clientes é apenas a aplicação dessas premissas. Visitas necessárias = contatos / taxa observada de visita para contato. Sem taxa real, não há orçamento de mídia defensável. Nenhum prazo é inferido desse exercício.

MRR ao final do mês = MRR inicial + novas ativações + expansão − redução − MRR cancelado. Planejar reposição de cancelamentos: com churn hipotético de 5% sobre 16 clientes, a expectativa matemática seria 0,8 cliente/mês, não uma promessa de que só um cancelará. Medir churn de clientes e de receita separadamente. CAC-alvo, churn tolerável e capacidade são [VERIFICAR], nunca benchmark inventado.

## Caminhos e eventos

| Etapa        | Ativo                                                | Ação                                  | Evidência de avanço                                        |
| ------------ | ---------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------- |
| Descoberta   | Busca local, guia, social, anúncio autorizado        | Ler uma resposta útil                 | visita qualificada; origem consentida                      |
| Consideração | Módulo, método, trabalhos públicos, quiz e simulador | Comparar cenário e limites            | quiz_complete, calculator_result, plan_view                |
| Decisão      | /planos, FAQ, diagnóstico por plano                  | Escolher plano e conversar            | plan_select, contact_whatsapp; qualificação humana         |
| Contratação  | Proposta, contrato, checkout hospedado               | Aprovar e pagar                       | status financeiro verificado no provedor e ledger          |
| Implantação  | /onboarding, ambiente seguro de materiais            | Entregar informações e aprovar        | responsável, materiais, cronograma e aceite                |
| Continuidade | manutenção, conteúdo, relatório                      | Revisar prioridade mensal             | entregas verificáveis, horas, uso e qualidade dos contatos |
| Expansão     | revisão trimestral                                   | Ampliar escopo se existir necessidade | proposta de upgrade aceita, MRR adicional confirmado       |
| Indicação    | cliente satisfeito, permissão                        | Apresentar a outro empresário         | indicação voluntária, sem recompensa oculta                |

`purchase`, `subscription_created` e `subscription_renewal` são eventos reservados ao servidor. O callback não envia publicidade hoje: falta vinculação segura a consentimento opcional e à identidade autorizada. O clique ou a visita a /obrigado não substitui confirmação de pagamento.

## Contrato mínimo do CRM

```json
{
  "lead_id": "ID_REAL_DO_CRM",
  "plan_id": "profissional",
  "billing_cycle": "monthly",
  "origin": {"source": "google", "medium": "cpc", "campaign": "site_franca"},
  "page": "/planos",
  "stage": "qualified",
  "owner_id": "RESPONSAVEL_REAL",
  "next_action_at": "DATA_REAL_COM_FUSO",
  "contact_permission": {"purpose": "responder ao pedido", "policy_version": "2026-10-23"}
}
```

Esse é um contrato de integração a adaptar, não registro de lead criado. Dados de contato só seguem ao CRM na solicitação expressa do visitante e fora de ferramentas de analytics. Origem é persistida apenas conforme consentimento; dispositivo deve ser uma categoria ampla se necessário, sem fingerprint. Nome/telefone/mensagem não entram em URLs do próprio site nem dimensões de campanha. A mensagem ao WhatsApp fica no canal que o visitante escolheu abrir.

O formulário geral usa `CRM_API_URL/KEY` com idempotência e exige resposta `id` ou `lead_id`. O diagnóstico da assinatura guarda respostas não sensíveis no navegador por até 30 minutos para orientar a jornada. Integração financeira → CRM exige o contrato e autenticação da ferramenta: ainda não está ativada. O ledger financeiro registra apenas fatos mínimos e não provisiona automaticamente um serviço. A integração financeira com o CRM, o portal de cobrança autenticado e as mensagens de recuperação são etapas futuras, ainda não operacionais nesta entrega.

## Lead scoring proposto

**[PREMISSA]** pontuação de priorização, sem decidir crédito ou excluir clientes: interesse explícito em um plano +3; revisão de contratação +3; diagnóstico concluído +2; pedido de contato confirmado +4; retorno voluntário identificado de forma permitida +1; empresa sem escopo aderente encaminha para avaliação humana. Não pontuar por dado sensível, presumir renda nem rastrear quem recusou cookies. WhatsApp aberto ainda precisa de qualificação. Calibrar os pesos pelo que virou proposta e contratação real.

## Recuperação com permissão

| Situação              | Regra de ação                                                                                                                 | Exemplo de texto para revisão humana                                                                                                    |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| WhatsApp sem resposta | [VERIFICAR] equipe e SLA; não afirmar atendimento 24 h                                                                        | “Olá, [NOME]. Vi seu pedido sobre [CONTEXTO]. Qual parte precisa funcionar primeiro: presença, contato ou manutenção?”                  |
| Formulário abandonado | Sem envio, não existe autorização para recuperar telefone; usar apenas UX/estatística consentida                              | Melhorar erro e fricção; não enviar mensagem a um contato capturado às escondidas.                                                      |
| Checkout abandonado   | Só se há contato e finalidade válidos, conforme contrato/provedor                                                             | “Sua contratação não foi confirmada. Ficou alguma dúvida sobre escopo, implantação ou recorrência? Não envie dados de cartão por aqui.” |
| Lead frio             | Retomar contexto de pedido anterior, uma vez e respeitar oposição                                                             | “Ainda faz sentido avaliar [PROBLEMA]? Se a prioridade mudou, posso encerrar este acompanhamento.”                                      |
| Falha de pagamento    | Fluxo futuro de dunning do provedor, a configurar e validar, com identidade verificada e sem divulgar dívida em canal público | “Há uma pendência na cobrança do seu contrato. Use o ambiente autenticado para conferir. A equipe pode esclarecer o status.”            |
| Risco de cancelamento | Ouvir e cumprir condições; não dificultar cancelamento                                                                        | “O escopo está sendo útil? Podemos revisar o que foi entregue e explicar as opções de continuidade ou encerramento.”                    |
| Indicação             | Convite voluntário após entrega conferida                                                                                     | “Se conhece alguém com essa necessidade, pode compartilhar nosso contato. Só usaremos seu nome como referência com sua autorização.”    |

Cadência é **[VERIFICAR]**, não automação ativa. Sugestão de teste com permissão: contato inicial, uma retomada contextual e encerramento se não houver resposta. Não criar assédio por calendário. Recuperação exige consentimento/finalidade, frequência adequada e uma saída simples.

## E-mails de serviço — rascunhos, não enviados

**Assunto:** Seu plano: escopo antes da implantação

Olá, [NOME]. Você demonstrou interesse no [PLANO]. Antes de começar, vamos confirmar páginas, conteúdo, ajustes, implantação, recorrência e condições de encerramento. Responda com a principal prioridade do negócio; não envie senhas ou dados de cartão. A conversa não ativa uma cobrança.

**Assunto:** Materiais para a primeira entrega

Olá, [NOME]. Após a confirmação do contrato e do pagamento, o responsável pelo projeto organiza o checklist e o cronograma. Precisamos de [MATERIAIS_APROVADOS] e de uma pessoa para aprovar o conteúdo. Acessos serão concedidos por convite no ambiente combinado. O prazo depende das condições aceitas e do recebimento dos materiais.

**Assunto:** O que foi entregue neste mês

Olá, [NOME]. Neste período concluímos [ENTREGAS_VERIFICADAS]. O indicador [DADO] vem de [FONTE/PERIODO]; em [LACUNA] ainda não há medição suficiente. A próxima prioridade proposta é [ACAO], dentro do escopo. Confira também sua capacidade de ajustes e conte se o atendimento recebeu contatos com o perfil esperado.

## Painel operacional interno mínimo

Registrar semanalmente: contatos por origem permitida; qualificados; propostas; contratos; pagamentos confirmados; MRR ativo normalizado; setup separado; horas por plano; fila de ajustes; entrega mensal; margem de contribuição; inadimplência; cancelamentos e motivo; expansão. Separar caixa, receita e lucro com apoio contábil. Revisão mensal de coortes, trimestral de escopo e capacidade. Não vender nova implantação sem agenda real.
