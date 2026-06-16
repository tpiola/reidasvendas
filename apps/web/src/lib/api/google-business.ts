/**
 * Google Business Profile Integration Layer
 * Pronto para conectar com GBP API e puxar métricas de negócio local.
 * Configure VITE_GOOGLE_OAUTH_TOKEN e VITE_GBP_ACCOUNT_ID.
 */
const GBP_ACCOUNT_ID = import.meta.env.VITE_GBP_ACCOUNT_ID || '';
const GOOGLE_OAUTH_TOKEN = import.meta.env.VITE_GOOGLE_OAUTH_TOKEN || '';
const GBP_API = 'https://mybusiness.googleapis.com/v4';

interface LocationMetrics {
  totalCalls?: number;
  totalMessages?: number;
  totalDirections?: number;
  totalWebsiteClicks?: number;
  totalReviews?: number;
  averageRating?: number;
  viewsSearch?: number;
  viewsMaps?: number;
}

/**
 * Busca métricas de performance de uma localização GBP
 */
export async function fetchLocationMetrics(locationId: string): Promise<LocationMetrics | null> {
  if (!GOOGLE_OAUTH_TOKEN || !GBP_ACCOUNT_ID) {
    console.warn('[GBP] OAuth ou Account ID não configurados.');
    return null;
  }

  try {
    const res = await fetch(
      `${GBP_API}/accounts/${GBP_ACCOUNT_ID}/locations/${locationId}:reportInsights`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GOOGLE_OAUTH_TOKEN}`,
        },
        body: JSON.stringify({
          basicRequest: {
            metricRequests: [
              'ALL',
            ],
            timeRange: {
              startTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              endTime: new Date().toISOString(),
            },
          },
        }),
      }
    );
    if (!res.ok) throw new Error(`GBP error: ${res.status}`);
    const data = await res.json();
    return data as LocationMetrics;
  } catch (err) {
    console.error('[GBP] Erro:', err);
    return null;
  }
}

/**
 * Lista todas as localizações da conta
 */
export async function listLocations(): Promise<{ name: string; locationName: string }[]> {
  if (!GOOGLE_OAUTH_TOKEN || !GBP_ACCOUNT_ID) return [];

  try {
    const res = await fetch(
      `${GBP_API}/accounts/${GBP_ACCOUNT_ID}/locations?pageSize=100`,
      { headers: { Authorization: `Bearer ${GOOGLE_OAUTH_TOKEN}` } }
    );
    if (!res.ok) throw new Error(`GBP error: ${res.status}`);
    const data = await res.json();
    return (data.locations || []).map((l: Record<string, unknown>) => ({
      name: l.name,
      locationName: l.locationName,
    }));
  } catch (err) {
    console.error('[GBP] Erro:', err);
    return [];
  }
}

/**
 * Hook React para Google Business Profile
 */
import { useState, useCallback } from 'react';

export function useGoogleBusiness() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMetrics = useCallback(async (locationId: string) => {
    setLoading(true);
    setError(null);
    try {
      return await fetchLocationMetrics(locationId);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getMetrics, loading, error, isConfigured: !!GOOGLE_OAUTH_TOKEN };
}
