import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { RangeTag, rangeTags, timeRange } from '../constant';
import { isDateRange } from '@common/utils/dateRange';

const defaultVal = {
  range: '3Y' as RangeTag,
  timeStart: timeRange['3Y'].start,
  timeEnd: timeRange['3Y'].end,
};

export { isDateRange };
const useQueryDateRange = () => {
  const router = useRouter();
  const range = router.query.range as RangeTag;

  return useMemo(() => {
    if (!range) {
      return defaultVal;
    } else if (rangeTags.includes(range)) {
      return {
        range,
        timeStart: timeRange[range].start,
        timeEnd: timeRange[range].end,
      };
    } else if (isDateRange(range)) {
      const { start, end } = isDateRange(range) as { start: Date; end: Date };
      return {
        range,
        timeStart: start,
        timeEnd: end,
      };
    } else {
      return defaultVal;
    }
  }, [range]);
};

export default useQueryDateRange;
