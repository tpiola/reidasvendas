import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { TEMPLATES } from '@/data/templates';
import { TemplateCard } from '@/components/TemplateCard';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';

export default function Templates() {
  useEffect(() => {
    applySeo({
      title: 'Templates — Rei das Vendas',
      description:
        'Escolha um template editorial premium por nicho. Ao ver preço, você entra no fluxo de lead e automações.',
      canonicalPath: '/templates',
    });
  }, []);

  return (
    <main className="bg-white">
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
            Catálogo
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Templates por nicho, com execução premium
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/65">
            Cada template já vem com estrutura de conversão, SEO base e eventos. Quando você clica para ver preço, a página do template abre com captura de lead e o webhook dispara as automações.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <TemplateCard key={t.slug} template={t} />
          ))}
        </div>
      </section>

      <LeadCaptureSection
        id="diagnostico"
        source="template_catalog"
        headline="Quer transformar este catálogo em um sistema operacional?"
        description="Solicite um diagnóstico estratégico. Você recebe uma rota recomendada, escopo inicial e a estrutura mínima para capturar, qualificar e responder com previsibilidade."
        intent="templates"
      />
    </main>
  );
}
