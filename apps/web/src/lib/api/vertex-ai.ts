/**
 * Vertex AI Integration Layer
 * Pronto para conectar com Google Vertex AI (Gemini, embeddings, etc.)
 * Substitua API_ENDPOINT e configure auth via service account ou OAuth.
 */
const VERTEX_API_ENDPOINT = import.meta.env.VITE_VERTEX_API_ENDPOINT || '';
const VERTEX_PROJECT_ID = import.meta.env.VITE_VERTEX_PROJECT_ID || '';
const VERTEX_LOCATION = import.meta.env.VITE_VERTEX_LOCATION || 'us-central1';

interface VertexConfig {
  projectId: string;
  location: string;
  model: string;
}

export function getVertexConfig(): VertexConfig {
  return {
    projectId: VERTEX_PROJECT_ID,
    location: VERTEX_LOCATION,
    model: 'gemini-2.0-flash-001',
  };
}

/**
 * Gera análise de performance com IA via Vertex
 */
export async function generatePerformanceInsights(
  metrics: Record<string, number>
): Promise<string> {
  if (!VERTEX_API_ENDPOINT) {
    console.warn('[Vertex AI] ENDPOINT não configurado. Retornando fallback.');
    return 'Configure VITE_VERTEX_API_ENDPOINT no ambiente.';
  }

  try {
    const res = await fetch(`${VERTEX_API_ENDPOINT}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ metrics }],
        parameters: { maxOutputTokens: 256 },
      }),
    });
    if (!res.ok) throw new Error(`Vertex API error: ${res.status}`);
    const data = await res.json();
    return data.predictions?.[0]?.content || 'Sem retorno da IA.';
  } catch (err) {
    console.error('[Vertex AI] Erro:', err);
    return 'Erro ao conectar com Vertex AI.';
  }
}

/**
 * Hook React para usar Vertex AI em componentes
 */
import { useState, useCallback } from 'react';

export function useVertexAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (metrics: Record<string, number>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generatePerformanceInsights(metrics);
      return result;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Erro desconhecido';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { analyze, loading, error, config: getVertexConfig() };
}
