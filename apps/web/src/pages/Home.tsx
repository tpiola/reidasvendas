import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { trackEvent } from '@/lib/analytics';
import { AuroraBackground } from '@/components/AuroraBackground';
import { HeroVisual } from '@/components/HeroVisual';
import { StatCounter } from '@/components/StatCounter';
import { NicheMarquee } from '@/components/NicheMarquee';
import { ServicesBento } from '@/components/ServicesBento';
import { WhyUs } from '@/components/WhyUs';
import { FinalCta } from '@/components/FinalCta';
import { SplitText } from '@/components/SplitText';
import { GoldBadge } from '@/components/PremiumComponents';
import './HomePremium.css';

export default function Home() {
  return (
    <main id="main-content" className="rdv-home relative overflow-x-clip">
      {/* ─── Hero ─── */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden" aria-labelledby="home-title">
        <AuroraBackground />

        {/* Partículas douradas */}
        <span className="rdv-particle animate-float-slow left-[12%] top-[22%] h-1.5 w-1.5 opacity-70" aria-hidden="true" />
        <span className="rdv-particle animate-float left-[80%] top-[16%] h-2 w-2 opacity-60" aria-hidden="true" />
        <span className="rdv-particle animate-float-delayed left-[64%] top-[70%] h-1.5 w-1.5 opacity-50" aria-hidden="true" />
        <span className="rdv-particle animate-float-slow left-[8%] top-[68%] h-2 w-2 opacity-40" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6 sm:pt-32">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
            {/* Copy */}
            <div className="lg:col-span-7">
              <GoldBadge>
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                {BRAND.tagline}
              </GoldBadge>

              <h1
                id="home-title"
                className="mt-7 font-serif text-[2.6rem] font-bold leading-[1.04] tracking-[-0.02em] sm:text-6xl md:text-7xl xl:text-[5rem]"
              >
                <SplitText
                  as="span"
                  text="Sua empresa não precisa de mais software."
                  className="block text-white"
                  staggerMs={46}
                />
                <SplitText
                  as="span"
                  text="Precisa de inteligência operacional."
                  className="mt-2 block text-white"
                  highlightWords={['inteligência', 'operacional']}
                  staggerMs={46}
                  delay={0.55}
                />
              </h1>

              <p className="mt-7 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
                O Rei das Vendas projeta sites, sistemas, agentes de IA e automações como uma única
                infraestrutura: cada ponto captura sinais, conduz decisões e sustenta crescimento com controle.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  to="/diagnostico"
                  onClick={() => trackEvent('hero_cta', { position: 'home-hero', destination: 'diagnostico' })}
                  className="btn-gold w-full sm:w-auto"
                >
                  Mapear minha operação
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/solucoes"
                  onClick={() => trackEvent('hero_cta_secondary', { position: 'home-hero', destination: 'solucoes' })}
                  className="btn-outline-gold w-full sm:w-auto"
                >
                  Explorar soluções
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5">
              <HeroVisual />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center sm:flex" aria-hidden="true">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-[rgba(214,168,79,0.3)] p-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-[#D6A84F]" />
          </div>
        </div>
      </section>

      {/* ─── Stats band ─── */}
      <section className="relative border-y border-[rgba(255,255,255,0.06)] bg-[#080808]/60" aria-label="Números do Rei das Vendas">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:py-16">
          <StatCounter value={12} suffix="+" label="Projetos entregues" className="lg:border-r lg:border-[rgba(255,255,255,0.06)] lg:pl-4" />
          <StatCounter value={98} suffix="%" label="Satisfação" className="lg:border-r lg:border-[rgba(255,255,255,0.06)] lg:pl-4" />
          <StatCounter value={3} label="Anos de operação" className="lg:border-r lg:border-[rgba(255,255,255,0.06)] lg:pl-4" />
          <div className="lg:pl-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D6A84F]">Fundador</p>
            <p className="mt-2 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">{BRAND.founder.name}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1AA]">{BRAND.founder.crf} · responsabilidade técnica</p>
          </div>
        </div>
      </section>

      {/* ─── Marquee de nichos ─── */}
      <section className="relative py-14 sm:py-16" aria-label="Segmentos atendidos">
        <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A8A92]">
          Operações atendidas em seis frentes
        </p>
        <NicheMarquee />
      </section>

      {/* ─── Bento de serviços ─── */}
      <section className="relative py-24 sm:py-32" aria-labelledby="services-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="section-label">O que construímos</span>
              <h2 id="services-title" className="font-serif mt-4 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Cinco frentes de solução. <span className="text-gradient-gold">Uma única infraestrutura.</span>
              </h2>
            </div>
            <Link
              to="/solucoes"
              onClick={() => trackEvent('services_view_all', { origin: 'home-bento' })}
              className="btn-outline-gold w-fit shrink-0"
            >
              Ver todas as arquiteturas
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ServicesBento />
        </div>
      </section>

      {/* ─── Por que nós ─── */}
      <WhyUs />

      {/* ─── CTA final ─── */}
      <FinalCta />
    </main>
  );
}
