import { useEffect, useRef, useState } from 'react';

/**
 * MarqueeDivider — divisor tipográfico premium (padrão Obys):
 * linha de texto outline gigante em movimento infinito, com uma
 * palavra-chave em serif itálica (anti-template). Sem lib extra:
 * CSS puro + duplicação de conteúdo. Pausa em prefers-reduced-motion.
 */
type MarqueeDividerProps = {
  items: readonly string[];
  /** palavra que recebe o destaque serif itálico (se existir no item) */
  accent?: string;
  ariaLabel?: string;
};

export function MarqueeDivider({ items, accent, ariaLabel = 'Capacidades' }: MarqueeDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPaused(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPaused(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const renderItem = (item: string, key: string) => {
    if (accent && item.toLowerCase().includes(accent.toLowerCase())) {
      const idx = item.toLowerCase().indexOf(accent.toLowerCase());
      const before = item.slice(0, idx);
      const rest = item.slice(idx + accent.length);
      return (
        <span key={key} className="rdv-marquee-divider__word">
          {before}
          <em>{accent}</em>
          {rest}
        </span>
      );
    }
    return (
      <span key={key} className="rdv-marquee-divider__word">
        {item}
      </span>
    );
  };

  // Duplica para o loop ser perfeito (largura 200%)
  const sequence = [...items, ...items];

  return (
    <div
      ref={ref}
      className={`rdv-marquee-divider${paused ? ' is-paused' : ''}`}
      role="presentation"
      aria-label={ariaLabel}
    >
      <div className="rdv-marquee-divider__track">
        <div className="rdv-marquee-divider__group" aria-hidden="false">
          {sequence.map((item, i) => renderItem(item, `a-${i}`))}
        </div>
        <div className="rdv-marquee-divider__group" aria-hidden="true">
          {sequence.map((item, i) => renderItem(item, `b-${i}`))}
        </div>
      </div>
    </div>
  );
}
