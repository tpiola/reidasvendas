import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  CONSENT_KEY,
  clearOptionalStorage,
  readConsent,
  saveConsent,
} from "./consent";
describe("Consentimento por finalidade", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  it("registra versão e data sem identificar a pessoa", () => {
    const listener = vi.fn();
    window.addEventListener("rdv:consent", listener, { once: true });
    const record = saveConsent(false, false);
    expect(readConsent()).toEqual(record);
    expect(record.version).toBe("2026-10-22");
    expect(Date.parse(record.expiresAt) - Date.parse(record.updatedAt)).toBe(
      180 * 86400000,
    );
    expect(localStorage.getItem("reidasvendas:consent-history")).not.toMatch(
      /email|phone|ip_address/,
    );
    expect(listener).toHaveBeenCalledOnce();
  });
  it("falha fechado com registro corrompido", () => {
    localStorage.setItem(CONSENT_KEY, "{");
    expect(readConsent()).toBeNull();
  });
  it("revoga armazenamento opcional sem apagar a decisão", () => {
    saveConsent(false, false);
    sessionStorage.setItem("rdv-acquisition-attribution", "{}");
    document.cookie = "_ga=test; Path=/";
    clearOptionalStorage();
    expect(sessionStorage.getItem("rdv-acquisition-attribution")).toBeNull();
    expect(document.cookie).not.toContain("_ga=");
    expect(readConsent()?.analytics).toBe(false);
  });
});
