/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-light': '#f9f7fd',
        'primary-dark': '#0F172A',
        'text-light': '#5e5c7f',
        'text-dark': '#CBD5E1',
        'title-light': '#353252',
        'title-dark': '#fff',
        'card-dark': '#1E293B',
        'card-light': '#fff',
        'button-light': '#0F172A',
        'button-dark': '#f9f7fd',
        action: '#ff4d61',
      },
      boxShadow: {
        custom: '0px 5px 20px 0px rgb(69 67 96 / 10%)',
      },
    },
  },
  plugins: [tailwindScrollbar],
}
