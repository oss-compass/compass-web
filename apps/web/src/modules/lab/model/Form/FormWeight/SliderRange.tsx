import React from 'react';
import Slider from '@common/components/Slider';
import { actions } from '../state';
import { sumPre, minus } from '../utils';

const SliderRange = ({
  index,
  value,
  values,
}: {
  index: number;
  value: number;
  values: number[];
}) => {
  const isFirst = index === 0;
  const isLast = index === values.length - 1;

  let range: number | number[] = [0, value];

  if (index > 0) {
    const preSum = sumPre(index, values);
    range = [preSum, preSum + value];

    // last item
    if (isLast) {
      range = preSum;
    }
  }

  if (isFirst) {
    range = value;
  }

  return (
    <Slider
      value={range}
      className={isLast ? 'inverted-slider' : ''}
      track={isLast ? 'inverted' : 'normal'}
      onChange={(e, value) => {
        if (Array.isArray(value)) {
          const [startPre, endPre] = range as number[];
          const [start, end] = value;
          // only allow move left
          if (start < startPre) return;
          const result = minus(end, start);
          actions.adjustMetricWeightHandle(result, index);
        } else {
          const result = isLast ? minus(100, value) : value;
          actions.adjustMetricWeightHandle(result, index);
        }
      }}
    />
  );
};

export default SliderRange;
