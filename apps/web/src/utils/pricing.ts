import type { TemplateDefinition } from '@/data/templates';
import { TEMPLATE_MODULES } from '@/data/templateModules';

export type PriceLine = {
  label: string;
  priceCents: number;
};

export type PriceQuote = {
  totalCents: number;
  lines: PriceLine[];
  selectedModuleIds: string[];
};

export function quoteTemplate(
  template: TemplateDefinition,
  selectedModuleIds: string[],
): PriceQuote {
  const selected = new Set(selectedModuleIds);
  const included = new Set(template.includedModuleIds);
  const unique = Array.from(new Set(selectedModuleIds));
  const payableModuleIds = unique.filter((id) => selected.has(id) && !included.has(id));
  const moduleById = new Map(TEMPLATE_MODULES.map((m) => [m.id, m] as const));

  const lines: PriceLine[] = [{ label: `Base — ${template.name}`, priceCents: template.basePriceCents }];

  for (const id of template.includedModuleIds) {
    const m = moduleById.get(id);
    if (!m) continue;
    lines.push({ label: `${m.label} (incluso)`, priceCents: 0 });
  }

  for (const id of payableModuleIds) {
    const m = moduleById.get(id);
    if (!m) continue;
    lines.push({ label: m.label, priceCents: m.priceCents });
  }

  const totalCents = lines.reduce((acc, l) => acc + l.priceCents, 0);
  return { totalCents, lines, selectedModuleIds: unique };
}

