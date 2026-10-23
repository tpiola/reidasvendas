/* eslint-disable @next/next/no-html-link-for-pages -- WhatsApp route handlers require full navigation and a fresh event ID, without prefetch. */
import Link from 'next/link';
import ThankYou from '@/components/ThankYou';
import PageShell from '@/components/PageShell';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Próximo passo do seu atendimento',
  'Continue a conversa com a Rei das Vendas.',
  '/obrigado',
  true,
);
export default function Page() {
  return (
    <PageShell
      title="Seu próximo passo tem uma sequência."
      description="Confira o status no canal de atendimento ou no provedor. Abrir esta página não confirma assinatura nem pagamento. Não envie senhas ou listas de clientes."
      path="/obrigado"
    >
      <ThankYou />
      <h2>Para quem está avaliando um plano</h2>
      <p>
        Primeiro confirme escopo e contrato. Após a confirmação do pagamento
        pelo provedor, a equipe organiza materiais, cronograma e critérios da
        primeira entrega. A visita a esta página não dispara uma conversão de
        venda.
      </p>
      <div className="related-links">
        <Link href="/onboarding">Preparar materiais ↗</Link>
        <Link href="/area-do-cliente">Atendimento a clientes ↗</Link>
        <Link href="/planos">Rever os planos ↗</Link>
      </div>
      <a
        className="button button-primary"
        href="/go/whatsapp?src=obrigado&page=/obrigado"
      >
        Continuar no WhatsApp
      </a>
      <p>
        <Link href="/guia/funil-de-vendas-para-pme">
          Enquanto isso, conheça o guia de funil para PME.
        </Link>
      </p>
      <p>
        Garantia de 30 dias. As condições aplicáveis constam na proposta e nos
        termos.
      </p>
    </PageShell>
  );
}
