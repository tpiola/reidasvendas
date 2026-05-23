import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { applySeo } from '@/lib/seo';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadForm } from '@/components/LeadForm';
import { Reveal } from '@/components/Reveal';
import { BRAND } from '@/lib/brand';
import { HERO_POSTER, NICHE_PHOTOS } from '@/lib/media';

const SPRING = { type: 'spring' as const, stiffness: 80, damping: 20 };
const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  { num: '01', title: 'Raio-X', desc: 'Mergulhamos na sua operação como sócio — não como fornecedor distante.' },
  { num: '02', title: 'Rota', desc: 'Funil, mensagem e canais desenhados para o cliente que você quer atrair.' },
  { num: '03', title: 'Obra', desc: 'Site rápido, integrações limpas e experiência que passa confiança.' },
  { num: '04', title: 'Ritmo', desc: 'Automação e IA cuidando do follow-up enquanto você cuida do negócio.' },
] as const;

const STATS = [
  { value: '347+', label: 'Operações que já passaram por nós' },
  { value: '72h', label: 'Para primeira versão no ar' },
  { value: '4.8×', label: 'Retorno médio reportado' },
  { value: '0', label: 'Meses de fidelidade obrigatória' },
] as const;

const NICHES = [
  { title: 'Clínicas & Estética', img: NICHE_PHOTOS.saude, to: '/saude' },
  { title: 'Restaurantes & Bares', img: NICHE_PHOTOS.restaurante, to: '/projetos' },
  { title: 'Lojas & Varejo', img: NICHE_PHOTOS.comercio, to: '/projetos' },
  { title: 'Serviços & B2B', img: NICHE_PHOTOS.servicos, to: '/negocios' },
  { title: 'Imobiliário', img: NICHE_PHOTOS.imobiliaria, to: '/projetos' },
  { title: 'Academias & Studios', img: NICHE_PHOTOS.academia, to: '/projetos' },
] as const;

const TECH_STACK = [
  'GOOGLE ADS',
  'META ADS',
  'GA4',
  'N8N',
  'VERCEL',
  'OPENAI',
  'WHATSAPP API',
  'STRIPE',
  'SUPABASE',
  'HOTJAR',
];

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, delay = 0 }: { value: string; delay?: number }) {
  const [display, setDisplay] = useState('0');
  const num = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  const isDecimal = value.includes('.');

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 1600;
      const step = 16;
      const increment = num / (duration / step);
      const interval = setInterval(() => {
        start += increment;
        if (start >= num) {
          clearInterval(interval);
          setDisplay(value);
        } else {
          const formatted = isDecimal ? start.toFixed(1) : Math.floor(start).toString();
          setDisplay(formatted + suffix);
        }
      }, step);
      return () => clearInterval(interval);
    }, delay * 1000 + 600);
    return () => clearTimeout(timer);
  }, [value, num, suffix, delay, isDecimal]);

  return <span>{display}</span>;
}

/* ─── Niche Card ─── */
function NicheCard({ title, img, to, i }: { title: string; img: string; to: string; i: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className="group relative overflow-hidden cursor-pointer bg-[#0A0A0B]"
      style={{ aspectRatio: '4/3' }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...SPRING, delay: i * 0.07 }}
    >
      <img
        src={img}
        alt={`${title} — Rei das Vendas`}
        width={1200}
        height={900}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
        loading={i < 2 ? 'eager' : 'lazy'}
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/10 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <h3 className="text-sm font-bold tracking-widest uppercase text-white/90 group-hover:text-white transition-colors">{title}</h3>
        <Link to={to} className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-[#C9A84C] transition-colors duration-300">
          Ver solução
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>
    </motion.article>
  );
}

