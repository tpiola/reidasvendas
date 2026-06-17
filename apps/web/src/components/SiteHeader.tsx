import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, Smartphone, Bot, BarChart3, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BRAND } from '@/lib/brand';
import { PremiumButton } from '@/components/PremiumButton';

const NAV = [
  { to: '/', label: 'Home' },
  {
    label: 'Soluções',
    dropdown: true,
    items: [
      { to: '/servicos', label: 'Sites Profissionais', icon: <Globe className="h-4 w-4" /> },
      { to: '/servicos', label: 'Aplicativos', icon: <Smartphone className="h-4 w-4" /> },
      { to: '/servicos', label: 'Automações', icon: <Bot className="h-4 w-4" /> },
      { to: '/servicos', label: 'Dashboards', icon: <BarChart3 className="h-4 w-4" /> },
      { to: '/servicos', label: 'Mentoria', icon: <GraduationCap className="h-4 w-4" /> },
    ],
  },
  { to: '/segmentos', label: 'Segmentos' },
  { to: '/recursos', label: 'Recursos' },
  { to: '/planos', label: 'Preços' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-start group" aria-label="Rei das Vendas - Home">
          <img
            src="/logo-original.png"
            alt="Rei das Vendas"
            className="h-10 w-auto object-contain transition-all duration-300 group-hover:opacity-90"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {NAV.map((item) => {
            if ('dropdown' in item && item.dropdown) {
              return (
                <li
                  key={item.label}
                  ref={dropdownRef}
                  className="relative list-none"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={cn(
                      'flex items-center gap-1 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300',
                      dropdownOpen
                        ? 'bg-[rgba(214,168,79,0.12)] text-[#D6A84F]'
                        : 'text-[#A1A1AA] hover:bg-white/[0.04] hover:text-white'
                    )}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'h-3 w-3 transition-transform duration-200',
                        dropdownOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-full mt-2 w-56 origin-top-left"
                      >
                        <div className="overflow-hidden rounded-2xl border border-[rgba(214,168,79,0.1)] bg-[rgba(3,3,3,0.97)] backdrop-blur-xl shadow-2xl shadow-black/50">
                          <div className="p-2">
                            {item.items.map((sub: { to: string; label: string; icon: React.ReactNode }) => (
                              <NavLink
                                key={sub.label}
                                to={sub.to}
                                onClick={() => setDropdownOpen(false)}
                                className={({ isActive }) =>
                                  cn(
                                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                                    isActive
                                      ? 'bg-[rgba(214,168,79,0.12)] text-[#D6A84F]'
                                      : 'text-[#A1A1AA] hover:bg-white/[0.04] hover:text-white'
                                  )
                                }
                              >
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(214,168,79,0.08)] text-[#D6A84F]">
                                  {sub.icon}
                                </span>
                                <span>{sub.label}</span>
                              </NavLink>
                            ))}
                          </div>
                          <div className="border-t border-[rgba(255,255,255,0.06)] px-3 py-3">
                            <Link
                              to="/servicos"
                              onClick={() => setDropdownOpen(false)}
                              className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#D6A84F] transition-colors hover:text-[#F2D38A]"
                            >
                              Ver todos os serviços
                              <ChevronDown className="h-3 w-3 -rotate-90" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            const navItem = item as { to: string; label: string };
            return (
              <NavLink
                key={navItem.to}
                to={navItem.to}
                end={navItem.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300',
                    isActive
                      ? 'bg-[rgba(214,168,79,0.12)] text-[#D6A84F]'
                      : 'text-[#A1A1AA] hover:bg-white/[0.04] hover:text-white'
                  )
                }
              >
                {navItem.label}
              </NavLink>
            );
          })}
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
              {NAV.map((item) => {
                if ('dropdown' in item && item.dropdown) {
                  return (
                    <div key={item.label} className="flex flex-col gap-1">
                      <span className="rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[rgba(214,168,79,0.5)]">
                        {item.label}
                      </span>
                      {item.items.map((sub: { to: string; label: string; icon: React.ReactNode }) => (
                        <NavLink
                          key={sub.label}
                          to={sub.to}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            cn(
                              'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
                              isActive
                                ? 'bg-[rgba(214,168,79,0.12)] text-[#D6A84F]'
                                : 'text-[#A1A1AA] hover:bg-white/[0.04]'
                            )
                          }
                        >
                          <span className="text-[#D6A84F]">{sub.icon}</span>
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  );
                }

                const navItem = item as { to: string; label: string };
                return (
                  <NavLink
                    key={navItem.to}
                    to={navItem.to}
                    end={navItem.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'rounded-xl px-4 py-3 text-sm font-semibold transition',
                        isActive
                          ? 'bg-[rgba(214,168,79,0.12)] text-[#D6A84F]'
                          : 'text-[#A1A1AA] hover:bg-white/[0.04]'
                      )
                    }
                  >
                    {navItem.label}
                  </NavLink>
                );
              })}
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
