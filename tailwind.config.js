/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './common/components/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // https://tailwindcss.com/docs/screens#max-width-breakpoints
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
      '>xl': { min: '1280px' },
      '>md': { min: '768px' },
      '>sm': { min: '640px' },
    },
    extend: {
      zIndex: {
        drawer: 120,
        mask: 100,
        fullscreen: 80,
        dropdown: 50,
        nav: 30,
      },
      colors: {
        primary: '#3A5BEF',
        mask: 'rgba(0, 0, 0, 0.5)',
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
