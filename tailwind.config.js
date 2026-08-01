/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8f6d26',
        'primary-light': '#b48c24',
        secondary: '#002652e8',
        'secondary-light': '#1C5FB0',
      },
      fontFamily: {
        alexandria: ['Alexandria', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
