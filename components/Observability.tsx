'use client';
import { useEffect, useState } from 'react';
import { readConsent } from '@/lib/tracking';
type Widgets = {
  Analytics: typeof import('@vercel/analytics/react').Analytics;
  SpeedInsights: typeof import('@vercel/speed-insights/next').SpeedInsights;
};
function withoutQuery<T extends { url: string }>(event: T): T | null {
  if (!readConsent().analytics) return null;
  try {
    const url = new URL(event.url);
    return { ...event, url: url.origin + url.pathname };
  } catch {
    return null;
  }
}
/** The SDK modules and their scripts are fetched only after optional consent. */
export default function Observability() {
  const [widgets, setWidgets] = useState<Widgets | null>(null);
  useEffect(() => {
    let mounted = true;
    const update = async () => {
      if (
        !readConsent().analytics ||
        process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS !== 'true'
      ) {
        setWidgets(null);
        return;
      }
      try {
        const [analytics, speed] = await Promise.all([
          import('@vercel/analytics/react'),
          import('@vercel/speed-insights/next'),
        ]);
        if (mounted && readConsent().analytics)
          setWidgets({
            Analytics: analytics.Analytics,
            SpeedInsights: speed.SpeedInsights,
          });
      } catch {
        /* Optional telemetry failure never interrupts the commercial journey. */
      }
    };
    void update();
    window.addEventListener('rdv:consent', update);
    return () => {
      mounted = false;
      window.removeEventListener('rdv:consent', update);
    };
  }, []);
  return widgets ? (
    <>
      <widgets.Analytics beforeSend={withoutQuery} />
      <widgets.SpeedInsights beforeSend={withoutQuery} />
    </>
  ) : null;
}
