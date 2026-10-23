# Consentimento, formulários e mensuração — Rei das Vendas

Implementação de base funcional para Next.js App Router, React e TypeScript strict. Data de referência: 23/10/2026. Não equivale a afirmar que contas Google/Meta, eventos externos ou conformidade jurídica integral foram validados.

## Arquivos e integração

Arquivos reais desta aplicação: `lib/consent.tsx`, `lib/tracking.ts`, `lib/whatsapp.ts`, `lib/server-events.ts`, `lib/api-lead.ts`, `components/TrackingNavigation.tsx` e `app/go/whatsapp/route.ts`. `server-only` já é uma dependência. Nenhum ID real ou segredo foi ativado nesta alteração.

- `consent.tsx`: default `ConsentBanner`; named `CookieSettingsButton`. Renderize o banner uma vez no layout e o botão de preferências no rodapé. Região não modal: não bloqueia leitura nem captura o foco na abertura automática. A abertura iniciada no rodapé foca seu título e a conclusão retorna ao botão.
- `tracking.ts`: `bootTracking`, `readConsent`, `saveConsent`, `track`, `whatsappHref`, `trackWhatsapp`.
- `server-events.ts`: preferências server, origem, limite durável, CAPI opcional.
- `api-lead.ts`: reexportar `POST` e `runtime` em `app/api/lead/route.ts`.
- `app/go/whatsapp/route.ts`: handler real do redirect; `lib/api-whatsapp.ts` permanece legado e não é o handler publicado.
- `components/TrackingNavigation.tsx`: substitui a montagem do export legado de navegação em `lib/consent.tsx`; nunca montar os dois.

```ts
// app/api/lead/route.ts
export { POST, runtime } from '@/lib/api-lead';
// O handler WhatsApp já está definido diretamente em app/go/whatsapp/route.ts.
```

Consentimento opcional desativado inicialmente. GA e Pixel nem são baixados antes da escolha que os autoriza (Consent Mode básico). A fila local `gtag` recebe default denied antes de qualquer config/event. Esta implementação usa gtag diretamente, sem GTM adicional; não instalar em paralelo uma segunda cópia dessas tags. O aviso deve ser descrito em conjunto com os fornecedores efetivamente ativados.

Os três botões do primeiro nível e rejeitar/aceitar/salvar do segundo nível precisam ter o mesmo destaque visual e altura mínima de 44px. Estilize `.cookie-banner`, `.cookie-actions`, fieldsets e labels com contraste AA, limites mobile, `max-height: min(80dvh, 700px); overflow:auto`, foco visível e espaço para o botão flutuante. Evite posicionar o WhatsApp sobre o aviso. Checkbox deve continuar visível.

A escolha fica em cookie first-party e localStorage com versão/timestamp, por 180 dias. Cookie permite à API observar a mesma escolha; sem ele, CAPI e atribuição permanecem negados. Registro local não é recibo inviolável: o CRM recebe a escolha de contato, categorias, finalidade, data e versão da política em leads confirmados. Para um log central de todas as preferências, integrar CMP/log apropriado com minimização e retenção definida; não registrar IP só para manter histórico de consentimento sem necessidade demonstrada.

Revogação envia `denied`/`fbq revoke`, limpa cookies conhecidos e recarrega para retirar os scripts carregados da sessão. Não apaga retroativamente dados de fornecedores. Esses direitos devem estar descritos na política e ter canal humano disponível.

## Contrato do formulário

```ts
const eventId = crypto.randomUUID(); // guardar a mesma ID até conclusão/retry do envio
const response = await fetch('/api/lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name,
    phone,
    company,
    challenge,
    contactConsent: true,
    website: '',
    eventId,
    page: '/diagnostico',
    attribution: { source: 'google', medium: 'cpc', campaign: 'sites-franca' },
  }),
});
const result = await response.json();
if (response.ok && result.ok) {
  track(
    'lead_created',
    { event_id: result.eventId, page: '/diagnostico' },
    'Lead',
  );
  // Apenas então exibir sucesso e navegar. Não disparar Lead só ao abrir /obrigado.
  location.assign(result.next);
}
```

Campos: name (2–90), phone (DDD/número brasileiro), company (2–120), challenge (5–600), contactConsent boolean obrigatório, website honeypot vazio, eventId 16–80 alfanumérico/hífen/underscore. Honeypot escondido visualmente com `tabIndex=-1`, `autoComplete=off`, `aria-hidden`; não via invisibilidade que altere a11y de campos reais.

