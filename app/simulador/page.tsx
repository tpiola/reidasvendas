import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { Calculator } from '@/components/Interactive';
import { MaturityQuiz } from '@/components/MaturityQuiz';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Simulador de oportunidades e maturidade digital',
  'Simule contatos, taxa de fechamento e ticket médio. Uma hipótese matemática para orientar a conversa, sem promessa de receita.',
  '/simulador',
);
export default function SimulatorPage() {
  return (
    <PageShell
      title="Faça as contas antes de escolher a ferramenta."
      description="Use números da sua operação. O resultado é um cenário matemático, não uma previsão, promessa de venda ou recomendação de investimento."
      path="/simulador"
    >
      <Calculator />
      <div className="content-section">
        <MaturityQuiz />
      </div>
      <aside className="callout">
        <h2>O próximo passo depende do que falta na base.</h2>
        <p>
          Se o cliente não encontra uma informação clara, comece pela presença.
          Se o contato chega e esfria, reveja atendimento e retorno. Se a origem
          da venda é desconhecida, organize os registros antes de ampliar o
          investimento.
        </p>
        <div className="related-links">
          <Link href="/planos" data-event="click_cta_planos">
            Comparar os planos ↗
          </Link>
          <Link href="/diagnostico" data-event="click_cta_diagnostico">
            Avaliar meu contexto ↗
          </Link>
        </div>
      </aside>
    </PageShell>
  );
}
