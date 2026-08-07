import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import "./globals.css";

const geist = Geist({ subsets:["latin"], display:"swap", variable:"--font-geist" });
const geistMono = Geist_Mono({ subsets:["latin"], display:"swap", variable:"--font-geist-mono" });
const fraunces = Fraunces({ subsets:["latin"], display:"swap", variable:"--font-fraunces" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: "Rei das Vendas | Tecnologia + IA para Negócios Locais — Entrega no Mesmo Dia",
  description: "Vídeo cinematográfico, site premium, anúncios e Perfil no Google para seu negócio local. Produzidos com IA e entregues no mesmo dia. A partir de R$ 697.",
  alternates:{ canonical:"/" },
  manifest:"/manifest.json",
  openGraph:{ title:"Rei das Vendas | Presença digital entregue no mesmo dia", description:"Vídeo, site, criativos e Perfil no Google em um único fluxo de produção.", url:"/", siteName:"Rei das Vendas", locale:"pt_BR", type:"website", images:[{ url:"/opengraph-image", width:1200, height:630, alt:"Rei das Vendas — Tecnologia e IA para negócios locais" }] },
  twitter:{ card:"summary_large_image", title:"Rei das Vendas | Tecnologia + IA para Negócios Locais", description:"Presença digital produzida com IA e entregue no mesmo dia.", images:["/opengraph-image"] },
  icons:{ icon:[{ url:"/icon", sizes:"32x32", type:"image/png" }], apple:[{ url:"/apple-icon", sizes:"180x180", type:"image/png" }] },
};

export default async function RootLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const jsonLd = { "@context":"https://schema.org", "@type":"ProfessionalService", name:"Rei das Vendas", url:process.env.NEXT_PUBLIC_SITE_URL, priceRange:"R$ 697 - R$ 2.997", areaServed:"BR", description:"Unidade Externa de Tecnologia para presença digital de negócios locais." };
  return <html lang="pt-BR" className={`${geist.variable} ${geistMono.variable} ${fraunces.variable}`}><body className="pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-0"><a href="#conteudo" className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-[#d4a853] px-4 py-3 text-sm font-semibold text-[#0a0a0a] focus:translate-y-0">Pular para o conteúdo</a><Navbar/>{children}<Footer/><WhatsAppFloat/><StickyMobileCTA/><AnalyticsTracker/>{plausibleDomain && <><Script id="plausible-init" nonce={nonce} strategy="afterInteractive">{`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}</Script><Script src="https://plausible.io/js/script.js" data-domain={plausibleDomain} nonce={nonce} strategy="afterInteractive"/></>}<script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify(jsonLd) }}/></body></html>;
}
