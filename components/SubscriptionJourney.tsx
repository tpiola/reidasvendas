'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  subscriptionPlans,
  calculateAnnualPrice,
} from '@/data/subscription-plans';
import { money, type BillingCycle } from '@/lib/subscription-context';
import { track } from '@/lib/tracking';

export function SubscriptionIntake({
  planId,
  cycle,
}: {
  planId: string;
  cycle: BillingCycle;
}) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const plan = subscriptionPlans.find((item) => item.id === planId);
  if (!plan) return null;
  return (
    <form
      className="subscription-intake"
      ref={form}
      onSubmit={(event) => {
        event.preventDefault();
        const values = new FormData(event.currentTarget);
        const segment = String(values.get('segment') || '');
        const presence = String(values.get('presence') || '');
        const priority = String(values.get('priority') || '');
        if (!segment || !presence || !priority) {
          setError('Responda às três perguntas para revisar o plano.');
          return;
        }
        setPending(true);
        // Non-sensitive answers for the requested journey only. They are never analytics dimensions.
        try {
          sessionStorage.setItem(
            'rdv-subscription-intake',
            JSON.stringify({
              planId,
              cycle,
              segment,
              presence,
              priority,
              expires: Date.now() + 30 * 60_000,
            }),
          );
        } catch {
          /* The journey works with storage disabled. */
        }
        track('click_cta_diagnostico', {
          page: '/diagnostico',
          plan_id: planId,
          billing_cycle: cycle,
        });
        router.push(
          '/checkout?' + new URLSearchParams({ plano: planId, ciclo: cycle }),
        );
      }}
    >
      <p className="eyebrow">
        Plano {plan.name} · {cycle === 'anual' ? 'ciclo anual' : 'ciclo mensal'}
      </p>
      <h2>Três perguntas para orientar a implantação.</h2>
      <p>
        Sem telefone, cartão ou cadastro nesta etapa. Você revisa valores e
        condições antes de qualquer pagamento.
      </p>
      <div className="form-field">
        <label htmlFor="subscription-segment">
          Qual é a atividade do negócio?
        </label>
        <select
          id="subscription-segment"
          name="segment"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Selecione sua atividade
          </option>
          <option value="comercio">Loja ou comércio</option>
          <option value="servicos">Prestação de serviços</option>
          <option value="saude">Clínica ou saúde</option>
          <option value="industria">Indústria ou B2B</option>
          <option value="outro">Outro negócio</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="subscription-presence">
          Como está sua presença hoje?
        </label>
        <select
          id="subscription-presence"
          name="presence"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Selecione o cenário
          </option>
          <option value="sem-site">Ainda não tenho site</option>
          <option value="site-existente">
            Tenho um site que precisa de revisão
          </option>
          <option value="redes">Uso apenas redes sociais e WhatsApp</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="subscription-priority">
          O que precisa funcionar primeiro?
        </label>
        <select
          id="subscription-priority"
          name="priority"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Selecione a prioridade
          </option>
          <option value="presenca">
            Explicar meu negócio e ser encontrado
          </option>
          <option value="contato">Gerar e organizar contatos</option>
          <option value="continuidade">
            Manter e melhorar o que já existe
          </option>
        </select>
      </div>
      <p className="field-error" role="status">
        {error}
      </p>
      <button className="button" disabled={pending} type="submit">
        {pending ? 'Abrindo a revisão…' : 'Revisar plano e condições'}{' '}
        <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">
        As respostas ficam neste navegador por até 30 minutos. Não são enviadas
        ao CRM nesta etapa.{' '}
        <Link href="/privacidade">Saiba sobre seus dados.</Link>
      </p>
    </form>
  );
}

export function SubscriptionCheckout({
  planId,
  cycle,
  available,
}: {
  planId: string;
  cycle: BillingCycle;
  available: boolean;
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
        page: '/checkout',
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
        <p className="eyebrow">Revisão da assinatura</p>
        <h2>{plan.name}</h2>
        <p>{plan.description}</p>
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
            <dt>Primeira cobrança prevista</dt>
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
            : 'A contratação online ainda não está liberada. Os valores são uma proposta de oferta: confirme implantação, escopo, prazo, renovação e cancelamento antes de contratar. Nada será cobrado nesta página.'}
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
            Pagamento confirmado pelo provedor e aceite contratual antecedem o
            onboarding.
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
        <a
          className="button"
          href={
            '/go/whatsapp?' +
            new URLSearchParams({
              src: 'planos',
              page: '/checkout',
              plano: planId,
              ciclo: cycle,
            })
          }
        >
          Validar plano no WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <p className="form-note">
          Abrir o WhatsApp não assina um serviço. A contratação depende de
          proposta e aceite.
        </p>
      </section>
    </div>
  );
}
