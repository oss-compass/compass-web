import React, { useMemo, useState } from 'react';
import {
  bar,
  getBarOption,
  getColorWithLabel,
  getTooltipsFormatter,
  legendFormat,
} from '@common/options';
import { formatNegativeNumber, shortenAxisLabel } from '@common/utils/format';
import { CollaborationDevelopment } from '@modules/developer/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/developer/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import { GenChartOptions } from '@modules/developer/type';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';

const LocFrequency = () => {
  const { t } = useTranslation();
  const chartTabs = {
    '1': {
      legendName: t('analyze:lines_add'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.linesAddedFrequency',
      summaryKey: 'summaryCodequality.linesAddedFrequency',
    },
    '2': {
      legendName: t('analyze:lines_remove'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.linesRemovedFrequency',
      summaryKey: 'summaryCodequality.linesRemovedFrequency',
    },
  };

  type TabValue = keyof typeof chartTabs;

  const tabOptions = [
    { label: t('analyze:lines_add'), value: '1' },
    { label: t('analyze:lines_remove'), value: '2' },
  ];

  const [tab, setTab] = useState<TabValue>('1');
  const tansOpts = chartTabs[tab];

  const getOptions: GenChartOptions = (
    { xAxis, compareLabels, yResults },
    theme
  ) => {
    const series = yResults.map(({ label, level, data }) => {
      const color = getColorWithLabel(theme, label);
      return bar({
        name: label,
        stack: label,
        data: formatNegativeNumber(tab === '2', data),
        color,
      });
    });

    return getBarOption({
      xAxisData: xAxis,
      series,
      legend: legendFormat(compareLabels),
      tooltip: {
        formatter: getTooltipsFormatter({ compareLabels }),
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: any) => {
            return shortenAxisLabel(value) as string;
          },
        },
      },
    });
  };

  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency'
      )}
      id={CollaborationDevelopment.LocFrequency}
      description={t(
        'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency_desc'
      )}
      weight={t(
        'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency_more.weight'
      )}
      threshold={t(
        'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency_more.threshold'
      )}
      detail={t(
        'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency_more.detail'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#lines-of-code-frequency'
      }
      headRight={(ref, fullScreen, setFullScreen) => (
        <CardDropDownMenu
          enableLineSettingSwitch={false}
          enableReferenceLineSwitch={false}
          fullScreen={fullScreen}
          onFullScreen={(b) => {
            setFullScreen(b);
          }}
          cardRef={ref}
          yKey={tansOpts['yKey']}
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

export default LocFrequency;
