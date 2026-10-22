import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { marketingAvailable, readConsent, saveConsent } from "@/lib/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  useEffect(() => {
    const current = readConsent();
    setVisible(!current);
    const reopen = () => {
      const saved = readConsent();
      setAnalytics(saved?.analytics ?? false);
      setMarketing(saved?.marketing ?? false);
      setCustomize(true);
      setVisible(true);
    };
    window.addEventListener("rdv:consent-settings", reopen);
    return () => window.removeEventListener("rdv:consent-settings", reopen);
  }, []);
  const persist = (measurement: boolean, advertising: boolean) => {
    saveConsent(measurement, advertising);
    setVisible(false);
    setCustomize(false);
  };
  if (!visible) return null;
  return (
    <aside className="rdv-cookie" aria-label="Preferências de privacidade">
      <p>
        Usamos armazenamento necessário para suas preferências. A medição de
        navegação é opcional e só começa com sua autorização.{" "}
        <Link to="/politica#cookies">Cookies e privacidade</Link>.
      </p>
      <div className="rdv-cookie-actions">
        <button type="button" onClick={() => persist(false, false)}>
          Rejeitar não essenciais
        </button>
        <button type="button" onClick={() => persist(true, marketingAvailable)}>
          Aceitar todos
        </button>
        <button
          type="button"
          aria-expanded={customize}
          aria-controls="cookie-options"
          onClick={() => setCustomize(!customize)}
        >
          Personalizar
        </button>
      </div>
      {customize && (
        <section
          id="cookie-options"
          className="rdv-cookie-options"
          aria-label="Finalidades de armazenamento"
        >
          <p>
            <strong>Necessários:</strong> mantêm sua escolha de privacidade por
            até 180 dias. Sempre ativos.
          </p>
          <label>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />{" "}
            Medição: entender uso das páginas e desempenho, sem conteúdo dos
            formulários.
          </label>
          <label>
            <input
              type="checkbox"
              checked={marketing}
              disabled={!marketingAvailable}
              onChange={(e) => setMarketing(e.target.checked)}
            />{" "}
            Marketing: atribuição de anúncios e personalização
            {!marketingAvailable && " (não ativo neste site)"}.
          </label>
          <p>
            A decisão fica registrada neste navegador, com data e versão da
            política. Você pode mudar ou revogar no rodapé.
          </p>
          <button
            type="button"
            className="rdv-consent-save"
            onClick={() => persist(analytics, marketing)}
          >
            Salvar preferências
          </button>
        </section>
      )}
    </aside>
  );
}
