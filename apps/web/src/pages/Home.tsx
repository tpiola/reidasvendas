/* ═══════════════════════════════════════════
   HOME.TSX — Rei das Vendas
   Experiência Cinematográfica de Alta Conversão
   Apenas seções essenciais, SEM repetição
   Scroll-driven animations + responsivo mobile
═══════════════════════════════════════════ */

import { useEffect, useRef } from 'react';
import { applySeo } from '@/lib/seo';
import HeroSection from '@/components/HeroSection';
import ServicosSection from '@/components/ServicosSection';
import CasesSection from '@/components/CasesSection';
import ComoFuncionaSection from '@/components/ComoFuncionaSection';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { HomeFinalCta } from '@/components/shipper/HomeFinalCta';
import { HOME_FAQ } from '@/lib/home-content';

/* ─── Hook: Scroll Reveal com IntersectionObserver ─── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-scroll-reveal]');
    if (!els.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      els.forEach(el => el.classList.add('scroll-reveal-visible'));
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '-60px 0px -60px 0px', threshold: 0.1 }
    );

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Wrapper de animação por seção ───── */
function ScrollSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      el.classList.add('scroll-reveal-visible');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('scroll-reveal-visible');
          io.disconnect();
        }
      },
      { rootMargin: '-60px 0px -60px 0px', threshold: 0.1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-scroll-reveal
      className={`scroll-reveal ${className}`}
    >
      {children}
    </section>
  );
}

export default function Home() {
  useScrollReveal();

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
      <ScrollSection>
        <HeroSection />
      </ScrollSection>

      {/* 2. SOLUÇÕES — Cards visuais com SVGs, texto curto */}
      <ScrollSection>
        <ServicosSection />
      </ScrollSection>

      {/* 3. COMO FUNCIONA — 3 passos, narrativa de transformação */}
      <ScrollSection>
        <ComoFuncionaSection />
      </ScrollSection>

      {/* 4. RESULTADOS — Apenas 2 cases com números grandes */}
      <ScrollSection>
        <CasesSection />
      </ScrollSection>

      {/* 5. FAQ — Responder objeções */}
      <ScrollSection className="bg-[#08080b] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/80">
            DÚVIDAS
          </h2>
          <p className="mb-10 text-center text-sm text-white/40">
            Prazo, dados, escopo — sem letra miúda.
          </p>
          <FaqAccordion items={HOME_FAQ} />
        </div>
      </ScrollSection>

      {/* 6. CTA FINAL — Única chamada para ação */}
      <ScrollSection>
        <HomeFinalCta />
      </ScrollSection>
    </main>
  );
}
