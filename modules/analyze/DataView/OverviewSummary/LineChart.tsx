import React, { useMemo, useState } from 'react';
import {
  ChartSummaryProps,
  getLineOption,
  line,
} from '@modules/analyze/options';
import { useTranslation } from 'next-i18next';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';
import { transDataForOverview } from '@modules/analyze/DataTransform/transDataForOverview';
import { Topic } from '@modules/analyze/components/SideBar/config';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';

const LineChart: React.FC<ChartSummaryProps> = ({
  loading = false,
  xAxis,
  yAxis,
}) => {
  const { t } = useTranslation();
  const [onePointSys, setOnePointSys] = useState(false);
  const echartsOpts = useMemo(() => {
    const series = yAxis.map(({ legendName, data }) => {
      !onePointSys && (data = data.map((i) => transHundredMarkSystem(i)));
      return line({ name: legendName, data });
    });
    return getLineOption({ xAxisData: xAxis, series });
  }, [xAxis, yAxis, onePointSys]);

  return (
    <BaseCard
      title={t('analyze:overview')}
      id={Topic.Overview}
      description=""
      headRight={
        <ScoreConversion
          onePoint={onePointSys}
          onChange={(v) => {
            setOnePointSys(v);
          }}
        />
      }
    >
      {(containerRef) => (
        <EChartX
          option={echartsOpts}
          loading={loading}
          containerRef={containerRef}
        />
      )}
    </BaseCard>
  );
};

const opts = [
  {
    type: 'metricCodequality',
    key: 'codeQualityGuarantee',
    legendName: 'code quality guarantee',
  },
  {
    type: 'metricCommunity',
    key: 'communitySupportScore',
    legendName: 'community support score',
  },
  {
    type: 'metricActivity',
    key: 'activityScore',
    legendName: 'activity score',
  },
];

const dateKey = 'grimoireCreationDate';

const LineChartWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const hasOrganizations =
    !isLoading && data?.some((i) => i.result?.groupMetricActivity.length !== 0);

  const copyOpts = hasOrganizations
    ? [
        ...opts,
        {
          type: 'groupMetricActivity',
          key: 'organizationsActivity',
          legendName: 'organizations activity',
        },
      ]
    : [...opts];
  const { xAxis, yAxisResult } = useMemo(() => {
    const result = data[0].result;
    if (!result) return { xAxis: [], yAxisResult: [] };
    return transDataForOverview(result, copyOpts, dateKey);
  }, [copyOpts, data]);

  return <LineChart loading={isLoading} xAxis={xAxis} yAxis={yAxisResult} />;
};

export default LineChartWithData;
