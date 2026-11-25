import { isDateRange } from './dateRange';

describe('isDateRange', () => {
  it('keeps the shape checks', () => {
    expect(isDateRange('2000-01-01~2023-05-06')).toBe(false);
    expect(isDateRange('2000-01-01 2023-05-06')).toBe(false);
    expect(isDateRange('2000-01-01')).toBe(false);
    expect(isDateRange('')).toBe(false);
    expect(isDateRange(undefined as unknown as string)).toBe(false);
  });

  it('parses a valid range as UTC dates', () => {
    expect(isDateRange('2000-01-01 ~ 2023-05-06')).toEqual({
      start: new Date('2000-01-01'),
      end: new Date('2023-05-06'),
    });
    expect(isDateRange('2026/10/01 ~ 2026/10/08')).toEqual({
      start: new Date('2026-10-01'),
      end: new Date('2026-10-08'),
    });
  });

  it('rejects calendar-invalid dates instead of returning Invalid Date', () => {
    // `new Date('2026-13-45')` is Invalid Date, and `.toISOString()` on it throws
    // RangeError: Invalid time value.
    expect(isDateRange('2026-13-45 ~ 2026-13-46')).toBe(false);
    expect(isDateRange('2026-01-01 ~ 2026-13-01')).toBe(false);
    expect(isDateRange('2026-00-10 ~ 2026-01-10')).toBe(false);
    expect(isDateRange('2026-01-00 ~ 2026-01-10')).toBe(false);
  });

  it('rejects dates that JavaScript would silently roll over', () => {
    // `new Date('2026-02-30')` becomes 2026-03-02, i.e. the page would query a different
    // day than the one in the url.
    expect(isDateRange('2026-02-30 ~ 2026-03-10')).toBe(false);
    expect(isDateRange('2026-04-31 ~ 2026-05-10')).toBe(false);
  });
});
