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
  defaultNS: 'common',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
