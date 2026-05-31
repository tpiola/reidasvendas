import { useEffect } from "react";
import { Link } from "react-router-dom";
import { applySeo } from "@/lib/seo";
import { BRAND } from "@/lib/brand";
import { DEFAULT_OG_IMAGE } from "@/lib/seo-meta";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/shipper/PageHero";
import { InlineVideo } from "@/components/home/InlineVideo";
import { SECTION_POSTERS } from "@/lib/media";
import { Reveal } from "@/components/Reveal";
import { trackEvent } from "@/lib/analytics";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0!2d-47.400!3d-20.538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0ba00c8c8c8c9%3A0x0!2sFranca%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1";

export default function Contato() {
  useEffect(() => {
    applySeo({
      title: "Contato — Rei das Vendas | Franca-SP",
      description:
        "Agende diagnóstico: nome, e-mail e WhatsApp. Resposta em até 24h. Franca-SP e atendimento remoto.",
      canonicalPath: "/contato",
      ogImage: DEFAULT_OG_IMAGE,
    });
  }, []);

  return (
    <main className="page-surface">
      <PageHero
        eyebrow="Contato"
        title="Diagnóstico em até"
        titleAccent="24 horas."
        subtitle="Preencha o formulário ou fale direto — rota, escopo e próximo passo sem enrolação."
      >
        <div className="mt-6 space-y-2 text-sm text-surface-muted">
          <p>
            E-mail:{" "}
            <a
              href={`mailto:${BRAND.email}`}
              className="text-[#C9A84C]/90 hover:underline"
            >
              {BRAND.email}
            </a>
          </p>
          <p>
            WhatsApp:{" "}
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", { location: "contato" })
              }
              className="text-[#C9A84C]/90 hover:underline"
            >
              {BRAND.phone}
            </a>
          </p>
          <p>{BRAND.baseCity}</p>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <Reveal>
          <div className="glass-card overflow-hidden rounded-2xl p-2">
            <InlineVideo
              src={BRAND.inlineVideos.salesTeam}
              poster={SECTION_POSTERS.handshake}
              caption="Atendimento · Franca-SP e remoto"
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-2 md:py-16">
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <LeadForm
            source="footer"
            formVariant="minimal"
            title="Agendar diagnóstico"
            description="Somente nome, e-mail e WhatsApp."
            ctaLabel="Enviar e receber retorno"
            context={{ intent: "contact" }}
          />
        </div>
        <div className="overflow-hidden rounded-2xl border border-[color:var(--border-subtle)]">
          <iframe
            title="Mapa — Franca SP"
            src={MAP_EMBED}
            className="h-full min-h-[320px] w-full opacity-90 grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <p className="pb-16 text-center text-sm text-surface-muted">
        <Link to="/diagnostico" className="text-[#C9A84C]/85 hover:underline">
          Página dedicada ao diagnóstico estratégico
        </Link>
      </p>
    </main>
  );
}