/* ─── Inline Video ─── */
function InlineVideo({ src, poster, caption }: { src: string; poster?: string; caption: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div className="video-section-wrapper shadow-2xl shadow-black/80">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        crossOrigin="anonymous"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="video-overlay-gradient" />
      {caption && (
        <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0057FF] animate-pulse" />
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">{caption}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Floating Orbs Background ─── */
function AmbientOrbs() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #0057FF, transparent 70%)' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[40%] -right-[5%] w-[400px] h-[400px] rounded-full opacity-12 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }}
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      <motion.div
        className="absolute -bottom-[10%] left-[30%] w-[500px] h-[300px] rounded-full opacity-10 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #0057FF, transparent 70%)' }}
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
      />
    </div>
  );
}

/* ─── Scroll Progress Indicator ─── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#0057FF] origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.04]);

  useEffect(() => {
    applySeo({
      title: 'Rei das Vendas — Seu negócio vendendo como as gigantes | Franca-SP',
      description:
        'Site, funil, WhatsApp e automação para negócios locais que cansaram de depender só de indicação. Diagnóstico gratuito em 24h.',
      canonicalPath: '/',
    });
  }, []);

  return (
    <main className="bg-[#030305] overflow-x-hidden">
      <ScrollProgress />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen isolate overflow-hidden">
        {/* Parallax BG */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 parallax-bg">
          <HeroVideo />
        </motion.div>

        {/* Ambient orbs */}
        <AmbientOrbs />

        {/* Horizontal grid lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
          aria-hidden
        />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-36 text-center"
        >
          {/* Badge */}
          <Reveal>
            <motion.div
              className="mb-10 inline-flex items-center gap-3 border border-[#C9A84C]/25 bg-[#C9A84C]/[0.06] px-5 py-2.5 backdrop-blur-sm"
              whileHover={{ borderColor: 'rgba(201,168,76,0.45)', backgroundColor: 'rgba(201,168,76,0.1)' }}
              transition={{ duration: 0.3 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/85">
                Franca-SP · Conversa real · Resposta em 24h
              </span>
            </motion.div>
          </Reveal>

          {/* Main headline */}
          <div className="max-w-5xl">
            <Reveal delay={0.06}>
              <h1 className="text-display font-semibold text-white">
                <motion.span
                  className="block text-gradient-gold"
                  initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, ease: EASE_LUXURY, delay: 0.15 }}
                >
                  Seu negócio local
                </motion.span>
                <motion.span
                  className="block text-gradient-titanium"
                  initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, ease: EASE_LUXURY, delay: 0.28 }}
                >
                  vendendo como
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, ease: EASE_LUXURY, delay: 0.4 }}
                >
                  as gigantes.
                </motion.span>
              </h1>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/55 md:text-xl">
              Colocamos site, WhatsApp e automação na mesma mesa — para você atrair o cliente certo,
              responder no timing certo e parar de depender só de sorte ou indicação.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.26}>
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/contato"
                className="btn-glow group inline-flex h-14 items-center justify-center px-12 text-[11px] font-bold uppercase tracking-[0.28em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Agendar diagnóstico gratuito
              </Link>
              <Link
                to="/projetos"
                className="btn-ghost inline-flex h-14 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.28em] text-white/75 hover:text-white"
              >
                Ver Projetos
              </Link>
            </div>
          </Reveal>

          {/* Trust indicators */}
          <Reveal delay={0.35}>
            <div className="mt-14 flex items-center gap-6 text-center">
              {[
                { value: '72h', label: '1ª versão' },
                { value: '4.8×', label: 'Retorno médio' },
                { value: '24h', label: 'Resposta humana' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <span className="text-xl font-bold text-white/90 tracking-tight">{item.value}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">{item.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          >
            <div className="w-5 h-9 rounded-full border border-white/15 flex items-start justify-center pt-2">
              <div className="w-0.5 h-2 rounded-full bg-white/35" />
            </div>
            <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-white/25">Scroll</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ LOGOS / SOCIAL PROOF ═══ */}
      <section className="border-y border-white/[0.04] bg-[#08080B] py-12 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#08080B] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#08080B] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center min-w-max shrink-0">
              {TECH_STACK.map((logo) => (
                <span key={logo} className="mx-10 text-[10px] font-bold tracking-[0.3em] text-white/12 hover:text-white/35 transition-colors duration-300 cursor-default whitespace-nowrap">
                  {logo}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="section-white py-24 md:py-36 relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="text-center md:text-left md:border-l border-black/[0.06] md:pl-8 pb-8 md:pb-0">
                  <div className="stat-number text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-[#0A0A0B] tracking-tight">
                    <AnimatedCounter value={s.value} delay={i * 0.1} />
                  </div>
                  <div className="mt-1.5 h-[2px] w-8 bg-[#0057FF]/40 mb-3" />
                  <p className="text-sm text-[#0A0A0B]/45 leading-snug">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MANIFESTO + VIDEO ═══ */}
      <section className="bg-[#030305] py-32 md:py-48 overflow-hidden relative">
        <AmbientOrbs />
        <div className="relative mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16 md:gap-28 items-center">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/25">Manifesto</span>
            <h2 className="mt-5 text-heading font-semibold text-white">
              Não vendemos “site bonito”.<br />
              <span className="text-gradient-titanium">Montamos máquina</span><br />
              de venda previsível.
            </h2>
            <div className="mt-6 h-[1px] w-full max-w-sm bg-gradient-to-r from-[#C9A84C]/50 to-transparent" />
            <p className="mt-6 text-base leading-relaxed text-white/45 max-w-md">
              Página certa, mensagem certa, follow-up no momento certo. É assim que negócio local deixa de competir no preço e passa a competir em presença.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-12 bg-[#0057FF]/60" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0057FF]/70">Ciência da Performance</span>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#0057FF]/5 blur-2xl rounded-3xl" />
              <InlineVideo
                src={BRAND.inlineVideos.manifesto}
                poster={HERO_POSTER}
                caption="Operação digital · ativa 24h"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PILARES ═══ */}
      <section className="section-white py-28 md:py-44">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center mb-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0A0A0B]/30">Metodologia</span>
            <h2 className="mt-4 text-heading font-semibold text-[#0A0A0B]">
              Quatro passos.<br />
              <span className="text-gradient-gold">Sem enrolação.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-black/[0.06]">
            {PILLARS.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.09}>
                <div className="pillar-card group relative h-full bg-white border-r border-black/[0.06] p-8 last:border-r-0 transition-all duration-400 hover:bg-[#F0F4FF]">
                  <div className="text-[10px] font-bold tracking-[0.32em] text-[#0057FF]/50 mb-5">{p.num}</div>
                  <h3 className="text-xl font-bold text-[#0A0A0B] mb-3">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-[#0A0A0B]/50">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VIDEO STATEMENT ═══ */}
      <section className="relative bg-[#030305] py-32 md:py-48 overflow-hidden">
        <AmbientOrbs />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/22">Performance em tempo real</span>
            <h2 className="mt-4 text-heading font-semibold text-white">
              Enquanto você atende,<br />
              <span className="text-gradient-titanium">o sistema não esquece ninguém.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-8 bg-[#0057FF]/4 blur-3xl rounded-3xl" />
              <InlineVideo
                src={BRAND.inlineVideos.performance}
                poster={HERO_POSTER}
                caption="Marca em movimento · presença premium"
              />
            </div>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                tag: 'Velocidade',
                title: 'No ar em 72h',
                desc: 'Primeira versão publicada rápido — para você testar mercado, não esperar reunião de alinhamento eterna.',
              },
              {
                tag: 'Integração',
                title: 'Tudo conversando',
                desc: 'WhatsApp, formulário, CRM e métricas no mesmo fluxo. Menos planilha, mais venda.',
              },
              {
                tag: 'Clareza',
                title: 'Número que importa',
                desc: 'Você vê de onde veio o lead e o que virou oportunidade — sem dashboard que ninguém abre.',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.09}>
                <div className="card-dark group p-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/70">
                    {item.tag}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-white mb-2.5">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NICHES ═══ */}
      <section className="section-white py-28 md:py-44">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0A0A0B]/30">Segmentos</span>
            <h2 className="mt-4 text-heading font-semibold text-[#0A0A0B]">
              O cliente que você quer<br />
              <span className="text-gradient-gold">já está online.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NICHES.map((n, i) => (
              <NicheCard key={n.title} title={n.title} img={n.img} to={n.to} i={i} />
            ))}
          </div>
          <Reveal delay={0.3} className="mt-14 flex justify-center">
            <Link
              to="/projetos"
              className="btn-ghost inline-flex h-12 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0A0A0B] border border-black/15 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
            >
              Ver todos os projetos
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══ FINAL CTA / LEAD ═══ */}
      <section className="relative bg-[#030305] py-32 md:py-48 overflow-hidden">
        {/* Background radial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,87,255,0.14)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,168,76,0.05)_0%,transparent_50%)]" />
        <AmbientOrbs />

        <div className="relative mx-auto max-w-6xl px-6 grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0057FF]/60">Diagnóstico gratuito</span>
              <h2 className="mt-5 text-heading font-semibold text-white">
                Pronto para o<br />
                <span className="text-gradient-titanium">próximo nível?</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/40">
                Conte onde você está hoje. Devolvemos rota, escopo e próximo passo — em linguagem de gente, não de slide corporativo.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <div className="space-y-4">
                {[
                  'Diagnóstico em 24h',
                  'Proposta personalizada',
                  'Sem compromisso',
                  'Sem contrato de fidelidade',
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: EASE_LUXURY }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#0057FF]/15 border border-[#0057FF]/30 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0057FF]" />
                    </div>
                    <span className="text-sm text-white/50">{item}</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2} className="mt-8 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#0057FF]/25 to-[#0057FF]/50" />
                <span className="altiq-serif text-2xl text-[#0057FF]/50">→</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="md:col-span-7">
            <div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden">
              {/* Card top accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0057FF]/40 to-transparent" />
              <LeadForm
                source="hero"
                title="Relatório de Inteligência Estratégica"
                description="Dados, análises e insights de infraestrutura digital para líderes e tomadores de decisão."
                ctaLabel="Quero meu diagnóstico gratuito"
                context={{ intent: 'diagnostico' }}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
