import React, { useContext } from 'react';
import { ChartsDataContext } from '../context/LabDataProvider';

const useLabDataMainScore = () => {
  const { items, loading } = useContext(ChartsDataContext);
  const mainSoreData = items.map((i) => {
    const detail = i?.result?.labModelVersionReportDetail;
    return {
      label: i.label,
      level: i.level,
      chartType: 'line',
      dates: detail?.mainScore.dates,
      values: detail?.mainScore.values,
    };
  });

  return { data: mainSoreData, loading };
};

export default useLabDataMainScore;
