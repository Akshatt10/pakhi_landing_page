/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pakhi: {
          pink: '#E8547A',
          'pink-light': '#F7A8BE',
          'pink-soft': '#FDE8EF',
          purple: '#7C4DBA',
          'purple-light': '#B98FE0',
          'purple-soft': '#F0E8FA',
          cream: '#FFF8F5',
          dark: '#1A0A14',
          text: '#3D1A2E',
          muted: '#9B7A8A',
          green: '#4caf50',
          'green-light': '#66d96a',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.2s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'step-enter': 'stepEnter 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'chip-pop': 'chipPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'affirmation': 'affirmation 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'drift-1': 'drift1 12s ease-in-out infinite alternate',
        'drift-2': 'drift2 14s ease-in-out infinite alternate',
        'drift-3': 'drift3 10s ease-in-out infinite alternate',
        'avatar-float': 'avatarFloat 3s ease-in-out infinite alternate',
        'chip-float': 'chipFloat 0.6s ease forwards',
        'welcome-pulse': 'welcomePulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        stepEnter: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        chipPop: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '60%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        affirmation: {
          '0%': { opacity: '0', transform: 'scale(0.92)', filter: 'blur(6px)' },
          '100%': { opacity: '1', transform: 'scale(1)', filter: 'blur(0px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        drift1: {
          'to': { transform: 'translate(60px, 80px)' },
        },
        drift2: {
          'to': { transform: 'translate(-60px, -80px)' },
        },
        drift3: {
          'to': { transform: 'translate(-40px, 40px)' },
        },
        avatarFloat: {
          'to': { transform: 'translateY(-8px)' },
        },
        chipFloat: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        welcomePulse: {
          '0%, 100%': { opacity: '0.6', transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}
