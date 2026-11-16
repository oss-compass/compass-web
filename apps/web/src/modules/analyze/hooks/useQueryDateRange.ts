import isMatch from 'date-fns/isMatch';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { RangeTag, rangeTags, timeRange } from '../constant';
import useVerifyDetailRangeQuery from '@modules/analyze/hooks/useVerifyDetailRangeQuery';
import useQueryMetricType from '@modules/analyze/hooks/useQueryMetricType';

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
export const isDateRange = (range: string) => {
  if (typeof range !== 'string') return false;
  const parts = range.split(' ~ ');
  if (parts.length !== 2) return false;

  const re = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
  const valid = parts.every(
    (value) =>
      re.test(value) &&
      isMatch(value, value.includes('/') ? 'yyyy/M/d' : 'yyyy-M-d')
  );
  if (!valid) return false;

  const [start, end] = parts.map((value) => new Date(value));
  return start <= end ? { start, end } : false;
};
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
