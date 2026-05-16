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
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        'hero-crossfade': { '0%, 25%': { opacity: '0.4' }, '33%, 92%': { opacity: '0' }, '100%': { opacity: '0.4' } },
        'float': { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-8px)' } },
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
