/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/common/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
  ],
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
