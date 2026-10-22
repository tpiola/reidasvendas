export const MEASUREMENT_CONSENT_KEY = "reidasvendas:cookie-consent";
export const CONSENT_KEY = "reidasvendas:consent-v2";
export const CONSENT_POLICY_VERSION = "2026-10-22";
const HISTORY_KEY = "reidasvendas:consent-history";
const RETENTION_MS = 180 * 24 * 60 * 60 * 1000;
export const marketingAvailable =
  import.meta.env.VITE_MARKETING_ENABLED === "true";
export type ConsentRecord = {
  version: string;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
  expiresAt: string;
};
export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const value = JSON.parse(
      localStorage.getItem(CONSENT_KEY) || "null",
    ) as ConsentRecord | null;
    if (
      value?.version === CONSENT_POLICY_VERSION &&
      typeof value.analytics === "boolean" &&
      typeof value.marketing === "boolean" &&
      Date.parse(value.expiresAt) > Date.now()
    )
      return value;
  } catch {
    /* Storage can be unavailable; optional processing remains denied. */
  }
  return null;
}
export function saveConsent(
  analytics: boolean,
  marketing: boolean,
): ConsentRecord {
  const now = Date.now();
  const record: ConsentRecord = {
    version: CONSENT_POLICY_VERSION,
    necessary: true,
    analytics,
    marketing: marketing && marketingAvailable,
    updatedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + RETENTION_MS).toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    localStorage.setItem(
      MEASUREMENT_CONSENT_KEY,
      analytics ? "accepted" : "rejected",
    );
    const previous = JSON.parse(
      localStorage.getItem(HISTORY_KEY) || "[]",
    ) as ConsentRecord[];
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(
        [record, ...(Array.isArray(previous) ? previous : [])].slice(0, 10),
      ),
    );
  } catch {
    /* The choice applies in memory for this page even without storage. */
  }
  window.dispatchEvent(new CustomEvent("rdv:consent", { detail: record }));
  return record;
}
export function clearOptionalStorage(): void {
  try {
    sessionStorage.removeItem("rdv-acquisition-attribution");
  } catch {
    /* Optional. */
  }
  for (const raw of document.cookie.split(";")) {
    const name = raw.trim().split("=")[0];
    if (!/^(_ga(?:_|$)|_gid$|_gat|_gcl_)/.test(name)) continue;
    for (const domain of [
      "",
      `; Domain=${location.hostname}`,
      `; Domain=.${location.hostname}`,
    ])
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax`;
  }
}
