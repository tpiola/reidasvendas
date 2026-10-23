import { CookieSettingsButton } from '@/lib/consent';

import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-top">
          <div className="footer-brand">
            <img
              src="/logo/lockup-escuro.svg"
              alt="Rei das Vendas"
              width="250"
              height="49"
              loading="lazy"
            />
            <p>
              Marketing, tecnologia e processo comercial.
              <br />
              Uma operação conectada à sua venda.
            </p>
            <p className="footer-local">
              Franca/SP · atendimento na região e no Brasil
            </p>
          </div>
          <div>
            <h2>O que fazemos</h2>
            <Link href="/servicos/criacao-de-sites-franca">
              Sites para negócios
            </Link>
            <Link href="/servicos/gestao-de-trafego-franca">
              Gestão de tráfego
            </Link>
            <Link href="/servicos/social-media-franca">Social media</Link>
            <Link href="/servicos/implantacao-crm-franca">
              CRM e atendimento
            </Link>
          </div>
          <div>
            <h2>Explore</h2>
            <Link href="/metodo">Nosso método</Link>
            <Link href="/cases">Casos e evidências</Link>
            <Link href="/blog">Guias práticos</Link>
            <Link href="/faq">Perguntas frequentes</Link>
            <Link href="/contato">Contato</Link>
          </div>
          <div className="footer-contact">
            <h2>Vamos falar do seu negócio</h2>
            <a href="/go/whatsapp?src=footer">WhatsApp ↗</a>
            <a href="tel:+5516992333344">(16) 99233-3344</a>
            <Link href="/diagnostico">Enviar meu desafio</Link>
            <p>
              Conversa humana. Escopo e investimento definidos antes de começar.
            </p>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Rei das Vendas.</p>
          <div>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos de uso</Link>
            <CookieSettingsButton />
            <a href="/sitemap.xml">Sitemap</a>
          </div>
        </div>
      </footer>
      <a
        className="whatsapp-float"
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
