import { ArrowDown, ArrowUpRight, Instagram, Linkedin } from "lucide-react";
import { useState, type FormEvent } from "react";
import { rememberBrief } from "@/lib/brief";
import { Link, useNavigate } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { BRAND } from "@/lib/brand";

/** A short brief starts the existing qualification flow, including without JS. */
export function CalmHero() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const objective = (
      event.currentTarget.querySelector("textarea") as HTMLTextAreaElement
    ).value
      .trim()
      .slice(0, 600);
    if (objective.length < 10) {
      setError(true);
      return;
    }
    rememberBrief(objective);
    navigate("/diagnostico?modo=implantacao&origem=hero", {
      state: { objective },
    });
  };
  return (
    <section className="calm-hero rdv-shell" aria-labelledby="home-title">
      <div className="calm-hero-mark">
        <BrandMark />
      </div>
      <p className="calm-location">
        Feito em Franca. Para o próximo passo do seu negócio.
      </p>
      <h1 id="home-title">Da visita ao contato. Com um caminho claro.</h1>
      <p className="calm-hero-lede">
        Sites, catálogos e atendimento para negócios de Franca e região.
        <br className="calm-desktop-break" /> Oferta clara, navegação rápida e
        WhatsApp com contexto.
      </p>
      <form
        className="calm-brief"
        action="/diagnostico"
        method="get"
        data-track-form="hero-brief"
        onSubmit={submit}
      >
        <input type="hidden" name="modo" value="implantacao" />
        <label htmlFor="project-brief">O que você quer construir?</label>
        <textarea
          id="project-brief"
          placeholder="Conte um pouco sobre o seu negócio e o que precisa melhorar…"
          required
          minLength={10}
          maxLength={600}
          rows={2}
          aria-describedby="brief-note brief-error"
          aria-invalid={error || undefined}
          onInvalid={() => setError(true)}
          onInput={() => setError(false)}
        />
        <p id="brief-error" className="rdv-field-error" aria-live="polite">
          {error ? "Descreva o projeto em pelo menos 10 caracteres." : ""}
        </p>
        <div className="calm-brief-bottom">
          <span id="brief-note">
            Sem cadastro. Escopo aprovado antes de contratar.
          </span>
          <button type="submit">
            Planejar meu projeto <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </div>
      </form>
      <p className="calm-brief-privacy">
        Use este espaço para o objetivo do projeto, sem dados pessoais ou
        sensíveis. <Link to="/politica">Saiba como usamos os dados.</Link>
      </p>
      <div className="calm-hero-options">
        <a href="#cases-title">Ver projetos reais</a>
        <Link to="/planos">Planos a partir de R$ 1.497</Link>
      </div>
      <div className="calm-hero-bottom">
        <a className="calm-discover" href="#journey-title">
          Conheça o trabalho <ArrowDown size={16} aria-hidden="true" />
        </a>
        <nav
          className="calm-social-links"
          aria-label="Acompanhe a Rei das Vendas"
        >
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram size={17} aria-hidden="true" />
            Instagram
          </a>
          <a href={BRAND.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={17} aria-hidden="true" />
            LinkedIn
          </a>
        </nav>
      </div>
    </section>
  );
}
