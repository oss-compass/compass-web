export const getUrlReg = (provider: string) =>
  new RegExp(`^(https://)?${provider}\\.com/.+/.+`, 'i');
