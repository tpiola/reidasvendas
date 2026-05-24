import { Reveal } from '@/components/Reveal';
import { TESTIMONIALS_SECTION, TESTIMONIALS } from '@/lib/home-content';

export function TestimonialsMarquee() {
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="overflow-hidden border-y border-[color:var(--border-subtle)] bg-[color:var(--surface)] py-16 md:py-24" aria-label="Depoimentos">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">
            {TESTIMONIALS_SECTION.eyebrow}
          </span>
          <h2 className="mt-4 text-heading font-semibold text-[color:var(--page-fg)]">
            {TESTIMONIALS_SECTION.title}
            <span className="text-gradient-accent"> {TESTIMONIALS_SECTION.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[color:var(--text-muted)]">{TESTIMONIALS_SECTION.disclaimer}</p>
        </Reveal>
      </div>

      <div className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[color:var(--surface)] to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[color:var(--surface)] to-transparent md:w-24" />
        <div className="flex animate-marquee gap-5">
          {items.map((t, i) => (
            <figure
              key={`${t.role}-${i}`}
              className="card-dark w-[min(340px,85vw)] shrink-0 p-6"
            >
              <blockquote className="text-sm leading-relaxed text-[color:var(--text-muted)]">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 border-t border-[color:var(--border-subtle)] pt-4">
                <p className="text-xs font-semibold text-[color:var(--page-fg)]">{t.role}</p>
                {t.segment ? (
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">{t.segment}</p>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
