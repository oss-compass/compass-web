import React, { useMemo, useState } from 'react';
import { ChartSummaryProps, getLineOption, line } from '@common/options';
import { useTranslation } from 'next-i18next';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import transHundredMarkSystem from '@common/transform/transHundredMarkSystem';
import { transDataForOverview } from '@common/transform/transDataForOverview';
import { Topic } from '@modules/analyze/components/SideBar/config';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';
import { chartUserSettingState } from '@modules/analyze/store';
import { useSnapshot } from 'valtio';

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
      type: 'metricMilestonePersona',
      key: 'milestonePersonaScore',
      legendName: t('metrics_models:contributor_milestone_persona.title'),
    },
    {
      type: 'metricRolePersona',
      key: 'rolePersonaScore',
      legendName: t('metrics_models:contributor_role_persona.title'),
    },
    {
      type: 'metricDomainPersona',
      key: 'domainPersonaScore',
      legendName: t('metrics_models:contributor_domain_persona.title'),
    },
  ];

  const optsWithOrg = [...opts];

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
