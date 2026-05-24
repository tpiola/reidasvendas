import { Shield, Clock, BadgeCheck } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { GUARANTEE_SEALS } from '@/lib/home-content';

const ICONS = {
  'garantia-7d': Shield,
  'resposta-24h': Clock,
  'sem-fidelidade': BadgeCheck,
} as const;

export function TrustGuaranteeBand() {
  return (
    <section className="bg-[color:var(--surface)] py-12 md:py-16" aria-label="Garantias e selos de confiança">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {GUARANTEE_SEALS.map((seal, i) => {
          const Icon = ICONS[seal.id as keyof typeof ICONS] ?? BadgeCheck;
          return (
            <Reveal key={seal.id} delay={i * 0.06}>
              <div className="glass-card flex h-full flex-col gap-3 rounded-2xl border border-[#C9A84C]/15 p-6">
                <Icon className="h-6 w-6 text-[#C9A84C]" aria-hidden />
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[color:var(--page-fg)]">
                  {seal.title}
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--text-muted)]">{seal.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
