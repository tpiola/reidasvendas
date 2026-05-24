import { Reveal } from '@/components/Reveal';
import { DELIVERABLES } from '@/lib/home-content';
import { SectionShell } from '@/components/shipper/SectionShell';

export function DeliverablesGrid() {
  return (
    <SectionShell
      eyebrow={DELIVERABLES.eyebrow}
      title={DELIVERABLES.title}
      titleAccent={DELIVERABLES.titleAccent}
      subtitle={DELIVERABLES.subtitle}
      variant="light"
      align="center"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {DELIVERABLES.categories.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 0.08}>
            <article className="flex h-full flex-col border border-black/[0.06] bg-[#F8F9FC] p-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/70">
                {cat.tag}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[#0A0A0B]">{cat.title}</h3>
              <ul className="mt-6 flex-1 space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[#0A0A0B]/55">
                    <span className="text-[#C9A84C]" aria-hidden>
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
