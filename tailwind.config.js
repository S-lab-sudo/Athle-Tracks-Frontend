/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'exo2': ['Exo+2', 'serif'],
      'smooch': ['Smooch', 'sans-serif'],
      'inter': ['Inter', 'sans-serif'],
      'playfair': ['Playfair Display', 'serif'],
      'roboto-mono': ['Roboto Mono', 'monospace'],
    },
    extend: {
      colors: {
        'test-primary': '#FF6B00',
        'test-secondary': '#181F4D',
        'test-mandatory': '#D1D5DB', 
      },
    },
  },
  variants: {},
  plugins: [],
}
