import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Custom transforms ──────────────────────────────────────────
// Transform: kebab-case token name
StyleDictionary.registerTransform({
  name: 'name/kebab',
  type: 'name',
  transform: (token) => token.path.join('-'),
});

// Transform: camelCase for Tailwind
StyleDictionary.registerTransform({
  name: 'name/camel',
  type: 'name',
  transform: (token) => {
    const parts = token.path.slice(1); // drop 'color'/'spacing' etc.
    return parts
      .map((p, i) => (i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)))
      .join('');
  },
});

// Transform: CSS custom property path
StyleDictionary.registerTransform({
  name: 'name/css-custom',
  type: 'name',
  transform: (token) => {
    return '--rdv-' + token.path.slice(1).join('-');
  },
});

// Transform: remove 'px' from spacing values for Tailwind
StyleDictionary.registerTransform({
  name: 'size/spacing-tailwind',
  type: 'value',
  transitive: true,
  filter: (token) => token.path[0] === 'spacing',
  transform: (token) => {
    const val = token.value;
    if (typeof val === 'string' && val.endsWith('px')) {
      const num = parseInt(val, 10);
      return num / 4; // Tailwind uses 4px base
    }
    return val;
  },
});

// ── Filter: only spacing tokens that are numeric ──
StyleDictionary.registerFilter({
  name: 'spacing-numeric',
  filter: (token) => {
    return token.path[0] === 'spacing' && !isNaN(parseInt(token.path[token.path.length - 1], 10));
  },
});

// ── Formats ─────────────────────────────────────────────────────

// Tailwind CSS v3/v4 preset
StyleDictionary.registerFormat({
  name: 'tailwind-preset',
  format: ({ dictionary }) => {
    const colors = {};
    const spacing = {};
    const fontSize = {};
    const fontFamily = {};
    const fontWeight = {};
    const letterSpacing = {};
    const borderRadius = {};
    const boxShadow = {};
    const zIndex = {};

    dictionary.allTokens.forEach((token) => {
      const path = token.path.slice(1); // drop top-level category
      const key = path.join('-');

      // Colors
      if (token.path[0] === 'color') {
        const cat = path[0]; // gold, neutral, accent, semantic
        const sub = path.slice(1).join('-');
        if (!colors[cat]) colors[cat] = {};
        colors[cat][sub] = token.value;
      }

      // Spacing (numeric)
      if (token.path[0] === 'spacing' && !isNaN(parseInt(token.path[token.path.length - 1], 10))) {
        const num = parseInt(path[0], 10);
        spacing[num] = `${num * 4}px`;
        // Also add Tailwind-style name
        spacing[`${num * 4}`] = `${num * 4}px`;
      }

      // Typography size
      if (token.path[0] === 'typography' && token.path[1] === 'size') {
        const sizeKey = path.slice(1).join('-');
        if (path[1] !== 'fluid') {
          fontSize[path[1]] = [token.value, { lineHeight: token.original.lineHeight }];
        }
      }

      // Font family
      if (token.path[0] === 'typography' && token.path[1] === 'font') {
        fontFamily[path[1]] = token.value.split(',').map(s => s.trim());
      }

      // Font weight
      if (token.path[0] === 'typography' && token.path[1] === 'weight') {
        fontWeight[path[1]] = token.value;
      }

      // Letter spacing
      if (token.path[0] === 'typography' && token.path[1] === 'tracking') {
        letterSpacing[path[1]] = token.value;
      }

      // Border radius
      if (token.path[0] === 'radius') {
        borderRadius[path[0]] = token.value;
      }

      // Shadow
      if (token.path[0] === 'shadow') {
        boxShadow[path[0]] = token.value;
      }

      // Z-index
      if (token.path[0] === 'z-index') {
        zIndex[path[0]] = token.value;
      }
    });

    const preset = {
      theme: {
        extend: {
          colors,
          spacing,
          fontSize,
          fontFamily,
          fontWeight,
          letterSpacing,
          borderRadius,
          boxShadow,
          zIndex,
          transitionTimingFunction: {
            'rdv-default': 'cubic-bezier(0.22, 1, 0.36, 1)',
            'rdv-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
            'rdv-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
          },
          transitionDuration: {
            'rdv-fast': '150ms',
            'rdv-normal': '300ms',
            'rdv-slow': '500ms',
            'rdv-slower': '700ms',
            'rdv-slowest': '1000ms',
          },
          backdropBlur: {
            rdv: '32px',
            'rdv-premium': '48px',
          },
        },
      },
    };

    return `// Rei das Vendas Design System — Tailwind Preset (auto-generated)
// Source: packages/design-system/src/tokens/tokens.json

export default ${JSON.stringify(preset, null, 2)};
`;
  },
});

