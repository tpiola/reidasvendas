import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { cn } from '@altiq/ui';
import { INSIGHT_CATEGORIES, PLATFORM_ITEMS, SERVICE_ITEMS, SOLUTION_ITEMS } from '@/data/siteStructure';

type MegaMenuProps = {
  variant: 'overlay' | 'solid';
};

type ActiveMenu = 'platform' | 'services' | 'solutions' | 'insights' | null;

type SolutionSlug = (typeof SOLUTION_ITEMS)[number]['slug'];

function chipClassName(active = false) {
  return cn(
    'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors',
    active ? 'border-white/15 bg-white/10 text-white' : 'border-white/10 bg-white/5 text-white/70 hover:text-white',
  );
}

function SolutionsPanel({ onMouseLeave }: { onMouseLeave: () => void }) {
  const [active, setActive] = useState<SolutionSlug>((SOLUTION_ITEMS[0]?.slug ?? 'for-brands') as SolutionSlug);
  const category = useMemo(() => SOLUTION_ITEMS.find((c) => c.slug === active) ?? SOLUTION_ITEMS[0], [active]);

  if (!category) return null;

  return (
    <div
      className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-black/95 shadow-2xl shadow-black/50"
      onMouseLeave={onMouseLeave}
    >
      <div className="grid gap-10 px-8 py-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Soluções para</p>
          <ul className="mt-5 grid gap-3">
            {SOLUTION_ITEMS.map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(c.slug)}
                  onFocus={() => setActive(c.slug)}
                  className={cn(
                    'w-full text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                    c.slug === category.slug ? 'text-white' : 'text-white/65 hover:text-white',
                  )}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Explorar</p>
          <Link
            to={`/solucoes/${category.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-lg font-semibold text-white transition-colors hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {category.label}
            <span aria-hidden="true">→</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">{category.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {['Arquitetura', 'Captura', 'Automação', 'Mensuração'].map((chip) => (
              <span key={chip} className={chipClassName()}>
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img
              src={'/hero-slide-2.svg'}
              alt=""
              className="h-[240px] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightsPanel({ onMouseLeave }: { onMouseLeave: () => void }) {
  return (
    <div
      className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-black/95 shadow-2xl shadow-black/50"
      onMouseLeave={onMouseLeave}
    >
      <div className="grid gap-10 px-8 py-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Categorias</p>
          <div className="mt-6 grid gap-7 md:grid-cols-2">
            {INSIGHT_CATEGORIES.map((item) => (
              <Link
                key={item.slug}
                to={`/insights/${item.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/65">{item.description}</p>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 group-hover:text-white">
                  Abrir
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Destaque</p>
          <Link
            to="/insights"
            className="mt-6 block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <div className="relative aspect-[16/9]">
              <img
                src={'/hero-slide-3.svg'}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/20" />
            </div>
            <div className="px-6 py-5">
              <p className="text-sm font-semibold text-white">Build Notes</p>
              <p className="mt-2 text-xs leading-relaxed text-white/65">
                Bastidores do que estamos construindo: decisões de IA, design e operação.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function useOutsidePointerDown(ref: React.RefObject<HTMLElement>, onOutside: () => void) {
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) onOutside();
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [onOutside, ref]);
}

function SectionColumn({
  title,
  items,
  to,
}: {
  title: string;
  items: readonly { slug: string; label: string }[];
  to: (slug: string) => string;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">{title}</p>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              to={to(item.slug)}
              className="block text-sm font-semibold text-white/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MegaMenu({ variant }: MegaMenuProps) {
  const location = useLocation();
  const [active, setActive] = useState<ActiveMenu>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const close = () => setActive(null);

  useEffect(() => {
    close();
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useOutsidePointerDown(rootRef, close);

  const triggerBase = useMemo(
    () =>
      cn(
        'altiq-underline inline-flex items-center gap-2 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors',
        variant === 'overlay' ? 'text-white/85 hover:text-white' : 'text-black/65 hover:text-black',
      ),
    [variant],
  );

  const panelId = active ? `mega-${active}` : undefined;

  return (
    <div ref={rootRef} className="relative">
      <div className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
        <button
          type="button"
          className={triggerBase}
          aria-haspopup="dialog"
          aria-expanded={active === 'platform'}
          aria-controls={panelId}
          onMouseEnter={() => setActive('platform')}
          onFocus={() => setActive('platform')}
          onClick={() => setActive((s) => (s === 'platform' ? null : 'platform'))}
        >
          Plataforma
          <span className={cn('transition-transform', active === 'platform' ? 'rotate-180' : '')}>▾</span>
        </button>

        <button
          type="button"
          className={triggerBase}
          aria-haspopup="dialog"
          aria-expanded={active === 'services'}
          aria-controls={panelId}
          onMouseEnter={() => setActive('services')}
          onFocus={() => setActive('services')}
          onClick={() => setActive((s) => (s === 'services' ? null : 'services'))}
        >
          Serviços
          <span className={cn('transition-transform', active === 'services' ? 'rotate-180' : '')}>▾</span>
        </button>

        <button
          type="button"
          className={triggerBase}
          aria-haspopup="dialog"
          aria-expanded={active === 'solutions'}
          aria-controls={panelId}
          onMouseEnter={() => setActive('solutions')}
          onFocus={() => setActive('solutions')}
          onClick={() => setActive((s) => (s === 'solutions' ? null : 'solutions'))}
        >
          Soluções
          <span className={cn('transition-transform', active === 'solutions' ? 'rotate-180' : '')}>▾</span>
        </button>

        <button
          type="button"
          className={triggerBase}
          aria-haspopup="dialog"
          aria-expanded={active === 'insights'}
          aria-controls={panelId}
          onMouseEnter={() => setActive('insights')}
          onFocus={() => setActive('insights')}
          onClick={() => setActive((s) => (s === 'insights' ? null : 'insights'))}
        >
          Insights
          <span className={cn('transition-transform', active === 'insights' ? 'rotate-180' : '')}>▾</span>
        </button>

        <Link
          to="/work"
          className={cn(
            'py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors',
            variant === 'overlay' ? 'text-white/85 hover:text-white' : 'text-black/65 hover:text-black',
          )}
        >
          Cases
        </Link>

        <Link
          to="/about"
          className={cn(
            'py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors',
            variant === 'overlay' ? 'text-white/85 hover:text-white' : 'text-black/65 hover:text-black',
          )}
        >
          Sobre
        </Link>

        <Link
          to="/conecte-se"
          className={cn(
            'py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors',
            variant === 'overlay' ? 'text-white/85 hover:text-white' : 'text-black/65 hover:text-black',
          )}
        >
          Conecte-se
        </Link>

        <div className="hidden items-center gap-2 lg:flex" aria-label="Redes sociais">
          {[
            { label: 'Instagram', Icon: Instagram, href: '#' },
            { label: 'YouTube', Icon: Youtube, href: '#' },
            { label: 'LinkedIn', Icon: Linkedin, href: '#' },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-colors',
                variant === 'overlay'
                  ? 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  : 'border-black/10 bg-black/2 text-black/65 hover:bg-black/5 hover:text-black',
              )}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <Link
          to="/comecar"
          className={cn(
            'inline-flex h-10 items-center justify-center rounded-xl px-5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors',
            variant === 'overlay'
              ? 'bg-white text-black hover:bg-white/90'
              : 'bg-black text-white hover:bg-black/85',
          )}
        >
          Comece agora
        </Link>
      </div>

      {active && (
        <div id={panelId} role="dialog" aria-label="Menu" className="hidden md:block">
          <div className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm" aria-hidden="true" />
          <div className="fixed left-0 right-0 top-16 z-50 px-6" onMouseLeave={close}>
            {active === 'platform' && (
              <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-black/95 shadow-2xl shadow-black/50">
                <div className="grid gap-10 px-8 py-8 lg:grid-cols-12">
                  <div className="grid gap-10 lg:col-span-9 lg:grid-cols-3">
                    <SectionColumn title="Plataforma" items={PLATFORM_ITEMS} to={(s) => `/platform/${s}`} />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Atalhos</p>
                      <ul className="mt-4 grid gap-3">
                        {[
                          { to: '/platform', label: 'Visão geral' },
                          { to: '/services', label: 'Ver serviços' },
                          { to: '/solucoes', label: 'Ver soluções' },
                        ].map((x) => (
                          <li key={x.to}>
                            <Link
                              to={x.to}
                              className="block text-sm font-semibold text-white/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                            >
                              {x.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Framework</p>
                      <p className="mt-4 text-sm font-semibold text-white">Diagnose → Architect → Build → Activate → Optimize</p>
                      <p className="mt-2 text-xs leading-relaxed text-white/65">Um modelo de execução que cria previsibilidade e melhora a qualidade do lead.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {active === 'services' && (
              <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-black/95 shadow-2xl shadow-black/50">
                <div className="grid gap-10 px-8 py-8 lg:grid-cols-12">
                  <div className="grid gap-10 lg:col-span-9 lg:grid-cols-3">
                    <SectionColumn title="Serviços" items={SERVICE_ITEMS} to={(s) => `/services/${s}`} />
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Padrão de entrega</p>
                      <ul className="mt-4 grid gap-2 text-xs text-white/70">
                        {['Problema', 'Entradas', 'Saídas', 'Critérios', 'Próximos passos'].map((t) => (
                          <li key={t} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Ação</p>
                      <Link
                        to="/contato"
                        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-white px-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-black hover:bg-white/90"
                      >
                        Solicitar diagnóstico
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {active === 'solutions' && <SolutionsPanel onMouseLeave={close} />}
            {active === 'insights' && <InsightsPanel onMouseLeave={close} />}
          </div>
        </div>
      )}
    </div>
  );
}
