import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center px-4">
        <div className="text-6xl font-serif font-bold text-gradient-gold mb-4">404</div>
        <h1 className="font-serif text-2xl font-bold text-white sm:text-3xl">Página não encontrada</h1>
        <p className="mt-3 text-sm text-[#A1A1AA]">
          Esta página pode ter sido movida ou não existe mais.
        </p>
        <Link to="/" className="btn-outline-gold inline-flex mt-8">
          <ArrowLeft className="h-4 w-4" /> Voltar para Home
        </Link>
      </div>
    </main>
  );
}
