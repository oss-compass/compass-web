import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { RangeTag, rangeTags, timeRange } from '@modules/analyze/constant';
import useVerifyDetailRangeQuery from '@modules/analyze/hooks/useVerifyDetailRangeQuery';
import { isDateRange } from '@common/utils/dateRange';

const contributorDefaultVal = {
  range: '6M' as RangeTag,
  timeStart: timeRange['6M'].start,
  timeEnd: timeRange['6M'].end,
};
export { isDateRange };
const useVerifyDateRange = () => {
  const router = useRouter();
  const range = router.query.range as RangeTag;
  const { isLoading, data } = useVerifyDetailRangeQuery();

  return useMemo(() => {
    if (!range || !data) {
      return contributorDefaultVal;
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
      return contributorDefaultVal;
    }
  }, [range, isLoading, data]);
};

export default useVerifyDateRange;
