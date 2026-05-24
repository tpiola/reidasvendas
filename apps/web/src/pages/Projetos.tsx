import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { DEFAULT_OG_IMAGE } from '@/lib/seo-meta';
import { PROJECTS } from '@/data/projects';
import { Reveal } from '@/components/Reveal';
import { PageHero } from '@/components/shipper/PageHero';
import { BuiltFromScratchNotice } from '@/components/BuiltFromScratchNotice';

export default function Projetos() {
  useEffect(() => {
    applySeo({
      title: 'Projetos por segmento — Rei das Vendas',
      description:
        'Soluções digitais para saúde, advocacia, imobiliário e varejo. Cada projeto é exclusivo — vídeo, escopo e CTA para diagnóstico.',
      canonicalPath: '/projetos',
      ogImage: DEFAULT_OG_IMAGE,
    });
  }, []);

  return (
    <main className="page-surface">
      <PageHero
        eyebrow="Projetos"
        title="Estruturas que"
        titleAccent="convertem."
        subtitle="Um funil por segmento. Exclusivo — nunca cópia."
      >
        <BuiltFromScratchNotice className="mx-auto mt-6 max-w-xl" />
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <article className="glass-card group overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1">
                <Link to={`/projetos/${project.slug}`} className="block">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={`Projeto ${project.title} — ${project.niche}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-sm bg-black/50 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                      {project.niche}
                    </span>
                  </div>
                  <div className="p-8">
                    <h2 className="text-2xl font-semibold text-surface group-hover:text-[#C9A84C]/90">{project.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-surface-muted">{project.tagline}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.features.map((feat) => (
                        <span
                          key={feat}
                          className="rounded-sm border border-[color:var(--border-subtle)] bg-[color:var(--surface)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-surface-muted"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                    <span className="mt-8 inline-block text-[11px] font-bold uppercase tracking-[0.24em] text-[#0057FF]/80">
                      {project.ctaLabel} →
                    </span>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <Link
            to="/diagnostico"
            className="btn-glow inline-flex h-14 items-center justify-center px-12 text-[11px] font-bold uppercase tracking-[0.28em] text-white"
          >
            Agendar diagnóstico
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
