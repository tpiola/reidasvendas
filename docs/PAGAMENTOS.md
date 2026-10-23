# Assinaturas: adaptador de pagamento e limites de ativação

## Estado da entrega

O código prepara Checkout hospedado Stripe, recorrência e recepção segura de eventos. **Nenhuma conta, produto, Price, webhook, cobrança, mensagem ou assinatura real foi criada por esta implementação.** Sem aprovações, identificação empresarial, chaves e armazenamento durável, `/api/checkout` responde indisponibilidade real. O catálogo continua uma proposta comercial até aprovação do dono. O backend exige `subscriptionOfferStatus=approved` no código **e** flags de oferta/termos aprovados no ambiente; flags isoladas não ativam uma página ainda apresentada como proposta.

Os preços e condições não são decisão do integrador. O modelo `data/subscription-plans.ts` propõe mensalidades de R$497/R$997/R$1.997, setups de R$1.497/R$2.497/R$3.997 e desconto anual de 8% apenas nas 12 mensalidades. O contrato histórico de serviços avulsos não foi alterado. Renovação, cancelamento, arrependimento, entrega, inadimplência, propriedade e retenção precisam de aprovação jurídica/comercial antes de habilitar cobranças.

## Fluxo implementado

1. A página servidor chama `isCheckoutConfigured(planId, cycle)`. O resultado é apenas booleano; IDs Stripe e secrets não vão ao navegador.
2. O visitante escolhe plano/ciclo, aceita as condições publicadas e inicia uma tentativa com UUID v4. O navegador envia somente esse contrato permitido.
3. A API verifica origem exata, corpo de até3KB, formato, honeypot, consentimento contratual e rate limit durável.
4. O servidor verifica flags de aprovação, identificação, ambiente, Stripe, Price IDs e Redis. Nunca aceita preço, quantidade, sucesso/cancelamento ou destino enviados pelo cliente.
5. Uma reserva Redis vincula o UUID da tentativa ao plano/ciclo/preços/versão contratual. A operação recebe outro UUID, gerado no servidor e usado na idempotência Stripe.
6. O servidor consulta os dois Prices Stripe e compara moeda BRL, valor em centavos, modalidade, ciclo, atividade e modo test/live com o modelo aprovado.
7. A sessão Stripe usa `mode=subscription`, item recorrente e setup de cobrança única. A resposta precisa ser real, aberta, no ambiente correto e com URL HTTPS de `checkout.stripe.com`.
8. O retorno a `/obrigado?checkout=retorno` **não confirma pagamento**. Não há `session_id` público como prova, nem checkoutId usado como autorização.
9. O webhook verifica assinatura no corpo bruto e busca os recursos atuais na Stripe. Somente depois persiste o estado mínimo durável, com deduplicação atômica.

### Contrato da API

```json
{
  "planId": "essencial",
  "cycle": "monthly",
  "requestId": "3a2b1c00-1234-4abc-8123-123456789abc",
  "termsAccepted": true,
  "website": ""
}
```

- `planId`: `essencial`, `profissional` ou `escala`.
- `cycle`: `monthly` ou `annual`.
- `requestId`: UUIDv4 novo por intenção de contratação; manter o mesmo nas repetições técnicas daquela tentativa.
- `termsAccepted`: autorização contratual obrigatória, separada de marketing/analytics.
- `website`: honeypot, vazio.
- Campos extras, inclusive preço/URL/e-mail/customer ID, são recusados.

Sucesso: `{ "url": "https://checkout.stripe.com/…", "checkoutId": "UUID opaco" }`. O `checkoutId` identifica a operação, não atesta liquidação nem permite ler a conta. `403`: origem; `413`: tamanho; `415`: conteúdo; `422`: entrada; `429`: limite; `409`: tentativa concorrente, conflitante ou expirada; `502/503`: fornecedor/configuração/armazenamento sem confirmação. Não exibir erro bruto do fornecedor.

## Variáveis necessárias

