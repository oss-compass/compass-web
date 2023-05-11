import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { navigatorLangLookup } from '@common/utils/languageDetector';
import {
  cookieKeys,
  setCookieLocale,
  getCookieLocale,
} from '@common/utils/cookie';
const { USER_LOCALE_KEY } = cookieKeys;

type TypeLang = 'zh' | 'en';

const locales = ['zh', 'en'];

function getLocale(): TypeLang;

function getLocale(reqCookies: NextApiRequestCookies): TypeLang;

function getLocale(reqCookies?: NextApiRequestCookies | undefined): TypeLang {
  if (reqCookies) {
    const language = reqCookies[USER_LOCALE_KEY] as TypeLang;
    return locales.includes(language) ? language : 'en';
  } else if (typeof reqCookies === 'undefined') {
    return (getCookieLocale() as TypeLang) || 'en';
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

  if (found && !getCookieLocale()) {
    const lang = getLang(found);
    setCookieLocale(lang);
    window.location.reload();
  }
}
