/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#111111',
        tertiary: '#222222',
      },
      fontFamily: {
        questrial: ['Questrial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

