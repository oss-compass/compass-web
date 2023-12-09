import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { RangeTag, rangeTags, timeRange } from '@modules/analyze/constant';
import useVerifyDetailRange from '@modules/analyze/hooks/useVerifyDetailRange';

const contributorDefaultVal = {
  range: '1M' as RangeTag,
  timeStart: timeRange['1M'].start,
  timeEnd: timeRange['1M'].end,
};
export const isDateRange = (range: string) => {
  if (range.includes(' ~ ')) {
    const start = range.split(' ~ ')[0];
    const end = range.split(' ~ ')[1];
    const re = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    const r = start.match(re) && end.match(re);
    if (r) {
      return { start: new Date(start), end: new Date(end) };
    }
    return false;
  }
  return false;
};
const useVerifyDateRange = () => {
  const router = useRouter();
  const range = router.query.range as RangeTag;
  const { isLoading, data } = useVerifyDetailRange();

  return useMemo(() => {
    if (!range || !data?.verifyDetailDataRange?.status) {
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
