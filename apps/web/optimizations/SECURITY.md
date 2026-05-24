# Segurança — Rei das Vendas (web)

## Headers (Vercel)

- `Content-Security-Policy` restrita a domínios de mídia, analytics e embeds necessários
- `Strict-Transport-Security` com preload
- `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`
- `Cross-Origin-Opener-Policy` / `Cross-Origin-Resource-Policy`
- `Permissions-Policy` desabilita câmera, microfone, geolocalização

## API `/api/lead`

- Limite de corpo (32 KB)
- JSON inválido retorna 400
- Sem exposição de stack trace ao cliente

## Privacidade

- Consentimento explícito no formulário
- Política LGPD em `/politica`
- QR WhatsApp via `api.qrserver.com` (permitido em `img-src` do CSP)

## Recomendações operacionais

- Rotacionar `VITE_N8N_WEBHOOK_URL` e tokens de planilha periodicamente
- Revisar `frame-src` ao adicionar novos embeds (YouTube, maps)
- Manter dependências atualizadas via `pnpm audit` no monorepo
