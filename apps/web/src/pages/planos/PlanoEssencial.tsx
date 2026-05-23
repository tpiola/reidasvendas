import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { PLAN_DETAILS } from '@/data/plans';
import { PlanPageShell } from '@/components/planos/PlanPageShell';

export default function PlanoEssencial() {
  const plan = PLAN_DETAILS.essencial;
  useEffect(() => {
    applySeo({
      title: plan.seoTitle,
      description: plan.seoDescription,
      canonicalPath: '/planos/essencial',
    });
  }, [plan]);
  return <PlanPageShell plan={plan} />;
}
