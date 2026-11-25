import { isDateRange } from './useQueryDateRange';

describe('dateRange', () => {
  it('isDateRange', function () {
    expect(isDateRange('2000-01-01~2023-05-06')).toBe(false);
    expect(isDateRange('2000-01-01 2023-05-06')).toBe(false);
    expect(isDateRange('2000-01-01')).toBe(false);
    expect(isDateRange('')).toBe(false);
    expect(isDateRange('2000-01-01 ~ 2023-05-06')).toEqual({
      start: new Date('2000-01-01'),
      end: new Date('2023-05-06'),
    });
  });
});

it.each([
  '2023-02-29 ~ 2023-03-10',
  '2024-13-01 ~ 2025-01-01',
  '2024-04-31 ~ 2024-05-10',
  '2024-03-10 ~ 2024-03-01',
  '2024-01-01 ~ 2024-02-01 ~ 2024-03-01',
])('rejects invalid custom range %s', (range) => {
  expect(isDateRange(range)).toBe(false);
});

it('accepts leap days, slash-separated dates and a single-day range', () => {
  for (const value of ['2024-02-29', '2024/2/29']) {
    expect(isDateRange(`${value} ~ ${value}`)).toEqual({
      start: new Date(value),
      end: new Date(value),
    });
  }
});

it('ignores repeated query parameters instead of treating an array as a range', () => {
  expect(isDateRange(['6M', '1Y'] as unknown as string)).toBe(false);
});
