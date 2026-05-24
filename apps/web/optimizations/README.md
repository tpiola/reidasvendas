# Pacote de otimizações — Rei das Vendas

Implementação viva em `apps/web/src/`. Este diretório é o espelho para entrega e documentação.

## Conteúdo

| Item | Descrição |
|------|-----------|
| `schema.jsonld` | Exemplo de grafo LocalBusiness + AggregateRating + FAQ |
| `automations/google-apps-script.gs` | Web App para Google Sheets (**sem Zapier**) |
| `LIGHTHOUSE.md` | Checklist de auditoria de performance |

## Variáveis de ambiente

- `LEAD_WEBHOOK_URL` — n8n ou endpoint principal
- `GOOGLE_SHEETS_WEBHOOK_URL` — URL do Apps Script (server, em `api/lead.ts`)
- `VITE_GOOGLE_SHEETS_URL` — espelho opcional no browser (modo `no-cors`)
- `VITE_TESTIMONIAL_YT_1` / `VITE_TESTIMONIAL_YT_2` — IDs YouTube dos depoimentos

## Gerar ZIP

```bash
cd apps/web && zip -r optimizations.zip optimizations/
```
