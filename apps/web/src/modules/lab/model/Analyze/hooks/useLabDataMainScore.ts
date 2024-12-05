import React, { useContext, useMemo } from 'react';
import { ChartsDataContext } from '../context/LabDataProvider';
import useTimeAndChartType from '../hooks/useTimeAndChartType';

const useLabDataMainScore = () => {
  const { items, loading } = useContext(ChartsDataContext);
  const { chartType } = useTimeAndChartType();
  const mainSoreData = items.map((i) => {
    const detail = i?.result?.labModelVersionReportDetail;
    return {
      label: i.label,
      level: i.level,
      chartType: chartType || 'line',
      dates: detail?.mainScore.dates,
      values: detail?.mainScore.values,
    };
  });

  return { data: mainSoreData, loading };
};

export default useLabDataMainScore;
