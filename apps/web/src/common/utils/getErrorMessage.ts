import isBrowser from './isBrowser';

const getErrorMessage = (err) => {
  // @ts-ignore
  const errors = err?.response?.errors;
  let msg = '';
  if (Array.isArray(errors) && errors.length > 0) {
    msg = errors[0].message;
  }
  return msg;
};

export default getErrorMessage;
