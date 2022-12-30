import React, { useMemo } from 'react';
import {
  getLineOption,
  line,
  legendFormat,
  getTooltipsFormatter,
  getColorWithLabel,
  summaryLine,
} from '@modules/analyze/options';
import { Support } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';

import { useTranslation } from 'next-i18next';

const tansOpts: TransOpt = {
  legendName: 'updated issues count',
  xKey: 'grimoireCreationDate',
  yKey: 'metricCommunity.updatedIssuesCount',
  summaryKey: 'summaryCommunity.updatedIssuesCount',
};

const getOptions: GenChartOptions = (
  { xAxis, compareLabels, yResults, summaryMedian, summaryMean },
  theme
) => {
  const series = yResults.map(({ legendName, label, level, data }) => {
    const color = getColorWithLabel(theme, label);
    return line({
      name: label,
      data: data,
      color,
    });
  });

  series.push(
    summaryLine({
      id: 'median',
      name: 'Median',
      data: summaryMedian,
      color: '#5B8FF9',
    })
  );
  series.push(
    summaryLine({
      id: 'average',
      name: 'Average',
      data: summaryMean,
      color: '#F95B5B',
    })
  );
  return getLineOption({
    xAxisData: xAxis,
    series,
    legend: legendFormat(compareLabels),
    tooltip: {
      formatter: getTooltipsFormatter({ compareLabels }),
    },
  });
};

const UpdatedIssuesCount = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t(
        'metrics_models:community_service_and_support.metrics.updated_issues_count'
      )}
      id={Support.UpdatedIssuesCount}
      description={t(
        'metrics_models:community_service_and_support.metrics.updated_issues_count_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/community-service-and-support/#updated-issues-count'
      }
    >
      {(ref) => {
        return (
          <ChartWithData tansOpts={tansOpts} getOptions={getOptions}>
            {(loading, option) => {
              return (
                <EChartX containerRef={ref} loading={loading} option={option} />
              );
            }}
          </ChartWithData>
        );
      }}
    </BaseCard>
  );
};

export default UpdatedIssuesCount;
