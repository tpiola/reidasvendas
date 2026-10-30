/* eslint-disable @next/next/no-html-link-for-pages -- WhatsApp route handlers require full navigation and a fresh event ID, without prefetch. */
import Link from 'next/link';
import BrandLockup from '@/components/BrandLockup';

const links = [
  ['/casos', 'Trabalhos'],
  ['/planos', 'Planos'],
  ['/servicos', 'Serviços'],
] as const;

export default function Header() {
  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span />
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="Rei das Vendas — início">
            <BrandLockup />
          </Link>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {links.map(([href, label]) => (
              <Link
                href={href}
                key={href}
                data-event={href === '/planos' ? 'click_cta_planos' : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <a
            className="button button-small header-cta"
            aria-label="Conversar no WhatsApp"
            href="/go/whatsapp?src=header"
          >
            <span className="header-cta-label">Conversar</span>
            <svg
              width="21"
              height="21"
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
          </a>
          <details className="mobile-menu">
            <summary aria-label="Abrir menu">
              Menu <span aria-hidden="true">+</span>
            </summary>
            <nav aria-label="Navegação móvel">
              {links.map(([href, label]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
              <Link href="/diagnostico">Diagnóstico</Link>
              <Link href="/area-do-cliente">Atendimento ao cliente</Link>
              <a href="/go/whatsapp?src=menu">Falar no WhatsApp ↗</a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
