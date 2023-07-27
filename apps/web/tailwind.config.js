const path = require('path');

const ui = path.join(
  path.resolve(__dirname, '../../node_modules/@oss-compass/ui'),
  '**/*.{js,jsx,ts,tsx}'
);

/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}', ui],
  theme: {
    // https://tailwindcss.com/docs/screens#max-width-breakpoints
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
      '>2xl': { min: '1536px' },
      '>xl': { min: '1280px' },
      '>lg': { min: '1024px' },
      '>md': { min: '768px' },
      '>sm': { min: '640px' },
    },
    extend: {
      zIndex: {
        modal: 1000,
        drawer: 500,
        mask: 400,
        fullscreen: 300,
        dropdown: 200,
        header: 120,
        nav: 100,
        menu: 80,
      },
      colors: {
        primary: '#3A5BEF',
        secondary: '#868690',
        gray58: '#585858',
        mask: 'rgba(0, 0, 0, 0.5)',
      },
      inset: {
        '-16': '-4rem',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')],
  daisyui: {
    styled: false,
    themes: ['light'],
    base: false,
    utils: false,
    logs: true,
    rtl: false,
    prefix: 'daisy-',
  },
};
