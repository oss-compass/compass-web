import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { RangeTag, rangeTags, timeRange } from '../constant';

const defaultVal = {
  range: '6M' as RangeTag,
  timeStart: timeRange['6M'].start,
  timeEnd: timeRange['6M'].end,
};

const useQueryDateRange = () => {
  const router = useRouter();
  const range = router.query.range as RangeTag;

  return useMemo(() => {
    if (!range || !rangeTags.includes(range)) {
      return defaultVal;
    }

    return {
      range,
      timeStart: timeRange[range].start,
      timeEnd: timeRange[range].end,
    };
  }, [range]);
};

export default useQueryDateRange;
