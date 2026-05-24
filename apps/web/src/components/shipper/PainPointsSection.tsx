import { Reveal } from '@/components/Reveal';
import { PAIN_POINTS, PAIN_SECTION } from '@/lib/home-content';
import { SectionShell } from '@/components/shipper/SectionShell';

export function PainPointsSection() {
  return (
    <SectionShell
      eyebrow={PAIN_SECTION.eyebrow}
      title={PAIN_SECTION.title}
      subtitle={PAIN_SECTION.subtitle}
      variant="dark"
      className="bg-[#08080B] border-y border-white/[0.04]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {PAIN_POINTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <article className="card-dark border-l-2 border-l-[#C9A84C]/50 p-6">
              <h3 className="text-base font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-white/45">{p.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
