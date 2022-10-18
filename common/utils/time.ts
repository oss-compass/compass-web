import { format, parseJSON } from 'date-fns';

const FORMAT_YMD = 'yyyy-MM-dd';

export const formatISO = (s: string, layout?: string) => {
  if (!s) return '';
  const p = parseJSON(s);
  return format(p, layout || FORMAT_YMD);
};
