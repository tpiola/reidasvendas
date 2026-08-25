import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';

const PROJECTS = [
  {
    name: 'SaúdeGPT',
    type: 'Produto conversacional',
    description: 'Experiência voltada a informações de saúde, com navegação guiada, histórico e postura institucional.',
    scope: ['Produto web', 'Fluxo de conversa', 'Conteúdo e limites', 'Publicação contínua'],
    href: 'https://saudegpt.com',
  },
  {
    name: 'Sentinela Saúde Ambiental',
    type: 'Presença de serviço local',
    description: 'Serviços, áreas atendidas, informações da operação e caminho de orçamento reunidos no mesmo endereço.',
    scope: ['Arquitetura local', 'Páginas de serviço', 'Contato contextual', 'Domínio próprio'],
    href: 'https://sentinelasaudeambiental.com.br',
  },
  {
    name: 'Thiago Piola',
    type: 'Presença autoral',
    description: 'Trajetória, repertório, projetos e serviços organizados para leitura e contato profissional.',
    scope: ['Narrativa', 'Portfólio', 'Conteúdo', 'Publicação'],
    href: 'https://thiagopiola.com.br',
  },
];

const PROCESS = [
  ['Leitura', 'Contexto, objetivo, canais, restrições e responsáveis.'],
  ['Corte', 'Uma prioridade que possa ser explicada e verificada.'],
  ['Construção', 'Interface, conteúdo e integração compatíveis com o corte.'],
  ['Publicação', 'Código, deploy, domínio, medição e recuperação no mesmo mapa.'],
];

export default function Portfolio() {
  return (
    <main id="main-content" className="rdv-portfolio">
      <header className="rdv-portfolio__hero">
        <div className="rdv-shell">
          <p className="rdv-kicker">Projetos publicados</p>
          <h1>O problema muda. A arquitetura precisa mudar junto.</h1>
          <p>Três trabalhos em produção, descritos pelo que organizam — sem métricas decorativas ou resultados atribuídos sem medição.</p>
        </div>
      </header>

      <section className="rdv-portfolio__ledger" aria-labelledby="portfolio-projects-title">
        <div className="rdv-shell">
          <h2 id="portfolio-projects-title" className="sr-only">Projetos</h2>
          {PROJECTS.map((project) => (
            <article key={project.name}>
              <div>
                <p>{project.type}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <ul aria-label={`Escopo de ${project.name}`}>
                {project.scope.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                Abrir projeto <ExternalLink aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="rdv-portfolio__process" aria-labelledby="portfolio-process-title">
        <div className="rdv-shell">
          <header className="rdv-section-intro rdv-section-intro--compact">
            <h2 id="portfolio-process-title">O trabalho só termina quando a origem está clara.</h2>
          </header>
          <ol>
            {PROCESS.map(([title, detail], index) => (
              <li key={title}><h3><span>{String(index + 1).padStart(2, '0')}</span>{title}</h3><p>{detail}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rdv-portfolio__closing" aria-labelledby="portfolio-closing-title">
        <div className="rdv-shell">
          <div><p className="rdv-kicker">Novo projeto</p><h2 id="portfolio-closing-title">Qual problema merece virar produto?</h2></div>
          <Link className="rdv-primary-action" to="/diagnostico" onClick={() => trackEvent('diagnostic_start', { position: 'portfolio-closing' })}>
            Registrar contexto <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
