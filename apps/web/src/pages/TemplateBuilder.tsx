import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { TEMPLATES } from '@/data/templates';
import type { TemplateDefinition } from '@/data/templates';
import { ModulePicker } from '@/components/ModulePicker';
import { PricingBreakdown } from '@/components/PricingBreakdown';
import { quoteTemplate } from '@/utils/pricing';
import { BRAND } from '@/lib/brand';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 64);
}

function withObjectUrls(files: File[]): string[] {
  return files.map((f) => URL.createObjectURL(f));
}

export default function TemplateBuilder() {
  const navigate = useNavigate();

  const [niche, setNiche] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [tagline, setTagline] = useState('');
  const [baseSlug, setBaseSlug] = useState(TEMPLATES[0]?.slug ?? '');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const baseTemplate = useMemo(() => {
    const t = TEMPLATES.find((x) => x.slug === baseSlug);
    return t ?? TEMPLATES[0];
  }, [baseSlug]);

  const [selected, setSelected] = useState<string[]>(() => baseTemplate?.includedModuleIds ?? []);

  useEffect(() => {
    applySeo({
      title: 'Template Builder — Rei das Vendas',
      description:
        'Monte um template por nicho, selecione módulos do hub e gere uma proposta com valores incrementais.',
      canonicalPath: '/builder',
    });
  }, []);

  useEffect(() => {
    if (!baseTemplate) return;
    setSelected((prev) => {
      const set = new Set(prev);
      for (const id of baseTemplate.includedModuleIds) set.add(id);
      return Array.from(set);
    });
  }, [baseTemplate]);

  const previewTemplate: TemplateDefinition | null = useMemo(() => {
    if (!baseTemplate) return null;
    const safeName = templateName.trim() || 'Template';
    const safeNiche = niche.trim() || 'Nicho';
    const cover = imageUrls[0] ?? BRAND.heroPosterUrl;
    return {
      slug: 'preview',
      name: safeName,
      niche: safeNiche,
      tagline: tagline.trim() || 'Template editorial premium com conversão e automações.',
      coverImageUrl: cover,
      galleryImageUrls: (imageUrls.length > 0 ? imageUrls : baseTemplate.galleryImageUrls).slice(0, 6),
      basePriceCents: baseTemplate.basePriceCents,
      includedModuleIds: baseTemplate.includedModuleIds,
    };
  }, [baseTemplate, imageUrls, niche, tagline, templateName]);

  const quote = useMemo(() => {
    if (!previewTemplate) return null;
    return quoteTemplate(previewTemplate, selected);
  }, [previewTemplate, selected]);

  return (
    <main className="bg-white">
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
            Builder
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Monte um template, selecione módulos e gere a proposta
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/65">
            Defina nicho, nome e direção. Selecione módulos do hub e gere um escopo inicial com valores incrementais. Ao solicitar proposta, a captura encaminha o lead e aciona automações via webhook.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5">
            <h2 className="text-xl font-semibold tracking-tight">Dados do template</h2>

            <label className="mt-5 block text-xs font-semibold text-black/60" htmlFor="niche">
              Nicho
            </label>
            <input
              id="niche"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Ex.: Clínica de estética"
              className="mt-2 h-11 w-full rounded-xl border border-black/15 px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            />

            <label className="mt-4 block text-xs font-semibold text-black/60" htmlFor="name">
              Nome do template
            </label>
            <input
              id="name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Ex.: Estética Lux"
              className="mt-2 h-11 w-full rounded-xl border border-black/15 px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            />

            <label className="mt-4 block text-xs font-semibold text-black/60" htmlFor="tagline">
              Tagline
            </label>
            <input
              id="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Ex.: Editorial minimal com conversão em 2 cliques."
              className="mt-2 h-11 w-full rounded-xl border border-black/15 px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            />

            <label className="mt-4 block text-xs font-semibold text-black/60" htmlFor="base">
              Base de layout
            </label>
            <select
              id="base"
              value={baseSlug}
              onChange={(e) => setBaseSlug(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-black/15 px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              {TEMPLATES.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name} — {t.niche}
                </option>
              ))}
            </select>

            <label className="mt-5 block text-xs font-semibold text-black/60" htmlFor="photos">
              Fotos (você carrega aqui)
            </label>
            <input
              id="photos"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const list = e.target.files ? Array.from(e.target.files) : [];
                setImageUrls(withObjectUrls(list));
              }}
              className="mt-2 block w-full text-sm text-black/70 file:mr-4 file:rounded-xl file:border-0 file:bg-black file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-black/85"
            />
            <p className="mt-2 text-[11px] leading-relaxed text-black/55">
              As imagens ficam no navegador. Para produção, você pode trocar por URLs ou integrar storage.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-black/10 bg-black/2 p-6">
            <h3 className="text-sm font-semibold text-black">Ação</h3>
            <p className="mt-2 text-xs leading-relaxed text-black/60">
              A solicitação de proposta direciona para captura e aciona o webhook com contexto, origem e escopo.
            </p>
            <button
              type="button"
              onClick={() => {
                if (!previewTemplate || !quote) return;
                navigate(`/templates/preview?intent=price&draft=${slugify(`${niche}-${templateName}`)}`, {
                  state: {
                    previewTemplate,
                    selectedModuleIds: selected,
                  },
                });
              }}
              className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-black px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              Abrir página do template
            </button>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
              Módulos
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">Seleção do hub</h2>
            <p className="mt-2 text-sm leading-relaxed text-black/65">
              Marque o que será entregue. Itens inclusos na base já vêm selecionados.
            </p>
          </div>

          <div className="mt-5">
            <ModulePicker
              selected={selected}
              disabledIds={baseTemplate?.includedModuleIds ?? []}
              onToggle={(id) =>
                setSelected((prev) => {
                  const included = baseTemplate?.includedModuleIds ?? [];
                  if (included.includes(id)) return prev;
                  const set = new Set(prev);
                  if (set.has(id)) set.delete(id);
                  else set.add(id);
                  return Array.from(set);
                })
              }
            />
          </div>

          <div className="mt-8">
            {quote ? <PricingBreakdown quote={quote} /> : null}
          </div>
        </div>
      </section>

      <LeadCaptureSection
        id="diagnostico"
        source="template_builder"
        headline="Quer transformar o draft em um sistema real?"
        description="Solicite diagnóstico estratégico para validar arquitetura, escopo e automações antes de executar. Você recebe um plano objetivo com próximos passos."
        intent="builder"
      />
    </main>
  );
}

