import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BRAND } from '@/lib/brand';
import { PremiumButton } from '@/components/PremiumButton';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/portfolio', label: 'Portfólio' },
  { to: '/planos', label: 'Planos' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

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
          ? 'bg-[rgba(3,3,3,0.88)] backdrop-blur-xl border-b border-[rgba(214,168,79,0.1)]'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="Rei das Vendas - Home">
          <img
            src="/logo-r-icon.png"
            alt="R"
            className="h-9 w-auto object-contain transition-all duration-300 group-hover:opacity-90"
          />
          <img
            src="/logo.svg"
            alt="Rei das Vendas"
            className="h-6 w-auto object-contain transition-all duration-300 group-hover:opacity-90 hidden sm:block"
          />
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
                  'rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300',
                  isActive
                    ? 'bg-[rgba(214,168,79,0.12)] text-[#D6A84F]'
                    : 'text-[#A1A1AA] hover:bg-white/[0.04] hover:text-white'
                )
              }
            >
              {label}
            </NavLink>
          ))}
          <PremiumButton href={BRAND.whatsapp} size="sm" className="ml-3" target="_blank" rel="noopener noreferrer">
            Diagnóstico
          </PremiumButton>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="touch-target flex items-center justify-center rounded-full p-2 text-white md:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[rgba(214,168,79,0.1)] bg-[rgba(3,3,3,0.97)] backdrop-blur-xl md:hidden"
          >
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
                        ? 'bg-[rgba(214,168,79,0.12)] text-[#D6A84F]'
                        : 'text-[#A1A1AA] hover:bg-white/[0.04]'
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
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F2D38A] py-3 text-sm font-bold text-[#030303]"
              >
                Diagnóstico Gratuito
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
