/* eslint-disable react-refresh/only-export-components -- provider e hook compartilham o mesmo contexto tipado */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import pt from "../locales/pt.json";
import en from "../locales/en.json";

const LOCALES = { pt, en } as const;
export type Locale = keyof typeof LOCALES;

const LS_KEY = "rdv-locale";
const HTML_LANG: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};

function detect(): Locale {
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved && saved in LOCALES) return saved as Locale;
  } catch {
    /* ignore */
  }
  // Português é o padrão do site (negócio local, público brasileiro).
  // Não usamos navigator.language aqui: o Googlebot rastreia com Accept-Language
  // en-US, então o site era servido INTEIRO em inglês para ele — e para qualquer
  // visitante com o navegador em inglês. A troca de idioma é manual, no seletor.
  return "pt";
}

function translate(locale: Locale, key: string): string {
  const tables = [
    LOCALES[locale] as Record<string, string>,
    LOCALES.en as Record<string, string>,
    LOCALES.pt as Record<string, string>,
  ];
  for (const table of tables) {
    const value = table[key];
    if (value) return value;
  }
  return key;
}

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string>) => string;
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
  };

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);

  const t = (key: string, vars?: Record<string, string>) => {
    let value = translate(locale, key);
    if (vars) {
      for (const [name, replacement] of Object.entries(vars)) {
        value = value.split(`{${name}}`).join(replacement);
      }
    }
    return value;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