| Nome                                | Uso e regra                                                                                          |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `SUBSCRIPTIONS_OFFER_APPROVED`      | somente `true` após aprovação explícita da oferta real                                               |
| `SUBSCRIPTIONS_TERMS_APPROVED`      | somente `true` após condições contratuais específicas publicadas e aprovadas                         |
| `SUBSCRIPTIONS_TERMS_VERSION`       | versão imutável das condições aceitas; registrada na metadata Stripe                                 |
| `BUSINESS_LEGAL_NAME`               | identificação verdadeira do fornecedor                                                               |
| `BUSINESS_CNPJ`                     | formato numérico ou alfanumérico de14 posições, duas finais numéricas; pontuação aceita              |
| `PRIVACY_CONTACT_EMAIL`             | contato de privacidade verdadeiro e monitorado                                                       |
| `STRIPE_SECRET_KEY`                 | secret/restricted key server-only; permissões de ler Prices/recursos e criar Checkout                |
| `STRIPE_WEBHOOK_SECRET`             | signing secret do endpoint específico; CLI e Dashboard usam secrets distintos                        |
| `STRIPE_API_VERSION`                | versão estável exata configurada na conta e destino snapshot; nenhuma versão foi inventada no código |
| `STRIPE_MODE`                       | `test` ou `live`; precisa corresponder à chave e aos objetos Stripe                                  |
| `STRIPE_PRICE_ESSENCIAL_MONTHLY`    | Price recorrente mensal Essencial                                                                    |
| `STRIPE_PRICE_ESSENCIAL_ANNUAL`     | Price recorrente anual Essencial, total anual em uma cobrança                                        |
| `STRIPE_PRICE_ESSENCIAL_SETUP`      | Price único de setup Essencial                                                                       |
| `STRIPE_PRICE_PROFISSIONAL_MONTHLY` | Price recorrente mensal Profissional                                                                 |
| `STRIPE_PRICE_PROFISSIONAL_ANNUAL`  | Price recorrente anual Profissional                                                                  |
| `STRIPE_PRICE_PROFISSIONAL_SETUP`   | Price único de setup Profissional                                                                    |
| `STRIPE_PRICE_ESCALA_MONTHLY`       | Price recorrente mensal Escala                                                                       |
| `STRIPE_PRICE_ESCALA_ANNUAL`        | Price recorrente anual Escala                                                                        |
| `STRIPE_PRICE_ESCALA_SETUP`         | Price único de setup Escala                                                                          |
| `UPSTASH_REDIS_REST_URL`            | HTTPS do armazenamento operacional durável                                                           |
| `UPSTASH_REDIS_REST_TOKEN`          | credencial server-only                                                                               |
| `RATE_LIMIT_SALT`                   | segredo aleatório de pelo menos16 caracteres, para chaves pseudonimizadas                            |
| `NEXT_PUBLIC_SITE_URL`              | origem HTTPS canônica definida pelo servidor                                                         |

O gate de CNPJ confere **formato**, não existência, titularidade, situação cadastral ou dígito verificador. Aceita o formato alfanumérico introduzido pela Receita em2026. A verificação empresarial continua humana/administrativa.

Em `VERCEL_ENV=production`, somente `STRIPE_MODE=live`; em `preview`, somente `test`. Em execução local sem `VERCEL_ENV`, test é permitido mesmo com `NODE_ENV=production`, para ensaiar o build sem cobrança real. Não usar chaves live em preview. Nunca colocar chave Stripe/Redis em variável `NEXT_PUBLIC_*`, código, issue, log ou conversa pública.

## Catálogo e cobrança inicial

Criar os Prices manualmente na conta Stripe correta, depois da aprovação, e guardar os IDs no ambiente. Os Prices são autoritativos para o processador, mas o adaptador **bloqueia Checkout se divergirem do modelo mostrado ao comprador**. Para mudar preços, aprovar e versionar oferta/termos, atualizar apresentação e Prices juntos; preservar os preços históricos de assinantes existentes.

