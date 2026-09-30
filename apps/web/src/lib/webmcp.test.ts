import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  SITE_TOOL_NAMES,
  getModelContext,
  installWebMcp,
  registerSiteTools,
} from './webmcp';

type ModelContextLike = { modelContext?: unknown };

function limparModelContext() {
  delete (document as unknown as ModelContextLike).modelContext;
  delete (navigator as unknown as ModelContextLike).modelContext;
}

function definirModelContext(origem: 'document' | 'navigator', valor: unknown) {
  const alvo: ModelContextLike = origem === 'document' ? (document as unknown as ModelContextLike) : (navigator as unknown as ModelContextLike);
  Object.defineProperty(alvo, 'modelContext', { value: valor, configurable: true, writable: true });
}

const FERRAMENTAS_ESPERADAS = [
  'calcular-investimento-site',
  'calcular-roi-comercial',
  'calcular-perda-vendas',
  'gerar-briefing',
  'abrir-diagnostico',
  'falar-no-whatsapp',
];

beforeEach(() => {
  limparModelContext();
});

afterEach(() => {
  limparModelContext();
  vi.restoreAllMocks();
});

describe('getModelContext', () => {
  it('devolve null quando a API não existe em document nem em navigator', () => {
    expect(getModelContext()).toBeNull();
  });

  it('devolve null quando o objeto existe mas não expõe registerTool', () => {
    definirModelContext('document', { provideContext: () => undefined });
    expect(getModelContext()).toBeNull();
  });

  it('aceita document.modelContext (forma atual da especificação)', () => {
    const mc = { registerTool: () => undefined };
    definirModelContext('document', mc);
    expect(getModelContext()).toBe(mc);
  });

  it('usa navigator.modelContext como fallback (forma depreciada)', () => {
    const mc = { registerTool: () => undefined };
    definirModelContext('navigator', mc);
    expect(getModelContext()).toBe(mc);
  });
});

describe('registerSiteTools', () => {
  it('retorna { supported: false } e nenhum registro quando não há API', async () => {
    const resultado = await registerSiteTools();
    expect(resultado.supported).toBe(false);
    expect(resultado.registered).toEqual([]);
    expect(resultado.errors).toEqual([]);
  });

  it('registra as ferramentas esperadas quando o modelContext está disponível', async () => {
    const nomes: string[] = [];
    const mc = {
      registerTool: (tool: { name: string }) => {
        nomes.push(tool.name);
        return undefined;
      },
    };
    definirModelContext('document', mc);

    const resultado = await registerSiteTools();

    expect(resultado.supported).toBe(true);
    expect(resultado.errors).toEqual([]);
    expect(nomes).toEqual(FERRAMENTAS_ESPERADAS);
    expect(resultado.registered).toEqual(FERRAMENTAS_ESPERADAS);
    expect(SITE_TOOL_NAMES).toEqual(FERRAMENTAS_ESPERADAS);
  });

  it('continua registrando as demais quando uma ferramenta falha', async () => {
    const nomes: string[] = [];
    const mc = {
      registerTool: (tool: { name: string }) => {
        if (tool.name === 'calcular-roi-comercial') throw new Error('falha simulada');
        nomes.push(tool.name);
      },
    };
    definirModelContext('navigator', mc);

    const resultado = await registerSiteTools();

    expect(resultado.supported).toBe(true);
    expect(resultado.errors).toEqual(['calcular-roi-comercial']);
    expect(resultado.registered).toEqual(FERRAMENTAS_ESPERADAS.filter((nome) => nome !== 'calcular-roi-comercial'));
  });

  it('não devolve valor monetário inventado na ferramenta de investimento', async () => {
    const registradas: Record<string, { execute: (input?: Record<string, unknown>) => unknown }> = {};
    definirModelContext('document', {
      registerTool: (tool: { name: string; execute: (input?: Record<string, unknown>) => unknown }) => {
        registradas[tool.name] = tool;
      },
    });

    await registerSiteTools();
    const resultado = registradas['calcular-investimento-site'].execute({ paginas: 5, integracoes: 1, incluirConteudo: true }) as Record<string, unknown>;

    expect(resultado.horasDeReferencia).toBe(12 + 5 * 5 + 1 * 8 + 5 * 2);
    expect(resultado.resultadoMonetario).toBeNull();
    expect(resultado.url).toBe('/ferramentas/calculadora-preco-site');
    expect(typeof resultado.porteQualitativo).toBe('string');
    expect(JSON.stringify(resultado)).not.toContain('R$');
  });

  it('devolve o link oficial do WhatsApp com o número real da marca', async () => {
    const registradas: Record<string, { execute: (input?: Record<string, unknown>) => unknown }> = {};
    definirModelContext('document', {
      registerTool: (tool: { name: string; execute: (input?: Record<string, unknown>) => unknown }) => {
        registradas[tool.name] = tool;
      },
    });

    await registerSiteTools();
    const resultado = registradas['falar-no-whatsapp'].execute({}) as Record<string, unknown>;

    expect(resultado.numero).toBe('5516992333344');
    expect(String(resultado.url)).toContain('wa.me/5516992333344');
  });

  it('devolve a rota do diagnóstico na ferramenta abrir-diagnostico', async () => {
    const registradas: Record<string, { execute: (input?: Record<string, unknown>) => unknown }> = {};
    definirModelContext('document', {
      registerTool: (tool: { name: string; execute: (input?: Record<string, unknown>) => unknown }) => {
        registradas[tool.name] = tool;
      },
    });

    await registerSiteTools();
    const resultado = registradas['abrir-diagnostico'].execute({}) as Record<string, unknown>;

    expect(resultado.url).toBe('/diagnostico');
  });
});

describe('installWebMcp', () => {
  it('não lança e devolve false quando a API não existe', async () => {
    await expect(installWebMcp()).resolves.toBe(false);
  });

  it('instala uma única vez quando a API existe', async () => {
    vi.resetModules();
    const nomes: string[] = [];
    definirModelContext('document', {
      registerTool: (tool: { name: string }) => {
        nomes.push(tool.name);
      },
    });
    const atual = await import('./webmcp');

    await expect(atual.installWebMcp()).resolves.toBe(true);
    await expect(atual.installWebMcp()).resolves.toBe(true);

    expect(nomes).toEqual(FERRAMENTAS_ESPERADAS);
  });

  it('não lança quando registerTool falha em todas as ferramentas', async () => {
    vi.resetModules();
    definirModelContext('document', {
      registerTool: () => {
        throw new Error('falha simulada');
      },
    });
    const atual = await import('./webmcp');

    await expect(atual.installWebMcp()).resolves.toBe(false);
  });
});
