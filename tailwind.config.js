/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#080D18',
        navy: '#101B2D',
        elevated: '#142238',
        'navy-light': '#142238',
        cyan: {
          DEFAULT: '#00D9FF',
          electric: '#00D9FF',
        },
        violet: {
          DEFAULT: '#7565FF',
          quantum: '#7565FF',
        },
        ice: '#EAF4FF',
        muted: '#91A3BA',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(0, 217, 255, 0.22)',
        'glow-violet': '0 0 24px rgba(117, 101, 255, 0.24)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
