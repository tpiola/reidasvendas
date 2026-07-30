import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/brand';
import { LuxuryDivider } from '@/components/PremiumComponents';
import { BrandLockup } from '@/components/BrandLockup';

const FOOTER_LINKS = {
  Soluções: [
    { label: 'Sites profissionais', to: '/servicos' },
    { label: 'Modelos por segmento', to: '/templates' },
    { label: 'Projetos publicados', to: '/portfolio' },
  ],
  Negócios: [
    { label: 'Clínicas e consultórios', to: '/templates' },
    { label: 'Restaurantes e delivery', to: '/templates' },
    { label: 'Comércio e serviços', to: '/templates' },
    { label: 'Escolas e profissionais', to: '/templates' },
  ],
  Empresa: [
    { label: 'Sobre', to: '/sobre' },
    { label: 'Dúvidas e contato', to: '/contato' },
    { label: 'Política de privacidade', to: '/politica' },
  ],
};

export function SiteFooter() {
  return (
    <footer className="relative border-t border-[rgba(214,168,79,0.1)] bg-[#030303]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -bottom-[30%] left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[rgba(214,168,79,0.04)] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex transition-opacity hover:opacity-90" aria-label="Rei das Vendas — página inicial">
              <BrandLockup />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#A1A1AA]">
              Sites profissionais para negócios locais. Sua empresa bem apresentada,
              fácil de encontrar e pronta para receber novos clientes.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(214,168,79,0.15)] text-[#A1A1AA] transition-all hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)] hover:text-[#D6A84F]" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
              </a>
              <a href={BRAND.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(214,168,79,0.15)] text-[#A1A1AA] transition-all hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)] hover:text-[#D6A84F]" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(214,168,79,0.15)] text-[#A1A1AA] transition-all hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)] hover:text-[#D6A84F]" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6A84F]">{title}</h2>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-[#A1A1AA] transition-colors hover:text-[#F5F5F5]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <LuxuryDivider />

        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-[#8A8A92]">
            © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[#8A8A92]">Franca, São Paulo — Brasil</p>
        </div>
      </div>
    </footer>
  );
}
