export const getLabRange = (metrics) => {
  if (metrics.find((i) => isYearCheck(i.ident))) {
    return '3Y';
  }
  return '1Y';
};
export const isYearCheck = (ident: string) => {
  return ident.includes('_year');
};
