# AUDITORIA COMPLETA — reidasvendas.com.br

**Data:** 14/06/2026  
**Padrão-alvo:** Squarespace (nível profissional) / Anthropic (clareza, sem ruído)  
**Critérios:** Conteúdo genérico, placeholders, imagens/vídeos sem sentido, excesso de gráficos, urgência artificial, elementos abaixo do nível premium.

---

## SUMÁRIO EXECUTIVO

| Gravidade | Itens encontrados |
|-----------|-------------------|
| 🔴 **Crítico** | 7 |
| 🟡 **Alto** | 12 |
| 🟢 **Médio** | 8 |
| ⚪ **Sugestão** | 6 |

**Nota geral:** O site tem boa estrutura técnica (TypeScript, lazy loading, SEO, acessibilidade), mas sofre de **urgência artificial generalizada**, **excesso de efeitos visuais** (5 orbes animados + sparkles + grid 3D + parallax + cursor follower + noise grain + scanlines), **depoimentos genéricos com fotos do Pravatar**, e **vários vídeos do Pexels** que não mostram o produto real.

---

## 1. PAGES/HOME.TSX — Página Principal

### 🟢 Bom
- Lazy loading de `CinematicVideoBand` e `TestimonialsVideoSection`
- SEO aplicado via `applySeo` com JSON-LD
- Seções bem organizadas: hero → demo → vídeo → como funciona → showcase → planos → provas → FAQ → CTA
- Micro-copy de confiança abaixo do CTA
- Scroll-reveal com delays progressivos

### 🔴 Ruim / Crítico
- **URGÊNCIA ARTIFICIAL GRAVE:** Linha 145-148: `"ÚLTIMAS 2 VAGAS DO MÊS"` com bolinha pulsante + `HERO_COPY.urgencyText` — falso senso de escassez
- **EXCESSO DE EFEITOS GRÁFICOS:** Linhas 67-77: hero-grid + 5 orbes animados (orb-1 a orb-5) + 10 sparkles — tudo apenas decorativo, poluição visual
- **2 vídeos hero simultâneos:** `<VideoHero />` (Pexels) + `<HeroVideo>` (outro background) — conflito visual e de performance
- **DUAS SEÇÕES DE PLANOS:** `HomePlanosCtaBand` + `PricingCardsPremium` — redundância
- **DUAS SEÇÕES DE PROVA SOCIAL:** `TestimonialsMarquee` + `TestimonialsVideoSectionLazy` + `SocialProof` — três seções para a mesma função
- **StickyCtaBar** no final com `⏳ Últimas vagas` — mais urgência fabricada

### O que adicionar
- Vídeo REAL do produto (screen recording do funil rodando)
- Imagens reais de projetos finalizados
- Case studies com dados concretos

---

## 2. PAGES/PROJETOS.TSX

### 🟢 Bom
- SEO correto
- Grid responsivo com lazy loading de imagens
- Breadcrumb implícito, tags por nicho
- CTA para diagnóstico ao final

### 🟡 Problemas
- `project.imageUrl` aponta para `/imagens/project-*.webp` — **precisa verificar se as imagens reais existem**
- Todas as imagens são locais mas podem ser placeholders (não vi os arquivos no diretório public)
- `BuiltFromScratchNotice` repetido em todas as páginas — vira ruído
- Apenas 4 projetos — catálogo pequeno para um portfólio

---

## 3. PAGES/BLOG.TSX

### 🟢 Bom
- SEO adequado
- Grid limpo, cards com categoria, título, excerpt, tempo de leitura

### 🟡 Problemas
- **Apenas 3 posts de blog** — conteúdo muito ralo para SEO
- Posts têm body de 3-4 parágrafos curtos — não são artigos reais
- Sem imagens nos cards do blog
- Datas de maio/2026 — parece conteúdo recente, mas sem regularidade

---

## 4. PAGES/CONTATO.TSX

### 🟢 Bom
- SEO correto
- `LeadForm` com captura mínima (nome, email, WhatsApp)
- Mapa Google Maps embed
- Email e WhatsApp visíveis
- InlineVideo com vídeo do time

### 🟡 Problemas
- **Mapa com coordenadas genéricas** (`!3d-20.538!2d-47.400`) — Franca-SP tem ~20.539, -47.401, está próximo mas parece placeholder
- Vídeo `BRAND.inlineVideos.salesTeam` = Pexels (vídeo stock de time), não é o time real
- Frase `"Resposta em até 24h"` repetida em todas as páginas

---

## 5. PAGES/DIAGNOSTICO.TSX

### 🟢 Bom
- FAQ Schema JSON-LD
- Formulário direto, 3 perguntas FAQ
- Botões de ação claros

