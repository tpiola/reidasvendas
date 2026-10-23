import PageShell from '@/components/PageShell';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Cases e critérios de comprovação',
  'O que um caso da Rei das Vendas precisa demonstrar: contexto, período, escopo, investimento e resultado verificável.',
  '/cases',
);
export default function Page() {
  return (
    <PageShell
      title="Resultado precisa de contexto."
      description="Um percentual sem ponto de partida não explica uma operação. Só publicamos histórias com documentação e autorização."
      path="/cases"
    >
      <div className="split-content">
        <div className="prose">
          <h2>O que você deve pedir a qualquer agência</h2>
          <ul>
            <li>Qual era o cenário antes do trabalho?</li>
            <li>O que foi executado e durante qual período?</li>
            <li>Quanto foi investido em mídia e operação?</li>
            <li>O resultado é contato, venda, receita ou margem?</li>
            <li>Que outros fatores influenciaram a comparação?</li>
          </ul>
          <h2>Casos documentados</h2>
          <p>
            Ainda não há casos com resultado comercial e autorização publicados
            nesta nova coleção. Você pode conhecer o método, avaliar os
            critérios e pedir referências disponíveis durante a conversa.
          </p>
        </div>
        <aside className="callout">
          <h2>Escolha pela clareza da entrega.</h2>
          <p>
            Escopo, responsabilidades e critérios de aceite ficam definidos
            antes da construção.
          </p>
          <a className="button button-primary" href="/metodo">
            Conhecer o método
          </a>
          <a className="text-link" href="/go/whatsapp?src=cases&page=/cases">
            Pedir referências disponíveis ↗
          </a>
        </aside>
      </div>
    </PageShell>
  );
}
