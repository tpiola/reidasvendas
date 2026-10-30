import Link from 'next/link';
import portfolio from '@/data/portfolio.json';
import PageShell from '@/components/PageShell';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Projetos publicados e escopos',
  'Projetos públicos para avaliar execução técnica. Casos comerciais só serão publicados com contexto, período, dados e autorização.',
  '/casos',
);
export default function CasesPage() {
  return (
    <PageShell
      title="Trabalho que você pode conferir."
      description="Abra os projetos e examine a navegação. São referências técnicas mantidas na conta pública do fundador, não depoimentos de clientes nem provas de retorno financeiro."
      path="/casos"
    >
      <div className="service-grid">
        {portfolio.map((project) => (
          <article className="service-card" key={project.title}>
            <p className="eyebrow">Referência técnica</p>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <h3>O que foi construído</h3>
            <ul>
              {project.observedFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a
              className="text-link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar projeto{' '}
              <span className="sr-only">(abre em nova aba)</span> ↗
            </a>
          </article>
        ))}
      </div>
      <section className="prose content-section">
        <h2>Um caso comercial precisa demonstrar mais.</h2>
        <p>
          A coleção de casos com métricas ainda não tem publicações autorizadas.
          Para publicar, exigimos contexto inicial, escopo, período,
          investimento, fonte, limitações e autorização. Receita, margem,
          contato e clique são medidas diferentes.
        </p>
        <ul>
          <li>Qual era a situação antes da intervenção?</li>
          <li>O que foi executado e em qual período?</li>
          <li>Como o resultado foi registrado e atribuído?</li>
          <li>Que custos e mudanças externas influenciaram?</li>
          <li>Quanto foi investido em mídia e operação?</li>
          <li>O resultado representa contato, venda, receita ou margem?</li>
        </ul>
        <Link className="button" href="/metodo">
          Conferir o método
        </Link>
      </section>
    </PageShell>
  );
}
