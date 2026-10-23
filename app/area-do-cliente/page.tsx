/* eslint-disable @next/next/no-html-link-for-pages -- WhatsApp route handlers require full navigation and a fresh event ID, without prefetch. */
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Atendimento a clientes',
  'Solicite suporte, condições de cobrança e acesso ao ambiente contratado. Nenhum dado de cliente é exibido publicamente.',
  '/area-do-cliente',
  true,
);
export default function CustomerPage() {
  return (
    <PageShell
      title="Continuidade também precisa de um caminho claro."
      description="Suporte, revisão e cobrança seguem os canais definidos no seu contrato. Este site não disponibiliza um painel público com dados ou faturas de clientes."
      path="/area-do-cliente"
    >
      <div className="split-content">
        <section className="prose">
          <h2>Para quem já é cliente</h2>
          <p>
            Informe a empresa e o assunto ao atendimento: ajuste, suporte,
            relatório ou cobrança. A equipe verifica a titularidade antes de
            compartilhar documentos ou alterar acessos.
          </p>
          <p>
            Quando o portal do provedor estiver configurado, o responsável
            receberá o acesso autenticado para gerenciar forma de pagamento,
            faturas e assinatura. Não solicitamos cartão ou senha pelo WhatsApp.
          </p>
          <a
            className="button"
            href="/go/whatsapp?src=cliente&page=/area-do-cliente"
          >
            Falar sobre meu contrato ↗
          </a>
        </section>
        <aside className="callout">
          <h2>Precisa organizar a primeira entrega?</h2>
          <p>
            Confira materiais, aprovações e responsabilidades. O cronograma
            começa conforme as condições do contrato.
          </p>
          <Link className="text-link" href="/onboarding">
            Ver checklist de implantação ↗
          </Link>
          <Link className="text-link" href="/termos">
            Consultar os termos ↗
          </Link>
        </aside>
      </div>
    </PageShell>
  );
}
