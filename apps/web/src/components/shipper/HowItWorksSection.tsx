import { Reveal } from '@/components/Reveal';
import { HOW_IT_WORKS } from '@/lib/home-content';
import { SectionShell } from '@/components/shipper/SectionShell';

export function HowItWorksSection() {
  return (
    <SectionShell
      id="como-funciona"
      eyebrow={HOW_IT_WORKS.eyebrow}
      title={HOW_IT_WORKS.title}
      titleAccent={HOW_IT_WORKS.titleAccent}
      subtitle={HOW_IT_WORKS.subtitle}
      variant="light"
      align="center"
      className="border-y border-black/[0.06]"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {HOW_IT_WORKS.steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.08}>
            <article className="h-full border border-black/[0.06] bg-white p-8 text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]">
                Passo {step.num}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[#0A0A0B]">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0A0A0B]/50">{step.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
