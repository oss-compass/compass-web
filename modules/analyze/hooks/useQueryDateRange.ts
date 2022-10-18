import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { RangeTag, getTimeRangeTags, timeRange } from '../constant';

const defaultVal = {
  range: '3M' as RangeTag,
  timeStart: timeRange['3M'].start,
  timeEnd: timeRange['3M'].end,
};
const rangeTags = getTimeRangeTags();

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
