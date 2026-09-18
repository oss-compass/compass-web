import dayjs, { Dayjs } from 'dayjs';

export const MIN_SELECTABLE_DATE = '2000-01-01';
export const MIN_RANGE_DAYS = 7;

export const getMaxSelectableDate = () => dayjs().subtract(1, 'day');

export const normalizeDateRange = (
  dates: [Dayjs | null, Dayjs | null],
  maxDate = getMaxSelectableDate()
): [Dayjs | null, Dayjs | null] => {
  const [start, end] = dates;

  if (!start || !end || end.diff(start, 'day') >= MIN_RANGE_DAYS) {
    return dates;
  }

  const minDate = dayjs(MIN_SELECTABLE_DATE);
  const boundedEnd = end.isAfter(maxDate, 'day') ? maxDate : end;
  const adjustedStart = boundedEnd.subtract(MIN_RANGE_DAYS, 'day');

  if (adjustedStart.isBefore(minDate, 'day')) {
    return [minDate, minDate.add(MIN_RANGE_DAYS, 'day')];
  }

  return [adjustedStart, boundedEnd];
};
