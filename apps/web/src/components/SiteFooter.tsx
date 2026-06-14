import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { BrandLogo } from '@/components/BrandLogo';
import { useTheme } from '@/hooks/useTheme';

const YEAR = new Date().getFullYear();

export function SiteFooter() {
  const { isDark } = useTheme();

  return (
    <footer className="relative overflow-hidden border-t border-[#C9A84C]/25 bg-[color:var(--footer-bg)] text-[color:var(--footer-fg)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.07)_0%,transparent_50%),radial-gradient(ellipse_at_50%_100%,rgba(0,87,255,0.12)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 md:pb-14 md:pt-14">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
            >
              <BrandLogo layout="stacked" size="lg" variant={isDark ? 'onDark' : 'onLight'} />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color:var(--footer-muted)]">
              Infraestrutura digital, funil e automacao sob medida para o negocio local competir com quem ja domina trafego e follow-up.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--header-hover)] text-[color:var(--footer-muted)] transition-colors hover:border-[#C9A84C]/35 hover:text-[color:var(--footer-fg)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--header-hover)] text-[color:var(--footer-muted)] transition-colors hover:border-[#C9A84C]/35 hover:text-[color:var(--footer-fg)]"
              >
                <Instagram size={18} aria-hidden />
              </a>
              <a
                href={BRAND.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--header-hover)] text-[color:var(--footer-muted)] transition-colors hover:border-[#C9A84C]/35 hover:text-[color:var(--footer-fg)]"
              >
                <Linkedin size={18} aria-hidden />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/75">Links</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/" className="text-[13px] text-[color:var(--footer-muted)] transition-colors hover:text-[color:var(--footer-fg)]">Home</Link></li>
              <li><Link to="/solucoes" className="text-[13px] text-[color:var(--footer-muted)] transition-colors hover:text-[color:var(--footer-fg)]">Servicos</Link></li>
              <li><Link to="/blog" className="text-[13px] text-[color:var(--footer-muted)] transition-colors hover:text-[color:var(--footer-fg)]">Blog</Link></li>
              <li><Link to="/contato" className="text-[13px] text-[color:var(--footer-muted)] transition-colors hover:text-[color:var(--footer-fg)]">Contato</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/75">Contato</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${BRAND.email}`} className="text-[13px] text-[color:var(--footer-muted)] transition-colors hover:text-[color:var(--footer-fg)]">
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[color:var(--footer-muted)] transition-colors hover:text-[color:var(--footer-fg)]">
                  WhatsApp
                </a>
              </li>
              <li>
                <span className="text-[13px] text-[color:var(--footer-muted)]">{BRAND.baseCity}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-[color:var(--border-subtle)] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-[11px] text-[color:var(--footer-muted)] md:text-left">
            &copy; {YEAR} {BRAND.name}. Todos os direitos reservados.
          </p>
          <nav
            aria-label="Links legais"
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-[color:var(--footer-muted)] md:justify-end"
          >
            <Link className="hover:text-[color:var(--footer-fg)]" to="/politica">
              Politica de Privacidade
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