### 🟡 Problemas
- Página extremamente simples — poderia ter mais conteúdo explicando o diagnóstico
- `"Orçamento em 24h"` repetido — virou muleta
- LeadForm com `formVariant="minimal"` — só 3 campos, mas sem contexto do que será diagnosticado

---

## 6. PAGES/SAUDE.TSX, NEGOCIOS.TSX, SOLUCOES.TSX

### 🔴 Crítico — Páginas Ninja Genéricas
- **Todas usam o mesmo componente `NicheLandingPage`** com props diferentes
- Conteúdo superficial: 3 highlights + 1 vídeo Pexels + 1 formulário
- **NÃO HÁ CONTEÚDO ESPECÍFICO POR NICHO** — zero copy real para saúde, direito, etc.
- Saude: `"Paciente certo, agenda cheia"` — genérico
- Negocios: `"Lead qualificado, ticket maior"` — genérico
- Solucoes: `"Digital que vende, não só aparece"` — genérico
- Vídeos do Pexels (`manifesto`, `performance`, `salesFunnel`) — sem relação com o nicho

---

## 7. PAGES/GOVERNANCA.TSX

### 🟡 Problemas
- **Página sem conteúdo real** — apenas frase `"Teoria de Ponta. Execução de Trincheira."`
- Vídeo do **Coverr** (café genérico) como background — sem relação com governança
- `robots: 'noindex, follow'` — página propositalmente escondida do Google
- Deveria ter: LGPD detalhada, termos de serviço, compliance, organograma

---

## 8. PAGES/POLITICA.TSX e TERMOS.TSX

### 🟢 Bom
- Estrutura correta para documento legal
- Breadcrumb, seções numeradas
- LGPD mencionada
- `LeadCaptureSection` ao final de ambas

### ⚪ Atenção
- **AVISO NO TOPO:** `"Versão inicial — antes de ir para produção, adeque este documento com seu jurídico"` — **placeholder explícito**
- Termos de Uso sem cláusulas de suporte, SLA, cancelamento
- Política sem prazos reais de retenção de dados

---

## 9. PAGES/NOTFOUND.TSX

### 🟢 Bom
- SEO com `noindex`
- Design limpo, links para Home e Projetos
- 404 claro e funcional

---

## 10. PAGES/PLANOS/PLANOSINDEX.TSX

### 🟢 Bom
- SEO adequado
- `BuiltFromScratchNotice` + `PricingPreview` — preview limpo dos planos

### 🟡 Problemas
- Apenas um wrapper para `PricingPreview` — conteúdo mínimo

---

## 11. PAGES/PLANOS — PlanoEssencial, PlanoCrescimento, PlanoEscala, PlanoSobMedida

### 🟢 Bom
- Todos usam `PlanPageShell` com dados centralizados de `data/plans.ts`
- Breadcrumb, hero com imagem de fundo, lista de includes/não inclui
- Formulário de contratação inline
- `PlanComparisonTable` + JSON-LD Product

### 🟡 Problemas
- **Imagens de capa via Unsplash** (`catalogCover('photo-1556761175-b413da4baf72')`) — fotos stock genéricas
- Preços (`R$ 497`, `R$ 997`, `R$ 1.997`) — pode estar tudo correto, mas sem validação
- `"Garantir minha vaga"` como CTA — mais urgência artificial

---

## 12. COMPONENTES DE CONVERSÃO

### UrgencyBar.tsx 🔴 CRÍTICO
- **A pior peça do site.** Barra fixa no topo com timer regressivo de 29:59 que **REINICIA AUTOMATICAMENTE** quando chega a zero
- `"ÚLTIMAS 2 VAGAS DO MÊS"` + timer falso + pulsação vermelha quando <5min
- CTA `"GARANTIR VAGA"` linkando para `/contato`
- Dark pattern completo: timer falso, escassez inventada, urgência permanente
- **REMOVER IMEDIATAMENTE** — abaixo do padrão Squarespace e anti-ético

### SocialProof.tsx 🟡 Problemas
- Contador animado `0 → 47` — número não verificável, sem fonte
- **Depoimentos com fotos do Pravatar** (`i.pravatar.cc/80?img=25`) — fotos genéricas de avatar, não são reais
- Nomes: "Dra. Carla Mendes", "Roberto Alves", "Marcos Oliveira" — sem sobrenome real, sem link para negócio
- Segmentos com emoji (💊🥖🛍️💇🔧🍽️🏥📋) — parece brincadeira, não profissional
- Texto dos depoimentos extremamente genérico: `"Melhor investimento que fiz"`, `"recomendo de olhos fechados"`

