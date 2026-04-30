export function formatBRL(cents: number): string {
  const value = Math.max(0, Math.round(cents)) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

