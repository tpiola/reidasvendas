import { Reveal } from '@/components/Reveal';
import { TRUST_STATS, STATS_BAND } from '@/lib/home-content';

export function StatsBand() {
  return (
    <section className="section-white border-y border-[color:var(--border-subtle)] py-20 md:py-28" aria-label="Números">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <h2 className="text-heading font-semibold text-[color:var(--page-fg)]">{STATS_BAND.title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[color:var(--text-muted)]">{STATS_BAND.subtitle}</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {TRUST_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center md:border-l md:border-[color:var(--border-subtle)] md:pl-8 md:text-left">
                <div className="text-[clamp(2.25rem,4vw,3.25rem)] font-bold tracking-tight text-[color:var(--page-fg)]">
                  {s.value}
                </div>
                <div className="mx-auto mt-2 h-[2px] w-8 bg-[#0057FF]/40 md:mx-0" />
                <p className="mt-2 text-sm text-[color:var(--text-muted)]">{s.label}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.24}>
            <div className="text-center md:border-l md:border-[color:var(--border-subtle)] md:pl-8 md:text-left">
              <div className="text-[clamp(2.25rem,4vw,3.25rem)] font-bold tracking-tight text-[color:var(--page-fg)]">
                {STATS_BAND.extra.value}
              </div>
              <div className="mx-auto mt-2 h-[2px] w-8 bg-[#C9A84C]/50 md:mx-0" />
              <p className="mt-2 text-sm text-[color:var(--text-muted)]">{STATS_BAND.extra.label}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
