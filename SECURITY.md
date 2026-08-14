# Política de Segurança

## Escopo

Esta política cobre o site, as funções serverless, automações e integrações do Rei das Vendas.

## Regras obrigatórias

- Segredos existem somente nos ambientes protegidos da Vercel e dos serviços integrados.
- Tokens, chaves, credenciais e URLs sensíveis nunca são enviados ao frontend ou registrados no Git.
- O endpoint de leads usa `LEAD_WEBHOOK_URL` e, quando configurado, `LEAD_WEBHOOK_SECRET`.
- Dependências devem ser avaliadas antes do merge e atualizadas por pull requests rastreáveis.
- Mudanças em autenticação, coleta de dados, headers ou integrações exigem revisão específica de segurança.

## Reporte responsável

Use o recurso **Security Advisories** do GitHub para comunicar vulnerabilidades de forma privada. Não abra uma issue pública com detalhes exploráveis.

Inclua impacto, passos mínimos de reprodução e versão ou commit afetado. O mantenedor fará triagem antes de qualquer divulgação.
