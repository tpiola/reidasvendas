import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BRAND } from "@/lib/brand";
import { readConsent } from "@/lib/consent";
import { trackEvent } from "@/lib/analytics";
export function StickyMobileCTA() {
  const { pathname } = useLocation();
  const [afterHero, setAfterHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(true);
  useEffect(() => {
    setAfterHero(false);
    setPrivacyOpen(!readConsent());
    const hero = document.querySelector(
      ".calm-hero, .ge-hero, main > header, main > section",
    );
    const footer = document.querySelector("footer");
    if (!hero || !footer || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero)
            setAfterHero(
              !entry.isIntersecting && entry.boundingClientRect.bottom <= 80,
            );
          if (entry.target === footer) setFooterVisible(entry.isIntersecting);
        }
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    observer.observe(footer);
    const changed = () => setPrivacyOpen(false);
    const opened = () => setPrivacyOpen(true);
    window.addEventListener("rdv:consent", changed);
    window.addEventListener("rdv:consent-settings", opened);
    return () => {
      observer.disconnect();
      window.removeEventListener("rdv:consent", changed);
      window.removeEventListener("rdv:consent-settings", opened);
    };
  }, [pathname]);
  if (pathname.startsWith("/diagnostico")) return null;
  const visible = afterHero && !footerVisible && !privacyOpen;
  const message = `Olá! Vi a página https://reidasvendas.com.br${pathname} e quero conversar sobre meu projeto.`;
  return (
    <div
      className={`rdv-sticky-cta${visible ? " is-visible" : ""}`}
      hidden={!visible}
      data-testid="sticky-mobile-cta"
    >
      <a
        href={`https://wa.me/${BRAND.phone}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("whatsapp_click", { location: "sticky_mobile" })
        }
      >
        Falar no WhatsApp <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
