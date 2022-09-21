import { MetricQuery } from '@graphql/generated';
import isArray from 'lodash/isArray';
import maxBy from 'lodash/maxBy';
import { repoUrlFormatForChart } from '@common/utils/url';
import get from 'lodash/get';
import { toTimeXAxis } from '@modules/analyze/options/index';
import { Level } from '@modules/analyze/constant';
import { toFixed } from '@common/utils';
import { padArrayStart } from '@common/utils/array';

export const pickKeyToXAxis = (
  data: {
    label: string;
    level: Level;
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

interface DateItem {
  label: string;
  level: Level;
  result: MetricQuery | undefined;
}

interface Option {
  typeKey: Exclude<keyof MetricQuery, '__typename'>;
  valueKey: string;
  valueFormat?: (v: any) => number;
  legendName: string;
}

const formatLegendName = (name: string, level: Level) => {
  let label = name;
  if (level === Level.REPO) {
    label = repoUrlFormatForChart(name);
  }

  return label;
};

export const pickKeyToYAxis = (data: Array<DateItem>, opt: Option) => {
  if (!isArray(data)) {
    return [];
  }
  const isCompare = data.length > 1;
  const { typeKey, valueKey, valueFormat, legendName } = opt;

  const result = data.map((item) => {
    const typeResult = item.result?.[typeKey];

    // format legend name
    const compareNames = formatLegendName(item.label, item.level);
    const name = isCompare ? compareNames : legendName;

    const values = typeResult?.map((i) => {
      // @ts-ignore
      const val = i[valueKey];
      return toFixed(val, 3) || 0;
    });

    return { name, data: values || [] };
  });

  const max = maxBy(result, (i) => i.data.length);
  return result.map((i) => {
    i.data = padArrayStart(i.data, max?.data.length || 0, 0);
    return i;
  });
};

export const pickKeyGroupToYAxis = (
  data: Array<DateItem>,
  opts: Array<Option>
) => {
  if (!isArray(data)) {
    return [];
  }

  const isCompare = data.length > 1;
  const result = data.reduce<{ name: string; data: (number | string)[] }[]>(
    (acc, item) => {
      if (!item.result) return [];

      const yData = opts.map((opt) => {
        const { typeKey, valueKey, valueFormat, legendName } = opt;
        const typeResult = item.result?.[typeKey];

        // format legend name
        const compareNames = formatLegendName(item.label, item.level);
        const name = isCompare ? `${compareNames} ${legendName}` : legendName;

        const values = typeResult?.map((i) => {
          // @ts-ignore
          const val = i[valueKey];
          if (valueFormat) return valueFormat(val);
          return toFixed(val, 3) || 0;
        });

        return { name, data: values || [] };
      });
      return [...acc, ...yData];
    },
    []
  );

  const max = maxBy(result, (i) => i.data.length);
  return result.map((i) => {
    i.data = padArrayStart(i.data, max?.data.length || 0, 0);
    return i;
  });
};
