import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { OTHER_WORK, PROJECTS } from '@/lib/portfolio';

export default function Portfolio() {
  return (
    <main id="main-content" className="rdv-portfolio-v3">
      <header className="rdv-portfolio-v3__hero">
        <div className="rdv-shell">
          <p className="rdv-kicker">Projetos reais</p>
          <h1>A interface é a parte visível de uma decisão maior.</h1>
          <p>Mostramos o que foi organizado e o escopo publicado. Quando não existe mensuração verificável, não inventamos uma métrica para preencher o card.</p>
        </div>
      </header>

      <section className="rdv-portfolio-v3__projects" aria-labelledby="portfolio-projects-title">
        <div className="rdv-shell">
          <h2 id="portfolio-projects-title" className="sr-only">Projetos publicados</h2>
          {PROJECTS.map((project, index) => (
            <article key={project.name}>
              <div className="rdv-portfolio-v3__shot">
                <img src={project.image} alt={`Interface publicada de ${project.name}`} width="1200" height="750" loading={index === 0 ? 'eager' : 'lazy'} />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="rdv-portfolio-v3__copy">
                <p>{project.type}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <ul aria-label={`Escopo de ${project.name}`}>{project.scope.map((item) => <li key={item}>{item}</li>)}</ul>
                {project.href ? <a href={project.href} target="_blank" rel="noopener noreferrer">Abrir projeto <ExternalLink aria-hidden="true" /></a> : <span>Registro visual do projeto</span>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rdv-portfolio-v3__other" aria-labelledby="portfolio-other-title">
        <div className="rdv-shell">
          <header><p className="rdv-kicker">Outros contextos</p><h2 id="portfolio-other-title">Produto e presença autoral também exigem uma arquitetura própria.</h2></header>
          <div>
            {OTHER_WORK.map(([name, type, detail, href], index) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer">
                <span>{String(index + 4).padStart(2, '0')}</span>
                <div><p>{type}</p><h3>{name}</h3></div>
                <p>{detail}</p>
                <ExternalLink aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="rdv-portfolio-v3__demos" aria-labelledby="portfolio-demos-title">
        <div className="rdv-shell">
          <div><p className="rdv-kicker">Mais repertório</p><h2 id="portfolio-demos-title">Demonstração não é case. É uma forma honesta de mostrar o que pode ser construído.</h2></div>
          <div>
            <p>Explore fluxos de catálogo, pedido, agendamento e busca com dados fictícios claramente identificados.</p>
            <Link to="/demonstracoes">Abrir arquiteturas demonstrativas <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="rdv-portfolio-v3__closing">
        <div className="rdv-shell">
          <p className="rdv-kicker">Novo projeto</p>
          <h2>Qual parte da sua operação merece virar produto?</h2>
          <Link className="rdv-primary-action" to="/diagnostico?origem=portfolio" onClick={() => trackEvent('diagnostic_start', { position: 'portfolio-closing' })}>
            Registrar o contexto <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
