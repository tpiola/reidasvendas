/**
 * WebMCP — expõe as capacidades reais do site como ferramentas para agentes de IA.
 *
 * Especificação: W3C Web Machine Learning Community Group
 * (https://github.com/webmachinelearning/webmcp). Status em setembro de 2026: origin trial
 * público no Chrome 149 a 156 (opt-in, Edge atrás de flag, Firefox e Safari apenas observando).
 *
 * A partir do rascunho de 21/07/2026 a superfície correta é `document.modelContext`; o antigo
 * `navigator.modelContext` está depreciado no Chrome 150 e aqui permanece apenas como fallback.
 * O único agente consumidor hoje é o Gemini no Chrome, com adoção real perto de zero: por isso
 * a API é detectada em tempo de execução e, quando não existe, nada acontece — sem exceção,
 * sem efeito colateral e sem impacto na experiência de quem visita o site.
 *
 * Regra de honestidade do site: nenhum preço, prazo, número de clientes ou métrica é inventado
 * aqui. As ferramentas devolvem rótulos qualitativos, simulações matemáticas com os valores
 * informados pelo próprio chamador e o link da ferramenta oficial — o site não publica preços.
 *
 * Os tipos são declarados localmente de propósito: o pacote oficial (`webmcp-types`) não é
 * dependência deste projeto e não deve ser instalado por causa deste módulo.
 */
import { BRAND } from './brand';

/** JSON Schema reduzido ao que as ferramentas do site realmente usam. */
export type WebMcpInputSchema = {
  type: 'object';
  properties: Record<string, unknown>;
  required?: string[];
  additionalProperties?: boolean;
};

/** Ferramenta registrada no contexto do modelo, no formato aceito por `registerTool`. */
export type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: WebMcpInputSchema;
  execute: (input?: Record<string, unknown>) => unknown;
};

/** Superfície mínima da API do WebMCP disponível no navegador. */
export type ModelContext = {
  registerTool: (tool: WebMcpTool) => unknown;
  unregisterTool?: (name: string) => unknown;
  provideContext?: (context: unknown) => unknown;
};

export type RegisterSiteToolsResult = {
  registered: string[];
  errors: string[];
  supported: boolean;
};

type UnknownRecord = Record<string, unknown>;

const ROUTES = {
  precoSite: '/ferramentas/calculadora-preco-site',
  roi: '/ferramentas/calculadora-roi',
  perdaVendas: '/ferramentas/calculadora-perda-vendas',
  briefing: '/ferramentas/gerador-de-briefing',
  diagnostico: '/diagnostico',
} as const;

const AVISO_SIMULACAO = 'Simulação matemática com valores informados por você. Não representa proposta, preço, garantia de resultado nem compromisso comercial.';

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

function asRecord(input?: UnknownRecord): UnknownRecord {
  return input && typeof input === 'object' ? input : {};
}

function lerNumero(input: UnknownRecord, chave: string, padrao: number): number {
  const bruto = input[chave];
  if (typeof bruto === 'number' && Number.isFinite(bruto)) return bruto;
  if (typeof bruto === 'string' && bruto.trim() !== '') {
    const convertido = Number(bruto);
    if (Number.isFinite(convertido)) return convertido;
  }
  return padrao;
}

function lerBooleano(input: UnknownRecord, chave: string, padrao: boolean): boolean {
  const bruto = input[chave];
  if (typeof bruto === 'boolean') return bruto;
  if (typeof bruto === 'string') {
    if (['true', 'sim', '1'].includes(bruto.trim().toLowerCase())) return true;
    if (['false', 'nao', 'não', '0'].includes(bruto.trim().toLowerCase())) return false;
  }
  return padrao;
}

function lerTexto(input: UnknownRecord, chave: string): string {
  const bruto = input[chave];
  return typeof bruto === 'string' ? bruto.trim() : '';
}

function limitar(valor: number, minimo: number, maximo: number): number {
  return Math.min(Math.max(valor, minimo), maximo);
}

/** Rótulo qualitativo derivado das horas de referência da própria calculadora do site. */
function portePorHoras(horas: number): string {
  if (horas <= 35) return 'escopo enxuto';
  if (horas <= 70) return 'escopo intermediário';
  return 'escopo amplo';
}

/**
 * Recupera o contexto de modelo disponível no navegador.
 * Aceita `document.modelContext` (atual) e `navigator.modelContext` (depreciado) e devolve
 * `null` quando a API não existe ou não expõe `registerTool`.
 */
