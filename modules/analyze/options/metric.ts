import { MetricQuery } from '@graphql/generated';
import isArray from 'lodash/isArray';
import { repoUrlFormatForChart } from '@common/utils/url';
import get from 'lodash/get';
import { toTimeXAxis } from '@modules/analyze/options/index';

export const pickKeyToXAxis = (
  data: {
    url: string;
    result: MetricQuery | undefined;
  }[],
  opts: { typeKey: string; valueKey: string }
) => {
  const item = get(data, `[0].result.${opts.typeKey}`);
  if (isArray(item)) {
    return toTimeXAxis(item, opts.valueKey);
  }
  return [];
};

export const pickKeyToYAxis = (
  data: {
    url: string;
    result: MetricQuery | undefined;
  }[],
  opts: {
    typeKey: Exclude<keyof MetricQuery, '__typename'>;
    valueKey: string;
    legendName: string;
  }
) => {
  if (isArray(data)) {
    const isCompare = data.length > 1;
    return data.map((item) => {
      const typeResult = item.result?.[opts.typeKey];
      // @ts-ignore
      const data = typeResult?.map((i) => String(i[opts.valueKey]));
      return {
        name: isCompare ? repoUrlFormatForChart(item.url) : opts.legendName,
        data: data || [],
      };
    });
  }
  return [];
};
