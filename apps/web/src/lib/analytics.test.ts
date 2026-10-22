import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const allow = (marketing = false) =>
  localStorage.setItem(
    "reidasvendas:consent-v2",
    JSON.stringify({
      version: "2026-10-22",
      necessary: true,
      analytics: true,
      marketing,
      updatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    }),
  );

describe("Medição com consentimento", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    sessionStorage.clear();
    document.querySelector("#rdv-measurement")?.remove();
    delete window.dataLayer;
    delete window.gtag;
    vi.stubEnv("VITE_GA4_ID", "G-TEST123");
    vi.stubEnv("VITE_GTM_ID", "");
  });
  afterEach(() => vi.unstubAllEnvs());

  it("não carrega rastreadores antes do consentimento", async () => {
    const { trackEvent } = await import("./analytics");
    trackEvent("page_view");
    expect(document.querySelector("#rdv-measurement")).toBeNull();
    expect(window.dataLayer).toBeUndefined();
  });

  it("despacha apenas uma visualização e exclui dados pessoais e query string", async () => {
    allow();
    window.history.replaceState(
      {},
      "",
      "/diagnostico?email=pessoa%40example.com",
    );
    const { trackEvent } = await import("./analytics");
    trackEvent("page_view", {
      page_title: "Diagnóstico",
      email: "pessoa@example.com",
      phone: "16999999999",
    });
    trackEvent("page_view", { page_title: "Diagnóstico" });
    const events = (window.dataLayer || []).filter(
      (item) => Array.isArray(item) && item[0] === "event",
    );
    expect(events).toHaveLength(1);
    expect(JSON.stringify(events)).not.toContain("pessoa");
    expect(JSON.stringify(events)).not.toContain("16999999999");
    expect(document.querySelector("#rdv-measurement")).toHaveAttribute(
      "src",
      "https://www.googletagmanager.com/gtag/js?id=G-TEST123",
    );
    window.history.replaceState({}, "", "/");
  });

  it("prioriza GTM sem instalar um segundo provedor GA4", async () => {
    allow();
    vi.stubEnv("VITE_GTM_ID", "GTM-TEST123");
    const { trackEvent } = await import("./analytics");
    trackEvent("generate_lead", { plan: "base" });
    expect(window.gtag).toBeTypeOf("function");
    expect(window.dataLayer?.[0]).toEqual([
      "consent",
      "default",
      expect.objectContaining({
        ad_user_data: "denied",
        ad_personalization: "denied",
      }),
    ]);
    expect(
      window.dataLayer?.filter(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "event" in item &&
          item.event === "generate_lead",
      ),
    ).toHaveLength(1);
    expect(document.querySelectorAll("#rdv-measurement")).toHaveLength(1);
  });

  it("não persiste atribuição antes da escolha", async () => {
    window.history.replaceState({}, "", "/?utm_source=google&gclid=test-click");
    const { captureAttribution } = await import("./analytics");
    expect(captureAttribution()).toEqual({});
    expect(sessionStorage.getItem("rdv-acquisition-attribution")).toBeNull();
    window.history.replaceState({}, "", "/");
  });
  it("autorizar medição não autoriza publicidade", async () => {
    allow();
    window.history.replaceState(
      {},
      "",
      "/?utm_source=google&gbraid=campaign-click&gclid=click",
    );
    const { captureAttribution, trackEvent } = await import("./analytics");
    expect(captureAttribution()).toMatchObject({ utm_source: "google" });
    expect(captureAttribution()).not.toHaveProperty("gclid");
    trackEvent("cta_click");
    expect(window.dataLayer?.[1]).toEqual([
      "consent",
      "update",
      expect.objectContaining({
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      }),
    ]);
    window.history.replaceState({}, "", "/");
  });
  it("prefere negar quando o consentimento expirou", async () => {
    allow();
    const record = JSON.parse(localStorage.getItem("reidasvendas:consent-v2")!);
    record.expiresAt = "2020-01-01";
    localStorage.setItem("reidasvendas:consent-v2", JSON.stringify(record));
    const { hasMeasurementConsent } = await import("./analytics");
    expect(hasMeasurementConsent()).toBe(false);
  });
  it("redige PII em campanhas e dimensões permitidas", async () => {
    allow();
    window.history.replaceState({}, "", "/?utm_campaign=pessoa%40example.com");
    const { trackEvent } = await import("./analytics");
    trackEvent("form_submit", {
      label: "pessoa@example.com",
      form_id: "hero-brief",
    });
    expect(JSON.stringify(window.dataLayer)).not.toContain("pessoa");
    window.history.replaceState({}, "", "/");
  });
});
