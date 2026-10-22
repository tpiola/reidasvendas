import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TransitionLink } from "@/components/TransitionLink";
import { Menu, X } from "lucide-react";
import { BrandLockup } from "@/components/BrandLockup";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
export function SiteHeader() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="rdv-header obs-header">
      <a className="sr-only focus:not-sr-only" href="#main-content">
        {t("nav.skip")}
      </a>
      <div className="rdv-header-inner">
        <TransitionLink
          to="/"
          className="rdv-brand-link"
          aria-label={t("nav.home")}
        >
          <BrandLockup compact />
        </TransitionLink>
        <nav
          id="rdv-primary-nav"
          className={`obs-primary-nav ${open ? "is-open" : ""}`}
          aria-label={t("nav.main")}
        >
          {[
            ["nav.solutions", "/solucoes"],
            ["nav.portfolio", "/portfolio"],
            ["nav.plans", "/planos"],
            ["nav.about", "/sobre"],
          ].map(([key, to]) => (
            <TransitionLink
              key={to}
              to={to}
              className="rdv-nav-link"
              onClick={() => setOpen(false)}
              aria-current={
                pathname === to || pathname.startsWith(`${to}/`)
                  ? "page"
                  : undefined
              }
            >
              {t(key)}
            </TransitionLink>
          ))}
        </nav>
        <div className="obs-header-actions">
          <LanguageSwitcher />
          <TransitionLink
            className="rdv-header-cta"
            to="/diagnostico?modo=implantacao"
            onClick={() =>
              trackEvent("diagnostic_start", { position: "header" })
            }
          >
            {t("nav.cta")}
          </TransitionLink>
          <button
            type="button"
            className="rdv-menu-button obs-menu-toggle"
            aria-expanded={open}
            aria-controls="rdv-primary-nav"
            aria-label={open ? t("nav.menu.close") : t("nav.menu.open")}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
