import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cn } from '@altiq/ui';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';

const NAV_LINKS = [
  { to: '/solucoes', label: 'Soluções' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/negocios', label: 'Negócios' },
] as const;

export function SiteHeader() {
  const location = useLocation();
  const { isDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroOverlay = location.pathname === '/' && !scrolled && isDark;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'py-2 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors',
      isActive
        ? 'text-[color:var(--header-fg)]'
        : 'text-[color:var(--header-fg-muted)] hover:text-[color:var(--header-fg)]',
    );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b backdrop-blur-glass-md transition-all duration-500',
        heroOverlay
          ? 'border-[color:var(--header-border)] bg-[color:var(--header-surface-overlay)]'
          : 'border-[color:var(--header-border)] bg-[color:var(--header-surface)]',
      )}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6">
        <Link
          to="/"
          className="min-w-0 shrink rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rdv-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page-bg)]"
          aria-label="Ir para a home — Rei das Vendas"
        >
          <BrandLogo layout="horizontal" size="md" className="inline-flex xs:hidden" />
          <BrandLogo layout="horizontal" size="lg" className="hidden xs:inline-flex md:hidden" />
          <BrandLogo layout="horizontal" size="xl" className="hidden md:inline-flex" />
        </Link>

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
          <div className="ml-2 flex items-center gap-3 border-l border-[color:var(--header-border)] pl-5">
            <ThemeToggle />
            <Link to="/contato" className={navLinkClass({ isActive: false })}>
              Contato
            </Link>
            <Link
              to="/contato"
              className={cn(
                'inline-flex h-10 items-center justify-center px-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-transform hover:scale-[1.02]',
                isDark
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-[#0A0A0B] text-white hover:bg-[#1a1a1c]',
              )}
            >
              Começar
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
              'text-[color:var(--header-fg)] hover:bg-[color:var(--header-hover)]',
            )}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="border-t border-[color:var(--header-border)] bg-[color:var(--header-surface)] md:hidden"
          role="dialog"
          aria-label="Menu de navegação"
        >
          <nav className="mx-auto max-w-6xl px-4 py-5 sm:px-6" aria-label="Navegação mobile">
            <div className="mb-6 flex justify-center border-b border-[color:var(--header-border)] pb-6">
              <BrandLogo layout="stacked" size="lg" />
            </div>
            <div className="grid gap-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn('text-base font-semibold', isActive ? 'text-[color:var(--header-fg)]' : 'text-[color:var(--header-fg-muted)]')
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contato"
                className={cn(
                  'mt-2 inline-flex h-12 items-center justify-center text-xs font-bold uppercase tracking-[0.18em]',
                  isDark ? 'bg-white text-black' : 'bg-[#0A0A0B] text-white',
                )}
              >
                Quero diagnóstico com IA
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
