import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { buildHomeJsonLd } from '@/lib/seo-schema';
import { DEFAULT_OG_IMAGE, HOME_SEO } from '@/lib/seo-meta';
import {
  HOME_FAQ,
  SCHEMA_REVIEWS,
} from '@/lib/home-content';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { TrustGuaranteeBand } from '@/components/home/TrustGuaranteeBand';
import { HomeFinalCta } from '@/components/shipper/HomeFinalCta';
import VideoHero from '@/components/VideoHero';
import ServicosSection from '@/components/ServicosSection';
import NichosSection from '@/components/NichosSection';
import CasesSection from '@/components/CasesSection';
import ComoFuncionaSection from '@/components/ComoFuncionaSection';
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
      {/* Hero FULLSCREEN com vídeo real Pexels */}
      <VideoHero />

      {/* Serviços / Soluções */}
      <ServicosSection />

      {/* Nichos de Franca-SP */}
      <NichosSection />

      {/* Como Funciona - 3 passos */}
      <ComoFuncionaSection />

      {/* Casos de Sucesso */}
      <CasesSection />

      {/* Planos — fonte única alinhada com data/plans.ts */}
      <PricingCardsPremium />

      {/* Garantia de confiança */}
      <TrustGuaranteeBand />

      {/* FAQ */}
      <FaqAccordion items={HOME_FAQ} />

      {/* CTA Final */}
      <HomeFinalCta />
    </main>
  );
}
