import type { AbVariant } from '@altiq/types';

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function getOrCreateVisitorId(storage: Storage): string {
  const key = 'altiq:vid';
  const existing = storage.getItem(key);
  if (existing) return existing;
  const id = `v_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
  storage.setItem(key, id);
  return id;
}

function hashStringToUint32(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function assignAbVariant(visitorId: string): AbVariant {
  const h = hashStringToUint32(visitorId);
  return h % 2 === 0 ? 'A' : 'B';
}

export function pickUtm(search: string): Record<string, string | undefined> {
  const params = new URLSearchParams(search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const out: Record<string, string | undefined> = {};
  for (const k of keys) out[k] = params.get(k) ?? undefined;
  return out;
}

