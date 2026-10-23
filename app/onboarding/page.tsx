/* eslint-disable @next/next/no-html-link-for-pages -- WhatsApp route handlers require full navigation and a fresh event ID, without prefetch. */
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Preparação da implantação',
  'Checklist de materiais e acessos para começar após confirmação de contrato e pagamento.',
  '/onboarding',
  true,
);
export default function OnboardingPage() {
  return (
    <PageShell
      title="Uma boa implantação começa com material certo."
      description="Este é o checklist de preparação. Abrir esta página não confirma assinatura, pagamento nem prazo de início. A equipe valida o contrato e a confirmação do provedor antes de começar."
      path="/onboarding"
    >
      <div className="split-content">
        <div className="prose">
          <h2>O que organizar</h2>
          <ol className="onboarding-checklist">
            <li>
              <strong>Responsável pelo projeto.</strong>Defina quem aprova
              conteúdo e reúne as informações do negócio.
            </li>
            <li>
              <strong>Oferta e região atendida.</strong>Liste serviços, dúvidas
              de clientes, condições verdadeiras e canais de atendimento.
            </li>
            <li>
              <strong>Marca e fotos reais.</strong>Separe logo vetorial, imagens
              autorizadas e identidade visual. Nada de depoimentos sem
              autorização.
            </li>
            <li>
              <strong>Domínio e ferramentas.</strong>Envie convites de acesso
              com permissão adequada. Não envie senha, token ou cartão pelo
              WhatsApp ou formulário.
            </li>
            <li>
              <strong>Critérios e cronograma.</strong>Aprove escopo, limites,
              prazo após os materiais, revisão e data da primeira conferência.
            </li>
            <li>
              <strong>Continuidade.</strong>Combine responsável por leads,
              rotina mensal, relatório e revisão trimestral.
            </li>
          </ol>
        </div>
        <aside className="callout">
          <h2>Seu projeto já foi confirmado?</h2>
          <p>
            Peça o canal seguro de materiais e o cronograma ao responsável.
            Documentos e acessos ficam no ambiente contratado, não em uma pasta
            pública deste site.
          </p>
          <a
            className="button"
            href="/go/whatsapp?src=onboarding&page=/onboarding"
          >
            Alinhar a implantação ↗
          </a>
          <Link className="text-link" href="/area-do-cliente">
            Atendimento a clientes ↗
          </Link>
        </aside>
      </div>
    </PageShell>
  );
}
