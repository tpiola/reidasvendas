import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ARTICLE_BY_SLUG } from '@/lib/articles';
import { trackEvent } from '@/lib/analytics';

export default function BlogPost() {
  const { slug } = useParams();
  const article = slug ? ARTICLE_BY_SLUG.get(slug) : undefined;

  if (!article) {
    return (
      <main id="main-content" className="rdv-article rdv-article--missing">
        <div className="rdv-shell">
          <p className="rdv-kicker">Artigo não encontrado</p>
          <h1>Este endereço não pertence ao caderno atual.</h1>
          <Link className="rdv-footer__action" to="/blog"><ArrowLeft aria-hidden="true" /> Voltar aos artigos</Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="rdv-article">
      <header className="rdv-article__head">
        <div className="rdv-shell">
          <Link className="rdv-article__back" to="/blog"><ArrowLeft aria-hidden="true" /> Caderno de operação</Link>
          <p className="rdv-kicker">{article.category} · {article.displayDate} · {article.readTime}</p>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </div>
      </header>

      <article className="rdv-article__body">
        <div className="rdv-shell">
          {article.sections.map((section, index) => (
            <section key={section.heading} aria-labelledby={`article-section-${index}`}>
              <div>
                <h2 id={`article-section-${index}`}>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </article>

      <section className="rdv-article__closing" aria-labelledby="article-closing-title">
        <div className="rdv-shell">
          <div>
            <p className="rdv-kicker">Aplicar ao seu negócio</p>
            <h2 id="article-closing-title">Leve o problema concreto para o diagnóstico.</h2>
          </div>
          <Link
            className="rdv-primary-action"
            to="/diagnostico"
            onClick={() => trackEvent('diagnostic_start', { position: 'article-closing', article: article.slug })}
          >
            Abrir diagnóstico <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
