# Rei das Vendas — Builders Avançados (HTML)

Source: Notion — Rei das Vendas - Builders Avancados HTML
Page ID: 4d8eca8b-6184-41b5-a1bf-291c64a6217d
URL: https://app.notion.com/p/Rei-das-Vendas-Builders-Avan-ados-HTML-4d8eca8b618441b5a1bf291c64a6217d

> Este arquivo é um HTML único (com CSS + JS) para você colar no Antigravity. Ele já vem com:

```html
<!doctype html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#0B0F1A" />
	<title>Rei das Vendas — Sites Builder Avançados</title>

	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

	<style>
		:root{
			--bg:#070A12;
			--bg2:#0B1022;
			--card:rgba(255,255,255,.06);
			--card2:rgba(255,255,255,.09);
			--stroke:rgba(255,255,255,.12);
			--stroke2:rgba(255,255,255,.18);
			--txt:rgba(255,255,255,.92);
			--muted:rgba(255,255,255,.68);
			--muted2:rgba(255,255,255,.54);
			--brand:#7C5CFF;
			--brand2:#19D3FF;
			--good:#2EE59D;
			--warn:#FFB020;
			--danger:#FF4D6D;
			--shadow: 0 20px 60px rgba(0,0,0,.45);
			--radius: 18px;
			--radius2: 28px;
			--max: 1180px;
		}

		*{box-sizing:border-box}
		html,body{height:100%}
		body{
			margin:0;
			font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
			color:var(--txt);
			background:
				radial-gradient(1200px 700px at 15% 10%, rgba(124,92,255,.28), transparent 55%),
				radial-gradient(1000px 700px at 85% 25%, rgba(25,211,255,.18), transparent 55%),
				radial-gradient(900px 650px at 50% 80%, rgba(46,229,157,.12), transparent 55%),
				linear-gradient(180deg, var(--bg), var(--bg2) 55%, #05060C);
			overflow-x:hidden;
		}

		/* Subtle noise */
		body::before{
			content:"";
			position:fixed;
			inset:0;
			pointer-events:none;
			opacity:.12;
			background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.28'/%3E%3C/svg%3E");
			mix-blend-mode:overlay;
			z-index:0;
		}

		#bg-canvas{
			position:fixed;
			inset:-20px;
			z-index:0;
			filter: blur(0px);
			opacity:.9;
		}

		/* Layout */
		.wrap{position:relative; z-index:1;}
		header{
			position:sticky;
			top:0;
			z-index:20;
			backdrop-filter: blur(14px);
			background: linear-gradient(180deg, rgba(7,10,18,.88), rgba(7,10,18,.52));
			border-bottom:1px solid rgba(255,255,255,.08);
		}
		.nav{
			max-width:var(--max);
			margin:0 auto;
			padding:14px 20px;
			display:flex;
			align-items:center;
			gap:14px;
		}
		.brand{
			display:flex;
			align-items:center;
			gap:10px;
			min-width: 240px;
		}
		.badge{
			width:40px;height:40px;
			border-radius:14px;
			background: linear-gradient(135deg, rgba(124,92,255,.95), rgba(25,211,255,.75));
			box-shadow: 0 12px 30px rgba(124,92,255,.25);
			border:1px solid rgba(255,255,255,.18);
			display:grid;place-items:center;
			font-weight:800;
		}
		.brand h1{font-size:14px;margin:0;letter-spacing:.2px}
		.brand p{font-size:12px;margin:0;color:var(--muted2)}

		.navlinks{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:flex-end;flex:1}
		.chip{
			display:inline-flex;
			align-items:center;
			gap:8px;
			padding:10px 12px;
			border-radius:999px;
			border:1px solid rgba(255,255,255,.12);
			background:rgba(255,255,255,.05);
			color:var(--txt);
			text-decoration:none;
			font-size:12px;
			transition: transform .18s ease, background .18s ease, border-color .18s ease;
		}
		.chip:hover{transform: translateY(-1px); background:rgba(255,255,255,.075); border-color:rgba(255,255,255,.22)}
		.chip.primary{
			border-color: rgba(124,92,255,.35);
			background: linear-gradient(135deg, rgba(124,92,255,.22), rgba(25,211,255,.14));
		}
		.chip .dot{width:7px;height:7px;border-radius:999px;background:var(--good);box-shadow:0 0 0 3px rgba(46,229,157,.18)}

		main{max-width:var(--max); margin:0 auto; padding: 28px 20px 90px;}

		.hero{
			position:relative;
			display:grid;
			grid-template-columns: 1.15fr .85fr;
			gap:22px;
			align-items:stretch;
			padding: 26px;
			border-radius: var(--radius2);
			border: 1px solid rgba(255,255,255,.12);
			background: linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
			box-shadow: var(--shadow);
			overflow:hidden;
		}
		.hero::after{
			content:"";
			position:absolute;
			inset:-2px;
			background:
				radial-gradient(600px 200px at 22% 20%, rgba(124,92,255,.35), transparent 55%),
				radial-gradient(550px 200px at 80% 45%, rgba(25,211,255,.22), transparent 60%),
				radial-gradient(550px 260px at 65% 95%, rgba(46,229,157,.16), transparent 60%);
			pointer-events:none;
			opacity:.8;
		}
		.hero > *{position:relative; z-index:1}

		.kicker{
			display:inline-flex;
			align-items:center;
			gap:10px;
			padding:10px 12px;
			border-radius:999px;
			background: rgba(0,0,0,.25);
			border:1px solid rgba(255,255,255,.12);
			color: var(--muted);
			font-size:12px;
		}
		.kicker b{color:var(--txt)}
		.h-title{font-size:40px; line-height:1.05; letter-spacing:-.9px; margin:12px 0 10px}
		.h-sub{color:var(--muted); font-size:14px; line-height:1.65; max-width: 54ch;}

		.ctaRow{display:flex; gap:10px; flex-wrap:wrap; margin-top:16px}
		.btn{
			appearance:none;
			border:1px solid rgba(255,255,255,.14);
			background: rgba(255,255,255,.06);
			color: var(--txt);
			padding:12px 14px;
			border-radius: 14px;
			font-weight:600;
			font-size:13px;
			text-decoration:none;
			display:inline-flex;
			align-items:center;
			gap:10px;
			cursor:pointer;
			transition: transform .18s ease, border-color .18s ease, background .18s ease;
			position:relative;
			overflow:hidden;
		}
		.btn:hover{transform: translateY(-1px); border-color: rgba(255,255,255,.25); background: rgba(255,255,255,.09)}
		.btn.primary{
			border-color: rgba(124,92,255,.45);
			background: linear-gradient(135deg, rgba(124,92,255,.32), rgba(25,211,255,.18));
		}
		.btn.primary::after{
			content:"";
			position:absolute;
			inset:-40% -60%;
			background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
			transform: rotate(20deg) translateX(-40%);
			animation: shine 4.5s ease-in-out infinite;
			opacity:.55;
		}
		@keyframes shine{
			0%{transform: rotate(20deg) translateX(-65%)}
			45%{transform: rotate(20deg) translateX(65%)}
			100%{transform: rotate(20deg) translateX(65%)}
		}

		.stats{
			display:grid;
			grid-template-columns: 1fr 1fr;
			gap:12px;
			align-content:start;
		}
		.stat{
			padding:14px;
			border-radius: 16px;
			border:1px solid rgba(255,255,255,.12);
			background: rgba(0,0,0,.18);
			backdrop-filter: blur(10px);
			box-shadow: 0 14px 40px rgba(0,0,0,.25);
			position:relative;
			overflow:hidden;
		}
		.stat::before{
			content:"";
			position:absolute;
			inset:-2px;
			background: radial-gradient(320px 160px at 20% 25%, rgba(124,92,255,.25), transparent 55%);
			opacity:.8;
			pointer-events:none;
		}
		.stat > *{position:relative; z-index:1}
		.stat b{font-size:22px; display:block; letter-spacing:-.4px}
		.stat span{font-size:12px; color:var(--muted2)}

		.section{margin-top:22px}
		.sectionHeader{display:flex; align-items:end; justify-content:space-between; gap:14px; margin: 22px 0 12px}
		.sectionHeader h2{margin:0; font-size:16px; letter-spacing:.2px}
		.sectionHeader p{margin:0; color:var(--muted2); font-size:12px}

		/* Tabs */
		.tabs{display:flex; flex-wrap:wrap; gap:8px}
		.tab{
			border:1px solid rgba(255,255,255,.12);
			background: rgba(255,255,255,.05);
			color: var(--txt);
			padding:10px 12px;
			border-radius: 999px;
			font-size:12px;
			cursor:pointer;
			transition: transform .15s ease, background .15s ease, border-color .15s ease;
		}
		.tab:hover{transform: translateY(-1px); background: rgba(255,255,255,.07); border-color: rgba(255,255,255,.22)}
		.tab[aria-selected="true"]{
			border-color: rgba(124,92,255,.45);
			background: linear-gradient(135deg, rgba(124,92,255,.25), rgba(25,211,255,.12));
		}

		.grid{
			display:grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap:12px;
		}
		.card{
			border:1px solid rgba(255,255,255,.12);
			background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
			border-radius: var(--radius);
			padding:14px;
			box-shadow: 0 14px 45px rgba(0,0,0,.32);
			position:relative;
			overflow:hidden;
			transform: translateZ(0);
		}
		.card::before{
			content:"";
			position:absolute;
			inset:-2px;
			background: radial-gradient(420px 180px at 15% 20%, rgba(25,211,255,.15), transparent 55%);
			opacity:.9;
			pointer-events:none;
		}
		.card:hover{border-color: rgba(255,255,255,.22)}
		.card > *{position:relative; z-index:1}
		.cardTop{display:flex; justify-content:space-between; align-items:flex-start; gap:10px}
		.tag{
			font-size:11px;
			padding:6px 10px;
			border-radius:999px;
			border:1px solid rgba(255,255,255,.14);
			background: rgba(0,0,0,.2);
			color: var(--muted);
		}
		.card h3{margin:10px 0 6px; font-size:14px; letter-spacing:.2px}
		.card p{margin:0; color: var(--muted2); font-size:12px; line-height:1.55}
		.meta{display:flex; gap:10px; flex-wrap:wrap; margin-top:10px; color: var(--muted2); font-size:11px}
		.meta span{display:inline-flex; align-items:center; gap:6px}
		.meta i{width:8px;height:8px;border-radius:999px;background: rgba(255,255,255,.22)}

		.cardActions{display:flex; gap:8px; margin-top:12px; flex-wrap:wrap}
		.mini{
			padding:10px 12px;
			border-radius: 14px;
			border:1px solid rgba(255,255,255,.12);
			background: rgba(255,255,255,.05);
			color: var(--txt);
			font-size:12px;
			cursor:pointer;
			text-decoration:none;
			transition: transform .15s ease, border-color .15s ease, background .15s ease;
		}
		.mini:hover{transform: translateY(-1px); border-color: rgba(255,255,255,.22); background: rgba(255,255,255,.075)}
		.mini.brand{border-color: rgba(25,211,255,.35)}
		.mini.purple{border-color: rgba(124,92,255,.45)}

		/* Horizontal snap section */
		.snapWrap{
			border:1px solid rgba(255,255,255,.12);
			background: rgba(0,0,0,.16);
			border-radius: var(--radius2);
			padding: 14px;
			overflow:hidden;
		}
		.snap{
			display:flex;
			gap:12px;
			overflow:auto;
			scroll-snap-type: x mandatory;
			scrollbar-width: none;
			padding-bottom: 6px;
		}
		.snap::-webkit-scrollbar{display:none}
		.panel{
			min-width: 360px;
			scroll-snap-align: start;
			border:1px solid rgba(255,255,255,.12);
			background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
			border-radius: var(--radius2);
			padding: 14px;
			position:relative;
			overflow:hidden;
		}
		.panel h4{margin:0 0 8px; font-size:13px; letter-spacing:.2px}
		.panel p{margin:0; color: var(--muted2); font-size:12px; line-height:1.6}
		.panel .row{display:flex; gap:10px; margin-top:12px; flex-wrap:wrap}

		.video{
			margin-top: 14px;
			border-radius: 18px;
			overflow:hidden;
			border:1px solid rgba(255,255,255,.12);
			background: rgba(0,0,0,.25);
			position:relative;
		}
		.video video{
			width:100%;
			height: 220px;
			object-fit: cover;
			display:block;
			filter: saturate(1.06) contrast(1.02);
		}
		.video .vOverlay{
			position:absolute;
			inset:0;
			background: radial-gradient(600px 260px at 15% 10%, rgba(124,92,255,.24), transparent 60%),
				linear-gradient(180deg, rgba(0,0,0,.0), rgba(0,0,0,.42));
			pointer-events:none;
		}
		.video .vLabel{
			position:absolute;
			left:12px;
			bottom:10px;
			font-size:12px;
			color: rgba(255,255,255,.9);
			background: rgba(0,0,0,.25);
			border: 1px solid rgba(255,255,255,.14);
			padding:8px 10px;
			border-radius: 999px;
			backdrop-filter: blur(10px);
		}

		.footer{
			margin-top:26px;
			padding:16px;
			border-radius: var(--radius2);
			border:1px solid rgba(255,255,255,.12);
			background: rgba(0,0,0,.14);
			display:flex;
			align-items:center;
			justify-content:space-between;
			gap:12px;
			flex-wrap:wrap;
		}
		.footer small{color: var(--muted2)}

		/* Reveal animations */
		.reveal{opacity:0; transform: translateY(14px); transition: opacity .65s ease, transform .65s ease}
		.reveal.show{opacity:1; transform: translateY(0)}

		/* Responsive */
		@media (max-width: 980px){
			.hero{grid-template-columns: 1fr;}
			.brand{min-width: auto;}
			.grid{grid-template-columns: repeat(2, minmax(0, 1fr));}
		}
		@media (max-width: 640px){
			.h-title{font-size:32px}
			.grid{grid-template-columns: 1fr;}
			.panel{min-width: 84vw}
		}
	</style>
</head>
<body>
	<canvas id="bg-canvas"></canvas>

	<div class="wrap">
		<header>
			<div class="nav">
				<div class="brand">
					<div class="badge">RV</div>
					<div>
						<h1>Rei das Vendas</h1>
						<p>Builders avançados por nicho • design premium • micro-interações</p>
					</div>
				</div>

				<nav class="navlinks" aria-label="Ações">
					<a class="chip" href="#niches"><span class="dot"></span> Nichos</a>
					<a class="chip" href="#galeria">Galeria</a>
					<a class="chip" href="#laboratorio">Laboratório</a>
					<a class="chip primary" href="#export">Exportar HTML</a>
				</nav>
			</div>
		</header>

		<main>
			<section class="hero reveal" id="top">
				<div>
					<div class="kicker">⚡ <b>Ultra avançado</b> • Scroll snap • Vídeos automáticos • Animações suaves</div>
					<h2 class="h-title">Templates modernos, <br>com aparência de produto global.</h2>
					<p class="h-sub">Escolha um nicho e gere uma estrutura pronta para publicar. O foco é parecer “fora do padrão” no Brasil: estética premium, motion discreto, UX com micro-interações e seções com rolagem inteligente.</p>

					<div class="ctaRow">
						<a class="btn primary" href="#niches">Ver nichos</a>
						<button class="btn" id="btnRandom">Gerar um template aleatório</button>
						<button class="btn" id="btnCopy" title="Copia uma versão reduzida (exemplo) para colar">Copiar snippet</button>
					</div>
				</div>

				<div class="stats">
					<div class="stat reveal">
						<b>12+</b>
						<span>Nichos “builder” com blocos prontos</span>
					</div>
					<div class="stat reveal">
						<b>0→Vercel</b>
						<span>HTML único pronto para pipeline GitHub → Vercel</span>
					</div>
					<div class="stat reveal">
						<b>Motion</b>
						<span>Parallax, hover, reveal, scroll snap, canvas</span>
					</div>
					<div class="stat reveal">
						<b>Vídeo</b>
						<span>Busca automática com fallback (Pexels)</span>
					</div>
				</div>
			</section>

			<section class="section" id="niches">
				<div class="sectionHeader">
					<div>
						<h2>Nichos</h2>
						<p>Selecione um nicho para filtrar os builders e modelos.</p>
					</div>
					<div class="tabs" role="tablist" aria-label="Nichos">
						<button class="tab" role="tab" data-niche="todos" aria-selected="true">Todos</button>
						<button class="tab" role="tab" data-niche="servicos">Serviços</button>
						<button class="tab" role="tab" data-niche="saas">SaaS / Tech</button>
						<button class="tab" role="tab" data-niche="ecom">E-commerce</button>
						<button class="tab" role="tab" data-niche="saude">Saúde</button>
						<button class="tab" role="tab" data-niche="imobiliario">Imobiliário</button>
						<button class="tab" role="tab" data-niche="educacao">Educação</button>
						<button class="tab" role="tab" data-niche="financas">Finanças</button>
						<button class="tab" role="tab" data-niche="eventos">Eventos</button>
					</div>
				</div>

				<div class="grid" id="galeria" aria-live="polite"></div>
			</section>

			<section class="section" id="laboratorio">
				<div class="sectionHeader">
					<div>
						<h2>Laboratório (scroll + botões + módulos)</h2>
						<p>Exemplos de seções “avançadas” para copiar e encaixar.</p>
					</div>
				</div>

				<div class="snapWrap reveal">
					<div class="snap" id="snap"></div>
				</div>

				<div class="video reveal" id="videoBox">
					<video id="heroVideo" muted playsinline autoplay loop></video>
					<div class="vOverlay"></div>
					<div class="vLabel" id="vLabel">Carregando vídeo…</div>
				</div>
			</section>

			<section class="section" id="export">
				<div class="sectionHeader">
					<div>
						<h2>Exportar / Deploy</h2>
						<p>Use este arquivo como base no Antigravity → GitHub → Vercel.</p>
					</div>
				</div>

				<div class="card reveal">
					<div class="cardTop">
						<div class="tag">Checklist de publicação</div>
						<div class="tag" style="border-color: rgba(46,229,157,.35)">Pronto</div>
					</div>
					<h3>Passos (rápido)</h3>
					<p>
						1) Cole o HTML inteiro no Antigravity.<br>
						2) Ajuste o texto e links (botões “Preview” / “Gerar”).<br>
						3) Conecte no GitHub.<br>
						4) Faça deploy na Vercel.<br>
						5) Aponte o domínio <b>reidasvendas.com.br</b>.
					</p>
					<div class="cardActions">
						<button class="mini purple" id="btnExportJson">Exportar JSON de templates</button>
						<button class="mini brand" id="btnScrollTop">Voltar ao topo</button>
					</div>
				</div>
			</section>

			<div class="footer reveal">
				<small>© Rei das Vendas • Página HTML “builder” ultra moderna (base). Ajuste textos, links e endpoints de vídeo conforme necessário.</small>
				<a class="chip" href="https://www.reidasvendas.com.br" target="_blank" rel="noreferrer">Abrir domínio</a>
			</div>
		</main>
	</div>

	<script>
		// ============================================================
		// Ultra-light “engine”: tabs + filtering + scroll + reveal
		// ============================================================
		const $ = (sel, root=document) => root.querySelector(sel);
		const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

		const templates = [
			{ id:"srv-elite", niche:"servicos", nome:"Serviços Elite", tag:"High-ticket", desc:"Página de serviços premium com prova social + CTA em sticky.", metas:["scroll sections","sticky CTA","pricing"] },
			{ id:"srv-local", niche:"servicos", nome:"Serviço Local 2.0", tag:"Local", desc:"Hero curto + mapa + WhatsApp + perguntas frequentes com micro-animações.", metas:["maps","whatsapp","faq"] },
			{ id:"saas-launch", niche:"saas", nome:"SaaS Launch", tag:"SaaS", desc:"Landing estilo produto global com métricas e comparação.", metas:["pricing","comparison","motion"] },
			{ id:"saas-ai", niche:"saas", nome:"AI Studio", tag:"AI", desc:"Layout editorial com seções em grid, efeitos de glow e canvas.", metas:["canvas","glow","case studies"] },
			{ id:"ecom-collection", niche:"ecom", nome:"Ecom Collection", tag:"Drop", desc:"Coleção com cards, quick-view e gatilhos visuais discretos.", metas:["cards","quick view","reviews"] },
			{ id:"ecom-brand", niche:"ecom", nome:"Marca Premium", tag:"Brand", desc:"Storytelling de marca com vídeo, manifesto e seções em snap.", metas:["video","snap","brand"] },
			{ id:"saude-clinica", niche:"saude", nome:"Clínica Moderna", tag:"Saúde", desc:"Agendamento + autoridade + depoimentos, UX limpa e rápida.", metas:["booking","authority","faq"] },
			{ id:"saude-odonto", niche:"saude", nome:"Odonto Luxe", tag:"Odonto", desc:"Foco em estética, antes/depois e CTA com prova social.", metas:["social proof","gallery","cta"] },
			{ id:"imob-lanc", niche:"imobiliario", nome:"Lançamento Imob", tag:"Imob", desc:"Página de lançamento com rolagem guiada e âncoras inteligentes.", metas:["guided scroll","anchors","lead form"] },
			{ id:"imob-corretor", niche:"imobiliario", nome:"Corretor Pro", tag:"Perfil", desc:"Perfil de corretor com imóveis em destaque e contato imediato.", metas:["listing","contact","trust"] },
			{ id:"edu-curso", niche:"educacao", nome:"Curso/Academia", tag:"Edu", desc:"Página de curso com módulos, timeline e provas.", metas:["curriculum","timeline","testimonials"] },
			{ id:"fin-consult", niche:"financas", nome:"Consultoria Financeira", tag:"Finance", desc:"Autoridade + cases + funil de agendamento.", metas:["calendar","case studies","trust"] },
			{ id:"evt-premium", niche:"eventos", nome:"Evento Premium", tag:"Evento", desc:"Ingresso, agenda, palestrantes e teaser com vídeo.", metas:["schedule","tickets","video"] },
		];

		function iconForNiche(n){
			return {
				servicos:"🧰",
				saas:"🧠",
				ecom:"🛍️",
				saude:"🩺",
				imobiliario:"🏙️",
				educacao:"🎓",
				financas:"💳",
				eventos:"🎟️",
			}[n] || "✨";
		}

		function cardHTML(t){
			const meta = t.metas.map(m => `<span><i></i>${m}</span>`).join("");
			return `
				<article class="card reveal" data-niche="${t.niche}">
					<div class="cardTop">
						<div class="tag">${iconForNiche(t.niche)} ${t.tag}</div>
						<div class="tag" style="border-color: rgba(25,211,255,.35)">Builder</div>
					</div>
					<h3>${t.nome}</h3>
					<p>${t.desc}</p>
					<div class="meta">${meta}</div>
					<div class="cardActions">
						<button class="mini purple" data-action="generate" data-id="${t.id}">Gerar</button>
						<button class="mini" data-action="preview" data-id="${t.id}">Preview</button>
						<button class="mini brand" data-action="copy" data-id="${t.id}">Copiar</button>
					</div>
				</article>
			`;
		}

		function renderGallery(filter="todos"){
			const grid = $("#galeria");
			grid.innerHTML = templates
				.filter(t => filter === "todos" ? true : t.niche === filter)
				.map(cardHTML)
				.join("");
			rebindCardActions();
			requestAnimationFrame(() => revealScan());
		}

		function setTab(selected){
			$$(".tab").forEach(b => b.setAttribute("aria-selected", String(b.dataset.niche === selected)));
		}

		// ------------------------------------------------------------
		// Snap panels
		// ------------------------------------------------------------
		const panels = [
			{title:"Scroll Snap • Seções", text:"Use rolagem horizontal com snapping para apresentar benefícios como um carrossel premium (sem parecer slider comum)."},
			{title:"Botões • Interações", text:"Botões com shine, leve elevação e feedback. Evita aparência ‘genérica’ e aumenta sensação de produto."},
			{title:"Motion • Reveal", text:"Animações por interseção (IntersectionObserver) com timing suave. Não exagerar: premium é controle."},
			{title:"Canvas • Fundo vivo", text:"Fundo animado com partículas/gradientes em canvas, sem pesar muito no load."},
			{title:"Vídeo • Teaser automático", text:"Carrega um vídeo de nicho automaticamente via API (ou fallback). Bom para hero e prova visual."},
		];

		function renderPanels(){
			const snap = $("#snap");
			snap.innerHTML = panels.map((p, idx) => `
				<div class="panel reveal">
					<h4>${idx+1}. ${p.title}</h4>
					<p>${p.text}</p>
					<div class="row">
						<button class="mini" data-action="scrollTo" data-target="#galeria">Ir para galeria</button>
						<button class="mini purple" data-action="toast" data-msg="Painel copiado mentalmente 😄">Dica rápida</button>
					</div>
				</div>
			`).join("");
		}

		// ------------------------------------------------------------
		// Actions
		// ------------------------------------------------------------
		function toast(msg){
			const el = document.createElement("div");
			el.textContent = msg;
			Object.assign(el.style, {
				position:"fixed",
				left:"50%",
				bottom:"18px",
				transform:"translateX(-50%)",
				padding:"12px 14px",
				borderRadius:"999px",
				background:"rgba(0,0,0,.45)",
				border:"1px solid rgba(255,255,255,.18)",
				backdropFilter:"blur(12px)",
				color:"rgba(255,255,255,.92)",
				fontSize:"12px",
				zIndex: 99,
				boxShadow:"0 18px 50px rgba(0,0,0,.45)",
				opacity: 0,
				transition:"opacity .2s ease, transform .2s ease"
			});
			document.body.appendChild(el);
			requestAnimationFrame(()=>{ el.style.opacity = 1; el.style.transform = "translateX(-50%) translateY(-2px)"; });
			setTimeout(()=>{ el.style.opacity = 0; el.style.transform = "translateX(-50%) translateY(8px)"; }, 1800);
			setTimeout(()=>{ el.remove(); }, 2200);
		}

		function templateSnippet(t){
			return `<!-- ${t.nome} (${t.niche}) -->\n<section style="padding:64px 20px; max-width:1080px; margin:0 auto;">\n\t<h2 style="font-family:Inter; letter-spacing:-.4px; margin:0 0 10px;">${t.nome}</h2>\n\t<p style="margin:0 0 18px; opacity:.8;">${t.desc}</p>\n\t<a href="#" style="display:inline-block; padding:12px 14px; border-radius:14px; text-decoration:none; border:1px solid rgba(255,255,255,.18);">CTA do nicho</a>\n</section>`;
		}

		function previewTemplate(t){
			const html = `
				<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<title>Preview — ${t.nome}</title>
				<link rel="preconnect" href="https://fonts.googleapis.com">
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap" rel="stylesheet">
				<style>
					body{margin:0;background:#070A12;color:rgba(255,255,255,.92);font-family:Inter,system-ui}
					.hero{padding:72px 20px;max-width:980px;margin:0 auto}
					.box{padding:18px;border:1px solid rgba(255,255,255,.14);border-radius:18px;background:rgba(255,255,255,.06)}
					.btn{display:inline-block;margin-top:14px;padding:12px 14px;border-radius:14px;border:1px solid rgba(124,92,255,.45);background:rgba(124,92,255,.18);text-decoration:none;color:rgba(255,255,255,.92)}
				</style>
				</head><body>
					<div class="hero">
						<h1 style="margin:0 0 12px;letter-spacing:-.8px">${t.nome}</h1>
						<div class="box">
							<p style="margin:0;opacity:.85;line-height:1.65">${t.desc}</p>
							<a class="btn" href="#">CTA do Builder</a>
						</div>
						<p style="opacity:.65;margin-top:16px;font-size:12px">Feche esta aba para voltar.</p>
					</div>
				</body></html>
			`;
			const w = window.open("", "_blank");
			w.document.open();
			w.document.write(html);
			w.document.close();
		}

		function copyText(txt){
			navigator.clipboard.writeText(txt).then(
				()=>toast("Copiado para a área de transferência"),
				()=>toast("Não consegui copiar automaticamente. Copie manualmente.")
			);
		}

		function findById(id){ return templates.find(t => t.id === id); }

		function rebindCardActions(){
			$$("[data-action]").forEach(el => {
				el.addEventListener("click", (e) => {
					const a = el.dataset.action;
					if(a === "scrollTo"){
						const target = $(el.dataset.target);
						if(target) target.scrollIntoView({behavior:"smooth", block:"start"});
						return;
					}
					if(a === "toast"){
						toast(el.dataset.msg || "Ok");
						return;
					}

					const t = findById(el.dataset.id);
					if(!t) return;

					if(a === "generate"){
						toast(`Builder “${t.nome}” gerado (base).`);
						// Aqui você pode plugar um gerador real. Ex.: chamar um endpoint do Antigravity.
						return;
					}
					if(a === "preview"){
						previewTemplate(t);
						return;
					}
					if(a === "copy"){
						copyText(templateSnippet(t));
						return;
					}
				});
			});
		}

		// ------------------------------------------------------------
		// Tabs behavior
		// ------------------------------------------------------------
		$$(".tab").forEach(btn => {
			btn.addEventListener("click", () => {
				const niche = btn.dataset.niche;
				setTab(niche);
				renderGallery(niche);
			});
		});

		// Random
		$("#btnRandom").addEventListener("click", () => {
			const t = templates[Math.floor(Math.random() * templates.length)];
			setTab("todos");
			renderGallery("todos");
			setTimeout(() => {
				const el = $(`[data-id="${t.id}"]`);
				if(el) el.closest("article").scrollIntoView({behavior:"smooth", block:"center"});
				toast(`Sugestão: ${t.nome}`);
			}, 50);
		});

		// Copy a simple snippet
		$("#btnCopy").addEventListener("click", () => {
			copyText("<!-- Snippet base (exemplo) -->\n<section style=\"padding:64px 20px; max-width:1080px; margin:0 auto;\">\n\t<h2 style=\"font-family:Inter; letter-spacing:-.4px; margin:0 0 10px;\">Seção builder</h2>\n\t<p style=\"margin:0 0 18px; opacity:.8;\">Cole aqui o bloco do nicho e seus CTAs.</p>\n\t<a href=\"#\" style=\"display:inline-block; padding:12px 14px; border-radius:14px; text-decoration:none; border:1px solid rgba(255,255,255,.18);\">CTA</a>\n</section>");
		});

		$("#btnExportJson").addEventListener("click", () => {
			copyText(JSON.stringify(templates, null, 2));
		});

		$("#btnScrollTop").addEventListener("click", () => {
			window.scrollTo({top:0, behavior:"smooth"});
		});

		// ------------------------------------------------------------
		// Reveal on scroll
		// ------------------------------------------------------------
		let observer;
		function revealScan(){
			if(observer) observer.disconnect();
			observer = new IntersectionObserver((entries) => {
				entries.forEach(e => {
					if(e.isIntersecting){
						e.target.classList.add("show");
						observer.unobserve(e.target);
					}
				});
			}, {threshold: .12});

			$$(".reveal").forEach(el => {
				if(!el.classList.contains("show")) observer.observe(el);
			});
		}

		// ------------------------------------------------------------
		// Background canvas animation (particles)
		// ------------------------------------------------------------
		(function bg(){
			const c = $("#bg-canvas");
			const ctx = c.getContext("2d");
			let w, h, dpr;

			const particles = Array.from({length: 70}, () => ({
				x: Math.random(),
				y: Math.random(),
				vx: (Math.random() - .5) * 0.00035,
				vy: (Math.random() - .5) * 0.00035,
				r: 1.2 + Math.random() * 2.2,
				a: .22 + Math.random() * .35,
			}));

			function resize(){
				dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
				w = c.width = Math.floor(window.innerWidth * dpr);
				h = c.height = Math.floor(window.innerHeight * dpr);
				c.style.width = window.innerWidth + "px";
				c.style.height = window.innerHeight + "px";
				ctx.setTransform(dpr,0,0,dpr,0,0);
			}
			window.addEventListener("resize", resize);
			resize();

			let t = 0;
			function tick(){
				t += 0.006;
				ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

				// soft gradient wash
				const g = ctx.createRadialGradient(
					window.innerWidth*0.2, window.innerHeight*0.15, 40,
					window.innerWidth*0.2, window.innerHeight*0.15, window.innerWidth*0.9
				);
				g.addColorStop(0, "rgba(124,92,255,.16)");
				g.addColorStop(0.55, "rgba(25,211,255,.08)");
				g.addColorStop(1, "rgba(0,0,0,0)");
				ctx.fillStyle = g;
				ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

				for(const p of particles){
					p.x += p.vx * (1 + Math.sin(t) * 0.35);
					p.y += p.vy * (1 + Math.cos(t) * 0.35);
					if(p.x < -0.05) p.x = 1.05;
					if(p.x > 1.05) p.x = -0.05;
					if(p.y < -0.05) p.y = 1.05;
					if(p.y > 1.05) p.y = -0.05;

					const x = p.x * window.innerWidth;
					const y = p.y * window.innerHeight;
					ctx.beginPath();
					ctx.arc(x,y,p.r,0,Math.PI*2);
					ctx.fillStyle = `rgba(255,255,255,${p.a})`;
					ctx.fill();
				}

				requestAnimationFrame(tick);
			}
			tick();
		})();

		// ------------------------------------------------------------
		// Auto video: Pexels (placeholder) with fallback
		// IMPORTANT: Para funcionar de verdade, você precisa de uma API key.
		// ------------------------------------------------------------
		async function loadAutoVideo(){
			const video = $("#heroVideo");
			const label = $("#vLabel");

			// Fallback público (pequeno / leve). Troque por seus assets.
			const fallback = "https://cdn.coverr.co/videos/coverr-working-on-laptop-5496/1080p.mp4";
			video.src = fallback;
			label.textContent = "Vídeo (fallback) — pronto";

			// Exemplo de integração (desativado por padrão):
			// 1) Crie um endpoint no seu backend que injeta sua PEXELS_API_KEY.
			// 2) Busque por termos do nicho e retorne uma URL mp4.
			// label.textContent = "Vídeo — via API";
			// const res = await fetch("/api/video?niche=saas");
			// const { mp4 } = await res.json();
			// video.src = mp4;
		}

		// Init
		renderPanels();
		renderGallery("todos");
		loadAutoVideo();
		revealScan();

	</script>
</body>
</html>
```

### Prompt para o Antigravity (acesso a esta página + upgrades)

Copie e cole este prompt no Antigravity.

```plain text
Você é um assistente de engenharia de front-end e design com foco em páginas premium e performance.

## Contexto e fonte da verdade
- A fonte da verdade é a página do Notion “Rei das Vendas — Builders Avançados (HTML)” (esta página), que contém o HTML completo (CSS + JS) do projeto.
- Sempre trabalhe a partir do conteúdo mais recente desta página e trate-o como o arquivo principal.

## Habilidades a instalar (plugins)
Instale e habilite as seguintes habilidades no Antigravity antes de iniciar:
1) Notion Connector: ler e escrever nesta página (pull do código e push das alterações).
2) File/Archive Tools: baixar, abrir e editar arquivos compactados (.zip, .rar, .7z).
	- Deve conseguir: listar conteúdo, extrair para workspace, editar arquivos e recomprimir.
3) HTML/CSS/JS Refactor Tools:
	- Minificação (HTML/CSS/JS), formatação, lint e build de produção.
	- Bundle/Tree-shaking quando aplicável.
4) Performance & Lighthouse Tools:
	- Rodar auditorias (Lighthouse/Pagespeed local) e sugerir correções.
	- Medir métricas: LCP, CLS, INP, TBT.
5) Accessibility Tools:
	- Checagem de contraste, foco, ARIA e navegação por teclado.

## Objetivo
Elevar o design, melhorar animações e aumentar velocidade/performance mantendo:
- Navegação por nichos (tabs)
- Hero com fundo animado (canvas)
- Cards com micro-interações
- Seção com scroll snapping
- Vídeos automáticos com fallback (Pexels/placeholder)
- Botões com “shine”, gradientes, blur e parallax

## Regras de entrega
- Faça TODAS as alterações necessárias no arquivo.
- Não remova features existentes, apenas melhore.
- Priorize performance e suavidade.
- Evite dependências pesadas.
- Entregue um único arquivo HTML final (com CSS + JS embutidos), pronto para colar no Antigravity.

## Checklist técnico (obrigatório)
1) Performance
- Reduzir trabalho no main thread e recalcular layout.
- Garantir que animações usem preferencialmente transform/opacity.
- Usar requestAnimationFrame onde fizer sentido.
- Aplicar passive listeners para scroll/touch.
- Evitar repaint pesado no canvas.
- Otimizar IntersectionObserver (um observer, thresholds adequados).

2) Canvas (fundo)
- Manter visual premium, mas reduzir custo:
	- Ajustar número de partículas dinamicamente por viewport.
	- Pausar/ reduzir FPS quando a aba estiver oculta (Page Visibility API).
	- Respeitar prefers-reduced-motion.

3) Vídeo
- Manter fallback público.
- Melhorar carregamento:
	- Carregar de forma segura e resiliente.
	- Mostrar estados (loading/fallback).
	- Evitar bloquear render.

4) CSS
- Reduzir sombras/blur excessivos em mobile.
- Melhorar tipografia e hierarquia.
- Melhorar spacing e consistência de bordas/cores.
- Garantir contraste e legibilidade.

5) Acessibilidade
- Tabs com ARIA completo e navegação por teclado.
- Foco visível em botões e links.
- Respeitar prefers-reduced-motion.

6) Qualidade do código
- Remover código morto.
- Deixar funções pequenas e nomeadas.
- Evitar múltiplos rebinds desnecessários.

## Saída esperada
- Cole o HTML final completo.
- Em seguida, liste um changelog curto com:
	- Principais melhorias de design
	- Principais otimizações de performance
	- Mudanças de acessibilidade
	- Qualquer ajuste de compatibilidade

Agora, execute o trabalho.
```

### Prompt 1 — Configuração de Skills + Memória (Antigravity)\

\

```javascript
Você é um Engenheiro Master Senior de Produto (nível big tech) com foco em: crescimento, conversão, design systems premium, performance, SEO/Geo, e engenharia de front-end/full-stack para produtos digitais.\
\
## Fonte da verdade\
- A fonte da verdade é o workspace do Notion do cliente, especialmente a página “Rei das Vendas — Builders Avançados (HTML)” (HTML único com CSS+JS) e qualquer página mencionada nela.\
- Sempre faça pull do conteúdo mais recente do Notion antes de propor mudanças e faça push de volta com um changelog curto.\
\
## Memória (obrigatória)\
Crie e mantenha uma memória persistente com estas chaves e atualize a cada entrega:\
1) ICPsAtivos: perfis de cliente por nicho (B2B, local services, SaaS, e-commerce, saúde, imobiliário, educação, finanças, eventos).\
2) PropostasDeValor: mensagens por nicho (headline, sub, objeções, provas).\
3) PadrõesDeConversão: padrões reutilizáveis (arquitetura de páginas, CTAs, UX de formulários, pricing, prova social).\
4) DesignSystem: tokens (cores, tipografia, radius, sombras), componentes (hero, cards, tabs, pricing, FAQs), estados (hover/focus/disabled).\
5) SEOeGeo: regras de SEO técnico + conteúdo + schema + local SEO + i18n, e checklist por deploy.\
6) Performance: metas por device (LCP/CLS/INP), orçamento de JS/CSS, imagens e vídeo.\
7) ComplianceGoogle: políticas e boas práticas para ads, orgânico, conteúdo, privacidade, consentimento, e segurança.\
8) Repositórios: links e padrões de branch/CI, checklist GitHub → Vercel.\
\
## Skills (plugins) a instalar e validar\
Instale, habilite e valide (com smoke test) estes MCPs/skills antes de iniciar qualquer tarefa:\
1) Notion Connector (R/W)\
- Ler páginas, escrever alterações, criar diffs e publicar changelog.\
- Suportar leitura de blocos longos (HTML/CSS/JS) sem truncar.\
\
2) Web + Research (quando permitido)\
- Coletar referências técnicas e tendências de UX/SEO/performance.\
- Sempre citar links e datas quando usar fontes externas.\
- Se não houver navegação disponível, declarar “Pesquisa externa indisponível” e seguir apenas com heurísticas e melhores práticas.\
\
3) File/Archive Tools\
- Baixar, extrair, editar e recomprimir .zip/.rar/.7z.\
- Detectar assets, otimizar imagens e gerar variantes responsivas.\
\
4) HTML/CSS/JS Refactor + Build\
- Formatar, lint, minificar, e gerar build de produção quando aplicável.\
- Análise de dead-code e bundle size.\
\
5) Performance & Lighthouse\
- Rodar auditoria e registrar métricas: LCP, CLS, INP, TBT, FCP, TTI.\
- Sugerir e aplicar correções priorizando impacto real.\
\
6) Accessibility\
- Checagem WCAG, contraste, ARIA, navegação por teclado, foco visível, reduced motion.\
\
7) Security & Privacy\
- Headers recomendados, CSP, SRI quando aplicável, validação de inputs, anti-XSS, rate limiting em endpoints.\
- Consentimento (LGPD) quando houver tracking, e política de cookies.\
\
8) SEO/Schema/Geo Toolkit\
- Geração e validação de: sitemap, robots, canonical, hreflang, OpenGraph, Twitter Cards, Schema.org (Organization, Product, FAQ, Article, LocalBusiness conforme nicho).\
- Regras de content clusters e topical authority, sem spam.\
\
## Diretrizes de execução (nível “produto global”)\
### 1) Foco do projeto\
- Falar pouco sobre farmácia.\
- Priorizar vendas, soluções digitais, sites de altíssima conversão, SaaS, apps, plataformas, produtos digitais.\
- Estética e engenharia “premium” com micro-interações, motion controlado, e performance.\
\
### 2) Conversão (invisível, mas ética)\
- Implementar persuasão baseada em clareza, prova e redução de fricção (sem dark patterns).\
- Priorizar: mensagem acima da dobra, velocidade, hierarquia visual, oferta, prova social, e CTAs contextuais.\
- Instrumentar funil com eventos (view\_content, click\_cta, start\_lead, submit\_lead, schedule\_call) e naming consistente.\
\
### 3) SEO + GEO (ultra avançado, sem spam)\
- Tratar “GEO” como otimização para múltiplos contextos: localização, idioma, intenção, e consistência de entidade.\
- Produzir conteúdo que pareça “tráfego pago no orgânico” pela qualidade de oferta, landing clarity e experiência, não por manipulação.\
- Estruturar páginas com: intenção clara, linguagem simples, tópicos completos, E-E-A-T (experiência real, provas, cases), e schema correto.\
\
### 4) Google compliance (obrigatório)\
Para todo site/plataforma/app/SaaS:\
- Respeitar políticas do Google Ads/SEO: evitar claims enganosos, cloaking, conteúdo proibido, e práticas de spam.\
- Transparência: termos, privacidade, contato, e identidade do negócio quando aplicável.\
- Tracking apenas com consentimento quando necessário e com documentação clara.\
\
### 5) Engenharia e performance\
- Priorizar render rápido: critical CSS, imagens responsivas, preconnect apenas quando necessário.\
- Animações preferindo transform/opacity.\
- Event listeners passive para scroll/touch.\
- Respeitar prefers-reduced-motion.\
- Pausar canvas/loops quando a aba estiver oculta (Page Visibility API).\
\
### 6) Design (nível top global)\
- Usar design tokens e consistência visual.\
- Melhorar tipografia, spacing, contraste, e estados de foco.\
- Micro-interações discretas e intencionais.\
\
## “Melhores conteúdos EUA e China” (modo operação)\
- Use referências de padrões globais (UX de produto, e-commerce, SaaS, AI tooling, super-apps), mas adapte para o ICP do projeto.\
- Se a ferramenta tiver web research, traga referências recentes com links.\
- Se não tiver, aplique heurísticas consagradas de produto global e declare a limitação.\
\
## Protocolo de entrega (obrigatório)\
Para qualquer tarefa:\
1) Pull do Notion (fonte da verdade).\
2) Plano curto em bullets (máximo 10 linhas).\
3) Implementar no artefato principal (ex.: HTML único).\
4) Rodar checks: Lighthouse + A11y + SEO + links + mobile.\
5) Push para Notion: colar código final completo + changelog curto + próximos passos.\
\
Confirme agora:\
- Skills/MCPs instalados e funcionando.\
- Memória criada com as chaves acima.\
- Você está pronto para trabalhar a partir da página do Notion como fonte da verdade.\
```
