'use client';

import { useId } from 'react';

/** Only the two native radios hydrate; plan content and amounts stay on the server. */
export default function BillingSelector({
  annualDiscountPercent,
}: {
  annualDiscountPercent: number;
}) {
  const group = useId();
  return (
    <fieldset
      className="billing-switch"
      onChange={(event) => {
        const input = event.target;
        if (
          input instanceof HTMLInputElement &&
          (input.value === 'mensal' || input.value === 'anual')
        ) {
          event.currentTarget
            .closest<HTMLElement>('.subscription-pricing')
            ?.setAttribute('data-billing-cycle', input.value);
        }
      }}
    >
      <legend className="sr-only">Ciclo de pagamento da assinatura</legend>
      <label>
        <input type="radio" name={group} value="mensal" defaultChecked />
        <span>Mensal</span>
      </label>
      <label>
        <input type="radio" name={group} value="anual" />
        <span>
          Anual <small>−{annualDiscountPercent}%</small>
        </span>
      </label>
    </fieldset>
  );
}
