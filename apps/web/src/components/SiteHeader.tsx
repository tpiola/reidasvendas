import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cn } from '@altiq/ui';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { to: '/solucoes', label: 'Soluções' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/negocios', label: 'Negócios' },
];

export function SiteHeader() {
    const location = useLocation();
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

  const overlay = location.pathname === '/' && !scrolled;

  const headerClassName = cn(
        'fixed inset-x-0 top-0 z-50 border-b backdrop-blur-glass-md transition-all duration-500',
        overlay
          ? 'border-white/[0.05] bg-background/20'
          : 'border-white/[0.07] bg-background/90',
      );

  return (
        <header className={headerClassName}>
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                  {/* Logo */}
                        <Link
                                    to="/"
                                    className={cn(
                                                  'flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                                                  'focus-visible:ring-white focus-visible:ring-offset-black',
                                                )}
                                    aria-label="Ir para a home"
                                  >
                                  <img 
                                    src="/logo.png" 
                                    alt="Logo Rei das Vendas" 
                                    className="h-10 w-auto object-contain"
                                  />
                        </Link>
                
                  {/* Nav desktop */}
                        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegacao principal">
                          {NAV_LINKS.map((link) => (
                      <NavLink
                                      key={link.to}
                                      to={link.to}
                                      end={link.to === '/'}
                                      className={({ isActive }) =>
                                                        cn(
                                                                            'py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition-colors',
                                                                            isActive ? 'text-white' : 'text-white/60 hover:text-white',
                                                                          )
                                      }
                                    >
                        {link.label}
                      </NavLink>
                    ))}
                                  <div className="flex items-center gap-4 ml-4">
                                    <Link
                                      to="/contato"
                                      className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80 hover:text-white transition-colors"
                                    >
                                      Contacto
                                    </Link>
                                    <Link
                                                  to="/contato"
                                                  className="inline-flex h-10 items-center justify-center bg-white px-6 text-[10px] font-bold uppercase tracking-[0.24em] text-black transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                                >
                                                Comece
                                    </Link>
                                  </div>
                        </nav>
                
                  {/* Menu mobile toggle */}
                        <button
                                    type="button"
                                    className={cn(
                                                  'inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors md:hidden',
                                                  'text-white/85 hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-black',
                                                )}
                                    aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                                    aria-expanded={menuOpen}
                                    onClick={() => setMenuOpen((o) => !o)}
                                  >
                          {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                </div>
        
          {/* Menu mobile */}
          {menuOpen && (
                  <div className="border-t border-white/10 bg-black/90 md:hidden">
                            <nav className="mx-auto max-w-6xl px-6 py-5" aria-label="Navegacao mobile">
                                        <div className="grid gap-5">
                                          {NAV_LINKS.map((link) => (
                                    <NavLink
                                                        key={link.to}
                                                        to={link.to}
                                                        end={link.to === '/'}
                                                        className={({ isActive }) =>
                                                                              cn(
                                                                                                      'text-sm font-semibold',
                                                                                                      isActive ? 'text-white' : 'text-white/70 hover:text-white',
                                                                                                    )
                                                        }
                                                      >
                                      {link.label}
                                    </NavLink>
                                  ))}
                                                      <Link
                                                                        to="/contato"
                                                                        className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-white/90"
                                                                      >
                                                                      Comecar agora
                                                      </Link>
                                        </div>
                            </nav>
                  </div>
              )}
        </header>
      );
}
