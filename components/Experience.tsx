'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { handleTrackedAction, track } from '@/lib/tracking';

export default function Experience() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const header = document.querySelector<HTMLElement>('.site-header');
    const progress = document.querySelector<HTMLElement>(
      '.scroll-progress span',
    );
    const decorative = document.querySelector<HTMLElement>(
      '[data-scroll-parallax]',
    );
    let frame = 0;
    const reached = new Set<number>();
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      if (progress)
        progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
      header?.classList.toggle('is-compact', window.scrollY > 56);
      if (decorative)
        decorative.style.transform = reduce.matches
          ? 'none'
          : `translateY(${Math.min(12, Math.max(0, window.scrollY * 0.025))}px)`;
      [50, 90].forEach((depth) => {
        if (ratio * 100 >= depth && !reached.has(depth)) {
          reached.add(depth);
          track(`scroll_${depth}`, { page: window.location.pathname });
        }
      });
      frame = 0;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', scroll, { passive: true });
    update();
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!reduce.matches)
              entry.target.animate(
                [
                  { opacity: 0.55, transform: 'translateY(12px)' },
                  { opacity: 1, transform: 'translateY(0)' },
                ],
                {
                  duration: 500,
                  easing: 'cubic-bezier(.23,1,.32,1)',
                  delay: Math.min(
                    300,
                    Math.max(
                      0,
                      Number(
                        (entry.target as HTMLElement).dataset.revealDelay,
                      ) || 0,
                    ),
                  ),
                  fill: 'none',
                },
              );
            reveal.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll('[data-reveal]')
      .forEach((node) => reveal.observe(node));
    const hero = document.querySelector(
      '.hero, .subscription-hero, [data-hero]',
    );
    const scene = document.querySelector<HTMLElement>('.royal-scene');
    let inView = true;
    let viewed = false;
    const motion = () => {
      if (scene)
        scene.dataset.active = String(
          inView && !document.hidden && !reduce.matches,
        );
    };
    const heroObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      motion();
      if (inView && !viewed) {
        viewed = true;
        track('view_hero', { page: window.location.pathname });
      }
    });
    if (hero) heroObserver.observe(hero);
    document.addEventListener('visibilitychange', motion);
    reduce.addEventListener('change', motion);
    motion();
    const click = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const control = event.target.closest<HTMLButtonElement>(
        '[data-motion-toggle]',
      );
      if (control && scene) {
        const paused = scene.dataset.paused !== 'true';
        scene.dataset.paused = String(paused);
        control.setAttribute('aria-pressed', String(paused));
        control.setAttribute(
          'aria-label',
          paused ? 'Retomar animação' : 'Pausar animação',
        );
        return;
      }
      const target = event.target.closest<HTMLElement>(
        'a, button[data-event], [data-event][role="button"]',
      );
      if (!target) return;
      handleTrackedAction(target, window.location.pathname);
      target.closest('details.mobile-menu')?.removeAttribute('open');
    };
    document.addEventListener('click', click, true);
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const menu =
          document.querySelector<HTMLDetailsElement>('.mobile-menu[open]');
        menu?.removeAttribute('open');
        menu?.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scroll);
      if (decorative) decorative.style.transform = 'none';
      document.removeEventListener('click', click, true);
      document.removeEventListener('keydown', key);
      reveal.disconnect();
      heroObserver.disconnect();
      document.removeEventListener('visibilitychange', motion);
      reduce.removeEventListener('change', motion);
    };
  }, [pathname]);
  return null;
}