// CSS Custom Properties format (with light-dark support)
StyleDictionary.registerFormat({
  name: 'css-custom-properties',
  format: ({ dictionary }) => {
    const props = [];
    const lightOverrides = [];

    dictionary.allTokens.forEach((token) => {
      const varName = '--rdv-' + token.path.slice(1).join('-');
      props.push(`  ${varName}: ${token.value};`);

      // Light mode overrides for semantic colors
      if (token.path[0] === 'color' && token.path[1] === 'semantic') {
        const name = token.path.slice(2).join('-');
        const lightValues = {
          'bg': '#F4F4F6',
          'surface': '#FFFFFF',
          'surface-2': '#FAFAFA',
          'surface-3': '#F5F5F5',
          'text': '#0A0A0B',
          'text-secondary': '#52525B',
          'text-muted': '#71717A',
          'glass': 'rgba(0,0,0,0.02)',
          'glass-hover': 'rgba(0,0,0,0.035)',
          'border': 'rgba(0,0,0,0.08)',
          'border-gold': 'rgba(214,168,79,0.35)',
        };
        if (lightValues[name]) {
          lightOverrides.push(`  ${varName}: light-dark(${token.value}, ${lightValues[name]});`);
        } else {
          lightOverrides.push(`  ${varName}: light-dark(${token.value}, ${token.value});`);
        }
      }
    });

    return `/* Rei das Vendas Design System — CSS Custom Properties */
/* Auto-generated from Style Dictionary — DO NOT EDIT DIRECTLY */

:root {
${props.join('\n')}
}

/* Light-dark semantic overrides */
@supports (color: light-dark(black, white)) {
  :root {
${lightOverrides.join('\n')}
  }
}

/* OpenType features */
body {
  font-feature-settings: "calt" 1, "kern" 1, "liga" 1, "clig" 1, "dlig" 0, "tnum" 1, "lnum" 1, "ss01" 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Image uniform filter */
.content-image {
  filter: saturate(0.9) contrast(1.05);
}

/* Baseline grid overlay utility */
.baseline-grid {
  background-image: linear-gradient(
    to bottom,
    transparent 0px,
    rgba(214, 168, 79, 0.06) 1px,
    transparent 1px
  );
  background-size: 100% 8px;
  pointer-events: none;
}
.baseline-grid-4px {
  background-image: linear-gradient(
    to bottom,
    rgba(214, 168, 79, 0.04) 1px,
    transparent 1px
  );
  background-size: 100% 4px;
  pointer-events: none;
}

/* Gold gradient text */
.text-gradient-gold {
  background: linear-gradient(135deg, #D6A84F, #F2D38A, #D6A84F);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Gold text gradient with shimmer */
.text-gradient-premium {
  background: linear-gradient(135deg, #D6A84F, #F2D38A, #D6A84F);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gold-shimmer 4s ease-in-out infinite;
}

@keyframes gold-shimmer {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

/* Section spacing */
.section-spacing {
  margin-bottom: 120px;
}
@media (max-width: 768px) {
  .section-spacing {
    margin-bottom: 72px;
  }
}

/* Interactive hover state - standardized easing */
.interactive-hover {
  transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
}
.interactive-hover:hover {
  transition: all 150ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* Scroll progress bar */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 9999;
  pointer-events: none;
  animation: scroll-progress-fill linear;
  animation-timeline: scroll(root);
}
.scroll-progress::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--rdv-color-gold-500), var(--rdv-color-gold-200));
  box-shadow: 0 0 12px var(--rdv-color-semantic-glow);
}
@keyframes scroll-progress-fill {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
  transform-origin: left center;
}
`;
  },
});

// SCSS variables
StyleDictionary.registerFormat({
  name: 'scss-variables',
  format: ({ dictionary }) => {
    const vars = dictionary.allTokens.map((token) => {
      const varName = '$rdv-' + token.path.join('-');
      return `${varName}: ${token.value};`;
    });
    return `// Rei das Vendas Design System — SCSS Variables
// Auto-generated from Style Dictionary
// Usage: @use '@altiq/design-system/tokens' as rdv;

${vars.join('\n')}

// Mixins
@mixin section-spacing {
  margin-bottom: 120px;
  @media (max-width: 768px) {
    margin-bottom: 72px;
  }
}

@mixin interactive-hover {
  transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
  &:hover {
    transition: all 150ms cubic-bezier(0.22, 1, 0.36, 1);
  }
}

@mixin text-gradient-gold {
  background: linear-gradient(135deg, #D6A84F, #F2D38A, #D6A84F);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@mixin content-image {
  filter: saturate(0.9) contrast(1.05);
}

@mixin opentype-default {
  font-feature-settings: "calt" 1, "kern" 1, "liga" 1, "clig" 1, "tnum" 1, "lnum" 1, "ss01" 1;
}
`;
  },
});

// ── Style Dictionary Configuration ──────────────────────────────

const sdConfig = {
  source: [path.join(__dirname, 'src/tokens/tokens.json')],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['name/css-custom', 'attribute/cti'],
      buildPath: path.join(__dirname, 'build/css/'),
      files: [
        {
          destination: 'tokens.css',
          format: 'css-custom-properties',
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      transforms: ['name/kebab', 'attribute/cti'],
      buildPath: path.join(__dirname, 'build/scss/'),
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss-variables',
        },
      ],
    },
    'tailwind-preset': {
      transformGroup: 'js',
      transforms: ['attribute/cti', 'name/camel'],
      buildPath: path.join(__dirname, 'build/tailwind/'),
      files: [
        {
          destination: 'tailwind-preset.js',
          format: 'tailwind-preset',
        },
      ],
    },
  },
};

export default sdConfig;
