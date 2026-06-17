// ─────────────────────────────────────────────────────────────
// Rei das Vendas — Puck + Payload CMS Integration
// Configures Puck visual builder to work with Payload CMS
// as the content storage backend.
// ─────────────────────────────────────────────────────────────

import type { Config as PuckConfig, Data } from '@measured/puck';
import React from 'react';
import { HeroBlock } from './components/hero/HeroBlock';
import { FeatureGridBlock } from './components/feature-grid/FeatureGridBlock';
import { TestimonialCarouselBlock } from './components/testimonial-carousel/TestimonialCarouselBlock';
import { PricingBlock } from './components/pricing/PricingBlock';

// ♢ Puck Component Configuration
// Strictly controlled blocks — editors can only
// use the fields we define, keeping the brand intact.
export const puckComponents = {
  Hero: HeroBlock,
  FeatureGrid: FeatureGridBlock,
  TestimonialCarousel: TestimonialCarouselBlock,
  Pricing: PricingBlock,
} satisfies PuckConfig['components'];

export type PuckComponents = typeof puckComponents;

// ♢ Root props — applied to the entire page
export type PuckRootProps = {
  title: string;
  description: string;
  ogImage?: string;
  className?: string;
  showScrollProgress: boolean;
  showNoise: boolean;
};

export const puckRootProps = {
  fields: {
    title: { type: 'text' as const, label: 'Título da página (SEO)' },
    description: { type: 'textarea' as const, label: 'Meta description' },
    ogImage: { type: 'text' as const, label: 'OG Image URL' },
    className: { type: 'text' as const, label: 'Classes CSS adicionais' },
    showScrollProgress: {
      type: 'radio' as const,
      label: 'Barra de progresso',
      options: [
        { label: 'Sim', value: true },
        { label: 'Não', value: false },
      ],
    },
    showNoise: {
      type: 'radio' as const,
      label: 'Textura noise',
      options: [
        { label: 'Sim', value: true },
        { label: 'Não', value: false },
      ],
    },
  },
  defaultProps: {
    title: 'Rei das Vendas',
    description: 'Infraestrutura digital de vendas para empresas em Franca-SP e região.',
    ogImage: '',
    className: '',
    showScrollProgress: true,
    showNoise: true,
  },
  render: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="rdv-page-root bg-[#030303] text-[#F5F5F5] font-sans antialiased">
        {/* Scroll progress bar */}
        <div className="scroll-progress" />
        {/* Noise overlay */}
        <div
          className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
          }}
        />
        {children}
      </div>
    );
  },
};

// ♢ Puck Config Factory
export function createPuckConfig() {
  return {
    components: puckComponents,
    root: puckRootProps,
    categories: {
      hero: { label: 'Hero', components: ['Hero'] as const },
      content: { label: 'Conteúdo', components: ['FeatureGrid', 'TestimonialCarousel', 'Pricing'] as const },
    },
    defaultRootProps: {
      title: 'Rei das Vendas',
      description: '',
      showScrollProgress: true,
      showNoise: true,
    },
  };
}

// ♢ Payload CMS Adapter
export type PayloadPuckDocument = {
  id: string;
  title: string;
  slug: string;
  puckData: Data<PuckComponents>;
  publishedAt?: string;
  status: 'draft' | 'published';
};

export const PAYLOAD_COLLECTION_SLUG = 'pages';

export function serializePuckData(data: Data<PuckComponents>): Data<PuckComponents> {
  return JSON.parse(JSON.stringify(data));
}

export function createPayloadPuckHandlers(apiBaseUrl: string) {
  return {
    async savePage(slug: string, data: Data<PuckComponents>, apiKey: string): Promise<Response> {
      return fetch(`${apiBaseUrl}/api/${PAYLOAD_COLLECTION_SLUG}/${slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          puckData: serializePuckData(data),
          updatedAt: new Date().toISOString(),
        }),
      });
    },

    async loadPage(slug: string, apiKey: string): Promise<Data<PuckComponents> | null> {
      const res = await fetch(
        `${apiBaseUrl}/api/${PAYLOAD_COLLECTION_SLUG}?where[slug][equals]=${slug}&depth=1`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      if (!res.ok) return null;
      const json = await res.json();
      return json?.docs?.[0]?.puckData ?? null;
    },

    async listPages(apiKey: string): Promise<PayloadPuckDocument[]> {
      const res = await fetch(`${apiBaseUrl}/api/${PAYLOAD_COLLECTION_SLUG}?depth=0`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (!res.ok) return [];
      const json = await res.json();
      return json?.docs ?? [];
    },
  };
}
