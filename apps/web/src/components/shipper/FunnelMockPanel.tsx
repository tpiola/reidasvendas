import { useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { FUNNEL_MOCK_TASKS } from '@/lib/home-content';

export function FunnelMockPanel() {
  const reduce = useReducedMotion();

  return (
    <Reveal>
      <div className="glass-card overflow-hidden rounded-2xl border border-white/[0.08]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">
            Rei das Vendas · funil ativo
          </span>
          <span className="flex items-center gap-2 text-[10px] text-[#C9A84C]/80">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C9A84C]" aria-hidden />
            Em execução
          </span>
        </div>
        <ul className="divide-y divide-white/[0.04] p-4 md:p-6">
          {FUNNEL_MOCK_TASKS.map((task, i) => (
            <li key={task.label} className="flex items-start gap-3 py-3">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-[10px] font-bold ${
                  task.done
                    ? 'bg-[#0057FF] text-white'
                    : i === FUNNEL_MOCK_TASKS.findIndex((t) => !t.done)
                      ? 'border border-[#C9A84C]/50 text-[#C9A84C]'
                      : 'border border-white/15 text-white/30'
                }`}
                aria-hidden
              >
                {task.done ? '✓' : i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className={`text-sm ${task.done ? 'text-white/35 line-through' : 'text-white/70'}`}>
                  {task.label}
                </p>
                {!task.done && i === FUNNEL_MOCK_TASKS.findIndex((t) => !t.done) && !reduce ? (
                  <div className="mt-2 h-1 overflow-hidden bg-white/[0.06]">
                    <div className="h-full w-2/3 animate-pulse bg-[#0057FF]/60" />
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-white/[0.06] px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
          Progresso · demonstração visual
        </div>
      </div>
    </Reveal>
  );
}
