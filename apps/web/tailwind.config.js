/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-paper-rgb) / <alpha-value>)',
        surface: 'rgb(var(--color-paper-raised-rgb) / <alpha-value>)',
        'surface-2': 'rgb(var(--color-surface-2-rgb) / <alpha-value>)',
        'surface-3': 'rgb(var(--color-surface-3-rgb) / <alpha-value>)',
        gold: {
          DEFAULT: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
          dark: 'rgb(var(--color-accent-strong-rgb) / <alpha-value>)',
          light: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
          glow: 'rgb(var(--color-accent-rgb) / 0.12)',
          border: 'rgb(var(--color-accent-rgb) / 0.28)',
        },
        text: {
          primary: 'rgb(var(--color-ink-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--color-ink-soft-rgb) / <alpha-value>)',
          muted: 'rgb(var(--color-muted-rgb) / <alpha-value>)',
        },
        glass: 'rgb(var(--color-paper-raised-rgb) / 0.84)',
        'azul-profundo': 'rgb(var(--color-ink-rgb) / <alpha-value>)',
        'verde-saude': 'rgb(var(--color-positive-rgb) / <alpha-value>)',
        acento: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
        line: 'rgb(var(--color-rule-rgb) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Archivo', 'Helvetica Neue', 'sans-serif'],
        serif: ['Barlow Condensed', 'Arial Narrow', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ken-burns': 'ken-burns 20s ease-in-out infinite alternate',
        'line-grow': 'lineGrow 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-8px, -4px)' },
        },
        lineGrow: {
          '0%': { transform: 'scaleX(0)', opacity: '0' },
          '100%': { transform: 'scaleX(1)', opacity: '1' },
        },
      },
      screens: {
        xs: '480px',
      },
      backgroundImage: {
        'grid-gold': 'none',
        'grid-subtle': 'none',
        'gradient-gold': 'none',
        'paper-grain': 'none',
      },
      backgroundSize: {
        'grid': '40px 40px',
        'grid-lg': '60px 60px',
      },
    },
  },
  plugins: [],
};
