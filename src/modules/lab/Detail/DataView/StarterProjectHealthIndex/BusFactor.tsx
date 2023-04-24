import React from 'react';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/lab/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';

const BusFactor = () => {
  const { t } = useTranslation();

  const tansOpt = {
    xKey: 'grimoireCreationDate',
    yKey: 'metricStarterProjectHealth.busFactor',
    legendName: t('metrics_models:starter_project_health.metrics.bus_factor'),
    summaryKey: 'summaryCodequality.codeQualityGuarantee',
  };
  const { getOptions } = useGetLineOption();

  return (
    <BaseCard
      title={t('metrics_models:starter_project_health.metrics.bus_factor')}
      id={CollaborationDevelopment.IsMaintained}
      description={t(
        'metrics_models:starter_project_health.metrics.bus_factor_desc'
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

export default BusFactor;
