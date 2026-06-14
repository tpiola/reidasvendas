import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BRAND } from '@/lib/brand';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[rgba(3,3,5,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="Rei das Vendas - Home">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-[#C9A84C]">REI</span>{' '}
            <span className="text-white">DAS VENDAS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300',
                  isActive
                    ? 'bg-[#0057FF]/15 text-white'
                    : 'text-[rgba(255,255,255,0.55)] hover:bg-[rgba(255,255,255,0.06)] hover:text-white'
                )
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 flex items-center gap-2 rounded-full bg-[#0057FF] px-5 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-[#0044cc] hover:shadow-[0_0_30px_rgba(0,87,255,0.3)]"
            aria-label="Fale conosco pelo WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="touch-target flex items-center justify-center rounded-full p-2 text-white md:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="border-t border-[rgba(255,255,255,0.06)] bg-[rgba(3,3,5,0.97)] backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {NAV.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-xl px-4 py-3 text-sm font-semibold transition',
                    isActive
                      ? 'bg-[#0057FF]/15 text-white'
                      : 'text-[rgba(255,255,255,0.55)] hover:bg-[rgba(255,255,255,0.04)]'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#0057FF] py-3 text-sm font-bold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
