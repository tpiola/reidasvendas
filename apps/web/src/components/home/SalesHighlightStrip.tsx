import { Reveal } from '@/components/Reveal';
import { SALES_HIGHLIGHTS } from '@/lib/home-content';
import { SALES_PHOTOS } from '@/lib/media';

const IMG_MAP = {
  revenue: SALES_PHOTOS.revenue,
  profit: SALES_PHOTOS.profit,
  growth: SALES_PHOTOS.growth,
} as const;

export function SalesHighlightStrip() {
  return (
    <section className="border-y border-white/[0.04] bg-[#08080B] py-16 md:py-20" aria-label="Resultados de vendas">
      <div className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-3">
        {SALES_HIGHLIGHTS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <article className="group relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
              <img
                src={IMG_MAP[item.imgKey]}
                alt={item.title}
                width={1200}
                height={750}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <h3 className="absolute bottom-5 left-5 text-sm font-bold uppercase tracking-[0.2em] text-white">
                {item.title}
              </h3>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
