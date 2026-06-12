# Configuração sites

Source: Notion — Configuracao sites
Page ID: 3488a253-0044-8067-abe4-fb5345514344
URL: https://app.notion.com/p/Configura-o-sites-3488a25300448067abe4fb5345514344

###

#

```html
<!DOCTYPEhtml>
<htmllang="pt-BR">
<head>
  <metacharset="UTF-8">
  <metaname="viewport"content="width=device-width, initial-scale=1.0">
  <metaname="description"content="reidasvendas - Plataforma enterprise de website builder com IA para negócios locais. Sites profissionais que convertem.">
  <metaname="keywords"content="website builder, ia, automação, negócios locais, sites profissionais, conversão">
  <metaname="author"content="reidasvendas - Agência de IA">
  <metaname="robots"content="index, follow">

<!-- Open Graph -->
  <metaproperty="og:type"content="website">
  <metaproperty="og:url"content="https://reidasvendas.com/">
  <metaproperty="og:title"content="reidasvendas | Plataforma Enterprise de Website Builder com IA">
  <metaproperty="og:description"content="Sites profissionais que convertem. Tecnologia de big techs para seu negócio local.">
  <metaproperty="og:image"content="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg">

  <title>reidasvendas | Plataforma Enterprise de Website Builder com IA</title>

<!-- Favicon -->
  <linkrel="icon"type="image/svg+xml"href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%232563eb' width='100' height='100' rx='20'/><text y='70' x='50' text-anchor='middle' fill='white' font-size='60' font-weight='bold'>P</text></svg>">

<!-- Tailwind CSS -->
  <scriptsrc="https://cdn.tailwindcss.com"></script>
  <script>
tailwind.config= {
      theme: {
        extend: {
          colors: {
            primary: {50:'#eff6ff',100:'#dbeafe',200:'#bfdbfe',300:'#93c5fd',400:'#60a5fa',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8',800:'#1e40af',900:'#1e3a8a' },
            accent: {50:'#f0fdf4',100:'#dcfce7',200:'#bbf7d0',300:'#86efac',400:'#4ade80',500:'#22c55e',600:'#16a34a',700:'#15803d',800:'#166534',900:'#14532d' },
            neutral: {50:'#fafafa',100:'#f4f4f5',200:'#e4e4e7',300:'#d4d4d8',400:'#a1a1aa',500:'#71717a',600:'#52525b',700:'#3f3f46',800:'#27272a',900:'#18181b' }
          },
          fontFamily: {
            sans: ['Inter','system-ui','-apple-system','sans-serif'],
            display: ['Plus Jakarta Sans','system-ui','sans-serif']
          },
          animation: {
'fade-in':'fadeIn 0.6s ease-out',
'fade-in-up':'fadeInUp 0.7s ease-out',
'slide-in-right':'slideInRight 0.5s ease-out',
'pulse-slow':'pulse 3s infinite',
'bounce-slow':'bounce 2s infinite',
'wiggle':'wiggle 0.5s ease-in-out infinite'
          },
          keyframes: {
            fadeIn: {'0%': { opacity:'0' },'100%': { opacity:'1' } },
            fadeInUp: {'0%': { opacity:'0', transform:'translateY(30px)' },'100%': { opacity:'1', transform:'translateY(0)' } },
            slideInRight: {'0%': { opacity:'0', transform:'translateX(100%)' },'100%': { opacity:'1', transform:'translateX(0)' } },
            wiggle: {'0%, 100%': { transform:'rotate(-5deg)' },'50%': { transform:'rotate(5deg)' } }
          },
          boxShadow: {
'soft':'0 2px 15px -3px rgba(0, 0, 0, 0.07)',
'medium':'0 4px 25px -5px rgba(0, 0, 0, 0.1)',
'large':'0 10px 40px -10px rgba(0, 0, 0, 0.15)',
'glow':'0 0 40px -10px rgba(37, 99, 235, 0.5)'
          }
        }
      }
    }
  </script>

<!-- Google Fonts -->
  <linkrel="preconnect"href="https://fonts.googleapis.com">
  <linkrel="preconnect"href="https://fonts.gstatic.com"crossorigin>
  <linkhref="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"rel="stylesheet">

<!-- Lucide Icons -->
  <scriptsrc="https://unpkg.com/lucide@latest"></script>

<!-- Custom CSS -->
  <style>
* { scroll-behavior: smooth; }
body { font-family:'Inter', system-ui, sans-serif; }
h1,h2,h3,h4,h5,h6 { font-family:'Plus Jakarta Sans', system-ui, sans-serif; }

    .gradient-text { background:linear-gradient(135deg, #2563eb, #1d4ed8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .gradient-bg { background:linear-gradient(135deg, #2563eb, #1d4ed8); }
    .gradient-bg-gold { background:linear-gradient(135deg, #d4af37, #f4e5b2, #d4af37); }

    .video-bg { position: absolute; inset:0; width:100%; height:100%; object-fit: cover; }
    .overlay-dark { background:linear-gradient(180deg,rgba(17,24,39,0.85)0%,rgba(17,24,39,0.7)100%); }

    .glass { background:rgba(255,255,255,0.95); backdrop-filter:blur(16px); border:1px solidrgba(255,255,255,0.3); }
    .glass-dark { background:rgba(17,24,39,0.95); backdrop-filter:blur(16px); border:1px solidrgba(255,255,255,0.1); }

/* Custom Scrollbar */
    ::-webkit-scrollbar { width:8px; height:8px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background:linear-gradient(135deg, #2563eb, #1d4ed8); border-radius:4px; }
    ::-webkit-scrollbar-thumb:hover { background:linear-gradient(135deg, #1d4ed8, #1e40af); }

/* Animation on Scroll */
    .aos { opacity:0; transform:translateY(40px); transition: all0.8scubic-bezier(0.4,0,0.2,1); }
    .aos.visible { opacity:1; transform:translateY(0); }

/* Mobile Menu */
    .mobile-menu { transform:translateX(-100%); transition: transform0.4scubic-bezier(0.4,0,0.2,1); }
    .mobile-menu.open { transform:translateX(0); }

/* Button Styles */
    .btn-primary {
      background:linear-gradient(135deg, #2563eb, #1d4ed8);
      transition: all0.4scubic-bezier(0.4,0,0.2,1);
      position: relative;
      overflow: hidden;
    }
    .btn-primary::before {
      content:'';
      position: absolute;
      top:0; left:-100%;
      width:100%; height:100%;
      background:linear-gradient(90deg, transparent,rgba(255,255,255,0.2), transparent);
      transition: left0.5s;
    }
    .btn-primary:hover::before { left:100%; }
    .btn-primary:hover {
      transform:translateY(-3px);
      box-shadow:015px50pxrgba(37,99,235,0.4);
    }

    .btn-secondary {
      background: white;
      border:2px solid #e4e4e7;
      transition: all0.3s ease;
    }
    .btn-secondary:hover {
      border-color: #2563eb;
      color: #2563eb;
      transform:translateY(-2px);
    }

/* Card Hover Effects */
    .feature-card { transition: all0.5scubic-bezier(0.4,0,0.2,1); }
    .feature-card:hover {
      transform:translateY(-10px);
      box-shadow:025px50pxrgba(0,0,0,0.15);
      border-color: #2563eb;
    }

/* Template Card */
    .template-card { overflow: hidden; }
    .template-cardimg { transition: transform0.8scubic-bezier(0.4,0,0.2,1); }
    .template-card:hoverimg { transform:scale(1.1); }
    .template-card .overlay { opacity:0; transition: opacity0.5s ease; }
    .template-card:hover .overlay { opacity:1; }

/* Pricing Card */
    .pricing-card { transition: all0.5s ease; }
    .pricing-card.popular {
      transform:scale(1.05);
      border-color: #2563eb;
      box-shadow:025px50pxrgba(37,99,235,0.2);
      position: relative;
      z-index:10;
    }
    .pricing-card:hover { transform:translateY(-10px); box-shadow:025px50pxrgba(0,0,0,0.15); }

/* Navigation Active State */
    .nav-link { position: relative; }
    .nav-link::after {
      content:'';
      position: absolute;
      bottom:-4px;
      left:0;
      width:0;
      height:2px;
      background:linear-gradient(90deg, #2563eb, #1d4ed8);
      transition: width0.4s ease;
    }
    .nav-link:hover::after, .nav-link.active::after { width:100%; }

/* WhatsApp Button */
    .whatsapp-float {
      position: fixed;
      bottom:30px;
      right:30px;
      z-index:1000;
      animation: wiggle2s ease-in-out infinite;
    }
    .whatsapp-float:hover {
      transform:scale(1.1);
    }

/* Page Sections */
    .page-section { display: none; }
    .page-section.active { display: block; animation: fadeIn0.6s ease; }

/* Form Styles */
    .input-field {
      transition: all0.3s ease;
      border:2px solid #e4e4e7;
    }
    .input-field:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow:0004pxrgba(37,99,235,0.1);
    }

/* Testimonial Card */
    .testimonial-card { background: white; border:1px solid #e4e4e7; transition: all0.4s ease; }
    .testimonial-card:hover { border-color: #2563eb; transform:translateY(-5px); }

/* Loading Spinner */
    .spinner { border:3px solid #e4e4e7; border-top-color: #2563eb; border-radius:50%; width:40px; height:40px; animation: spin1s linear infinite; }
    @keyframesspin { to { transform:rotate(360deg); } }

/* Hero Floating Elements */
    @keyframesfloat {
      0%, 100% { transform:translateY(0); }
      50% { transform:translateY(-15px); }
    }
    .float-animation { animation: float4s ease-in-out infinite; }

/* Niche Badge */
    .niche-badge {
      background:linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      padding:4px12px;
      border-radius:20px;
      font-size:12px;
      font-weight:600;
      text-transform: uppercase;
      letter-spacing:0.5px;
    }

/* Map Container */
    .map-container {
      position: relative;
      overflow: hidden;
      border-radius:12px;
    }

/* Social Icons */
    .social-icon {
      transition: all0.3s ease;
    }
    .social-icon:hover {
      transform:translateY(-3px);
      color: #2563eb;
    }

/* CTA Pulse */
    .cta-pulse {
      animation: pulse-glow2s ease-in-out infinite;
    }
    @keyframespulse-glow {
      0%, 100% { box-shadow:0020pxrgba(37,99,235,0.4); }
      50% { box-shadow:0040pxrgba(37,99,235,0.7); }
    }

/* Trust Badge */
    .trust-badge {
      filter:grayscale(100%);
      opacity:0.6;
      transition: all0.3s ease;
    }
    .trust-badge:hover {
      filter:grayscale(0%);
      opacity:1;
    }
  </style>
</head>
<bodyclass="bg-white text-neutral-900 antialiased">

<!-- ==================== WHATSAPP FLOATING BUTTON ==================== -->
  <ahref="https://wa.me/5511999999999"target="_blank"class="whatsapp-float bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg">
    <idata-lucide="message-circle"class="w-8 h-8"></i>
  </a>

<!-- ==================== HEADER ==================== -->
  <headerid="header"class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass border-b border-neutral-200">
    <divclass="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <divclass="flex justify-between items-center h-20">
<!-- Logo -->
        <ahref="#"onclick="showPage('home')"class="flex items-center gap-3 group">
          <divclass="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <spanclass="text-white font-bold text-lg">P</span>
          </div>
          <div>
            <spanclass="text-2xl font-bold text-neutral-900">reidasvendas</span>
            <pclass="text-xs text-neutral-500 -mt-1">Agência de IA</p>
          </div>
        </a>

<!-- Desktop Navigation -->
        <navclass="hidden md:flex items-center gap-8">
          <ahref="#"onclick="showPage('home')"class="nav-link text-neutral-600 hover:text-neutral-900 font-medium">Home</a>
          <ahref="#"onclick="showPage('templates')"class="nav-link text-neutral-600 hover:text-neutral-900 font-medium">Templates</a>
          <ahref="#"onclick="showPage('features')"class="nav-link text-neutral-600 hover:text-neutral-900 font-medium">Recursos</a>
          <ahref="#"onclick="showPage('pricing')"class="nav-link text-neutral-600 hover:text-neutral-900 font-medium">Planos</a>
          <ahref="#"onclick="showPage('portfolio')"class="nav-link text-neutral-600 hover:text-neutral-900 font-medium">Portfólio</a>
          <ahref="#"onclick="showPage('contact')"class="nav-link text-neutral-600 hover:text-neutral-900 font-medium">Contato</a>
        </nav>

<!-- Auth Buttons -->
        <divclass="hidden md:flex items-center gap-4">
          <ahref="#"onclick="showPage('login')"class="px-4 py-2 text-neutral-600 hover:text-neutral-900 font-medium">Entrar</a>
          <ahref="#"onclick="showPage('signup')"class="btn-primary px-6 py-2.5 text-white font-semibold rounded-xl shadow-md cta-pulse">Começar Grátis</a>
        </div>

<!-- Mobile Menu Button -->
        <buttonid="mobileMenuBtn"class="md:hidden p-2 text-neutral-600 hover:text-neutral-900">
          <idata-lucide="menu"class="w-6 h-6"></i>
        </button>
      </div>
    </div>

<!-- Mobile Menu -->
    <divid="mobileMenu"class="mobile-menu fixed inset-0 z-40 bg-white md:hidden">
      <divclass="flex flex-col p-6 space-y-4">
        <divclass="flex justify-between items-center mb-8">
          <divclass="flex items-center gap-3">
            <divclass="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <spanclass="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <spanclass="text-xl font-bold">reidasvendas</span>
              <pclass="text-xs text-neutral-500">Agência de IA</p>
            </div>
          </div>
          <buttonid="closeMobileMenu"class="p-2 text-neutral-600">
            <idata-lucide="x"class="w-6 h-6"></i>
          </button>
        </div>
        <ahref="#"onclick="showPage('home')"class="text-lg text-neutral-600 py-2">Home</a>
        <ahref="#"onclick="showPage('templates')"class="text-lg text-neutral-600 py-2">Templates</a>
        <ahref="#"onclick="showPage('features')"class="text-lg text-neutral-600 py-2">Recursos</a>
        <ahref="#"onclick="showPage('pricing')"class="text-lg text-neutral-600 py-2">Planos</a>
        <ahref="#"onclick="showPage('portfolio')"class="text-lg text-neutral-600 py-2">Portfólio</a>
        <ahref="#"onclick="showPage('contact')"class="text-lg text-neutral-600 py-2">Contato</a>
        <hrclass="border-neutral-200">
        <ahref="#"onclick="showPage('login')"class="text-lg text-neutral-600 py-2">Entrar</a>
        <ahref="#"onclick="showPage('signup')"class="btn-primary text-center py-3 rounded-xl">Começar Grátis</a>
      </div>
    </div>
  </header>

  <divclass="h-20"></div>

<!-- ==================== HOME PAGE ==================== -->
  <mainid="home"class="page-section active">

<!-- Hero Section -->
    <sectionclass="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20">
      <divclass="absolute inset-0">
        <videoautoplayloopmutedplaysInlineclass="video-bg"poster="https://images.pexels.com/videos/3129671/free-video-3129671.jpg">
          <sourcesrc="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_25fps.mp4"type="video/mp4">
        </video>
        <divclass="absolute inset-0 overlay-dark"></div>
      </div>

      <divclass="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-32">
        <divclass="aos">
          <divclass="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
            <idata-lucide="sparkles"class="w-4 h-4 text-yellow-400"></i>
            <span>IA de Ponta | Conversão Máxima | Entrega Rápida</span>
          </div>

          <h1class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Sites Que Convertem
            <spanclass="block mt-2"style="background: linear-gradient(135deg, #60a5fa, #93c5fd); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Como Big Techs Fazem</span>
          </h1>

          <pclass="text-xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed">
            Tecnologia enterprise para seu negócio local. IA, automação, tráfego pago e design que hipnotiza.
            Seus clientes não vão conseguir resistir ao CTA.
          </p>

          <divclass="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <ahref="#"onclick="showPage('signup')"class="btn-primary px-8 py-4 text-white font-semibold rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg cta-pulse">
              <idata-lucide="rocket"class="w-5 h-5"></i>
              Criar Meu Site Agora
            </a>
            <ahref="#"onclick="showPage('templates')"class="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <idata-lucide="layout-grid"class="w-5 h-5"></i>
              Ver Templates
            </a>
          </div>

          <divclass="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
            <spanclass="flex items-center gap-2"><idata-lucide="circle-check"class="w-4 h-4 text-green-400"></i> Site em 24h</span>
            <spanclass="flex items-center gap-2"><idata-lucide="circle-check"class="w-4 h-4 text-green-400"></i> IA Integrada</span>
            <spanclass="flex items-center gap-2"><idata-lucide="circle-check"class="w-4 h-4 text-green-400"></i> Tráfego Incluso</span>
            <spanclass="flex items-center gap-2"><idata-lucide="circle-check"class="w-4 h-4 text-green-400"></i> Google Meu Negócio</span>
          </div>
        </div>
      </div>

      <divclass="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <divclass="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <divclass="w-1.5 h-3 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </section>

<!-- Stats Section -->
    <sectionclass="py-16 bg-white border-b border-neutral-100">
      <divclass="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <divclass="grid grid-cols-2 md:grid-cols-4 gap-8">
          <divclass="aos text-center">
            <pclass="stat-number text-4xl font-bold text-neutral-900 mb-1">500+</p>
            <pclass="text-neutral-600">Sites Criados</p>
          </div>
          <divclass="aos text-center"style="animation-delay: 0.1s">
            <pclass="stat-number text-4xl font-bold text-neutral-900 mb-1">98%</p>
            <pclass="text-neutral-600">Satisfação</p>
          </div>
          <divclass="aos text-center"style="animation-delay: 0.2s">
            <pclass="stat-number text-4xl font-bold text-neutral-900 mb-1">3x</p>
            <pclass="text-neutral-600">Mais Conversão</p>
          </div>
          <divclass="aos text-center"style="animation-delay: 0.3s">
            <pclass="stat-number text-4xl font-bold text-neutral-900 mb-1">24h</p>
            <pclass="text-neutral-600">Entrega Média</p>
          </div>
        </div>
      </div>
    </section>

<!-- Templates Library Section -->
    <sectionid="templates"class="py-24 bg-neutral-50">
      <divclass="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <divclass="aos text-center mb-16">
          <spanclass="niche-badge mb-4 inline-block">Biblioteca Completa</span>
          <h2class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Templates Por Nicho</h2>
          <pclass="text-xl text-neutral-600 max-w-2xl mx-auto">Cada template é um projeto final, pronto para usar. Design baseado em neurociência para máxima conversão.</p>
        </div>

<!-- Search & Filter -->
        <divclass="aos mb-12">
          <divclass="max-w-2xl mx-auto">
            <divclass="relative">
              <idata-lucide="search"class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5"></i>
              <inputtype="text"id="templateSearch"placeholder="Buscar template por nicho..."class="input-field w-full pl-12 pr-4 py-4 rounded-xl">
            </div>
          </div>
          <divclass="flex flex-wrap justify-center gap-3 mt-6"id="nicheFilters">
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-neutral-900 text-white"data-niche="all">Todos</button>
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-white text-neutral-600 hover:bg-neutral-100"data-niche="saude">Saúde</button>
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-white text-neutral-600 hover:bg-neutral-100"data-niche="estetica">Estética</button>
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-white text-neutral-600 hover:bg-neutral-100"data-niche="varejo">Varejo</button>
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-white text-neutral-600 hover:bg-neutral-100"data-niche="educacao">Educação</button>
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-white text-neutral-600 hover:bg-neutral-100"data-niche="servicos">Serviços</button>
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-white text-neutral-600 hover:bg-neutral-100"data-niche="luxo">Luxo</button>
          </div>
        </div>

<!-- Templates Grid -->
        <divclass="grid md:grid-cols-2 lg:grid-cols-3 gap-6"id="templatesGrid">
<!-- SAÚDE -->
          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="saude">
            <imgsrc="https://images.pexels.com/photos/5904388/pexels-photo-5904388.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Clínica Odontológica"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Saúde</span>
                <h3class="text-white text-xl font-bold mb-1">Clínica Odontológica</h3>
                <pclass="text-white/80 text-sm">Sorriso Perfeito</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('clinica-odontologica')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="saude">
            <imgsrc="https://images.pexels.com/photos/5904373/pexels-photo-5904373.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Médico"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Saúde</span>
                <h3class="text-white text-xl font-bold mb-1">Médico</h3>
                <pclass="text-white/80 text-sm">Dr. Saúde Premium</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('medico')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="saude">
            <imgsrc="https://images.pexels.com/photos/5904366/pexels-photo-5904366.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Nutricionista"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Saúde</span>
                <h3class="text-white text-xl font-bold mb-1">Nutricionista</h3>
                <pclass="text-white/80 text-sm">Vida Saudável</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('nutricionista')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="saude">
            <imgsrc="https://images.pexels.com/photos/5733654/pexels-photo-5733654.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Fisioterapeuta"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Saúde</span>
                <h3class="text-white text-xl font-bold mb-1">Fisioterapeuta</h3>
                <pclass="text-white/80 text-sm">Movimento & Vida</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('fisioterapeuta')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="saude">
            <imgsrc="https://images.pexels.com/photos/5904352/pexels-photo-5904352.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Enfermeiro"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Saúde</span>
                <h3class="text-white text-xl font-bold mb-1">Enfermeiro</h3>
                <pclass="text-white/80 text-sm">Cuidar & Acolher</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('enfermeiro')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="saude">
            <imgsrc="https://images.pexels.com/photos/5904340/pexels-photo-5904340.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Cuidador de Idosos"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Saúde</span>
                <h3class="text-white text-xl font-bold mb-1">Cuidador de Idosos</h3>
                <pclass="text-white/80 text-sm">Melhor Idade</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('cuidador-idosos')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

<!-- ESTÉTICA -->
          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="estetica">
            <imgsrc="https://images.pexels.com/photos/5668862/pexels-photo-5668862.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Estética Automotiva"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Estética</span>
                <h3class="text-white text-xl font-bold mb-1">Estética Automotiva</h3>
                <pclass="text-white/80 text-sm">Auto Premium</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('estetica-automotiva')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="estetica">
            <imgsrc="https://images.pexels.com/photos/5904373/pexels-photo-5904373.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Estética Dental"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Estética</span>
                <h3class="text-white text-xl font-bold mb-1">Estética Dental</h3>
                <pclass="text-white/80 text-sm">Sorriso Hollywood</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('estetica-dental')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="estetica">
            <imgsrc="https://images.pexels.com/photos/5904388/pexels-photo-5904388.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Estética Emagrecimento"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Estética</span>
                <h3class="text-white text-xl font-bold mb-1">Emagrecimento</h3>
                <pclass="text-white/80 text-sm">Corpo & Saúde</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('estetica-emagrecimento')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

<!-- VAREJO -->
          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Loja Masculina"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Moda Masculina</h3>
                <pclass="text-white/80 text-sm">Homem Moderno</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('loja-masculina')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/5904373/pexels-photo-5904373.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Loja Feminina"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Moda Feminina</h3>
                <pclass="text-white/80 text-sm">Ela Fashion</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('loja-feminina')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Loja Infantil"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Moda Infantil</h3>
                <pclass="text-white/80 text-sm">Kids Style</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('loja-infantil')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Produtos Esportivos"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Produtos Esportivos</h3>
                <pclass="text-white/80 text-sm">Sport Pro</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('loja-esportiva')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Padaria"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Padaria</h3>
                <pclass="text-white/80 text-sm">Pão & Arte</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('padaria')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/5668862/pexels-photo-5668862.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Papelaria"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Papelaria</h3>
                <pclass="text-white/80 text-sm">Papel & Cia</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('papelaria')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Loja de Informática"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Informática</h3>
                <pclass="text-white/80 text-sm">Tech Store</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('loja-informatica')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

<!-- EDUCAÇÃO -->
          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="educacao">
            <imgsrc="https://images.pexels.com/photos/5904388/pexels-photo-5904388.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Escola de Inglês"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Educação</span>
                <h3class="text-white text-xl font-bold mb-1">Escola de Inglês</h3>
                <pclass="text-white/80 text-sm">English Pro</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('escola-ingles')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="educacao">
            <imgsrc="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Escola de Música"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Educação</span>
                <h3class="text-white text-xl font-bold mb-1">Escola de Música</h3>
                <pclass="text-white/80 text-sm">Som & Arte</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('escola-musica')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

<!-- SERVIÇOS -->
          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="servicos">
            <imgsrc="https://images.pexels.com/photos/5668862/pexels-photo-5668862.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Estacionamento"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Serviços</span>
                <h3class="text-white text-xl font-bold mb-1">Estacionamento</h3>
                <pclass="text-white/80 text-sm">Park & Go</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('estacionamento')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="servicos">
            <imgsrc="https://images.pexels.com/photos/5904340/pexels-photo-5904340.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Babá"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Serviços</span>
                <h3class="text-white text-xl font-bold mb-1">Cuidador Infantil</h3>
                <pclass="text-white/80 text-sm">Baby Care</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('bab
```

