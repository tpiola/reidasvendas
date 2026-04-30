import { TEMPLATE_MODULES } from '@/data/templateModules';

type ModulePickerProps = {
  selected: string[];
  onToggle: (id: string) => void;
  disabledIds?: string[];
};

export function ModulePicker({ selected, onToggle, disabledIds }: ModulePickerProps) {
  const selectedSet = new Set(selected);
  const disabledSet = new Set(disabledIds ?? []);

  return (
    <div className="grid gap-3">
      {TEMPLATE_MODULES.map((m) => {
        const isChecked = selectedSet.has(m.id);
        const isDisabled = disabledSet.has(m.id);
        return (
          <label
            key={m.id}
            className={
              isDisabled
                ? 'flex cursor-not-allowed items-start gap-3 rounded-2xl border border-black/10 bg-black/2 px-5 py-4'
                : 'flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-white px-5 py-4 transition-colors hover:bg-black/2'
            }
          >
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-black/20 accent-black"
              checked={isChecked}
              disabled={isDisabled}
              onChange={() => onToggle(m.id)}
            />
            <span className="flex-1">
              <span className="block text-sm font-semibold text-black">{m.label}</span>
              <span className="mt-1 block text-xs leading-relaxed text-black/60">
                {m.description}
                {isDisabled ? ' (incluso)' : ''}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}

