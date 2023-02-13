import React from 'react';
import {
  getBarOption,
  bar,
  getTooltipsFormatter,
  legendFormat,
  getColorWithLabel,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { GenChartOptions } from '@modules/analyze/type';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const IsMaintained = () => {
  const { t } = useTranslation();

  const tansOpt = {
    legendName: 'is maintained',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.isMaintained',
    summaryKey: 'summaryCodequality.isMaintained',
  };
  const getOptions: GenChartOptions = (
    { xAxis, compareLabels, yResults },
    theme
  ) => {
    const series = yResults.map(({ label, level, data }) => {
      const color = getColorWithLabel(theme, label);
      return bar({
        name: label,
        data: data,
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
    });
  };

  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.is_maintained'
      )}
      id={CollaborationDevelopment.IsMaintained}
      description={t(
        'metrics_models:collaboration_development_index.metrics.is_maintained_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#is-maintained'
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

export default IsMaintained;
