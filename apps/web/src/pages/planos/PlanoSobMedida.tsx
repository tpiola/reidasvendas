import { useEffect, useState } from 'react';
import { applySeo } from '@/lib/seo';
import { CUSTOM_BUILD_OPTIONS, PLAN_DETAILS } from '@/data/plans';
import { PlanPageShell } from '@/components/planos/PlanPageShell';
import { Reveal } from '@/components/Reveal';

export default function PlanoSobMedida() {
  const plan = PLAN_DETAILS['sob-medida'];
  const [selected, setSelected] = useState<string[]>(['site', 'automacao']);

  useEffect(() => {
    applySeo({
      title: plan.seoTitle,
      description: plan.seoDescription,
      canonicalPath: '/planos/sob-medida',
    });
  }, [plan]);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <PlanPageShell plan={plan} leadContext={{ modules: selected }}>
      <Reveal>
        <h3 className="text-lg font-semibold text-white">O que você quer incluir?</h3>
        <p className="mt-2 text-sm text-white/45">
          Marque os módulos desejados. No formulário ao lado, envie seus dados — usamos essa seleção no diagnóstico.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {CUSTOM_BUILD_OPTIONS.map((opt) => {
            const on = selected.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggle(opt.id)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  on
                    ? 'border-[#0057FF]/50 bg-[#0057FF]/10'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
                aria-pressed={on}
              >
                <span className="text-sm font-semibold text-white">{opt.label}</span>
                <p className="mt-1 text-xs leading-relaxed text-white/45">{opt.description}</p>
              </button>
            );
          })}
        </div>
        <p className="mt-6 text-xs text-white/35">
          Seleção atual: {selected.length > 0 ? selected.join(', ') : 'nenhum módulo'} — confirme no formulário ao
          lado ao enviar.
        </p>
      </Reveal>
    </PlanPageShell>
  );
}
