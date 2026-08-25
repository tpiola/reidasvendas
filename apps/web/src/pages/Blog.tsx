import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '@/lib/articles';
import { trackEvent } from '@/lib/analytics';

export default function Blog() {
  return (
    <main id="main-content" className="rdv-journal">
      <header className="rdv-journal__head">
        <div className="rdv-shell">
          <p className="rdv-kicker">Caderno de operação</p>
          <h1>Leituras para decidir antes de construir.</h1>
          <p>Critérios de publicação, busca, atendimento e continuidade — escritos para uso, não para preencher calendário.</p>
        </div>
      </header>

      <section className="rdv-journal__list" aria-labelledby="articles-title">
        <div className="rdv-shell">
          <h2 id="articles-title" className="sr-only">Artigos publicados</h2>
          {ARTICLES.map((article) => (
            <article key={article.slug}>
              <div>
                <p>{article.category} · {article.displayDate} · {article.readTime}</p>
                <h3><Link to={`/blog/${article.slug}`}>{article.title}</Link></h3>
                <p>{article.description}</p>
              </div>
              <Link className="rdv-journal__read" to={`/blog/${article.slug}`} aria-label={`Ler: ${article.title}`}>
                Ler <ArrowRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rdv-journal__closing" aria-labelledby="journal-closing-title">
        <div className="rdv-shell">
          <h2 id="journal-closing-title">O problema já está claro?</h2>
          <Link
            className="rdv-primary-action"
            to="/diagnostico"
            onClick={() => trackEvent('diagnostic_start', { position: 'blog-closing' })}
          >
            Abrir diagnóstico <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
