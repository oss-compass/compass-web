import React, { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import transMetricToAxis from '@common/transform/transMetricToAxis';
import transSummaryToAxis from '@common/transform/transSummaryToAxis';
import { EChartsOption } from 'echarts';
import useMetricQueryData from '@modules/lab/hooks/useMetricQueryData';
import { ChartThemeState, chartThemeState } from '@modules/analyze/store';
import LinkLegacy from '@common/components/LinkLegacy';
import { useSnapshot } from 'valtio';
import { formatISO } from '@common/utils';
import { TransOpt, GenChartData, YResult } from '@modules/analyze/type';
import { isNull, isUndefined } from 'lodash';
import { Trans } from 'react-i18next';

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
  indicators?: string;
  children:
    | ((args: {
        loading: boolean;
        isEmpty: boolean;
        option: EChartsOption;
      }) => ReactNode)
    | ReactNode;
}> = ({ children, indicators, getOptions, tansOpts }) => {
  const { t, i18n } = useTranslation();
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

  // todo split chart options in different components
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
  if (!isCompare) {
    echartsOpts.grid = {
      ...echartsOpts.grid,
      top: indicators ? 50 : 10,
    };
    echartsOpts.legend = {
      show: false,
    };
  }

  const isEmpty = isEmptyData(yResults);
  let EmptyNode = null;
  if (isEmpty && !loading) {
    EmptyNode = (
      <div className="absolute left-0 right-0  bottom-0 z-10 flex h-[350px] w-full flex-col items-center justify-center bg-[rgba(255,255,255,.8)]">
        <p className="text-xs text-gray-400">
          {t('analyze:there_is_currently_no_data_in_the_chart')}
        </p>
        <p className="text-xs text-gray-400">
          <Trans
            i18nKey="please_contact_us_if_you_have"
            ns="analyze"
            components={{
              l: (
                <LinkLegacy
                  href={
                    i18n.language === 'en'
                      ? 'docs/community/'
                      : 'docs/zh/community/'
                  }
                />
              ),
            }}
            values={{
              e: t('analyze:contact_us'),
            }}
          />
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
