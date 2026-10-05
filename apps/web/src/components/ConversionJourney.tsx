import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChartNoAxesCombined,
  Globe2,
  MessageCircle,
  Pause,
  Play,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import "./ConversionJourney.css";

const STEPS = [
  {
    name: "Atrair",
    icon: Search,
    title: "Apareça quando existe intenção.",
    description:
      "Busca, mapas e campanhas direcionados à necessidade de quem procura.",
    signal: "Origem identificada",
    detail: "O canal certo para cada oferta.",
    channels: ["Google", "Maps", "Campanhas"],
  },
  {
    name: "Convencer",
    icon: Globe2,
    title: "Dê motivos para escolher você.",
    description:
      "Uma página rápida, com oferta clara, provas reais e um próximo passo evidente.",
    signal: "Oferta compreendida",
    detail: "Menos dúvida. Mais clareza para decidir.",
    channels: ["Oferta", "Provas reais", "Próximo passo"],
  },
  {
    name: "Conectar",
    icon: MessageCircle,
    title: "Transforme interesse em conversa.",
    description:
      "Automações no WhatsApp para responder o primeiro contato, organizar pedidos e encaminhar a conversa para sua equipe.",
    signal: "Contato com contexto",
    detail: "Menos espera. Mais contexto para atender e vender.",
    channels: ["WhatsApp", "Automação", "Sua equipe"],
  },
  {
    name: "Evoluir",
    icon: ChartNoAxesCombined,
    title: "Saiba onde agir depois.",
    description:
      "Acompanhe a origem dos contatos e os pontos de abandono para priorizar os próximos ajustes.",
    signal: "Jornada acompanhada",
    detail: "Decisões orientadas pelo que foi medido.",
    channels: ["Origem", "Contatos", "Ajustes"],
  },
] as const;

export default function ConversionJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const playing = inView && pageVisible && !paused && !reducedMotion;
  const step = STEPS[active];
  const Icon = step.icon;

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % STEPS.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <section
      ref={sectionRef}
      className="rdv-distribution rdv-journey"
      aria-labelledby="distribution-title"
      data-playing={playing}
    >
      <div className="rdv-shell rdv-journey__layout">
        <div className="rdv-journey__copy">
          <p className="rdv-kicker">Da primeira busca ao próximo cliente</p>
          <h2 id="distribution-title">
            Ser encontrado é o começo.
            <br />
            <span>Ser escolhido é o que importa.</span>
          </h2>
          <p className="rdv-journey__lede">
            Sites profissionais, soluções digitais e automações no WhatsApp
            conectados para apresentar seu negócio, agilizar o atendimento e
            reduzir as oportunidades perdidas por falta de resposta.
          </p>
          <ul className="rdv-journey__principles">
            <li>
              <Check aria-hidden="true" /> Oferta clara em cada ponto de contato
            </li>
            <li>
              <Check aria-hidden="true" /> Atendimento rápido no WhatsApp, com
              apoio da automação
            </li>
            <li>
              <Check aria-hidden="true" /> Medição para orientar a próxima
              melhoria
            </li>
          </ul>
          <Link
            className="rdv-primary-action rdv-journey__cta"
            to="/solucoes/distribuicao-multicanal"
            onClick={() =>
              trackEvent("solution_open", {
                solution: "distribuicao-multicanal",
                position: "home-distribution",
              })
            }
          >
            Conectar minha operação <ArrowRight aria-hidden="true" />
          </Link>
          <p className="rdv-journey__assurance">
            <ShieldCheck aria-hidden="true" /> Estratégia, execução e
            acompanhamento.
          </p>
        </div>

        <div className="rdv-journey__console">
          <div className="rdv-journey__console-head">
            <div>
              <span className="rdv-journey__monogram" aria-hidden="true">
                RV
              </span>
              <span>
                O caminho da decisão<small>Explore cada etapa</small>
              </span>
            </div>
            {!reducedMotion ? (
              <button
                className="rdv-journey__pause"
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={
                  paused
                    ? "Retomar animação da jornada"
                    : "Pausar animação da jornada"
                }
              >
                {paused ? (
                  <Play aria-hidden="true" />
                ) : (
                  <Pause aria-hidden="true" />
                )}
              </button>
            ) : null}
          </div>

          <ol
            className="rdv-journey__steps"
            aria-label="Etapas da jornada comercial"
          >
            {STEPS.map((item, index) => {
              const StepIcon = item.icon;
              return (
                <li
                  key={item.name}
                  data-active={index === active}
                  data-complete={index < active}
                >
                  <button
                    type="button"
                    aria-pressed={index === active}
                    aria-controls="journey-detail"
                    onClick={() => {
                      setActive(index);
                      setPaused(true);
                    }}
                  >
                    <span className="rdv-journey__node">
                      <StepIcon aria-hidden="true" />
                    </span>
                    <span className="rdv-journey__step-name">
                      <small>0{index + 1}</small>
                      {item.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div
            id="journey-detail"
            className="rdv-journey__detail"
            aria-live={playing ? "off" : "polite"}
            aria-atomic="true"
          >
            <motion.div
              key={active}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="rdv-journey__detail-top">
                <span>0{active + 1} / 04</span>
                <span>{step.name}</span>
              </div>
              <div className="rdv-journey__visual" aria-hidden="true">
                <div className="rdv-journey__channels">
                  {step.channels.map((channel) => (
                    <span key={channel}>{channel}</span>
                  ))}
                </div>
                <div className="rdv-journey__conduit">
                  <i />
                </div>
                <div className="rdv-journey__business">
                  <Icon />
                  <span>
                    Seu negócio<small>{step.signal}</small>
                  </span>
                  <Check />
                </div>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="rdv-journey__outcome">
                <Check aria-hidden="true" />
                {step.detail}
              </div>
            </motion.div>
          </div>
          <div className="rdv-journey__footer">
            <span>Presença → confiança → oportunidade</span>
            <span>Demonstração do método</span>
          </div>
        </div>
      </div>
    </section>
  );
}
