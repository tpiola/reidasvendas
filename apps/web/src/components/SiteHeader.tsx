import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BrandLockup } from '@/components/BrandLockup';
import { ThemeToggle } from '@/components/ThemeToggle';

const NAV = [
  { to: '/solucoes', label: 'Soluções' },
  { to: '/demonstracoes', label: 'Demonstrações' },
  { to: '/ferramentas', label: 'Ferramentas' },
  { to: '/portfolio', label: 'Projetos reais' },
];

export function SiteHeader() {
  const [openAtPath, setOpenAtPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const open = openAtPath === location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={cn('rdv-header', scrolled && 'is-scrolled')}>
      <a className="sr-only focus:not-sr-only" href="#main-content">Ir para o conteúdo</a>
      <div className="rdv-header-inner">
        <Link to="/" className="rdv-brand-link" aria-label="Rei das Vendas — página inicial">
          <BrandLockup compact />
        </Link>

        <nav className="rdv-desktop-nav" aria-label="Navegação principal">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => cn('rdv-nav-link', isActive && 'is-active')}>
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle />
          <Link className="rdv-header-cta" to="/diagnostico">Mapear minha operação</Link>
        </nav>

        <div className="rdv-mobile-actions">
          <ThemeToggle />
          <button type="button" onClick={() => setOpenAtPath(open ? null : location.pathname)} className="rdv-menu-button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-navigation">
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav id="mobile-navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .2 }} className="rdv-mobile-nav" aria-label="Navegação móvel">
            {NAV.map((item) => <NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}
            <Link className="rdv-header-cta" to="/diagnostico">Mapear minha operação</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