| Plano proposto | Mensal em centavos | Anual em centavos | Setup em centavos |
| -------------- | -----------------: | ----------------: | ----------------: |
| Essencial      |              49700 |            548688 |            149700 |
| Profissional   |              99700 |           1100688 |            249700 |
| Escala         |             199700 |           2204688 |            399700 |

Cálculo anual: `round(mensal_em_centavos ×12 ×0,92)`. Setup permanece integral. O anual significa Price com intervalo de um ano e cobrança do total anual; o equivalente mensal da página é comparação, não parcelamento. O mensal usa intervalo de um mês. Ambos têm setup único incluído apenas na primeira fatura da assinatura. Não há trial, coupon/promotion code nem desconto automático adicional. Automatic Tax está desabilitado no adaptador; tratamento tributário e emissão fiscal brasileira precisam de definição antes de vender. Não vender Checkout como emissor de NFS-e.

O primeiro método oferecido é cartão no Checkout hospedado. Pix recorrente, boleto, parcelamento, split, marketplace ou Connect não estão implementados e não podem ser prometidos.

## Idempotência e falhas

- Reserva de Checkout: `SET NX`, validade de24h, fingerprint de oferta/termos e UUID servidor. Sem dados pessoais.
- Stripe POST: mesma `Idempotency-Key` e mesmos parâmetros nas repetições. Expiração estável de uma hora; criação tardia sem sessão confirmada exige nova intenção após30min.
- Sessão já confirmada no Redis é consultada na Stripe e reutilizada enquanto estiver aberta. Não criar nova assinatura silenciosamente quando houve retorno completo, expiração ou conflito.
- Se Stripe criou sessão e a gravação Redis falhou, a API retorna erro; repetir com o mesmo requestId recupera a resposta Stripe sem duplicar a criação.
- Um UUID diferente é uma nova intenção. A API não tem identidade autenticada de cliente e não promete detectar toda contratação repetida por e-mail. Configurar no painel Stripe o bloqueio/encaminhamento de clientes que já tenham assinatura, após decidir o comportamento comercial.
- Falha na Stripe/Redis não deve produzir estado local “pago”, lead fictício ou mensagem enviada.

## Webhook

Endpoint: `POST /api/payments/webhook`, corpo de até256KB. Não usa Origin de navegador; a fronteira de confiança é assinatura HMAC-SHA256 do `timestamp.corpo_bruto`, comparada em tempo constante, mais tolerância de±300s. Aceita múltiplas assinaturas `v1` para rotação; rejeita timestamp duplicado/malformado, corpo alterado e segredo ausente. Nenhum segredo ou payload é registrado em log.

Configurar destino **snapshot**, versão igual a `STRIPE_API_VERSION`, eventos selecionados e ambiente correto. Este adaptador não aceita thin events ou Connect. A documentação Stripe atual recomenda thin events para novas integrações; esta implementação pequena adota snapshot versionado com refetch canônico, exigindo configuração explícita e teste de compatibilidade. Não trocar o formato do destino sem atualizar o adaptador.

### Eventos tratados

| Evento                                                         | Tratamento                                                                   |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `checkout.session.completed`                                   | registra retorno; nunca provisiona pelo redirect                             |
| `checkout.session.async_payment_succeeded/failed`              | consulta estado canônico; a confirmação financeira depende da fatura         |
| `checkout.session.expired`                                     | abandono/expiração, sem criar “lead pago”                                    |
| `customer.subscription.created/updated/deleted/paused/resumed` | consulta assinatura atual; active, past_due, canceled, unpaid, paused etc.   |
| `invoice.paid`                                                 | consulta fatura e assinatura; compara BRL e valor esperado inicial/renovação |
| `invoice.payment_failed`                                       | classifica falha/inadimplência; não envia cobranças ou mensagens             |
| `invoice.payment_action_required`                              | classifica autenticação necessária                                           |
| `invoice.finalization_failed`                                  | classifica falha de finalização                                              |

