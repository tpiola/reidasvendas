import { lazy, Suspense, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { applySeo } from '@/lib/seo';
import { buildHomeJsonLd } from '@/lib/seo-schema';
import { DEFAULT_OG_IMAGE, HOME_SEO } from '@/lib/seo-meta';
import { CINEMATIC_BAND, HOME_FAQ, MID_VIDEO, TRUST_STATS, HERO_COPY } from '@/lib/home-content';
import { CTA } from '@/lib/cta-copy';
import { HeroVideo } from '@/components/HeroVideo';
import { Reveal } from '@/components/Reveal';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { HeroScrollCue } from '@/components/home/HeroScrollCue';
import { ProductDemoSection } from '@/components/shipper/ProductDemoSection';
import { HowItWorksSection } from '@/components/shipper/HowItWorksSection';
import { ProjectsShowcaseSection } from '@/components/shipper/ProjectsShowcaseSection';
import { TestimonialsMarquee } from '@/components/shipper/TestimonialsMarquee';
import { HomeFinalCta } from '@/components/shipper/HomeFinalCta';
import { StoryVideoBand } from '@/components/media/StoryVideoBand';
import { BRAND } from '@/lib/brand';

const CinematicVideoBand = lazy(() =>
  import('@/components/home/CinematicVideoBand').then((m) => ({ default: m.CinematicVideoBand })),
);

const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;

function SectionFallback() {
  return <div className="min-h-[8rem] bg-[color:var(--page-bg)]" aria-hidden />;
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '12%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

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
    <main className="page-surface overflow-x-hidden">
      <section ref={heroRef} className="hero-dark relative isolate min-h-[92vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 parallax-bg">
          <HeroVideo preferLocalHero />
        </motion.div>
        <div className="absolute inset-0 bg-[#030303]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/85" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 pb-20 pt-32 text-center"
        >
          <Reveal>
            <Link
              to="/diagnostico"
              className="mb-8 inline-flex items-center gap-3 border border-[#C9A84C]/25 bg-[#C9A84C]/[0.06] px-5 py-2.5 backdrop-blur-sm transition-colors hover:border-[#C9A84C]/45"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C9A84C]" aria-hidden />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/85">
                {CTA.orcamento}
              </span>
            </Link>
          </Reveal>

          <div className="max-w-4xl">
            <Reveal delay={0.06}>
              <h1 className="text-display font-semibold text-white">
                <motion.span
                  className="block text-gradient-gold"
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE_LUXURY, delay: 0.1 }}
                >
                  Seu negócio local
                </motion.span>
                <motion.span
                  className="block text-gradient-titanium"
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE_LUXURY, delay: 0.2 }}
                >
                  vendendo como as gigantes.
                </motion.span>
              </h1>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-md text-base text-white/55 md:text-lg">{HERO_COPY.subhead}</p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Link to="/diagnostico" className="btn-glow inline-flex h-14 items-center justify-center px-12 text-[11px] font-bold uppercase tracking-[0.28em] text-white">
                {HERO_COPY.ctaPrimary}
              </Link>
              <Link to="/projetos" className="btn-ghost inline-flex h-14 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.28em] text-white/80">
                {HERO_COPY.ctaSecondary}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex items-center gap-8">
              {TRUST_STATS.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <span className="text-lg font-bold text-white/90">{item.value}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">{item.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <HeroScrollCue />
        </motion.div>
      </section>

      <ProductDemoSection />

      <StoryVideoBand
        id="evolucao"
        eyebrow={MID_VIDEO.eyebrow}
        title={MID_VIDEO.title}
        titleAccent={MID_VIDEO.titleAccent}
        subtitle={MID_VIDEO.subtitle}
        videoSrc={BRAND.inlineVideos.salesFunnel}
        videoCaption="Funil · automação e métricas"
        ctaLabel={MID_VIDEO.ctaLabel}
        ctaTo={MID_VIDEO.ctaTo}
        compact
      />

      <HowItWorksSection />

      <Suspense fallback={<SectionFallback />}>
        <CinematicVideoBand {...CINEMATIC_BAND} />
      </Suspense>

      <ProjectsShowcaseSection />

      <Reveal className="border-y border-[color:var(--border-subtle)] py-12">
        <div className="mx-auto flex max-w-6xl justify-center gap-4 px-6">
          <Link to="/planos" className="btn-ghost inline-flex h-12 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em]">
            {CTA.planos}
          </Link>
        </div>
      </Reveal>

      <TestimonialsMarquee />

      <FaqAccordion items={HOME_FAQ} />

      <HomeFinalCta />
    </main>
  );
}
