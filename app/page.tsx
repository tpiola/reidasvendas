import Link from 'next/link';
import portfolio from '@/data/portfolio.json';
import Pricing from '@/components/Pricing';
import HeroOrbit from '@/components/HeroOrbit';
import { metadata as createMetadata } from '@/lib/site';

export const metadata = createMetadata(
  'Sites profissionais em Franca',
  'Sites profissionais, busca local e WhatsApp para pequenas empresas. Veja projetos publicados, compare o investimento e converse sobre seu projeto.',
  '/',
);

const questions = [
  [
    'Como começa e qual é o prazo?',
    'A conversa inicial é gratuita. Depois, você recebe uma proposta com escopo, prazo e investimento. O trabalho começa após o aceite; o prazo depende das páginas, materiais e aprovações combinados.',
  ],
  [
    'O que está incluído no investimento?',
    'A implantação cria o site; a recorrência cobre manutenção e as entregas do plano. Anúncios, redes sociais, domínio e ferramentas externas só entram quando previstos na proposta. Projetos avulsos também podem ser avaliados.',
  ],
  [
    'E se eu já tiver um site ou quiser cancelar?',
    'Avaliamos o que pode ser aproveitado. Propriedade dos arquivos, acessos, renovação e cancelamento são definidos na proposta e no contrato antes do aceite.',
  ],
];

export default function Home() {
  return (
    <div className="studio-home home-focused">
      <section className="studio-hero hero" aria-labelledby="home-title">
        <div className="container studio-hero-grid">
          <div className="studio-hero-copy">
            <p className="studio-kicker">
              <span /> Sites profissionais · Franca e todo o Brasil
            </p>
            <h1 id="home-title">
              Seu negócio bem apresentado. <span>O contato mais fácil.</span>
            </h1>
            <p className="studio-hero-description">
              Criamos sites para pequenas empresas, com busca local e WhatsApp.
              Escopo e investimento definidos antes de começar.
            </p>
            <div className="studio-hero-actions">
              <Link
                className="button studio-primary"
                href="/diagnostico"
                data-event="click_cta_diagnostico"
              >
                Conversar sobre meu projeto <span aria-hidden="true">↗</span>
              </Link>
              <a className="studio-project-link" href="#trabalhos">
                Ver trabalhos publicados <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="studio-hero-assurance">
              Conversa inicial gratuita. Proposta antes da contratação.
            </p>
          </div>
          <HeroOrbit />
        </div>
      </section>

      <section
        id="trabalhos"
        className="subscription-section container studio-work"
        aria-labelledby="portfolio-title"
      >
        <div className="home-section-heading">
          <h2 id="portfolio-title">Projetos no ar.</h2>
          <Link className="text-link" href="/casos">
            Ver escopos e contexto ↗
          </Link>
        </div>
        <div className="studio-projects">
          {portfolio.map((project) => (
            <a
              className={`studio-project studio-project-${project.id}`}
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${project.title}, em nova aba`}
            >
              <div className="studio-project-visual" aria-hidden="true">
                <span className="studio-project-wordmark">{project.title}</span>
                <span className="studio-project-open">Visitar site ↗</span>
              </div>
              <div className="studio-project-caption">
                <h3>{project.category}</h3>
              </div>
            </a>
          ))}
        </div>
        <p className="subscription-evidence-note">
          Projetos próprios publicados. As capas identificam os sites; não são
          capturas de tela nem casos de resultado comercial.
        </p>
      </section>

      <section
        id="planos"
        className="subscription-plans-section studio-plans"
        aria-labelledby="pricing-title"
      >
        <div className="container">
          <div className="home-section-heading">
            <div>
              <h2 id="pricing-title">Seu site. O cuidado continua.</h2>
              <p>
                Implantação para começar. Manutenção e entregas para continuar.
              </p>
            </div>
            <Link className="text-link" href="/planos">
              Comparar escopos e condições ↗
            </Link>
          </div>
          <Pricing compact />
        </div>
      </section>

      <section
        className="subscription-section container subscription-faq"
        aria-labelledby="faq-title"
      >
        <div>
          <h2 id="faq-title">Antes de começar.</h2>
          <Link href="/faq" className="text-link">
            Todas as dúvidas ↗
          </Link>
        </div>
        <div className="faq-list">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <div>
                <p>{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="home-contact" aria-labelledby="contact-title">
        <div className="container">
          <div>
            <h2 id="contact-title">Vamos falar do seu site?</h2>
            <p>
              Conte o que sua empresa precisa. O próximo passo é uma proposta.
            </p>
          </div>
          <Link
            className="button studio-primary"
            href="/diagnostico"
            data-event="click_cta_diagnostico"
          >
            Conversar sobre meu projeto <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
