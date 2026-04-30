import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';
import { BRAND } from '@/lib/brand';

const YEAR = new Date().getFullYear();

const SOCIALS = [
  { label: 'Instagram', Icon: Instagram, href: BRAND.instagram ?? '#' },
  { label: 'LinkedIn', Icon: Linkedin, href: BRAND.linkedin ?? '#' },
  { label: 'Facebook', Icon: Facebook, href: BRAND.facebook ?? '#' },
  { label: 'X / Twitter', Icon: Twitter, href: BRAND.twitter ?? '#' },
] as const;

type FooterLink = { label: string; to: string };
type FooterCol = { title: string; links: FooterLink[] };

const FOOTER_COLS: FooterCol[] = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Soluções', to: '/solucoes' },
      { label: 'Projetos', to: '/projetos' },
      { label: 'Negócios', to: '/negocios' },
      { label: 'Saúde', to: '/saude' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Contato', to: '/contato' },
      { label: 'Termos', to: '/termos' },
      { label: 'Privacidade', to: '/politica' },
      { label: 'Governança', to: '/governanca' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-background text-white">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-20">

        {/* Topo: Logo + Colunas + Social */}
        <div className="grid gap-14 lg:grid-cols-12">

          {/* Logo & tagline */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo Rei das Vendas"
                className="h-12 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="mt-8 max-w-xs text-xs leading-relaxed text-white/40">
              Infraestrutura de engenharia digital para operações de alta performance.
            </p>
            {/* Redes sociais */}
            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Colunas de links */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-2">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  {col.title}
                </p>
                <ul className="mt-6 grid gap-4">
                  {col.links.map(({ label, to }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="text-[12px] text-white/50 transition-colors hover:text-white"
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

        {/* Rodapé: Copyright & Legal */}
        <div className="mt-24 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <span className="text-[11px] text-white/40">
            &copy; {YEAR} {BRAND.name}. Todos os direitos reservados.
          </span>
          <nav
            aria-label="Links legais"
            className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-white/40"
          >
            <Link className="hover:text-white transition-colors" to="/termos">Termos</Link>
            <Link className="hover:text-white transition-colors" to="/politica">Privacidade</Link>
            <Link className="hover:text-white transition-colors" to="/politica">Cookies</Link>
            <Link className="hover:text-white transition-colors" to="/governanca">Segurança</Link>
            <a className="hover:text-white transition-colors" href="/sitemap.xml">Sitemap</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
