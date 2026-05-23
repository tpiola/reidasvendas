import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { BrandLogo } from '@/components/BrandLogo';

const YEAR = new Date().getFullYear();

type FooterLink = { label: string; to: string };
type FooterCol = { title: string; links: FooterLink[] };

const FOOTER_COLS: FooterCol[] = [
  {
    title: 'Soluções',
    links: [
      { label: 'Planos e assinaturas', to: '/planos' },
      { label: 'Plano Essencial', to: '/planos/essencial' },
      { label: 'Plano Crescimento', to: '/planos/crescimento' },
      { label: 'Plano Escala', to: '/planos/escala' },
      { label: 'Plano Sob medida', to: '/planos/sob-medida' },
    ],
  },
  {
    title: 'Catálogo',
    links: [
      { label: 'Amostras de sites', to: '/templates' },
      { label: 'Projetos', to: '/projetos' },
      { label: 'Soluções', to: '/solucoes' },
      { label: 'Negócios', to: '/negocios' },
      { label: 'Saúde', to: '/saude' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Contato', to: '/contato' },
      { label: 'Diagnóstico gratuito', to: '/contato' },
      { label: 'Privacidade (LGPD)', to: '/politica' },
      { label: 'Termos', to: '/termos' },
      { label: 'Governança', to: '/governanca' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[#C9A84C]/15 bg-[#030305] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,87,255,0.12)_0%,transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 md:pt-24">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
            >
              <BrandLogo layout="stacked" size="lg" variant="onDark" />
            </Link>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/45">
              Construímos presença digital, funil e automação do zero — para negócio local vender com previsibilidade,
              como empresa que já escalou.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/55">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-[#C9A84C]/80" aria-hidden />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-[#C9A84C]/80" aria-hidden />
                <a
                  href={BRAND.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp comercial
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#C9A84C]/80" aria-hidden />
                <span>{BRAND.baseCity}</span>
              </li>
            </ul>
            <div className="mt-8 flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram', href: BRAND.instagram },
                { Icon: Linkedin, label: 'LinkedIn', href: BRAND.linkedin },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href ?? '#'}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/50 transition-colors hover:border-[#C9A84C]/30 hover:text-white"
                  {...(href ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <Icon size={16} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-8">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/70">{col.title}</p>
                <ul className="mt-6 space-y-3">
                  {col.links.map(({ label, to }) => (
                    <li key={`${col.title}-${to}-${label}`}>
                      <Link
                        to={to}
                        className="text-[13px] text-white/45 transition-colors hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0057FF]/10 via-transparent to-[#C9A84C]/5 p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/80">Próximo passo</p>
            <p className="mt-2 text-lg font-semibold text-white">Diagnóstico gratuito em 24h</p>
            <p className="mt-1 text-sm text-white/45">Rota, escopo e plano — sem compromisso.</p>
          </div>
          <Link
            to="/contato"
            className="btn-glow mt-6 inline-flex h-12 shrink-0 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em] text-white md:mt-0"
          >
            Agendar diagnóstico
          </Link>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.06] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] text-white/35">
            &copy; {YEAR} {BRAND.name}. Cada projeto é único — amostras do catálogo não são réplicas.
          </p>
          <nav aria-label="Links legais" className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-white/35">
            <Link className="hover:text-white/70" to="/termos">
              Termos
            </Link>
            <Link className="hover:text-white/70" to="/politica">
              Privacidade
            </Link>
            <Link className="hover:text-white/70" to="/governanca">
              Segurança
            </Link>
            <a className="hover:text-white/70" href="/sitemap.xml">
              Sitemap
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
