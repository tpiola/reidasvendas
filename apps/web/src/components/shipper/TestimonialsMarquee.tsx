import { Reveal } from '@/components/Reveal';
import { TESTIMONIALS_SECTION, TESTIMONIALS } from '@/lib/home-content';

export function TestimonialsMarquee() {
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="overflow-hidden border-y border-white/[0.04] bg-[#08080B] py-20 md:py-28" aria-label="Depoimentos">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">
            {TESTIMONIALS_SECTION.eyebrow}
          </span>
          <h2 className="mt-4 text-heading font-semibold text-white">
            {TESTIMONIALS_SECTION.title}
            <span className="text-gradient-titanium"> {TESTIMONIALS_SECTION.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/40">{TESTIMONIALS_SECTION.disclaimer}</p>
        </Reveal>
      </div>

      <div className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#08080B] to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#08080B] to-transparent md:w-24" />
        <div className="flex animate-marquee gap-5">
          {items.map((t, i) => (
            <figure
              key={`${t.role}-${i}`}
              className="card-dark w-[min(340px,85vw)] shrink-0 p-6"
            >
              <blockquote className="text-sm leading-relaxed text-white/55">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 border-t border-white/[0.06] pt-4">
                <p className="text-xs font-semibold text-white/80">{t.role}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">{t.segment}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
