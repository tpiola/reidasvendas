# Segurança e privacidade operacional

## Limites da configuração

Headers e validação reduzem risco, mas não constituem certificação. Não há painel administrativo ou autenticação simulada. Secrets ficam no servidor. Integrações ausentes continuam desativadas; coleta não deve fingir sucesso sem confirmação do destino.

## Headers implementados

`next.config.ts` aplica HSTS (um ano, includeSubDomains), `nosniff`, `X-Frame-Options: DENY`, política de referrer, restrições a câmera/microfone/geolocalização/pagamento/USB e CORP same-origin. HTTPS é encerrado pela Vercel. Não enviar domínio à lista preload antes de confirmar todos os subdomínios e compromisso de HTTPS.

A CSP aplicada bloqueia objetos, base externa, framing e envio de formulários para outra origem. A CSP ampla de scripts/conexões fica em **Report-Only** para mapear Next, Google, Meta e observabilidade sem quebrar hidratação. Portanto, ela ainda **não** impede execução de script arbitrário de todas as origens: não declarar proteção XSS completa.

### Evolução da CSP

1. Disponibilizar `/csp-report` com corpo limitado (8 KB), sem persistir relatório bruto/URL/query e sem registrar PII. Aplicar limitação/WAF no endpoint; a CSP pode receber muito ruído de extensões.
2. Medir violações em navegação, rejeição/aceitação de cookies, formulário, WhatsApp e preview.
3. Separar violações da aplicação de extensões, marcar origens estritamente necessárias e eliminar scripts inline evitáveis.
4. Migrar `script-src` para hashes de build ou nonce por resposta, com teste de HTML estático/cache. Nonce por resposta pode tornar páginas dinâmicas; não sacrificar cache sem medir o trade-off.
5. Fazer canário e mover regra validada para enforcement. Manter política de fallback e rollback.

`unsafe-inline` é permitido em estilos na política de observação porque React/Next podem renderizar estilo legítimo. Ele não deve ser copiado para `script-src` sem decisão explícita. Ausência de erros no console não prova enforcement.

## Endpoints e dados

- Validar origem exata; não aceitar wildcard CORS para formulário de lead.
- Schema server-side, limites de tamanho, normalização e mensagens acessíveis no cliente.
- Honeypot e rate limit **durável**; memória de processo serverless não é proteção suficiente.
- Se Redis ou CRM faltar em produção, responder erro real; oferecer WhatsApp funcional.
- Chave CRM nunca em `NEXT_PUBLIC_*`; endpoint CRM deve ser HTTPS e administrativamente configurado, nunca recebido do visitante.
- Telefone/nome/mensagem nunca em logs, eventos GA4, URLs internas ou campos de erro.
- Mensagem com dados no WhatsApp só após ação explícita do visitante; link externo implica tratamento pelo fornecedor e precisa estar explicado.
- CAPI não contorna consentimento. Hash de identificador pessoal continua dado pessoal; usar minimização e finalidade antes de qualquer envio.
- Deduplicar eventos browser/servidor com o mesmo `event_id`; não enviar Lead se só houve clique sem criação confirmada.
- Não manter session replay, fingerprinting ou geolocalização precisa.

## Três revisões antes de release

| Leitura | Riscos OWASP | Evidência |
| --- | --- | --- |
| Superfície | rotas não previstas, IDOR, autenticação simulada, acesso administrativo | inventário de rotas, 404, nenhuma API administrativa aberta |
| Entrada e saída | injeção, XSS, SSRF, origem inválida, excesso de corpo, logs | schemas, allowlists, React escaping, body limits, testes negativos |
| Operação | segredo exposto, dependência vulnerável, abuso, permissões, backup | diff, audit, envs server-only, Redis/WAF, escopo Vercel, restauração |

Nenhum passe compensa falha em outra leitura. Configuração da WAF, aprovação de fornecedor, retenção CRM e alerta de uptime são controles externos e precisam de evidência no painel.

## Retenção, incidentes e restauração

A política pública deve refletir retenção realmente aplicada no CRM, provedor de logs e backups. Não publicar prazo fictício. Definir responsável e rotina de exclusão/anonimização, incluindo cópias. Pedidos de acesso/correção/exclusão devem ir ao contato real do controlador.

Em incidente: preservar evidência mínima, revogar/rotacionar credencial afetada, limitar coleta se necessário, identificar dados/fornecedores/alcance, registrar decisões e avaliar deveres de comunicação com assessoria competente. Não expor detalhes de exploração nem dados pessoais em issues públicas.

Backup do código: histórico Git, branch anterior e deployment anterior. Isso **não** é backup do CRM/Redis ou de configuração DNS. Exportar configurações e dados só com necessidade/retencão/acesso definidos; testar restauração trimestralmente. Mudanças de domínio e variáveis precisam de plano próprio de recuperação.

## Pendências verificáveis

- [VERIFICAR] titularidade empresarial, CNPJ/endereço e contato de privacidade.
- [VERIFICAR] prazo de retenção praticado e contratos com Vercel, CRM, Google e Meta.
- [VERIFICAR] WAF/bot protection e limites disponíveis no plano atual.
- [VERIFICAR] destino de alertas e responsável operacional.
- [VERIFICAR] coleta real CAPI/GA4 com opt-in e ausência de PII.
- [VERIFICAR] migração da CSP ampla para enforcement após relatório representativo.
