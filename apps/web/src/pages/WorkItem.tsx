import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';
import { Reveal } from '@/components/Reveal';
import { BRAND } from '@/lib/brand';
import { WORK_CASES } from '@/data/siteStructure';

export default function WorkItem() {
  const { slug } = useParams();
  const item = useMemo(() => WORK_CASES.find((x) => x.slug === slug), [slug]);

  useEffect(() => {
    if (!item) return;
    applySeo({
      title: `${item.title} — Cases — Rei das Vendas`,
      description: item.description,
      canonicalPath: `/work/${item.slug}`,
    });
  }, [item]);

  if (!item) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-2xl font-semibold tracking-tight">Página não encontrada</h1>
        <p className="mt-3 text-sm text-black/65">O case solicitado não existe.</p>
        <div className="mt-8">
          <Link className="text-sm font-semibold underline" to="/work">
            Voltar para Work
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#090D12]" aria-labelledby="work-item-hero">
        <HeroVideo src={BRAND.heroVideoUrl} poster={BRAND.heroPosterUrl} />
        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-28 md:pb-16 md:pt-36">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Cases</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 id="work-item-hero" className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {item.title}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75">{item.description}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16" aria-label="Estrutura do case">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { k: 'Objetivo', v: 'Transformar presença em operação com clareza e mensuração.' },
            { k: 'Desafio', v: 'Reduzir improviso: páginas, oferta, captura e follow-up em um só sistema.' },
            { k: 'Arquitetura proposta', v: 'Home + Platform + Services + Solutions + Insights + Contact com eventos do funil.' },
            { k: 'Resultado esperado', v: 'Melhor captação, resposta mais rápida e operação previsível.' },
          ].map((b, i) => (
            <Reveal key={b.k} delay={0.04 * i}>
              <div className="rounded-3xl border border-black/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">{b.k}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/70">{b.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <LeadCaptureSection
        id="diagnostico"
        source="footer"
        headline="Quer um case aplicado ao seu negócio?"
        description="Solicite diagnóstico estratégico. A Rei das Vendas traduz seu cenário em arquitetura e execução."
        intent={`work:${item.slug}`}
      />
    </main>
  );
}
