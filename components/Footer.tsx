/* eslint-disable @next/next/no-html-link-for-pages -- WhatsApp route handlers require full navigation and a fresh event ID, without prefetch. */
import { CookieSettingsButton } from '@/lib/consent';

import Link from 'next/link';
import BrandLockup from '@/components/BrandLockup';

export default function Footer() {
  return (
    <>
      <footer className="site-footer footer-focused">
        <div className="container footer-top">
          <div className="footer-brand">
            <Link href="/" aria-label="Rei das Vendas — início">
              <BrandLockup />
            </Link>
            {process.env.BUSINESS_LEGAL_NAME && (
              <p className="footer-local">
                {process.env.BUSINESS_LEGAL_NAME}
                {process.env.BUSINESS_CNPJ
                  ? ` · CNPJ ${process.env.BUSINESS_CNPJ}`
                  : ''}
              </p>
            )}
            <p className="footer-local">
              Franca/SP · atendimento na região e no Brasil
            </p>
          </div>
          <div>
            <h2>Rei das Vendas</h2>
            <Link href="/servicos">Serviços</Link>
            <Link href="/sobre">Sobre a empresa</Link>
            <Link href="/blog">Guias práticos</Link>
            <Link href="/area-do-cliente">Atendimento ao cliente</Link>
          </div>
          <div className="footer-contact">
            <h2>Vamos falar do seu negócio</h2>
            <a href="/go/whatsapp?src=footer">WhatsApp ↗</a>
            <a href="tel:+5516992333344">(16) 99233-3344</a>
            <Link href="/contato">Outras formas de contato</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Rei das Vendas.</p>
          <div>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos de uso</Link>
            <CookieSettingsButton />
            <Link href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </footer>
      <a
        className="whatsapp-float"
        data-floating-contact
        href="/go/whatsapp?src=float"
        aria-label="Conversar com a Rei das Vendas no WhatsApp"
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 11.7a8 8 0 0 1-11.7 7.1L4 20l1.2-4.2A8 8 0 1 1 20 11.7Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M9 8c.4 3.2 2 4.9 5.5 6l1-1.6-2-1-1 1a6 6 0 0 1-2.3-2.4l.9-.9L10 7.5 9 8Z"
            fill="currentColor"
          />
        </svg>
        <span>Vamos conversar</span>
        <span aria-hidden="true">↗</span>
      </a>
    </>
  );
}
