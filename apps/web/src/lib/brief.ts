const KEY = "rdv:project-brief";
const TTL = 30 * 60 * 1000;
export function rememberBrief(value: string): void {
  try {
    sessionStorage.setItem(
      KEY,
      JSON.stringify({
        text: value.trim().slice(0, 600),
        expires: Date.now() + TTL,
      }),
    );
  } catch {
    /* The router state remains the fallback. */
  }
}
export function readBrief(): string {
  if (typeof window === "undefined") return "";
  try {
    const value = JSON.parse(sessionStorage.getItem(KEY) || "null");
    if (typeof value?.text === "string" && value.expires > Date.now())
      return value.text.slice(0, 600);
    sessionStorage.removeItem(KEY);
  } catch {
    /* No draft is better than exposing it in a URL. */
  }
  return "";
}
export function clearBrief(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* Optional. */
  }
}
