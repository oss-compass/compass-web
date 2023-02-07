import { GenChartOptions } from '@modules/analyze/type';
import {
  checkFormatPercentageValue,
  getColorWithLabel,
  getLineOption,
  getTooltipsFormatter,
  legendFormat,
  line,
  percentageUnitFormat,
  percentageValueFormat,
  summaryLine,
} from '@modules/analyze/options';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const useGetRatioLineOption = (opt: {
  tab: string;
  defaultShowAvg?: boolean;
  defaultShowMedian?: boolean;
}) => {
  const { t } = useTranslation();
  const { tab = '1', defaultShowAvg = true, defaultShowMedian = true } = opt;
  const [showAvg, setShowAvg] = useState(defaultShowAvg);
  const [showMedian, setShowMedian] = useState(defaultShowMedian);

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

    return getLineOption({
      xAxisData: xAxis,
      series,
      yAxis:
        tab === '1'
          ? { type: 'value', axisLabel: { formatter: '{value}%' } }
          : { type: 'value' },
      legend: legendFormat(compareLabels),
      tooltip: {
        formatter: getTooltipsFormatter({
          compareLabels,
          valueFormat: tab === '1' ? percentageUnitFormat : undefined,
        }),
      },
    });
  };
  return { getOptions, showAvg, setShowAvg, showMedian, setShowMedian };
};

export default useGetRatioLineOption;
