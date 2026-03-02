/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pmd-dark': '#0a0e1a',
        'pmd-blue': '#1a2a4a',
        'pmd-purple': '#2a1a3a',
        'pmd-gold': '#f0c040',
        'pmd-cyan': '#40c0e0',
        'pmd-text': '#e0e8f0',
        'pmd-highlight': '#ffd866',
        'pmd-panel': 'rgba(10, 20, 40, 0.85)',
        'pmd-border': 'rgba(100, 160, 220, 0.4)',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'monospace'],
        'body': ['"VT323"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(240, 192, 64, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(240, 192, 64, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
