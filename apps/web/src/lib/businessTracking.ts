import { hasMeasurementConsent, trackEvent } from "./analytics";
let started = false;
export function startBusinessTracking(): void {
  if (started || typeof window === "undefined") return;
  started = true;
  const startedForms = new WeakSet<HTMLFormElement>();
  let page = location.pathname;
  const depths = new Set<number>();
  let scheduled = false;
  let vitalsStarted = false;
  const startVitals = () => {
    if (vitalsStarted || !hasMeasurementConsent()) return;
    vitalsStarted = true;
    void import("web-vitals")
      .then(({ onLCP, onINP, onCLS, onFCP, onTTFB }) => {
        const send = (metric: {
          name: string;
          value: number;
          delta: number;
          rating: string;
        }) => {
          if (!hasMeasurementConsent()) return;
          const factor = metric.name === "CLS" ? 1000 : 1;
          trackEvent("web_vital", {
            metric_name: metric.name,
            value: Math.round(metric.value * factor),
            delta: Math.round(metric.delta * factor),
            rating: metric.rating,
          });
        };
        onLCP(send);
        onINP(send);
        onCLS(send);
        onFCP(send);
        onTTFB(send);
      })
      .catch(() => {
        vitalsStarted = false;
      });
  };
  startVitals();
  window.addEventListener("rdv:consent", startVitals);
  document.addEventListener("focusin", (event) => {
    const form = (event.target as Element).closest<HTMLFormElement>(
      "form[data-track-form]",
    );
    if (!form || startedForms.has(form)) return;
    startedForms.add(form);
    trackEvent("form_start", { form_id: form.dataset.trackForm });
  });
  document.addEventListener(
    "invalid",
    (event) => {
      const form = (event.target as HTMLInputElement).form;
      if (form?.dataset.trackForm)
        trackEvent("form_error", {
          form_id: form.dataset.trackForm,
          label: "invalid_field",
        });
    },
    true,
  );
  document.addEventListener("submit", (event) => {
    const form = event.target as HTMLFormElement;
    if (!form.dataset.trackForm) return;
    const field = form.querySelector<HTMLTextAreaElement>("textarea");
    const valid = !field || field.value.trim().length >= field.minLength;
    trackEvent(valid ? "form_submit" : "form_error", {
      form_id: form.dataset.trackForm,
      label: valid ? "brief_ready" : "invalid_field",
    });
  });
  document.addEventListener("click", (event) => {
    const element = (event.target as Element).closest<HTMLElement>(
      "[data-track]",
    );
    if (!element?.dataset.track) return;
    trackEvent(element.dataset.track, {
      location: element.dataset.location,
      label: element.dataset.label,
    });
  });
  window.addEventListener(
    "scroll",
    () => {
      if (!hasMeasurementConsent() || scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        if (page !== location.pathname) {
          page = location.pathname;
          depths.clear();
        }
        const available = document.documentElement.scrollHeight - innerHeight;
        if (available <= 0) return;
        const percent = (scrollY / available) * 100;
        for (const depth of [25, 50, 75, 90])
          if (percent >= depth && !depths.has(depth)) {
            depths.add(depth);
            trackEvent(`scroll_depth_${depth}`, { location: "page" });
          }
      });
    },
    { passive: true },
  );
  let pricingObserver: IntersectionObserver | undefined;
  const observePricing = () => {
    pricingObserver?.disconnect();
    const element = document.querySelector(
      "#door-panel, .rdv-precos__implantacao",
    );
    if (!element || !("IntersectionObserver" in window)) return;
    pricingObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        trackEvent("pricing_view", { location: "pricing" });
        pricingObserver?.disconnect();
      },
      { threshold: 0.25 },
    );
    pricingObserver.observe(element);
  };
  observePricing();
  window.addEventListener("rdv:analytics", (event) => {
    if ((event as CustomEvent).detail?.event === "page_view") {
      depths.clear();
      requestAnimationFrame(observePricing);
    }
  });
}
