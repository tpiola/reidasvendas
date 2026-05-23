# Rei das Vendas - Engenharia de Resultados

A Ciência da Performance aplicada à Tecnologia de Negócios.

## Visão Geral

Este repositório contém a infraestrutura Google-First para o ecossistema "Rei das Vendas". O projeto foi desenhado para máxima velocidade, design (Glassmorphism 2.0) e conversão subconsciente.

## Stack Tecnológico
- **Framework:** Next.js 15 / React (Vite)
- **Design System:** Tailwind CSS (Glassmorphism 2.0 / Dark Mode Profundo)
- **Infraestrutura:** Google Cloud, Firebase, Vertex AI
- **Automação:** Webhooks universais para n8n
- **SEO:** JSON-LD avançado (ProfessionalService, SoftwareApplication), GEO (Generative Engine Optimization)

## Metodologia de Desenvolvimento (Sprint/Scrum)

O projeto segue uma arquitetura modular, projetada para ser clonada e escalada em infraestruturas de clientes.

### Fases de Implementação:
1. **Diagnose:** Análise objetiva da operação e gargalos.
2. **Architect:** Arquitetura de páginas, navegação e mensuração.
3. **Build:** Implementação por módulos (experiência, captura, automação).
4. **Activate:** Entrada, qualificação e resposta com n8n, UTM e rastreio de funil.
5. **Optimize:** Iteração orientada a métricas de performance e conversão.

## Instalação e Execução

```bash
# Instalar dependências
pnpm install

# Executar ambiente de desenvolvimento
pnpm dev

# Build de produção (site)
pnpm build:web

# CI local (check + lint + test + build + E2E)
pnpm run ci
```

## Deploy (Vercel)

Site em `apps/web`. Pipeline, variáveis de ambiente e checklist pós-deploy: [`docs/DEPLOY_VERCEL.md`](docs/DEPLOY_VERCEL.md).

## Engenharia de MVO & Escala
O sistema está preparado para rastreamento de Mapas de Calor e Funis Líquidos que se adaptam ao interesse do Lead (ex: Saúde vs. Negócios).
