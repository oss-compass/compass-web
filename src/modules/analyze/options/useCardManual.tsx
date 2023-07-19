import React from 'react';
import { useState } from 'react';

type Props = {
  defaultShowAvg?: boolean;
  defaultShowMedian?: boolean;
  defaultYAxisScale?: boolean;
};

export const useCardManual = (props: Props = {}) => {
  const {
    defaultShowMedian = false,
    defaultShowAvg = false,
    defaultYAxisScale = true,
  } = props;

  const [showAvg, setShowAvg] = useState(defaultShowAvg);
  const [showMedian, setShowMedian] = useState(defaultShowMedian);
  const [yAxisScale, setYAxisScale] = useState(defaultYAxisScale);
  return {
    showAvg,
    setShowAvg,
    showMedian,
    setShowMedian,
    yAxisScale,
    setYAxisScale,
  };
};
