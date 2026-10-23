'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track, trackPageView } from '@/lib/tracking';
import { sanitizeBillingCycle, sanitizePlanId } from '@/lib/whatsapp';

/** Replaces the legacy navigation export from lib/consent; mount only one. */
export default function TrackingNavigation() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  useEffect(() => {
    // First PageView is emitted only when optional tags are authorized.
    if (previous.current !== pathname) {
      previous.current = pathname;
      trackPageView(pathname);
    }
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          const plan = sanitizePlanId(element.dataset.planId);
          const cycle = sanitizeBillingCycle(
            element.dataset.billingCycle ||
              element.closest<HTMLElement>('[data-billing-cycle]')?.dataset
                .billingCycle,
          );
          if (!plan) continue;
          const key = `${plan}:${cycle || 'unspecified'}`;
          if (!seen.has(key)) {
            seen.add(key);
            track('plan_view', {
              page: pathname,
              plan_id: plan,
              ...(cycle ? { billing_cycle: cycle } : {}),
            });
          }
          observer.unobserve(element);
        }
      },
      { threshold: 0.35 },
    );
    // Buttons and their parent card may carry the same attributes; dedup per plan/cycle.
    const observePlans = () =>
      document
        .querySelectorAll<HTMLElement>('[data-plan-id]')
        .forEach((element) => observer.observe(element));
    observePlans();
    // Pricing changes cycle in place without a route change.
    const mutations = new MutationObserver(observePlans);
    mutations.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-plan-id', 'data-billing-cycle'],
    });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);
  return null;
}
