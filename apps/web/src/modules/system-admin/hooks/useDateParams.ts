import { useMemo } from 'react';
import { useDateContext } from '../DataView/Dashboard/contexts/DateContext';
import dayjs from 'dayjs';
import { format } from 'date-fns';

const useDateParams = () => {
  const { dateState } = useDateContext();

  const dateParams = useMemo(
    () => ({
      range: dateState.range,
      timeStart: dateState.timeStart,
      timeEnd: dateState.timeEnd,
    }),
    [dateState]
  );

  const dateRange = useMemo(
    () => [dayjs(dateState.timeStart), dayjs(dateState.timeEnd)],
    [dateState.timeStart, dateState.timeEnd]
  );

  const formattedParams = useMemo(() => {
    const startDate = format(dateState.timeStart, 'yyyy-MM-dd');
    const endDate = format(dateState.timeEnd, 'yyyy-MM-dd');
    const hasDateFilter = dateState.range !== '1Y'; // 假设1Y是默认值

    return {
      startDate,
      endDate,
      hasDateFilter,
      range: dateState.range,
    };
  }, [dateState]);

  return {
    // 原始格式，与useQueryDateRange兼容
    range: dateState.range,
    timeStart: dateState.timeStart,
    timeEnd: dateState.timeEnd,
    // 扩展格式，为其他组件提供便利
    dateParams,
    dateRange,
    formattedParams,
  };
};

export default useDateParams;
