import React from 'react';
import { useState } from 'react';
import { chartUserSettingState } from '@modules/analyze/store';

type Props = {
  defaultOnePointSystem?: boolean;
  defaultShowAvg?: boolean;
  defaultShowMedian?: boolean;
  defaultYAxisScale?: boolean;
};

export const useCardManual = (props: Props = {}) => {
  const {
    defaultOnePointSystem = chartUserSettingState.onePointSys,
    defaultShowMedian = chartUserSettingState.showMedian,
    defaultShowAvg = chartUserSettingState.showAvg,
    defaultYAxisScale = chartUserSettingState.yAxisScale,
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
