import Link from 'next/link';
import { metadata as meta } from '@/lib/site';
import PageShell from '@/components/PageShell';
import content from '@/data/content.json';
export const metadata = meta(
  'Método de marketing e operação comercial',
  'Diagnóstico, arquitetura, implantação, gestão e escala. Conheça as entregas e decisões em cada etapa.',
  '/metodo',
);
export default function Page() {
  return (
    <PageShell
      title="O método começa antes da ferramenta."
      description="Observamos o caminho da compra, escolhemos a prioridade e implantamos com responsabilidade definida. Diagnóstico não é uma obrigação para contratar um site."
      path="/metodo"
    >
      <section className="callout">
        <h2>Na assinatura, a publicação tem continuidade.</h2>
        <p>
          Diagnóstico rápido → estrutura → publicação → captura de contatos →
          otimização → manutenção. A equipe registra entregas mensais, acompanha
          os indicadores disponíveis e revê prioridades com o contratante. O
          próximo investimento depende de dados e capacidade, não de uma meta
          prometida de vendas.
        </p>
        <Link className="text-link" href="/planos" data-event="click_cta_planos">
          Ver planos e limites ↗
        </Link>
      </section>
      <ol className="method-list">
        {content.method.map((m) => (
          <li key={m.step}>
            <span className="step-number">
              {String(m.step).padStart(2, '0')}
            </span>
            <div>
              <h2>{m.title}</h2>
              <p>{m.description}</p>
              <p>
                <strong>Você recebe:</strong> {m.deliverable}
              </p>
              <p className="muted">
                <strong>Como avaliar:</strong> {m.metric}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="callout">
        <h2>Rigor de diagnóstico, em linguagem de negócio.</h2>
        <p>
          A experiência farmacêutica do fundador inspira a disciplina de ouvir,
          investigar e só depois indicar uma conduta. Na empresa, isso vira uma
          sequência simples: levantar fatos, escolher a prioridade, executar e
          acompanhar. Não é uma certificação clínica de marketing nem promessa
          de resultado.
        </p>
        <Link className="button button-primary" href="/diagnostico">
          Conversar sobre meu cenário
        </Link>
      </div>
    </PageShell>
  );
}
