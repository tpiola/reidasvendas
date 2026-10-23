'use client';
import { useState } from 'react';
import { track } from '@/lib/tracking';
const questions = [
  {
    label:
      'Sua empresa tem um próximo passo claro depois do anúncio ou da busca?',
    yes: 'Sim, o caminho está claro',
    no: 'Ainda não',
  },
  {
    label: 'Todo contato tem um responsável e uma data de retorno?',
    yes: 'Sim, está registrado',
    no: 'Depende da memória',
  },
  {
    label: 'Você sabe quais canais geram conversas que viram venda?',
    yes: 'Sim, acompanhamos',
    no: 'Ainda não medimos',
  },
];
export function MaturityQuiz() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [started, setStarted] = useState(false);
  const completed = Object.keys(answers).length === questions.length;
  const score = Object.values(answers).filter(Boolean).length;
  const recommendation =
    score < 2
      ? 'Comece organizando o caminho entre descoberta, contato e acompanhamento.'
      : 'Sua base parece organizada. A próxima conversa pode focar em medição e melhoria.';
  const update = (index: number, value: boolean) => {
    if (!started) {
      setStarted(true);
      track('quiz_start');
    }
    const next = { ...answers, [index]: value };
    setAnswers(next);
    if (!completed && Object.keys(next).length === 3)
      track('quiz_complete', {
        score: Object.values(next).filter(Boolean).length,
      });
  };
  return (
    <div className="maturity-quiz">
      <div className="quiz-questions">
        {questions.map((question, index) => (
          <fieldset key={question.label}>
            <legend>{question.label}</legend>
            <div>
              <button
                type="button"
                className={answers[index] === true ? 'is-selected' : ''}
                aria-pressed={answers[index] === true}
                onClick={() => update(index, true)}
              >
                {question.yes}
              </button>
              <button
                type="button"
                className={answers[index] === false ? 'is-selected' : ''}
                aria-pressed={answers[index] === false}
                onClick={() => update(index, false)}
              >
                {question.no}
              </button>
            </div>
          </fieldset>
        ))}
      </div>
      <div className="quiz-result" aria-live="polite">
        {completed ? (
          <>
            <span className="quiz-result-label">Sua leitura inicial</span>
            <h3>{score}/3 fundamentos presentes</h3>
            <p>{recommendation}</p>
            <p className="fine-print">
              Autoavaliação, sem diagnóstico profissional ou garantia de
              desempenho.
            </p>
            <a className="button" href={`/go/whatsapp?src=quiz&score=${score}`}>
              Conversar sobre meu cenário ↗
            </a>
          </>
        ) : (
          <>
            <span className="quiz-result-label">
              Três perguntas. Sem cadastro.
            </span>
            <h3>Antes de investir mais, enxergue a base.</h3>
            <p>
              Responda ao lado para receber uma orientação inicial. Seus dados
              de contato não são necessários.
            </p>
            <span className="quiz-count">
              {Object.keys(answers).length} de 3 respostas
            </span>
          </>
        )}
      </div>
    </div>
  );
}
