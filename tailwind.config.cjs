/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.svelte', './src/lib/components/**/*.svelte'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
