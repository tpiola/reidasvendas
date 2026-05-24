import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { PLANS_HUB } from '@/data/plans';
import { PRICING_PREVIEW } from '@/lib/home-content';

type PricingPreviewProps = {
  showAllPlans?: boolean;
  className?: string;
};

export function PricingPreview({ showAllPlans = false, className = '' }: PricingPreviewProps) {
  const plans = showAllPlans ? PLANS_HUB : PLANS_HUB.filter((p) => p.slug !== 'sob-medida').slice(0, 3);
  const popularSlug = 'crescimento';

  return (
    <section
      className={`section-dark border-y border-white/[0.04] bg-[#08080B] py-24 md:py-32 ${className}`}
      aria-labelledby="pricing-preview-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">
            {PRICING_PREVIEW.eyebrow}
          </span>
          <h2 id="pricing-preview-heading" className="mt-4 text-heading font-semibold section-ink">
            {PRICING_PREVIEW.title}
            <span className="text-gradient-titanium"> {PRICING_PREVIEW.titleAccent}</span>
          </h2>
          <p className="section-ink-muted mx-auto mt-5 max-w-xl text-sm">{PRICING_PREVIEW.subtitle}</p>
        </Reveal>

        <div className={`mt-14 grid gap-6 ${showAllPlans ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {plans.map((plan, i) => {
            const isPopular = plan.slug === popularSlug;
            return (
              <Reveal key={plan.slug} delay={i * 0.06}>
                <article
                  className={`relative flex h-full flex-col rounded-2xl p-8 ${
                    isPopular
                      ? 'glass-card border-[#C9A84C]/30 ring-1 ring-[#C9A84C]/20'
                      : 'card-dark'
                  }`}
                >
                  {isPopular ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A84C] px-4 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#030305]">
                      Popular
                    </span>
                  ) : null}
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/75">
                    {plan.name}
                  </p>
                  <p className="section-ink-muted mt-3 text-sm">{plan.tagline}</p>
                  <p className="mt-6 text-2xl font-bold text-gradient-gold">{plan.priceLabel}</p>
                  <ul className="mt-6 flex-1 space-y-2">
                    {plan.highlights.map((h) => (
                      <li key={h} className="section-ink-muted flex gap-2 text-sm">
                        <span className="text-[#0057FF]" aria-hidden>
                          ✓
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/planos/${plan.slug}`}
                    className={`mt-8 inline-flex h-12 w-full items-center justify-center text-[11px] font-bold uppercase tracking-[0.24em] ${
                      isPopular ? 'btn-glow text-white' : 'btn-ghost'
                    }`}
                  >
                    {plan.ctaLabel}
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Link
            to="/planos"
            className="btn-ghost inline-flex h-12 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em]"
          >
            Comparar todos os planos
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
