import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/brand';
import { trackEvent } from '@/lib/analytics';

const ROUTES = [
  ['Soluções', '/solucoes'],
  ['Projetos', '/portfolio'],
  ['Artigos', '/blog'],
  ['Sobre', '/sobre'],
  ['Privacidade', '/politica'],
];

export function SiteFooter() {
  return (
    <footer className="rdv-footer">
      <div className="rdv-shell">
        <div className="rdv-footer__statement">
          <div>
            <p>Rei das Vendas · Franca, SP</p>
            <h2>Se existe perda entre a busca e a conversa, existe um trabalho a fazer.</h2>
            <Link
              className="rdv-footer__action"
              to="/diagnostico"
              onClick={() => trackEvent('diagnostic_start', { position: 'footer' })}
            >
              Abrir diagnóstico <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <nav className="rdv-footer__index" aria-label="Índice do site">
          {ROUTES.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
        </nav>

        <div className="rdv-footer__meta">
          <p>© {new Date().getFullYear()} {BRAND.name}</p>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={BRAND.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span className="rdv-footer__built" title="Agente autônomo de desenvolvimento">Construído por Hermes Agent</span>
        </div>
      </div>
    </footer>
  );
}
