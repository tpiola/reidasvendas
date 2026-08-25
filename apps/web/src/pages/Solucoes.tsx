import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { COMPARISONS, DEMONSTRATIONS, GUIDES, SOLUTIONS, TOOLS } from '@/lib/growth';

const METHOD = [
  ['Leitura do negócio', 'Oferta, público, canais, atendimento, restrições e responsáveis.'],
  ['Análise da jornada', 'Onde a pessoa encontra, entende, age e perde continuidade.'],
  ['Definição do corte', 'Qual ruptura merece ser resolvida antes das demais.'],
  ['Arquitetura', 'Conteúdo, rotas, estados, dados e integrações necessários.'],
  ['Construção', 'Interface e implementação sem módulos sem função.'],
  ['Publicação', 'Domínio, eventos, formulários, acesso e recuperação conferidos.'],
  ['Evolução', 'Mudanças priorizadas por uso e evidência disponível.'],
];

const PROJECTS = [
  ['SaúdeGPT', 'Produto conversacional', 'Experiência guiada para informação de saúde, com postura institucional e limites explícitos.'],
  ['Sentinela Saúde Ambiental', 'Presença de serviço local', 'Serviços, áreas atendidas e caminho de orçamento reunidos no mesmo endereço.'],
  ['Thiago Piola', 'Presença autoral', 'Trajetória, projetos e serviços organizados em uma narrativa própria.'],
];

export default function Solucoes() {
  return (
    <main id="main-content" className="rdv-library">
      <header className="rdv-library__hero">
        <div className="rdv-shell">
          <p className="rdv-kicker">Biblioteca de soluções</p>
          <h1>O que construir depende do ponto exato de perda.</h1>
          <p>As rotas abaixo não são pacotes. Cada uma mostra uma arquitetura possível, as perguntas que faltam e o que precisa ser confirmado antes do escopo.</p>
          <Link className="rdv-primary-action" to="/diagnostico" onClick={() => trackEvent('diagnostic_start', { position: 'solutions-hero' })}>
            Abrir diagnóstico <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </header>

      <section className="rdv-library__solutions" aria-labelledby="solution-index-title">
        <div className="rdv-shell">
          <header className="rdv-section-intro rdv-section-intro--compact">
            <h2 id="solution-index-title">Comece pela situação mais próxima da sua.</h2>
          </header>
          <div className="rdv-solution-ledger">
            {SOLUTIONS.map((solution) => (
              <article key={solution.slug}>
                <div>
                  <p>{solution.category}</p>
                  <h3><Link to={`/solucoes/${solution.slug}`} onClick={() => trackEvent('solution_open', { solution: solution.slug })}>{solution.title}</Link></h3>
                  <p>{solution.summary}</p>
                </div>
                <Link className="rdv-ledger-link" to={`/solucoes/${solution.slug}`} aria-label={`Ver arquitetura: ${solution.title}`}>
                  Ver arquitetura <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rdv-library__method" aria-labelledby="library-method-title">
        <div className="rdv-shell">
          <header className="rdv-section-intro rdv-section-intro--compact">
            <h2 id="library-method-title">Sete passagens, sem pular do pedido para a tela.</h2>
          </header>
          <ol>
            {METHOD.map(([title, detail], index) => (
              <li key={title}>
                <h3><span>{String(index + 1).padStart(2, '0')}</span>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rdv-library__projects" aria-labelledby="library-projects-title">
        <div className="rdv-shell">
          <header className="rdv-section-intro rdv-section-intro--compact">
            <h2 id="library-projects-title">A arquitetura muda quando o problema muda.</h2>
          </header>
          <div>
            {PROJECTS.map(([name, type, detail]) => (
              <article key={name}><h3>{name}</h3><p>{type}</p><p>{detail}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="rdv-library__directory" aria-labelledby="directory-title">
        <div className="rdv-shell">
          <header className="rdv-section-intro rdv-section-intro--compact">
            <h2 id="directory-title">Compare, simule e examine antes da conversa.</h2>
          </header>
          <div className="rdv-directory">
            <section aria-labelledby="directory-comparisons"><h3 id="directory-comparisons">Comparações</h3><div>{COMPARISONS.map((item) => <Link key={item.slug} to={`/alternativas/${item.slug}`}>{item.title}</Link>)}</div></section>
            <section aria-labelledby="directory-guides"><h3 id="directory-guides">Guias de escopo</h3><div>{GUIDES.map((item) => <Link key={item.slug} to={`/${item.slug}`}>{item.title}</Link>)}</div></section>
            <section aria-labelledby="directory-tools"><h3 id="directory-tools">Ferramentas</h3><div>{TOOLS.map((item) => <Link key={item.slug} to={`/ferramentas/${item.slug}`}>{item.title}</Link>)}</div></section>
            <section aria-labelledby="directory-demos"><h3 id="directory-demos">Demonstrações</h3><div>{DEMONSTRATIONS.map((item) => <Link key={item.slug} to={`/demonstracoes/${item.slug}`}>{item.title}</Link>)}</div></section>
          </div>
        </div>
      </section>

      <section className="rdv-library__closing" aria-labelledby="solutions-closing-title">
        <div className="rdv-shell">
          <div><p className="rdv-kicker">Próxima decisão</p><h2 id="solutions-closing-title">Qual ruptura vem primeiro?</h2></div>
          <Link className="rdv-primary-action" to="/diagnostico" onClick={() => trackEvent('diagnostic_start', { position: 'solutions-closing' })}>
            Registrar contexto <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
