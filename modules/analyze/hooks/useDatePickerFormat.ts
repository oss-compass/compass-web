import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import { useDatePickerContext } from '../context';

const useDatePickerFormat = () => {
  const { value } = useDatePickerContext();
  return formatDistanceStrict(value.startTime, value.endTime);
};

export default useDatePickerFormat;
