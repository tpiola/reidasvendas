import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Contato Rei das Vendas — Franca/SP',
  'Fale no WhatsApp (16) 99233-3344 sobre site, tráfego, social media ou operação comercial. Atendimento a Franca, região e Brasil.',
  '/contato',
);
export default function Page() {
  return (
    <PageShell
      title="Vamos começar pelo seu desafio."
      description="Diga o que sua empresa vende, onde atende e o que precisa melhorar. Isso dá contexto para a primeira conversa."
      path="/contato"
    >
      <div className="split-content">
        <div>
          <h2>WhatsApp comercial</h2>
          <p className="contact-number">
            <a href="tel:+5516992333344">(16) 99233-3344</a>
          </p>
          <a
            className="button button-primary"
            href="/go/whatsapp?src=contato&page=/contato"
          >
            Falar com especialista no WhatsApp
          </a>
          <p>
            Franca/SP · atendimento a empresas da região e projetos remotos.
          </p>
          <p>
            Combine disponibilidade e prazo de resposta na conversa. Atendimento
            não é apresentado como 24 horas.
          </p>
        </div>
        <aside className="callout">
          <h2>Prefere organizar o pedido?</h2>
          <p>
            Preencha nome, empresa e principal desafio para preparar a próxima
            etapa.
          </p>
          <Link className="text-link" href="/diagnostico">
            Receber orientação sobre o próximo passo ↗
          </Link>
        </aside>
      </div>
    </PageShell>
  );
}
