import dayjs from 'dayjs';
import { normalizeDateRange } from './dateRange';

describe('normalizeDateRange', () => {
  const maxDate = dayjs('2026-09-17');

  it('keeps a short range inside the selectable upper bound', () => {
    const [start, end] = normalizeDateRange(
      [dayjs('2026-09-17'), dayjs('2026-09-17')],
      maxDate
    );

    expect(start?.format('YYYY-MM-DD')).toBe('2026-09-10');
    expect(end?.format('YYYY-MM-DD')).toBe('2026-09-17');
    expect(end?.diff(start, 'day')).toBe(7);
  });

  it('clamps an unexpected future end before normalizing the range', () => {
    const [start, end] = normalizeDateRange(
      [dayjs('2026-09-17'), dayjs('2026-09-20')],
      maxDate
    );

    expect(start?.format('YYYY-MM-DD')).toBe('2026-09-10');
    expect(end?.format('YYYY-MM-DD')).toBe('2026-09-17');
  });

  it('keeps a valid range unchanged', () => {
    const dates = [dayjs('2026-09-01'), dayjs('2026-09-10')] as const;
    const result = normalizeDateRange([...dates], maxDate);

    expect(result[0]).toBe(dates[0]);
    expect(result[1]).toBe(dates[1]);
  });

  it('keeps the adjusted range inside the minimum selectable date', () => {
    const [start, end] = normalizeDateRange(
      [dayjs('2000-01-01'), dayjs('2000-01-03')],
      maxDate
    );

    expect(start?.format('YYYY-MM-DD')).toBe('2000-01-01');
    expect(end?.format('YYYY-MM-DD')).toBe('2000-01-08');
  });
});