API retorna erros inline em `errors`, ou erro geral em `error`. Exibir em elementos associados com `aria-describedby`, resumo de erro com foco, `aria-live=polite`, manter o que foi preenchido. A autorização de contato é específica para responder ao pedido; não é inscrição em campanha de marketing. O consentimento de publicidade é opcional e separado.

CRM via HTTPS server-side com `Authorization: Bearer`, JSON, `Idempotency-Key`. Contrato de confirmação obrigatório: `{ "id": "..." }` ou `{ "lead_id": "..." }`. Adaptar ao CRM real antes de produção. 2xx sem ID não é lead confirmado. CRM sem configuração → 503; falha/timeout → 502; sem sucesso falso. O formulário deve oferecer o WhatsApp como alternativa.

## WhatsApp

Número de destino fixo 5516992333344. Botões podem usar `/go/whatsapp?src=diagnostico&page=/diagnostico&event_id=<UUID>`. `whatsappHref(placement,page)` gera este endereço; guarde-o para o clique, e extraia o mesmo event_id para `trackWhatsapp(id,placement,page)`. Não gerar uma ID no clique diferente da ID do href. Como links client-only podem ter diferenças de hidratação, gerar a URL em `useEffect` ou no handler sem impedir a navegação nativa; alternativa SSR é gerar ID no servidor por resposta.

`src=diagnostico|sites|trafego|social` personaliza a mensagem com textos controlados. Outros valores usam mensagem geral. Query nunca controla o destino: sem open redirect. `page` nunca é incluída na mensagem pública. Rota retorna 302 e no-store/noindex. Sem consentimento, ainda funciona. CAPI Contact ocorre no background com `after()` do Next, se marketing permitido, origem via referer válida, ID válida e rate limit disponível. Portanto não atrasa o redirect.

Contact mede tentativa de abrir WhatsApp; não confirma conversa, resposta ou venda. Não chamar esse clique de lead qualificado. `schedule_booked`/Schedule só devem ser emitidos após confirmação real da ferramenta de agenda. `purchase` não é implementado, pois não há compra real no fluxo.

## Variáveis

Públicas (identificadores reais, nunca placeholders em scripts):

- `NEXT_PUBLIC_SITE_URL=https://www.reidasvendas.com.br`
- `NEXT_PUBLIC_GA4_ID=G-...` [INSERIR_ID_GA4]
- `NEXT_PUBLIC_META_PIXEL_ID=...` [INSERIR_PIXEL_ID]

Secretas:

