import { useMemo } from 'react';
import { useLabModelVersion } from '../../hooks';
import { isYearCheck } from '@modules/lab/utils';

const useTimeAndChartType = () => {
  const { data } = useLabModelVersion();
  console.log(data);
  const hasYear = useMemo(() => {
    if (data?.labModelVersion) {
      const { metrics } = data?.labModelVersion;
      const hasYear = metrics?.some((i) => isYearCheck(i.ident));
      return hasYear;
    }
  }, [data]);
  return {
    timeFormat: hasYear ? 'yyyy' : null,
    chartType: hasYear ? 'bar' : null,
  };
};

export default useTimeAndChartType;
