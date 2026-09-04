import { SummaryQuery } from '@oss-compass/graphql';
import { toFixed } from '@common/utils';

function getSummaryMap(
  summaryData: DeepReadonly<SummaryQuery> | null,
  xKey: string,
  valKeyPath: string
) {
  if (!summaryData) return null;

  const summaryDateMap = new Map<string, { mean: number; median: number }>();
  const [firstKey, secondKey] = valKeyPath.split('.');
  if (!firstKey || !secondKey) return;

  // @ts-ignore
  const metric = summaryData[firstKey];
  metric.forEach((i: any) => {
    const xAxis = i[xKey] as string;
    // 统计字段在 schema 中可为 null，此时该月份无数据，
    // 跳过即可，下游会按 undefined 渲染 '-'
    if (!i || !i[secondKey]) return;
    const yAxis = i[secondKey] as { mean: number; median: number };
    summaryDateMap.set(xAxis, { mean: yAxis['mean'], median: yAxis['median'] });
  });
  return summaryDateMap;
}

export default function transSummaryToAxis(
  data: DeepReadonly<SummaryQuery> | null,
  xAxis: string[],
  valKeyPath: string
) {
  const summaryMap = getSummaryMap(data, 'grimoireCreationDate', valKeyPath);

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

  return { summaryMean, summaryMedian };
}
