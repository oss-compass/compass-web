import type { getBuilderOptionFn } from '@modules/analyze/options/useOptionBuilderFns';
import { getYAxisWithUnit } from '@common/options';

export const getIndicatorsBuilder: getBuilderOptionFn<{
  yAxisScale: boolean;
  language: string;
  indicatorsText: string;
  unitText: string;
}> =
  ({ language, yAxisScale, indicatorsText, unitText }) =>
  (pre, data) => {
    return {
      ...pre,
      ...getYAxisWithUnit({
        result: data,
        indicators: indicatorsText,
        unit: unitText,
        namePaddingLeft: language === 'zh' ? 0 : 35,
        shortenYaxisNumberLabel: true,
        scale: yAxisScale,
      }),
    };
  };
