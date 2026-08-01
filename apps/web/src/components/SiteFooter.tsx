import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
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
        <div className="absolute -top-[10%] left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[rgba(214,168,79,0.05)] blur-[130px]" />
        <div className="absolute inset-0 bg-grid-subtle opacity-40" style={{ maskImage: 'linear-gradient(180deg,rgba(0,0,0,0.5),transparent 60%)' }} />
      </div>

      {/* ─── CTA band ─── */}
      <div className="relative border-b border-[rgba(214,168,79,0.1)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 sm:py-16">
          <span className="gold-badge">Pronto para começar</span>
          <h2 className="font-serif max-w-xl text-2xl font-bold leading-tight text-white sm:text-3xl">
            Sua empresa pode estar no ar, encontrável e vendendo em poucas semanas.
          </h2>
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold hover-glow-gold text-sm"
          >
            <MessageCircle className="h-4 w-4" /> Solicitar análise do meu negócio
          </a>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
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
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6A84F]">{title}</h2>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="group inline-flex items-center gap-1 text-sm text-[#A1A1AA] transition-colors hover:text-[#F5F5F5]">
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6A84F]">Contato</h2>
            <ul className="space-y-3">
              <li>
                <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-[#A1A1AA] transition-colors hover:text-[#F5F5F5]">
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D6A84F]" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="flex items-start gap-2 text-sm text-[#A1A1AA] transition-colors hover:text-[#F5F5F5]">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D6A84F]" /> {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D6A84F]" /> {BRAND.address}
              </li>
            </ul>
          </div>
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
