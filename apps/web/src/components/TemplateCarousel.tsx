import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CarouselSlide {
  id: string;
  content: React.ReactNode;
}

interface TemplateCarouselProps {
  slides: CarouselSlide[];
  className?: string;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  loop?: boolean;
  direction?: 'horizontal' | 'vertical';
}

const slideVariants = {
  enter: (directionNum: number) => ({
    x: directionNum > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (directionNum: number) => ({
    x: directionNum > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
  }),
};

export function TemplateCarousel({
  slides,
  className = '',
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  loop = true,
  direction = 'horizontal',
}: TemplateCarouselProps) {
  const [[current, directionNum], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      const diff = index - current;
      setPage([index, diff]);
    },
    [current]
  );

  const next = useCallback(() => {
    if (current < total - 1) {
      goTo(current + 1);
    } else if (loop) {
      goTo(0);
    }
  }, [current, total, loop, goTo]);

  const prev = useCallback(() => {
    if (current > 0) {
      goTo(current - 1);
    } else if (loop) {
      goTo(total - 1);
    }
  }, [current, total, loop, goTo]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, next, autoPlayInterval, total]);

  if (total === 0) return null;

  const slide = slides[current];

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait" custom={directionNum}>
        <motion.div
          key={slide.id}
          custom={directionNum}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 200, damping: 24 },
            opacity: { duration: 0.35 },
            scale: { duration: 0.35 },
          }}
          className="w-full"
        >
          {slide.content}
        </motion.div>
      </AnimatePresence>

      {showArrows && total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[rgba(3,3,3,0.7)] p-2 text-white/80 backdrop-blur-sm transition-all hover:bg-[rgba(214,168,79,0.2)] hover:text-[#D6A84F]"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[rgba(3,3,3,0.7)] p-2 text-white/80 backdrop-blur-sm transition-all hover:bg-[rgba(214,168,79,0.2)] hover:text-[#D6A84F]"
            aria-label="Próximo slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {showDots && total > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === current
                  ? 'w-6 bg-[#D6A84F]'
                  : 'w-2 bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.4)]'
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
