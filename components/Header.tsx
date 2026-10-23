import Link from 'next/link';

const links = [
  ['/servicos', 'Serviços'],
  ['/metodo', 'Método'],
  ['/resultados', 'Resultados'],
  ['/blog', 'Conteúdo'],
  ['/sobre', 'Sobre'],
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
            {/* Vetor local, com dimensões reservadas e texto em curvas. */}
            <img
              src="/logo/lockup-claro.svg"
              alt="Rei das Vendas"
              width="238"
              height="46"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {links.map(([href, label]) => (
              <Link href={href} key={href}>
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
            <span aria-hidden="true">↗</span>
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
              <a href="/go/whatsapp?src=menu">Falar no WhatsApp ↗</a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
