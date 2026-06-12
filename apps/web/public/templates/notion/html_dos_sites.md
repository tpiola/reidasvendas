# HTML dos sites :

Source: Notion — HTML dos sites
Page ID: 33e8a253-0044-8018-9a6c-d5230181e7ca
URL: https://app.notion.com/p/HTML-dos-sites-33e8a253004480189a6cd5230181e7ca

Vercel é o caminho certo para hoje. WordPress com Elementor vai te prender em template lento. Vibe coding no Vercel te dá deploy em 2 minutos, domínio próprio, e você cola o HTML que já fizemos sem instalar nada na Hostinger.

Hoje é dia de fábrica. Vamos deixar 4 demos no ar, 40 assets prontos no Freepik e o calendário com voz automática já funcionando. Depois você prospecta leve na semana.

Plano intenso das próximas 6 horas

Hora 1: site no Vercel
Cria pasta piola-site no seu PC
Cola o index.html que te passei, cria pasta /media
Abre Cursor, digita no chat: "transforme este index.html em projeto Next.js com Tailwind, mantendo vídeo de fundo e botão WhatsApp"
npm i, npx vercel --prod
Conecta domínio thiagopiola.com.br no painel Vercel, aponta DNS

Pronto. Você não precisa do Docker da Hostinger para a vitrine. Deixa a VPS só para n8n e banco.

Hora 2 e 3: explosão Freepik, gere em lote
Abre Freepik Pro, vai em AI Image e Video. Não pense, só cole. Salve com nome exato.

Vídeos 5s loop, 10 unidades:
hero-dental.mp4 — "3d liquid glass tooth rotating, dark background, neon green light trails, cinematic seamless loop"
hero-restaurante.mp4 — "3d glass steak hologram, dark restaurant, green particles, premium"
hero-academia.mp4 — "chrome dumbbell liquid morphing, dark gym, neon green energy"
hero-advocacia.mp4 — "3d glass scales of justice, dark premium, subtle green glow"
hero-beauty.mp4 — "3d lipstick liquid glass, elegant dark, green rim light"
logo-piola.mp4 — "abstract piola letters forming from green particles, black background"
abstract-1.mp4 — "liquid metal morphing, dark, green trails"
abstract-2.mp4 — "glass cube rotating, reflections, dark studio"
abstract-3.mp4 — "particle wave, neon green, black"
abstract-4.mp4 — "3d grid landscape, dark, cinematic"

Imagens depois, 20 unidades, 5 por nicho:
Dental: "modern dental website mockup dark mode, floating 3d tooth, dribbble style", "dentist hero section ui, glassmorphism, premium", "dental clinic landing page, black and green, 3d icon", "before after dental site comparison, dark", "dental appointment booking ui, modern"
Restaurante: troque para "restaurant", "food", "menu"
Academia: "fitness", "gym", "dumbbell"
Advocacia: "law firm", "scales", "minimal dark"
Beauty: "salon", "cosmetic", "elegant"

Gera 3 variações de cada, escolhe a melhor em 10 segundos. Baixa tudo.

Hora 4: 4 demos prontas
No Vercel, cria 4 pastas: /dental, /restaurante, /academia, /advocacia. Copia o mesmo index, muda só H1 e vídeo. Exemplo dental:
H1: "Clínicas que parecem premium, lotam agenda"
Vídeo: hero-dental.mp4
WhatsApp link: https://wa.me/55SEUNUMERO?text=Vi a demo dental e quero a minha

Repete. Em 40 minutos você tem 4 URLs para mandar segunda.

Hora 5: calendário e automação de voz

Você tem Hugging Face Pro, usa para voz sem pagar ElevenLabs.

Cria conta gratuita no Cal.com, conecta seu Google Calendar
Cria evento "Demo 15 min", copia código embed
Cola no seu site, seção nova antes do footer:
null
No Cal.com, ativa webhook para https://n8n.thiagopiola.com.br/webhook/agendamento

No n8n da sua VPS, cria workflow:
Trigger webhook
HTTP Request para Hugging Face: modelo facebook/mms-tts-por
Body: {"inputs": "Olá, aqui é o Thiago da piola.build. Vi seu agendamento para amanhã. Já estou preparando sua demo 3D."}
Salva áudio, envia via WhatsApp API

Código Python para testar no Hugging Face:
null
Você já tem voz automatizada sem aparecer.

Hora 6: Agent Raio-X pronto para segunda

No Claude Pro, cria Project "Raio-X Pro". System prompt final:
Analise o negócio local e responda em formato relatório de 1 página. Sempre: NOTA, PROBLEMA, PERDA MENSAL EM R$, OPORTUNIDADE, 3 HEADLINES. Foco Brasil. Seja direto como consultor de R$ 10 mil.
Joga 12 URLs hoje, salva os PDFs no Notion. Segunda você só copia e cola no WhatsApp com link da demo certa.

Como usar Cursor sem queimar tokens

Você tem Claude Pro e Cursor. Estratégia:
No Cursor, vai em settings, modelo padrão: claude-3-haiku
Use Haiku para gerar HTML, CSS, boilerplate
Só chama Sonnet quando for lógica de automação
Para vibe coding rápido, usa Trae.dev, ele já vem com Qwen gratuito integrado, perfeito para gerar variações de landing

Isso economiza seus $30 do OpenRouter para quando precisar do Qwen 2.5 para analisar em massa.

Seu conteúdo de fim de semana, sem gravar

Com CapCut Pro, pega os 10 vídeos do Freepik, faz:
9:16, acelera 8x
Texto animado: "DENTAL 3D EM 2H"
Música eletrônica da biblioteca
Final com tela do site + "link na bio"

Exporta 10 Reels. Agenda no Meta Business Suite para segunda a sexta, 11h e 19h. Você não precisa estar online.

Hoje você sai com:
Site no Vercel
4 demos nichadas
40 assets prontos
Calendário com voz automática
12 relatórios Raio-X
10 vídeos agendados

Isso é mais que 90% das agências fazem em 3 meses.

Me avisa quando o Vercel estiver no ar. Aí eu te passo o workflow n8n completo do webhook do Cal.com para WhatsApp com áudio do Hugging Face, já pronto para importar.

I
