'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { readConsent } from '@/lib/tracking';
const Analytics = dynamic(
  () => import('@vercel/analytics/react').then((m) => m.Analytics),
  { ssr: false },
);
const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((m) => m.SpeedInsights),
  { ssr: false },
);
export default function Observability() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const update = () => setEnabled(readConsent().analytics);
    update();
    window.addEventListener('rdv:consent', update);
    return () => window.removeEventListener('rdv:consent', update);
  }, []);
  if (!enabled || process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS !== 'true')
    return null;
  return (
    <>
      <Analytics
        beforeSend={(event) => ({
          ...event,
          url: new URL(new URL(event.url).pathname, location.origin).href,
        })}
      />
      <SpeedInsights />
    </>
  );
}
