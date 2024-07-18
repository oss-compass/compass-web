import React, { useEffect } from 'react';
import { useUnmount } from 'ahooks';
import {
  setTargetSoftwareData,
  resetTargetSoftwareData,
} from './useTargetSoftwareStore';

const TargetSoftwareFetcher = ({ data, metricItemScoreList }) => {
  useEffect(() => {
    setTargetSoftwareData(data, metricItemScoreList);
  }, [data, metricItemScoreList]);

  useUnmount(() => {
    resetTargetSoftwareData();
  });
  return null;
};

export default TargetSoftwareFetcher;
