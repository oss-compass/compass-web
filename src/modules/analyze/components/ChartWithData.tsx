import React, { ReactNode } from 'react';
import transMetricToAxis from '@modules/analyze/DataTransform/transMetricToAxis';
import transSummaryToAxis from '@modules/analyze/DataTransform/transSummaryToAxis';
import { EChartsOption } from 'echarts';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import { ChartThemeState, chartThemeState } from '@modules/analyze/store';
import LinkLegacy from '@common/components/LinkLegacy';
import { useSnapshot } from 'valtio';
import { formatISO } from '@common/utils';
import { TransOpt, GenChartData, YResult } from '@modules/analyze/type';
import { isNull, isUndefined } from 'lodash';

const isEmptyData = (result: YResult[]) => {
  return result.every((r) => {
    return r.data.every((i) => {
      return isNull(i) || isUndefined(i);
    });
  });
};

const ChartWithData: React.FC<{
  tansOpts: TransOpt;
  getOptions: (
    input: GenChartData,
    theme?: DeepReadonly<ChartThemeState>
  ) => EChartsOption;
  children:
    | ((args: {
        loading: boolean;
        isEmpty: boolean;
        option: EChartsOption;
      }) => ReactNode)
    | ReactNode;
}> = ({ children, getOptions, tansOpts }) => {
  const theme = useSnapshot(chartThemeState);
  const data = useMetricQueryData();
  const loading = data?.loading;

  const { xAxis, yResults } = transMetricToAxis(data?.items, tansOpts);
  const { summaryMean, summaryMedian } = transSummaryToAxis(
    data?.summary,
    xAxis,
    tansOpts.summaryKey
  );

  const compareLabels = yResults.map((i) => i.label);
  const isCompare = yResults.length > 1;

  const echartsOpts = getOptions(
    {
      isCompare,
      compareLabels,
      xAxis: xAxis.map((i) => formatISO(i)),
      yResults,
      summaryMean,
      summaryMedian,
    },
    theme
  );

  console.log({ xAxis, yResults });
  const isEmpty = isEmptyData(yResults);
  let EmptyNode = null;
  if (isEmpty && !loading) {
    EmptyNode = (
      <div className="absolute left-0 right-0 top-0 bottom-0 z-10 flex w-full flex-col items-center justify-center">
        <p className="text-sm text-gray-400">
          There is currently no data in the chart,
        </p>
        <p className="text-sm text-gray-400">
          Please
          <LinkLegacy href={'/docs/community/wechat/'}>contact us </LinkLegacy>
          if you have any questions.
        </p>
      </div>
    );
  }

  return (
    <>
      {typeof children === 'function'
        ? children({ loading, isEmpty, option: echartsOpts })
        : children}

      {EmptyNode}
    </>
  );
};

export default ChartWithData;
