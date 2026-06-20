/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#030303',
        surface: '#080808',
        'surface-2': '#0B0B0B',
        'surface-3': '#111111',
        gold: {
          DEFAULT: '#D6A84F',
          dark: '#B88932',
          light: '#F2D38A',
          glow: 'rgba(214,168,79,0.35)',
          border: 'rgba(214,168,79,0.22)',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#A1A1AA',
          muted: '#8A8A92',
        },
        glass: 'rgba(255,255,255,0.035)',
        'azul-profundo': '#0A2540',
        'verde-saude': '#0D9488',
        acento: '#F97316',
      },
      fontFamily: {
        sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'ui-serif', 'Georgia', 'serif'],
      },
      animation: {
        'gold-shimmer': 'gold-shimmer 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'drift': 'drift 8s ease-in-out infinite',
        'drift-reverse': 'drift-reverse 10s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ken-burns': 'ken-burns 20s ease-in-out infinite alternate',
        'line-grow': 'lineGrow 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'particle-drift': 'particleDrift 6s ease-in-out infinite',
      },
      keyframes: {
        'gold-shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(214,168,79,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(214,168,79,0.3)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.6 },
        },
        'drift': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -20px) rotate(5deg)' },
          '66%': { transform: 'translate(-20px, 15px) rotate(-3deg)' },
        },
        'drift-reverse': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(-25px, 15px) rotate(-5deg)' },
          '66%': { transform: 'translate(20px, -10px) rotate(3deg)' },
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
        particleDrift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { opacity: '0.6' },
        },
      },
      screens: {
        xs: '480px',
      },
      backgroundImage: {
        'grid-gold': 'linear-gradient(rgba(214,168,79,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(214,168,79,0.04) 1px, transparent 1px)',
        'grid-subtle': 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        'gradient-gold': 'linear-gradient(135deg, #F2D38A 0%, #D6A84F 45%, #B88932 75%, #D6A84F 100%)',
        'gradient-glow': 'radial-gradient(circle at 50% 50%, rgba(214,168,79,0.12), transparent 60%)',
        'gradient-radial-dark': 'radial-gradient(circle at 30% 20%, rgba(214,168,79,0.08), transparent 60%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
        'grid-lg': '60px 60px',
      },
    },
  },
  plugins: [],
};
