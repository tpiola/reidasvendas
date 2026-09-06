import { useEffect, useRef, useState } from 'react';

/**
 * MagneticCursor — follower sutil (padrão premium): um ponto dourado
 * segue o mouse com lerp e "gruda" em elementos [data-magnetic] no hover,
 * crescendo levemente. Desktop only (pointer:fine), desligado em
 * prefers-reduced-motion e em touch. Não substitui o cursor nativo —
 * só acompanha. Sem lib extra: rAF + transform.
 */
export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!fine || reduced || touch) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    let raf = 0;
    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let scale = 1;
    let tScale = 1;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
      }
      const target = (e.target as Element | null)?.closest?.('[data-magnetic]');
      tScale = target ? 2.1 : 1;
    };

    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      scale += (tScale - scale) * 0.14;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="rdv-magnetic-dot"
      aria-hidden="true"
      style={{ opacity: 0 }}
    />
  );
}