- `CRM_API_URL`, `CRM_API_KEY` — destino e contrato confirmado.
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` — limite durável.
- `RATE_LIMIT_SALT` — segredo aleatório de pelo menos 32 bytes, isolado por ambiente.
- `META_CAPI_ACCESS_TOKEN`, `META_GRAPH_VERSION` (formato vN.N; selecionar versão suportada na conta, não inventada aqui).
- `META_CAPI_TEST_EVENT_CODE` — somente debug; remover ao publicar.

Rate limit usa IP com HMAC e sal em chave Redis, TTL 10 minutos; não grava IP cru nem conteúdo do lead. Formulário de lead em produção falha fechado se Redis/sal ausentes ou indisponíveis. WhatsApp sempre continua redirecionando; apenas ignora CAPI quando o limitador não está disponível. O fallback em memória existe apenas para desenvolvimento. 5 envios de lead/10min; Contact 30/10min. Ajustar após medir falsos positivos em IP compartilhado. Idempotência é enviada ao CRM, que precisa implementá-la. `x-forwarded-for` depende da confiança no proxy Vercel; rever se trocar de infraestrutura. Rate limit não substitui WAF. Turnstile é melhoria condicional a abuso medido, não é afirmado como instalado.

CAPI envia apenas event_name, horário, event_id, página sem query, IP/UA necessários ao pareamento e _fbp/_fbc existentes, exclusivamente após consentimento marketing. Não envia nome, empresa, telefone ou desafio. Essas informações são dados pessoais: transparência e lista de fornecedores na política continuam necessárias. Falha CAPI não desfaz lead recebido. A mesma combinação `event_name` + `event_id` no Pixel e servidor permite deduplicação. Abrir Events Manager para confirmar; código sozinho não comprova recebimento.

## Taxonomia e regras

Allowlist no client: page_view, view_hero, click_cta_whatsapp, whatsapp_click, click_cta_secundario, scroll_50, scroll_90, quiz_start, quiz_complete, calculator_use, form_start, form_submit, lead_created, contact_whatsapp, schedule_booked, resource_download. Parâmetros permitidos: page, placement, service, score, resource, event_id, source, medium, campaign.

Nunca enviar nomes, telefone, email, empresa, texto livre, termos de busca sensíveis, URL com query ou conteúdo do formulário em eventos, UTMs ou títulos de página. O GA recebe page_location sem query. Não instalar enhanced measurement de formulário/URL que recapture dados sem revisão. Meta PageView usa a URL do navegador: o site não deve colocar PII em parâmetros; auditar as URLs e desativar correspondência avançada automática na conta. Configuração client solicita autoConfig=false.

Rastrear `page_view` nas mudanças de pathname App Router (config GA usa send_page_view:false). O primeiro page_view já é enviado ao aceitar análise. Evitar duplicação com hook inicial do layout. Eventos sem consentimento não ficam enfileirados para envio retroativo.

## QA exigido antes de afirmar produção

1. Janela limpa: zero requisições google-analytics, googletagmanager ou facebook antes de consentimento.
2. Rejeitar: navegação, quiz, WhatsApp funcionam; tags continuam ausentes após refresh.
3. Só analytics: apenas GA carrega; Consent Mode ad_* negado. Só marketing: Pixel carrega; GA permanece ausente.
4. Aceitar ambos: uma carga por script, PageView sem duplicação; GA DebugView e Meta Test Events recebem testes sem PII.
5. Revogar: preferências persistidas, cookies conhecidos expirados, reload, scripts não carregados de novo.
6. Teclado mobile/desktop: botões equivalentes, checkbox legível, foco de retorno, conteúdo e float não encobertos.
7. API origem cruzada → 403, conteúdo inválido → 400/415, campo inválido → 422, spam → 400, limite → 429, Redis/CRM ausente → 503, CRM falho → 502; sem Lead ou sucesso nesses casos.
8. CRM confirma ID e mantém Idempotency-Key; resposta bem-sucedida mostra próximo passo e envia Lead com mesma ID browser/server.
9. WhatsApp correto e encode da mensagem; parâmetros maliciosos não viram redirect externo livre.
10. CAPI com consentimento negado não chama Meta. Events Manager deve mostrar deduplicação browser/server após Lead confirmado.
11. Preview e produção usam IDs/CRM isolados. Sem tokens no bundle, git, console ou logs.
12. CSP autoriza somente domínios realmente habilitados: Google tag/analytics e Meta script/connect; testar Report-Only antes de impor. Evitar preconnect para tags negadas.

## Referências oficiais consultadas

- ANPD, Guia orientativo Cookies e proteção de dados pessoais: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais
- ANPD, recomendações do banner e categorias: https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-emite-recomendacoes-para-adequacao-da-pratica-de-coleta-de-cookies-do-portal-gov.br
- Google, Consent Mode implementação: https://developers.google.com/tag-platform/security/guides/consent?hl=pt-br
- Google, depuração Consent Mode: https://developers.google.com/tag-platform/security/guides/consent-debugging
- Meta, consentimento Pixel: https://developers.facebook.com/documentation/meta-pixel/implementation/gdpr
- Meta, deduplicação Pixel/CAPI: https://developers.facebook.com/documentation/ads-commerce/conversions-api/deduplicate-pixel-and-server-events
- Meta, parâmetros server event: https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/server-event

Pendências reais: IDs, permissões de contas, contrato CRM, Redis, canal de privacidade do controlador, retenção e texto jurídico aprovados, domínio Meta, DebugView, Events Manager e consentimento sob captura de rede. Não declarar integração concluída antes desses testes.

## Testes unitários fornecidos

`tracking.test.ts` usa somente Vitest em ambiente Node com stubs controlados. Cobre ausência de scripts no default denied, separação analytics/marketing, expiração/consentimento malformado ou futuro e descarte de parâmetros livres/query no analytics. Executar dentro do projeto que tenha Vitest instalado; ainda são necessários os testes de rede/E2E descritos acima. O módulo não depende de jsdom.

Em previews Vercel, `validOrigin` também aceita os hosts confiáveis `VERCEL_URL`/`VERCEL_BRANCH_URL` somente quando `VERCEL_ENV=preview`. Manter `NEXT_PUBLIC_SITE_URL` canônico de produção e usar CRM/tags de teste isolados. Domínios extras de preview precisam ser explicitamente autorizados por configuração, sem confiar cegamente em Host.

## Assinatura PME — contrato de eventos e dimensões

Fonte de identidade dos planos: `essencial`, `profissional`, `escala`. Eventos usam `plan_id` e `billing_cycle` (`mensal`/`anual`). `sanitizeBillingCycle` aceita os aliases de checkout `monthly`/`annual` e sempre normaliza os valores de interface. Não há preço ou identidade de cliente no analytics.

CTAs e cartões reutilizam `data-plan-id="profissional"`, `data-billing-cycle="anual"` e `data-event="plan_select"` ou `data-event="checkout_start"`. `Experience` tem um único listener delegado, chama `handleTrackedAction` e preserva a navegação nativa. Não adicionar um segundo `onClick` que dispare o mesmo evento. `TrackingNavigation` mede exposição visível dos planos com IntersectionObserver e atualizações de ciclo; não dispara conversão financeira.

Eventos client disponíveis: os anteriores, mais `plan_view`, `plan_select`, `checkout_start`, `calculator_start`, `calculator_result`, `click_cta_planos`, `click_cta_diagnostico`, `consent_updated`, `faq_open`, `service_view`. `consent_updated` só sai para GA se a escolha atual permitir analytics; rejeição não é enviada a terceiros. Dimensões livres são filtradas; enums de plano/ciclo são validados, emails, sequências de telefone, query strings e texto livre são descartados. Labels de campanha devem ser nomes de campanha, nunca PII disfarçada de slug.

`purchase`, `subscription_created` e `subscription_renewal` constam na taxonomia como **somente servidor** e `track()` os recusa. Botão de plano, início de checkout, retorno do provedor e visita à `/obrigado` não comprovam pagamento. A emissão futura desses eventos exige webhook do provedor com assinatura validada, ID idempotente/deduplicável, valor e moeda confirmados, consentimento aplicável, configuração de produção explícita e testes. Não há webhook financeiro implementado neste módulo. Não habilitar eventos de receita por query, localStorage ou env pública.

Meta padrão é restrito: `lead_created → Lead` após CRM confirmar; `whatsapp_click → Contact` para intenção de abrir conversa; `schedule_booked → Schedule` após agenda confirmar. Uma classificação Meta fora dessa relação é ignorada. IDs de conversão aceitos são UUIDs; duplicatas do mesmo evento/UUID são descartadas no cliente. O mesmo UUID do clique entra na URL do redirect e no `eventID` Pixel, e o servidor usa `event_id` igual para CAPI. Deduplicação real continua pendente de teste no Events Manager.

## WhatsApp por contexto e atribuição

`/go/whatsapp` recebe `src`, `page`, `source`, `medium`, `campaign`, aliases `utm_*`, `plan`/`plano`/`plan_id` e `cycle`/`ciclo`/`billing_cycle`; quiz mantém score de 0 a 3. O número é sempre `5516992333344`. Origem externa, destino arbitrário e texto livre não podem ser refletidos no redirect. Mensagem pública muda apenas com textos controlados por contexto: site que gere leads e vendas, plano/ciclo, planos, diagnóstico, SEO, tráfego, social media e próximo passo sem afirmar pagamento na página obrigado. `source=google|meta|facebook|instagram` pode acrescentar o canal em linguagem humana; campanha, URL, UUID e PII não entram na mensagem.

Atribuição é lida/persistida em sessionStorage somente após consentimento analytics. WhatsApp sem permissão continua funcionando com contexto de navegação e sem armazenamento de campanha. Revogação analytics remove a atribuição da sessão. O redirect retorna 302/no-store/noindex. CAPI só é considerado com marketing autorizado, referrer same-origin e UUID válido. `after()` trata o limite durável e o envio; Redis/sal ausentes, limite excedido ou Meta indisponível fazem a medição ser ignorada, sem bloquear contato. Não são gravados logs de conversas ou de mensagens enviadas. WAF da Vercel deve proteger abuso volumétrico na infraestrutura, com cuidado para não bloquear cliques legítimos de WhatsApp; não afirmamos que regra WAF já foi instalada.

## Google e Meta — pendências de conta

- **GA4:** informar Measurement ID real, definir eventos principais por intenção (não confundir Contact com venda), verificar DebugView, configurar retenção e desativar medição aprimorada de formulários/URLs que capture conteúdo livre. Rotas SPA enviam pathname sem query; não duplicar page_view automático. Identificadores de anúncios não substituem autorização de publicidade.
- **GTM:** opcional. A implementação atual é gtag direto. Se migrar, remover a instalação direta equivalente e usar template de consentimento apropriado; não rodar dois containers/tags para o mesmo evento. Server-side GTM é decisão posterior, sem alegação de instalação atual.
- **Search Console:** verificar domínio por DNS e prefixo `https://www.reidasvendas.com.br`, enviar sitemap e inspecionar páginas/URLs/canonicals. A propriedade e a indexação não são comprovadas por haver meta tag. Nenhuma credencial foi criada aqui.
- **Meta:** informar Pixel, token server e versão API suportada; verificar domínio; testar PageView/Contact/Lead e deduplicação; retirar test_event_code em produção. Correspondência avançada automática e coleta de formulários precisam permanecer desligadas sem avaliação específica. CAPI não contorna consentimento.
- **Dados jurídicos:** controlador/CNPJ, contato de direitos, bases legais, prazo de retenção, fornecedores/transferências e política aprovada permanecem dados reais a fornecer. Cookie local versionado não constitui sozinho prova jurídica completa.

