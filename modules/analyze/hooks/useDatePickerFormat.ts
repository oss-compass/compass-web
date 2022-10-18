import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import useQueryDateRange from './useQueryDateRange';

const useDatePickerFormat = () => {
  const { timeStart, timeEnd } = useQueryDateRange();
  return formatDistanceStrict(timeStart, timeEnd);
};

export default useDatePickerFormat;
