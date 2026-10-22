import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { readBrief, clearBrief } from "@/lib/brief";
import { BRAND } from "@/lib/brand";
import { trackEvent } from "@/lib/analytics";
const QUESTIONS = [
  {
    title: "Qual é o seu negócio?",
    options: [
      "Clínica ou consultório",
      "Advocacia",
      "Imobiliária",
      "Loja ou restaurante",
      "Serviços locais",
      "Outra empresa",
    ],
  },
  {
    title: "O que você precisa resolver?",
    options: [
      "Criar meu site",
      "Organizar catálogo e pedidos",
      "Receber mais contatos",
      "Melhorar tráfego e conversão",
    ],
  },
  {
    title: "Quando quer começar?",
    options: ["Agora", "Nos próximos 30 dias", "Estou comparando opções"],
  },
];
export function MicroQuiz({
  context = "Projeto",
  offer = "",
}: {
  context?: string;
  offer?: string;
}) {
  const [answers, setAnswers] = useState<string[]>([]);
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    setInteractive(true);
  }, []);
  const location = useLocation();
  const question = QUESTIONS[answers.length];
  const state = location.state as { objective?: string } | null;
  const objective =
    state?.objective?.slice(0, 600) ||
    readBrief() ||
    new URLSearchParams(location.search).get("objetivo")?.slice(0, 600);
  const message = `Olá! Quero conversar sobre ${context}.\n${offer ? `Oferta: ${offer}\n` : ""}${objective ? `Objetivo: ${objective}\n` : ""}${answers.map((a, i) => `${QUESTIONS[i].title} ${a}`).join("\n")}\nOrigem: https://reidasvendas.com.br${location.pathname}${location.search}`;
  return (
    <section className="obs-quiz" aria-label="Qualificação rápida">
      <p className="obs-label">
        Seu próximo passo · {Math.min(answers.length + 1, 3)} de 3
      </p>
      <div className="obs-progress" aria-hidden="true">
        {QUESTIONS.map((q, i) => (
          <span key={q.title} className={i <= answers.length ? "active" : ""} />
        ))}
      </div>
      <div className="obs-quiz-body" aria-live="polite">
        {question ? (
          <>
            <h2>{question.title}</h2>
            <div className="obs-choices">
              {question.options.map((a) => (
                <button
                  disabled={!interactive}
                  type="button"
                  key={a}
                  onClick={() => {
                    setAnswers([...answers, a]);
                    trackEvent("quiz_step", {
                      step: answers.length + 1,
                      context,
                    });
                  }}
                >
                  {a}
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2>Seu contexto está pronto.</h2>
            <p>
              Confira as escolhas e abra a conversa. A mensagem só será enviada
              quando você confirmar no WhatsApp.
            </p>
            <ul>
              {answers.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <a
              className="obs-cta"
              href={`https://wa.me/${BRAND.phone}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("whatsapp_click", {
                  position: "micro-quiz",
                  context,
                });
                clearBrief();
              }}
            >
              Continuar no WhatsApp ↗
            </a>
          </>
        )}
      </div>
      {answers.length > 0 && (
        <button
          disabled={!interactive}
          className="obs-back"
          type="button"
          onClick={() => setAnswers(answers.slice(0, -1))}
        >
          ← Voltar
        </button>
      )}
      <small>
        Sem cadastro. As escolhas ficam nesta página até você abrir o WhatsApp.{" "}
        <a href="/politica">Privacidade</a>.
      </small>
    </section>
  );
}
