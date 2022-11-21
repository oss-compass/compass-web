import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import Cookies from 'js-cookie';

type TypeLang = 'zh' | 'en';

const locales = ['zh', 'en'];
const LOCALE_KEY = 'user_locale';

function getLocale(): TypeLang;

function getLocale(reqCookies: NextApiRequestCookies): TypeLang;

function getLocale(reqCookies?: NextApiRequestCookies | undefined): TypeLang {
  if (reqCookies) {
    const language = reqCookies[LOCALE_KEY] as TypeLang;
    return locales.includes(language) ? language : 'en';
  } else if (typeof reqCookies === 'undefined') {
    return (Cookies.get(LOCALE_KEY) as TypeLang) || 'en';
  }
  return 'en';
}

export type { TypeLang };
export default getLocale;
