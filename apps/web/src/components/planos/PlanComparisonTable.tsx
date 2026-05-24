import { Link } from 'react-router-dom';
import { PLANS_HUB, type PlanSlug } from '@/data/plans';
import { Reveal } from '@/components/Reveal';

type PlanComparisonTableProps = {
  currentSlug: PlanSlug;
};

export function PlanComparisonTable({ currentSlug }: PlanComparisonTableProps) {
  const others = PLANS_HUB.filter((p) => p.slug !== currentSlug);

  return (
    <Reveal className="mt-16">
      <h2 className="text-xl font-semibold text-surface">Compare com outros planos</h2>
      <p className="mt-2 text-sm text-surface-muted">
        Preços e escopo completos em cada página — escolha o ritmo do seu negócio.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((plan) => (
          <Link
            key={plan.slug}
            to={`/planos/${plan.slug}`}
            className="card-dark rounded-2xl p-6 transition-colors hover:border-[#0057FF]/30"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A84C]/75">{plan.name}</p>
            <p className="mt-2 text-sm text-surface-muted">{plan.tagline}</p>
            <p className="mt-4 text-lg font-bold text-gradient-gold">{plan.priceLabel}</p>
            <span className="mt-4 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#0057FF]/80">
              Ver detalhes →
            </span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
