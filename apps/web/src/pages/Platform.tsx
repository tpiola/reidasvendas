import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';
import { Reveal } from '@/components/Reveal';
import { BRAND } from '@/lib/brand';
import { PLATFORM_ITEMS } from '@/data/siteStructure';

export default function Platform() {
  useEffect(() => {
    applySeo({
      title: 'Plataforma — Rei das Vendas',
      description: 'Uma plataforma que conecta marca, sistema, automação e crescimento.',
      canonicalPath: '/platform',
    });
  }, []);

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#090D12]" aria-labelledby="platform-hero">
        <HeroVideo src={BRAND.heroVideoUrl} poster={BRAND.heroPosterUrl} />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 md:pb-20 md:pt-36">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Plataforma</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 id="platform-hero" className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                A plataforma que conecta marca, sistema, automação e crescimento.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75">
                A Rei das Vendas não é um conjunto de páginas. É uma arquitetura operacional: narrativa, experiência, captura, automação e mensuração.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16" aria-label="Módulos da plataforma">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">Visão geral</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Componentes que operam juntos</h2>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PLATFORM_ITEMS.map((item, i) => (
            <Reveal key={item.slug} delay={0.04 * i}>
              <Link
                to={`/platform/${item.slug}`}
                className="group block rounded-3xl border border-black/10 bg-white p-6 transition-colors hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                <p className="text-sm font-semibold text-black">{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-black/65">{item.description}</p>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55 group-hover:text-black">
                  Explorar
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <LeadCaptureSection
        id="diagnostico"
        source="footer"
        headline="Quer estruturar sua operação como plataforma?"
        description="Solicite diagnóstico estratégico. Você recebe rota recomendada, escopo mínimo e a arquitetura para capturar, qualificar e responder com padrão premium."
        intent="platform"
      />
    </main>
  );
}
