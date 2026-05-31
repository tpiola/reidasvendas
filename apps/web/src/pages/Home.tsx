import { lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import { applySeo } from "@/lib/seo";
import { buildHomeJsonLd } from "@/lib/seo-schema";
import { DEFAULT_OG_IMAGE, HOME_SEO } from "@/lib/seo-meta";
import {
  CINEMATIC_BAND,
  HOME_FAQ,
  MID_VIDEO,
  SCHEMA_REVIEWS,
  TRUST_STATS,
  HERO_COPY,
} from "@/lib/home-content";
import { CTA } from "@/lib/cta-copy";
import { HeroVideo } from "@/components/HeroVideo";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { HeroScrollCue } from "@/components/home/HeroScrollCue";
import { ProductDemoSection } from "@/components/shipper/ProductDemoSection";
import { HowItWorksSection } from "@/components/shipper/HowItWorksSection";
import { ProjectsShowcaseSection } from "@/components/shipper/ProjectsShowcaseSection";
import { TestimonialsMarquee } from "@/components/shipper/TestimonialsMarquee";
import { HomeFinalCta } from "@/components/shipper/HomeFinalCta";
import { TrustGuaranteeBand } from "@/components/home/TrustGuaranteeBand";
import { StoryVideoBand } from "@/components/media/StoryVideoBand";
import { HomePlanosCtaBand } from "@/components/conversion/HomePlanosCtaBand";
import { BRAND } from "@/lib/brand";

const CinematicVideoBand = lazy(() =>
  import("@/components/home/CinematicVideoBand").then((m) => ({
    default: m.CinematicVideoBand,
  })),
);

const TestimonialsVideoSectionLazy = lazy(() =>
  import("@/components/home/TestimonialsVideoSection").then((m) => ({
    default: m.TestimonialsVideoSection,
  })),
);

function SectionFallback() {
  return <div className="min-h-[8rem] bg-[color:var(--page-bg)]" aria-hidden />;
}

export default function Home() {
  useEffect(() => {
    applySeo({
      title: HOME_SEO.title,
      description: HOME_SEO.description,
      canonicalPath: "/",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: buildHomeJsonLd(HOME_FAQ, SCHEMA_REVIEWS),
    });
  }, []);

  return (
    <main className="page-surface overflow-x-hidden">
      <section className="hero-dark relative isolate min-h-[100dvh] min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <HeroVideo clips={BRAND.heroHomeClips} deferVideo />
        </div>
        <div className="absolute inset-0 bg-[#030303]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/85" />

        <div className="hero-content relative flex min-h-[100dvh] min-h-[100svh] flex-col items-center justify-center px-4 pb-[max(5rem,env(safe-area-inset-bottom))] pt-[max(6.5rem,env(safe-area-inset-top))] text-center sm:px-6 md:px-8 md:pt-32 lg:px-10">
          <div className="hero-enter hero-enter-delay-1">
            <Link
              to="/diagnostico"
              className="mb-8 inline-flex items-center gap-3 border border-[#C9A84C]/25 bg-black/40 px-5 py-2.5 transition-colors hover:border-[#C9A84C]/45"
            >
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C9A84C]"
                aria-hidden
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/85">
                {CTA.orcamento}
              </span>
            </Link>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-display font-semibold hero-ink">
              <span className="hero-enter hero-enter-delay-2 block text-gradient-gold">
                Seu negócio local
              </span>
              <span className="hero-enter hero-enter-delay-3 block text-gradient-titanium">
                vendendo como as gigantes.
              </span>
            </h1>
          </div>

          <p className="hero-enter hero-enter-delay-4 mt-6 max-w-md text-base hero-ink-muted md:max-w-xl md:text-lg">
            {HERO_COPY.subhead}
          </p>

          <div className="hero-enter hero-enter-delay-5 mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center md:gap-4">
            <Link
              to="/diagnostico"
              className="btn-glow touch-target inline-flex h-14 w-full items-center justify-center px-8 text-[11px] font-bold uppercase tracking-[0.28em] text-white sm:w-auto sm:px-12"
            >
              {HERO_COPY.ctaPrimary}
            </Link>
            <Link
              to="/planos"
              className="btn-ghost touch-target inline-flex h-14 w-full items-center justify-center border-white/20 bg-white/5 px-8 text-[11px] font-bold uppercase tracking-[0.28em] text-white/90 sm:w-auto sm:px-10"
            >
              {CTA.planos}
            </Link>
          </div>

          <div className="hero-enter hero-enter-delay-6 mt-12 grid w-full max-w-xs grid-cols-3 gap-4 sm:flex sm:max-w-none sm:items-center sm:gap-10 md:gap-12">
            {TRUST_STATS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-base font-bold hero-ink sm:text-lg">
                  {item.value}
                </span>
                <span className="text-[8px] font-semibold uppercase tracking-[0.18em] hero-ink-muted sm:text-[9px]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <HeroScrollCue />
        </div>
      </section>

      <div className="section-below-fold">
        <ProductDemoSection />
      </div>

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

      <HomePlanosCtaBand />

      <TestimonialsMarquee />

      <Suspense fallback={<SectionFallback />}>
        <TestimonialsVideoSectionLazy />
      </Suspense>

      <TrustGuaranteeBand />

      <FaqAccordion items={HOME_FAQ} />

      <HomeFinalCta />
    </main>
  );
}
