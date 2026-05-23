import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { TEMPLATES } from '@/data/templates';
import { TemplateCard } from '@/components/TemplateCard';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';
import { BuiltFromScratchNotice } from '@/components/BuiltFromScratchNotice';
import { DEFAULT_OG_IMAGE } from '@/lib/seo-meta';

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
      <section className="relative overflow-hidden border-b border-white/[0.06] py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(0,87,255,0.15)_0%,transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">Catálogo completo</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Amostras do que construímos para clientes
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">
            Referências de estética e estrutura por nicho — para você visualizar o nível da entrega antes do diagnóstico.
          </p>
          <BuiltFromScratchNotice className="mt-6" />
        </div>
      </section>

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
            to="/contato"
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
