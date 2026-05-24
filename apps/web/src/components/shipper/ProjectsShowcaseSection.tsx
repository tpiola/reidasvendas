import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { PROJECTS } from '@/data/projects';
import { PROJECTS_HOME_SECTION } from '@/lib/home-content';

export function ProjectsShowcaseSection() {
  return (
    <section
      id="projetos"
      className="border-y border-[color:var(--border-subtle)] bg-[color:var(--surface)] py-20 md:py-28"
      aria-labelledby="projects-home-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">
            {PROJECTS_HOME_SECTION.eyebrow}
          </span>
          <h2 id="projects-home-heading" className="mt-4 text-heading font-semibold text-[color:var(--page-fg)]">
            {PROJECTS_HOME_SECTION.title}
            <span className="text-gradient-titanium"> {PROJECTS_HOME_SECTION.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-[color:var(--text-muted)]">{PROJECTS_HOME_SECTION.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                to={`/projetos/${p.slug}`}
                className="card-dark group flex h-full flex-col overflow-hidden transition-colors hover:border-[#0057FF]/30"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={`Referência visual — ${p.title}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 576px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080B] via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 text-[9px] font-bold uppercase tracking-[0.22em] text-white/80">
                    {p.niche}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-[color:var(--page-fg)] group-hover:text-[#C9A84C]/90">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-[color:var(--text-muted)]">{p.tagline}</p>
                  <span className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0057FF]/80">
                    Ver solução →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Link
            to="/projetos"
            className="btn-glow inline-flex h-14 items-center justify-center px-12 text-[11px] font-bold uppercase tracking-[0.28em] text-white"
          >
            Ver todos os projetos
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
