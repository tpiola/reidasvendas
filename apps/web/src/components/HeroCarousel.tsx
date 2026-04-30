import { useEffect, useMemo, useState } from 'react';
import { cn } from '@altiq/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
  src: string;
  alt: string;
};

type HeroCarouselProps = {
  slides: Slide[];
  className?: string;
  intervalMs?: number;
  showContent?: boolean;
  showControls?: boolean;
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function HeroCarousel({
  slides,
  className,
  intervalMs = 7000,
  showContent = true,
  showControls = true,
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const safeSlides = useMemo(() => (slides.length ? slides : []), [slides]);
  const max = safeSlides.length;

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    if (max <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % max);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, max, reduceMotion]);

  useEffect(() => {
    if (max === 0) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + max) % max);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % max);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [max]);

  if (max === 0) return null;

  const prev = (index - 1 + max) % max;
  const next = (index + 1) % max;
  const shouldRender = (i: number) => i === index || i === prev || i === next;

  return (
    <section className={cn('relative overflow-hidden', className)} aria-label="Carrossel">
      <div className="relative">
        <div className="relative aspect-[16/9] min-h-[320px] w-full md:aspect-[21/9] md:min-h-[520px]">
          {safeSlides.map((s, i) => {
            if (!shouldRender(i)) return null;
            return (
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                loading={i === index ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={i === index ? 'high' : 'auto'}
                className={cn(
                  'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
                  i === index ? 'opacity-100' : 'opacity-0',
                )}
              />
            );
          })}

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65" />
          <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_35%,rgba(255,255,255,0.14),rgba(0,0,0,0))]" />
        </div>

        {showContent && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
            <div className="mx-auto max-w-6xl px-6 pt-20 md:pt-24">
              <div className="max-w-3xl">
                <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
                  Plataforma premium de operações digitais com IA
                </p>
                <h1 className="mt-7 text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
                  Arquitetura para sites, funis e automações
                </h1>
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                  Estruture aquisição, conversão e follow-up com padrões de design, SEO e mensuração.
                </p>
              </div>
            </div>
          </div>
        )}

        {showControls && (
          <div className="absolute inset-x-0 bottom-4 z-20">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
              <div className="flex items-center gap-2" aria-label="Indicadores">
                {safeSlides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ir para o slide ${i + 1}`}
                    aria-current={i === index}
                    className={cn(
                      'h-2.5 w-2.5 rounded-full border transition-colors',
                      i === index
                        ? 'border-white bg-white'
                        : 'border-white/55 bg-white/0 hover:bg-white/25',
                    )}
                  />
                ))}
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i - 1 + max) % max)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white/85 backdrop-blur transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Slide anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i + 1) % max)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white/85 backdrop-blur transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Próximo slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
