/* ═══════════════════════════════════════════
   HOME.TSX — Rei das Vendas
   Home completa com design premium
   Ordem: Hero → Servicos → Nichos → ComoFunciona → Cases → FAQ → CTA Final
   SEM blog, SEM preços, SEM emojis em cards
═══════════════════════════════════════════ */

import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { buildHomeJsonLd } from '@/lib/seo-schema';
import { DEFAULT_OG_IMAGE, HOME_SEO } from '@/lib/seo-meta';
import { HOME_FAQ, SCHEMA_REVIEWS } from '@/lib/home-content';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { TrustGuaranteeBand } from '@/components/home/TrustGuaranteeBand';
import { HomeFinalCta } from '@/components/shipper/HomeFinalCta';
import HeroSection from '@/components/HeroSection';
import ServicosSection from '@/components/ServicosSection';
import NichosSection from '@/components/NichosSection';
import CasesSection from '@/components/CasesSection';
import ComoFuncionaSection from '@/components/ComoFuncionaSection';

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
      {/* Hero com imagem real */}
      <HeroSection />

      {/* Serviços / Soluções — SVGs, sem emojis */}
      <ServicosSection />

      {/* Nichos de Franca-SP — imagens grandes */}
      <NichosSection />

      {/* Como Funciona — 3 passos horizontais */}
      <ComoFuncionaSection />

      {/* Casos de Sucesso — 2 cases grandes 50/50 */}
      <CasesSection />

      {/* Garantia de confiança */}
      <TrustGuaranteeBand />

      {/* FAQ */}
      <FaqAccordion items={HOME_FAQ} />

      {/* CTA Final */}
      <HomeFinalCta />
    </main>
  );
}
