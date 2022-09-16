/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // using important mainly to override Next's default image styling and add a border to images
  important: true,
  theme: {
    screens: {
      xs: '484px',
      ...defaultTheme.screens,
    },
    extend: {
      // font stacks selected from https://www.cssfontstack.com/
      fontFamily: {
        sans: [
          'Calibri',
          'Candara',
          'Segoe',
          'Segoe UI',
          'Optima',
          'Arial',
          'sans-serif',
        ],
        serif: [
          'Baskerville',
          'Baskerville Old Face',
          'Hoefler Text',
          'Garamond',
          'Times New Roman',
          'serif',
        ],
      },
      gridTemplateColumns: {
        gallery: 'repeat(auto-fit, minmax(200px, 1fr))',
      },
      gridTemplateRows: {
        gallery: '40px',
      },
      gridAutoRows: {
        gallery: '200px',
      },
    },
  },
  plugins: [],
};
