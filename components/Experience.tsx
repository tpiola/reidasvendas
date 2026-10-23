'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { track, trackWhatsapp } from '@/lib/tracking';

export default function Experience() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const header = document.querySelector<HTMLElement>('.site-header');
    const progress = document.querySelector<HTMLElement>(
      '.scroll-progress span',
    );
    let frame = 0;
    const reached = new Set<number>();
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      if (progress)
        progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
      header?.classList.toggle('is-compact', window.scrollY > 56);
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
                  easing: 'cubic-bezier(.16,1,.3,1)',
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
    const hero = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        track('view_hero', { page: window.location.pathname });
        heroObserver.disconnect();
      }
    });
    if (hero) heroObserver.observe(hero);
    const click = (event: MouseEvent) => {
      const target = (event.target as Element).closest<HTMLAnchorElement>('a');
      if (!target) return;
      if (target.href.includes('/go/whatsapp')) {
        const url = new URL(target.href);
        const eventId = crypto.randomUUID();
        const placement = url.searchParams.get('src') || 'body';
        url.searchParams.set('event_id', eventId);
        url.searchParams.set('page', window.location.pathname);
        target.href = url.toString();
        trackWhatsapp(eventId, placement, window.location.pathname);
      } else if (target.dataset.event)
        track(target.dataset.event, { page: window.location.pathname });
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
      document.removeEventListener('click', click, true);
      document.removeEventListener('keydown', key);
      reveal.disconnect();
      heroObserver.disconnect();
    };
  }, [pathname]);
  return null;
}
