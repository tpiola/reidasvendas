import { Link } from "react-router-dom";
import { BRAND } from "@/lib/brand";

export default function Obrigado() {
  return (
    <main id="main-content" className="rdv-shell obs-quick-page">
      <p className="obs-label">Próximo passo</p>
      <h1>Vamos confirmar o seu projeto.</h1>
      <p>
        Se você preparou uma mensagem pelo site, confirme o envio no WhatsApp. A
        abertura desta página não confirma pagamento nem recebimento de uma
        solicitação.
      </p>
      <ol className="space-y-6 my-10">
        <li>
          <h2 className="text-xl">1. Contexto e escopo</h2>
          <p>
            Conversamos sobre o que seu negócio precisa e registramos o que será
            entregue.
          </p>
        </li>
        <li>
          <h2 className="text-xl">2. Proposta por escrito</h2>
          <p>
            Preço, condições, prazo e responsabilidades são apresentados antes
            da contratação.
          </p>
        </li>
        <li>
          <h2 className="text-xl">3. Aprovação e execução</h2>
          <p>
            O trabalho começa conforme as condições e a data combinadas na
            proposta.
          </p>
        </li>
      </ol>
      <p>
        Garantia de 30 dias. As condições aplicáveis constam na proposta e nos
        termos.
      </p>
      <div className="flex flex-wrap gap-4 mt-8">
        <a
          className="obs-cta"
          href={BRAND.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          Conversar no WhatsApp ↗
        </a>
        <Link className="obs-text-link" to="/planos">
          Conferir escopos e preços →
        </Link>
      </div>
    </main>
  );
}
