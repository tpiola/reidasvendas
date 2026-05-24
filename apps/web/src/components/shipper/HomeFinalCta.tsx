import { Reveal } from '@/components/Reveal';
import { LeadForm } from '@/components/LeadForm';
import { HOME_CTA } from '@/lib/home-content';
import { FORM } from '@/lib/cta-copy';

export function HomeFinalCta() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--page-bg)] py-24 md:py-32" id="diagnostico-form">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,87,255,0.14)_0%,transparent_65%)]" />
      <div
        className="pointer-events-none absolute -top-[20%] -left-[10%] h-[400px] w-[400px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #0057FF, transparent 70%)' }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-start gap-16 px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <h2 className="text-heading font-semibold text-[color:var(--page-fg)]">
              {HOME_CTA.title}
              <span className="text-gradient-accent"> {HOME_CTA.titleAccent}</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[color:var(--text-muted)]">{HOME_CTA.subtitle}</p>
            <ul className="mt-8 space-y-3 text-sm text-[color:var(--text-muted)]">
              {HOME_CTA.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="md:col-span-7">
          <div className="glass-card relative overflow-hidden rounded-2xl p-8 md:p-10">
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0057FF]/40 to-transparent" />
            <LeadForm
              source="hero"
              formVariant="minimal"
              title={FORM.title}
              description={FORM.description}
              ctaLabel={FORM.cta}
              context={{ intent: 'diagnostico' }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
