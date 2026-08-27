import { useI18n, type Locale } from "@/lib/i18n";

const OPTIONS: { code: Locale; label: string }[] = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
  { code: "es", label: "ES" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  return (
    <div className="rdv-lang" role="group" aria-label="Idioma">
      {OPTIONS.map((o) => (
        <button
          key={o.code}
          type="button"
          className={
            o.code === locale ? "rdv-lang__btn is-active" : "rdv-lang__btn"
          }
          onClick={() => setLocale(o.code)}
          aria-pressed={o.code === locale}
          aria-label={o.label}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
