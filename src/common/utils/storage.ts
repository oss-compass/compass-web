const storageKey = {
  AUTH_EMAIL_RESEND_TIME: 'auth.email.resend.time',
};

export const storageSaveResendEmailTime = (content: string) => {
  sessionStorage.setItem(storageKey.AUTH_EMAIL_RESEND_TIME, content);
};

export const storageGetResendEmailTime = () => {
  return sessionStorage.getItem(storageKey.AUTH_EMAIL_RESEND_TIME);
};
