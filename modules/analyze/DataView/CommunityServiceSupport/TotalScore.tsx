import React, { useMemo, useState } from 'react';
import {
  getLineOption,
  line,
  legendFormat,
  getTooltipsFormatter,
  getColorWithLabel,
  summaryLine,
  formatToHundredMark,
} from '@modules/analyze/options';
import { Support } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';

const TotalScore = () => {
  const { t } = useTranslation();
  const [onePointSys, setOnePointSys] = useState(false);

  const tansOpts: TransOpt = {
    legendName: 'community service and support',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCommunity.communitySupportScore',
    summaryKey: 'summaryCommunity.communitySupportScore',
  };

  const getOptions: GenChartOptions = (
    { xAxis, compareLabels, yResults, summaryMedian, summaryMean },
    theme
  ) => {
    const series = yResults.map(({ legendName, label, level, data }) => {
      const color = getColorWithLabel(theme, label);
      return line({
        name: label,
        data: formatToHundredMark(!onePointSys, data),
        color,
      });
    });

    series.push(
      summaryLine({
        id: 'median',
        name: 'Median',
        data: formatToHundredMark(!onePointSys, summaryMedian),
        color: '#5B8FF9',
      })
    );
    series.push(
      summaryLine({
        id: 'average',
        name: 'Average',
        data: formatToHundredMark(!onePointSys, summaryMean),
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

  return (
    <BaseCard
      title={t('metrics_models:community_service_and_support.title')}
      id={Support.Overview}
      description={t('metrics_models:community_service_and_support.desc')}
      docLink={
        '/docs/metrics-models/productivity/community-service-and-support/'
      }
      headRight={
        <ScoreConversion
          onePoint={onePointSys}
          onChange={(v) => {
            setOnePointSys(v);
          }}
        />
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

export default TotalScore;
