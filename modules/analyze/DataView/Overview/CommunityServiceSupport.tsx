import React, { useMemo, useState } from 'react';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
  legendFormat,
  getTooltipsFormatter,
} from '@modules/analyze/options';
import { Support } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';

import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';
import { useTranslation } from 'next-i18next';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';

const CommunityServiceSupportOverview = () => {
  const { t } = useTranslation();
  const [onePointSys, setOnePointSys] = useState(false);

  const tansOpts: TransOpts = {
    metricType: 'metricCommunity',
    xAxisKey: 'grimoireCreationDate',
    yAxisOpts: [
      {
        legendName: 'community service and support',
        valueKey: 'communitySupportScore',
      },
    ],
  };

  const getOptions: GetChartOptions = (
    { xAxis, compareLabels, yResults },
    theme
  ) => {
    const series = genSeries<LineSeriesOption>({
      theme,
      yResults,
    })(
      (
        { legendName, label, compareLabels, level, isCompare, color, data },
        len
      ) => {
        !onePointSys && (data = data.map((i) => transHundredMarkSystem(i)));
        return line({
          name: label,
          data: data,
          color,
        });
      }
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

export default CommunityServiceSupportOverview;
