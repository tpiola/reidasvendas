import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { buildHomeJsonLd } from '@/lib/seo-schema';
import { DEFAULT_OG_IMAGE, HOME_SEO } from '@/lib/seo-meta';
import {
  CINEMATIC_BAND,
  HOME_FAQ,
  MID_VIDEO,
  SCHEMA_REVIEWS,
  TRUST_STATS,
} from '@/lib/home-content';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { ProductDemoSection } from '@/components/shipper/ProductDemoSection';
import { HowItWorksSection } from '@/components/shipper/HowItWorksSection';
import { ProjectsShowcaseSection } from '@/components/shipper/ProjectsShowcaseSection';
import { HomeFinalCta } from '@/components/shipper/HomeFinalCta';
import { TrustGuaranteeBand } from '@/components/home/TrustGuaranteeBand';
import { StoryVideoBand } from '@/components/media/StoryVideoBand';
import { BRAND } from '@/lib/brand';
import VideoHero from '@/components/VideoHero';
import SocialProof from '@/components/conversion/SocialProof';
import PricingCardsPremium from '@/components/conversion/PricingCardsPremium';

export default function Home() {
  useEffect(() => {
    applySeo({
      title: HOME_SEO.title,
      description: HOME_SEO.description,
      canonicalPath: '/',
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: buildHomeJsonLd(HOME_FAQ, SCHEMA_REVIEWS),
    });
  }, []);

  return (
    <main className="page-surface overflow-x-hidden">
      {/* Hero profissional — imagem de alta qualidade + título + CTA */}
      <VideoHero />

      {/* Indicadores de confiança */}
      <section className="relative isolate bg-[color:var(--page-bg)] py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center">
            {TRUST_STATS.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-0.5">
                <span className="text-lg font-bold text-[color:var(--page-fg)] sm:text-xl">{item.value}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--page-fg-muted)]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
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

      <ProjectsShowcaseSection />

      {/* Planos — fonte única alinhada com data/plans.ts */}
      <PricingCardsPremium />

      {/* Prova social — seção única com resultados reais */}
      <SocialProof />

      <TrustGuaranteeBand />

      <FaqAccordion items={HOME_FAQ} />

      <HomeFinalCta />
    </main>
  );
}
