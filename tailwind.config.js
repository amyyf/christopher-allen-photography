/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '484px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: [
          'Lucida Grande',
          'Lucida Sans Unicode',
          'Lucida Sans',
          'Geneva',
          'Verdana',
          'sans-serif',
        ],
      },
      gridTemplateColumns: {
        album: 'repeat(auto-fit, minmax(200px, 1fr))',
      },
      gridTemplateRows: {
        album: '40px',
      },
      gridAutoRows: {
        album: '200px',
      },
    },
  },
  plugins: [],
};
