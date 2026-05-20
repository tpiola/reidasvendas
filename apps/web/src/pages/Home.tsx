import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { applySeo } from '@/lib/seo';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadForm } from '@/components/LeadForm';
import { Reveal } from '@/components/Reveal';

const SPRING = { type: 'spring' as const, stiffness: 80, damping: 20 };
const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  { num: '01', title: 'Raio-X', desc: 'Entendemos seu negócio como se fosse nosso.' },
  { num: '02', title: 'Estratégia', desc: 'Desenhamos o caminho mais curto até a venda.' },
  { num: '03', title: 'Criação', desc: 'Site, app ou sistema sob medida para você.' },
  { num: '04', title: 'Aceleração', desc: 'IA testando e otimizando 24h por dia.' },
] as const;

const STATS = [
  { value: 'R$50M+', label: 'Faturados pelos clientes' },
  { value: '347', label: 'Negócios transformados' },
  { value: '72h', label: 'Para primeira venda' },
  { value: '4.8x', label: 'Retorno médio' },
] as const;

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&h=900&q=90&fm=webp`;

const NICHES = [
  { title: 'Clínicas & Consultórios', img: IMG('photo-1576091160550-2173dba999ef'), to: '/saude' },
  { title: 'Restaurantes & Bares', img: IMG('photo-1517248135467-4c7edcad34c4'), to: '/projetos' },
  { title: 'Lojas & Comércios', img: IMG('photo-1441986300917-64674bd600d8'), to: '/projetos' },
  { title: 'Prestadores de Serviço', img: IMG('photo-1552664730-d307ca884978'), to: '/negocios' },
  { title: 'Imobiliárias', img: IMG('photo-1560518883-ce09059eeffa'), to: '/projetos' },
  { title: 'Academias & Studios', img: IMG('photo-1534438327276-14e5300c3a48'), to: '/projetos' },
] as const;

const TECH_STACK = ['STRIPE', 'VERCEL', 'GOOGLE CLOUD', 'CLOUDFLARE', 'HUBSPOT', 'MAILCHIMP', 'HOTJAR', 'META ADS', 'GOOGLE ADS', 'ANALYTICS'];

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
      <div className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/8 transition-colors duration-500" />
      {/* Bottom accent line */}
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
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
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
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[40%] -right-[5%] w-[400px] h-[400px] rounded-full opacity-12 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #F0D080, transparent 70%)' }}
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      <motion.div
        className="absolute -bottom-[10%] left-[30%] w-[500px] h-[300px] rounded-full opacity-10 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }}
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
      title: 'Rei das Vendas — Infraestrutura Digital que Converte | Franca-SP',
      description: 'Transforme visitantes em clientes com site, funil e automação n8n. Diagnóstico gratuito, entrega em 48h e ROI mensurável.',
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
              className="mb-10 inline-flex items-center gap-3 border border-[#C9A84C]/20 bg-[#C9A84C]/[0.05] px-5 py-2.5 backdrop-blur-sm"
              whileHover={{ borderColor: 'rgba(201,168,76,0.4)', backgroundColor: 'rgba(201,168,76,0.08)' }}
              transition={{ duration: 0.3 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">
                Mentoria gratuita · Agende agora
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
              Sites, apps e inteligência artificial trabalhando juntos para você vender mais, atrair os clientes certos e multiplicar seu faturamento.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.26}>
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2TqG8F1P_H7GvVQ2OzjYXmFQxoQrGw3ZqKjKXVG8qMJyKxXqKfVG8qMJyKxXqKf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold group inline-flex h-14 items-center justify-center px-12 text-[11px] font-bold uppercase tracking-[0.28em] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
              >
                Agendar mentoria grátis
              </a>
              <Link
                to="/projetos"
                className="btn-ghost inline-flex h-14 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.28em] text-white/75 hover:text-white"
              >
                Ver resultados reais
              </Link>
            </div>
          </Reveal>

          {/* Trust indicators */}
          <Reveal delay={0.35}>
            <div className="mt-14 flex items-center gap-8 text-center">
              {[
                { value: 'R$50M+', label: 'Faturados pelos clientes' },
                { value: '347', label: 'Negócios transformados' },
                { value: '4.8x', label: 'Retorno médio' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <span className="text-xl font-bold text-gradient-gold tracking-tight">{item.value}</span>
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
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/60">Por que somos diferentes</span>
            <h2 className="mt-5 text-heading font-semibold text-white">
              Chega de investir<br />
              <span className="text-gradient-gold">e não ver retorno.</span>
            </h2>
            <div className="mt-6 h-[1px] w-full max-w-sm bg-gradient-to-r from-[#C9A84C]/40 to-transparent" />
            <p className="mt-6 text-base leading-relaxed text-white/45 max-w-md">
              Você já teve site que não aparece no Google. Redes sociais que ninguém vê. Anúncios que só gastam. Com a gente é diferente: a inteligência artificial testa dezenas de comunicações até encontrar a que mais vende pro seu público.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-12 bg-[#C9A84C]/60" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9A84C]/70">IA que aprende e vende</span>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#C9A84C]/5 blur-2xl rounded-3xl" />
              <InlineVideo src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" caption="Tecnologia que trabalha por você" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PILARES ═══ */}
      <section className="section-white py-28 md:py-44">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center mb-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0A0A0B]/30">Como funciona</span>
            <h2 className="mt-4 text-heading font-semibold text-[#0A0A0B]">
              Simples assim.<br />
              <span className="text-gradient-gold">Quatro passos.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-black/[0.06]">
            {PILLARS.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.09}>
                <div className="pillar-card group relative h-full bg-white border-r border-black/[0.06] p-8 last:border-r-0 transition-all duration-400 hover:bg-[#FFF9E6]">
                  <div className="text-[10px] font-bold tracking-[0.32em] text-[#C9A84C]/70 mb-5">{p.num}</div>
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
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/50">O que entregamos</span>
            <h2 className="mt-4 text-heading font-semibold text-white">
              Site + App + IA{' '}
              <span className="text-gradient-gold">trabalhando juntos.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-8 bg-[#C9A84C]/4 blur-3xl rounded-3xl" />
              <InlineVideo src="https://videos.pexels.com/video-files/5377684/5377684-uhd_2560_1440_25fps.mp4" caption="Sua marca no próximo nível" />
            </div>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { icon: '🌐', title: 'Sites que Vendem', desc: 'Não é só bonito. É feito pra converter visitante em cliente.' },
              { icon: '📱', title: 'Apps Sob Medida', desc: 'Seu negócio na palma da mão do cliente. Simples de usar.' },
              { icon: '🤖', title: 'IA que Otimiza', desc: 'Testa comunicações, encontra seu público e vende mais.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.09}>
                <div className="card-dark group p-8">
                  <div className="text-2xl mb-5">{item.icon}</div>
                  <h3 className="text-base font-bold text-white mb-2.5">{item.title}</h3>
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
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0A0A0B]/30">Quem atendemos</span>
            <h2 className="mt-4 text-heading font-semibold text-[#0A0A0B]">
              Negócios locais<br />
              <span className="text-gradient-gold">que querem crescer.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NICHES.map((n, i) => (
              <NicheCard key={n.title} title={n.title} img={n.img} to={n.to} i={i} />
            ))}
          </div>
          <Reveal delay={0.3} className="mt-14 flex justify-center">
            <a
              href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2TqG8F1P_H7GvVQ2OzjYXmFQxoQrGw3ZqKjKXVG8qMJyKxXqKfVG8qMJyKxXqKf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex h-12 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.22em] text-black transition-all duration-300"
            >
              Agendar mentoria grátis
            </a>
          </Reveal>
        </div>
      </section>

      {/* ═══ FINAL CTA / LEAD ═══ */}
      <section className="relative bg-[#030305] py-32 md:py-48 overflow-hidden">
        {/* Background radial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(201,168,76,0.14)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,168,76,0.08)_0%,transparent_50%)]" />
        <AmbientOrbs />

        <div className="relative mx-auto max-w-6xl px-6 grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/60">Bora conversar?</span>
              <h2 className="mt-5 text-heading font-semibold text-white">
                30 minutos que podem<br />
                <span className="text-gradient-gold">mudar tudo.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/40">
                Na mentoria gratuita, analisamos seu negócio e mostramos exatamente onde você está deixando dinheiro na mesa. Sem enrolação.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <div className="space-y-4">
                {[
                  'Mentoria 1:1 gratuita',
                  'Análise real do seu negócio',
                  'Plano de ação personalizado',
                  'Sem compromisso de compra',
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: EASE_LUXURY }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    </div>
                    <span className="text-sm text-white/50">{item}</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2} className="mt-8 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-[#C9A84C]/50" />
                <span className="altiq-serif text-2xl text-[#C9A84C]/50">→</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="md:col-span-7">
            <div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden">
              {/* Card top accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
              <LeadForm
                source="hero"
                title="Agende sua Mentoria"
                description="Conte um pouco sobre seu negócio e entraremos em contato."
                ctaLabel="Quero minha mentoria grátis"
                context={{ intent: 'mentoria' }}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
