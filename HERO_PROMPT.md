## MISSÃO
Transformar o hero da Home do reidasvendas.com.br em uma máquina de conversão Awwwards-level.

## CONTEXTO
- Monorepo pnpm + turbo, apps/web é o site Vite + React + Tailwind
- Hero atual em: apps/web/src/pages/Home.tsx
- CSS do hero em: apps/web/src/index.css (orbs, grid 3D, enter animations, btn-conversion)
- Cópia centralizada em: apps/web/src/lib/home-content.ts (HERO_COPY, CTA, TRUST_STATS)
- Brand assets: apps/web/src/lib/brand.ts (vídeos, links, redes)
- Media config: apps/web/src/lib/media.ts (URLs Pexels)
- CTA copy: apps/web/src/lib/cta-copy.ts
- Cores: azul #0057FF, ouro #C9A84C, preto #030305
- Fontes: Geist (body), Playfair Display (display)
- Estilo: dark-first, sem border-radius (0px), sem gradiente roxo, sem layout bento

## O QUE FAZER

### 1. Copy de Conversão (apps/web/src/lib/home-content.ts)
- Melhorar HERO_COPY:
  - subhead: "De R$ 0 com site genérico para uma máquina de vendas funcionando 24h. Primeira versão em 72h."
  - ctaPrimary: "QUERO MEU SITE EM 72H"
  - ctaSecondary: "Orçamento em 24h · Sem fidelidade · Suporte direto"
  - proofStat: "+40%"
  - proofLabel: "conversão média — baseado em 40+ clientes"
  - urgencyText: "ÚLTIMAS 2 VAGAS DO MÊS — Garantia de qualidade total"

### 2. Hero Section (apps/web/src/pages/Home.tsx)
- Melhorar o heading:
  - "Seu negócio local" (gold gradient)
  - "vendendo como as gigantes." (titanium gradient)
- Adicionar micro-copy abaixo do CTA: small text "Orçamento em 24h · Sem fidelidade"
- Manter TrustStats, proof counter, urgency indicator
- Importar e adicionar StickyCtaBar no final do main

### 3. CSS Effects (apps/web/src/index.css)
- Adicionar 2 orbs extras (orb-4 e orb-5) com animações drift
- CTA hover com ripple effect: btn-conversion::after glow pulse + scale sutil
- .hero-noise mais refinado (opacity 0.03)
- Adicionar .hero-ink com text-shadow sutil para dark mode
- Adicionar .text-shadow-premium para títulos
- Animação de partículas sutis (@keyframes sparkle)

### 4. Novo: StickyCtaBar (apps/web/src/components/conversion/StickyCtaBar.tsx)
- Barra fixa bottom que aparece após scroll (80%)
- glassmorphism dark
- Texto: "Últimas vagas · Entrega em 72h"
- CTA link para /diagnostico
- Botão X para fechar
- Transição suave

### 5. HeroVideo refinements (apps/web/src/components/HeroVideo.tsx)
- Manter existing structure
- Adicionar noise overlay mais refinado

## ARQUIVOS
1. apps/web/src/lib/home-content.ts - copy
2. apps/web/src/pages/Home.tsx - estrutura hero + sticky bar
3. apps/web/src/index.css - novos efeitos
4. apps/web/src/components/conversion/StickyCtaBar.tsx (NOVO)

## REGRAS
- Não quebrar build (pnpm --filter web build)
- Não mudar cores da marca
- Dark mode first
- Usar @/ alias
- Build final obrigatório
