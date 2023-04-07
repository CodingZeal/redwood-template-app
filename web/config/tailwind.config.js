/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rustyOrange: '#BC611E',
        blackBean: '#371108',
        grey: '#2E3747',
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
        int: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
