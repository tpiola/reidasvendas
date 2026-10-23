import { subscriptionPlans } from '@/data/subscription-plans';
export type BillingCycle = 'mensal' | 'anual';
export function selectedSubscription(plan: unknown, cycle: unknown) {
  const selected = subscriptionPlans.find((entry) => entry.id === plan);
  return {
    plan: selected,
    cycle: (cycle === 'anual' ? 'anual' : 'mensal') as BillingCycle,
  };
}
export function money(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  }).format(value);
}