export function getModelContext(): ModelContext | null {
  try {
    if (typeof document === 'undefined' && typeof navigator === 'undefined') return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = typeof document === 'undefined' ? undefined : (document as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = typeof navigator === 'undefined' ? undefined : (navigator as any);
    const mc = doc?.modelContext ?? nav?.modelContext;
    return mc && typeof mc.registerTool === 'function' ? (mc as ModelContext) : null;
  } catch {
    return null;
  }
}

export function buildSiteTools(): WebMcpTool[] {
  return [
    {
      name: 'calcular-investimento-site',
      description: 'Estima o esforço de um projeto de site a partir da quantidade de páginas, integrações e apoio de conteúdo. Usa exatamente a fórmula da calculadora pública /ferramentas/calculadora-preco-site e devolve horas de referência e um rótulo qualitativo de porte. O site não publica preços: nenhum valor monetário é devolvido aqui. Para ver a faixa em reais, abra a calculadora e informe o seu valor-hora de referência.',
      inputSchema: {
        type: 'object',
        properties: {
          paginas: { type: 'integer', minimum: 1, maximum: 100, default: 5, description: 'Quantidade prevista de páginas do site.' },
          integracoes: { type: 'integer', minimum: 0, maximum: 30, default: 1, description: 'Integrações necessárias, como formulário, WhatsApp contextual ou automação.' },
          incluirConteudo: { type: 'boolean', default: true, description: 'Considera o esforço de organização de conteúdo.' },
          valorHora: { type: 'number', minimum: 1, description: 'Valor-hora de referência em reais. Opcional e não utilizado no resultado: existe apenas na calculadora do site, que é onde a faixa é exibida.' },
        },
        additionalProperties: false,
      },
      execute: (entrada) => {
        const input = asRecord(entrada);
        const paginas = limitar(Math.round(lerNumero(input, 'paginas', 5)), 1, 100);
        const integracoes = limitar(Math.round(lerNumero(input, 'integracoes', 1)), 0, 30);
        const incluirConteudo = lerBooleano(input, 'incluirConteudo', true);
        const horasDeReferencia = 12 + paginas * 5 + integracoes * 8 + (incluirConteudo ? paginas * 2 : 0);
        return {
          ferramenta: 'calculadora-preco-site',
          url: ROUTES.precoSite,
          horasDeReferencia,
          porteQualitativo: portePorHoras(horasDeReferencia),
          formulaAplicada: '12 horas de base + 5 horas por página + 8 horas por integração + 2 horas por página quando há apoio de conteúdo.',
          parametrosConsiderados: { paginas, integracoes, incluirConteudo },
          resultadoMonetario: null,
          observacao: `O site não publica preços e esta ferramenta não devolve valores em reais. A faixa monetária da calculadora depende do valor-hora informado por você na página ${ROUTES.precoSite}. ${AVISO_SIMULACAO}`,
        };
      },
    },
    {
      name: 'calcular-roi-comercial',
      description: 'Simula o retorno de um cenário comercial com base em investimento, volume de leads, taxa de fechamento e ticket médio informados por você. Aplica a mesma fórmula da página /ferramentas/calculadora-roi.',
      inputSchema: {
        type: 'object',
        properties: {
          investimento: { type: 'number', minimum: 1, default: 3000, description: 'Investimento considerado no período, em reais.' },
          leads: { type: 'number', minimum: 0, default: 30, description: 'Quantidade de leads considerada no período.' },
          taxaFechamento: { type: 'number', minimum: 0, maximum: 100, default: 15, description: 'Taxa de fechamento estimada, em porcentagem.' },
          ticketMedio: { type: 'number', minimum: 0, default: 1200, description: 'Ticket médio informado, em reais.' },
        },
        additionalProperties: false,
      },
      execute: (entrada) => {
        const input = asRecord(entrada);
        const investimento = Math.max(0, lerNumero(input, 'investimento', 3000));
        const leads = Math.max(0, lerNumero(input, 'leads', 30));
        const taxaFechamento = limitar(lerNumero(input, 'taxaFechamento', 15), 0, 100);
        const ticketMedio = Math.max(0, lerNumero(input, 'ticketMedio', 1200));
        const receitaSimulada = (leads * taxaFechamento) / 100 * ticketMedio;
        const roiPercentual = investimento > 0 ? ((receitaSimulada - investimento) / investimento) * 100 : 0;
        return {
          ferramenta: 'calculadora-roi',
          url: ROUTES.roi,
          receitaSimulada,
          receitaSimuladaFormatada: moeda.format(receitaSimulada),
          roiPercentual: Number(roiPercentual.toFixed(1)),
          formulaAplicada: '(receita estimada − investimento) ÷ investimento × 100, onde receita estimada = leads × taxa de fechamento × ticket médio.',
          parametrosConsiderados: { investimento, leads, taxaFechamento, ticketMedio },
          observacao: `Não considera impostos, margem, recompra nem custos adicionais. ${AVISO_SIMULACAO}`,
        };
      },
    },
    {
      name: 'calcular-perda-vendas',
      description: 'Compara a conversão atual com uma conversão de referência informada e mostra a diferença potencial de receita no período. Aplica a mesma fórmula da página /ferramentas/calculadora-perda-vendas.',
      inputSchema: {
        type: 'object',
        properties: {
          visitasMensais: { type: 'number', minimum: 0, default: 1000, description: 'Visitas mensais consideradas.' },
          conversaoAtual: { type: 'number', minimum: 0, maximum: 100, default: 1.2, description: 'Conversão atual, em porcentagem.' },
          conversaoReferencia: { type: 'number', minimum: 0, maximum: 100, default: 2, description: 'Conversão de referência informada por você, em porcentagem.' },
          ticketMedio: { type: 'number', minimum: 0, default: 350, description: 'Ticket médio informado, em reais.' },
        },
        additionalProperties: false,
      },
      execute: (entrada) => {
        const input = asRecord(entrada);
        const visitasMensais = Math.max(0, lerNumero(input, 'visitasMensais', 1000));
        const conversaoAtual = limitar(lerNumero(input, 'conversaoAtual', 1.2), 0, 100);
        const conversaoReferencia = limitar(lerNumero(input, 'conversaoReferencia', 2), 0, 100);
        const ticketMedio = Math.max(0, lerNumero(input, 'ticketMedio', 350));
        const vendasAtuais = (visitasMensais * conversaoAtual) / 100;
        const vendasReferencia = (visitasMensais * conversaoReferencia) / 100;
        const conversoesAdicionais = Math.max(0, vendasReferencia - vendasAtuais);
        const valorPotencialMensal = conversoesAdicionais * ticketMedio;
        return {
          ferramenta: 'calculadora-perda-vendas',
          url: ROUTES.perdaVendas,
          conversoesAdicionais: Number(conversoesAdicionais.toFixed(1)),
          valorPotencialMensal,
          valorPotencialMensalFormatado: moeda.format(valorPotencialMensal),
          formulaAplicada: 'visitas × diferença entre as taxas informadas × ticket médio.',
          parametrosConsiderados: { visitasMensais, conversaoAtual, conversaoReferencia, ticketMedio },
          observacao: `Diferença matemática entre os dois cenários que você informou. ${AVISO_SIMULACAO}`,
        };
      },
    },
    {
      name: 'gerar-briefing',
      description: 'Organiza empresa, público, oferta, objetivo e requisitos em um briefing estruturado, pronto para discussão de escopo. Mesma estrutura da página /ferramentas/gerador-de-briefing. Campos não informados ficam de fora do texto.',
      inputSchema: {
        type: 'object',
        properties: {
          empresa: { type: 'string', description: 'Empresa ou segmento.' },
          publico: { type: 'string', description: 'Público atendido.' },
          oferta: { type: 'string', description: 'Oferta ou serviço principal.' },
          objetivo: { type: 'string', description: 'Objetivo prioritário ou problema a resolver.' },
          requisitos: { type: 'string', description: 'Requisitos, canais, integrações ou restrições.' },
        },
        additionalProperties: false,
      },
      execute: (entrada) => {
        const input = asRecord(entrada);
        const campos = [
          { chave: 'empresa', rotulo: 'Empresa / segmento' },
          { chave: 'publico', rotulo: 'Público principal' },
          { chave: 'oferta', rotulo: 'Oferta / solução' },
          { chave: 'objetivo', rotulo: 'Objetivo prioritário' },
          { chave: 'requisitos', rotulo: 'Requisitos ou restrições' },
        ];
        const preenchidos = campos
          .map((campo) => ({ rotulo: campo.rotulo, valor: lerTexto(input, campo.chave) }))
          .filter((campo) => campo.valor !== '');
        return {
          ferramenta: 'gerador-de-briefing',
          url: ROUTES.briefing,
          briefing: preenchidos.map((campo) => `${campo.rotulo}: ${campo.valor}`).join('\n'),
          camposPreenchidos: preenchidos.length,
          totalCampos: campos.length,
          observacao: preenchidos.length === 0
            ? `Informe ao menos um campo (empresa, público, oferta, objetivo ou requisitos) para gerar o briefing, ou preencha o formulário em ${ROUTES.briefing}.`
            : 'Use este resumo como ponto de partida para discutir arquitetura e escopo. Nenhum dado foi inventado: o texto reproduz apenas o que foi informado.',
        };
      },
    },
    {
      name: 'abrir-diagnostico',
      description: 'Abre a página de diagnóstico do site (/diagnostico), onde o visitante informa negócio, solução necessária, problema comercial e faixa de investimento antes do atendimento pelo WhatsApp.',
      inputSchema: {
        type: 'object',
        properties: {
          origem: { type: 'string', description: 'Contexto opcional de origem do encaminhamento, usado somente como informação de retorno.' },
        },
        additionalProperties: false,
      },
      execute: (entrada) => {
        const origem = lerTexto(asRecord(entrada), 'origem');
        let navegou = false;
        try {
          if (typeof window !== 'undefined' && window.location) {
            window.location.assign(ROUTES.diagnostico);
            navegou = true;
          }
        } catch {
          navegou = false;
        }
        return { url: ROUTES.diagnostico, navegou, origem: origem || null };
      },
    },
    {
      name: 'falar-no-whatsapp',
      description: `Devolve o link oficial do WhatsApp do ${BRAND.name} para continuidade do atendimento humano. Aceita uma mensagem inicial opcional, sempre prefixada pelo contexto padrão do site.`,
      inputSchema: {
        type: 'object',
        properties: {
          mensagem: { type: 'string', description: 'Mensagem inicial opcional enviada junto com o link.' },
        },
        additionalProperties: false,
      },
      execute: (entrada) => {
        const mensagem = lerTexto(asRecord(entrada), 'mensagem');
        const url = mensagem ? `${BRAND.whatsapp.split('?')[0]}?text=${encodeURIComponent(mensagem)}` : BRAND.whatsapp;
        return {
          url,
          numero: BRAND.phone,
          telefoneExibido: BRAND.phoneDisplay,
          observacao: 'Link oficial do WhatsApp. O atendimento é humano e continua a partir do diagnóstico já iniciado.',
        };
      },
    },
  ];
}

/** Nomes das ferramentas expostas por este módulo. */
export const SITE_TOOL_NAMES: string[] = buildSiteTools().map((tool) => tool.name);

/**
 * Registra as ferramentas do site no contexto de modelo, quando a API existir.
 * Cada registro é isolado: se um falhar, os demais continuam e o nome problemático entra em `errors`.
 * Nunca lança — devolve `{ registered: [], errors: [], supported: false }` quando não há suporte.
 */
export async function registerSiteTools(): Promise<RegisterSiteToolsResult> {
  const resultado: RegisterSiteToolsResult = { registered: [], errors: [], supported: false };
  try {
    const mc = getModelContext();
    if (!mc) return resultado;
    resultado.supported = true;
    for (const tool of buildSiteTools()) {
      try {
        await mc.registerTool(tool);
        resultado.registered.push(tool.name);
      } catch {
        resultado.errors.push(tool.name);
      }
    }
  } catch {
    // Qualquer falha inesperada da API é tratada como ausência de suporte.
  }
  return resultado;
}

let instalado = false;
let instalacaoEmCurso: Promise<boolean> | null = null;

/**
 * Instala as ferramentas uma única vez. Não faz nada quando a API não existe e nunca lança.
 * Chamar esta função não é necessário no import do módulo: a ativação deve ser feita por quem
 * controla o ciclo de vida da aplicação.
 */
export function installWebMcp(): Promise<boolean> {
  if (instalado) return Promise.resolve(true);
  if (instalacaoEmCurso) return instalacaoEmCurso;
  instalacaoEmCurso = (async () => {
    try {
      const resultado = await registerSiteTools();
      const ok = resultado.supported && resultado.registered.length > 0;
      if (ok) instalado = true;
      return ok;
    } catch {
      return false;
    }
  })();
  instalacaoEmCurso = instalacaoEmCurso.then((ok) => {
    if (!ok) instalacaoEmCurso = null;
    return ok;
  });
  return instalacaoEmCurso;
}
