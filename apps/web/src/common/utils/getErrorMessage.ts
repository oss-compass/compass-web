import isBrowser from './isBrowser';

const getErrorMessage = (err) => {
  // @ts-ignore
  return err?.response?.errors?.[0]?.message;
};

export default getErrorMessage;
