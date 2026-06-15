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
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="Rei das Vendas - Home">
          <div className="relative flex items-center gap-2">
            {/* Crown SVG */}
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
              <defs>
                <linearGradient id="header-crown" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F2D38A"/>
                  <stop offset="45%" stopColor="#D6A84F"/>
                  <stop offset="100%" stopColor="#B88932"/>
                </linearGradient>
              </defs>
              <g transform="translate(4, 5) scale(0.375)">
                <path d="M32 6 L38 22 L52 18 L44 34 L56 40 L32 36 L8 40 L20 34 L12 18 L26 22 Z" stroke="url(#header-crown)" strokeWidth="1.35" fill="none"/>
                <path d="M32 6 L26 22 L20 34 M32 6 L38 22 L44 34 M26 22 L38 22 M20 34 L44 34" stroke="url(#header-crown)" strokeWidth="0.9" strokeOpacity="0.65" fill="none"/>
                <path d="M14 44 H50" stroke="url(#header-crown)" strokeWidth="1.2" strokeLinecap="round"/>
              </g>
            </svg>
            <span className="text-sm font-bold tracking-[0.15em]">
              <span className="text-[#D6A84F]">REI</span>{' '}
              <span className="text-white/90">DAS VENDAS</span>
            </span>
          </div>
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
