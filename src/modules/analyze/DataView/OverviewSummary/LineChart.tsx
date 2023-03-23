import React, { useMemo, useState } from 'react';
import { ChartSummaryProps, getLineOption, line } from '@common/options';
import { useTranslation } from 'next-i18next';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';
import { transDataForOverview } from '@modules/analyze/DataTransform/transDataForOverview';
import { Topic } from '@modules/analyze/components/SideBar/config';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

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
      headRight={(ref, fullScreen, setFullScreen) => (
        <>
          <ScoreConversion
            onePoint={onePointSys}
            onChange={(v) => {
              setOnePointSys(v);
            }}
          />
          <CardDropDownMenu
            cardRef={ref}
            fullScreen={fullScreen}
            onFullScreen={(b) => {
              setFullScreen(b);
            }}
            enableReference={false}
          />
        </>
      )}
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

const dateKey = 'grimoireCreationDate';

const LineChartWithData = () => {
  const { t } = useTranslation();
  const opts = [
    {
      type: 'metricCodequality',
      key: 'codeQualityGuarantee',
      legendName: t('metrics_models:collaboration_development_index.title'),
    },
    {
      type: 'metricCommunity',
      key: 'communitySupportScore',
      legendName: t('metrics_models:community_service_and_support.title'),
    },
    {
      type: 'metricActivity',
      key: 'activityScore',
      legendName: t('metrics_models:activity.title'),
    },
  ];

  const optsWithOrg = [
    ...opts,
    {
      type: 'metricGroupActivity',
      key: 'organizationsActivity',
      legendName: t('metrics_models:organization_activity.title'),
    },
  ];

  const data = useMetricQueryData();
  const isLoading = data.loading;
  const copyOpts = optsWithOrg;

  const { xAxis, yAxisResult } = useMemo(() => {
    const result = data.items[0].result;
    if (!result) return { xAxis: [], yAxisResult: [] };
    return transDataForOverview(result, copyOpts, dateKey);
  }, [copyOpts, data]);

  return <LineChart loading={isLoading} xAxis={xAxis} yAxis={yAxisResult} />;
};

export default LineChartWithData;
