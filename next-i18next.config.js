/** @type {import("next-i18next").UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeDetection: false,
  },
  fallbackLng: {
    default: ['en'],
  },
  localePath: 'i18n/locales',
  defaultNS: 'common',
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
