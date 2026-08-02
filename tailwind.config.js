/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbf0',
          100: '#fef3e2',
          200: '#fde7c6',
          300: '#fbd599',
          400: '#f9c16d',
          500: '#f7ad41',
          600: '#d98a2b',
          700: '#b36824',
          800: '#8f4f1a',
          900: '#6b3810',
        },
        dark: {
          50: '#f9f9f9',
          100: '#f3f3f3',
          200: '#e8e8e8',
          300: '#d1d1d1',
          400: '#b0b0b0',
          500: '#888888',
          600: '#666666',
          700: '#444444',
          800: '#222222',
          900: '#111111',
        }
      },
      direction: ['rtl', 'ltr'],
    },
  },
  plugins: [],
}
