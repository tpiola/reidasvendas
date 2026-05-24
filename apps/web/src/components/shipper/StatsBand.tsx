import { Reveal } from '@/components/Reveal';
import { TRUST_STATS, STATS_BAND } from '@/lib/home-content';

export function StatsBand() {
  return (
    <section className="section-white border-y border-black/[0.06] py-20 md:py-28" aria-label="Números">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <h2 className="text-heading font-semibold text-[#0A0A0B]">{STATS_BAND.title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[#0A0A0B]/45">{STATS_BAND.subtitle}</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {TRUST_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center md:border-l md:border-black/[0.06] md:pl-8 md:text-left">
                <div className="text-[clamp(2.25rem,4vw,3.25rem)] font-bold tracking-tight text-[#0A0A0B]">
                  {s.value}
                </div>
                <div className="mx-auto mt-2 h-[2px] w-8 bg-[#0057FF]/40 md:mx-0" />
                <p className="mt-2 text-sm text-[#0A0A0B]/45">{s.label}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.24}>
            <div className="text-center md:border-l md:border-black/[0.06] md:pl-8 md:text-left">
              <div className="text-[clamp(2.25rem,4vw,3.25rem)] font-bold tracking-tight text-[#0A0A0B]">
                {STATS_BAND.extra.value}
              </div>
              <div className="mx-auto mt-2 h-[2px] w-8 bg-[#C9A84C]/50 md:mx-0" />
              <p className="mt-2 text-sm text-[#0A0A0B]/45">{STATS_BAND.extra.label}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
