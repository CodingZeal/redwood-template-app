/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#BC611E',
        rustyOrange: '#BC611E',
        blackBean: '#371108',
        beige: '#FCF5F0',
        seaFoam: '#009788',
        grey: '#2E3747',
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
        int: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
