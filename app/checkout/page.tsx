import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { SubscriptionCheckout } from '@/components/SubscriptionJourney';
import { selectedSubscription } from '@/lib/subscription-context';
import { isCheckoutConfigured } from '@/lib/payments';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Revisar plano e contratação',
  'Confira implantação, recorrência, escopo e condições antes de qualquer pagamento.',
  '/checkout',
  true,
);
export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const { plan, cycle } = selectedSubscription(query.plano, query.ciclo);
  const available =
    !!plan &&
    isCheckoutConfigured(plan.id, cycle === 'anual' ? 'annual' : 'monthly');
  return (
    <PageShell
      title={
        available
          ? 'Confira o que você está contratando.'
          : 'Revise sua proposta de site.'
      }
      description="Implantação, acompanhamento e condições por escrito antes de qualquer contratação."
      path="/checkout"
    >
      {plan ? (
        <SubscriptionCheckout
          key={plan.id + cycle}
          planId={plan.id}
          cycle={cycle}
          available={available}
        />
      ) : (
        <div className="callout">
          <h2>Escolha um plano para continuar.</h2>
          <p>
            Nenhum plano válido foi selecionado. Não há pedido ou pagamento
            confirmado.
          </p>
          <Link className="button" href="/planos">
            Comparar planos
          </Link>
        </div>
      )}
    </PageShell>
  );
}
