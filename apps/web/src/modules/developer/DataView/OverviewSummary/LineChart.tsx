import React, { useMemo, useState } from 'react';
import { ChartSummaryProps, getLineOption, line } from '@common/options';
import { useTranslation } from 'next-i18next';
import BaseCard from '@modules/developer/components/DeveloperCard';
import EChartX from '@common/components/EChartX';
import useMetricQueryData from '@modules/developer/hooks/useMetricQueryData';
import transHundredMarkSystem from '@common/transform/transHundredMarkSystem';
import { transDataForOverview } from '@common/transform/transDataForOverview';
import { Topic } from '@modules/developer/components/SideBar/config';
import ScoreConversion from '@modules/developer/components/ScoreConversion';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import { chartUserSettingState } from '@modules/developer/store';
import { useSnapshot } from 'valtio';
import ImageFallback from '@common/components/ImageFallback';

const LineChart: React.FC<ChartSummaryProps> = ({
  loading = false,
  xAxis,
  yAxis,
}) => {
  const { t } = useTranslation();
  const [onePointSys, setOnePointSys] = useState(
    chartUserSettingState.onePointSys
  );
  const [yAxisScale, setYAxisScale] = useState(
    chartUserSettingState.yAxisScale
  );

  const echartsOpts = useMemo(() => {
    const series = yAxis.map(({ legendName, data }) => {
      !onePointSys && (data = data.map((i) => transHundredMarkSystem(i)));
      return line({ name: legendName, data });
    });
    return getLineOption({
      xAxisData: xAxis,
      series,
      yAxis: {
        type: 'value',
        scale: yAxisScale,
      },
    });
  }, [xAxis, yAxis, yAxisScale, onePointSys]);

  return (
    <BaseCard
      title={'贡献分布'}
      id={Topic.Overview}
      description=""
      headRight={(ref, fullScreen, setFullScreen) => (
        <>
          <CardDropDownMenu
            cardRef={ref}
            fullScreen={fullScreen}
            onFullScreen={(b) => {
              setFullScreen(b);
            }}
            enableReferenceLineSwitch={false}
            yAxisScale={yAxisScale}
            onYAxisScaleChange={(v) => {
              setYAxisScale(v);
            }}
            onePointSys={onePointSys}
          />
        </>
      )}
    >
      {(containerRef) => (
        <ImageFallback
          src={'/images/test/area-stack (2).png'}
          width={1530}
          height={350}
          fallbackSrc={'/images/default.png'}
          alt="logo"
        />
        // <EChartX
        //   option={echartsOpts}
        //   loading={loading}
        //   containerRef={containerRef}
        // />
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
  const snap = useSnapshot(chartUserSettingState);
  const repoType = snap.repoType;
  const { xAxis, yAxisResult } = useMemo(() => {
    const result = data.items[0].result;
    if (!result) return { xAxis: [], yAxisResult: [] };

    return transDataForOverview(result, copyOpts, dateKey, repoType);
  }, [copyOpts, data, repoType]);

  return <LineChart loading={isLoading} xAxis={xAxis} yAxis={yAxisResult} />;
};

export default LineChartWithData;
