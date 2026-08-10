import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BRAND } from '@/lib/brand';
import { BrandLockup } from '@/components/BrandLockup';
import { ThemeToggle } from '@/components/ThemeToggle';

const NAV = [
  { to: '/#prova', label: 'Resultados' },
  { to: '/#precos', label: 'Preços' },
  { to: '/#segmentos', label: 'Para seu setor' },
  { to: '/odontologia', label: 'Odontologia' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const whatsapp = `https://wa.me/${BRAND.phone}?text=${encodeURIComponent('Olá! Quero entender a operação mensal do Rei das Vendas.')}`;
  useEffect(() => setOpen(false), [location.pathname]);
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
        <Link to="/" className="rdv-brand-link" aria-label="Rei das Vendas — página inicial"><BrandLockup compact /></Link>
        <nav className="rdv-desktop-nav" aria-label="Navegação principal">
          {NAV.map(item => <a key={item.to} href={item.to} className="rdv-nav-link">{item.label}</a>)}
          <ThemeToggle />
          <a className="rdv-header-cta" href={whatsapp} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
        </nav>
        <div className="rdv-mobile-actions">
          <ThemeToggle />
          <button type="button" onClick={() => setOpen(value => !value)} className="rdv-menu-button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        </div>
      </div>
      <AnimatePresence initial={false}>{open && <motion.nav id="mobile-navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .2 }} className="rdv-mobile-nav" aria-label="Navegação móvel">{NAV.map(item => <a key={item.to} href={item.to}>{item.label}</a>)}<a className="rdv-header-cta" href={whatsapp} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a></motion.nav>}</AnimatePresence>
    </header>
  );
}
