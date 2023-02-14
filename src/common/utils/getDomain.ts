import isBrowser from './isBrowser';

export const getTopDomain = () => {
  if (isBrowser()) {
    return document.domain.split('.').slice(-2).join('.');
  }
  return;
};

export const getDomain = () => {
  if (isBrowser()) {
    return document.domain;
  }
  return;
};
