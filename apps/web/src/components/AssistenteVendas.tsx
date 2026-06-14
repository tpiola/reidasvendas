/* ═══════════════════════════════════════════
   ASSISTENTEVENDAS.TSX — Rei das Vendas
   Robô assistente de IA que VENDE (fecha negócios)
   Funil de vendas completo com coleta de lead
   DeepSeek API + fallback local
═══════════════════════════════════════════ */

import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { servicos, nichos, casesSucesso } from '@/data/plataforma';
import { PLANS_HUB } from '@/data/plans';
import { BRAND } from '@/lib/brand';

/* ─── Tipos ──────────────────────────────── */

type FunnelStep = 'initial' | 'nome' | 'whatsapp' | 'ramo' | 'necessidade' | 'solucao' | 'agendar' | 'lead_enviado' | 'chat_livre';

type ChatMessage = {
  role: 'bot' | 'user';
  text: string;
  options?: { label: string; value: string }[];
};

type LeadData = {
  nome: string;
  whatsapp: string;
  ramo: string;
  necessidade: string;
};

type SolucaoMapada = {
  titulo: string;
  descricao: string;
  preco: string;
  prazo: string;
  beneficioExtra: string;
};

/* ─── Dados de conhecimento do robô ────── */

const RAMOS = [
  { label: 'Calçadista', value: 'Calcadista' },
  { label: 'Comércio', value: 'Comercio' },
  { label: 'Indústria', value: 'Industria' },
  { label: 'Saúde', value: 'Saude' },
  { label: 'Educação', value: 'Educacao' },
  { label: 'Serviços', value: 'Servicos' },
  { label: 'Outro', value: 'Outro' },
];

const NECESSIDADES = [
  { label: 'Site', value: 'site' },
  { label: 'App', value: 'app' },
  { label: 'Automação', value: 'automacao' },
  { label: 'Dashboard', value: 'dashboard' },
  { label: 'Mentoria', value: 'mentoria' },
  { label: 'Vários / Não sei', value: 'varios' },
];

function getSolucao(necessidade: string, ramo: string): SolucaoMapada {
  const servico = servicos.find(s => s.id === necessidade);
  const nicho = nichos.find(n => n.id === ramo.toLowerCase());

  if (necessidade === 'varios' || !servico) {
    return {
      titulo: 'Pacote Completo Rei das Vendas',
      descricao: `Para o setor ${nicho?.nome || ramo}, oferecemos uma solução integrada com site, sistema e automação. Tudo que você precisa para vender mais, num só lugar.`,
      preco: 'A partir de R$ 997/mês',
      prazo: 'Projeto completo em 2 a 4 semanas',
      beneficioExtra: 'Diagnóstico gratuito incluso — nossa equipe vai mapear seu negócio antes de qualquer investimento.',
    };
  }

  const planosTexto: Record<string, string> = {
    site: 'O plano Essencial (R$ 497/mês) é ideal para sites. Prazo médio de 72h para a primeira versão.',
    app: 'O plano Crescimento (R$ 997/mês) ou Escala (R$ 1.997/mês) são os mais indicados para apps, dependendo da complexidade.',
    automacao: 'Automações e integrações entram no plano Crescimento (R$ 997/mês) ou como módulo adicional.',
    dashboard: 'Dashboards e BI estão inclusos nos planos Crescimento e Escala.',
    mentoria: 'Mentoria e consultoria estratégica a partir de R$ 1.997/mês.',
  };

  return {
    titulo: servico.titulo,
    descricao: `${servico.descricao} Perfeito para o setor ${nicho?.nome || ramo}.`,
    preco: servico.precoBase,
    prazo: servico.id === 'sites' ? 'Primeira versão em até 72h' : 'Projeto em 2 a 4 semanas',
    beneficioExtra: planosTexto[servico.id] || 'Consulte nossos planos para mais detalhes.',
  };
}

function getCaseRelacionado(ramo: string): string {
  const caso = casesSucesso.find(c => c.nicho.toLowerCase() === ramo.toLowerCase());
  if (caso) {
    return `💡 Case real: **${caso.cliente}** (${caso.nicho}) — ${caso.resultado}. ${caso.descricao}`;
  }
  return '';
}

