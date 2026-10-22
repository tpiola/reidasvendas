import { Link } from "react-router-dom";
import { HOME_FAQ } from "@/lib/commercial";
import { trackEvent } from "@/lib/analytics";
export function BusinessConcerns() {
  return (
    <section
      className="obs-section rdv-shell commercial-concerns"
      aria-labelledby="concerns-title"
    >
      <div className="obs-section-heading">
        <h2 id="concerns-title">
          O contato não deveria
          <br />
          <span>se perder pelo caminho.</span>
        </h2>
        <p>
          Antes de contratar mais ferramentas, vale olhar para os pontos que
          tornam a decisão do cliente mais difícil.
        </p>
      </div>
      <div className="commercial-concern-grid">
        {[
          [
            "Seu serviço fica claro?",
            "A pessoa precisa entender o que você resolve e onde atende, sem procurar essa resposta em vários links.",
          ],
          [
            "O pedido chega completo?",
            "Produto, serviço e região escolhidos ajudam o atendimento a começar com contexto.",
          ],
          [
            "O próximo passo está visível?",
            "No celular, contato e orçamento precisam estar fáceis de encontrar e de usar.",
          ],
        ].map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function DeliveryMethod() {
  return (
    <section
      className="obs-section rdv-shell commercial-method"
      aria-labelledby="method-title"
    >
      <div className="obs-section-heading">
        <h2 id="method-title">
          Um projeto organizado.
          <br />
          <span>Do escopo à entrega.</span>
        </h2>
        <p>Cada etapa reduz uma incerteza antes de avançar para a próxima.</p>
      </div>
      <ol>
        {[
          [
            "Entender",
            "Objetivo, público, serviço e prioridade. Implantação direta ou auditoria, conforme a necessidade.",
          ],
          [
            "Combinar",
            "Escopo, materiais, prazo e investimento por escrito. Texto e desenho passam por aprovação.",
          ],
          [
            "Construir e testar",
            "Site, navegação mobile, busca e contato conectados, com validação antes de publicar.",
          ],
          [
            "Entregar e acompanhar",
            "Acessos e orientação na entrega. Operação e otimização contínuas são opcionais.",
          ],
        ].map(([title, text], i) => (
          <li key={title}>
            <span aria-hidden="true">{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function CommercialFAQ() {
  return (
    <section
      className="obs-section rdv-shell commercial-faq"
      aria-labelledby="faq-title"
    >
      <div className="obs-section-heading">
        <h2 id="faq-title">
          Antes de começar,
          <br />
          <span>tire suas dúvidas.</span>
        </h2>
        <p>
          Preço, prazo e responsabilidades precisam estar claros antes de uma
          conversa comercial.
        </p>
      </div>
      <div>
        {HOME_FAQ.map((item, index) => (
          <details
            key={item.question}
            onToggle={(e) => {
              if (e.currentTarget.open)
                trackEvent("faq_expand", {
                  location: "home",
                  label: `question_${index + 1}`,
                });
            }}
          >
            <summary>
              {item.question}
              <span aria-hidden="true">+</span>
            </summary>
            <div role="region" aria-label={item.question}>
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
      <Link className="calm-link" to="/planos">
        Conferir escopos e condições →
      </Link>
    </section>
  );
}
