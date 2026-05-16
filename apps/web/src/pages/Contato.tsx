import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { LeadForm } from '@/components/LeadForm';

export default function Contato() {
  useEffect(() => {
    applySeo({
      title: 'Contato — Rei das Vendas',
      description: 'Entre em contato e receba proposta e próximos passos.',
      canonicalPath: '/contato',
    });
  }, []);

  return (
    <main className="bg-white">
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
            Contato
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Receba seu diagnóstico gratuito em até 24 horas.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/65">
            Conte seu objetivo, mercado e prazo. Você recebe rota recomendada, escopo claro e próximos passos — sem compromisso e sem enrolação comercial.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">Como funciona</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">Lead → webhook → automações</h2>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                As solicitações de proposta direcionam para captura. Em seguida, o webhook encaminha o payload para automações e roteamento do lead.
              </p>
            </div>
          </div>
          <div className="md:col-span-6">
            <LeadForm
              source="footer"
              formVariant="full"
              title="Solicitar diagnóstico estratégico"
              description="Envie seus dados e contexto. Resposta em até 1 dia útil com rota recomendada, escopo e próximos passos."
              ctaLabel="Enviar diagnóstico"
              context={{ intent: 'contact' }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
