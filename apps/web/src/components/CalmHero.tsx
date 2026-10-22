import { ArrowDown, ArrowUpRight, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { BRAND } from "@/lib/brand";

/** A short brief starts the existing qualification flow, including without JS. */
export function CalmHero() {
  return (
    <section className="calm-hero rdv-shell" aria-labelledby="home-title">
      <div className="calm-hero-mark">
        <BrandMark />
      </div>
      <p className="calm-location">
        Feito em Franca. Para o próximo passo do seu negócio.
      </p>
      <h1 id="home-title">Seu negócio merece ser encontrado.</h1>
      <p className="calm-hero-lede">
        Sites, lojas e atendimento que trabalham juntos.
        <br className="calm-desktop-break" /> Com clareza para o seu cliente e
        autonomia para você.
      </p>
      <form className="calm-brief" action="/diagnostico" method="get">
        <input type="hidden" name="modo" value="implantacao" />
        <label htmlFor="project-brief">O que você quer construir?</label>
        <textarea
          id="project-brief"
          name="objetivo"
          placeholder="Conte um pouco sobre o seu negócio e o que precisa melhorar…"
          required
          minLength={10}
          maxLength={600}
          rows={2}
          aria-describedby="brief-note"
        />
        <div className="calm-brief-bottom">
          <span id="brief-note">Um ponto de partida. Sem cadastro.</span>
          <button type="submit">
            Começar meu projeto <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </div>
      </form>
      <div className="calm-hero-options">
        <Link to="/planos">Conhecer os planos</Link>
        <a href="#comecar">Quero receber mais contatos</a>
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