/* ─── Respostas para chat livre (fallback) ─── */

function buscarRespostaLivre(texto: string): string {
  const t = texto.toLowerCase();

  // Preços
  if (/preç[oai]|valor|custa|quanto|investimento|plano/i.test(t)) {
    return `Temos planos a partir de:\n• **Essencial** — R$ 497/mês (site + SEO)\n• **Crescimento** — R$ 997/mês (funil + automação)\n• **Escala** — R$ 1.997/mês (tráfego + IA)\n• **Sob Medida** — orçamento personalizado\n\nQual deles mais combina com seu momento?`;
  }

  // Prazos
  if (/prazo|quanto tempo|72h|entrega|quando fica pronto/i.test(t)) {
    return '**Prazos médios:**\n• Site institucional/landing: **72h** após aprovação\n• Aplicativo: **2 a 4 semanas**\n• Automação: **1 a 2 semanas**\n• Projeto completo: **2 a 4 semanas**\n\nTudo com cronograma transparente e entregas parciais.';
  }

  // Nichos
  if (/nicho|segmento|setor|ramo|franca/i.test(t)) {
    const nichosLista = nichos.map(n => `• **${n.nome}** — ${n.fraseDeEfeito}`).join('\n');
    return `Atendemos todos os setores de Franca e região:\n${nichosLista}\n\nQual é o seu ramo?`;
  }

  // Cases
  if (/case|resultado|cliente|sucesso|número/i.test(t)) {
    const cases = casesSucesso.slice(0, 3).map(c => `• **${c.cliente}** (${c.nicho}) — ${c.resultado}`).join('\n');
    return `Resultados reais de clientes:\n${cases}\n\nQuer ver mais detalhes de algum case específico?`;
  }

  // Diferenciais
  if (/diferencial|por que|vantagem|diferente|exclusivo/i.test(t)) {
    return 'Nossos diferenciais:\n• **Suporte local** — estamos em Franca, atendemos presencialmente\n• **Design exclusivo** — nada de template genérico\n• **SEO incluso** — apareça no Google desde o dia 1\n• **Sem fidelidade** — você renova quando sentir resultado\n• **Diagnóstico gratuito** — sem compromisso';
  }

  // Diagnóstico / contato
  if (/diagn[oó]stico|orçamento|contratar|quero|agendar/i.test(t)) {
    return 'Ótimo! Para solicitar um diagnóstico gratuito, é rápido: vou te guiar por 3 perguntas e já encaminho para nossa equipe. Posso começar? 😊';
  }

  // WhatsApp
  if (/whatsapp|zap|telefone|ligar|falar com/i.test(t)) {
    return `Claro! Você pode falar conosco diretamente pelo WhatsApp: ${BRAND.whatsappLink}\n\nOu se preferir, posso te guiar por um diagnóstico rápido agora mesmo.`;
  }

  return '';
}

/* ─── DeepSeek API call ─────────────────── */

const DEEPSEEK_API = 'https://api.deepseek.com/v1/chat/completions';
const SYSTEM_PROMPT = `Você é o assistente digital da Rei das Vendas, uma agência digital de Franca-SP. 
Seu objetivo é VENDER — guiar o usuário por um funil de vendas e agendar um diagnóstico gratuito.

INFORMAÇÕES DA EMPRESA:
- Nome: Rei das Vendas (reidasvendas.com.br)
- Cidade: Franca/SP
- WhatsApp: ${BRAND.whatsappLink}
- Email: contato@reidasvendas.com.br

PLANOS:
- Essencial: R$ 497/mês (site, SEO, WhatsApp integrado)
- Crescimento: R$ 997/mês (funil, n8n, CRM, relatórios)
- Escala: R$ 1.997/mês (tráfego, IA, dashboard executivo)
- Sob Medida: orçamento personalizado

SERVIÇOS: Sites profissionais, Aplicativos Mobile/Web, Automações n8n, Dashboards, Mentoria

NICHOS: Calçadista, Comércio, Indústria, Saúde, Educação, Serviços

CASES DE SUCESSO:
- Farmácia Bem Estar: +180% contato WhatsApp no 1º mês
- Calçados Martini: Catálogo online com 340% mais visualizações
- Oficina do Povo: Agenda lotada 15 dias antes
- Supermercado Nova Era: R$ 50 mil em vendas online no 1º mês

DIFERENCIAIS: Suporte local em Franca, design exclusivo, SEO incluso, sem fidelidade obrigatória

REGRAS:
1. Seja entusiasmado e persuasivo — você é um VENDEDOR
2. Sempre direcione para o diagnóstico gratuito
3. Responda em português do Brasil
4. Seja breve e direto (máximo 3 parágrafos)
5. Mencione cases de sucesso quando relevante
6. Se perguntarem preço, cite os planos
7. NUNCA invente informações que não estão acima`;

