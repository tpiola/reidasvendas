import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { diagnosticUrl, trackEvent } from '@/lib/analytics';
import type { Faq } from '@/lib/growth';
import '@/pages/GrowthEngine.css';

type HeroProps = {
  label: string;
  title: string;
  description: string;
  solution?: string;
  secondary?: { label: string; to: string };
};

export function GrowthHero({ label, title, description, solution, secondary }: HeroProps) {
  return (
    <section className="ge-hero">
      <div className="ge-shell ge-hero-grid">
        <div className="ge-hero-copy">
          <p className="ge-eyebrow">{label}</p>
          <h1>{title}</h1>
          <p className="ge-lead">{description}</p>
          <div className="ge-actions">
            <Link
              className="ge-button"
              to={diagnosticUrl(solution, 'growth-hero')}
              onClick={() => trackEvent('hero_cta', { service: solution, destination: 'diagnostico' })}
            >
              Abrir diagnóstico <ArrowRight size={17} aria-hidden="true" />
            </Link>
            {secondary ? <Link className="ge-link" to={secondary.to}>{secondary.label} <span aria-hidden="true">↗</span></Link> : null}
          </div>
        </div>
        <aside className="ge-signal" aria-label="Princípios de execução">
          <span className="ge-signal-label">RDV · ORDEM DE TRABALHO</span>
          <strong>Diagnóstico antes do escopo.</strong>
          <ul>
            <li><Check size={15} aria-hidden="true" /> Origem e intenção identificadas</li>
            <li><Check size={15} aria-hidden="true" /> Um corte priorizado</li>
            <li><Check size={15} aria-hidden="true" /> Continuidade atribuída</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

export function GrowthSectionTitle({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <header className="ge-section-heading">
      <p className="ge-eyebrow">{label}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}

export function GrowthFaq({ questions }: { questions: Faq[] }) {
  if (!questions.length) return null;

  return (
    <section className="ge-section ge-section-muted">
      <div className="ge-shell ge-faq-layout">
        <GrowthSectionTitle label="Perguntas relevantes" title="Critérios antes da decisão." />
        <div className="ge-faq">
          {questions.map((item) => (
            <details key={item.question}>
              <summary>{item.question} <ChevronDown size={18} aria-hidden="true" /></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GrowthClosing({ solution, title = 'Registre o ponto de perda antes de falar sobre escopo.' }: { solution?: string; title?: string }) {
  return (
    <section className="ge-closing">
      <div className="ge-shell">
        <p className="ge-eyebrow">Próximo movimento</p>
        <h2>{title}</h2>
        <p>Informe o contexto, a necessidade e a faixa de investimento. O WhatsApp é aberto somente depois do diagnóstico.</p>
        <Link
          className="ge-button"
          to={diagnosticUrl(solution, 'growth-closing')}
          onClick={() => trackEvent('hero_cta', { service: solution, destination: 'diagnostico', position: 'closing' })}
        >
          Abrir diagnóstico <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <small>Origem registrada · Contexto preservado · Próximo passo explícito</small>
      </div>
    </section>
  );
}
