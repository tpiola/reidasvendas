import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { BRAND } from '@/lib/brand';
import { DEFAULT_OG_IMAGE } from '@/lib/seo-meta';
import { LeadForm } from '@/components/LeadForm';
import { PageHero } from '@/components/shipper/PageHero';

export default function Contato() {
  useEffect(() => {
    applySeo({
      title: 'Contato — Rei das Vendas',
      description: 'Agende diagnóstico: nome, e-mail e WhatsApp. Resposta em até 24h com rota e próximos passos.',
      canonicalPath: '/contato',
      ogImage: DEFAULT_OG_IMAGE,
    });
  }, []);

  return (
    <main className="bg-[#030305] text-white">
      <PageHero
        eyebrow="Contato"
        title="Diagnóstico em até"
        titleAccent="24 horas."
        subtitle="Preencha nome, e-mail e WhatsApp. Devolvemos rota, escopo e próximo passo — linguagem direta, sem enrolação."
      >
        <p className="mt-6 text-sm text-white/45">
          E-mail:{' '}
          <a href={`mailto:${BRAND.email}`} className="text-[#C9A84C]/90 underline-offset-2 hover:underline">
            {BRAND.email}
          </a>
          {' · '}
          <a
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="text-[#C9A84C]/90 underline-offset-2 hover:underline"
          >
            WhatsApp
          </a>
        </p>
      </PageHero>

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
        <p className="mt-8 text-center text-sm text-white/40">
          Prefere a página dedicada?{' '}
          <Link to="/diagnostico" className="text-[#C9A84C]/85 hover:underline">
            Ir para diagnóstico estratégico
          </Link>
        </p>
      </section>
    </main>
  );
}
