import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import pt from "../locales/pt.json";
import en from "../locales/en.json";
import it from "../locales/it.json";
import es from "../locales/es.json";

const LOCALES = { pt, en, it, es } as const;
export type Locale = keyof typeof LOCALES;

const LS_KEY = "rdv-locale";

function detect(): Locale {
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved && saved in LOCALES) return saved as Locale;
    const nav = navigator.language.slice(0, 2);
    if (nav in LOCALES) return nav as Locale;
  } catch {
    /* ignore */
  }
  return "pt";
}

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}>({ locale: "pt", setLocale: () => {}, t: (k) => k });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detect);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(LS_KEY, l);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = l;
  };

  const t = (key: string) =>
    (LOCALES[locale] as Record<string, string>)[key] ?? key;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
