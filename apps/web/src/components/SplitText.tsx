import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  staggerMs?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  /** Palavras que recebem o gradiente dourado (comparação ignora pontuação e caixa). */
  highlightWords?: string[];
}

const normalize = (word: string) => word.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();

export function SplitText({
  text,
  as: Tag = 'h2',
  className = '',
  staggerMs = 40,
  delay = 0,
  threshold = 0.2,
  once = true,
  highlightWords = [],
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const words = text.split(' ');
  const highlightSet = new Set(highlightWords.map(normalize));

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Tag className="inline-flex flex-wrap gap-x-[0.25em]" aria-label={text}>
        {words.map((word, i) => {
          const isHighlight = highlightSet.has(normalize(word));
          return (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden">
              <motion.span
                className={isHighlight ? 'inline-block text-gradient-gold' : 'inline-block'}
                initial={{ y: '100%', opacity: 0 }}
                animate={
                  inView
                    ? { y: 0, opacity: 1 }
                    : { y: '100%', opacity: 0 }
                }
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: delay + i * (staggerMs / 1000),
                }}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </Tag>
    </div>
  );
}
