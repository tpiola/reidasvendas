/* ═══════════════════════════════════════════
   HOME.TSX — Rei das Vendas
   Experiência Cinematográfica de Alta Conversão
   Apenas seções essenciais, SEM repetição
═══════════════════════════════════════════ */

import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import HeroSection from '@/components/HeroSection';
import ServicosSection from '@/components/ServicosSection';
import CasesSection from '@/components/CasesSection';
import ComoFuncionaSection from '@/components/ComoFuncionaSection';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { HomeFinalCta } from '@/components/shipper/HomeFinalCta';
import { HOME_FAQ } from '@/lib/home-content';

export default function Home() {
  useEffect(() => {
    applySeo({
      title: 'Rei das Vendas — Soluções Digitais | Franca-SP',
      description: 'Soluções digitais para negócios locais em Franca-SP. Sites, aplicativos, automações e consultoria. Diagnóstico gratuito.',
      canonicalPath: '/',
    });
  }, []);

  return (
    <main className="overflow-x-hidden bg-[#030303]">
      {/* 1. HERO — Experiência cinematográfica com vídeo */}
      <HeroSection />

      {/* 2. SOLUÇÕES — Cards visuais com SVGs, texto curto */}
      <ServicosSection />

      {/* 3. COMO FUNCIONA — 3 passos, narrativa de transformação */}
      <ComoFuncionaSection />

      {/* 4. RESULTADOS — Apenas 2 cases com números grandes */}
      <CasesSection />

      {/* 5. FAQ — Responder objeções */}
      <section className="bg-[#08080b] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/80">
            DÚVIDAS
          </h2>
          <p className="mb-10 text-center text-sm text-white/40">
            Prazo, dados, escopo — sem letra miúda.
          </p>
          <FaqAccordion items={HOME_FAQ} />
        </div>
      </section>

      {/* 6. CTA FINAL — Única chamada para ação */}
      <HomeFinalCta />
    </main>
  );
}
