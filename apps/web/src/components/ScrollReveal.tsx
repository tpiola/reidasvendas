/* ═══════════════════════════════════════════
   SCROLLREVEAL.TSX — Rei das Vendas
   Wrapper de animação com IntersectionObserver
   Props: direction, delay, threshold, stagger
═══════════════════════════════════════════ */

import React, { useRef, useEffect, useState, useMemo, Children, cloneElement, isValidElement } from 'react';

type Direction = 'up' | 'left' | 'right';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number; // 0–1 seconds
  threshold?: number; // 0–1
  className?: string;
  as?: 'div' | 'section' | 'article' | 'span';
  stagger?: boolean;
  staggerDelay?: number; // seconds between each child
  once?: boolean;
}

const DEFAULT_CLASSES: Record<Direction, string> = {
  up: 'translate-y-8',
  left: '-translate-x-8',
  right: 'translate-x-8',
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.15,
  className = '',
  as: Tag = 'div',
  stagger = false,
  staggerDelay = 0.12,
  once = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const observerOptions = useMemo(
    () => ({
      threshold: Math.min(Math.max(threshold, 0), 1),
      rootMargin: '0px 0px -40px 0px',
    }),
    [threshold],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (once) {
          setHasAnimated(true);
          observer.unobserve(el);
        }
      } else if (!once) {
        setIsVisible(false);
      }
    }, observerOptions);

    observer.observe(el);
    return () => observer.disconnect();
  }, [observerOptions, once]);

  const show = isVisible || hasAnimated;

  const baseClasses = [
    'scroll-reveal',
    'transition-all',
    'duration-700',
    'ease-out-expo',
    show ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0',
    !show && DEFAULT_CLASSES[direction],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Stagger mode — wrap each child with its own delay
  if (stagger) {
    const kids = Children.toArray(children);
    return (
      <Tag ref={containerRef} className={`${baseClasses} flex flex-col`}>
        {kids.map((child, i) => {
          const childDelay = delay + i * staggerDelay;
          if (isValidElement(child)) {
            return cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
              style: {
                ...(child.props as { style?: React.CSSProperties }).style,
                transitionDelay: `${childDelay}s`,
                transitionProperty: 'opacity, transform',
                transitionDuration: '0.7s',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              },
            });
          }
          return child;
        })}
      </Tag>
    );
  }

  return (
    <Tag
      ref={containerRef}
      className={baseClasses}
      style={{
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </Tag>
  );
};

export default ScrollReveal;
