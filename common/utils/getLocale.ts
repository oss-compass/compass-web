import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import Cookies from 'js-cookie';

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
