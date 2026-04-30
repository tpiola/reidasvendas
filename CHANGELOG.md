# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato baseia-se em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Adicionado
- **Protocolo MVO Rei das Vendas:** Reestruturação completa da marca, substituindo referências legadas.
- **Infraestrutura Google-First:** Configuração inicial para Google Cloud, Firebase e Vertex AI (via `.env.example`).
- **SEO Avançado:** Implementação de JSON-LD (`ProfessionalService` e `SoftwareApplication`) focado em GEO.
- **Design System:** Atualização do `tailwind.config.js` para Glassmorphism 2.0 e Dark Mode profundo.
- **Usina de Conteúdo:** Criação da estrutura `/assets/library` para integração com Freepik Premium.
- **Hero Section:** Suporte para vídeo 4K com camadas de texto otimizadas para conversão.
- **Automação:** Preparação de webhooks universais para n8n e stubs para mapas de calor/funis líquidos.

### Modificado
- Atualização do `brand.ts` para refletir o nome "Rei das Vendas" e o novo slogan.
- Otimização de Core Web Vitals (LCP, CLS, INP) no `index.html`.
- Otimização do `HeroVideo.tsx` para melhor performance e estética (mix-blend-luminosity e backdrop-blur).
