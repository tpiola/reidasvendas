import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { BRAND } from '@/lib/brand';
import { LeadForm } from '@/components/LeadForm';

export default function Contato() {
  useEffect(() => {
    applySeo({
      title: 'Contato — Rei das Vendas',
      description: 'Agende diagnóstico: nome, e-mail e WhatsApp. Resposta em até 24h com rota e próximos passos.',
      canonicalPath: '/contato',
    });
  }, []);

  return (
    <main className="bg-[#030305] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(0,87,255,0.15)_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/80">Contato</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Diagnóstico em até 24 horas
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">
            Preencha nome, e-mail e WhatsApp. Devolvemos rota, escopo e próximo passo — linguagem direta, sem
            enrolação.
          </p>
          <p className="mt-4 text-sm text-white/40">
            E-mail:{' '}
            <a href={`mailto:${BRAND.email}`} className="text-[#C9A84C]/90 underline-offset-2 hover:underline">
              {BRAND.email}
            </a>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <LeadForm
            source="footer"
            formVariant="minimal"
            title="Agendar diagnóstico"
            description="Somente nome, e-mail e WhatsApp."
            ctaLabel="Enviar e receber retorno"
            context={{ intent: 'contact' }}
          />
        </div>
      </section>
    </main>
  );
}
