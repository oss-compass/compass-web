const storageKey = {
  AUTH_EMAIL_RESEND_TIME: 'auth.email.resend.time',
  AUTH_URL_ERROR_TOAST: 'auth.url.error.toast',
};

// `sessionStorage` throws a SecurityError when storage is disabled (privacy settings,
// third-party context, ...). The auth flow must keep working without it.
const safeGet = (key: string): string | null => {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (key: string, value: string): void => {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // ignore: the value is only used to throttle resends / carry a toast
  }
};

export const storageSaveResendEmailTime = (content: string) => {
  safeSet(storageKey.AUTH_EMAIL_RESEND_TIME, content);
};

export const storageGetResendEmailTime = () => {
  return safeGet(storageKey.AUTH_EMAIL_RESEND_TIME);
};

export const storageSetToastError = (key: string, content: string) => {
  safeSet(`${storageKey.AUTH_URL_ERROR_TOAST}_${key}`, content);
};

export const storageGetToastError = (key: string) => {
  return safeGet(`${storageKey.AUTH_URL_ERROR_TOAST}_${key}`);
};
