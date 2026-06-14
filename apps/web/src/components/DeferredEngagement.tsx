import { lazy, Suspense, useEffect, useState } from 'react';
import { runAfterFirstPaint } from '@/lib/defer-idle';

const AssistWidget = lazy(() =>
  import('@/components/engagement/AssistWidget').then((m) => ({ default: m.AssistWidget })),
);

/** Widgets de conversão — após primeiro paint para não competir com LCP */
export function DeferredEngagement() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    runAfterFirstPaint(() => setReady(true), 120);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <AssistWidget />
    </Suspense>
  );
}
