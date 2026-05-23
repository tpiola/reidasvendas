import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { applySeo } from '@/lib/seo';
import { buildHomeJsonLd } from '@/lib/seo-schema';
import { HOME_SEO } from '@/lib/seo-meta';
import { BRAND } from '@/lib/brand';
import {
  DELIVERY_PILLARS,
  PILLARS_SECTION,
  HOME_FAQ,
  HOME_NICHES,
  HOME_STATS,
  PAIN_POINTS,
  PERFORMANCE_CARDS,
  TECH_STACK,
  TRUST_STATS,
  VIDEO_SHOWCASE,
} from '@/lib/home-content';
import { HERO_POSTER, NICHE_PHOTOS } from '@/lib/media';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadForm } from '@/components/LeadForm';
import { Reveal } from '@/components/Reveal';
import { AnimatedCounter } from '@/components/home/AnimatedCounter';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { InlineVideo } from '@/components/home/InlineVideo';
import { NicheCard } from '@/components/home/NicheCard';
import { SalesHighlightStrip } from '@/components/home/SalesHighlightStrip';
import { HeroScrollCue } from '@/components/home/HeroScrollCue';
import { PillarCard } from '@/components/home/PillarCard';
import { TemplateCatalogSection } from '@/components/home/TemplateCatalogSection';
import { VideoShowcaseGrid } from '@/components/home/VideoShowcaseGrid';
import { BuiltFromScratchBanner } from '@/components/BuiltFromScratchBanner';

const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;