## Verificação da alteração de assinatura

Unit tests cobrem divisão dos consentimentos, tags ausentes no default, enums plano/ciclo, bloqueio de receita client, conversão Meta indevida, dedup UUID, atribuição sem consentimento, WhatsApp com parâmetros hostis e redirect funcionando sem Redis. Teste de rede com navegador e contas externas é portão separado: sem IDs reais ainda não comprova DebugView, Events Manager, CAPI ou GSC.

Proteção adicional de URL: GA recebe `page_referrer` sem query na configuração. Como o Pixel lê URL/referrer por conta própria, o cliente suprime sua carga/eventos quando encontra parâmetros livres não aprovados (ex.: email/telefone/texto), preservando labels UTM controladas, plano/ciclo e IDs técnicos de anúncio sob consentimento. Isso pode reduzir sinal em retornos de checkout com token de sessão; é preferível à transmissão acidental desses dados. Webhook financeiro/CAPI futuro deve usar URL canônica sem tokens. Não remover essa proteção para aumentar número de eventos.

Atribuição Google preserva UTMs validadas sem reenviar a query: `source/medium/campaign` viram campos oficiais `campaign_source/campaign_medium/campaign_name`, além das dimensões de evento permitidas. Referência atual consultada: https://developers.google.com/analytics/devguides/collection/ga4/reference/config. Não enviar `utm_term` livre nem dados de pessoa nesses campos.

