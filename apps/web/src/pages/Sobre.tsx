import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { BRAND } from '@/lib/brand';
import { PROJECTS } from '@/lib/portfolio';

const principles = [
  {
    index: '01',
    title: 'Ler a operação',
    description: 'Serviços, público, objeções, atendimento e limites técnicos entram no projeto antes da primeira tela.',
  },
  {
    index: '02',
    title: 'Cortar o ruído',
    description: 'Cada página precisa justificar a própria existência e conduzir a uma decisão reconhecível.',
  },
  {
    index: '03',
    title: 'Publicar o que se sustenta',
    description: 'Sem métricas inventadas, avaliações sem origem ou promessa que o negócio não consiga cumprir.',
  },
  {
    index: '04',
    title: 'Entregar continuidade',
    description: 'Domínio, código, publicação e medição ficam organizados para o projeto continuar operável depois do lançamento.',
  },
];

const responsibilities = [
  ['Direção', BRAND.founder.name],
  ['Base', BRAND.address],
  ['Escopo', 'Mapeamento, arquitetura, implementação e publicação'],
  ['Entrada', 'Um diagnóstico antes de proposta ou orçamento'],
];

export default function Sobre() {
  return (
    <main id="main-content" className="rdv-about">
      <section className="rdv-about__hero">
        <div className="rdv-shell">
          <p className="rdv-kicker">Rei das Vendas / direção de projeto</p>
          <h1>O trabalho começa quando a resposta pronta termina.</h1>
          <p>
            O Rei das Vendas é conduzido por {BRAND.founder.name}, em Franca, SP. Cada projeto parte da forma
            como o negócio é encontrado, entendido e atendido — não de uma aparência escolhida antes do problema.
          </p>
        </div>
      </section>

      <section className="rdv-about__identity" aria-labelledby="about-identity-title">
        <div className="rdv-shell">
          <div className="rdv-about__identity-copy">
            <h2 id="about-identity-title">Uma pessoa responde pelo corte.</h2>
            <p>{BRAND.founder.bio}</p>
          </div>
          <dl>
            {responsibilities.map(([term, detail]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rdv-about__work" aria-labelledby="about-work-title">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">Prova, não promessa</p>
            <h2 id="about-work-title">O corte se vê no que já foi publicado.</h2>
          </header>
          <div className="rdv-about__work-grid">
            {PROJECTS.map((project) => (
              <article key={project.name}>
                <div className="rdv-portfolio-v3__shot">
                  <img src={project.image} alt={`Interface publicada de ${project.name}`} loading="lazy" width="800" height="500" />
                </div>
                <p>{project.type}</p>
                <h3>{project.name}</h3>
              </article>
            ))}
          </div>
          <Link className="rdv-about__work-link" to="/portfolio">Ver todos os projetos <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="rdv-about__principles" aria-labelledby="about-principles-title">
        <div className="rdv-shell">
          <h2 id="about-principles-title">Quatro decisões antes da interface.</h2>
          <ol>
            {principles.map((principle) => (
              <li key={principle.index}>
                <h3><span>{principle.index}</span>{principle.title}</h3>
                <p>{principle.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rdv-about__boundary" aria-labelledby="about-boundary-title">
        <div className="rdv-shell">
          <div>
            <h2 id="about-boundary-title">O projeto não começa pela ferramenta.</h2>
          </div>
          <p>
            Tecnologia entra quando reduz atrito, esclarece uma escolha ou preserva uma rotina. Se uma página,
            integração ou automação não cumpre uma dessas funções, ela não ganha espaço no escopo.
          </p>
          <p className="rdv-about__place"><MapPin aria-hidden="true" /> Franca, SP · atendimento remoto</p>
        </div>
      </section>

      <section className="rdv-about__closing">
        <div className="rdv-shell">
          <div>
            <p className="rdv-kicker">Próximo movimento</p>
            <h2>Traga o contexto antes de pedir a solução.</h2>
          </div>
          <Link
            className="rdv-primary-action"
            to="/diagnostico"
            onClick={() => trackEvent('diagnostic_start', { position: 'about-closing' })}
          >
            Abrir diagnóstico <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
