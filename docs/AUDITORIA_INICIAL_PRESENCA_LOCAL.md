# Auditoria inicial — Rei das Vendas

## Diagnóstico executivo

A base técnica é madura, mas a experiência pública está dividida entre a nova home “Soberania Digital” e componentes internos de uma fase visual anterior. O maior risco não é falta de recursos; é excesso de mensagens, produtos e estilos disputando o posicionamento principal.

## Prioridades

| Severidade | Achado | Impacto | Ação |
|---|---|---|---|
| P0 | Dados estruturados contêm telefone mascarado | Fato inválido para buscadores | Remover até existir número público confirmado |
| P1 | Home e páginas internas usam linguagens visuais diferentes | Reduz confiança e percepção de valor | Migrar rotas para o mesmo sistema |
| P1 | Partículas, blur, gradientes e animações globais elevam custo visual e técnico | Prejudica mobile e coerência premium | Restringir motion a momentos funcionais |
| P1 | Navegação apresenta muitas ofertas simultâneas | Dilui “presença digital para negócios locais” | Organizar por diagnóstico, solução, projetos e contato |
| P1 | Vitrine contém apenas três projetos e métricas “Em breve” | Parece incompleta | Remover placeholders e publicar só provas reais |
| P2 | Biblioteca do Notion não possui itens aprovados para venda | Não há fonte segura para vitrine automática | Criar workflow editorial de aprovação |
| P2 | Dois projetos Vercel apontam para o mesmo repositório | Risco operacional e confusão de produção | Definir projeto canônico e arquivar duplicado depois |
| P2 | CSP permite `unsafe-eval` e scripts inline | Superfície de segurança maior | Migrar gradualmente para nonces/hashes |

## Decisão de arquitetura

Manter o monorepo atual e Vite/React. A demanda não justifica migração de framework. A prioridade é consolidar conteúdo, design tokens, dados estruturados e fluxo de diagnóstico.

## Vitrine

A home deve exibir três projetos selecionados e enviar para `/portfolio`. A rota de portfólio deve omitir métricas não comprovadas. O banco do Notion só deve alimentar o site após os campos `Status = Pronto`, `Pronto p/ vender = sim`, URL pública e preview aprovado estarem completos.

## Meta de qualidade

- 390 px sem overflow
- Touch targets de 44 px
- WCAG AA
- Conteúdo útil sem JavaScript
- LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 no percentil 75 quando houver dados reais
- Sitemap, robots, canonical e schema válidos
- Formulário server-side com origem/UTMs, proteção anti-spam e consentimento adequado
- Preview validada antes de produção