Apenas assinaturas com metadata própria `rdv_app=reidasvendas`, plano permitido e ciclo conhecido são atribuídas a este sistema. A metadata é definida no servidor. Buscar recursos atuais evita decidir a partir de snapshot antigo. A ordem de `event.created` não determina a versão do recurso: eventos distintos podem ter o mesmo segundo. Um lease por assinatura envolve refetch e commit; a gravação atômica verifica que o lease ainda pertence ao processo. Se outro evento detiver o recurso, a entrega retorna503 para retry. Uma descoberta preliminar resolve somente a chave de lock; os fatos são buscados novamente sob o lease. O valor `eventCreated` é metadado de auditoria, nunca critério de ordenação.

O contrato congelado inclui valores em centavos, Price IDs e versão dos termos na metadata definida pelo servidor. Renovações são comparadas com esses valores e com os Prices Stripe correspondentes, mesmo quando o catálogo público mudou ou o Price foi arquivado para novas vendas. Alterar condições do assinante exige migração contratual explícita; não substituir silenciosamente metadata. Fatura paga com valor diferente do esperado recebe `amount_review_required`; não dispara compra nem entrega automática. Fatura quitada sem cobrança recebe `settled_without_charge`. O status `active` da assinatura não é prova de liquidação de todas as faturas. Alterações, créditos, impostos ou prorrata exigem tratamento aprovado; não inferir que todos são novas compras.

### Eixos independentes de estado

- `subscription`: somente situação da assinatura, cancelamento, plano e ciclo. Nunca contém `paymentStatus` e nunca deduz pagamento de `active`.
- `subscription-billing`: somente situação e valor da **última fatura referenciada por `subscription.latest_invoice` na Stripe**. Não escolhe a fatura pela ordem de entrega do webhook.
- `invoice`: fato financeiro próprio de cada fatura. Uma fatura antiga paga não substitui automaticamente a última fatura da assinatura.
- `checkout`: retorno/expiração com `paid_pending_invoice` quando aplicável; não confirma prestação de serviço.

Um consumidor futuro precisa reconciliar os eixos e regras contratuais. Não usar um status escalar como autorização automática. Um evento de atualização de assinatura não apaga o resultado financeiro; atualiza o eixo da assinatura e, se houver referência canônica de última fatura, refaz a leitura financeira dessa fatura. Sem essa referência, o eixo financeiro anterior é preservado.

### Ledger durável

Antes de processar: uma operação Lua verifica ledger e reserva lease de120s. Evento concluído duplicado recebe200 sem repetir efeitos. Evento concorrente em andamento recebe503 com Retry-After, permitindo nova tentativa do provedor. Ledger e estados são gravados atomicamente; falha de commit responde503 e libera lease quando possível. Não reconhecer sucesso antes de durabilidade.

As chaves usam HMAC do identificador e hash tag Redis compartilhada para as operações multi-chave. Estados guardam apenas plano/ciclo, status, classificação, valores, moeda e timestamps. Não guardar e-mail, nome, telefone, endereço, customer ID, cartão, URL de Checkout ou payload Stripe bruto. Identificadores pseudonimizados ainda exigem controle de acesso e política de dados.

TTL implementado: operação24h, leases de evento e recurso120s, ledger/estados400dias. Esses prazos precisam de aprovação e alinhamento à política; não são obrigação legal ou livro contábil. A Stripe permanece fonte financeira autoritativa. Não rotacionar o salt sem migração planejada, pois isso muda as chaves de idempotência/estado. Não usar política Redis de eviction que elimine ledger silenciosamente; monitorar memória, disponibilidade e backups.

Smart Retries, e-mails de cobrança, cancelamento, reembolso e disputa dependem de configuração/autorização separadas na Stripe. O código apenas classifica estados. Não há liberação automática de serviço, cancelamento automático fora da Stripe, mensagem real de WhatsApp, CRM, nota fiscal ou confirmação de compra em analytics.

## Área de cobrança e autenticação

`/api/billing-portal` **não foi criado**: o site não dispõe de sessão de cliente verificada nem vínculo usuário→Stripe Customer. Receber um customer ID/e-mail do navegador e criar portal seria exposição de conta.

