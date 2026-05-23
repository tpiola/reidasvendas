import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { PLAN_DETAILS } from '@/data/plans';
import { PlanPageShell } from '@/components/planos/PlanPageShell';

export default function PlanoCrescimento() {
  const plan = PLAN_DETAILS.crescimento;
  useEffect(() => {
    applySeo({
      title: plan.seoTitle,
      description: plan.seoDescription,
      canonicalPath: '/planos/crescimento',
    });
  }, [plan]);
  return <PlanPageShell plan={plan} />;
}
