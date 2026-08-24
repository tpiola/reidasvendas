/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7F2E9',
        surface: '#FFFFFF',
        'surface-2': '#F0E9DB',
        'surface-3': '#E9E1D0',
        gold: {
          DEFAULT: '#B88932',
          dark: '#9A6F24',
          light: '#D6B469',
          glow: 'rgba(184,137,50,0.18)',
          border: 'rgba(184,137,50,0.28)',
        },
        text: {
          primary: '#1C1914',
          secondary: '#4A4438',
          muted: '#8A8170',
        },
        glass: 'rgba(255,255,255,0.6)',
        'azul-profundo': '#0A2540',
        'verde-saude': '#0D9488',
        acento: '#C2410C',
        line: '#E4DCCB',
      },
      fontFamily: {
        sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
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
        'grid-gold': 'linear-gradient(rgba(184,137,50,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(184,137,50,0.05) 1px, transparent 1px)',
        'grid-subtle': 'linear-gradient(rgba(28,25,20,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,20,0.03) 1px, transparent 1px)',
        'gradient-gold': 'linear-gradient(135deg, #D6B469 0%, #B88932 60%, #9A6F24 100%)',
        'paper-grain': 'radial-gradient(circle at 30% 20%, rgba(184,137,50,0.06), transparent 55%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
        'grid-lg': '60px 60px',
      },
    },
  },
  plugins: [],
};
