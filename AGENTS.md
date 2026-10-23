# Rei das Vendas — regras do projeto

## Identidade e autoridade

- Repositório único: tpiola/reidasvendas. Projeto Vercel único: prj_pcMEMsQCigN8NVGVqm8uiWgSSLVL, time thiagopiola.
- A reconstrução total foi solicitada pelo dono em 23/10/2026. A decisão e o histórico estão em docs/ESTADO-ATUAL.md; ler também docs/GOVERNANCA-AGENTES.md antes de editar.
- Nenhum novo repositório ou projeto de hosting sem solicitação expressa. Preservar histórico; nunca force-push.
- A versão anterior está em backup/pre-rebuild-2026-10-23. Não restaurar sua arquitetura por conveniência.

## Implementação

- Next.js App Router 16, React 19, TypeScript strict, Tailwind 4 + CSS de componentes, pnpm.
- App na raiz. app/, components/, lib/, data/, public/, styles/, tests/, docs/.
- Só um escritor por arquivo; delegações devem ter escopo exclusivo.
- Conteúdo público em português. Sem métricas, avaliações, clientes, prêmios ou garantias inventadas.
- Faixas comerciais em data/commercial-contract.ts e página de serviços preservam condições aprovadas. Mudanças de preço/garantia requerem instrução do dono.
- Consentimento opcional default denied. Sem PII em analytics, query de atribuição ou logs. WhatsApp clique não é mensagem enviada nem venda.
- Dados editoriais e feed não equivalem a prova social. Cases só com documentação/autorização.
- Domínio desejado: www.reidasvendas.com.br. Antes de promover, verificar ausência do redirect de domínio www→apex na Vercel para não criar loop com proxy.ts.

## Portão de qualidade

Antes de commitar: pnpm check, pnpm lint, pnpm test, pnpm build, pnpm audit.
Mudança de jornada: pnpm e2e e inspeção visual mobile/desktop. Lighthouse mobile >=90 como portão; distinguir lab de campo.
Testes devem iniciar o servidor dentro do mesmo namespace/processo de execução. Relatar limitações reais de acesso/integração.
Atualizar docs/ESTADO-ATUAL.md junto com mudanças de runtime. Preservar governança e autoria.
