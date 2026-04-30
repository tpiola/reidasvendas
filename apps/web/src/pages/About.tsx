import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';
import { Reveal } from '@/components/Reveal';
import { BRAND } from '@/lib/brand';
import { ABOUT_ITEMS } from '@/data/siteStructure';

export default function About() {
  useEffect(() => {
    applySeo({
      title: 'Sobre — Rei das Vendas',
      description: 'Profundidade institucional, legitimidade e coerência.',
      canonicalPath: '/about',
    });
  }, []);

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#090D12]" aria-labelledby="about-hero">
        <HeroVideo src={BRAND.heroVideoUrl} poster={BRAND.heroPosterUrl} />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 md:pb-20 md:pt-36">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Sobre</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 id="about-hero" className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Uma empresa criada para transformar presença em operação.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75">
                O mercado está cheio de ferramentas e produção superficial. A Rei das Vendas existe para construir arquitetura real: método, clareza, automação e execução premium.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16" aria-label="Seções">
        <div className="grid gap-4 md:grid-cols-3">
          {ABOUT_ITEMS.map((item, i) => (
            <Reveal key={item.slug} delay={0.04 * i}>
              <Link
                to={`/about/${item.slug}`}
                className="group block rounded-3xl border border-black/10 bg-white p-6 transition-colors hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                <p className="text-sm font-semibold text-black">{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-black/65">{item.description}</p>
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
        headline="Quer aplicar o método na sua operação?"
        description="Solicite diagnóstico estratégico. A Rei das Vendas retorna com rota recomendada e próximos passos com padrão premium."
        intent="about"
      />
    </main>
  );
}
