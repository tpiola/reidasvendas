import Link from 'next/link';
import BillingSelector from './BillingSelector';
import {
  subscriptionPlans,
  annualDiscount,
  calculateAnnualPrice,
  subscriptionOfferStatus,
  sharedSubscriptionFeatures,
} from '@/data/subscription-plans';

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export default function Pricing({
  comparison = false,
  compact = false,
}: {
  comparison?: boolean;
  compact?: boolean;
}) {
  const group = comparison ? 'pricing-detailed' : 'pricing-overview';
  const proposal = subscriptionOfferStatus === 'proposal';

  return (
    <div
      className={`subscription-pricing${compact ? ' pricing-compact' : ''}`}
      data-pricing-view="true"
      data-billing-cycle="mensal"
    >
      <div className="pricing-toolbar">
        <BillingSelector
          annualDiscountPercent={Math.round(annualDiscount * 100)}
        />
        <p>
          <span data-cycle="mensal">
            Implantação única + acompanhamento mensal, conforme o escopo.
          </span>
          <span data-cycle="anual">
            Pagamento único por ano para a recorrência. Implantação cobrada à
            parte.
          </span>
        </p>
      </div>

      {proposal && (
        <p className="pricing-proposal-note">
          <strong>Oferta em validação.</strong>{' '}
          {compact
            ? 'Solicite uma proposta. Nenhuma assinatura ou cobrança é ativada.'
            : 'Os valores abaixo são uma proposta de planos. A escolha solicita uma conversa; não ativa assinatura nem cobrança.'}
        </p>
      )}

      {compact ? (
        <p className="pricing-common-summary">
          Todos incluem site responsivo, WhatsApp e manutenção técnica.
        </p>
      ) : (
        <div className="pricing-shared">
          <h3>Em todos os planos</h3>
          <ul>
            {sharedSubscriptionFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="pricing-grid">
        {subscriptionPlans.map((plan) => {
          const annual = calculateAnnualPrice(plan.monthlyPrice);
          return (
            <article
              className={`pricing-card${plan.recommended ? ' pricing-card-recommended' : ''}`}
              key={plan.id}
              data-plan-id={plan.id}
              aria-labelledby={`${group}-${plan.id}`}
            >
              {!compact && (
                <div className="pricing-card-top">
                  <p>
                    {plan.recommended
                      ? 'Para conectar presença e acompanhamento'
                      : plan.id === 'essencial'
                        ? 'Para organizar sua base'
                        : 'Para uma operação mais conectada'}
                  </p>
                  <span aria-hidden="true">{plan.recommended ? '↗' : '—'}</span>
                </div>
              )}
              <h3 id={`${group}-${plan.id}`}>{plan.name}</h3>
              <p className="pricing-description">{plan.description}</p>
              <div className="pricing-amount">
                <strong>
                  <span data-cycle="mensal">
                    {money.format(plan.monthlyPrice)}
                  </span>
                  <span data-cycle="anual">
                    {money.format(annual.effectiveMonthlyPrice)}
                  </span>
                </strong>
                <span>
                  <span data-cycle="mensal">/mês</span>
                  <span data-cycle="anual">/mês equivalente</span>
                </span>
              </div>
              <p className="pricing-payment">
                <span data-cycle="mensal">
                  Recorrência mensal. Condições de contratação na proposta.
                </span>
                <span data-cycle="anual">
                  {money.format(annual.annualTotal)} pela recorrência, pagos uma
                  vez por ano. O valor mensal é equivalência, não parcela.
                </span>
              </p>
              <div className="pricing-setup">
                <span>Implantação única</span>
                <strong>{money.format(plan.setupPrice)}</strong>
              </div>
              <p className="pricing-year">
                Primeiro ano:{' '}
                <strong>
                  <span data-cycle="mensal">
                    {money.format(plan.setupPrice + plan.monthlyPrice * 12)}
                  </span>
                  <span data-cycle="anual">
                    {money.format(plan.setupPrice + annual.annualTotal)}
                  </span>
                </strong>
                <span>
                  {compact
                    ? 'Implantação + recorrência. Extras à parte.'
                    : 'Implantação + 12 meses de recorrência. Serviços extras não incluídos.'}
                </span>
              </p>
              {(['mensal', 'anual'] as const).map((cycle) => (
                <Link
                  key={cycle}
                  className="button pricing-select"
                  href={`/diagnostico?plano=${plan.id}&ciclo=${cycle}`}
                  data-cycle={cycle}
                  data-event="plan_select"
                  data-plan-id={plan.id}
                  data-billing-cycle={cycle}
                >
                  Pedir proposta do {plan.name}{' '}
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
              {compact ? (
                <ul className="pricing-features pricing-essentials">
                  <li>Até {plan.pageLimit} páginas</li>
                  <li>
                    {plan.articlesPerMonth === 0
                      ? 'Sem artigo mensal'
                      : `${plan.articlesPerMonth} ${plan.articlesPerMonth === 1 ? 'artigo' : 'artigos'}/mês`}
                  </li>
                  <li>
                    {plan.adjustmentsPerMonth} ajustes/mês, de até{' '}
                    {plan.adjustmentUnitMinutes} min cada
                  </li>
                </ul>
              ) : (
                <>
                  <h4>O que diferencia este plano</h4>
                  <ul className="pricing-features">
                    {plan.features
                      .filter(
                        (feature) =>
                          !sharedSubscriptionFeatures.includes(feature),
                      )
                      .map((feature) => (
                        <li key={feature}>
                          <span aria-hidden="true">✓</span>
                          {feature}
                        </li>
                      ))}
                  </ul>
                  <details className="pricing-limits">
                    <summary>
                      Limites e condições <span aria-hidden="true">+</span>
                    </summary>
                    <p>
                      Ajuste é uma alteração pequena em texto, imagem ou
                      configuração existente, dentro de até 20 minutos por
                      unidade. Novas páginas e funcionalidades exigem avaliação
                      de escopo.
                    </p>
                    <ul>
                      {plan.limits.map((limit) => (
                        <li key={limit}>{limit}</li>
                      ))}
                    </ul>
                  </details>
                </>
              )}
            </article>
          );
        })}
      </div>
      <p className="pricing-bottom-note">
        Domínio, verba de anúncios, licenças e serviços de terceiros só entram
        quando previstos na proposta. O plano não promete quantidade de leads,
        vendas ou posição no Google.
      </p>
      {comparison && (
        <div className="plan-comparison-section">
          <h2>Compare o compromisso completo.</h2>
          <p>
            Mensalidade e implantação são itens separados. Compare também a
            rotina e os limites de cada escopo.
          </p>
          <div
            className="plan-comparison-scroll"
            tabIndex={0}
            role="region"
            aria-label="Tabela comparativa dos planos; role horizontalmente em telas menores"
          >
            <table className="plan-comparison">
              <caption>
                Comparativo dos planos no ciclo{' '}
                <span data-cycle="mensal">mensal</span>
                <span data-cycle="anual">anual</span>
              </caption>
              <thead>
                <tr>
                  <th scope="col">Composição</th>
                  {subscriptionPlans.map((plan) => (
                    <th key={plan.id} scope="col">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Recorrência</th>
                  {subscriptionPlans.map((plan) => (
                    <td key={plan.id}>
                      <span data-cycle="mensal">
                        {money.format(plan.monthlyPrice)}/mês
                      </span>
                      <span data-cycle="anual">
                        {money.format(
                          calculateAnnualPrice(plan.monthlyPrice).annualTotal,
                        )}
                        /ano
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Implantação única</th>
                  {subscriptionPlans.map((plan) => (
                    <td key={plan.id}>{money.format(plan.setupPrice)}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Total no primeiro ano</th>
                  {subscriptionPlans.map((plan) => (
                    <td key={plan.id}>
                      <span data-cycle="mensal">
                        {money.format(plan.setupPrice + plan.monthlyPrice * 12)}
                      </span>
                      <span data-cycle="anual">
                        {money.format(
                          plan.setupPrice +
                            calculateAnnualPrice(plan.monthlyPrice).annualTotal,
                        )}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Entregas e acompanhamento</th>
                  {subscriptionPlans.map((plan) => (
                    <td key={plan.id}>
                      <ul>
                        {plan.features
                          .filter(
                            (feature) =>
                              !sharedSubscriptionFeatures.includes(feature),
                          )
                          .map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Limites do escopo</th>
                  {subscriptionPlans.map((plan) => (
                    <td key={plan.id}>
                      <ul>
                        {plan.limits.map((limit) => (
                          <li key={limit}>{limit}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Próximo passo</th>
                  {subscriptionPlans.map((plan) => (
                    <td key={plan.id}>
                      {(['mensal', 'anual'] as const).map((cycle) => (
                        <Link
                          key={cycle}
                          href={`/diagnostico?plano=${plan.id}&ciclo=${cycle}`}
                          data-cycle={cycle}
                          data-event="plan_select"
                          data-plan-id={plan.id}
                          data-billing-cycle={cycle}
                        >
                          Conversar sobre {plan.name} ↗
                        </Link>
                      ))}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
