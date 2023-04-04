import parseISO from 'date-fns/parseISO';
import getUnixTime from 'date-fns/getUnixTime';
import { Level } from '@modules/analyze/constant';
import { MetricQuery } from '@graphql/generated';
import { toFixed } from '@common/utils';
import { TransOpt, TransResult } from '@modules/analyze/type';

interface DataItem {
  label: string;
  level: Level;
  result: MetricQuery | undefined;
}

function getDateMap(
  labelsData: DeepReadonly<Array<DataItem>>,
  xKey: string,
  yKey: string
) {
  const [firstKey, secondKey] = yKey.split('.');
  const dateMap = new Map<string, Map<string, { y: number }>>();

  labelsData.forEach((item: any) => {
    const metric = item.result[firstKey];
    metric.forEach((i: any) => {
      const xAxis = i[xKey] as string;
      const yAxis = i[secondKey] as number;

      const dateItemExists = dateMap.get(xAxis);
      if (dateItemExists) {
        dateItemExists.set(item.label, { y: yAxis });
        dateMap.set(xAxis, dateItemExists);
      } else {
        const labelItem = new Map();
        labelItem.set(item.label, { y: yAxis });
        dateMap.set(xAxis, labelItem);
      }
    });
  });
  return dateMap;
}

export default function transMetricToAxis(
  labelsData: DeepReadonly<Array<DataItem>>,
  opts: TransOpt
): TransResult {
  const dateMap = getDateMap(labelsData, opts.xKey, opts.yKey);

  const dateMapKeys: string[] = [];
  dateMap.forEach((value, key) => {
    dateMapKeys.push(key);
  });

  const xAxis = dateMapKeys.sort((a, b) => {
    return getUnixTime(parseISO(a)) - getUnixTime(parseISO(b));
  });

  const yResults = labelsData.map(({ label, level }) => {
    const yAxis = xAxis.map((x) => {
      const dateItem = dateMap.get(x);
      const labelData = dateItem?.get(label);
      if (labelData?.y === undefined) {
        return '-';
      }
      return toFixed(labelData?.y, 3);
    });
    return {
      label,
      level,
      data: yAxis,
      legendName: opts.legendName,
      key: opts.yKey,
    };
  });

  return {
    xAxis,
    yResults,
  };
}
