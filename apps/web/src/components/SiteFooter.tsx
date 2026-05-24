import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { BrandLogo } from '@/components/BrandLogo';
import { FooterWhatsAppQr } from '@/components/footer/FooterWhatsAppQr';
import { Reveal } from '@/components/Reveal';
import { InlineVideo } from '@/components/home/InlineVideo';
import { HERO_POSTER } from '@/lib/media';
import { CTA } from '@/lib/cta-copy';
import { useTheme } from '@/hooks/useTheme';

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
      { label: 'Projetos', to: '/projetos' },
      { label: 'Amostras de sites', to: '/templates' },
      { label: 'Blog', to: '/blog' },
      { label: 'Soluções', to: '/solucoes' },
      { label: 'Negócios', to: '/negocios' },
      { label: 'Saúde', to: '/saude' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Contato', to: '/contato' },
      { label: 'Solicitar orçamento', to: '/diagnostico' },
      { label: 'Privacidade (LGPD)', to: '/politica' },
      { label: 'Termos', to: '/termos' },
      { label: 'Governança', to: '/governanca' },
    ],
  },
];

export function SiteFooter() {
  const { isDark } = useTheme();

  return (
    <footer className="relative overflow-hidden border-t border-[#C9A84C]/20 bg-[color:var(--footer-bg)] text-[color:var(--footer-fg)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.06)_0%,transparent_50%),radial-gradient(ellipse_at_50%_100%,rgba(0,87,255,0.14)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-12 md:pt-16">
        <Reveal className="mb-14">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">
            O que levamos ao seu cliente
          </p>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-[color:var(--footer-muted)]">
            Evolução digital: presença, funil e automação em um só contrato.
          </p>
          <div className="glass-card mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl p-2">
            <InlineVideo
              src={BRAND.inlineVideos.manifesto}
              poster={HERO_POSTER}
              caption="Rei das Vendas · entrega premium"
            />
          </div>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal delay={0.05} className="lg:col-span-4">
            <Link
              to="/"
              className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
            >
              <BrandLogo layout="stacked" size="lg" variant={isDark ? 'onDark' : 'onLight'} />
            </Link>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-[color:var(--footer-muted)]">
              Infraestrutura digital, funil e automação sob medida — para negócio local competir com quem já domina
              tráfego e follow-up.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--footer-muted)] transition-colors hover:text-[#C9A84C]"
            >
              <Mail size={16} className="text-[#C9A84C]/80" aria-hidden />
              {BRAND.email}
            </a>
            <p className="mt-2 flex items-center gap-2 text-sm text-[color:var(--footer-muted)]">
              <MapPin size={14} className="text-[#C9A84C]/60" aria-hidden />
              {BRAND.baseCity}
            </p>
            <div className="mt-8 flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram', href: BRAND.instagram },
                { Icon: Linkedin, label: 'LinkedIn', href: BRAND.linkedin },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href ?? '#'}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--header-hover)] text-[color:var(--footer-muted)] transition-colors hover:border-[#C9A84C]/30 hover:text-[color:var(--footer-fg)]"
                  {...(href ? { target: '_blank', rel: 'noreferrer' } : { 'aria-disabled': true })}
                >
                  <Icon size={16} aria-hidden />
                </a>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            {FOOTER_COLS.map((col, i) => (
              <Reveal key={col.title} delay={0.08 + i * 0.04}>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/70">{col.title}</p>
                <ul className="mt-5 space-y-2.5">
                  {col.links.map(({ label, to }) => (
                    <li key={`${col.title}-${label}`}>
                      <Link
                        to={to}
                        className="text-[13px] text-[color:var(--footer-muted)] transition-colors hover:text-[color:var(--footer-fg)]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="flex flex-col items-center lg:col-span-3 lg:items-end">
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[color:var(--footer-muted)] lg:text-right">
              Fale agora
            </p>
            <FooterWhatsAppQr />
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn-glow mt-6 inline-flex h-11 w-full max-w-[200px] items-center justify-center text-[10px] font-bold uppercase tracking-[0.22em] text-white lg:w-auto lg:min-w-[200px]"
            >
              Abrir WhatsApp
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-16">
          <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-gradient-to-r from-[#0057FF]/12 via-[color:var(--surface)] to-[#C9A84C]/10 p-8 md:flex md:items-center md:justify-between md:gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/80">Orçamento</p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--footer-fg)]">Proposta em até 24h</p>
              <p className="mt-1 text-sm text-[color:var(--footer-muted)]">Escopo e investimento alinhados ao seu nicho.</p>
            </div>
            <Link
              to="/diagnostico"
              className="btn-glow mt-6 inline-flex h-12 shrink-0 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em] text-white md:mt-0"
            >
              {CTA.orcamento}
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4 border-t border-[color:var(--border-subtle)] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] text-[color:var(--footer-muted)]">
            &copy; {YEAR} {BRAND.name}. Projetos exclusivos — catálogo é referência visual.
          </p>
          <nav aria-label="Links legais" className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-[color:var(--footer-muted)]">
            <Link className="hover:text-[color:var(--footer-fg)]" to="/termos">
              Termos
            </Link>
            <Link className="hover:text-[color:var(--footer-fg)]" to="/politica">
              Privacidade
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