function AmbientOrbs() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #0057FF, transparent 70%)' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[40%] -right-[5%] h-[400px] w-[400px] rounded-full opacity-12 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }}
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-[#0057FF]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.04]);

  useEffect(() => {
    applySeo({
      title: HOME_SEO.title,
      description: HOME_SEO.description,
      canonicalPath: '/',
      jsonLd: buildHomeJsonLd(HOME_FAQ),
    });
  }, []);

  return (
    <main className="overflow-x-hidden bg-[#030305]">
      <ScrollProgress />

      <section ref={heroRef} className="relative isolate min-h-screen overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 parallax-bg">
          <HeroVideo />
        </motion.div>
        <AmbientOrbs />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
          aria-hidden
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-36 text-center"
        >
          <Reveal>
            <Link
              to="/contato"
              className="mb-10 inline-flex items-center gap-3 border border-[#C9A84C]/25 bg-[#C9A84C]/[0.06] px-5 py-2.5 backdrop-blur-sm transition-colors duration-300 hover:border-[#C9A84C]/45 hover:bg-[#C9A84C]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C9A84C]" aria-hidden />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/85">
                Agende agora uma reunião
              </span>
            </Link>
          </Reveal>

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
              Site, WhatsApp e automação na mesma mesa — para atrair o cliente certo e parar de depender só de
              indicação.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                to="/diagnostico"
                className="btn-glow inline-flex h-14 items-center justify-center px-12 text-[11px] font-bold uppercase tracking-[0.28em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Agendar diagnóstico
              </Link>
              <Link
                to="/projetos"
                className="btn-ghost inline-flex h-14 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.28em] text-white/75 hover:text-white"
              >
                Ver projetos
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-14 flex items-center gap-8 text-center">
              {TRUST_STATS.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <span className="text-xl font-bold tracking-tight text-white/90">{item.value}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <HeroScrollCue />
        </motion.div>
      </section>

      <section className="relative overflow-hidden border-y border-white/[0.04] bg-[#08080B] py-12" aria-hidden>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#08080B] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#08080B] to-transparent" />
        <div className="flex animate-marquee">
          {[0, 1].map((row) => (
            <div key={row} className="flex min-w-max shrink-0 items-center">
              {TECH_STACK.map((logo) => (
                <span
                  key={`${row}-${logo}`}
                  className="mx-10 cursor-default whitespace-nowrap text-[10px] font-bold tracking-[0.3em] text-white/12 transition-colors duration-300 hover:text-white/35"
                >
                  {logo}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="section-white relative overflow-hidden py-24 md:py-36" aria-label="Números">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
            {HOME_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="pb-8 text-center md:border-l md:border-black/[0.06] md:pb-0 md:pl-8 md:text-left">
                  <div className="stat-number text-[clamp(2.5rem,5vw,3.5rem)] font-bold tracking-tight text-[#0A0A0B]">
                    <AnimatedCounter value={s.value} delay={i * 0.1} />
                  </div>
                  <div className="mb-3 mt-1.5 h-[2px] w-8 bg-[#0057FF]/40" />
                  <p className="text-sm leading-snug text-[#0A0A0B]/45">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SalesHighlightStrip />

      <section className="relative overflow-hidden bg-[#030305] py-32 md:py-48">
        <AmbientOrbs />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2 md:gap-28">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/25">Manifesto</span>
            <h2 className="mt-5 text-heading font-semibold text-white">
              Não vendemos “site bonito”.
              <br />
              <span className="text-gradient-titanium">Montamos máquina</span>
              <br />
              de venda previsível.
            </h2>
            <div className="mt-6 h-[1px] max-w-sm w-full bg-gradient-to-r from-[#C9A84C]/50 to-transparent" />
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/45">
              Página certa, mensagem certa, follow-up no momento certo. É assim que negócio local deixa de competir no
              preço e passa a competir em presença.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-[#0057FF]/5 blur-2xl" />
              <InlineVideo
                src={BRAND.inlineVideos.manifesto}
                poster={HERO_POSTER}
                caption="Faturamento · operação digital 24h"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/[0.04] bg-[#08080B] py-20 md:py-28" aria-labelledby="pain-heading">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal emphasis className="max-w-xl">
            <h2 id="pain-heading" className="text-heading font-semibold text-white">
              Onde a venda trava
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {PAIN_POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <article className="card-dark border-l-2 border-l-[#C9A84C]/50 p-6">
                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/45">{p.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-white py-28 md:py-40" aria-labelledby="pillars-heading">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal emphasis className="mb-16 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0057FF]/50">
              {PILLARS_SECTION.eyebrow}
            </span>
            <h2 id="pillars-heading" className="mt-4 text-heading font-semibold text-[#0A0A0B]">
              {PILLARS_SECTION.title}
              <span className="text-gradient-gold"> {PILLARS_SECTION.titleAccent}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#0A0A0B]/50 md:text-base">
              {PILLARS_SECTION.subtitle}
            </p>
          </Reveal>
          <div className="grid gap-0 overflow-hidden rounded-sm border border-black/[0.06] md:grid-cols-2 lg:grid-cols-4">
            {DELIVERY_PILLARS.map((p, i) => (
              <PillarCard key={p.num} pillar={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#030305] py-32 md:py-48">
        <AmbientOrbs />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="mb-16 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/22">
              Performance em tempo real
            </span>
            <h2 className="mt-4 text-heading font-semibold text-white">
              Enquanto você atende,
              <br />
              <span className="text-gradient-titanium">o sistema não esquece ninguém.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-8 rounded-3xl bg-[#0057FF]/4 blur-3xl" />
              <InlineVideo
                src={BRAND.inlineVideos.performance}
                poster={HERO_POSTER}
                caption="Lucro e métricas · presença premium"
              />
            </div>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {PERFORMANCE_CARDS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.09}>
                <div className="card-dark group p-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/70">
                    {item.tag}
                  </span>
                  <h3 className="mb-2.5 mt-4 text-base font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/40">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <VideoShowcaseGrid items={VIDEO_SHOWCASE} />

      <TemplateCatalogSection />

      <section className="section-white py-28 md:py-44">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0A0A0B]/30">Segmentos</span>
            <h2 className="mt-4 text-heading font-semibold text-[#0A0A0B]">
              O cliente que você quer
              <br />
              <span className="text-gradient-gold">já está online.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_NICHES.map((n, i) => (
              <NicheCard key={n.title} title={n.title} img={NICHE_PHOTOS[n.imgKey]} to={n.to} index={i} />
            ))}
          </div>
          <Reveal delay={0.3} className="mt-14 flex justify-center">
            <Link
              to="/projetos"
              className="btn-ghost inline-flex h-12 items-center justify-center border border-black/15 px-10 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0A0A0B] transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
            >
              Ver todos os projetos
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="bg-[#08080B] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <BuiltFromScratchBanner variant="dark" />
        </div>
      </section>

      <FaqAccordion items={HOME_FAQ} />

      <section className="relative overflow-hidden bg-[#030305] py-32 md:py-44">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,87,255,0.14)_0%,transparent_65%)]" />
        <AmbientOrbs />
        <div className="relative mx-auto grid max-w-6xl items-start gap-16 px-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="text-heading font-semibold text-white">
                Pronto para o
                <span className="text-gradient-titanium"> próximo nível?</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/40">
                Conte onde você está. Devolvemos rota e próximo passo — sem slide corporativo.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/45">
                <li>Diagnóstico em 24h</li>
                <li>Sem contrato de fidelidade</li>
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="md:col-span-7">
            <div className="glass-card relative overflow-hidden rounded-2xl p-8 md:p-10">
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0057FF]/40 to-transparent" />
              <LeadForm
                source="hero"
                formVariant="minimal"
                title="Diagnóstico estratégico"
                description="Apenas nome, e-mail e WhatsApp. Resposta em até 24h com rota e escopo inicial."
                ctaLabel="Quero meu diagnóstico"
                context={{ intent: 'diagnostico' }}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
