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
        'hero': "url(../src/Components/Images/d-a-v-i-d-s-o-n-l-u-n-a-KeGToDVN0l4-unsplash.jpg)"
      }
    },
  },
  plugins: [],
}