import { Level } from '@modules/analyze/constant';
import { MetricQuery } from '@graphql/generated';
import { formatISO, toFixed } from '@common/utils';
import getUnixTime from 'date-fns/getUnixTime';
import parseISO from 'date-fns/parseISO';
import { TransOpt, TransResult } from '@modules/analyze/type';

interface DataItem {
  label: string;
  level: Level;
  result: MetricQuery | undefined;
}

function getYDateMap(
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

function getSummaryMap(
  labelsData: DeepReadonly<Array<DataItem>>,
  xKey: string,
  statKey: string
) {
  const summary = labelsData?.[0];
  if (!summary) return null;

  const summaryDateMap = new Map<string, { mean: number; median: number }>();
  const [firstKey, secondKey] = statKey.split('.');

  // @ts-ignore
  const metric = summary.result[firstKey];
  metric.forEach((i: any) => {
    const xAxis = i[xKey] as string;
    const yAxis = i[secondKey] as { mean: number; median: number };
    summaryDateMap.set(xAxis, { mean: yAxis['mean'], median: yAxis['median'] });
  });
  return summaryDateMap;
}

function transToAxisWithSummary(
  labelsData: DeepReadonly<Array<DataItem>>,
  opts: TransOpt
): TransResult {
  const dateMap = getYDateMap(labelsData, opts.xKey, opts.yKey);
  const summaryMap = getSummaryMap(labelsData, opts.xKey, opts.statKey);

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

  const summaryMean = xAxis.map((x) => {
    const summaryItem = summaryMap?.get(x);
    if (summaryItem?.mean === undefined) {
      return '-';
    }
    return toFixed(summaryItem?.mean, 3);
  });
  const summaryMedian = xAxis.map((x) => {
    const summaryItem = summaryMap?.get(x);
    if (summaryItem?.median === undefined) {
      return '-';
    }
    return toFixed(summaryItem?.median, 3);
  });

  return {
    xAxis: xAxis.map((i) => formatISO(i)),
    yResults,
    summaryMean,
    summaryMedian,
  };
}

export default transToAxisWithSummary;
