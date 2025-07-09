/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'sans' will now default to Inter unless overridden
        sans: ['Inter', 'sans-serif'],
        // 'serif' will now default to Lora unless overridden
        serif: ['Lora', 'serif'],
        // You can also add specific aliases if you prefer
        // inter: ['Inter', 'sans-serif'],
        // lora: ['Lora', 'serif'],
      },
      colors: {
        // Your custom color palette
        'primary-background': '#F2F4F3',
        'primary-text': '#0A0908',
        'accent-red': '#D6001A',
        'darker-red': '#A30013',
        // Assuming this is your star rating color
        'star-red': '#E00000',
      }
    },
  },
 
  plugins: [],
};


