import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { DEFAULT_OG_IMAGE } from '@/lib/seo-meta';
import { findProject, getProjectCanonicalSlug } from '@/data/projects';
import { BRAND } from '@/lib/brand';
import { Reveal } from '@/components/Reveal';
import { InlineVideo } from '@/components/home/InlineVideo';
import { HERO_POSTER } from '@/lib/media';
import { BuiltFromScratchNotice } from '@/components/BuiltFromScratchNotice';

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const canonical = slug ? getProjectCanonicalSlug(slug) : '';
  const project = findProject(slug);

  useEffect(() => {
    if (!project) return;
    applySeo({
      title: `${project.title} — Projetos | Rei das Vendas`,
      description: project.tagline,
      canonicalPath: `/projetos/${project.slug}`,
      ogImage: project.imageUrl || DEFAULT_OG_IMAGE,
    });
  }, [project]);

  if (slug && canonical !== slug) {
    return <Navigate to={`/projetos/${canonical}`} replace />;
  }

  if (!project) {
    return <Navigate to="/projetos" replace />;
  }

  return (
    <main className="page-surface">
      <section className="hero-dark relative overflow-hidden border-b border-[color:var(--border-subtle)] py-16 sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(0,87,255,0.16)_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <nav className="text-[11px] hero-ink-muted" aria-label="Breadcrumb">
            <Link to="/projetos" className="hover:text-white/80">
              Projetos
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{project.title}</span>
          </nav>
          <Reveal className="mt-8 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">{project.niche}</p>
            <h1 className="mt-4 text-display font-semibold hero-ink">{project.title}</h1>
            <p className="mt-6 text-lg leading-relaxed hero-ink-muted">{project.tagline}</p>
            <BuiltFromScratchNotice className="mt-6" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <Reveal>
            <div className="glass-card overflow-hidden rounded-2xl p-2">
              <InlineVideo src={project.videoSrc} poster={HERO_POSTER} caption={project.videoCaption} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-[color:var(--text-muted)]">{project.story}</p>
            <ul className="mt-8 space-y-3">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-[color:var(--text-muted)]">
                  <span className="text-[#0057FF]" aria-hidden>
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/diagnostico"
                className="btn-glow touch-target inline-flex h-12 w-full items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em] text-white sm:w-auto"
              >
                {project.ctaLabel}
              </Link>
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost touch-target inline-flex h-12 w-full items-center justify-center px-8 text-[11px] font-bold uppercase tracking-[0.24em] sm:w-auto"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[color:var(--border-subtle)] bg-[color:var(--surface)] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <blockquote className="text-lg leading-relaxed text-[color:var(--text-muted)]">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-[#C9A84C]/85">{project.testimonial.role}</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
