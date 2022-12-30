import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import Cookies from 'js-cookie';
import { navigatorLangLookup } from '@common/utils/languageDetector';
import { getDomain } from '@common/utils/getDomain';

type TypeLang = 'zh' | 'en';

const locales = ['zh', 'en'];
export const USER_LOCALE_KEY = 'locale';

function getLocale(): TypeLang;

function getLocale(reqCookies: NextApiRequestCookies): TypeLang;

function getLocale(reqCookies?: NextApiRequestCookies | undefined): TypeLang {
  if (reqCookies) {
    const language = reqCookies[USER_LOCALE_KEY] as TypeLang;
    return locales.includes(language) ? language : 'en';
  } else if (typeof reqCookies === 'undefined') {
    return (Cookies.get(USER_LOCALE_KEY) as TypeLang) || 'en';
  }
  return 'en';
}

export type { TypeLang };
export default getLocale;

export function getLang(found: string[]) {
  if (found[0].startsWith('zh')) return 'zh';
  return 'en';
}

export function browserLanguageDetectorAndReload() {
  const found = navigatorLangLookup();

  if (found && !Cookies.get(USER_LOCALE_KEY)) {
    const lang = getLang(found);
    Cookies.set(USER_LOCALE_KEY, lang, {
      expires: 365,
      path: '/',
      domain: getDomain(),
    });
    window.location.reload();
  }
}