Alternativa antes de uma área autenticada: habilitar e validar o link de login do Customer Portal hospedado Stripe, que oferece autenticação do cliente por e-mail. Publicar somente o link real fornecido pela Stripe e configurar políticas de cancelamento/alteração compatíveis com o contrato aprovado.

Uma API própria futura exige autenticação robusta, sessão HttpOnly, proteção CSRF, identificação do Customer no servidor e autorização de titularidade, além de retorno allowlist. Não usar `checkoutId`, UTM, session_id de query ou e-mail informado como autenticação.

## Analytics e consentimento

Não há `purchase` GA4/CAPI ativo. O webhook Stripe não carrega a preferência de cookies do visitante. Não presumir opt-in pela contratação ou pelo pagamento.

Para mensuração futura, implementar vínculo opaco consentido entre Checkout e consentimento versionado, retenção/expiração/revogação, verificação financeira, deduplicação por invoice/evento e estado do consentimento no momento do envio. GA4 também precisará de identificador consentido, Measurement Protocol e teste; CAPI precisa de minimização e regras próprias. Eventual `purchase` não deve incluir nome, telefone, e-mail ou descrição livre.

## Testes realizados e testes pendentes

A suíte `tests/payments.test.ts` verifica assinatura, rotação, corpo alterado, replay, relógio futuro, versão/mode, origem, corpo, honeypot, contrato, flags, limitação, preços divergentes, anual/setup, redirect fornecedor, idempotência de sessão, duplicata/concorrrência e falha de commit. Também verifica consulta canônica, renovação, revisão de valor, inadimplência, cancelamento e ausência de PII/telemetria de compra. Regressões cobrem invoice.paid→subscription.updated e a ordem inversa no mesmo segundo, contrato congelado após reajuste do catálogo, lease concorrente e bloqueio por status proposal mesmo com flags positivas.

Mocks não substituem teste da Stripe e Redis reais. Antes de ativar:

- [ ] Aprovar preços, margem, entrega, contrato, impostos, identidade e contato do controlador.
- [ ] Criar conta/Products/Prices na Stripe e fixar versão/API/permissões mínimas.
- [ ] Usar Redis durável com EVAL, política de memória, acesso mínimo e recuperação testados.
- [ ] Conferir destino snapshot, secret e versão, recebimento/dedup e alerta de falhas.
- [ ] Em sandbox: compra inicial mensal e anual com setup, repetição do mesmo requestId, retry depois de timeout e falha Redis.
- [ ] Em sandbox: cartão recusado, autenticação3DS, abandono, expiração, concorrência, renovação via Test Clocks, cancelamento imediato/agendado, fatura sem cobrança, prorrata e valor divergente.
- [ ] Testar evento antigo entregue fora de ordem e recurso canônico atualizado.
- [ ] Validar Portal hospedado, titularidade, atualização de pagamento e cancelamento conforme contrato.
- [ ] Conferir que `/obrigado` nunca confirma por URL e que cliente não acessa estado de outro comprador.
- [ ] Confirmar política de privacidade e retenção; verificar nenhum dado de pagamento/PII em analytics/logs.
- [ ] Só depois habilitar flags de aprovação e secrets live no ambiente de produção correto.

## Fontes oficiais consultadas

Consulta em23/10/2026; esta documentação não ativa contas ou integrações.

- Checkout Session: https://docs.stripe.com/api/checkout/sessions/create
- Price e valores/ciclo: https://docs.stripe.com/api/prices/retrieve
- Idempotência: https://docs.stripe.com/api/idempotent_requests
- Assinatura e retries de evento: https://docs.stripe.com/events/manage-webhook-endpoints
- Formatos e configuração de eventos: https://docs.stripe.com/events/set-up-events
- Implementação oficial de HMAC/tolerância: https://github.com/stripe/stripe-node/blob/master/src/Webhooks.ts
- Ciclo de assinaturas: https://docs.stripe.com/billing/subscriptions/webhooks
- Portal e assinatura existente: https://docs.stripe.com/payments/checkout/limit-subscriptions
- CNPJ alfanumérico: https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico
