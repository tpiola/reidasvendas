/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      fontFamily: {
        sans: [
          'Geist',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        serif: [
          '"Playfair Display"',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ],
      },
      colors: {
        // Invisible Luxury — True Black + Titanium palette
        background: '#030303',
        surface: '#0A0A0B',
        'surface-2': '#111114',
        'surface-hover': '#18181C',
        border: 'rgba(255,255,255,0.08)',
        brand: {
          blue: '#0070F3',
          'blue-light': '#3B9EFF',
          emerald: '#10B981',
          titanium: '#C0C0C8',
        },
      },
      backgroundImage: {
        'gradient-titanium': 'linear-gradient(135deg, #E8E8F0 0%, #A0A0B0 40%, #C8C8D8 70%, #8888A0 100%)',
        'gradient-radial-blue': 'radial-gradient(ellipse at 30% 0%, rgba(0,112,243,0.18) 0%, transparent 60%)',
        'gradient-hero': 'linear-gradient(to bottom, rgba(3,3,3,0.85) 0%, rgba(3,3,3,0.45) 50%, rgba(3,3,3,0.92) 100%)',
        'gradient-cta': 'linear-gradient(135deg, #0070F3 0%, #3B9EFF 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0,112,243,0.45), 0 0 40px rgba(0,112,243,0.15)',
        'glow-blue-lg': '0 0 35px rgba(0,112,243,0.55), 0 0 80px rgba(0,112,243,0.2)',
        'glow-border': '0 0 0 1px rgba(255,255,255,0.08), 0 1px 0 rgba(255,255,255,0.06)',
        'glass': '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glass-hover': '0 12px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
        'luxury': '0 24px 64px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.4)',
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
        glass: 'rgba(255,255,255,0.10)',
        'glass-bright': 'rgba(255,255,255,0.16)',
        brand: 'rgba(0,112,243,0.35)',
      },
      backgroundColor: {
        glass: 'rgba(255,255,255,0.03)',
        'glass-hover': 'rgba(255,255,255,0.055)',
        'glass-surface': 'rgba(10,10,11,0.85)',
      },
      backdropBlur: {
        glass: '12px',
        'glass-md': '20px',
        'glass-lg': '40px',
        'glass-xl': '60px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      transitionDuration: {
        DEFAULT: '300ms',
        slow: '600ms',
      },
      animation: {
        'fade-in': 'fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up': 'slide-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'border-flow': 'border-flow 4s linear infinite',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,112,243,0.4), 0 0 40px rgba(0,112,243,0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(0,112,243,0.65), 0 0 60px rgba(0,112,243,0.25)' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
    },
  },
  plugins: [],
};