### PricingCardsPremium.tsx 🟡 Problemas
- 3 planos (Start R$197, Profissional R$397, Enterprise R$697) — **DIFERENTES** dos planos reais (Essencial R$497, Crescimento R$997, Escala R$1.997)
- **INCONSISTÊNCIA GRAVE:** Os preços e nomes dos planos no componente não batem com os planos em `data/plans.ts`
- "Site de 5 páginas", "IA Chatbot" — features genéricas de template de site
- Toggle mensal/anual com descontos arbitrários (15%, 18%, 20%)
- CTA `"QUERO O PROFISSIONAL"` — inconsistentes com CTA do Plano Essencial

### ConversionStickyBar.tsx 🟢 Ok
- Barra inferior que aparece após 400px de scroll
- CTAs para diagnóstico e WhatsApp — funcional

### StickyCtaBar.tsx 🟡 Problema
- `"⏳ Últimas vagas · Entrega em 72h"` — mais urgência artificial
- Outro CTA fixo na parte inferior competindo com ConversionStickyBar

---

## 13. COMPONENTES GERAIS

### VideoHero.tsx 🔴 GRAVE
- **CONFLITO COM HOME.TSX:** Este componente tem seu próprio hero FULLSCREEN com vídeo Pexels, typewriter, parallax, CTA pulsante — mas a Home.tsx também tem `<VideoHero />` + `<HeroVideo />` separado
- **DUAS SEÇÕES HERO NA MESMA PÁGINA**
- CTA `"QUERO MEU SITE EM 72H"` — diferente do CTA da Home (`"QUERO MEU SITE EM 72H"` da Home é uppercase, ambos parecidos)
- Uso de **emoji** no HTML (`🔍`, `⚡`, `♾️`) nas seções de scroll
- `scroll-hero.css` com typewriter, pulse-gradient, parallax scroll-driven — efeitos pesados para benefício questionável

### ScrollReveal.tsx 🟢 Bom
- Componente bem construído, IntersectionObserver, suporte a stagger
- Único problema: duplicado com `Reveal.tsx` — ambos fazem a mesma coisa

### CursorFollower.tsx 🟡 Desnecessário
- Glow radial que segue o mouse — efeito puramente estético, sem função
- Consome performance em desktop
- Abaixo do padrão Anthropic (que evita enfeites)

### ExitIntentModal.tsx 🟡 Agressivo
- Modal que aparece quando o mouse sai do viewport (exit intent)
- `"E se o funil trabalhasse enquanto você atende?"` — pergunta de vendas agressiva
- Usa `sessionStorage` para mostrar apenas uma vez por sessão — mas ainda é intrusivo

### DeferredEngagement.tsx 🟢 Bom
- Carregamento diferido após primeiro paint
- `AssistWidget` + `PlanosEngagementBanner` + `ExitIntentModal` lazy

---

## 14. ARQUIVOS DE DADOS

### data/copy-persuasivo.ts 🔴 CRÍTICO
- **Técnicas de NLP (Programação Neurolinguística) explícitas:** `pressuposição`, `comando embutido`, `escassez`, `ancoragem`
- Comandos diretos: `"você já sentiu que seu negócio merece mais"`, `"quanto mais rápido você agir"`, `"você nunca vai ficar na mão"`
- **ESCASSEZ EXPLÍCITA:** `"Últimas vagas deste mês — investimento vai subir"`, `"Essa oportunidade não volta"`
- Conteúdo de vendas agressivo, estilo curso de copywriter dos anos 2000
- Depoimentos repetidos (mesmo texto do SocialProof.tsx)
- **Nomes e fotos sem consentimento explícito verificável**

### data/plans.ts 🟢 Bom
- Dados bem estruturados, com includes, non-includes, idealFor
- Preços consistentes (R$497, R$997, R$1.997)
- **MAS:** Em conflito com `PricingCardsPremium.tsx` que tem R$197/R$397/R$697

### utils/seo-content.ts 🟢 Bom
- SEO bem estruturado, JSON-LD (LocalBusiness, FAQ, Review Aggregate)
- Open Graph e Twitter Cards
- Horários, endereço, redes sociais — completo

### lib/home-content.ts 🟢 Bom
- Textos bem escritos, diretos
- FAQ realista (prazo, template vs exclusivo)
- `HERO_COPY.urgencyText` com "ÚLTIMAS 2 VAGAS" — o único ponto negativo

### lib/media.ts 🟢 Médio
- Vários vídeos Pexels mapeados com IDs — organização ok
- **MAS:** `PEXELS.manifesto === PEXELS.profRevenue === PEXELS.heroBusiness` — **mesmo vídeo em 3 lugares diferentes** (4328609)
- `PEXELS.profCharts === PEXELS.manifesto` no brand.ts — **repetição do mesmo vídeo para canais diferentes**
- `profDoctor`, `profEngineer`, etc. são vídeos stock genéricos, não específicos do negócio

