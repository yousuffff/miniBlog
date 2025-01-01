/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'body' : '#B48291',
        'secondary': '#A5243D',
        'post':'#B9CFD4',
        'nav': '#AB6A7E'
        
        
      },
    },
      fontFamily:{
      funnel:["Funnel Sans", "serif" ],
      lexend: ["Lexend", 'serif']
    },
    
    },
  plugins: [],
}
