/* eslint-disable @next/next/no-html-link-for-pages -- WhatsApp route handlers require full navigation and a fresh event ID, without prefetch. */
import { metadata as meta } from '@/lib/site';
import PageShell from '@/components/PageShell';
import DiagnosticForm from '@/components/DiagnosticForm';
import { SubscriptionIntake } from '@/components/SubscriptionJourney';
import { selectedSubscription } from '@/lib/subscription-context';
export const metadata = meta(
  'Diagnóstico comercial em Franca',
  'Conte o cenário da sua empresa. Entenda o próximo passo para site, anúncios, conteúdo e atendimento.',
  '/diagnostico',
);
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const { plan, cycle } = selectedSubscription(query.plano, query.ciclo);
  if (plan)
    return (
      <PageShell
        title="Seu plano precisa caber na sua operação."
        description={`Você escolheu o ${plan.name}. Confira se este é o ponto de partida adequado antes de revisar a proposta de assinatura.`}
        path="/diagnostico"
      >
        <div className="split-content">
          <SubscriptionIntake planId={plan.id} cycle={cycle} />
          <aside className="callout">
            <h2>O que acontece depois?</h2>
            <ol>
              <li>Revisão de implantação, recorrência e condições.</li>
              <li>Confirmação de escopo e contratação.</li>
              <li>Pagamento no provedor, quando habilitado.</li>
              <li>Onboarding com materiais e responsabilidades.</li>
            </ol>
            <p>
              A conversa inicial é gratuita. Diagnóstico profissional
              aprofundado é outro serviço, contratado à parte. Nenhuma auditoria
              paga é iniciada por responder às perguntas.
            </p>
            <a
              className="text-link"
              href={
                '/go/whatsapp?' +
                new URLSearchParams({
                  src: 'diagnostico',
                  page: '/diagnostico',
                  plano: plan.id,
                  ciclo: cycle,
                })
              }
            >
              Prefiro avaliar com a equipe ↗
            </a>
          </aside>
        </div>
      </PageShell>
    );
  return (
    <PageShell
      title="Onde sua venda perde força?"
      description="Comece pelo que sua empresa precisa resolver. A conversa inicial define o caminho; uma auditoria profissional só começa após proposta aprovada."
      path="/diagnostico"
    >
      <div className="split-content">
        <div>
          <h2>Uma conversa com contexto.</h2>
          <p>
            Você pode falar direto no WhatsApp ou preparar um resumo ao lado.
            Vamos entender seu serviço, sua região e o que já está em operação.
          </p>
          <ul>
            <li>
              Site, anúncio, conteúdo ou processo: cada problema pede uma
              prioridade.
            </li>
            <li>
              Verba de mídia, ferramentas e escopo ficam explícitos na proposta.
            </li>
            <li>
              Nenhum acesso ou senha precisa ser enviado neste formulário.
            </li>
          </ul>
          <a
            className="text-link"
            href="/go/whatsapp?src=diagnostico&page=/diagnostico"
          >
            Prefiro falar no WhatsApp ↗
          </a>
        </div>
        <DiagnosticForm
          crmEnabled={
            !!(
              process.env.CRM_API_URL &&
              process.env.CRM_API_KEY &&
              process.env.UPSTASH_REDIS_REST_URL &&
              process.env.UPSTASH_REDIS_REST_TOKEN &&
              process.env.RATE_LIMIT_SALT
            )
          }
        />
      </div>
    </PageShell>
  );
}