---

## 15. APP.TSX

### 🟡 Problemas
- `UrgencyBar` renderizado globalmente em TODAS as páginas
- `CursorFollower` global — não deveria estar em produção
- `ConversionStickyBar` global + `StickyCtaBar` na Home = **2 sticky bars competindo**
- Framer Motion `AnimatePresence` com transition de 0.25s — aceitável
- Lazy loading de rotas — bom

---

## 16. INDEX.CSS

### 🟡 Problemas
- **~1700 linhas de CSS** com centenas de animações: orbes (orb-drift-1 a 5), sparkles (10 spans), parallax, noise grain, scanlines, 3D grid, pulse glow, ripple, marquee, sticky bar — **EXCESSO GRÁFICO GRAVE**
- 10 efeitos decorativos diferentes na hero section: orbes 3D + grid 3D + sparkles + noise + scanlines + parallax + pulse CTA + gradient text + glass card + blur overlays
- `!important` em vários lugares (light mode overrides) — indica CSS frágil
- Reset básico, mas conteúdo de animação é desproporcional

---

## RESUMO — PLANO DE AÇÃO PRIORITÁRIO

### 🔴 Remover Imediatamente (antiético / prejudicial)
1. **`UrgencyBar.tsx`** — timer falso com reinício automático e "últimas 2 vagas"
2. **`StickyCtaBar.tsx`** — "últimas vagas" duplicado
3. **`Hero_COPY.urgencyText`** "ÚLTIMAS 2 VAGAS DO MÊS"
4. **`copy-persuasivo.ts`** — NLP explícito e escassez fabricada
5. **`CursorFollower.tsx`** — enfeite sem função
6. **Duplicação de vídeos Pexels** — cada canal deve ter vídeo único ou real
7. **`ExitIntentModal.tsx`** — modal agressivo de saída

### 🟡 Substituir por Conteúdo Real
1. **Depoimentos com fotos reais** (não Pravatar) e links verificáveis
2. **Vídeos do produto real** (screen recording), não Pexels stock
3. **Imagens de projetos reais** em vez de Unsplash/stock
4. **Niche pages (Saúde, Negócios, Soluções)** com copy específica por segmento
5. **Blog com conteúdo real** (mínimo 12 posts) e imagens
6. **Alinhar `PricingCardsPremium.tsx`** com os planos reais de `data/plans.ts`

### 🟢 Consolidar
1. Unificar `VideoHero.tsx` e `HeroVideo.tsx` — um hero apenas
2. Unificar `ScrollReveal.tsx` e `Reveal.tsx` — um componente de reveal apenas
3. Reduzir de 3 seções de prova social para 1 (com dados reais)
4. Reduzir de 2 seções de planos para 1 (usar `data/plans.ts` como fonte única)
5. Reduzir de 2 sticky bars para 0 ou 1

### ⚪ Melhorias Adicionais
1. Adicionar `Governanca.tsx` com conteúdo real (LGPD detalhada, compliance)
2. Substituir placeholder legar nos Termos/Política
3. Adicionar mais posts ao blog (mínimo 12)
4. Adicionar mais projetos ao portfólio

---

## MÉTRICAS DO SITE

| Indicador | Valor | Nota |
|-----------|-------|------|
| Total de páginas | ~20 | ✅ |
| Componentes de urgência artificial | 4 | 🔴 |
| Vídeos Pexels stock | ~15 URLs | 🔴 |
| Depoimentos com foto real | 0 de 8 | 🔴 |
| Seções de prova social | 3 | 🟡 |
| Efeitos CSS animados | ~30+ | 🔴 |
| Posts de blog reais | 3 | 🟡 |
| Placeholders legais | 2 (termos + política) | 🟡 |
| Inconsistência de planos | PricingCards ≠ data/plans | 🔴 |

---

## CONCLUSÃO

O site **reidasvendas.com.br** tem uma base técnica sólida (TypeScript, SEO, lazy loading, acessibilidade), mas está **severamente comprometido** por:

1. **Urgência artificial generalizada** (timer falso, "últimas vagas" em 4 lugares)
2. **Excesso de efeitos visuais** que poluem a experiência
3. **Conteúdo genérico e placeholders** disfarçados de conteúdo premium
4. **Inconsistência de preços** entre componentes
5. **Uso massivo de mídia stock** (Pexels, Pravatar, Unsplash, Coverr) sem mídia real do produto

**Para atingir o nível Squarespace/Anthropic**, o site precisa de uma redução drástica de elementos agressivos de conversão, substituição de mídia stock por conteúdo real, e consolidação das seções redundantes.
