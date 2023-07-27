// https://github.com/i18next/i18next-browser-languageDetector/blob/master/src/browserLookups/navigator.js
export const navigatorLangLookup = () => {
  const found = [];

  if (typeof navigator !== 'undefined') {
    if (navigator.languages) {
      // chrome only; not an array, so can't use .push.apply instead of iterating
      for (let i = 0; i < navigator.languages.length; i++) {
        found.push(navigator.languages[i]);
      }
    }
    if (navigator.userLanguage) {
      found.push(navigator.userLanguage);
    }
    if (navigator.language) {
      found.push(navigator.language);
    }
  }

  return found.length > 0 ? found : undefined;
};
