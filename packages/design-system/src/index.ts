// ─────────────────────────────────────────────────────────────
// @altiq/design-system — Barrel Export
// ─────────────────────────────────────────────────────────────

// Style Dictionary generated CSS (built via `pnpm build`)
export { default as tokensJson } from './tokens/tokens.json' with { type: 'json' };

// Puck Components
export {
  HeroBlock,
  FeatureGridBlock,
  TestimonialCarouselBlock,
  PricingBlock,
} from './components/index';
export type {
  HeroProps,
  FeatureGridProps,
  TestimonialCarouselProps,
  PricingProps,
} from './components/index';

// Puck + Payload Integration
export {
  createPuckConfig,
  createPayloadPuckHandlers,
  serializePuckData,
  PAYLOAD_COLLECTION_SLUG,
} from './puck-config';
export type {
  PuckComponents,
  PuckRootProps,
  PayloadPuckDocument,
} from './puck-config';

// Tokens utility
export { default as tokens } from './tokens/tokens.json' with { type: 'json' };
