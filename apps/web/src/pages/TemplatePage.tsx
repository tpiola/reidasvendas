import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import type { TemplateDefinition } from '@/data/templates';
import { findTemplate } from '@/data/templates';
import { ModulePicker } from '@/components/ModulePicker';
import { PricingBreakdown } from '@/components/PricingBreakdown';
import { LeadForm } from '@/components/LeadForm';
import { isTemplateUnlocked, unlockTemplate } from '@/utils/unlock';
import { quoteTemplate } from '@/utils/pricing';
import { InlineVideo } from '@/components/home/InlineVideo';
import { getTemplateDemoVideo } from '@/lib/template-videos';
import { CTA } from '@/lib/cta-copy';

type PreviewState = {
  previewTemplate?: TemplateDefinition;
  selectedModuleIds?: string[];
};

export default function TemplatePage() {
  const { slug } = useParams();
  const location = useLocation();
  const [search] = useSearchParams();

  const previewState = (location.state ?? {}) as PreviewState;
  const fromBuilder = slug === 'preview' && previewState.previewTemplate;
  const template = useMemo(() => {
    if (fromBuilder) return previewState.previewTemplate ?? null;
    return findTemplate(slug);
  }, [fromBuilder, previewState.previewTemplate, slug]);

  const [selected, setSelected] = useState<string[]>(() => {
    if (previewState.selectedModuleIds && previewState.selectedModuleIds.length > 0) {
      return previewState.selectedModuleIds;
    }
    return template?.includedModuleIds ?? [];
  });

  useEffect(() => {
    if (template) setSelected((prev) => (prev.length > 0 ? prev : template.includedModuleIds));
  }, [template]);

  const isUnlocked = useMemo(() => {
    if (!slug) return false;
    return isTemplateUnlocked(slug);
  }, [slug]);

  const quote = useMemo(() => {
    if (!template) return null;
    return quoteTemplate(template, selected);
  }, [selected, template]);

  useEffect(() => {
    if (!template) return;
    const isPreview = template.slug === 'preview';
    applySeo({
      title: `${template.name} — Templates Rei das Vendas`,
      description: `${template.niche}. ${template.tagline}`,
      canonicalPath: isPreview ? '/templates' : `/templates/${template.slug}`,
      ogImage: template.coverImageUrl,
      robots: isPreview ? 'noindex,nofollow' : undefined,
    });
  }, [slug, template]);

  useEffect(() => {
    if (search.get('intent') !== 'price') return;
    const el = document.getElementById('preco');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [search]);

  if (!template) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Template não encontrado</h1>
        <p className="mt-3 text-sm text-black/65">
          Volte ao catálogo para escolher um template disponível.
        </p>
        <div className="mt-8">
          <Link
            to="/templates"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-5 text-sm font-semibold text-white transition-colors hover:bg-black/85"
          >
            Ver catálogo
          </Link>
        </div>
      </main>
    );
  }

  const included = template.includedModuleIds;

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden border-b border-black/10">
        <div className="absolute inset-0">
          <img
            src={template.coverImageUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
            {template.niche}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {template.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
            {template.tagline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to={`/templates/${template.slug}?intent=price`}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Ver preço
            </Link>
            <Link
              to="/builder"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Montar com módulos
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-black/[0.02] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-black/45">Demo</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-black/10">
            <InlineVideo
              src={getTemplateDemoVideo(template.slug)}
              poster={template.coverImageUrl}
              caption={`${template.name} · preview`}
            />
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              to="/diagnostico"
              className="btn-glow inline-flex h-12 items-center justify-center px-10 text-[10px] font-bold uppercase tracking-[0.24em] text-white"
            >
              {CTA.orcamento}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-7">
          <h2 className="text-xl font-semibold tracking-tight">Galeria</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {template.galleryImageUrls.map((src) => (
              <div
                key={src}
                className="overflow-hidden rounded-2xl border border-black/10"
              >
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="rounded-2xl border border-black/10 bg-black/2 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
              Módulos
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">O que o hub pode ter</h2>
            <p className="mt-2 text-sm leading-relaxed text-black/65">
              Selecione o que faz sentido para o nicho. O valor cresce conforme o escopo aumenta.
            </p>
          </div>

          <div className="mt-5">
            <ModulePicker
              selected={selected}
              disabledIds={included}
              onToggle={(id) =>
                setSelected((prev) => {
                  const base = new Set(prev);
                  if (included.includes(id)) return Array.from(base);
                  if (base.has(id)) base.delete(id);
                  else base.add(id);
                  return Array.from(base);
                })
              }
            />
          </div>
        </div>
      </section>

      <section id="preco" className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          {!quote ? null : isUnlocked ? (
            <PricingBreakdown quote={quote} />
          ) : (
            <LeadForm
              source={fromBuilder ? 'template_builder' : 'template_price'}
              title="Para ver preço e receber a proposta"
              description="Você desbloqueia os valores, recebe a proposta e entra no fluxo de automações (webhook)."
              ctaLabel="Ver preço e proposta"
              context={{
                intent: 'price',
                template: {
                  slug: slug ?? template.slug,
                  name: template.name,
                  niche: template.niche,
                },
                quote,
              }}
              onSuccess={() => {
                if (slug) unlockTemplate(slug);
              }}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-lg shadow-black/5 md:p-8"
            />
          )}
        </div>
      </section>
    </main>
  );
}
