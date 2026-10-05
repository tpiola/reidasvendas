# Integrações (Web + n8n)

## 1) Leads (site → n8n)

### Fluxo
- O frontend envia o formulário para `POST /api/lead`.
- A API valida nome, WhatsApp, e-mail opcional, contexto comercial e atribuição.
- Com `LEAD_WEBHOOK_URL` ou `N8N_WEBHOOK_URL`, a API encaminha o lead ao webhook e responde com `delivery: "webhook"` apenas após a entrega confirmada.
- Sem webhook configurado, a API responde com `delivery: "whatsapp_handoff"`; a interface informa que o diagnóstico ainda precisa ser enviado e libera uma mensagem contextualizada no WhatsApp.
- O encaminhamento por WhatsApp não simula armazenamento automático: o registro chega à equipe quando o visitante confirma o envio da mensagem.

### Variáveis
- `LEAD_WEBHOOK_URL` (server-side): URL do webhook do n8n (produção)
- `N8N_WEBHOOK_URL` (server-side, opcional): alternativa para instalações existentes
- `LEAD_WEBHOOK_SECRET` (server-side, opcional): enviado como `Authorization: Bearer <segredo>`

### Contrato do receptor
O receptor deve salvar o contato em CRM ou armazenamento privado antes de devolver 2xx. Use o `X-Idempotency-Key` para não duplicar contatos entre instâncias e tentativas; valide o segredo antes de gravar. A memória da Function não é um banco durável nem um rate limiter global. Configure retenção e exclusão no receptor. Não use Blob público para dados de contato.

Se o webhook devolver erro ou expirar, a interface mantém os campos e oferece envio contextual pelo WhatsApp. O destino da captura pode ser conferido em `/api/health` sem expor URL ou segredo.

## 2) WhatsApp
Os links `wa.me` abrem uma mensagem contextual no número público da marca. O visitante confirma o envio no WhatsApp. O clique não confirma recebimento, fechamento ou venda. Não há ativação de WhatsApp Cloud API nesta entrega.

## 3) Tracking (GTM/GA4/GSC)

O tracking é opt-in por variáveis de ambiente do Vite:
- `VITE_GTM_ID` (opcional)
- `VITE_GA4_ID` (opcional)
- `VITE_GSC_VERIFICATION` (opcional)

O carregador real só injeta scripts depois do consentimento. GTM tem prioridade quando ambos os IDs existem; GA4 usa `send_page_view: false` e recebe uma visualização por rota, sem envio duplicado ao dataLayer. A CSP permite apenas os domínios de medição do Google. IDs `VITE_*` são definidos na Vercel antes de um novo build; sem ID válido, nenhum provedor é ativado.

Conversões: configure `generate_lead` como conversão somente após aceite do webhook. `lead_prepared` significa preparação sem recebimento; `whatsapp_open` é clique e não confirma envio ou venda. Plano, cobrança e origem acompanham o contexto. Nomes, e-mails, telefones e consultas da URL não são dimensões de eventos. O CRM deve registrar qualificação e fechamento para calcular custo e receita por lead.

Eventos já instrumentados:
- `form_start`, `diagnostic_step`, `form_submit` e `form_error`
- `generate_lead`, `lead_prepared`, `thank_you_view` e `whatsapp_open`
- `social_click` (header/footer)
- `whatsapp_click` (FAB)

## 4) Chat (demo)

- Endpoint: `apps/web/api/chat.ts` (server-side)
- Variáveis:
  - `OPENAI_API_KEY`
  - `OPENAI_MODEL` (opcional)
  - `VITE_CHAT_ENABLED` (opcional): habilita o widget

Notas:
- O chat é demonstrativo e deve ser tratado como um canal de pré-qualificação.

## 5) Voz e TTS (browser)

- `VITE_VOICE_ENABLED` (opcional): habilita comandos de voz e leitura (SpeechSynthesis / SpeechRecognition, quando disponíveis no navegador)

## Limites e segurança
- Nenhuma integração externa é considerada “ativa” sem credenciais e validação no ambiente de deploy.
- Segredos devem ficar apenas em variáveis server-side (nunca em `VITE_*`).
