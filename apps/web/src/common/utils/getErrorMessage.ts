import isBrowser from './isBrowser';

const getErrorMessage = (err) => {
  // @ts-ignore
  const errors = err?.response?.errors;
  let msg = '';
  if (Array.isArray(errors) && errors.length > 0) {
    msg = errors[0].message;
  } else if (typeof err?.message === 'string') {
    msg = err.message;
  }
  return msg;
};

export default getErrorMessage;
