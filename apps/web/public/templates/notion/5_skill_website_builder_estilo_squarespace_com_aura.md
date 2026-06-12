# 5 · Skill Website Builder — estilo Squarespace, com Aura/Framer/Sprint/3D/Next

Source: Notion — 5 Skill Website Builder estilo Squarespace com Aura
Page ID: 2b54c028-2e30-4a69-87ac-b5af9a5a86dc
URL: https://app.notion.com/p/5-Skill-Website-Builder-estilo-Squarespace-com-Aura-Framer-Sprint-3D-Next-2b54c0282e304a6987acb5af9a5a86dc

> Skill-mãe da reidasvendas: como construir sites estilo Squarespace (editorial, refinado, cliente edita sozinho) usando o arsenal moderno: Aura.build · Framer · Sprint · 3D · Next.js 15 · Vercel.

## 1. Matriz de escolha do builder

## 2. Aura.build — “Squarespace de IA”

O que é: AI website builder web-based (Meng To) que gera HTML/CSS/JS a partir de prompt + @ referências de templates, com Design Mode visual, Gemini 3 Pro, export HTML e Figma.[1]

Como usar na reidasvendas (fluxo de 2h):

1. Prompt Builder (aura.build/create) com o brief do cliente (nicho, cidade, diferenciais, paleta, refs).
1. Referêncie templates com @ (até 100.000 chars / ~2.000 linhas de contexto).
1. Refine seção por seção no Design Mode (edição visual prompt-targeted — muda só o bloco).
1. Use a biblioteca de 20.000+ assets (imagens, backgrounds, stock).
1. Plano Pro (US$20/mês) libera: 100 páginas/projeto, CMS completo, domínio customizado, export HTML + Figma, uso comercial.[2]
1. Export → GitHub → Vercel (ou publish direto com subdomínio aura).
Prompt-âncora reidasvendas para Aura:

```plain text
Crie uma landing editorial premium para [NICHO] em [CIDADE].
Referências: @EnterpriseAIWorkforce @HealthcareClinicLanding
Paleta: creme #f4efe6, tinta #1a1613, clay #c2481f.
Tipografia: Fraunces display + Inter sans.
Seções: nav sticky · hero com pill label + H1 80–140px + CTA duplo · ticker de clientes · grid bento de 6 serviços · scroll horizontal de cases · split com imagem full-bleed · FAQ toggle · CTA final · footer editorial.
Mobile-first. Micro-animações sutis. Nada piscando.
```

## 3. Framer — padrão de entrega da reidasvendas

Por quê: visual de agência + CMS real + cliente edita sozinho + deploy 1 clique.

Templates base (Sprrrint / Sprint):

* Sprintt SaaS (Framer Marketplace) — landing premium de SaaS, founders-focused.[3]
* Sprrrint — biblioteca de 300+ componentes e templates Framer/Figma + gradients.[4]
* Logo Sprints — packs visuais para abertura de marca.[5]
SOP Framer em 4h:

1. Duplicar template Sprint no espaço reidasvendas
1. Substituir tokens (cor/fonte/logo) no Theme
1. CMS: criar Coleções (Cases, Serviços, FAQ, Blog)
1. Plugins essenciais: Google Analytics · Google Tag Manager · WhatsApp float · Trustpilot · Loom embed
1. SEO: meta por página + schema LocalBusiness via Custom Code
1. Publicar em subdomínio.framer.website → apontar domínio do cliente
## 4. Sprint — método (não só template)

Design Sprint reidasvendas de 5 dias (inspirado no GV Sprint):

* D1 Map — dor, jornada, KPI principal
* D2 Sketch — wireframes de cada seção em papel/Figma
* D3 Decide — storyboard aprovado
* D4 Prototype — build em Aura/Framer/Next
* D5 Test — 5 usuários + ajuste final + publicação
Usado em projetos Elite R$34k. Para Premium R$18k, comprimimos em Sprint de 48h (ver Operação 50 sites/dia).

## 5. 3D na web — React Three Fiber + drei + Spline

Quando usar: hero imersivo, configurador de produto, marca de luxo, tech/SaaS futurista.

Stack padrão:

```bash
npx create-next-app@latest piola-3d --typescript --tailwind --app
npm i three @react-three/fiber @react-three/drei leva
```

Componentes-chave: <Canvas> · <OrbitControls> · <Environment preset="studio"> · <Float> · <useGLTF> · <ScrollControls>.

Alternativa no-code: Spline (spline.design) → export como iframe ou @splinetool/react-spline para Next.js. Ideal para vender 3D em ticket R$18k+ sem virar dev 3D.

Boas práticas de performance:

* Modelos em .glb comprimido com Draco
* Lazy-load do <Canvas> via dynamic(() => import('./Scene'), { ssr: false })
* Respeitar prefers-reduced-motion
* Fallback 2D em mobile
## 6. Next.js 15 — stack oficial reidasvendas

Setup padrão:

```bash
pnpm create next-app@latest piola-site --ts --tailwind --app --eslint
cd piola-site
pnpm dlx shadcn@latest init
pnpm add framer-motion lucide-react next-themes zod
```

Estrutura de pastas:

```javascript
app/
  (marketing)/
    page.tsx           # home
    sobre/page.tsx
    servicos/[slug]/page.tsx
    cases/[slug]/page.tsx
  api/
    lead/route.ts      # POST → Notion/CRM
  layout.tsx
components/
  ui/                  # shadcn
  sections/            # hero, cta, faq...
lib/
  analytics.ts         # GA4, Meta Pixel, TikTok
  schema.ts            # zod
content/               # MDX cases
```

Best practices 2025:

* React Server Components como default, "use client" só onde precisa
* ISR para páginas de case/blog (export const revalidate = 3600)
* Edge functions para formulários e webhooks
* Partial Prerendering nas páginas híbridas
* Image com AVIF/WebP automático
* Metadata API por página
* Turbopack no dev (next dev --turbo)
## 7. Deploy na Vercel (produção)

Fluxo zero-config:

1. git init && git remote add origin git@github.com:reidasvendas/<cliente>.git
1. git push -u origin main
1. vercel.com → Import Project → escolhe o repo
1. Env vars (Settings → Environment Variables):
1. Domínio customizado → reidasvendas.com.br + clientes em subdomínio ou domínio próprio
1. Preview Deployments automáticos em cada PR
1. Analytics + Speed Insights habilitados
GitHub Actions opcional (CI/CD):

```yaml
name: Vercel Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint && pnpm build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: $ secrets.VERCEL_TOKEN 
          vercel-org-id: $ secrets.ORG_ID 
          vercel-project-id: $ secrets.PROJECT_ID 
          vercel-args: --prod
```

## 8. Stack comparativa — quando usar o quê

## 9. Playbook de migração (cliente vem de Wix/WordPress)

1. Auditoria técnica: Lighthouse + screaming frog + export de páginas
1. Mapa de redirects 301 (old-url → new-url)
1. Preservar URLs canônicas de conteúdo que rankeia
1. Migrar schema + meta + sitemap
1. DNS: apontar A/CNAME para Vercel, AAAA opcional
1. Pós-deploy: Search Console → Submit new sitemap + solicitar indexação das top 20 páginas