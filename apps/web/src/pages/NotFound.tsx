import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';

export default function NotFound() {
    useEffect(() => {
          applySeo({
                  title: 'Pagina nao encontrada — Rei das Vendas',
                  description: 'A pagina que voce procura nao existe. Volte para a home.',
                  robots: 'noindex,follow',
          });
    }, []);

  return (
        <main className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 py-20 text-center">
              <p className="text-7xl font-semibold tracking-tight text-black/10">404</p>
              <h1 className="mt-4 text-2xl font-semibold tracking-tight">
                      Pagina nao encontrada
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-black/60">
                      O link que voce seguiu pode estar desatualizado ou a pagina foi movida. Volte para a
                      home e tente novamente.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                      <Link
                                  to="/"
                                  className="inline-flex h-12 items-center justify-center rounded-xl bg-black px-6 text-sm font-semibold text-white transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                >
                                Voltar para a Home
                      </Link>
                      <Link
                                  to="/projetos"
                                  className="inline-flex h-12 items-center justify-center rounded-xl border border-black/15 px-6 text-sm font-semibold text-black/70 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                >
                                Ver projetos
                      </Link>
              </div>
        </main>
      );
}
