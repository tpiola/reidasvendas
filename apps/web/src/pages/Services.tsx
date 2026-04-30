import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';
import { Reveal } from '@/components/Reveal';
import { BRAND } from '@/lib/brand';
import { SERVICE_ITEMS } from '@/data/siteStructure';

export default function Services() {
  useEffect(() => {
    applySeo({
      title: 'Serviços — Rei das Vendas',
      description: 'Serviços desenhados para transformar presença em operação.',
      canonicalPath: '/services',
    });
  }, []);

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#090D12]" aria-labelledby="services-hero">
        <HeroVideo src={BRAND.heroVideoUrl} poster={BRAND.heroPosterUrl} />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 md:pb-20 md:pt-36">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Serviços</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 id="services-hero" className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Serviços desenhados para transformar presença em operação.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75">
                Cada entrega é estruturada por problema, entradas, saídas e critérios de qualidade. Sem promessas genéricas. Sem escopo acidental.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16" aria-label="Serviços">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_ITEMS.map((item, i) => (
            <Reveal key={item.slug} delay={0.04 * i}>
              <Link
                to={`/services/${item.slug}`}
                className="group block rounded-3xl border border-black/10 bg-white p-6 transition-colors hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                <p className="text-sm font-semibold text-black">{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-black/65">{item.description}</p>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55 group-hover:text-black">
                  Ver detalhes
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <LeadCaptureSection
        id="diagnostico"
        source="footer"
        headline="Quer uma proposta com escopo e método?"
        description="Solicite diagnóstico estratégico. Você recebe rota recomendada, entregáveis e próximos passos com linguagem executiva."
        intent="services"
      />
    </main>
  );
}
