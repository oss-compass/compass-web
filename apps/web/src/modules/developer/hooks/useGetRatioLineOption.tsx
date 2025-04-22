import { GenChartOptions } from '@modules/developer/type';
import { EChartsOption } from 'echarts';
import {
  getColorWithLabel,
  getLineOption,
  getTooltipsFormatter,
  legendFormat,
  line,
  summaryLine,
} from '@common/options';
import {
  percentageUnitFormat,
  percentageValueFormat,
  checkFormatPercentageValue,
} from '@common/utils/format';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { chartUserSettingState } from '@modules/developer/store';

/**
 * @deprecated use useOptionBuilderFns instead
 */
const useGetRatioLineOption = (opt: {
  tab: string;
  defaultShowAvg?: boolean;
  defaultShowMedian?: boolean;
  defaultYAxisScale?: boolean;
}) => {
  const { t } = useTranslation();
  const {
    tab = '1',
    defaultShowAvg = chartUserSettingState.showAvg,
    defaultShowMedian = chartUserSettingState.showMedian,
    defaultYAxisScale = chartUserSettingState.yAxisScale,
  } = opt;

  const [showAvg, setShowAvg] = useState(defaultShowAvg);
  const [showMedian, setShowMedian] = useState(defaultShowMedian);
  const [yAxisScale, setYAxisScale] = useState(defaultYAxisScale);

  const getOptions: GenChartOptions = (
    { xAxis, compareLabels, yResults, summaryMedian, summaryMean },
    theme
  ) => {
    const series = yResults.map(({ label, level, data }) => {
      const color = getColorWithLabel(theme, label);
      return line({
        name: label,
        data: tab === '1' ? data.map((v) => percentageValueFormat(v)) : data,
        color,
      });
    });

    if (showMedian) {
      series.push(
        summaryLine({
          id: 'median',
          name: t('analyze:median'),
          data: checkFormatPercentageValue(tab === '1', summaryMedian),
          color: '#5B8FF9',
        })
      );
    }
    if (showAvg) {
      series.push(
        summaryLine({
          id: 'average',
          name: t('analyze:average'),
          data: checkFormatPercentageValue(tab === '1', summaryMean),
          color: '#F95B5B',
        })
      );
    }

    const ratioYAxis: EChartsOption['yAxis'] = {
      type: 'value',
      axisLabel: { formatter: '{value}%' },
      scale: yAxisScale,
    };

    return getLineOption({
      xAxisData: xAxis,
      series,
      yAxis: tab === '1' ? ratioYAxis : { type: 'value', scale: yAxisScale },
      legend: legendFormat(compareLabels),
      tooltip: {
        formatter: getTooltipsFormatter({
          compareLabels,
          valueFormat: tab === '1' ? percentageUnitFormat : undefined,
        }),
      },
    });
  };

  return {
    getOptions,
    showAvg,
    setShowAvg,
    showMedian,
    setShowMedian,
    yAxisScale,
    setYAxisScale,
  };
};

export default useGetRatioLineOption;