```plain text
<!DOCTYPEhtml>
<htmllang="pt-BR">
<head>
  <metacharset="UTF-8">
  <metaname="viewport"content="width=device-width, initial-scale=1.0">
  <metaname="description"content="reidasvendas - Plataforma enterprise de website builder com IA para negócios locais. Sites profissionais que convertem.">
  <metaname="keywords"content="website builder, ia, automação, negócios locais, sites profissionais, conversão">
  <metaname="author"content="reidasvendas - Agência de IA">
  <metaname="robots"content="index, follow">

<!-- Open Graph -->
  <metaproperty="og:type"content="website">
  <metaproperty="og:url"content="https://reidasvendas.com/">
  <metaproperty="og:title"content="reidasvendas | Plataforma Enterprise de Website Builder com IA">
  <metaproperty="og:description"content="Sites profissionais que convertem. Tecnologia de big techs para seu negócio local.">
  <metaproperty="og:image"content="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg">

  <title>reidasvendas | Plataforma Enterprise de Website Builder com IA</title>

<!-- Favicon -->
  <linkrel="icon"type="image/svg+xml"href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%232563eb' width='100' height='100' rx='20'/><text y='70' x='50' text-anchor='middle' fill='white' font-size='60' font-weight='bold'>P</text></svg>">

<!-- Tailwind CSS -->
  <scriptsrc="https://cdn.tailwindcss.com"></script>
  <script>
tailwind.config= {
      theme: {
        extend: {
          colors: {
            primary: {50:'#eff6ff',100:'#dbeafe',200:'#bfdbfe',300:'#93c5fd',400:'#60a5fa',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8',800:'#1e40af',900:'#1e3a8a' },
            accent: {50:'#f0fdf4',100:'#dcfce7',200:'#bbf7d0',300:'#86efac',400:'#4ade80',500:'#22c55e',600:'#16a34a',700:'#15803d',800:'#166534',900:'#14532d' },
            neutral: {50:'#fafafa',100:'#f4f4f5',200:'#e4e4e7',300:'#d4d4d8',400:'#a1a1aa',500:'#71717a',600:'#52525b',700:'#3f3f46',800:'#27272a',900:'#18181b' }
          },
          fontFamily: {
            sans: ['Inter','system-ui','-apple-system','sans-serif'],
            display: ['Plus Jakarta Sans','system-ui','sans-serif']
          },
          animation: {
'fade-in':'fadeIn 0.6s ease-out',
'fade-in-up':'fadeInUp 0.7s ease-out',
'slide-in-right':'slideInRight 0.5s ease-out',
'pulse-slow':'pulse 3s infinite',
'bounce-slow':'bounce 2s infinite',
'wiggle':'wiggle 0.5s ease-in-out infinite'
          },
          keyframes: {
            fadeIn: {'0%': { opacity:'0' },'100%': { opacity:'1' } },
            fadeInUp: {'0%': { opacity:'0', transform:'translateY(30px)' },'100%': { opacity:'1', transform:'translateY(0)' } },
            slideInRight: {'0%': { opacity:'0', transform:'translateX(100%)' },'100%': { opacity:'1', transform:'translateX(0)' } },
            wiggle: {'0%, 100%': { transform:'rotate(-5deg)' },'50%': { transform:'rotate(5deg)' } }
          },
          boxShadow: {
'soft':'0 2px 15px -3px rgba(0, 0, 0, 0.07)',
'medium':'0 4px 25px -5px rgba(0, 0, 0, 0.1)',
'large':'0 10px 40px -10px rgba(0, 0, 0, 0.15)',
'glow':'0 0 40px -10px rgba(37, 99, 235, 0.5)'
          }
        }
      }
    }
  </script>

<!-- Google Fonts -->
  <linkrel="preconnect"href="https://fonts.googleapis.com">
  <linkrel="preconnect"href="https://fonts.gstatic.com"crossorigin>
  <linkhref="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"rel="stylesheet">

<!-- Lucide Icons -->
  <scriptsrc="https://unpkg.com/lucide@latest"></script>

<!-- Custom CSS -->
  <style>
* { scroll-behavior: smooth; }
body { font-family:'Inter', system-ui, sans-serif; }
h1,h2,h3,h4,h5,h6 { font-family:'Plus Jakarta Sans', system-ui, sans-serif; }

    .gradient-text { background:linear-gradient(135deg, #2563eb, #1d4ed8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .gradient-bg { background:linear-gradient(135deg, #2563eb, #1d4ed8); }
    .gradient-bg-gold { background:linear-gradient(135deg, #d4af37, #f4e5b2, #d4af37); }

    .video-bg { position: absolute; inset:0; width:100%; height:100%; object-fit: cover; }
    .overlay-dark { background:linear-gradient(180deg,rgba(17,24,39,0.85)0%,rgba(17,24,39,0.7)100%); }

    .glass { background:rgba(255,255,255,0.95); backdrop-filter:blur(16px); border:1px solidrgba(255,255,255,0.3); }
    .glass-dark { background:rgba(17,24,39,0.95); backdrop-filter:blur(16px); border:1px solidrgba(255,255,255,0.1); }

/* Custom Scrollbar */
    ::-webkit-scrollbar { width:8px; height:8px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background:linear-gradient(135deg, #2563eb, #1d4ed8); border-radius:4px; }
    ::-webkit-scrollbar-thumb:hover { background:linear-gradient(135deg, #1d4ed8, #1e40af); }

/* Animation on Scroll */
    .aos { opacity:0; transform:translateY(40px); transition: all0.8scubic-bezier(0.4,0,0.2,1); }
    .aos.visible { opacity:1; transform:translateY(0); }

/* Mobile Menu */
    .mobile-menu { transform:translateX(-100%); transition: transform0.4scubic-bezier(0.4,0,0.2,1); }
    .mobile-menu.open { transform:translateX(0); }

/* Button Styles */
    .btn-primary {
      background:linear-gradient(135deg, #2563eb, #1d4ed8);
      transition: all0.4scubic-bezier(0.4,0,0.2,1);
      position: relative;
      overflow: hidden;
    }
    .btn-primary::before {
      content:'';
      position: absolute;
      top:0; left:-100%;
      width:100%; height:100%;
      background:linear-gradient(90deg, transparent,rgba(255,255,255,0.2), transparent);
      transition: left0.5s;
    }
    .btn-primary:hover::before { left:100%; }
    .btn-primary:hover {
      transform:translateY(-3px);
      box-shadow:015px50pxrgba(37,99,235,0.4);
    }

    .btn-secondary {
      background: white;
      border:2px solid #e4e4e7;
      transition: all0.3s ease;
    }
    .btn-secondary:hover {
      border-color: #2563eb;
      color: #2563eb;
      transform:translateY(-2px);
    }

/* Card Hover Effects */
    .feature-card { transition: all0.5scubic-bezier(0.4,0,0.2,1); }
    .feature-card:hover {
      transform:translateY(-10px);
      box-shadow:025px50pxrgba(0,0,0,0.15);
      border-color: #2563eb;
    }

/* Template Card */
    .template-card { overflow: hidden; }
    .template-cardimg { transition: transform0.8scubic-bezier(0.4,0,0.2,1); }
    .template-card:hoverimg { transform:scale(1.1); }
    .template-card .overlay { opacity:0; transition: opacity0.5s ease; }
    .template-card:hover .overlay { opacity:1; }

/* Pricing Card */
    .pricing-card { transition: all0.5s ease; }
    .pricing-card.popular {
      transform:scale(1.05);
      border-color: #2563eb;
      box-shadow:025px50pxrgba(37,99,235,0.2);
      position: relative;
      z-index:10;
    }
    .pricing-card:hover { transform:translateY(-10px); box-shadow:025px50pxrgba(0,0,0,0.15); }

/* Navigation Active State */
    .nav-link { position: relative; }
    .nav-link::after {
      content:'';
      position: absolute;
      bottom:-4px;
      left:0;
      width:0;
      height:2px;
      background:linear-gradient(90deg, #2563eb, #1d4ed8);
      transition: width0.4s ease;
    }
    .nav-link:hover::after, .nav-link.active::after { width:100%; }

/* WhatsApp Button */
    .whatsapp-float {
      position: fixed;
      bottom:30px;
      right:30px;
      z-index:1000;
      animation: wiggle2s ease-in-out infinite;
    }
    .whatsapp-float:hover {
      transform:scale(1.1);
    }

/* Page Sections */
    .page-section { display: none; }
    .page-section.active { display: block; animation: fadeIn0.6s ease; }

/* Form Styles */
    .input-field {
      transition: all0.3s ease;
      border:2px solid #e4e4e7;
    }
    .input-field:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow:0004pxrgba(37,99,235,0.1);
    }

/* Testimonial Card */
    .testimonial-card { background: white; border:1px solid #e4e4e7; transition: all0.4s ease; }
    .testimonial-card:hover { border-color: #2563eb; transform:translateY(-5px); }

/* Loading Spinner */
    .spinner { border:3px solid #e4e4e7; border-top-color: #2563eb; border-radius:50%; width:40px; height:40px; animation: spin1s linear infinite; }
    @keyframesspin { to { transform:rotate(360deg); } }

/* Hero Floating Elements */
    @keyframesfloat {
      0%, 100% { transform:translateY(0); }
      50% { transform:translateY(-15px); }
    }
    .float-animation { animation: float4s ease-in-out infinite; }

/* Niche Badge */
    .niche-badge {
      background:linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      padding:4px12px;
      border-radius:20px;
      font-size:12px;
      font-weight:600;
      text-transform: uppercase;
      letter-spacing:0.5px;
    }

/* Map Container */
    .map-container {
      position: relative;
      overflow: hidden;
      border-radius:12px;
    }

/* Social Icons */
    .social-icon {
      transition: all0.3s ease;
    }
    .social-icon:hover {
      transform:translateY(-3px);
      color: #2563eb;
    }

/* CTA Pulse */
    .cta-pulse {
      animation: pulse-glow2s ease-in-out infinite;
    }
    @keyframespulse-glow {
      0%, 100% { box-shadow:0020pxrgba(37,99,235,0.4); }
      50% { box-shadow:0040pxrgba(37,99,235,0.7); }
    }

/* Trust Badge */
    .trust-badge {
      filter:grayscale(100%);
      opacity:0.6;
      transition: all0.3s ease;
    }
    .trust-badge:hover {
      filter:grayscale(0%);
      opacity:1;
    }
  </style>
</head>
<bodyclass="bg-white text-neutral-900 antialiased">

<!-- ==================== WHATSAPP FLOATING BUTTON ==================== -->
  <ahref="https://wa.me/5511999999999"target="_blank"class="whatsapp-float bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg">
    <idata-lucide="message-circle"class="w-8 h-8"></i>
  </a>

<!-- ==================== HEADER ==================== -->
  <headerid="header"class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass border-b border-neutral-200">
    <divclass="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <divclass="flex justify-between items-center h-20">
<!-- Logo -->
        <ahref="#"onclick="showPage('home')"class="flex items-center gap-3 group">
          <divclass="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <spanclass="text-white font-bold text-lg">P</span>
          </div>
          <div>
            <spanclass="text-2xl font-bold text-neutral-900">reidasvendas</span>
            <pclass="text-xs text-neutral-500 -mt-1">Agência de IA</p>
          </div>
        </a>

<!-- Desktop Navigation -->
        <navclass="hidden md:flex items-center gap-8">
          <ahref="#"onclick="showPage('home')"class="nav-link text-neutral-600 hover:text-neutral-900 font-medium">Home</a>
          <ahref="#"onclick="showPage('templates')"class="nav-link text-neutral-600 hover:text-neutral-900 font-medium">Templates</a>
          <ahref="#"onclick="showPage('features')"class="nav-link text-neutral-600 hover:text-neutral-900 font-medium">Recursos</a>
          <ahref="#"onclick="showPage('pricing')"class="nav-link text-neutral-600 hover:text-neutral-900 font-medium">Planos</a>
          <ahref="#"onclick="showPage('portfolio')"class="nav-link text-neutral-600 hover:text-neutral-900 font-medium">Portfólio</a>
          <ahref="#"onclick="showPage('contact')"class="nav-link text-neutral-600 hover:text-neutral-900 font-medium">Contato</a>
        </nav>

<!-- Auth Buttons -->
        <divclass="hidden md:flex items-center gap-4">
          <ahref="#"onclick="showPage('login')"class="px-4 py-2 text-neutral-600 hover:text-neutral-900 font-medium">Entrar</a>
          <ahref="#"onclick="showPage('signup')"class="btn-primary px-6 py-2.5 text-white font-semibold rounded-xl shadow-md cta-pulse">Começar Grátis</a>
        </div>

<!-- Mobile Menu Button -->
        <buttonid="mobileMenuBtn"class="md:hidden p-2 text-neutral-600 hover:text-neutral-900">
          <idata-lucide="menu"class="w-6 h-6"></i>
        </button>
      </div>
    </div>

<!-- Mobile Menu -->
    <divid="mobileMenu"class="mobile-menu fixed inset-0 z-40 bg-white md:hidden">
      <divclass="flex flex-col p-6 space-y-4">
        <divclass="flex justify-between items-center mb-8">
          <divclass="flex items-center gap-3">
            <divclass="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <spanclass="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <spanclass="text-xl font-bold">reidasvendas</span>
              <pclass="text-xs text-neutral-500">Agência de IA</p>
            </div>
          </div>
          <buttonid="closeMobileMenu"class="p-2 text-neutral-600">
            <idata-lucide="x"class="w-6 h-6"></i>
          </button>
        </div>
        <ahref="#"onclick="showPage('home')"class="text-lg text-neutral-600 py-2">Home</a>
        <ahref="#"onclick="showPage('templates')"class="text-lg text-neutral-600 py-2">Templates</a>
        <ahref="#"onclick="showPage('features')"class="text-lg text-neutral-600 py-2">Recursos</a>
        <ahref="#"onclick="showPage('pricing')"class="text-lg text-neutral-600 py-2">Planos</a>
        <ahref="#"onclick="showPage('portfolio')"class="text-lg text-neutral-600 py-2">Portfólio</a>
        <ahref="#"onclick="showPage('contact')"class="text-lg text-neutral-600 py-2">Contato</a>
        <hrclass="border-neutral-200">
        <ahref="#"onclick="showPage('login')"class="text-lg text-neutral-600 py-2">Entrar</a>
        <ahref="#"onclick="showPage('signup')"class="btn-primary text-center py-3 rounded-xl">Começar Grátis</a>
      </div>
    </div>
  </header>

  <divclass="h-20"></div>

<!-- ==================== HOME PAGE ==================== -->
  <mainid="home"class="page-section active">

<!-- Hero Section -->
    <sectionclass="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20">
      <divclass="absolute inset-0">
        <videoautoplayloopmutedplaysInlineclass="video-bg"poster="https://images.pexels.com/videos/3129671/free-video-3129671.jpg">
          <sourcesrc="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_25fps.mp4"type="video/mp4">
        </video>
        <divclass="absolute inset-0 overlay-dark"></div>
      </div>

      <divclass="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-32">
        <divclass="aos">
          <divclass="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
            <idata-lucide="sparkles"class="w-4 h-4 text-yellow-400"></i>
            <span>IA de Ponta | Conversão Máxima | Entrega Rápida</span>
          </div>

          <h1class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Sites Que Convertem
            <spanclass="block mt-2"style="background: linear-gradient(135deg, #60a5fa, #93c5fd); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Como Big Techs Fazem</span>
          </h1>

          <pclass="text-xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed">
            Tecnologia enterprise para seu negócio local. IA, automação, tráfego pago e design que hipnotiza.
            Seus clientes não vão conseguir resistir ao CTA.
          </p>

          <divclass="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <ahref="#"onclick="showPage('signup')"class="btn-primary px-8 py-4 text-white font-semibold rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg cta-pulse">
              <idata-lucide="rocket"class="w-5 h-5"></i>
              Criar Meu Site Agora
            </a>
            <ahref="#"onclick="showPage('templates')"class="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <idata-lucide="layout-grid"class="w-5 h-5"></i>
              Ver Templates
            </a>
          </div>

          <divclass="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
            <spanclass="flex items-center gap-2"><idata-lucide="circle-check"class="w-4 h-4 text-green-400"></i> Site em 24h</span>
            <spanclass="flex items-center gap-2"><idata-lucide="circle-check"class="w-4 h-4 text-green-400"></i> IA Integrada</span>
            <spanclass="flex items-center gap-2"><idata-lucide="circle-check"class="w-4 h-4 text-green-400"></i> Tráfego Incluso</span>
            <spanclass="flex items-center gap-2"><idata-lucide="circle-check"class="w-4 h-4 text-green-400"></i> Google Meu Negócio</span>
          </div>
        </div>
      </div>

      <divclass="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <divclass="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <divclass="w-1.5 h-3 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </section>

<!-- Stats Section -->
    <sectionclass="py-16 bg-white border-b border-neutral-100">
      <divclass="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <divclass="grid grid-cols-2 md:grid-cols-4 gap-8">
          <divclass="aos text-center">
            <pclass="stat-number text-4xl font-bold text-neutral-900 mb-1">500+</p>
            <pclass="text-neutral-600">Sites Criados</p>
          </div>
          <divclass="aos text-center"style="animation-delay: 0.1s">
            <pclass="stat-number text-4xl font-bold text-neutral-900 mb-1">98%</p>
            <pclass="text-neutral-600">Satisfação</p>
          </div>
          <divclass="aos text-center"style="animation-delay: 0.2s">
            <pclass="stat-number text-4xl font-bold text-neutral-900 mb-1">3x</p>
            <pclass="text-neutral-600">Mais Conversão</p>
          </div>
          <divclass="aos text-center"style="animation-delay: 0.3s">
            <pclass="stat-number text-4xl font-bold text-neutral-900 mb-1">24h</p>
            <pclass="text-neutral-600">Entrega Média</p>
          </div>
        </div>
      </div>
    </section>

<!-- Templates Library Section -->
    <sectionid="templates"class="py-24 bg-neutral-50">
      <divclass="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <divclass="aos text-center mb-16">
          <spanclass="niche-badge mb-4 inline-block">Biblioteca Completa</span>
          <h2class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Templates Por Nicho</h2>
          <pclass="text-xl text-neutral-600 max-w-2xl mx-auto">Cada template é um projeto final, pronto para usar. Design baseado em neurociência para máxima conversão.</p>
        </div>

<!-- Search & Filter -->
        <divclass="aos mb-12">
          <divclass="max-w-2xl mx-auto">
            <divclass="relative">
              <idata-lucide="search"class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5"></i>
              <inputtype="text"id="templateSearch"placeholder="Buscar template por nicho..."class="input-field w-full pl-12 pr-4 py-4 rounded-xl">
            </div>
          </div>
          <divclass="flex flex-wrap justify-center gap-3 mt-6"id="nicheFilters">
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-neutral-900 text-white"data-niche="all">Todos</button>
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-white text-neutral-600 hover:bg-neutral-100"data-niche="saude">Saúde</button>
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-white text-neutral-600 hover:bg-neutral-100"data-niche="estetica">Estética</button>
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-white text-neutral-600 hover:bg-neutral-100"data-niche="varejo">Varejo</button>
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-white text-neutral-600 hover:bg-neutral-100"data-niche="educacao">Educação</button>
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-white text-neutral-600 hover:bg-neutral-100"data-niche="servicos">Serviços</button>
            <buttonclass="niche-filter px-4 py-2 rounded-full text-sm font-medium bg-white text-neutral-600 hover:bg-neutral-100"data-niche="luxo">Luxo</button>
          </div>
        </div>

<!-- Templates Grid -->
        <divclass="grid md:grid-cols-2 lg:grid-cols-3 gap-6"id="templatesGrid">
<!-- SAÚDE -->
          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="saude">
            <imgsrc="https://images.pexels.com/photos/5904388/pexels-photo-5904388.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Clínica Odontológica"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Saúde</span>
                <h3class="text-white text-xl font-bold mb-1">Clínica Odontológica</h3>
                <pclass="text-white/80 text-sm">Sorriso Perfeito</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('clinica-odontologica')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="saude">
            <imgsrc="https://images.pexels.com/photos/5904373/pexels-photo-5904373.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Médico"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Saúde</span>
                <h3class="text-white text-xl font-bold mb-1">Médico</h3>
                <pclass="text-white/80 text-sm">Dr. Saúde Premium</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('medico')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="saude">
            <imgsrc="https://images.pexels.com/photos/5904366/pexels-photo-5904366.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Nutricionista"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Saúde</span>
                <h3class="text-white text-xl font-bold mb-1">Nutricionista</h3>
                <pclass="text-white/80 text-sm">Vida Saudável</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('nutricionista')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="saude">
            <imgsrc="https://images.pexels.com/photos/5733654/pexels-photo-5733654.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Fisioterapeuta"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Saúde</span>
                <h3class="text-white text-xl font-bold mb-1">Fisioterapeuta</h3>
                <pclass="text-white/80 text-sm">Movimento & Vida</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('fisioterapeuta')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="saude">
            <imgsrc="https://images.pexels.com/photos/5904352/pexels-photo-5904352.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Enfermeiro"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Saúde</span>
                <h3class="text-white text-xl font-bold mb-1">Enfermeiro</h3>
                <pclass="text-white/80 text-sm">Cuidar & Acolher</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('enfermeiro')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="saude">
            <imgsrc="https://images.pexels.com/photos/5904340/pexels-photo-5904340.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Cuidador de Idosos"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Saúde</span>
                <h3class="text-white text-xl font-bold mb-1">Cuidador de Idosos</h3>
                <pclass="text-white/80 text-sm">Melhor Idade</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('cuidador-idosos')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

<!-- ESTÉTICA -->
          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="estetica">
            <imgsrc="https://images.pexels.com/photos/5668862/pexels-photo-5668862.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Estética Automotiva"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Estética</span>
                <h3class="text-white text-xl font-bold mb-1">Estética Automotiva</h3>
                <pclass="text-white/80 text-sm">Auto Premium</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('estetica-automotiva')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="estetica">
            <imgsrc="https://images.pexels.com/photos/5904373/pexels-photo-5904373.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Estética Dental"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Estética</span>
                <h3class="text-white text-xl font-bold mb-1">Estética Dental</h3>
                <pclass="text-white/80 text-sm">Sorriso Hollywood</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('estetica-dental')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="estetica">
            <imgsrc="https://images.pexels.com/photos/5904388/pexels-photo-5904388.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Estética Emagrecimento"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Estética</span>
                <h3class="text-white text-xl font-bold mb-1">Emagrecimento</h3>
                <pclass="text-white/80 text-sm">Corpo & Saúde</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('estetica-emagrecimento')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

<!-- VAREJO -->
          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Loja Masculina"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Moda Masculina</h3>
                <pclass="text-white/80 text-sm">Homem Moderno</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('loja-masculina')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/5904373/pexels-photo-5904373.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Loja Feminina"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Moda Feminina</h3>
                <pclass="text-white/80 text-sm">Ela Fashion</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('loja-feminina')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Loja Infantil"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Moda Infantil</h3>
                <pclass="text-white/80 text-sm">Kids Style</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('loja-infantil')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Produtos Esportivos"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Produtos Esportivos</h3>
                <pclass="text-white/80 text-sm">Sport Pro</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('loja-esportiva')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Padaria"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Padaria</h3>
                <pclass="text-white/80 text-sm">Pão & Arte</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('padaria')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/5668862/pexels-photo-5668862.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Papelaria"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Papelaria</h3>
                <pclass="text-white/80 text-sm">Papel & Cia</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('papelaria')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="varejo">
            <imgsrc="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Loja de Informática"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Varejo</span>
                <h3class="text-white text-xl font-bold mb-1">Informática</h3>
                <pclass="text-white/80 text-sm">Tech Store</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('loja-informatica')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

<!-- EDUCAÇÃO -->
          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="educacao">
            <imgsrc="https://images.pexels.com/photos/5904388/pexels-photo-5904388.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Escola de Inglês"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Educação</span>
                <h3class="text-white text-xl font-bold mb-1">Escola de Inglês</h3>
                <pclass="text-white/80 text-sm">English Pro</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('escola-ingles')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="educacao">
            <imgsrc="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Escola de Música"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Educação</span>
                <h3class="text-white text-xl font-bold mb-1">Escola de Música</h3>
                <pclass="text-white/80 text-sm">Som & Arte</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('escola-musica')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

<!-- SERVIÇOS -->
          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="servicos">
            <imgsrc="https://images.pexels.com/photos/5668862/pexels-photo-5668862.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Estacionamento"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Serviços</span>
                <h3class="text-white text-xl font-bold mb-1">Estacionamento</h3>
                <pclass="text-white/80 text-sm">Park & Go</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('estacionamento')"class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>

          <divclass="aos template-card group relative rounded-2xl cursor-pointer shadow-medium"data-niche="servicos">
            <imgsrc="https://images.pexels.com/photos/5904340/pexels-photo-5904340.jpeg?auto=compress&cs=tinysrgb&w=600"alt="Babá"class="w-full h-64 object-cover">
            <divclass="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <spanclass="niche-badge mb-2 inline-block">Serviços</span>
                <h3class="text-white text-xl font-bold mb-1">Cuidador Infantil</h3>
                <pclass="text-white/80 text-sm">Baby Care</p>
              </div>
              <divclass="flex gap-2">
                <buttononclick="openTemplate('bab
                          <div class="aos template-card group relative rounded-2xl cursor-pointer shadow-medium" data-niche="servicos">
            <img src="https://images.pexels.com/photos/5904352/pexels-photo-5904352.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Professor Particular" class="w-full h-64 object-cover">
            <div class="overlay absolute inset-0 gradient-bg opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <span class="niche-badge mb-2 inline-block">Serviços</span>
                <h3 class="text-white text-xl font-bold mb-1">Professor Particular</h3>
                <p class="text-white/80 text-sm">Educação Premium</p>
              </div>
              <div class="flex gap-2">
                <button onclick="openTemplate('professor-particular')" class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>
          
          <!-- LUXO -->
          <div class="aos template-card group relative rounded-2xl cursor-pointer shadow-medium" data-niche="luxo">
            <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Joalheria" class="w-full h-64 object-cover">
            <div class="overlay absolute inset-0 gradient-bg-gold opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <span class="niche-badge mb-2 inline-block" style="background: linear-gradient(135deg, #d4af37, #f4e5b2);">Luxo</span>
                <h3 class="text-white text-xl font-bold mb-1">Joalheria</h3>
                <p class="text-white/80 text-sm">Diamond Luxury</p>
              </div>
              <div class="flex gap-2">
                <button onclick="openTemplate('joalheria')" class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>
          
          <div class="aos template-card group relative rounded-2xl cursor-pointer shadow-medium" data-niche="luxo">
            <img src="https://images.pexels.com/photos/4366298/pexels-photo-4366298.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Relojoaria" class="w-full h-64 object-cover">
            <div class="overlay absolute inset-0 gradient-bg-gold opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <span class="niche-badge mb-2 inline-block" style="background: linear-gradient(135deg, #d4af37, #f4e5b2);">Luxo</span>
                <h3 class="text-white text-xl font-bold mb-1">Relojoaria</h3>
                <p class="text-white/80 text-sm">Time Premium</p>
              </div>
              <div class="flex gap-2">
                <button onclick="openTemplate('relojoaria')" class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>
          
          <div class="aos template-card group relative rounded-2xl cursor-pointer shadow-medium" data-niche="luxo">
            <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Perfumaria" class="w-full h-64 object-cover">
            <div class="overlay absolute inset-0 gradient-bg-gold opacity-0 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
              <div>
                <span class="niche-badge mb-2 inline-block" style="background: linear-gradient(135deg, #d4af37, #f4e5b2);">Luxo</span>
                <h3 class="text-white text-xl font-bold mb-1">Perfumaria</h3>
                <p class="text-white/80 text-sm">Essence Luxury</p>
              </div>
              <div class="flex gap-2">
                <button onclick="openTemplate('perfumaria')" class="flex-1 bg-white text-neutral-900 py-2 rounded-lg font-semibold text-sm hover:bg-neutral-100">Visualizar</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <p class="text-neutral-600 mb-4">+40 nichos disponíveis na biblioteca completa</p>
          <a href="#" onclick="showPage('contact')" class="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold">
            Solicitar Nicho Personalizado
            <i data-lucide="arrow-right" class="w-5 h-5"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="aos text-center mb-16">
          <span class="niche-badge mb-4 inline-block">Tecnologia de Ponta</span>
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Infraestrutura Enterprise</h2>
          <p class="text-xl text-neutral-600 max-w-2xl mx-auto">O mesmo nível tecnológico das big techs, agora disponível para seu negócio local.</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="aos feature-card bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
            <div class="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mb-6">
              <i data-lucide="brain" class="w-7 h-7 text-white"></i>
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">IA Integrada</h3>
            <p class="text-neutral-600">Automação com n8n, chatbots inteligentes, análise preditiva e personalização em tempo real.</p>
          </div>
          
          <div class="aos feature-card bg-neutral-50 p-8 rounded-2xl border border-neutral-200" style="animation-delay: 0.1s">
            <div class="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mb-6">
              <i data-lucide="database" class="w-7 h-7 text-white"></i>
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">Supabase Integration</h3>
            <p class="text-neutral-600">Banco de dados enterprise, autenticação segura, APIs automáticas e escalabilidade infinita.</p>
          </div>
          
          <div class="aos feature-card bg-neutral-50 p-8 rounded-2xl border border-neutral-200" style="animation-delay: 0.2s">
            <div class="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mb-6">
              <i data-lucide="message-circle" class="w-7 h-7 text-white"></i>
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">WhatsApp Automation</h3>
            <p class="text-neutral-600">Atendimento automático 24/7, follow-up inteligente, agendamentos e vendas pelo WhatsApp.</p>
          </div>
          
          <div class="aos feature-card bg-neutral-50 p-8 rounded-2xl border border-neutral-200" style="animation-delay: 0.3s">
            <div class="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mb-6">
              <i data-lucide="target" class="w-7 h-7 text-white"></i>
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">Tráfego Pago Incluso</h3>
            <p class="text-neutral-600">Meta Ads, Google Ads, TikTok Ads configurados. Campanhas otimizadas para máxima conversão.</p>
          </div>
          
          <div class="aos feature-card bg-neutral-50 p-8 rounded-2xl border border-neutral-200" style="animation-delay: 0.4s">
            <div class="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mb-6">
              <i data-lucide="map-pin" class="w-7 h-7 text-white"></i>
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">Google Meu Negócio</h3>
            <p class="text-neutral-600">Configuração completa, otimização de SEO local, mapas integrados e GPS para sua loja.</p>
          </div>
          
          <div class="aos feature-card bg-neutral-50 p-8 rounded-2xl border border-neutral-200" style="animation-delay: 0.5s">
            <div class="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center mb-6">
              <i data-lucide="shield-check" class="w-7 h-7 text-white"></i>
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">Segurança Enterprise</h3>
            <p class="text-neutral-600">SSL gratuito, proteção DDoS, backups automáticos, LGPD compliance e criptografia de ponta.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-24 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="aos text-center mb-16">
          <span class="niche-badge mb-4 inline-block">Planos Flexíveis</span>
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Investimento que Retorna em 30 Dias</h2>
          <p class="text-xl text-neutral-600 max-w-2xl mx-auto">Nossos clientes veem ROI positivo no primeiro mês. Seu negócio merece essa vantagem.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Starter -->
          <div class="aos pricing-card p-8 rounded-2xl border-2 border-neutral-200 bg-white">
            <div class="mb-6">
              <h3 class="text-2xl font-bold text-neutral-900 mb-2">Starter</h3>
              <p class="text-neutral-600">Para quem está começando</p>
            </div>
            <div class="mb-6">
              <span class="text-5xl font-bold text-neutral-900">R$ 497</span>
              <span class="text-neutral-600"> único</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Site profissional 1 página</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Template premium incluso</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Domínio .com.br 1 ano</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">SSL gratuito</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Google Meu Negócio</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">WhatsApp flutuante</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Entrega em 48h</span></li>
            </ul>
            <a href="#" onclick="showPage('contact')" class="block w-full py-4 text-center rounded-xl font-semibold border-2 border-neutral-300 hover:border-primary-600 hover:text-primary-600 transition-all">Começar Agora</a>
          </div>
          
          <!-- Pro -->
          <div class="aos pricing-card popular p-8 rounded-2xl border-2 bg-white relative">
            <span class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 gradient-bg text-white text-sm font-semibold rounded-full text-xs uppercase tracking-wide">Mais Popular</span>
            <div class="mb-6">
              <h3 class="text-2xl font-bold text-neutral-900 mb-2">Professional</h3>
              <p class="text-neutral-600">Para negócios em crescimento</p>
            </div>
            <div class="mb-6">
              <span class="text-5xl font-bold text-neutral-900">R$ 997</span>
              <span class="text-neutral-600"> único</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Site profissional 5 páginas</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Template premium + personalizado</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Domínio .com.br 2 anos</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">SSL + CDN global</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Google Meu Negócio otimizado</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">WhatsApp + Automação básica</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Supabase database</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Meta Ads configuração</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Entrega em 24h</span></li>
            </ul>
            <a href="#" onclick="showPage('contact')" class="block w-full py-4 text-center rounded-xl font-semibold gradient-bg text-white shadow-md hover:shadow-lg transition-all">Começar Agora</a>
          </div>
          
          <!-- Enterprise -->
          <div class="aos pricing-card p-8 rounded-2xl border-2 border-neutral-200 bg-white">
            <div class="mb-6">
              <h3 class="text-2xl font-bold text-neutral-900 mb-2">Enterprise</h3>
              <p class="text-neutral-600">Para agências e grandes negócios</p>
            </div>
            <div class="mb-6">
              <span class="text-5xl font-bold text-neutral-900">R$ 2.497</span>
              <span class="text-neutral-600"> único</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Site ilimitado páginas</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Design 100% personalizado</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Domínios ilimitados</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Infraestrutura dedicada</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Google + Maps + SEO avançado</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">WhatsApp + n8n automation</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Supabase + APIs custom</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Meta + Google + TikTok Ads</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">White label disponível</span></li>
              <li class="flex items-start gap-3"><i data-lucide="check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"></i><span class="text-neutral-600">Suporte 24/7 dedicado</span></li>
            </ul>
            <a href="#" onclick="showPage('contact')" class="block w-full py-4 text-center rounded-xl font-semibold border-2 border-neutral-300 hover:border-primary-600 hover:text-primary-600 transition-all">Falar com Consultor</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="aos text-center mb-16">
          <span class="niche-badge mb-4 inline-block">Fale Conosco</span>
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Vamos Transformar Seu Negócio?</h2>
          <p class="text-xl text-neutral-600 max-w-2xl mx-auto">Nossa equipe de especialistas está pronta para criar o site perfeito para você.</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-12">
          <div class="aos">
            <form id="contactForm" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Nome Completo</label>
                <input type="text" class="input-field w-full px-4 py-3 rounded-xl" placeholder="Seu nome" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                <input type="email" class="input-field w-full px-4 py-3 rounded-xl" placeholder="seu@email.com" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">WhatsApp</label>
                <input type="tel" class="input-field w-full px-4 py-3 rounded-xl" placeholder="(11) 99999-9999" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Nicho do Negócio</label>
                <select class="input-field w-full px-4 py-3 rounded-xl" required>
                  <option value="">Selecione...</option>
                  <option value="saude">Saúde</option>
                  <option value="estetica">Estética</option>
                  <option value="varejo">Varejo</option>
                  <option value="educacao">Educação</option>
                  <option value="servicos">Serviços</option>
                  <option value="luxo">Luxo</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Mensagem</label>
                <textarea class="input-field w-full px-4 py-3 rounded-xl" rows="4" placeholder="Conte sobre seu projeto..." required></textarea>
              </div>
              <button type="submit" class="btn-primary w-full py-4 rounded-xl font-semibold text-white">
                <i data-lucide="send" class="w-5 h-5 inline mr-2"></i>
                Enviar Mensagem
              </button>
            </form>
          </div>
          
          <div class="aos space-y-8">
            <div class="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                  <i data-lucide="phone" class="w-6 h-6 text-white"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-900 mb-1">Telefone</h4>
                  <p class="text-neutral-600">(11) 99999-9999</p>
                  <p class="text-sm text-neutral-500">Seg-Sex, 9h às 18h</p>
                </div>
              </div>
            </div>
            
            <div class="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                  <i data-lucide="mail" class="w-6 h-6 text-white"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-900 mb-1">Email</h4>
                  <p class="text-neutral-600">contato@reidasvendas.com</p>
                  <p class="text-sm text-neutral-500">Resposta em até 2h</p>
                </div>
              </div>
            </div>
            
            <div class="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                  <i data-lucide="map-pin" class="w-6 h-6 text-white"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-900 mb-1">Endereço</h4>
                  <p class="text-neutral-600">São Paulo, SP - Brasil</p>
                  <p class="text-sm text-neutral-500">Atendimento em todo Brasil</p>
                </div>
              </div>
            </div>
            
            <div class="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
              <h4 class="font-semibold text-neutral-900 mb-4">Redes Sociais</h4>
              <div class="flex gap-4">
                <a href="#" class="social-icon w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-neutral-200 hover:border-primary-600">
                  <i data-lucide="instagram" class="w-5 h-5"></i>
                </a>
                <a href="#" class="social-icon w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-neutral-200 hover:border-primary-600">
                  <i data-lucide="facebook" class="w-5 h-5"></i>
                </a>
                <a href="#" class="social-icon w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-neutral-200 hover:border-primary-600">
                  <i data-lucide="linkedin" class="w-5 h-5"></i>
                </a>
                <a href="#" class="social-icon w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-neutral-200 hover:border-primary-600">
                  <i data-lucide="youtube" class="w-5 h-5"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-neutral-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div class="col-span-2">
            <a href="#" class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <span class="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <span class="text-2xl font-bold">reidasvendas</span>
                <p class="text-xs text-neutral-400">Agência de IA</p>
              </div>
            </a>
            <p class="text-neutral-400 mb-6 max-w-xs">Tecnologia enterprise para negócios locais. Sites que convertem como big techs.</p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <i data-lucide="instagram" class="w-5 h-5"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <i data-lucide="facebook" class="w-5 h-5"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <i data-lucide="linkedin" class="w-5 h-5"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <i data-lucide="youtube" class="w-5 h-5"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Produto</h4>
            <ul class="space-y-3 text-neutral-400">
              <li><a href="#" onclick="showPage('templates')" class="hover:text-white transition-colors">Templates</a></li>
              <li><a href="#" onclick="showPage('features')" class="hover:text-white transition-colors">Recursos</a></li>
              <li><a href="#" onclick="showPage('pricing')" class="hover:text-white transition-colors">Planos</a></li>
              <li><a href="#" onclick="showPage('portfolio')" class="hover:text-white transition-colors">Portfólio</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Empresa</h4>
            <ul class="space-y-3 text-neutral-400">
              <li><a href="#" onclick="showPage('about')" class="hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Carreiras</a></li>
              <li><a href="#" onclick="showPage('contact')" class="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Recursos</h4>
            <ul class="space-y-3 text-neutral-400">
              <li><a href="#" class="hover:text-white transition-colors">Documentação</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Suporte</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Comunidade</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Legal</h4>
            <ul class="space-y-3 text-neutral-400">
              <li><a href="#" class="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Termos</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Cookies</a></li>
              <li><a href="#" class="hover:text-white transition-colors">LGPD</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-neutral-800 mt-12 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-neutral-500 text-sm">© 2026 reidasvendas. Todos direitos reservados.</p>
            <div class="flex gap-6 text-neutral-500 text-sm">
              <a href="#" class="hover:text-white transition-colors">Privacidade</a>
              <a href="#" class="hover:text-white transition-colors">Termos</a>
              <a href="#" class="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </main>

  <!-- ==================== JAVASCRIPT ==================== -->
  <script>
    // Initialize Lucide Icons
    lucide.createIcons();
    
    // Page Navigation
    function showPage(pageId) {
      document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(pageId).classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Close mobile menu if open
      document.getElementById('mobileMenu').classList.remove('open');
    }
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('shadow-lg');
      } else {
        header.classList.remove('shadow-lg');
      }
    });
    
    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('open');
    });
    
    closeMobileMenu.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
    
    // Scroll Animations
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.aos');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          el.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Template Filter
    document.querySelectorAll('.niche-filter').forEach(button => {
      button.addEventListener('click', () => {
        const niche = button.dataset.niche;
        
        // Update active button
        document.querySelectorAll('.niche-filter').forEach(btn => {
          btn.classList.remove('bg-neutral-900', 'text-white');
          btn.classList.add('bg-white', 'text-neutral-600');
        });
        button.classList.remove('bg-white', 'text-neutral-600');
        button.classList.add('bg-neutral-900', 'text-white');
        
        // Filter templates
        document.querySelectorAll('.template-card').forEach(card => {
          if (niche === 'all' || card.dataset.niche === niche) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
    
    // Template Search
    document.getElementById('templateSearch').addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      document.querySelectorAll('.template-card').forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const niche = card.querySelector('.niche-badge').textContent.toLowerCase();
        if (title.includes(searchTerm) || niche.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
    
    // Open Template
    function openTemplate(templateId) {
      alert('Template ' + templateId + ' será carregado! Em produção, isso abrirá o editor com o template selecionado.');
    }
    
    // Contact Form
    document.getElementById('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mensagem enviada! Nossa equipe entrará em contato em até 2 horas.');
      e.target.reset();
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
    
    console.log('🚀 reidasvendas - Plataforma Enterprise Carregada!');
    console.log('✅ 100% Legal e Original');
    console.log('✅ Todas as Imagens/Vídeos: Pexels/Unsplash (Free License)');
    console.log('✅ Código: Original (Nada copiado)');
    console.log('✅ Nichos: Saúde, Estética, Varejo, Educação, Serviços, Luxo');
    console.log('✅ Integrações: WhatsApp, Supabase, n8n, Google Ads, Meta Ads, TikTok Ads');
  </script>
</body>
</html>

```
