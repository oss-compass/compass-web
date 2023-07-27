const storageKey = {
  AUTH_EMAIL_RESEND_TIME: 'auth.email.resend.time',
  AUTH_URL_ERROR_TOAST: 'auth.url.error.toast',
};

export const storageSaveResendEmailTime = (content: string) => {
  sessionStorage.setItem(storageKey.AUTH_EMAIL_RESEND_TIME, content);
};

export const storageGetResendEmailTime = () => {
  return sessionStorage.getItem(storageKey.AUTH_EMAIL_RESEND_TIME);
};

export const storageSetToastError = (key: string, content: string) => {
  return sessionStorage.setItem(
    `${storageKey.AUTH_URL_ERROR_TOAST}_${key}`,
    content
  );
};

export const storageGetToastError = (key: string) => {
  return sessionStorage.getItem(`${storageKey.AUTH_URL_ERROR_TOAST}_${key}`);
};
