import { formatISO } from '@common/utils';

const set = require('lodash/set');
import parseISO from 'date-fns/parseISO';
import getUnixTime from 'date-fns/getUnixTime';

export function transDataForOverview(
  data: any,
  opts: { type: string; key: string; legendName: string }[],
  dateKey: string
) {
  const maxLen = opts.reduce((acc, { type, key }) => {
    const len = data[type]?.length;
    return acc < len ? len : acc;
  }, 0);

  const obj: any = {};
  for (let i = 0; i < maxLen; i++) {
    opts.forEach(({ type, key }) => {
      const item = data[type][i];
      if (item) {
        const date = item[dateKey];
        set(obj, [date, [key]], item[key]);
      }
    });
  }

  const xAxis = Object.keys(obj).sort((a, b) => {
    return getUnixTime(parseISO(a)) - getUnixTime(parseISO(b));
  });
  const yAxisResult = opts.map(({ key, legendName }) => {
    return {
      name: key,
      legendName,
      data: xAxis.map((date) => {
        if (obj[date][key] === undefined) {
          return null;
        }
        return obj[date][key];
      }),
    };
  });

  return { xAxis: xAxis.map((i) => formatISO(i)), yAxisResult };
}