## Eventos Meta do funil, além de conversões confirmadas

Com marketing autorizado e contexto de URL/referrer seguro, `plan_view` e `service_view` enviam `ViewContent`; `checkout_start` envia `InitiateCheckout`. Este último deve ser chamado somente depois de `/api/checkout` retornar uma URL hospedada validada — um clique que falhou ou uma tela de proposta não inicia pagamento. Os demais sinais de interface da allowlist, incluindo `plan_select`, `quiz_start`, `quiz_complete`, `calculator_start`, `calculator_result` e profundidade de leitura, usam `trackCustom` com os mesmos parâmetros minimizados e validados. Não usar respostas livres do quiz, valores de empresa, nome, telefone ou email para retargeting.

`Lead`, `Contact` e `Schedule` preservam a classificação restrita e o UUID compartilhado/deduplicável. `page_view` não dispara outro Pixel PageView no dispatcher, evitando duplicação com boot e navegação. `consent_updated` não é enviado à Meta como sinal publicitário. Sem consentimento ou com query/referrer contendo parâmetros livres, nenhum desses eventos sai para Meta. Eventos financeiros continuam bloqueados no cliente.

Referência oficial consultada: https://developers.facebook.com/documentation/meta-pixel/implementation/conversion-tracking. A existência do código não comprova recebimento nem criação de públicos; validar Test Events e permissões na conta antes de usar em campanhas.
