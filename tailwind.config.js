/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        horizon: {
          DEFAULT: '#5682B1',
          light: '#739EC9',
          dark: '#3D6A99',
        },
        warmth: {
          DEFAULT: '#FFE8DB',
          dark: '#FFD4BC',
        },
        carbon: {
          950: '#0A0A0A',
          900: '#141414',
          850: '#1A1A1A',
          800: '#222222',
          700: '#333333',
          600: '#444444',
          500: '#666666',
          400: '#888888',
          300: '#A0A0A0',
          200: '#CCCCCC',
          100: '#E5E5E5',
          50: '#F5F5F5',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'reveal-up': 'reveal-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-left': 'reveal-left 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow': 'glow-pulse 3s ease-in-out infinite',
        'border-trace': 'border-trace 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'reveal-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-left': {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(86, 130, 177, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(86, 130, 177, 0.25)' },
        },
        'border-trace': {
          '0%': { clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)' },
          '25%': { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
          '50%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 100% 100%)' },
          '75%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
          '100%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
        },
      },
    },
  },
  plugins: [],
}
