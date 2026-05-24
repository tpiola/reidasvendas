import { lazy, Suspense, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { applySeo } from '@/lib/seo';
import { buildHomeJsonLd } from '@/lib/seo-schema';
import { DEFAULT_OG_IMAGE, HOME_SEO } from '@/lib/seo-meta';
import { CINEMATIC_BAND, HOME_FAQ, TECH_STACK, TRUST_STATS } from '@/lib/home-content';
import { HeroVideo } from '@/components/HeroVideo';
import { Reveal } from '@/components/Reveal';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { HeroScrollCue } from '@/components/home/HeroScrollCue';
import { ProductDemoSection } from '@/components/shipper/ProductDemoSection';
import { HowItWorksSection } from '@/components/shipper/HowItWorksSection';
import { FunnelComparisonSection } from '@/components/shipper/FunnelComparisonSection';
import { StatsBand } from '@/components/shipper/StatsBand';
import { PainPointsSection } from '@/components/shipper/PainPointsSection';
import { DeliverablesGrid } from '@/components/shipper/DeliverablesGrid';
import { ProjectsShowcaseSection } from '@/components/shipper/ProjectsShowcaseSection';
import { HERO_COPY } from '@/lib/home-content';
import { TestimonialsMarquee } from '@/components/shipper/TestimonialsMarquee';
import { HomeFinalCta } from '@/components/shipper/HomeFinalCta';

const CinematicVideoBand = lazy(() =>
  import('@/components/home/CinematicVideoBand').then((m) => ({ default: m.CinematicVideoBand })),
);
const TemplateCatalogSection = lazy(() =>
  import('@/components/home/TemplateCatalogSection').then((m) => ({ default: m.TemplateCatalogSection })),
);

const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;

function SectionFallback() {
  return <div className="min-h-[12rem] bg-[#030305]" aria-hidden />;
}

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
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: buildHomeJsonLd(HOME_FAQ),
    });
  }, []);

  return (
    <main className="overflow-x-hidden bg-[#030305]">
      <ScrollProgress />

      <section ref={heroRef} className="relative isolate min-h-screen overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 parallax-bg">
          <HeroVideo preferLocalHero />
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
              to="/diagnostico"
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
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/55 md:text-xl">{HERO_COPY.subhead}</p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                to="/diagnostico"
                className="btn-glow inline-flex h-14 items-center justify-center px-12 text-[11px] font-bold uppercase tracking-[0.28em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {HERO_COPY.ctaPrimary}
              </Link>
              <Link
                to="/projetos"
                className="btn-ghost inline-flex h-14 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.28em] text-white/75 hover:text-white"
              >
                {HERO_COPY.ctaSecondary}
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

      <ProductDemoSection />
      <HowItWorksSection />

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

      <FunnelComparisonSection />
      <StatsBand />
      <PainPointsSection />
      <DeliverablesGrid />

      <Suspense fallback={<SectionFallback />}>
        <CinematicVideoBand {...CINEMATIC_BAND} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <TemplateCatalogSection />
      </Suspense>

      <ProjectsShowcaseSection />

      <Reveal className="border-y border-white/[0.04] bg-[#030305] py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-center">
          <Link
            to="/planos"
            className="btn-ghost inline-flex h-12 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em] text-white/75"
          >
            Ver planos e investimento
          </Link>
          <Link
            to="/templates"
            className="btn-ghost inline-flex h-12 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em] text-white/75"
          >
            Catálogo de amostras
          </Link>
        </div>
      </Reveal>

      <TestimonialsMarquee />

      <FaqAccordion items={HOME_FAQ} />

      <HomeFinalCta />
    </main>
  );
}
