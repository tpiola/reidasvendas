import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { PLANS_HUB } from '@/data/plans';
import { Reveal } from '@/components/Reveal';
import { BuiltFromScratchBanner } from '@/components/BuiltFromScratchBanner';

export default function PlanosIndex() {
  useEffect(() => {
    applySeo({
      title: 'Planos e assinaturas — Rei das Vendas',
      description:
        'Três planos de assinatura e um pacote sob medida. Cada projeto digital é construído do zero para maximizar conversão do seu cliente.',
      canonicalPath: '/planos',
    });
  }, []);

  return (
    <main className="bg-[#030305] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.06] py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">Vendas</p>
            <h1 className="mt-4 text-display font-semibold text-white">
              Planos que escalam
              <span className="text-gradient-titanium"> com o seu negócio.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/45">
              Escolha uma assinatura ou monte um pacote sob medida. Cada página abaixo detalha entregáveis — sem
              prender você em um único scroll infinito.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <BuiltFromScratchBanner variant="dark" className="mb-14" />
          <div className="grid gap-6 md:grid-cols-2">
            {PLANS_HUB.map((plan, i) => (
              <Reveal key={plan.slug} delay={i * 0.06}>
                <article className="glass-card flex h-full flex-col rounded-2xl p-8 md:p-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/75">{plan.name}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{plan.tagline}</h2>
                  <p className="mt-4 text-lg font-bold text-gradient-gold">{plan.priceLabel}</p>
                  <ul className="mt-6 flex-1 space-y-2">
                    {plan.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-white/50">
                        <span className="text-[#0057FF]" aria-hidden>
                          ✓
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/planos/${plan.slug}`}
                    className="btn-glow mt-8 inline-flex h-12 w-full items-center justify-center text-[11px] font-bold uppercase tracking-[0.24em] text-white"
                  >
                    {plan.ctaLabel}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
