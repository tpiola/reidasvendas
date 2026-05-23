import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { PLAN_DETAILS } from '@/data/plans';
import { PlanPageShell } from '@/components/planos/PlanPageShell';

export default function PlanoEscala() {
  const plan = PLAN_DETAILS.escala;
  useEffect(() => {
    applySeo({
      title: plan.seoTitle,
      description: plan.seoDescription,
      canonicalPath: '/planos/escala',
    });
  }, [plan]);
  return <PlanPageShell plan={plan} />;
}
