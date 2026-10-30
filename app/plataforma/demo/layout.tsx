import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Demonstração de ferramentas empresariais',
  'Protótipo com dados fictícios de estoque e indicadores. Sem assinatura operacional, autenticação ou armazenamento multiempresa.',
  '/plataforma/demo',
  true,
);
export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
