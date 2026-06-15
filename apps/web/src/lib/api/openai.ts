/**
 * OpenAI Integration Layer
 * Pronto para geração de imagens (DALL-E), análise de dados e copy.
 * Configure VITE_OPENAI_API_KEY no ambiente.
 */
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1';

interface OpenAIImageParams {
  prompt: string;
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
  n?: number;
}

/**
 * Gera imagem via DALL-E 3
 */
export async function generateImage(params: OpenAIImageParams): Promise<string | null> {
  if (!OPENAI_API_KEY) {
    console.warn('[OpenAI] API key não configurada.');
    return null;
  }

  try {
    const res = await fetch(`${OPENAI_BASE_URL}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: params.prompt,
        size: params.size || '1024x1024',
        quality: params.quality || 'standard',
        n: params.n || 1,
      }),
    });
    if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
    const data = await res.json();
    return data.data?.[0]?.url || null;
  } catch (err) {
    console.error('[OpenAI] Erro:', err);
    return null;
  }
}

/**
 * Gera copy de alto-conversão via GPT-4
 */
export async function generateCopy(
  context: string,
  tone: 'direct' | 'premium' | 'urgency' = 'direct'
): Promise<string | null> {
  if (!OPENAI_API_KEY) return null;

  const tones = {
    direct: 'Tom direto, frases curtas, resposta direta. Venda.',
    premium: 'Tom institucional, luxo, autoridade. Soberania digital.',
    urgency: 'Urgência controlada, escassez real sem dark pattern.',
  };

  try {
    const res = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1',
        messages: [
          { role: 'system', content: `Você é um copywriter de elite. ${tones[tone]}. Gere texto em PT-BR.` },
          { role: 'user', content: context },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });
    if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.error('[OpenAI] Erro:', err);
    return null;
  }
}

/**
 * Hook React para OpenAI
 */
import { useState, useCallback } from 'react';

export function useOpenAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImg = useCallback(async (prompt: string) => {
    setLoading(true);
    setError(null);
    try {
      return await generateImage({ prompt });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const generate = useCallback(async (context: string, tone?: 'direct' | 'premium' | 'urgency') => {
    setLoading(true);
    setError(null);
    try {
      return await generateCopy(context, tone);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { generateImg, generate, loading, error, isConfigured: !!OPENAI_API_KEY };
}