async function consultarDeepSeek(mensagem: string): Promise<string | null> {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(DEEPSEEK_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: mensagem },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch {
    return null;
  }
}

/* ─── Storage helpers ──────────────────── */

const STORAGE_LEAD_KEY = 'rdv-assistente-lead';
const STORAGE_CHAT_KEY = 'rdv-assistente-chat';
const STORAGE_OPEN_KEY = 'rdv-assistente-open';

function loadLead(): Partial<LeadData> {
  try {
    const raw = localStorage.getItem(STORAGE_LEAD_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLead(data: Partial<LeadData>) {
  try {
    localStorage.setItem(STORAGE_LEAD_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

function saveChat(messages: ChatMessage[]) {
  try {
    localStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(messages.slice(-50)));
  } catch { /* ignore */ }
}

function loadChat(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_CHAT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function clearLead() {
  try {
    localStorage.removeItem(STORAGE_LEAD_KEY);
    localStorage.removeItem(STORAGE_CHAT_KEY);
  } catch { /* ignore */ }
}

/* ─── SVG do Robô ──────────────────────── */

function RobotIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <rect x="9" y="2" width="6" height="5" rx="1" />
      <circle cx="9" cy="12" r="1.2" fill="currentColor" />
      <circle cx="15" cy="12" r="1.2" fill="currentColor" />
      <line x1="9" y1="16" x2="15" y2="16" />
      <line x1="2" y1="11" x2="3" y2="11" />
      <line x1="22" y1="11" x2="21" y2="11" />
      <path d="M7 19v2" />
      <path d="M17 19v2" />
    </svg>
  );
}

/* ─── Componente Principal ──────────────── */

export function AssistenteVendas() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<FunnelStep>('initial');
  const [lead, setLead] = useState<Partial<LeadData>>(loadLead);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ─── Abrir automaticamente após delay ── */
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_OPEN_KEY)) return;
    } catch { /* ignore */ }

    const timer = setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(STORAGE_OPEN_KEY, '1');
      } catch { /* ignore */ }
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  /* ─── Carregar mensagens anteriores ───── */
  useEffect(() => {
    if (open && messages.length === 0) {
      const saved = loadChat();
      if (saved.length > 0) {
        setMessages(saved);
        const lastStep = saved[saved.length - 1];
        if (lastStep?.role === 'bot' && lastStep.options) {
          // Determine current step from context
          if (lead.nome && !lead.whatsapp) setStep('whatsapp');
          else if (lead.whatsapp && !lead.ramo) setStep('ramo');
          else if (lead.ramo && !lead.necessidade) setStep('necessidade');
          else if (lead.necessidade) setStep('solucao');
          else setStep('chat_livre');
        }
      } else {
        startFunnel();
      }
    }
  }, [open]);

  /* ─── Scroll pra baixo automaticamente ── */
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [messages, open]);

  /* ─── Foco no input ───────────────────── */
  useEffect(() => {
    if (open && (step === 'chat_livre' || step === 'initial')) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, step]);

  /* ─── Iniciar funil ───────────────────── */
  function startFunnel() {
    setStep('nome');
    setMessages([{
      role: 'bot',
      text: `Olá! Eu sou o assistente digital da **Rei das Vendas**. 👋

Posso explicar como funcionam nossos serviços, mostrar cases de sucesso e até preparar um orçamento personalizado para seu negócio.

**Vamos começar?** Para isso, preciso de algumas informações rápidas.

Qual seu **nome**?`,
    }]);
  }

  /* ─── Avançar no funil ───────────────── */
  function advanceStep(value: string) {
    let newStep: FunnelStep = step;
    const newLead = { ...lead };

    switch (step) {
      case 'nome': {
        newLead.nome = value;
        newStep = 'whatsapp';
        setMessages(prev => [
          ...prev,
          { role: 'user', text: value },
          { role: 'bot', text: `Prazer, ${value}! 😊

Agora, qual seu **WhatsApp** com DDD? (Ex.: 16 99999-0000)` },
        ]);
        break;
      }
      case 'whatsapp': {
        newLead.whatsapp = value;
        newStep = 'ramo';
        setMessages(prev => [
          ...prev,
          { role: 'user', text: value },
          { role: 'bot', text: 'Perfeito! Qual o **ramo do seu negócio**?', options: RAMOS },
        ]);
        break;
      }
      case 'ramo': {
        newLead.ramo = value;
        newStep = 'necessidade';
        setMessages(prev => [
          ...prev,
          { role: 'user', text: RAMOS.find(r => r.value === value)?.label || value },
          { role: 'bot', text: `Ótimo! Conhecemos bem o setor **${RAMOS.find(r => r.value === value)?.label || value}** de Franca.

O que você precisa para o seu negócio?`, options: NECESSIDADES },
        ]);
        break;
      }
      case 'necessidade': {
        newLead.necessidade = value;
        newStep = 'solucao';
        setLead(newLead);
        saveLead(newLead);

        const solucao = getSolucao(value, newLead.ramo || '');
        const caseTexto = getCaseRelacionado(newLead.ramo || '');

        setMessages(prev => [
          ...prev,
          { role: 'user', text: NECESSIDADES.find(n => n.value === value)?.label || value },
          { role: 'bot', text: `**${solucao.titulo}** — Excelente escolha! 🚀

${solucao.descricao}

💰 **Investimento:** ${solucao.preco}
⏱️ **Prazo:** ${solucao.prazo}
✨ **Benefício:** ${solucao.beneficioExtra}

${caseTexto}

**Quer agendar um diagnóstico gratuito?** Nossa equipe entra em contato em até 24h para entender seu negócio e preparar uma proposta personalizada.`, options: [
            { label: '✅ Quero diagnóstico gratuito!', value: 'sim' },
            { label: 'Ainda estou pesquisando', value: 'nao' },
          ] },
        ]);
        return;
      }
      case 'solucao': {
        if (value === 'sim') {
          newStep = 'lead_enviado';
          enviarLead(newLead as LeadData);
        } else {
          newStep = 'chat_livre';
          setMessages(prev => [
            ...prev,
            { role: 'user', text: 'Ainda estou pesquisando' },
            { role: 'bot', text: `Sem problemas! Fique à vontade para perguntar o que quiser sobre nossos serviços, planos, prazos ou cases.

Posso tirar suas dúvidas agora mesmo. O que gostaria de saber? 😊` },
          ]);
        }
        return;
      }
      default:
        return;
    }

    setLead(newLead);
    saveLead(newLead);
    setStep(newStep);
  }

  /* ─── Enviar lead via API ─────────────── */
  async function enviarLead(data: LeadData) {
    setSending(true);

    const resumo = `NOVO LEAD - Diagnóstico\nNome: ${data.nome}\nWhatsApp: ${data.whatsapp}\nRamo: ${data.ramo}\nNecessidade: ${data.necessidade}`;

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: data.nome,
          whatsapp: data.whatsapp,
          ramo: data.ramo,
          necessidade: data.necessidade,
          origem: 'assistente-vendas',
        }),
      });
    } catch {
      // Silencioso — fallback para simulação
    }

    setSending(false);
    clearLead();

    setMessages(prev => [
      ...prev,
      { role: 'bot', text: `✅ **Perfeito, ${data.nome}!** Seu diagnóstico foi solicitado com sucesso!

📋 **Resumo:** ${data.nome} | ${data.whatsapp} | ${data.ramo} | ${data.necessidade}

Nossa equipe vai entrar em contato em até **24h** pelo WhatsApp para agendar seu diagnóstico gratuito.

**Enquanto isso, que tal conhecer alguns cases de sucesso?** 👇`,
        options: [
          { label: 'Ver cases de sucesso', value: 'cases' },
          { label: 'Ver planos', value: 'planos' },
          { label: 'Conversar agora', value: 'conversar' },
        ] },
    ]);
    setStep('lead_enviado');
  }

  /* ─── Chat livre — responder ──────────── */
  async function handleChatSubmit(text: string) {
    if (!text.trim()) return;
    setInputText('');

    const userMsg: ChatMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    saveChat([...messages, userMsg]);

    // Try DeepSeek first
    setAiThinking(true);
    const respostaIA = await consultarDeepSeek(text);
    setAiThinking(false);

    if (respostaIA) {
      const botMsg: ChatMessage = { role: 'bot', text: respostaIA };
      setMessages(prev => [...prev, botMsg]);
      saveChat([...messages, userMsg, botMsg]);
      return;
    }

    // Fallback local
    const respostaLocal = buscarRespostaLivre(text);
    const botText = respostaLocal || `Obrigado pela mensagem! 😊

Para te ajudar melhor, posso:
• Explicar **nossos planos** (a partir de R$ 497/mês)
• Mostrar **cases de sucesso** de clientes de Franca
• Falar sobre **prazos** (site em 72h)
• Ou já **solicitar um diagnóstico** gratuito

O que prefere?`;

    const botMsg: ChatMessage = {
      role: 'bot',
      text: botText,
      options: !respostaLocal ? [
        { label: 'Ver planos', value: 'planos' },
        { label: 'Ver cases', value: 'cases' },
        { label: 'Diagnóstico grátis', value: 'diagnostico' },
      ] : undefined,
    };
    setMessages(prev => [...prev, botMsg]);
    saveChat([...messages, userMsg, botMsg]);
  }

  /* ─── Opções pós-lead ─────────────────── */
  function handlePosLead(value: string) {
    switch (value) {
      case 'cases':
        setMessages(prev => [...prev, {
          role: 'bot',
          text: casesSucesso.slice(0, 3).map(c =>
            `🏆 **${c.cliente}** (${c.nicho})\n📈 ${c.resultado}\n${c.descricao}`
          ).join('\n\n'),
        }]);
        break;
      case 'planos':
        setMessages(prev => [...prev, {
          role: 'bot',
          text: PLANS_HUB.map(p =>
            `**${p.name}** — ${p.priceLabel}\n${p.tagline}\nDestaques: ${p.highlights.join(', ')}`
          ).join('\n\n'),
        }]);
        break;
      case 'conversar':
        setMessages(prev => [...prev, {
          role: 'bot',
          text: 'Pode perguntar o que quiser! Estou aqui para ajudar.',
        }]);
        setStep('chat_livre');
        break;
    }
  }

  /* ─── Opções genéricas ────────────────── */
  function handleGenericOption(value: string) {
    switch (value) {
      case 'planos':
        setMessages(prev => [...prev, { role: 'user', text: 'Ver planos' }, {
          role: 'bot',
          text: PLANS_HUB.map(p =>
            `**${p.name}** — ${p.priceLabel}\n${p.tagline}`
          ).join('\n\n') + '\n\nQual te interessou mais?',
        }]);
        break;
      case 'cases':
        setMessages(prev => [...prev, { role: 'user', text: 'Ver cases' }, {
          role: 'bot',
          text: casesSucesso.map(c =>
            `🏆 **${c.cliente}** — ${c.resultado}`
          ).join('\n\n'),
        }]);
        break;
      case 'diagnostico':
        setStep('nome');
        setMessages(prev => [...prev, { role: 'user', text: 'Quero diagnóstico' }, {
          role: 'bot',
          text: 'Ótimo! Vou precisar de algumas informações rápidas.\n\nQual seu **nome**?',
        }]);
        break;
    }
  }

  /* ─── Fechar ──────────────────────────── */
  function handleClose() {
    setOpen(false);
    saveChat(messages);
  }

  /* ─── Render ──────────────────────────── */
  return (
    <>
      {/* Botão flutuante do robô */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="assistente-robot-btn group fixed z-[100] flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0057FF] text-white shadow-[0_0_24px_rgba(0,87,255,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(0,87,255,0.5)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030305]"
          style={{
            position: 'fixed',
            bottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
            right: 'max(24px, env(safe-area-inset-right, 24px))',
          }}
          aria-label="Abrir assistente de vendas"
        >
          <RobotIcon size={26} />
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#60A5FA] opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-[#3B82F6]" />
          </span>
        </button>
      )}

      {/* Painel do assistente */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="assistente-panel fixed z-[100] flex flex-col overflow-hidden border shadow-2xl"
            style={{
              width: 'min(92vw, 420px)',
              maxHeight: 'min(85dvh, 600px)',
              bottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
              right: 'max(24px, env(safe-area-inset-right, 24px))',
              background: 'rgba(9, 13, 18, 0.95)',
              backdropFilter: 'blur(32px) saturate(180%)',
              WebkitBackdropFilter: 'blur(32px) saturate(180%)',
              border: '1px solid rgba(0, 87, 255, 0.25)',
              borderRadius: '20px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,87,255,0.15), 0 0 40px rgba(0,87,255,0.08)',
            }}
            role="dialog"
            aria-label="Assistente de Vendas Rei das Vendas"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0057FF]/20 text-[#0057FF]">
                  <RobotIcon size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0057FF]/70">
                    Rei das Vendas
                  </p>
                  <p className="text-sm font-semibold text-white/90">
                    Assistente de Vendas
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/30 transition-all hover:bg-white/10 hover:text-white"
                aria-label="Fechar"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#0057FF] text-white rounded-br-md'
                        : 'bg-white/[0.06] text-white/85 rounded-bl-md border border-white/[0.04]'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {/* Options buttons */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.options.map(opt => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              if (step === 'solucao' || step === 'lead_enviado') {
                                if (step === 'lead_enviado') handlePosLead(opt.value);
                                else advanceStep(opt.value);
                              } else if (step === 'initial' || step === 'chat_livre') {
                                handleGenericOption(opt.value);
                              } else {
                                advanceStep(opt.value);
                              }
                            }}
                            className="touch-target rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-[11px] font-semibold text-white/80 transition-all hover:border-[#0057FF]/40 hover:bg-[#0057FF]/15 hover:text-white active:scale-95"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {sending && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-3 border border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#0057FF]/60" style={{ animationDelay: '0ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#0057FF]/60" style={{ animationDelay: '150ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#0057FF]/60" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs text-white/50">Enviando lead...</span>
                    </div>
                  </div>
                </div>
              )}

              {aiThinking && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-3 border border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#3B82F6]/80" style={{ animationDelay: '0ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#3B82F6]/80" style={{ animationDelay: '150ms' }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#3B82F6]/80" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs text-white/50">Pensando...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input (chat livre mode) */}
            {(step === 'chat_livre' || step === 'initial') && (
              <form
                className="flex items-center gap-2 border-t border-white/[0.06] px-4 py-3 shrink-0"
                onSubmit={e => {
                  e.preventDefault();
                  handleChatSubmit(inputText);
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-[#0057FF]/40 focus:bg-white/[0.06]"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || aiThinking}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0057FF] text-white transition-all hover:bg-[#0047CC] disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                  aria-label="Enviar"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            )}

            {/* Footer links */}
            <div className="flex items-center justify-between border-t border-white/[0.04] px-4 py-2.5 shrink-0">
              <Link
                to="/diagnostico"
                className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0057FF]/60 transition-colors hover:text-[#0057FF]/90"
                onClick={handleClose}
              >
                Diagnóstico
              </Link>
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white/60"
              >
                WhatsApp
              </a>
              <Link
                to="/planos"
                className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white/60"
                onClick={handleClose}
              >
                Planos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AssistenteVendas;
