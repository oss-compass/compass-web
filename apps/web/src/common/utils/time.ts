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

const parseDate = (s: string): Date | null => {
  if (!s) return null;
  const parsed = parseJSON(s);
  // `format()` throws `RangeError: Invalid time value` for an unparsable value and
  // `formatDistanceToNow` returns the string "Invalid Date", so filter it out here.
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const formatISO = (s: string, layout?: string) => {
  const p = parseDate(s);
  if (!p) return '';
  return format(p, layout || FORMAT_YMD);
};

export const formatToNow = (s: string) => {
  const p = parseDate(s);
  if (!p) return '';
  return formatDistanceToNow(p, { locale: languages[local] });
};

export const formatToNowStrict = (s: string) => {
  const p = parseDate(s);
  if (!p) return '';
  return formatDistanceToNowStrict(p, { locale: languages[local] });
};

export const isTimestampWithinSec = (ts: string, sec: number): boolean => {
  if (isNaN(+ts)) return false;
  const elapsed = Date.now() - Number(ts);
  return elapsed > 0 && elapsed < sec * 1000;
};
