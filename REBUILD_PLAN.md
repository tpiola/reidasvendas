# REBUILD PLAN — Rei das Vendas (Modelado no Squarespace)

## Objetivo
Rebuild completo do site reidasvendas.com.br usando a arquitetura visual e componentes do Squarespace como referência, adaptados à identidade Rei das Vendas (gold #D6A84F / black #030303).

---

## 1. Inspiração Squarespace → Aplicação Rei das Vendas

### 1.1 Estrutura de Navegação (Header)
```
Squarespace:                    Rei das Vendas (Proposto):
PRODUTOS | SOLUÇÕES | RECURSOS  SOLUÇÕES | SEGMENTOS | BLOG | CONTATO
FAZER LOGIN | COMECE AGORA      Diagnóstico (btn gold) | WhatsApp (btn)
```

**Header proposto:**
- Fixed top, glass effect on scroll (já existe no SiteHeader.tsx)
- Logo (esquerda) + Nav (centro) + CTAs (direita)
- Mobile: hamburger com animated slide (já existe)

### 1.2 Hero Section (Squarespace-style)
```
┌─────────────────────────────────────────────────────┐
│  [Section Label] INFRAESTRUTURA DIGITAL • FRANCA-SP │
│                                                     │
│         Sua Empresa Precisa de uma                  │
│       Infraestrutura Digital (gradient gold)        │
│           Não de um Site.                           │
│                                                     │
│  [Diagnóstico Gratuito]  [Ver Soluções →]           │
│                                                     │
│  12+ projetos  •  98% satisfação  •  Franca-SP      │
└─────────────────────────────────────────────────────┘
```

**Já implementado:** ✅ Background video, gold glows, grid pattern, particles, parallax scroll, animated CTAs
**Melhorias propostas:** Adicionar carrossel de previews de templates/projetos (como squarespace), split text animation na headline

---

## 2. Arquitetura de Páginas (Sitemap)

| Página | Conteúdo | Prioridade |
|---|---|---|
| **/** (Home) | Hero + Problema + Valor + Soluções + Vídeo + Diferenciais + Segmentos + Founder + Provas + Processo + FAQ + CTA | ⭐ Atual |
| **/solucoes** | Grid de serviços completo, casos de uso, CTAs | ⭐ Melhorar |
| **/segmentos** | Grid de nichos com detalhes (NEW, baseado no Squarespace "Soluções") | ⭐ Nova |
| **/precos** | Planos/Pricing (já existe em Planos.tsx, integrar com Puck PricingBlock) | ⭐ Integrar |
| **/portfolio** | Galeria de projetos (já existe) | ✅ |
| **/blog** | Lista de posts (já existe) | ✅ |
| **/contato** | Formulário + WhatsApp (já existe) | ✅ |
| **/recursos** | FAQ, guias, downloads (NEW, baseado na seção Recursos do Squarespace) | ⭐ Nova |
| **/sobre** | Founder + História + Metodologia (baseado no Squarespace "Sobre") | ⭐ Nova |

---

## 3. Sistema de Componentes (Puck + Tailwind)

### 3.1 Componentes a Manter (já existentes)

```typescript
// Packages/design-system/src/components/
HeroBlock.tsx           ✅ Hero com vídeo, headline, CTAs
FeatureGridBlock.tsx    ✅ Grid de features (glass/bordered/minimal)
PricingBlock.tsx        ✅ Pricing com 3 planos
TestimonialCarouselBlock.tsx ✅ Depoimentos em grid

// Apps/web/src/components/
SiteHeader.tsx          ✅ Header fixo com glass scroll
SiteFooter.tsx          ✅ Footer com links e social
GlassCard.tsx           ✅ Componente glassmorphism reutilizável
GoldParticles.tsx       ✅ Partículas gold animadas
PremiumButton.tsx       ✅ Botão gold gradiente
PremiumComponents.tsx   ✅ LuxuryDivider, SectionHeading, FeatureCard, ProcessStep
FounderSection.tsx      ✅ Seção do fundador
```

### 3.2 Novos Componentes (Inspirados no Squarespace)

| Componente | Inspiração Squarespace | Descrição |
|---|---|---|
| **TemplateCarousel** | Homepage carrossel de slides | Carrossel de previews de projetos com navegação |
| **CategoryTabs** | Seção "Amplie seus negócios" | Tabs de categorias (Sites, Apps, Automações, etc.) |
| **SolutionsSidebar** | Templates filter sidebar | Sidebar de filtros por nicho/tipo |
| **StatBar** | Stats "14 mi+, US$36bi+" | Barra horizontal de estatísticas com ícones |
| **AccordionFAQ** | Pricing FAQ expandable | Accordion de FAQ (já existe no Home, extrair para componente) |
| **FeatureCardGrid** | "Escolha seus melhores trabalhos" | Grid de 3-4 colunas com hover effects |
| **ImageCard** | Template gallery cards | Card com imagem + label + CTA overlay |
| **BillingToggle** | Pricing toggle | Toggle mensal/anual para planos |
| **VideoCarousel** | Homepage video slides | Carrossel automático de vídeos de background |
| **PromoBanner** | Promo banner dismissível | Banner promocional fechável no topo |

### 3.3 Novas Páginas (Puck CMS)

```typescript
// Adicionar ao puck-config.tsx
export const puckComponents = {
  Hero: HeroBlock,
  FeatureGrid: FeatureGridBlock,
  TestimonialCarousel: TestimonialCarouselBlock,
  Pricing: PricingBlock,
  // NOVOS:
  CategoryTabs: CategoryTabsBlock,
  TemplateCarousel: TemplateCarouselBlock,
  SolutionsSidebar: SolutionsSidebarBlock,
  StatBar: StatBarBlock,
  AccordionFAQ: AccordionFAQBlock,
  VideoCarousel: VideoCarouselBlock,
  PromoBanner: PromoBannerBlock,
  ImageCardGrid: ImageCardGridBlock,
  CtaBanner: CtaBannerBlock,
  ProcessTimeline: ProcessTimelineBlock,
  FounderBio: FounderBioBlock,
} satisfies PuckConfig['components'];
```

---

## 4. Design System Refinado

### 4.1 Cores (já definidas nos tokens)

```
Primary:    #D6A84F (gold)        → CTAs, destaque, ícones
Background: #030303 (black)       → Background principal
Surface:    #080808               → Cards, containers
Surface-2:  #0B0B0B               → Cards elevados
Text:       #F5F5F5               → Texto principal
Text-Secondary: #A1A1AA           → Texto secundário
Gold-Glow:  rgba(214,168,79,0.35) → Efeitos glow
Glass:      rgba(255,255,255,0.035) → Glassmorphism base
Border:     rgba(255,255,255,0.06) → Bordas sutis
Border-Gold: rgba(214,168,79,0.22) → Bordas gold hover
Accent Blue: #0057FF              → Links, destaques alternativos
Accent Green: #25D366             → WhatsApp, sucesso
```

### 4.2 Tipografia Refinada

```
Headings:   Playfair Display (serif) — bold/extrabold, tracking tight
Body:       Geist / Inter (sans) — regular, tracking normal
Labels:     Geist — 10px, bold, uppercase, 0.3em tracking, gold
CTAs:       Geist — bold, uppercase (opcional), tracking wide

Fluid Scale:
  Hero:     clamp(2.8rem, 7.5vw, 5.5rem)  line-height: 1.02
  h1:       clamp(2.2rem, 5.5vw, 4.5rem)   line-height: 1.05
  h2:       clamp(1.8rem, 4vw, 3rem)       line-height: 1.1
  h3:       clamp(1.4rem, 2.5vw, 2rem)     line-height: 1.2
  Body:     clamp(0.95rem, 1.2vw, 1.125rem) line-height: 1.6
```

### 4.3 Spacing System

```
Section padding desktop: 120px (--spacing-section)
Section padding mobile:  72px  (--spacing-section-mobile)
Grid gaps:               24px (base), 32px (md), 48px (lg)
Content max-width:       1280px (max-w-7xl)
Content padding:         16px (mobile), 24px (sm), 32px (lg)
```

---

## 5. Layout System (Grid Patterns)

### 5.1 Grid Templates do Squarespace a Implementar

```
Layout 1-col:     Hero, CTA Banner, Stats Bar
Layout 2-col:     Feature rows, Content + Sidebar, Text + Image
Layout 3-col:     Service Cards, Pricing, Team, Portfolio grid
Layout 4-col:     Icon grid, Feature grid, Client logos
Layout Mixed:     Process (2/3 steps + 1/3 CTA sticky)
Layout Masonry:   Portfolio/Gallery
```

### 5.2 Responsive Breakpoints

```
xs: 480px    → Mobile
sm: 640px    → Tablet small
md: 768px    → Tablet
lg: 1024px   → Desktop
xl: 1280px   → Desktop wide
2xl: 1536px  → Large screens
```

---

## 6. Animações & Interações

### 6.1 Animações a Manter (já existentes)

| Animação | Uso |
|---|---|
| `fade-in-up` | Seções ao scroll (Reveal component) |
| `staggerContainer` + `staggerItem` | Grids com fade sequencial |
| `gold-shimmer` | Background gradient em CTAs |
| `glow-pulse` | CTA principal hero |
| `float` / `float-slow` | Gold glow blobs |
| `drift` / `drift-reverse` | Partículas decorativas |
| `ken-burns` | Background de vídeo |
| `line-grow` | Gold decorative lines |
| Page transitions | Spring animation entre rotas (AnimatePresence) |

### 6.2 Novas Animações (Inspiradas Squarespace)

| Animação | Descrição |
|---|---|
| **Split Text Reveal** | Headline com palavras reveladas individualmente (hero) |
| **Carousel Auto-scroll** | Slides automáticos com pause on hover |
| **Card Lift** | Elevação + glow em hover de cards |
| **Magnet CTA** | Botão que segue cursor sutilmente |
| **Scroll-driven parallax** | Parallax mais agressivo em backgrounds |
| **Counter Animation** | Números que contam ao entrar em viewport (já existe hook) |

---

## 7. Plano de Implementação por Fase

### Fase 1 (Core — 1 semana)
- [ ] Extrair CategoryTabsBlock para Puck (baseado na seção "Amplie seus negócios")
- [ ] Extrair AccordionFAQBlock para Puck
- [ ] Criar StatBarBlock (stats horizontais)
- [ ] Criar CtaBannerBlock reutilizável
- [ ] Extrair ProcessTimelineBlock para Puck
- [ ] Integrar HeroBlock com dados reais do CMS

### Fase 2 (Layout — 1 semana)
- [ ] Criar página /segmentos com SolutionsSidebar (filtros)
- [ ] Criar página /recursos com AccordionFAQ + content cards
- [ ] Criar página /sobre com FounderBioBlock + timeline
- [ ] Melhorar página /precos com BillingToggle + comparação
- [ ] Adicionar TemplateCarousel na home (projetos em destaque)

### Fase 3 (Refinamento — 1 semana)
- [ ] Adicionar split text animation no hero
- [ ] Implementar carrossel automático
- [ ] Refinar glassmorphism em todos os cards
- [ ] Adicionar scroll progress bar global
- [ ] Melhorar acessibilidade (contraste, focus, ARIA)
- [ ] Testar performance (Lighthouse 90+)

### Fase 4 (CMS + Conteúdo — Contínuo)
- [ ] Conectar Puck ao Payload CMS (já existe handler)
- [ ] Criar templates de página no admin
- [ ] Migrar conteúdo estático para CMS
- [ ] Adicionar blog posts reais
- [ ] Adicionar depoimentos reais

---

## 8. Comparativo: Squarespace vs Rei das Vendas

| Aspecto | Squarespace | Rei das Vendas (Atual) | Rei das Vendas (Alvo) |
|---|---|---|---|
| **Header** | Transparent → glass | ✅ Transparent → glass | ✅ Mantido |
| **Hero** | Carrossel vídeo + CTA | ✅ Vídeo + gradiente + partículas | ✅ + split text + carrossel projetos |
| **Features** | Tabs com cards dinâmicos | ✅ Grid estático | ✅ Tabs interativas |
| **Templates** | Grid + filtros | ❌ Não tem | ✅ Grid de projetos com filtros |
| **Pricing** | 3 planos + toggle | ✅ 3 planos | ✅ + toggle anual/mensal |
| **FAQ** | Accordion | ✅ Accordion | ✅ Extrair para componente |
| **Footer** | Multi-coluna links | ✅ Multi-coluna | ✅ Mantido |
| **Animations** | Sutis, on-scroll | ✅ Avançadas (framer motion) | ✅ Mantido + novas |
| **CMS** | Proprietário | ✅ Payload + Puck | ✅ Dashboard admin |
| **SEO** | Integrado | ✅ JSON-LD + sitemap | ✅ Manter + melhorar |
| **Performance** | CDN global | Vercel Edge | ✅ Manter |

---

## 9. Roadmap Técnico

### Stack Technology
```
Frontend:     React 18 + Vite 6 + TypeScript 5
Styling:      Tailwind 3 + CSS Modules (design-system)
Animations:   Framer Motion 10
CMS:          Payload CMS + Puck visual builder
Icons:        Lucide React
Forms:        react-hook-form + zod
Router:       react-router-dom 7
Deploy:       Vercel
Monorepo:     Turborepo + pnpm
Testing:      Vitest + Playwright + axe-core
```

### Build Command
```bash
pnpm build          # Turbo run build (all apps)
pnpm build:web      # Build only web app
pnpm dev            # Dev all apps in parallel
```

### Estrutura Final de Páginas
```
/
├── Home (14 sections)
├── Soluções (filtered service grid)
├── Segmentos (niche filter page — NEW)
├── Preços (3 plans + toggle)
├── Portfólio (project gallery)
├── Recursos (FAQ, guides — NEW)
├── Sobre (founder + methodology — NEW)
├── Blog (post list)
├── Blog/:slug (individual post)
├── Contato (form + WhatsApp)
└── 404 (not found)
```

---

## 10. Métricas de Sucesso

| Métrica | Atual | Alvo |
|---|---|---|
| Lighthouse Performance | ? | 90+ |
| Lighthouse Accessibility | ? | 95+ |
| Lighthouse SEO | ✅ JSON-LD | 100 |
| Core Web Vitals | ? | All Green |
| Page Load Time | ? | <2s |
| First Contentful Paint | ? | <1s |
| CMS Pages | 10 hardcoded | All editable via Puck |
| Design Tokens | ✅ Complete | ✅ Manter |
| Responsive Breakpoints | 7 | ✅ Manter |
