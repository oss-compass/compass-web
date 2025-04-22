import { useMemo } from 'react';
import { useRouter } from 'next/router';

const defaultVal = 'collaboration';

export type MetricType = 'collaboration' | 'contributor' | null;

const typeList = ['collaboration', 'contributor'];

const useQueryMetricType = () => {
  const router = useRouter();
  const metricType = router.query.metricType as MetricType;
  return useMemo(() => {
    if (!metricType) {
      return defaultVal;
    } else if (typeList.includes(metricType)) {
      return metricType;
    } else {
      return defaultVal;
    }
  }, [metricType]);
};

export default useQueryMetricType;
