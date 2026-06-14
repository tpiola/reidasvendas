import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <div className="font-['Playfair_Display'] text-8xl font-bold text-gradient-gold">404</div>
        <h1 className="mt-4 font-['Playfair_Display'] text-3xl font-bold text-white">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-[rgba(248,248,250,0.5)]">
          A página que você procura não existe ou foi movida. Volte para a home e encontre o que precisa.
        </p>
        <Link to="/" className="btn-primary mt-8 inline-flex">
          <Home className="h-4 w-4" />
          Voltar para Home
        </Link>
      </div>
    </main>
  );
}
