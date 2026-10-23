import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Como medimos resultado comercial',
  'Entenda a diferença entre alcance, contato, lead qualificado, venda e margem no acompanhamento de marketing.',
  '/resultados',
);
export default function Page() {
  return (
    <PageShell
      title="Clique é começo. Decisão precisa de evidência."
      description="O relatório deve ajudar a decidir o próximo investimento. Cada indicador tem um papel e um limite."
      path="/resultados"
    >
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Etapa</th>
              <th>O que observar</th>
              <th>O que isso não prova</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                'Aquisição',
                'Origem, investimento, visitas com intenção',
                'Venda ou lucro',
              ],
              [
                'Consideração',
                'Serviços vistos, quiz e simulação',
                'Intenção de compra confirmada',
              ],
              [
                'Contato',
                'Clique no WhatsApp e formulário recebido',
                'Mensagem enviada no aplicativo',
              ],
              [
                'Qualificação',
                'Necessidade, adequação e próximo passo no CRM',
                'Contrato fechado',
              ],
              [
                'Venda e retenção',
                'Receita, margem, continuidade e indicação',
                'Causalidade isolada de um anúncio',
              ],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((c) => (
                  <td key={c}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Atribuição de marketing tem limites. Consentimento, troca de
        dispositivos e conversas fora do site afetam a leitura. A confirmação de
        venda vem da operação, não de um clique.
      </p>
      <Link className="text-link" href="/diagnostico">
        Organizar a medição da minha operação ↗
      </Link>
    </PageShell>
  );
}
