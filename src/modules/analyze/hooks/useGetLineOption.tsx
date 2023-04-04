import { EChartsOption } from 'echarts';
import { GenChartOptions } from '@modules/analyze/type';
import {
  getColorWithLabel,
  getLineOption,
  getTooltipsFormatter,
  legendFormat,
  line,
  summaryLine,
} from '@common/options';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { toHundredMark } from '@common/transform/transHundredMarkSystem';

const useGetLineOption = (opt?: {
  enableDataFormat?: boolean;
  defaultOnePointSystem?: boolean;
  defaultShowAvg?: boolean;
  defaultShowMedian?: boolean;
  indicators?: string;
  mergeEchartsOpt?: EChartsOption;
}) => {
  const {
    enableDataFormat = false,
    defaultOnePointSystem = false,
    defaultShowAvg = false,
    defaultShowMedian = false,
    indicators,
    mergeEchartsOpt = {},
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
        data: enableDataFormat ? toHundredMark(!onePointSys, data) : data,
        color,
      });
    });

    if (showMedian) {
      series.push(
        summaryLine({
          id: 'median',
          name: t('analyze:median'),
          data: enableDataFormat
            ? toHundredMark(!onePointSys, summaryMedian)
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
            ? toHundredMark(!onePointSys, summaryMean)
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
        formatter: getTooltipsFormatter({ compareLabels, indicators }),
      },
      ...mergeEchartsOpt,
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
