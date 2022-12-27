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
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';

import { useTranslation } from 'next-i18next';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';

const tansOpts: TransOpt = {
  legendName: 'issue comment frequency',
  xKey: 'grimoireCreationDate',
  yKey: 'metricCommunity.commentFrequency',
  summaryKey: 'summaryCommunity.commentFrequency',
};

const getOptions: GenChartOptions = (
  { xAxis, compareLabels, yResults, summaryMean, summaryMedian },
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

const CommentFrequency = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t(
        'metrics_models:community_service_and_support.metrics.comment_frequency'
      )}
      id={Support.CommentFrequency}
      description={t(
        'metrics_models:community_service_and_support.metrics.comment_frequency_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/community-service-and-support/#comment-frequency'
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

export default CommentFrequency;
