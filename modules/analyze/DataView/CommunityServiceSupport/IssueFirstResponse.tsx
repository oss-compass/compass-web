import React, { useEffect, useMemo, useRef } from 'react';
import { LineSeriesOption } from 'echarts';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
  getLegendSelected,
} from '@modules/analyze/options';
import { Support } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';

import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'metricCommunity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'avg', valueKey: 'issueFirstReponseAvg' },
    { legendName: 'mid', valueKey: 'issueFirstReponseMid' },
  ],
};

const getOptions: GetChartOptions = ({ xAxis, yResults }, theme) => {
  const series = genSeries<LineSeriesOption>({
    theme,
    comparesYAxis: yResults,
    seriesEachFunc: (
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
  });
  return getLineOption({
    xAxisData: xAxis,
    series,
    legend: {
      selected: getLegendSelected(series, 'avg'),
    },
  });
};

const IssueFirstResponse = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t(
        'metrics_models:community_service_and_support.metrics.issue_first_response'
      )}
      id={Support.IssueFirstResponse}
      description={t(
        'metrics_models:community_service_and_support.metrics.issue_first_response_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/community-service-and-support/#issue-first-response'
      }
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
