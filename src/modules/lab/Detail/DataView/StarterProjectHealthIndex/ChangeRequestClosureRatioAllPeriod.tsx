import React, { useState } from 'react';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/lab/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt } from '@modules/analyze/type';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import Tab from '@common/components/Tab';

const ChangeRequestClosureRatioAllPeriod = () => {
  const { t } = useTranslation();
  const tabOptions = [
    { label: t('analyze:ratio'), value: '1' },
    { label: t('analyze:closed'), value: '2' },
    { label: t('analyze:created'), value: '3' },
  ];

  const chartTabs = {
    '1': {
      legendName: t('analyze:ratio'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricStarterProjectHealth.changeRequestClosureRatioAllPeriod',
      summaryKey: '',
    },
    '2': {
      legendName: t('analyze:closed'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricStarterProjectHealth.changeRequestClosedCountAllPeriod',
      summaryKey: '',
    },
    '3': {
      legendName: t('analyze:created'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricStarterProjectHealth.changeRequestCreatedCountAllPeriod',
      summaryKey: '',
    },
  };
  const [tab, setTab] = useState<TabValue>('1');
  type TabValue = keyof typeof chartTabs;
  const tansOpts: TransOpt = chartTabs[tab];
  const { getOptions } = useGetLineOption();

  return (
    <BaseCard
      title={t(
        'metrics_models:starter_project_health.metrics.change_request_closure_ratio_all_period'
      )}
      id={'change_request_closure_ratio_all_period'}
      description={t(
        'metrics_models:starter_project_health.metrics.change_request_closure_ratio_all_period_desc'
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
          <>
            <div className="mb-4">
              <Tab
                options={tabOptions}
                value={tab}
                onChange={(v) => setTab(v as TabValue)}
              />
            </div>
            <ChartWithData tansOpts={tansOpts} getOptions={getOptions}>
              {({ loading, option }) => {
                return (
                  <EChartX
                    containerRef={ref}
                    loading={loading}
                    option={option}
                  />
                );
              }}
            </ChartWithData>
          </>
        );
      }}
    </BaseCard>
  );
};

export default ChangeRequestClosureRatioAllPeriod;
