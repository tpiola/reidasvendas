import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./fonts.css";
import { I18nProvider } from "./lib/i18n";
import "./index.css";
import "./dossier.css";
import "./platform.css";
import "./studio.css";
import "./obsidian.css";
import "./calm.css";
import "./commerce.css";
import { startBusinessTracking } from "./lib/businessTracking";
import { startMeasurement } from "./lib/analytics";

startMeasurement();
startBusinessTracking();

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>
);
const queryChangesPage =
  Boolean(window.location.search) &&
  ["/diagnostico", "/solucoes"].includes(window.location.pathname);
if (root.hasChildNodes() && !queryChangesPage) hydrateRoot(root, app);
else createRoot(root).render(app);

// Remove o worker legado: chunks cacheados entre releases causavam falhas de entrada.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker
      .getRegistrations()
      .then((registrations) =>
        Promise.all(
          registrations.map((registration) => registration.unregister()),
        ),
      )
      .catch(() => undefined);
  });
}
