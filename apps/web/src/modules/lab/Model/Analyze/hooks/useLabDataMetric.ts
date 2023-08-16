import React, { useContext, useCallback } from 'react';
import { ChartsDataContext } from '../context/LabDataProvider';

const useLabDataMetric = () => {
  const { items, loading } = useContext(ChartsDataContext);
  const panelsResults = items.map((i) => {
    const detail = i?.result?.labModelVersionReportDetail;
    return {
      label: i.label,
      level: i.level,
      panels: detail.panels,
    };
  });

  const pickDataByMetric = (ident: string) => {
    return panelsResults.map(({ label, level, panels }) => {
      const item = panels.find((i) => i.metric.ident === ident);
      return {
        label,
        level,
        ...item,
      };
    });
  };

  const pickTabsByMetric = (ident: string) => {
    return panelsResults.map(({ label, level, panels }) => {
      const item = panels.find((i) => i.metric.ident === ident);
      return {
        label,
        level,
        ...item,
      };
    });
  };

  return { data: panelsResults, loading, pickDataByMetric };
};

export default useLabDataMetric;
