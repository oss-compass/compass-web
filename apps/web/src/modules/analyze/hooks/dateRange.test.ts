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
