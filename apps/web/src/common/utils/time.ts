import {
  formatDistanceToNow,
  formatDistanceToNowStrict,
  format,
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
  return formatDistanceToNow(p, { locale: languages[local] });
};

export const formatToNowStrict = (s: string) => {
  if (!s) return '';
  const p = parseJSON(s);
  return formatDistanceToNowStrict(p, { locale: languages[local] });
};

export const isTimestampWithinSec = (ts: string, sec: number): boolean => {
  if (isNaN(+ts)) return false;
  const elapsed = Date.now() - Number(ts);
  return elapsed > 0 && elapsed < sec * 1000;
};
