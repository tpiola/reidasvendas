import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { applySeo } from '@/lib/seo';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadForm } from '@/components/LeadForm';
import { Reveal } from '@/components/Reveal';
import { BRAND } from '@/lib/brand';

// ─── Static data (outside component — stable references, no re-renders) ───
const GOVERNANCE = [
  { title: 'Distância Estratégica', desc: 'Visão macro do negócio, sem microgerenciamento. A tecnologia opera, você lidera.' },
  { title: 'Transparência Total', desc: 'Dashboards limpos, dados auditáveis e rastreabilidade ponta a ponta.' },
  { title: 'Rigor de Campo', desc: 'Testes exaustivos e execução impecável. O que vai para o ar, funciona.' },
  { title: 'Escala Humana', desc: 'Automação que não soa robótica. Preservamos a empatia em cada ponto de contato.' }
] as const;
const TEMPLATES = [
  { id: '1', title: 'Saúde & Estética', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80' },
  { id: '2', title: 'Advocacia', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80' },
  { id: '3', title: 'Imobiliário', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80' },
  { id: '4', title: 'E-commerce', img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80' },
  { id: '5', title: 'Consultoria', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80' },
  { id: '6', title: 'Educação', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80' },
] as const;

// ─── Spring physics config ───
const SPRING = { type: 'spring' as const, stiffness: 100, damping: 20 };

// ─── TemplateCard: isolated component to keep renders deterministic ───
function TemplateCard({ title, img, delay = 0 }: { title: string; img: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl bg-white/[0.02] aspect-[4/3] cursor-pointer"
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...SPRING, delay }}
    >
      <img 
        src={img} 
        alt={title} 
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center">
        <span className="bg-white text-black px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          Preview
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-sm font-semibold tracking-wide text-white">{title}</h3>
      </div>
    </motion.article>
  );
}

// ─── Home Page ───
export default function Home() {
  // Single effect, empty deps — fires once, no loops
  useEffect(() => {
    applySeo({
      title: 'Rei das Vendas — A Ciência da Performance para o Crescimento do seu Negócio',
      description:
        'Democratizando a Inteligência Artificial. Entregamos para o seu negócio a mesma tecnologia das maiores empresas do mundo, com foco em resultado real.',
      canonicalPath: '/',
    });
  }, []);

  return (
    <main className="bg-background">

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section
        className="relative isolate min-h-screen overflow-hidden bg-background"
        aria-labelledby="home-hero"
      >
        <HeroVideo src={BRAND.heroVideoUrl} poster={BRAND.heroPosterUrl} />

        <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center pb-24 pt-32 md:pb-32 md:pt-40">
          <Reveal>
            <h1
              id="home-hero"
              className="font-serif text-5xl font-medium leading-[1.05] tracking-[-0.03em] text-white md:text-7xl lg:text-[5.5rem]"
            >
              <span className="text-gradient-titanium">A Solução Completa Digital</span><br />
              para Líderes e Instituições.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
              Instalamos infraestrutura inabalável. Tecnologia de elite que devolve o seu tempo para o que realmente importa: as pessoas e a estratégia.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center gap-6">
              <Link
                to="/contato"
                className="inline-flex h-14 items-center justify-center bg-white px-12 text-[13px] font-bold uppercase tracking-[0.2em] text-black transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Comece Agora
              </Link>
              <p className="text-[12px] font-medium text-white/50">
                Comece de graça. Não precisa de cartão de crédito.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Bottom fade into next section */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ═══════════════════════ SOCIAL PROOF (MARQUEE) ═══════════════════════ */}
      <section className="border-y border-white/5 bg-background py-10 overflow-hidden flex items-center">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Duplicamos os itens para o efeito de loop infinito */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center justify-around min-w-full">
              {['GOOGLE CLOUD', 'SUPABASE', 'VERCEL', 'STRIPE', 'N8N', 'OPENAI', 'CLOUDFLARE'].map((logo) => (
                <span 
                  key={logo} 
                  className="mx-8 text-xl font-bold tracking-[0.2em] text-white/20 transition-all duration-300 hover:text-white hover:scale-105 cursor-default"
                >
                  {logo}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ DIVIDER ═══════════════════════ */}
      <div className="divider-luxury mx-6" />

      {/* ═══════════════════════ SHOWCASE DE TEMPLATES ═══════════════════════ */}
      <section
        id="templates"
        className="bg-background py-28 md:py-36"
        aria-labelledby="templates-heading"
      >
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center md:text-left">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/30">
              Templates
            </p>
            <h2
              id="templates-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl"
            >
              Comece com um modelo <span className="text-gradient-titanium">premiado.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base text-white/50 leading-relaxed mx-auto md:mx-0">
              Escolha um ponto de partida. Nós customizamos cada detalhe para o seu negócio.
            </p>
          </Reveal>

          {/* Grid de Templates */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((template, i) => (
              <TemplateCard
                key={template.id}
                title={template.title}
                img={template.img}
                delay={i * 0.1}
              />
            ))}
          </div>

          <Reveal delay={0.3} className="mt-16 flex justify-center">
            <Link
              to="/projetos"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white/[0.05] hover:border-white/20"
            >
              Ver todos os modelos
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════ DIVIDER ═══════════════════════ */}
      <div className="divider-luxury mx-6" />

      {/* ═══════════════════════ RECURSOS (Z-PATTERN) ═══════════════════════ */}
      <section className="bg-background py-28 md:py-36 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          
          {/* Feature 1: Imagem na Esquerda, Texto na Direita */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <Reveal className="order-2 md:order-1">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/[0.02] border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
                  alt="Dashboard de Analytics" 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <Reveal className="order-1 md:order-2" delay={0.1}>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-blue">
                Métricas em Tempo Real
              </p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Decisões baseadas em <span className="text-gradient-titanium">dados.</span>
              </h3>
              <p className="mt-6 text-base text-white/50 leading-relaxed">
                Acompanhe cada etapa do seu funil. Desde o primeiro clique até a conversão final, 
                nossa infraestrutura entrega clareza cirúrgica sobre o que está funcionando.
              </p>
            </Reveal>
          </div>

          {/* Feature 2: Texto na Esquerda, Imagem na Direita */}
          <div className="mt-32 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <Reveal>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-blue">
                Automação Inteligente
              </p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                O seu negócio <span className="text-gradient-titanium">no piloto automático.</span>
              </h3>
              <p className="mt-6 text-base text-white/50 leading-relaxed">
                Conecte seu site ao WhatsApp, CRM e e-mail. Quando um lead entra, o sistema 
                qualifica, agenda e notifica sua equipe instantaneamente.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/[0.02] border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&q=80" 
                  alt="Automação de Processos" 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ═══════════════════════ DIVIDER ═══════════════════════ */}
      <div className="divider-luxury mx-6" />

      {/* ═══════════════════════ GOVERNANÇA CORPORATIVA ═══════════════════════ */}
      <section className="bg-background py-28 md:py-36 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center md:text-left">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/30">
              Governança
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-white md:text-5xl">
              Teoria de Ponta. <span className="text-gradient-titanium">Execução de Trincheira.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base text-white/50 leading-relaxed mx-auto md:mx-0">
              Não somos uma agência. Somos engenheiros de crescimento. Nossa governança garante que a tecnologia trabalhe para você, e não o contrário.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {GOVERNANCE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="h-full border-l border-white/10 pl-6 py-2 transition-colors hover:border-brand-blue/50">
                  <h3 className="font-serif text-xl font-medium text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ DIVIDER ═══════════════════════ */}
      <div className="divider-luxury mx-6" />

      {/* ═══════════════════════ LEAD CAPTURE ═══════════════════════ */}
      <section
        id="lead"
        className="relative bg-background py-28 md:py-36 overflow-hidden"
        aria-labelledby="lead-heading"
      >
        {/* Ambient glow behind form */}
        <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[radial-gradient(ellipse,rgba(0,112,243,0.08),transparent_70%)]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-12">

          {/* Left: Copy (F-Pattern — read first) */}
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-blue/80">
                Diagnóstico
              </p>
              <h2
                id="lead-heading"
                className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl"
              >
                Pronto para o{' '}
                <span className="text-gradient-titanium">próximo nível?</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/50">
                Envie seus dados. Você recebe proposta, próximos passos e um plano inicial orientado por métricas — sem compromisso.
              </p>
            </Reveal>

            {/* Eye direction arrow → form */}
            <Reveal delay={0.08}>
              <div className="mt-12 hidden md:flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-blue/30 to-brand-blue/60" />
                <span className="altiq-arrow text-2xl text-brand-blue/70">→</span>
              </div>
            </Reveal>
          </div>

          {/* Right: Form inside glass card */}
          <Reveal delay={0.1} className="md:col-span-7">
            <div className="glass-card rounded-3xl p-8 md:p-10">
              <LeadForm
                source="hero"
                title="Relatórios de Inteligência Estratégica"
                description="Receba dados, análises de mercado e insights de infraestrutura digital focados em líderes e tomadores de decisão."
                ctaLabel="Receber Relatórios"
                context={{ intent: 'relatorio_inteligencia' }}
              />
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
