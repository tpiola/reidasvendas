import { Moon, Sun } from 'lucide-react';
import { cn } from '@altiq/ui';
import { useTheme } from '@/hooks/useTheme';

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors',
        'border-[color:var(--header-border)] bg-[color:var(--header-surface)]',
        'text-[color:var(--header-fg-muted)] hover:text-[color:var(--header-fg)] hover:bg-[color:var(--header-hover)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rdv-blue)] focus-visible:ring-offset-2',
        className,
      )}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {isDark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
