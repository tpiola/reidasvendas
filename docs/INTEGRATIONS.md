# Integrações (Web + n8n)

## 1) Leads (site → n8n)

### Fluxo
- O frontend envia o formulário para `POST /api/lead`.
- A API valida nome, e-mail, WhatsApp, contexto comercial e atribuição.
- Com `LEAD_WEBHOOK_URL` ou `N8N_WEBHOOK_URL`, a API encaminha o lead ao webhook e responde com `delivery: "webhook"` apenas após a entrega confirmada.
- Sem webhook configurado, a API responde com `delivery: "whatsapp_handoff"`; a interface informa que o diagnóstico ainda precisa ser enviado e libera uma mensagem contextualizada no WhatsApp.
- O encaminhamento por WhatsApp não simula armazenamento automático: o registro chega à equipe quando o visitante confirma o envio da mensagem.

### Variáveis
- `LEAD_WEBHOOK_URL` (server-side): URL do webhook do n8n (produção)
- `N8N_WEBHOOK_URL` (server-side, opcional): alternativa para instalações existentes
- `LEAD_WEBHOOK_SECRET` (server-side, opcional): enviado como `Authorization: Bearer <segredo>`

### n8n (import)
- Importar: `n8n/workflows/ALTHIQ-Leads-Intake-v1.json`
- Definir env no n8n:
  - `ALTHIQ_WEBHOOK_SECRET`

## 2) WhatsApp (Cloud API)

Este repositório inclui um workflow **modelo** para envio via WhatsApp Cloud API. Ele não ativa envio sem credenciais.

- Importar: `n8n/workflows/ALTHIQ-WhatsApp-CloudAPI-Send-v1.json`
- Definir env no n8n:
  - `WA_PHONE_NUMBER_ID`
  - `WA_TOKEN`
- Configurar credential `httpHeaderAuth` como `Authorization: Bearer {{$env.WA_TOKEN}}`

## 3) Tracking (GTM/GA4/GSC)

O tracking é opt-in por variáveis de ambiente do Vite:
- `VITE_GTM_ID` (opcional)
- `VITE_GA4_ID` (opcional)
- `VITE_GSC_VERIFICATION` (opcional)

Eventos já instrumentados:
- `form_start`, `diagnostic_step`, `form_submit` e `form_error`
- `thank_you_view` e `whatsapp_open`
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
