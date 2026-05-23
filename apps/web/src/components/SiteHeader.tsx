import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cn } from '@altiq/ui';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';

const NAV_LINKS = [
  { to: '/templates', label: 'Amostras' },
  { to: '/planos', label: 'Planos' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/solucoes', label: 'Soluções' },
] as const;

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'group relative py-1 text-[11px] font-semibold uppercase tracking-[0.26em] transition-colors duration-300',
          isActive
            ? 'text-[color:var(--header-fg)]'
            : 'text-[color:var(--header-fg-muted)] hover:text-[color:var(--header-fg)]',
        )
      }
    >
      {({ isActive }) => (
        <>
          {label}
          <span
            className={cn(
              'absolute -bottom-1 left-0 h-px bg-[#C9A84C] transition-all duration-300',
              isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60',
            )}
          />
        </>
      )}
    </NavLink>
  );
}

export function SiteHeader() {
  const location = useLocation();
  const { isDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const heroGlass = location.pathname === '/' && !scrolled && isDark;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled || !heroGlass
            ? 'border-b border-[color:var(--header-border)] bg-[color:var(--header-surface)] shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-glass-md'
            : 'border-b border-transparent bg-[color:var(--header-surface-overlay)] backdrop-blur-glass-md',
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent"
          aria-hidden
        />

        <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
          <Link
            to="/"
            className="min-w-0 shrink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-label="Rei das Vendas — início"
          >
            <BrandLogo layout="horizontal" size="lg" className="hidden sm:inline-flex" />
            <BrandLogo layout="horizontal" size="md" className="inline-flex sm:hidden" />
          </Link>

          <nav
            className="hidden items-center gap-9 lg:flex"
            aria-label="Navegação principal"
          >
            {NAV_LINKS.map((link) => (
              <NavItem key={link.to} to={link.to} label={link.label} />
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <Link
              to="/contato"
              className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--header-fg-muted)] transition-colors hover:text-[color:var(--header-fg)]"
            >
              Contato
            </Link>
            <Link
              to="/diagnostico"
              className="btn-glow inline-flex h-11 items-center justify-center px-8 text-[10px] font-bold uppercase tracking-[0.28em] text-white"
            >
              Agendar diagnóstico
            </Link>
            <ThemeToggle className="opacity-80 hover:opacity-100" />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle className="h-9 w-9" />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center text-[color:var(--header-fg)]"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[#030305]/97 backdrop-blur-xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-[4.75rem] items-center justify-end px-5 sm:h-20 sm:px-8">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center text-white/80"
              aria-label="Fechar menu"
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="mx-auto flex max-w-lg flex-col px-8 pt-4" aria-label="Navegação mobile">
            <div className="mb-10 flex justify-center border-b border-white/10 pb-10">
              <BrandLogo layout="stacked" size="lg" />
            </div>
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'border-b border-white/[0.06] py-5 text-2xl font-semibold tracking-tight transition-colors',
                    isActive ? 'text-white' : 'text-white/55 hover:text-white',
                  )
                }
              >
                <span className="mr-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contato"
              className="btn-glow mt-10 inline-flex h-14 items-center justify-center text-[11px] font-bold uppercase tracking-[0.28em] text-white"
            >
              Agendar diagnóstico
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
