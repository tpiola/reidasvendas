import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { BrandLogo } from '@/components/BrandLogo';

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
    <footer className="border-t border-[color:var(--header-border)] bg-[color:var(--footer-bg)] text-[color:var(--footer-fg)] transition-colors duration-350">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 sm:pt-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rdv-blue)]">
              <BrandLogo layout="stacked" size="lg" variant="auto" />
            </Link>
            <p className="mt-8 max-w-xs text-xs leading-relaxed text-[color:var(--footer-muted)]">
              Fábrica Digital de Alta Velocidade — sites, apps, funis e IA com revisão humana.
            </p>
            <dl className="mt-6 space-y-2 text-[11px] text-[color:var(--footer-muted)]">
              <div>
                <dt className="inline font-semibold opacity-80">Razão social: </dt>
                <dd className="inline">[A inserir — dados cadastrais]</dd>
              </div>
              <div>
                <dt className="inline font-semibold opacity-80">CNPJ: </dt>
                <dd className="inline">[A inserir]</dd>
              </div>
              <div>
                <dt className="inline font-semibold opacity-80">E-mail: </dt>
                <dd className="inline">
                  <a href={`mailto:${BRAND.email}`} className="underline-offset-2 hover:underline">
                    {BRAND.email}
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-6 max-w-sm border-l border-[#C9A84C]/35 pl-3 text-[10px] leading-relaxed text-[color:var(--footer-muted)]">
              Usamos Inteligência Artificial para acelerar processos e desenvolvimento, com estrita revisão e
              validação humana em cada entrega crítica.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--header-border)] bg-[color:var(--header-hover)] text-[color:var(--footer-muted)] transition-colors hover:text-[color:var(--footer-fg)]"
                >
                  <Icon size={15} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-8">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--footer-muted)]">
                  {col.title}
                </p>
                <ul className="mt-6 grid gap-4">
                  {col.links.map(({ label, to }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="text-[12px] text-[color:var(--footer-muted)] transition-colors hover:text-[color:var(--footer-fg)]"
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

        <div className="mt-16 flex flex-col gap-6 border-t border-[color:var(--header-border)] pt-8 md:flex-row md:items-center md:justify-between">
          <span className="text-[11px] text-[color:var(--footer-muted)]">
            &copy; {YEAR} {BRAND.name}. Todos os direitos reservados.
          </span>
          <nav
            aria-label="Links legais"
            className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-[color:var(--footer-muted)]"
          >
            <Link className="hover:text-[color:var(--footer-fg)]" to="/termos">
              Termos
            </Link>
            <Link className="hover:text-[color:var(--footer-fg)]" to="/politica">
              Privacidade (LGPD)
            </Link>
            <Link className="hover:text-[color:var(--footer-fg)]" to="/politica">
              Cookies
            </Link>
            <Link className="hover:text-[color:var(--footer-fg)]" to="/governanca">
              Segurança
            </Link>
            <a className="hover:text-[color:var(--footer-fg)]" href="/sitemap.xml">
              Sitemap
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
