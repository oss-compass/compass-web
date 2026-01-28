export const getUrlReg = (provider: string) => {
  if (provider === 'gitcode') {
    return new RegExp(`^(https://)?(gitcode|atomgit)\\.com/.+/.+`, 'i');
  }
  return new RegExp(`^(https://)?${provider}\\.com/.+/.+`, 'i');
};
