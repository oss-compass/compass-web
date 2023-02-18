import { GenChartOptions } from '@modules/analyze/type';
import {
  formatToHundredMark,
  getColorWithLabel,
  getLineOption,
  getTooltipsFormatter,
  legendFormat,
  line,
  summaryLine,
} from '@modules/analyze/options';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const useGetLineOption = (opt?: {
  enableDataFormat?: boolean;
  defaultOnePointSystem?: boolean;
  defaultShowAvg?: boolean;
  defaultShowMedian?: boolean;
}) => {
  const {
    enableDataFormat = false,
    defaultOnePointSystem = false,
    defaultShowAvg = false,
    defaultShowMedian = false,
  } = opt || {};

  const { t } = useTranslation();
  const [onePointSys, setOnePointSys] = useState(defaultOnePointSystem);
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
        data: enableDataFormat ? formatToHundredMark(!onePointSys, data) : data,
        color,
      });
    });

    if (showMedian) {
      series.push(
        summaryLine({
          id: 'median',
          name: t('analyze:median'),
          data: enableDataFormat
            ? formatToHundredMark(!onePointSys, summaryMedian)
            : summaryMedian,
          color: '#5B8FF9',
        })
      );
    }

    if (showAvg) {
      series.push(
        summaryLine({
          id: 'average',
          name: t('analyze:average'),
          data: enableDataFormat
            ? formatToHundredMark(!onePointSys, summaryMean)
            : summaryMean,
          color: '#F95B5B',
        })
      );
    }

    return getLineOption({
      xAxisData: xAxis,
      series,
      legend: legendFormat(compareLabels),
      tooltip: {
        formatter: getTooltipsFormatter({ compareLabels }),
      },
    });
  };

  return {
    getOptions,
    showAvg,
    setShowAvg,
    showMedian,
    setShowMedian,
    onePointSys,
    setOnePointSys,
  };
};

export default useGetLineOption;
