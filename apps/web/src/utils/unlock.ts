const KEY = 'reidasvendas:unlocks';

type UnlockState = {
  templateSlugs: string[];
};

function read(): UnlockState {
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return { templateSlugs: [] };
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== 'object' || parsed === null) return { templateSlugs: [] };
    const slugs = (parsed as { templateSlugs?: unknown }).templateSlugs;
    return { templateSlugs: Array.isArray(slugs) ? slugs.filter((s) => typeof s === 'string') : [] };
  } catch {
    return { templateSlugs: [] };
  }
}

function write(state: UnlockState) {
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function isTemplateUnlocked(slug: string): boolean {
  return read().templateSlugs.includes(slug);
}

export function unlockTemplate(slug: string) {
  const state = read();
  if (!state.templateSlugs.includes(slug)) {
    write({ templateSlugs: [slug, ...state.templateSlugs].slice(0, 50) });
  }
}

