import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cn } from '@altiq/ui';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { BRAND } from '@/lib/brand';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/solucoes', label: 'Servicos' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
] as const;

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        cn(
          'rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-300',
          isActive
            ? 'bg-[#0057FF]/15 text-[color:var(--header-fg)]'
            : 'text-[color:var(--header-fg-muted)] hover:bg-[color:var(--header-hover)] hover:text-[color:var(--header-fg)]',
        )
      }
    >
      {label}
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
    const onScroll = () => setScrolled(window.scrollY > 12);
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
          'safe-top fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled || !heroGlass
            ? 'border-b border-[color:var(--header-border)] bg-[color:var(--header-surface)] shadow-[0_8px_32px_rgba(0,0,0,0.08)] lg:backdrop-blur-glass-md'
            : 'border-b border-transparent bg-[color:var(--header-surface-overlay)] lg:backdrop-blur-glass-md',
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent"
          aria-hidden
        />

        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-4 sm:h-[4.75rem] sm:px-8">
          <Link
            to="/"
            className="min-w-0 shrink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
            aria-label="Rei das Vendas — inicio"
          >
            <BrandLogo layout="horizontal" size="lg" className="hidden sm:inline-flex" />
            <BrandLogo layout="horizontal" size="md" className="inline-flex sm:hidden" />
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-full border border-[color:var(--header-border)] bg-[color:var(--header-hover)]/40 p-1 lg:flex"
            aria-label="Navegacao principal"
          >
            {NAV_LINKS.map((link) => (
              <NavItem key={link.to} to={link.to} label={link.label} />
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex h-10 items-center justify-center px-7 text-[10px] font-bold uppercase tracking-[0.26em] text-white"
            >
              WhatsApp
            </a>
            <ThemeToggle className="opacity-85 hover:opacity-100" />
          </div>

          <div className="flex items-center gap-1 lg:hidden">
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
          className="fixed inset-0 z-[60] bg-[color:var(--page-bg)]/98 backdrop-blur-xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-[4.25rem] items-center justify-end px-4 sm:h-[4.75rem] sm:px-8">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center text-[color:var(--page-fg)]"
              aria-label="Fechar menu"
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="mx-auto flex max-w-lg flex-col px-8 pt-2" aria-label="Navegacao mobile">
            <div className="mb-8 flex justify-center border-b border-[color:var(--border-subtle)] pb-8">
              <BrandLogo layout="stacked" size="lg" />
            </div>
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'border-b border-[color:var(--border-subtle)] py-4 text-xl font-semibold tracking-tight',
                    isActive ? 'text-[color:var(--page-fg)]' : 'text-[color:var(--text-muted)]',
                  )
                }
              >
                <span className="mr-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </NavLink>
            ))}
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow mt-8 inline-flex h-14 items-center justify-center text-[11px] font-bold uppercase tracking-[0.28em] text-white"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
