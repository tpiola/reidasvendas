'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  subscriptionPlans,
  calculateAnnualPrice,
} from '@/data/subscription-plans';
import { money, type BillingCycle } from '@/lib/subscription-context';
import { track } from '@/lib/tracking';
import { whatsappMessage } from '@/lib/whatsapp';

export function SubscriptionCheckout({
  planId,
  cycle,
  available,
  page = '/checkout',
}: {
  planId: string;
  cycle: BillingCycle;
  available: boolean;
  page?: '/checkout' | '/diagnostico';
}) {
  const plan = subscriptionPlans.find((item) => item.id === planId);
  const [terms, setTerms] = useState(false);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState('');
  const requestId = useRef('');
  if (!plan) return null;
  const recurring =
    cycle === 'anual'
      ? calculateAnnualPrice(plan.monthlyPrice).annualTotal
      : plan.monthlyPrice;
  const totalFirstCharge = recurring + plan.setupPrice;
  async function openCheckout() {
    if (!terms || pending) return;
    setPending(true);
    setNotice('');
    if (!requestId.current) requestId.current = crypto.randomUUID();
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          cycle: cycle === 'anual' ? 'annual' : 'monthly',
          requestId: requestId.current,
          termsAccepted: true,
          website: '',
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error ||
            'Checkout indisponível. Confirme as condições pelo WhatsApp.',
        );
      const url = new URL(result.url);
      if (url.protocol !== 'https:' || url.hostname !== 'checkout.stripe.com')
        throw new Error('Não foi possível validar o destino de pagamento.');
      track('checkout_start', {
        page,
        plan_id: planId,
        billing_cycle: cycle,
      });
      window.location.assign(url.href);
    } catch (cause) {
      setNotice(
        cause instanceof Error
          ? cause.message
          : 'Não foi possível abrir o pagamento. Nada foi cobrado.',
      );
      setPending(false);
    }
  }
  return (
    <div className="checkout-grid">
      <section className="checkout-review">
        <p className="eyebrow">Resumo da proposta</p>
        <h2>{plan.name}</h2>
        <p>{plan.description}</p>
        <h3>Escopo de referência</h3>
        <ul>
          {plan.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
        <dl className="checkout-totals">
          <div>
            <dt>
              {cycle === 'anual'
                ? 'Assinatura anual, paga por ano'
                : 'Assinatura mensal'}
            </dt>
            <dd>
              {money(recurring)}
              {cycle === 'anual' ? '/ano' : '/mês'}
            </dd>
          </div>
          <div>
            <dt>Implantação, uma vez</dt>
            <dd>{money(plan.setupPrice)}</dd>
          </div>
          <div>
            <dt>
              {available
                ? 'Primeira cobrança prevista'
                : 'Investimento inicial de referência'}
            </dt>
            <dd>{money(totalFirstCharge)}</dd>
          </div>
        </dl>
        <p>
          {cycle === 'anual'
            ? 'O valor anual é cobrado de uma vez, com 8% de desconto sobre 12 mensalidades. A equivalência mensal não é parcelamento.'
            : 'Depois da primeira cobrança, renovações mensais no valor da assinatura, conforme as condições aprovadas.'}
        </p>
        <p>
          Domínio, mídia e licenças de terceiros são separados. Nenhuma receita
          ou quantidade de leads é garantida.
        </p>
        <Link href="/planos" className="text-link">
          Rever limites e comparar planos ↗
        </Link>
      </section>
      <section className="callout">
        <h2>
          {available
            ? 'Pagamento no ambiente do provedor.'
            : 'Primeiro, confirme o escopo com a equipe.'}
        </h2>
        <p>
          {available
            ? 'Dados de cartão serão informados apenas no checkout da Stripe. O site não recebe seu número de cartão.'
            : 'A contratação é feita por proposta. Confira os valores, converse sobre o escopo e receba as condições por escrito antes de aceitar. Nada será cobrado nesta página.'}
        </p>
        <ul>
          <li>
            Início e prazo da implantação dependem dos materiais e do contrato.
          </li>
          <li>
            Cancelamento, eventual fidelidade, exportação do site e destino dos
            dados precisam estar escritos na proposta.
          </li>
          <li>
            A conversa inicial é gratuita. O início do trabalho depende de
            proposta e aceite.
          </li>
        </ul>
        {available && (
          <>
            <label className="consent-check">
              <input
                type="checkbox"
                checked={terms}
                onChange={(event) => setTerms(event.target.checked)}
              />
              Li os <Link href="/termos">termos de contratação</Link> e a{' '}
              <Link href="/privacidade">política de privacidade</Link>,
              incluindo implantação, recorrência e condições de cancelamento da
              proposta aprovada.
            </label>
            <button
              className="button"
              type="button"
              disabled={!terms || pending}
              onClick={openCheckout}
            >
              {pending ? 'Abrindo o checkout…' : 'Ir ao pagamento seguro'}
            </button>
          </>
        )}
        <p role="status" className="field-error">
          {notice}
        </p>
        <div className="proposal-message">
          <h3>Mensagem que você poderá revisar</h3>
          <p>{whatsappMessage({ plan: planId, cycle })}</p>
        </div>
        <a
          className="button"
          href={
            '/go/whatsapp?' +
            new URLSearchParams({
              src: 'planos',
              page,
              plano: planId,
              ciclo: cycle,
            })
          }
        >
          Pedir proposta no WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <p className="form-note">
          Você revisa a mensagem no WhatsApp antes de enviar. Abrir a conversa
          não contrata nem ativa uma assinatura.
        </p>
        <Link href="/diagnostico" className="text-link">
          Prefiro explicar meu projeto em um formulário ↗
        </Link>
      </section>
    </div>
  );
}
