import { useEffect, useRef, useCallback } from 'react';

/**
 * Cursor-reactive glow that follows the mouse with smooth interpolation.
 * Only visible on desktop (pointer: fine) and respects prefers-reduced-motion.
 */
export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef(0);

  const animate = useCallback(() => {
    if (!ref.current) return;
    const { x, y } = pos.current;
    ref.current.style.translate = `${x - 120}px ${y - 120}px`;
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(pointer: coarse)');
    if (media.matches || pointer.matches) return;

    const onMove = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [animate]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-[240px] w-[240px] rounded-full opacity-30 blur-3xl transition-opacity duration-700 lg:block"
      style={{
        background:
          'radial-gradient(circle at center, rgba(0,87,255,0.25) 0%, rgba(201,168,76,0.08) 40%, transparent 70%)',
        willChange: 'translate',
      }}
      aria-hidden
    />
  );
}
