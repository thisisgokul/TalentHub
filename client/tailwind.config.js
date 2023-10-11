/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Segoe UI", "SegoeUI", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors:{
        "primary":"#fff",
        "secondary":"#5d5bd4",
        "coral-blue": "#0067b8",
        "coral-gray":"#616161",'slate-gray': '#708090',
        
      },
      
    },
  },
  plugins: [],
};
