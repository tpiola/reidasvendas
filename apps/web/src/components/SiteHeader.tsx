import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BRAND } from '@/lib/brand';
import { PremiumButton } from '@/components/PremiumButton';
import { BrandLockup } from '@/components/BrandLockup';

const NAV = [
  { to: '/', label: 'Início', end: true },
  { to: '/solucoes', label: 'Soluções' },
  { to: '/templates', label: 'Possibilidades' },
  { to: '/portfolio', label: 'Projetos' },
  { to: '/sobre', label: 'Governança' },
  { to: '/diagnostico', label: 'Diagnóstico' },
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
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-[rgba(214,168,79,0.12)] bg-[rgba(3,3,3,0.9)] shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="min-w-0 shrink transition-opacity hover:opacity-90"
          aria-label="Rei das Vendas — página inicial"
        >
          <BrandLockup compact />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navegação principal">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors',
                  isActive
                    ? 'bg-[rgba(214,168,79,0.12)] text-[#D6A84F]'
                    : 'text-[#A1A1AA] hover:bg-white/[0.04] hover:text-white'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <PremiumButton
            href={BRAND.whatsapp}
            size="sm"
            className="ml-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Solicitar diagnóstico
          </PremiumButton>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="touch-target flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[rgba(214,168,79,0.12)] bg-[rgba(3,3,3,0.98)] backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Navegação móvel">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-[rgba(214,168,79,0.12)] text-[#D6A84F]'
                        : 'text-[#D4D4D8] hover:bg-white/[0.05] hover:text-white'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F2D38A] px-5 text-sm font-bold text-[#030303]"
              >
                Solicitar diagnóstico do meu negócio
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
