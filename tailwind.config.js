/** @type {import('tailwindcss').Config} */
export default {
  content: ['./frontend/src/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
