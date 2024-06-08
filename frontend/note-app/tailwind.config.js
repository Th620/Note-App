/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        bgGray: "#7b79794e",
      }
    },
  },
  plugins: [],
  darkMode: 'selector',
}

