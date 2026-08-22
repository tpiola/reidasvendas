import { describe, expect, it } from 'vitest';
import { COMPARISONS, DEMONSTRATIONS, GROWTH_SEO, GUIDES, LOCAL_PAGES, SOLUTIONS, TOOLS } from './growth';

describe('arquitetura de aquisição soberana', () => {
  it('mantém páginas comerciais únicas e canônicas', () => {
    const paths = GROWTH_SEO.map((entry) => entry.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain('/solucoes');
    expect(paths).toContain('/diagnostico');
    expect(paths).toContain('/solucoes/catalogo-para-representantes');
    expect(paths).toContain('/alternativas/wix');
    expect(paths).toContain('/ferramentas/calculadora-roi');
  });

  it('conecta soluções relacionadas e demonstrações existentes', () => {
    const solutionSlugs = new Set(SOLUTIONS.map((entry) => entry.slug));
    const demonstrationSlugs = new Set(DEMONSTRATIONS.map((entry) => entry.slug));

    for (const solution of SOLUTIONS) {
      expect(solution.architecture.length).toBeGreaterThanOrEqual(3);
      expect(solution.questions.length).toBeGreaterThan(0);
      for (const related of solution.related) expect(solutionSlugs.has(related)).toBe(true);
      if (solution.demonstration) expect(demonstrationSlugs.has(solution.demonstration)).toBe(true);
    }
  });

  it('publica páginas locais curadas e contextualizadas', () => {
    expect(new Set(LOCAL_PAGES.map((entry) => entry.context)).size).toBe(LOCAL_PAGES.length);
    for (const location of LOCAL_PAGES) {
      expect(location.context).toContain(location.city);
      expect(location.priorities.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('mantém o inventário comercial mínimo solicitado', () => {
    expect(SOLUTIONS.length).toBeGreaterThanOrEqual(11);
    expect(COMPARISONS.length).toBe(4);
    expect(GUIDES.length).toBe(6);
    expect(TOOLS.length).toBe(5);
    expect(DEMONSTRATIONS.length).toBe(4);
  });
});
