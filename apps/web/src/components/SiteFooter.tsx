import { Link } from "react-router-dom";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Shield,
  Lock,
  FileCheck,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { BrandLogo } from "@/components/BrandLogo";
import { FooterWhatsAppQr } from "@/components/footer/FooterWhatsAppQr";
import { FooterWhatsAppIcon } from "@/components/footer/FooterWhatsAppIcon";
import { Reveal } from "@/components/Reveal";
import { InlineVideo } from "@/components/home/InlineVideo";
import { SECTION_POSTERS } from "@/lib/media";
import { CTA } from "@/lib/cta-copy";
import { useTheme } from "@/hooks/useTheme";

const YEAR = new Date().getFullYear();

type FooterLink = { label: string; to: string };
type FooterCol = { title: string; links: FooterLink[] };

const FOOTER_COLS: FooterCol[] = [
  {
    title: "Soluções",
    links: [
      { label: "Planos e assinaturas", to: "/planos" },
      { label: "Plano Essencial", to: "/planos/essencial" },
      { label: "Plano Crescimento", to: "/planos/crescimento" },
      { label: "Plano Escala", to: "/planos/escala" },
      { label: "Plano Sob medida", to: "/planos/sob-medida" },
    ],
  },
  {
    title: "Catálogo",
    links: [
      { label: "Projetos", to: "/projetos" },
      { label: "Amostras de sites", to: "/templates" },
      { label: "Blog", to: "/blog" },
      { label: "Soluções", to: "/solucoes" },
      { label: "Negócios", to: "/negocios" },
      { label: "Saúde", to: "/saude" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Contato", to: "/contato" },
      { label: "Solicitar orçamento", to: "/diagnostico" },
      { label: "Privacidade (LGPD)", to: "/politica" },
      { label: "Termos", to: "/termos" },
      { label: "Governança", to: "/governanca" },
    ],
  },
];

const TRUST_ITEMS = [
  { Icon: Shield, label: "HTTPS em produção" },
  { Icon: Lock, label: "Dados com consentimento LGPD" },
  { Icon: FileCheck, label: "Escopo documentado por plano" },
] as const;

export function SiteFooter() {
  const { isDark } = useTheme();

  return (
    <footer className="relative overflow-hidden border-t border-[#C9A84C]/25 bg-[color:var(--footer-bg)] text-[color:var(--footer-fg)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.07)_0%,transparent_50%),radial-gradient(ellipse_at_50%_100%,rgba(0,87,255,0.12)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 md:pb-14 md:pt-14">
        <Reveal className="mb-12 md:mb-14">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/85">
              Presença que converte
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[color:var(--footer-muted)]">
              Vídeo, funil e automação — o que seu cliente vê antes de comprar.
            </p>
          </div>
          <div className="glass-card mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl p-2 shadow-xl">
            <InlineVideo
              src={BRAND.inlineVideos.manifesto}
              poster={SECTION_POSTERS.team}
              caption="Rei das Vendas · entrega premium"
            />
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0.04} className="lg:col-span-4">
            <Link
              to="/"
              className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
            >
              <BrandLogo
                layout="stacked"
                size="lg"
                variant={isDark ? "onDark" : "onLight"}
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[color:var(--footer-muted)]">
              Infraestrutura digital, funil e automação sob medida — para o
              negócio local competir com quem já domina tráfego e follow-up.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-[color:var(--footer-muted)] transition-colors hover:text-[#C9A84C]"
            >
              <Mail size={16} className="text-[#C9A84C]/80" aria-hidden />
              {BRAND.email}
            </a>
            <p className="mt-2 flex items-center gap-2 text-sm text-[color:var(--footer-muted)]">
              <MapPin
                size={14}
                className="shrink-0 text-[#C9A84C]/60"
                aria-hidden
              />
              {BRAND.baseCity}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram", href: BRAND.instagram },
                { Icon: Linkedin, label: "LinkedIn", href: BRAND.linkedin },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href ?? "#"}
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--header-hover)] text-[color:var(--footer-muted)] transition-colors hover:border-[#C9A84C]/35 hover:text-[color:var(--footer-fg)]"
                  {...(href
                    ? { target: "_blank", rel: "noreferrer" }
                    : { "aria-disabled": true })}
                >
                  <Icon size={18} aria-hidden />
                </a>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            {FOOTER_COLS.map((col, i) => (
              <Reveal key={col.title} delay={0.06 + i * 0.03}>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/75">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
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

          <Reveal
            delay={0.15}
            className="flex flex-col items-center lg:col-span-3 lg:items-end"
          >
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[color:var(--footer-muted)] lg:text-right">
              WhatsApp
            </p>
            <div className="flex flex-col items-center gap-5 sm:flex-row lg:flex-col">
              <FooterWhatsAppIcon />
              <FooterWhatsAppQr />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <ul className="flex flex-wrap justify-center gap-6 border-y border-[color:var(--border-subtle)] py-6 md:gap-10">
            {TRUST_ITEMS.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-[11px] text-[color:var(--footer-muted)]"
              >
                <Icon size={14} className="text-[#C9A84C]/80" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-gradient-to-r from-[#0057FF]/10 via-[color:var(--surface)] to-[#C9A84C]/10 p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/85">
                Próximo passo
              </p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--footer-fg)]">
                Proposta em até 24h
              </p>
              <p className="mt-1 text-sm text-[color:var(--footer-muted)]">
                Escopo e investimento alinhados ao seu nicho — sem fidelidade
                forçada.
              </p>
            </div>
            <Link
              to="/diagnostico"
              className="btn-glow mx-auto mt-6 inline-flex h-12 shrink-0 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em] text-white md:mx-0 md:mt-0"
            >
              {CTA.orcamento}
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 border-t border-[color:var(--border-subtle)] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-[11px] text-[color:var(--footer-muted)] md:text-left">
            &copy; {YEAR} {BRAND.name}. Projetos exclusivos — catálogo é
            referência visual.
          </p>
          <nav
            aria-label="Links legais"
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-[color:var(--footer-muted)] md:justify-end"
          >
            <Link className="hover:text-[color:var(--footer-fg)]" to="/termos">
              Termos
            </Link>
            <Link
              className="hover:text-[color:var(--footer-fg)]"
              to="/politica"
            >
              Privacidade
            </Link>
            <Link
              className="hover:text-[color:var(--footer-fg)]"
              to="/governanca"
            >
              Segurança
            </Link>
            <a
              className="hover:text-[color:var(--footer-fg)]"
              href="/sitemap.xml"
            >
              Sitemap
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
