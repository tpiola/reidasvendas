import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';
import { Reveal } from '@/components/Reveal';
import { BRAND } from '@/lib/brand';
import { INSIGHT_CATEGORIES } from '@/data/siteStructure';

export default function Insights() {
  useEffect(() => {
    applySeo({
      title: 'Insights — Rei das Vendas',
      description: 'Notas de construção, operação com IA e arquitetura de hubs.',
      canonicalPath: '/insights',
    });
  }, []);

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#090D12]" aria-labelledby="insights-hero">
        <HeroVideo src={BRAND.heroVideoUrl} poster={BRAND.heroPosterUrl} />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 md:pb-20 md:pt-36">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Insights</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 id="insights-hero" className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Ideias com método. Operação com padrão.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75">
                Conteúdo editorial para decisão: estrutura de páginas, automação, IA aplicada e arquitetura de crescimento.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16" aria-label="Categorias">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {INSIGHT_CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={0.04 * i}>
              <Link
                to={`/insights/${c.slug}`}
                className="group block rounded-3xl border border-black/10 bg-white p-6 transition-colors hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                <p className="text-sm font-semibold text-black">{c.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-black/65">{c.description}</p>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55 group-hover:text-black">
                  Abrir
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <LeadCaptureSection
        id="diagnostico"
        source="footer"
        headline="Quer transformar conteúdo em captura e automação?"
        description="Solicite diagnóstico estratégico. A Rei das Vendas define arquitetura editorial, roteamento de leads e camada de operação."
        intent="insights"
      />
    </main>
  );
}

