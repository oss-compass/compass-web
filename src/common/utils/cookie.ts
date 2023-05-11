import jsCookie from 'js-cookie';
import { getDomain } from './getDomain';

export const cookieKeys = {
  USER_LOCALE_KEY: 'locale',
  AUTH_CALLBACK_URL: 'auth.callback-url',
  AUTH_PROVIDER: 'auth.provider',
};

// ------------------------------auth callback url-----------------------------------
const inMinutes = 1 / (24 * 60);

export const setCallbackUrl = (path: string) => {
  jsCookie.set(cookieKeys.AUTH_CALLBACK_URL, path, {
    expires: 5 * inMinutes,
    path: '/',
    domain: getDomain(),
  });
};

// -----------------------------auth provider------------------------------------
export const setAuthProvider = (val: string) => {
  jsCookie.set(cookieKeys.AUTH_PROVIDER, val, {
    expires: 365,
    path: '/',
    domain: getDomain(),
  });
};

export const getAuthProvider = () => {
  return jsCookie.get(cookieKeys.AUTH_PROVIDER);
};

// -----------------------------locale------------------------------------
export const setCookieLocale = (local: string) => {
  jsCookie.set(cookieKeys.USER_LOCALE_KEY, local, {
    expires: 365,
    path: '/',
    domain: getDomain(),
  });
};

export const getCookieLocale = () => {
  return jsCookie.get(cookieKeys.USER_LOCALE_KEY);
};
