import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { BuiltFromScratchNotice } from '@/components/BuiltFromScratchNotice';
import { DEFAULT_OG_IMAGE } from '@/lib/seo-meta';
import { PageHero } from '@/components/shipper/PageHero';
import { PricingPreview } from '@/components/shipper/PricingPreview';

export default function PlanosIndex() {
  useEffect(() => {
    applySeo({
      title: 'Planos e assinaturas — Rei das Vendas',
      description:
        'Três planos de assinatura e um pacote sob medida. Cada projeto digital é construído do zero para maximizar conversão do seu cliente.',
      canonicalPath: '/planos',
      ogImage: DEFAULT_OG_IMAGE,
    });
  }, []);

  return (
    <main className="bg-[#030305] text-white">
      <PageHero
        eyebrow="Vendas"
        title="Planos que escalam"
        titleAccent="com o seu negócio."
        subtitle="Escolha uma assinatura ou monte um pacote sob medida. Cada plano tem página própria com entregáveis detalhados."
      >
        <BuiltFromScratchNotice className="mx-auto mt-6 max-w-xl" />
      </PageHero>
      <PricingPreview showAllPlans className="border-t-0" />
    </main>
  );
}
