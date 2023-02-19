/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      colors:{
        grey:"#557495",
      },
      backgroundImage:{
        'hero': "url(../src/img/background.jpg)"
      }
    },
  },
  plugins: [],
} 