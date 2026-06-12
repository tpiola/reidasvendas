/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0A0A0B',
        'brand-blue': '#0057FF',
        'brand-blue-soft': '#3B82F6',
        'brand-gold': '#C9A84C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['ui-serif', 'Iowan Old Style', 'Georgia', 'serif'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'hero-crossfade': 'hero-crossfade 24s infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-up': 'fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'ken-burns': 'ken-burns 12s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        'hero-crossfade': { '0%, 25%': { opacity: '0.4' }, '33%, 92%': { opacity: '0' }, '100%': { opacity: '0.4' } },
        'float': { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-8px)' } },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 87, 255, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 87, 255, 0.35)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.0)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      backdropBlur: {
        'glass-md': '20px',
        'glass-lg': '40px',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
