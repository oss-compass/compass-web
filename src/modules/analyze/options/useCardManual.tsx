import React from 'react';
import { useState } from 'react';

type Props = {
  defaultOnePointSystem?: boolean;
  defaultShowAvg?: boolean;
  defaultShowMedian?: boolean;
  defaultYAxisScale?: boolean;
};

export const useCardManual = (props: Props = {}) => {
  const {
    defaultOnePointSystem = false,
    defaultShowMedian = false,
    defaultShowAvg = false,
    defaultYAxisScale = true,
  } = props;

  const [onePointSys, setOnePointSys] = useState(defaultOnePointSystem);
  const [showAvg, setShowAvg] = useState(defaultShowAvg);
  const [showMedian, setShowMedian] = useState(defaultShowMedian);
  const [yAxisScale, setYAxisScale] = useState(defaultYAxisScale);

  return {
    onePointSys,
    setOnePointSys,
    showAvg,
    setShowAvg,
    showMedian,
    setShowMedian,
    yAxisScale,
    setYAxisScale,
  };
};
