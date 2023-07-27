import jsCookie from 'js-cookie';
import { getDomain } from './getDomain';

export const cookieKeys = {
  USER_LOCALE_KEY: 'locale',
  AUTH_CALLBACK_URL: 'auth.callback-url',
  AUTH_PROVIDER: 'auth.provider',
};

// ------------------------------auth callback url-----------------------------------
const inMinutes = 1 / (24 * 60);

export const cookieSetCallbackUrl = (path: string) => {
  jsCookie.set(cookieKeys.AUTH_CALLBACK_URL, path, {
    expires: 5 * inMinutes,
    path: '/',
    domain: getDomain(),
  });
};

// -----------------------------auth provider------------------------------------
export const cookieSetAuthProvider = (val: string) => {
  jsCookie.set(cookieKeys.AUTH_PROVIDER, val, {
    expires: 365,
    path: '/',
    domain: getDomain(),
  });
};

export const cookieGetAuthProvider = () => {
  return jsCookie.get(cookieKeys.AUTH_PROVIDER);
};

// -----------------------------locale------------------------------------
export const cookieSetLocale = (local: string) => {
  jsCookie.set(cookieKeys.USER_LOCALE_KEY, local, {
    expires: 365,
    path: '/',
    domain: getDomain(),
  });
};

export const cookieGetLocale = () => {
  return jsCookie.get(cookieKeys.USER_LOCALE_KEY);
};
