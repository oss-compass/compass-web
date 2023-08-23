export const verifyEmail = (email: string) => {
  const reg = /^([a-zA-Z0-9_.%+-])+@([a-zA-Z0-9_.-])+(\.[a-zA-Z0-9_-])+/;
  const emails = getEmail(email);
  return emails.every((i) => new RegExp(reg).test(i.trim()));
};

export const getEmail = (email: string) => {
  if (email.includes(',')) {
    return email.trim().split(',');
  } else if (email.includes('，')) {
    return email.trim().split('，');
  } else {
    return [email.trim()];
  }
};
