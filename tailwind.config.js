/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pakhi actual brand palette — dark purple/navy + hot pink
        pakhi: {
          dark: '#0d0b1a',
          navy: '#141028',
          purple: '#1e1740',
          mid: '#2a2254',
          accent: '#e91e8c',      // hot pink
          'accent-light': '#f74dab',
          'accent-soft': '#ff6ec4',
          green: '#4caf50',
          'green-light': '#66d96a',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(233, 30, 140, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(233, 30, 140, 0.3)' },
        },
      },
    },
  },
  plugins: [],
}
