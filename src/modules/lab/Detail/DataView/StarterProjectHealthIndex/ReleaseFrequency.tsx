import React from 'react';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/lab/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';

const ReleaseFrequency = () => {
  const { t } = useTranslation();

  const tansOpt = {
    xKey: 'grimoireCreationDate',
    yKey: 'metricStarterProjectHealth.releaseFrequency',
    legendName: t(
      'metrics_models:starter_project_health.metrics.release_frequency'
    ),
    summaryKey: 'summaryCodequality.codeQualityGuarantee',
  };
  const { getOptions } = useGetLineOption();

  return (
    <BaseCard
      title={t(
        'metrics_models:starter_project_health.metrics.release_frequency'
      )}
      id={'release_frequency'}
      description={t(
        'metrics_models:starter_project_health.metrics.release_frequency_desc'
      )}
      docLink={
        'https://chaoss.community/kb/metrics-model-starter-project-health/'
      }
      headRight={(ref, fullScreen, setFullScreen) => (
        <CardDropDownMenu
          fullScreen={fullScreen}
          enableReference={false}
          onFullScreen={(b) => {
            setFullScreen(b);
          }}
          cardRef={ref}
        />
      )}
    >
      {(ref) => {
        return (
          <ChartWithData tansOpts={tansOpt} getOptions={getOptions}>
            {({ loading, option }) => {
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

export default ReleaseFrequency;
