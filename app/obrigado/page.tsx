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
      title="O próximo passo é entender seu cenário."
      description="Tenha em mãos seu site, segmento e a principal dificuldade. Não envie senhas ou listas de clientes."
      path="/obrigado"
    >
      <ThankYou />
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
