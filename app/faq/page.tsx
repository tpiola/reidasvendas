import content from '@/data/content.json';
import PageShell from '@/components/PageShell';
import JsonLd from '@/components/JsonLd';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Dúvidas sobre sites e marketing digital',
  'Entenda escopo, investimento, prazos, acesso às contas, mídia e acompanhamento antes de contratar.',
  '/faq',
);
export default function Page() {
  return (
    <PageShell
      title="O que precisa estar claro antes de contratar."
      description="Investimento, prazo e responsabilidade merecem respostas diretas."
      path="/faq"
    >
      <div className="faq-list">
        {content.faq.map((f) => (
          <details key={f.question}>
            <summary>{f.question}</summary>
            <p>{f.answer}</p>
          </details>
        ))}
      </div>
      <a
        className="button button-primary"
        href="/go/whatsapp?src=faq&page=/faq"
      >
        Tirar uma dúvida no WhatsApp
      </a>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: content.faq.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }}
      />
    </PageShell>
  );
}
