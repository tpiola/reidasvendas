import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { TEMPLATES } from '@/data/templates';
import { TemplateCard } from '@/components/TemplateCard';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';
import { BuiltFromScratchNotice } from '@/components/BuiltFromScratchNotice';
import { DEFAULT_OG_IMAGE } from '@/lib/seo-meta';
import { PageHero } from '@/components/shipper/PageHero';

export default function Templates() {
  useEffect(() => {
    applySeo({
      title: 'Catálogo de amostras — Rei das Vendas',
      description:
        'Referências visuais de sites por nicho. Cada cliente recebe projeto exclusivo, feito do zero para maximizar conversão.',
      canonicalPath: '/templates',
      ogImage: DEFAULT_OG_IMAGE,
    });
  }, []);

  return (
    <main className="bg-[#030305] text-white">
      <PageHero
        eyebrow="Catálogo completo"
        title="Amostras do que construímos"
        titleAccent="para clientes."
        subtitle="Referências de estética e estrutura por nicho — para visualizar o nível da entrega antes do diagnóstico."
        align="left"
      >
        <BuiltFromScratchNotice className="mt-6" />
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <TemplateCard key={t.slug} template={t} />
          ))}
        </div>
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <Link
            to="/planos"
            className="btn-glow inline-flex h-12 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em] text-white"
          >
            Ver planos e assinaturas
          </Link>
          <Link
            to="/diagnostico"
            className="btn-ghost inline-flex h-12 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em] text-white/75"
          >
            Agendar diagnóstico
          </Link>
        </div>
      </section>

      <LeadCaptureSection
        id="diagnostico"
        source="template_catalog"
        headline="Quer um projeto exclusivo — não uma cópia?"
        description="Nome, e-mail e WhatsApp. Devolvemos rota, escopo e próximo passo em até 24h."
        intent="templates"
      />
    </main>
  );
}
