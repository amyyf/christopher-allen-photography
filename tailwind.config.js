/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
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
      gridAutoRows: {
        album: '200px',
      },
    },
  },
  plugins: [],
};
