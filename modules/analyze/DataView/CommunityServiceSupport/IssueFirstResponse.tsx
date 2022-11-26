import React, { useEffect, useMemo, useRef } from 'react';
import { LineSeriesOption } from 'echarts';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import { Support } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';
import { ChartThemeState } from '@modules/analyze/context';
import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'metricCommunity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'avg', valueKey: 'issueFirstReponseAvg' },
    { legendName: 'mid', valueKey: 'issueFirstReponseMid' },
  ],
};

const getOptions = (
  { xAxis, yResults }: TransResult,
  theme?: ChartThemeState
) => {
  const series = genSeries<LineSeriesOption>(
    yResults,
    (
      { legendName, label, compareLabels, level, isCompare, color, data },
      len
    ) => {
      return line({
        name: getLegendName(legendName, {
          label,
          compareLabels,
          level,
          isCompare,
          legendTypeCount: len,
        }),
        data: data,
        color,
      });
    },
    theme
  );
  return getLineOption({ xAxisData: xAxis, series });
};

const IssueFirstResponse = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t(
        'metrics_models:community_service_and_support.issue_first_response'
      )}
      id={Support.IssueFirstResponse}
      description={t(
        'metrics_models:community_service_and_support.issue_first_response_desc'
      )}
    >
      {(ref) => {
        return (
          <LoadInView containerRef={ref}>
            <Chart getOptions={getOptions} tansOpts={tansOpts} />
          </LoadInView>
        );
      }}
    </BaseCard>
  );
};

export default IssueFirstResponse;
