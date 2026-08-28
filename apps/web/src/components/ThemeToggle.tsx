import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';

type ThemePreference = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'rdv-theme';
const ORDER: ThemePreference[] = ['system', 'light', 'dark'];

function getSavedPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference !== 'system') return preference;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(preference: ThemePreference) {
  const theme = resolveTheme(preference);
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.themePreference = preference;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content',
    theme === 'dark' ? '#0B0E14' : '#FAF9F6',
  );
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>(getSavedPreference);

  useEffect(() => {
    applyTheme(preference);

    if (preference !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncWithSystem = () => applyTheme('system');
    media.addEventListener?.('change', syncWithSystem);
    return () => media.removeEventListener?.('change', syncWithSystem);
  }, [preference]);

  const cycleTheme = () => {
    const next = ORDER[(ORDER.indexOf(preference) + 1) % ORDER.length];
    window.localStorage.setItem(STORAGE_KEY, next);
    setPreference(next);
  };

  const labels: Record<ThemePreference, string> = {
    system: 'Tema do sistema ativo. Alterar para modo claro',
    light: 'Modo claro ativo. Alterar para modo escuro',
    dark: 'Modo escuro ativo. Alterar para tema do sistema',
  };

  const icons: Record<ThemePreference, typeof Monitor> = {
    system: Monitor,
    light: Sun,
    dark: Moon,
  };
  const Icon = icons[preference];

  return (
    <button
      type="button"
      className="rdv-theme-toggle"
      onClick={cycleTheme}
      aria-label={labels[preference]}
      title={labels[preference]}
      data-preference={preference}
    >
      <Icon aria-hidden="true" />
      <span className="sr-only">{labels[preference]}</span>
    </button>
  );
}
