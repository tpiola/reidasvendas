import { BRAND } from '@/lib/brand';
import { LuxuryDivider } from '@/components/PremiumComponents';

const FOOTER_LINKS = {
  Soluções: [
    { label: 'Sites & Landing Pages', to: '/servicos' },
    { label: 'Aplicativos', to: '/servicos' },
    { label: 'Automações', to: '/servicos' },
    { label: 'Dashboards', to: '/servicos' },
    { label: 'Mentoria Digital', to: '/servicos' },
  ],
  Segmentos: [
    { label: 'Calçadista', to: '/servicos' },
    { label: 'Comércio', to: '/servicos' },
    { label: 'Indústria', to: '/servicos' },
    { label: 'Saúde', to: '/servicos' },
    { label: 'Educação', to: '/servicos' },
  ],
  Empresa: [
    { label: 'Blog', to: '/blog' },
    { label: 'Contato', to: '/contato' },
    { label: 'Política de Privacidade', to: '/politica' },
  ],
};

export function SiteFooter() {
  return (
    <footer className="relative border-t border-[rgba(214,168,79,0.1)] bg-[#030303]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-[30%] left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[rgba(214,168,79,0.04)] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        {/* Top section */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="footer-crown" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F2D38A"/>
                    <stop offset="45%" stopColor="#D6A84F"/>
                    <stop offset="100%" stopColor="#B88932"/>
                  </linearGradient>
                </defs>
                <g transform="translate(4, 5) scale(0.375)">
                  <path d="M32 6 L38 22 L52 18 L44 34 L56 40 L32 36 L8 40 L20 34 L12 18 L26 22 Z" stroke="url(#footer-crown)" strokeWidth="1.35" fill="none"/>
                  <path d="M32 6 L26 22 L20 34 M32 6 L38 22 L44 34 M26 22 L38 22 M20 34 L44 34" stroke="url(#footer-crown)" strokeWidth="0.9" strokeOpacity="0.65" fill="none"/>
                  <path d="M14 44 H50" stroke="url(#footer-crown)" strokeWidth="1.2" strokeLinecap="round"/>
                </g>
              </svg>
              <span className="text-sm font-bold tracking-[0.15em]">
                <span className="text-[#D6A84F]">REI</span>{' '}
                <span className="text-white/80">DAS VENDAS</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#71717A]">
              Infraestrutura digital de vendas para empresas que querem vender com mais estrutura. 
              Tecnologia, design e estratégia — tudo sob medida.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(214,168,79,0.15)] text-[#A1A1AA] transition-all hover:border-[#D6A84F] hover:text-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
              </a>
              <a href={BRAND.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(214,168,79,0.15)] text-[#A1A1AA] transition-all hover:border-[#D6A84F] hover:text-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(214,168,79,0.15)] text-[#A1A1AA] transition-all hover:border-[#D6A84F] hover:text-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6A84F] mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.to}
                      className="text-sm text-[#71717A] transition-colors hover:text-[#F5F5F5]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <LuxuryDivider />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-[#71717A]">
            © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[#71717A]">
            Franca-SP — Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
