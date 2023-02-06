import {
  formatDistanceToNowStrict,
  format,
  parseISO,
  parseJSON,
} from 'date-fns';
import { enGB, zhCN } from 'date-fns/locale';
import getLocale from '@common/utils/getLocale';

const FORMAT_YMD = 'yyyy-MM-dd';
const local = getLocale();
const languages = { en: enGB, zh: zhCN };

export const formatISO = (s: string, layout?: string) => {
  if (!s) return '';
  const p = parseJSON(s);
  return format(p, layout || FORMAT_YMD);
};

export const formatToNow = (s: string) => {
  if (!s) return '';
  const p = parseJSON(s);
  return formatDistanceToNowStrict(p, { locale: languages[local] });
};
