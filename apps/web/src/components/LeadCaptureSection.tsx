import { LeadForm } from '@/components/LeadForm';
import type { LeadSource } from '@altiq/types';

type LeadCaptureSectionProps = {
  source: LeadSource;
  headline: string;
  description: string;
  intent: string;
  ctaLabel?: string;
  id?: string;
  className?: string;
};

export function LeadCaptureSection({
  source,
  headline,
  description,
  intent,
  ctaLabel,
  id,
  className,
}: LeadCaptureSectionProps) {
  return (
    <section
      id={id}
      className={
        className ??
        'border-t border-white/10 bg-[#090D12] text-white'
      }
      aria-label="Captura de lead"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-12 md:items-start md:py-16">
        <div className="md:col-span-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
            Diagnóstico
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{headline}</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">{description}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {['Resposta em até 1 dia útil', 'Rastreio de origem (UTM)', 'Próximos passos por automação'].map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/75">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="rounded-3xl border border-white/10 bg-black/70 p-6 shadow-2xl shadow-black/40 md:p-8">
            <LeadForm
              source={source}
              formVariant="minimal"
              title="Solicitar diagnóstico estratégico"
              description="Nome, e-mail e WhatsApp. Retorno com rota, escopo inicial e próximos passos."
              ctaLabel={ctaLabel ?? 'Solicitar diagnóstico'}
              context={{ intent }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

