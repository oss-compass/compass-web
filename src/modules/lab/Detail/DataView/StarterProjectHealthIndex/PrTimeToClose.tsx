import React, { useMemo, useState } from 'react';
import { Support } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/lab/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import { getYAxisWithUnit } from '@common/options';

import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const PrTimeToClose = () => {
  const { t, i18n } = useTranslation();

  const tabOptions = [
    { label: t('analyze:average'), value: '1' },
    { label: t('analyze:median'), value: '2' },
  ];

  const chartTabs = {
    '1': {
      legendName: t('analyze:average'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricStarterProjectHealth.prTimeToCloseAvg',
      summaryKey: '',
    },
    '2': {
      legendName: t('analyze:median'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricStarterProjectHealth.prTimeToCloseMid',
      summaryKey: '',
    },
  };

  const [tab, setTab] = useState<TabValue>('1');
  type TabValue = keyof typeof chartTabs;
  const tansOpts: TransOpt = chartTabs[tab];

  const indicators = t('analyze:negative_indicators');
  const unit = t('analyze:unit_label', {
    unit: t('analyze:unit_day'),
  });

  const { getOptions, showAvg, showMedian, setShowMedian, setShowAvg } =
    useGetLineOption({
      indicators,
      mergeEchartsOpt: getYAxisWithUnit({
        indicators,
        unit,
        namePaddingLeft: i18n.language === 'zh' ? 0 : 35,
      }),
    });

  return (
    <BaseCard
      title={t(
        'metrics_models:starter_project_health.metrics.pr_time_to_close'
      )}
      id={Support.BugIssueOpenTime}
      description={t(
        'metrics_models:starter_project_health.metrics.pr_time_to_close_desc'
      )}
      docLink={
        'https://chaoss.community/kb/metrics-model-starter-project-health/'
      }
      headRight={(ref, fullScreen, setFullScreen) => (
        <CardDropDownMenu
          cardRef={ref}
          fullScreen={fullScreen}
          onFullScreen={(b) => {
            setFullScreen(b);
          }}
          enableReference={false}
        />
      )}
      bodyClass={'h-[400px]'}
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
            <ChartWithData
              tansOpts={tansOpts}
              indicators={indicators}
              getOptions={getOptions}
            >
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

export default PrTimeToClose;
