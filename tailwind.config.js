/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './common/components/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')],
};
