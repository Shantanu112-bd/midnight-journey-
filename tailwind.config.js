/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        midnight: {
          50: '#f4f3ff',
          100: '#ebe9fe',
          200: '#d9d7fe',
          300: '#bcb7fc',
          400: '#9b8ff8',
          500: '#7a60f3',
          600: '#673ce9',
          700: '#562ad1',
          800: '#4723af',
          900: '#3c1f8e',
          950: '#0b081e',
        },
      },
    },
  },
  plugins: [],
};
