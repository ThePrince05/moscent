/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        lora: ['Lora', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
        dmserif: ['"DM Serif Display"', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        josefin: ['"Josefin Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};


