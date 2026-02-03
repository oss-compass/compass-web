import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { rangeTags, timeRange, RangeTag } from '@modules/analyze/constant';

const defaultVal = {
  range: '6M' as RangeTag,
  timeStart: timeRange['6M'].start,
  timeEnd: timeRange['6M'].end,
};

/**
 * 判断是否为自定义日期范围格式 (YYYY-MM-DD ~ YYYY-MM-DD)
 */
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

/**
 * os-board 模块的日期范围 hook
 * 从 URL query 中读取 range 参数
 */
const useOsBoardDateRange = () => {
  const router = useRouter();
  const range = router.query.range as RangeTag | undefined;

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

export default useOsBoardDateRange;
