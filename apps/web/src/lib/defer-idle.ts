/** Executa após idle ou timeout — não bloqueia LCP / first paint */
export function runWhenIdle(fn: () => void, timeoutMs = 2200): void {
  if (typeof window === 'undefined') return;

  const run = () => {
    try {
      fn();
    } catch {
      /* ignore */
    }
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: timeoutMs });
    return;
  }

  setTimeout(run, Math.min(timeoutMs, 1500));
}

export function runAfterFirstPaint(fn: () => void, delayMs = 0): void {
  if (typeof document === 'undefined') return;

  const run = () => runWhenIdle(fn, 2800);

  if (document.readyState === 'complete') {
    setTimeout(run, delayMs);
    return;
  }

  window.addEventListener(
    'load',
    () => {
      setTimeout(run, delayMs);
    },
    { once: true },
  );
}
