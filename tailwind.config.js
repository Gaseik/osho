/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zen-dark': '#0a0a1a',
        'zen-darker': '#121228',
        'zen-gold': 'rgba(255, 215, 0, 1)',
        'zen-gold-light': 'rgba(255, 215, 0, 0.8)',
        'zen-gold-dim': 'rgba(255, 215, 0, 0.6)',
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
      },
      animation: {
        'glow': 'glow 1.5s ease-in-out infinite',
        'fadeUp': 'fadeUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'slideIn': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
