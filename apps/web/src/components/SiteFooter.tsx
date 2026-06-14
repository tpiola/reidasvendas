import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/brand';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[rgba(201,168,76,0.2)] bg-[#050505] text-[#f8f8fa]">
      {/* Gradientes decorativos */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.06)_0%,transparent_50%),radial-gradient(ellipse_at_50%_100%,rgba(0,87,255,0.1)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-[#C9A84C]">REI</span>{' '}
                <span className="text-white">DAS VENDAS</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[rgba(248,248,250,0.45)]">
              Soluções digitais premium para negócios que querem crescer. Sites, apps, automações e muito mais.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Navegação</h4>
            <nav className="flex flex-col gap-3" aria-label="Links do rodapé">
              <Link to="/" className="text-sm text-[rgba(248,248,250,0.55)] transition hover:text-white">Home</Link>
              <Link to="/servicos" className="text-sm text-[rgba(248,248,250,0.55)] transition hover:text-white">Serviços</Link>
              <Link to="/blog" className="text-sm text-[rgba(248,248,250,0.55)] transition hover:text-white">Blog</Link>
              <Link to="/contato" className="text-sm text-[rgba(248,248,250,0.55)] transition hover:text-white">Contato</Link>
            </nav>
          </div>

          {/* Contato */}
          <div>
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Contato</h4>
            <div className="flex flex-col gap-3">
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[rgba(248,248,250,0.55)] transition hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-[#C9A84C]" />
                Fale conosco
              </a>
              <a href={`mailto:${BRAND.email}`} className="text-sm text-[rgba(248,248,250,0.55)] transition hover:text-white">
                {BRAND.email}
              </a>
              <Link to="/politica" className="text-sm text-[rgba(248,248,250,0.45)] transition hover:text-white">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[rgba(255,255,255,0.06)] pt-6 text-center text-xs text-[rgba(248,248,250,0.35)]">
          &copy; {year} Rei das Vendas. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
