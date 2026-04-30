export async function triggerN8nWorkflow(
  workflowUrl: string,
  data: Record<string, unknown> = {}
) {
  const n8nApiToken = import.meta.env.VITE_N8N_API_TOKEN; // Para Vite, prefixo VITE_ é necessário

  if (!n8nApiToken) {
    console.error(
      'N8N_API_TOKEN não está configurado. Verifique seu arquivo .env.local.'
    );
    throw new Error('N8N_API_TOKEN não configurado.');
  }

  try {
    const response = await fetch(workflowUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${n8nApiToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Falha ao disparar workflow n8n: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao disparar workflow n8n:', error);
    throw error;
  }
}
