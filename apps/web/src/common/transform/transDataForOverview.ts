import { formatISO, toFixed } from '@common/utils';
import { CommunityRepoType } from '../constant';

const set = require('lodash/set');
import parseISO from 'date-fns/parseISO';
import getUnixTime from 'date-fns/getUnixTime';

const filterDataByCommunityRepoType = (
  data: any,
  communityRepoType: string
) => {
  const result: any = {};
  Object.keys(data).forEach((key: any) => {
    result[key] = data[key].filter((item: any) => {
      // if type not exist then return true
      if (!item.type) return true;
      return item.type === communityRepoType;
    });
  });
  return result;
};

export function transDataForOverview(
  data: any,
  //  type " metricCommunity"| "metricActivity | "metricGroupActivity" | ....
  opts: { type: string; key: string; legendName: string }[],
  timeKey: string,
  communityRepoType?: CommunityRepoType
) {
  communityRepoType = communityRepoType || 'software-artifact';

  // if metric data has type then filter repoType by args
  const filteredData = filterDataByCommunityRepoType(data, communityRepoType);

  //  get max length of metric data
  const maxLen = opts.reduce((acc, { type, key }) => {
    const len = filteredData[type]?.length;
    return acc < len ? len : acc;
  }, 0);

  // transform metric data to {time: {key: value}}
  const metricObj: any = {};
  for (let i = 0; i < maxLen; i++) {
    opts.forEach(({ type, key }) => {
      const item = filteredData[type][i];
      if (item) {
        const time = item[timeKey];
        set(metricObj, [time, [key]], item[key]);
      }
    });
  }

  const xAxis = Object.keys(metricObj).sort((a, b) => {
    return getUnixTime(parseISO(a)) - getUnixTime(parseISO(b));
  });

  const yAxisResult = opts.map(({ key, legendName }) => {
    return {
      name: key,
      legendName,
      data: xAxis.map((time) => {
        if (metricObj[time][key] === undefined) {
          return null;
        }
        return toFixed(metricObj[time][key], 3);
      }),
    };
  });

  return { xAxis: xAxis.map((i) => formatISO(i)), yAxisResult };
}
