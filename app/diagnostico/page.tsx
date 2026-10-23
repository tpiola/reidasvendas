import { metadata as meta } from '@/lib/site';
import PageShell from '@/components/PageShell';
import DiagnosticForm from '@/components/DiagnosticForm';
export const metadata = meta(
  'Diagnóstico comercial em Franca',
  'Conte o cenário da sua empresa. Entenda o próximo passo para site, anúncios, conteúdo e atendimento.',
  '/diagnostico',
);
export default function Page() {
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
