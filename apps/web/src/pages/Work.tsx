import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';
import { Reveal } from '@/components/Reveal';
import { BRAND } from '@/lib/brand';
import { WORK_CASES } from '@/data/siteStructure';

export default function Work() {
  useEffect(() => {
    applySeo({
      title: 'Cases — Rei das Vendas',
      description: 'Projetos, sistemas e estruturas que mostram como a Rei das Vendas opera.',
      canonicalPath: '/work',
    });
  }, []);

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#090D12]" aria-labelledby="work-hero">
        <HeroVideo src={BRAND.heroVideoUrl} poster={BRAND.heroPosterUrl} />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 md:pb-20 md:pt-36">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Cases</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 id="work-hero" className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Projetos e sistemas que mostram como a Rei das Vendas pensa.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75">
                Não inventamos clientes nem números. Os cases aqui são estruturais: raciocínio, arquitetura proposta, escopo e critérios.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16" aria-label="Cases">
        <div className="grid gap-4 md:grid-cols-2">
          {WORK_CASES.map((c, i) => (
            <Reveal key={c.slug} delay={0.04 * i}>
              <Link
                to={`/work/${c.slug}`}
                className="group block rounded-3xl border border-black/10 bg-white p-6 transition-colors hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                <p className="text-sm font-semibold text-black">{c.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-black/65">{c.description}</p>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55 group-hover:text-black">
                  Ver estrutura
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <LeadCaptureSection
        id="diagnostico"
        source="footer"
        headline="Quer um case aplicado ao seu cenário?"
        description="Solicite diagnóstico estratégico. A Rei das Vendas transforma a tese em páginas, automação e critérios mensuráveis."
        intent="work"
      />
    </main>
  );
}
