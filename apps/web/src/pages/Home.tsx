import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { applySeo } from '@/lib/seo';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadForm } from '@/components/LeadForm';
import { Reveal } from '@/components/Reveal';

const SPRING = { type: 'spring' as const, stiffness: 90, damping: 22 };

const PILLARS = [
  { num: '01', title: 'Diagnose', desc: 'Análise cirúrgica da operação. Identificamos gargalos antes de tocar em uma linha de código.' },
  { num: '02', title: 'Arquitetura', desc: 'Estrutura de páginas, funis e mensuração desenhados para conversão.' },
  { num: '03', title: 'Construção', desc: 'Implementação modular com performance e UX de nível enterprise.' },
  { num: '04', title: 'Ativação', desc: 'n8n, WhatsApp, CRM e e-mail em harmonia. Seu lead qualificado, 24/7.' },
] as const;

const STATS = [
  { value: '97%', label: 'Taxa de retenção de clientes' },
  { value: '4.8×', label: 'ROI médio em 6 meses' },
  { value: '48h', label: 'Primeira entrega em produção' },
  { value: '100%', label: 'Sem contrato de fidelidade' },
] as const;

const NICHES = [
  { title: 'Saúde & Estética', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=85' },
  { title: 'Advocacia', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=85' },
  { title: 'Imobiliário', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=85' },
  { title: 'E-commerce', img: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=85' },
  { title: 'Consultoria', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=85' },
  { title: 'Educação', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=85' },
] as const;

function NicheCard({ title, img, i }: { title: string; img: string; i: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...SPRING, delay: i * 0.08 }}
    >
      <img src={img} alt={title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-[#0057FF]/0 group-hover:bg-[#0057FF]/10 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <h3 className="text-sm font-semibold tracking-widest uppercase text-white/90">{title}</h3>
      </div>
    </motion.article>
  );
}

function InlineVideo({ src, poster, caption }: { src: string; poster?: string; caption: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div className="video-section-wrapper shadow-2xl shadow-black/60">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="video-overlay-gradient" />
      {caption && (
        <div className="absolute bottom-4 left-6 right-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{caption}</p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    applySeo({
      title: 'Rei das Vendas — A Ciência da Performance para o Crescimento do seu Negócio',
      description: 'Infraestrutura digital de elite. Entregamos tecnologia das maiores empresas do mundo com foco em resultado real para líderes e instituições.',
      canonicalPath: '/',
    });
  }, []);

  return (
    <main className="bg-[#050505] overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen isolate overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 parallax-bg">
          <HeroVideo />
        </motion.div>
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-32 text-center"
        >
          <Reveal>
            <span className="mb-8 inline-block border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 backdrop-blur-sm">
              Engenharia de Resultados · Franca, SP
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-display font-semibold text-white max-w-4xl">
              <span className="text-gradient-titanium">A Solução Completa Digital</span>
              <br />
              para Líderes e Instituições.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
              Instalamos infraestrutura inabalável. A mesma tecnologia das maiores empresas do mundo — agora acessível para o seu negócio.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/contato"
                className="btn-glow inline-flex h-14 items-center justify-center rounded-none px-12 text-[11px] font-bold uppercase tracking-[0.25em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Comece Agora
              </Link>
              <Link
                to="/projetos"
                className="inline-flex h-14 items-center justify-center border border-white/20 px-10 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80 transition-all hover:border-white/40 hover:text-white"
              >
                Ver Projetos
              </Link>
            </div>
          </Reveal>
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2">
              <div className="w-1 h-2 rounded-full bg-white/40" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ LOGOS / SOCIAL PROOF ═══ */}
      <section className="border-y border-white/5 bg-[#0A0A0B] py-10 overflow-hidden">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center min-w-max shrink-0">
              {['GOOGLE CLOUD', 'VERCEL', 'OPENAI', 'STRIPE', 'N8N', 'CLOUDFLARE', 'SUPABASE', 'FIREBASE'].map((logo) => (
                <span key={logo} className="mx-10 text-[11px] font-bold tracking-[0.28em] text-white/15 hover:text-white/40 transition-colors cursor-default whitespace-nowrap">
                  {logo}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="section-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="text-center md:text-left border-b md:border-b-0 md:border-l border-black/8 md:pl-8 pb-8 md:pb-0 last:border-b-0">
                  <div className="stat-number text-4xl md:text-5xl font-bold text-[#0A0A0B] tracking-tight">{s.value}</div>
                  <p className="mt-2 text-sm text-[#0A0A0B]/50 leading-snug">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MANIFESTO + VIDEO ═══ */}
      <section className="bg-[#050505] py-28 md:py-40 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Manifesto</span>
            <h2 className="mt-5 text-heading font-semibold text-white">
              Não somos uma agência.<br />
              <span className="text-gradient-titanium">Somos engenheiros</span><br />
              de crescimento.
            </h2>
            <p className="mt-7 text-base leading-relaxed text-white/50 max-w-md">
              Enquanto agências entregam sites bonitos, nós construímos sistemas que pensam, automatizam e convertem. A diferença está na governança.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-12 bg-[#0057FF]/60" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0057FF]/80">Ciência da Performance</span>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <InlineVideo
              src="https://cdn.coverr.co/videos/coverr-working-at-night-5178/1080p.mp4"
              caption="Infraestrutura em operação · 24/7"
            />
          </Reveal>
        </div>
      </section>

      {/* ═══ PILARES ═══ */}
      <section className="section-white py-28 md:py-40">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center mb-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0A0A0B]/30">Metodologia</span>
            <h2 className="mt-4 text-heading font-semibold text-[#0A0A0B]">
              Quatro fases.<br />
              <span className="text-gradient-gold">Um resultado.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PILLARS.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.09}>
                <div className="group relative h-full bg-white border border-black/6 p-8 transition-shadow hover:shadow-xl hover:shadow-black/8">
                  <div className="text-[10px] font-bold tracking-[0.3em] text-[#0057FF]/50 mb-4">{p.num}</div>
                  <h3 className="text-xl font-bold text-[#0A0A0B] mb-3">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-[#0A0A0B]/55">{p.desc}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0057FF]/0 group-hover:bg-[#0057FF]/60 transition-all duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VIDEO STATEMENT ═══ */}
      <section className="relative bg-[#050505] py-28 md:py-40 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25">Performance em tempo real</span>
            <h2 className="mt-4 text-heading font-semibold text-white">
              Tecnologia que <span className="text-gradient-titanium">trabalha enquanto você dorme.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <InlineVideo
              src="https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-at-night-7780/1080p.mp4"
              caption="Automação e inteligência artificial · Ativos 24h"
            />
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Deploy em Horas', desc: 'Não semanas. Seu site no ar e convertendo dentro de 48 horas.' },
              { icon: '🔗', title: 'Integração Total', desc: 'WhatsApp, CRM, e-mail e analytics em um ecossistema unificado.' },
              { icon: '📊', title: 'Dados em Tempo Real', desc: 'Dashboards auditáveis com clareza cirúrgica sobre o que converte.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="border border-white/6 p-8 bg-white/[0.02]">
                  <div className="text-2xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NICHES ═══ */}
      <section className="section-white py-28 md:py-40">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0A0A0B]/30">Segmentos</span>
            <h2 className="mt-4 text-heading font-semibold text-[#0A0A0B]">
              Seu mercado.<br />
              <span className="text-gradient-gold">Nossa especialidade.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NICHES.map((n, i) => (
              <NicheCard key={n.title} title={n.title} img={n.img} i={i} />
            ))}
          </div>
          <Reveal delay={0.3} className="mt-14 flex justify-center">
            <Link
              to="/projetos"
              className="inline-flex h-12 items-center justify-center border border-black/15 px-10 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A0A0B] transition-all hover:bg-black hover:text-white hover:border-black"
            >
              Ver todos os projetos
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══ FINAL CTA / LEAD ═══ */}
      <section className="relative bg-[#050505] py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,87,255,0.12)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl px-6 grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0057FF]/70">Diagnóstico gratuito</span>
              <h2 className="mt-5 text-heading font-semibold text-white">
                Pronto para o<br />
                <span className="text-gradient-titanium">próximo nível?</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/45">
                Envie seus dados. Receba proposta, próximos passos e um plano orientado por métricas — sem compromisso.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#0057FF]/30 to-[#0057FF]/60" />
                <span className="altiq-serif text-2xl text-[#0057FF]/60">→</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="md:col-span-7">
            <div className="glass-card rounded-2xl p-8 md:p-10">
              <LeadForm
                source="hero"
                title="Relatório de Inteligência Estratégica"
                description="Dados, análises e insights de infraestrutura digital para líderes e tomadores de decisão."
                ctaLabel="Quero Meu Diagnóstico"
                context={{ intent: 'diagnostico' }}
              />
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
