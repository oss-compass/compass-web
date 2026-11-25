import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { RangeTag, rangeTags, timeRange } from '../constant';
import useVerifyDetailRangeQuery from '@modules/analyze/hooks/useVerifyDetailRangeQuery';
import useQueryMetricType from '@modules/analyze/hooks/useQueryMetricType';
import { isDateRange } from '@common/utils/dateRange';

const defaultVal = {
  range: '6M' as RangeTag,
  timeStart: timeRange['6M'].start,
  timeEnd: timeRange['6M'].end,
};
const contributorDefaultVal = {
  range: '6M' as RangeTag,
  timeStart: timeRange['6M'].start,
  timeEnd: timeRange['6M'].end,
};
export { isDateRange };
const useQueryDateRange = () => {
  const router = useRouter();
  const range = router.query.range as RangeTag;
  const { isLoading, data } = useVerifyDetailRangeQuery();
  const topicType = useQueryMetricType();

  return useMemo(() => {
    if (
      topicType === 'contributor' &&
      (!range || !data?.verifyDetailDataRange?.status)
    ) {
      return contributorDefaultVal;
    } else {
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
    }
  }, [range, topicType, isLoading, data]);
};

export default useQueryDateRange;
