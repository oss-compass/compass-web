import { formatDateParam } from './formatDateParam';

const ORIGINAL_TZ = process.env.TZ;

describe('formatDateParam', () => {
  beforeEach(() => {
    // Pin a timezone east of UTC so that a UTC-based formatter shifts the day.
    process.env.TZ = 'Asia/Shanghai';
  });

  afterAll(() => {
    process.env.TZ = ORIGINAL_TZ;
  });

  it('keeps the local calendar date', () => {
    const localEarlyMorning = new Date(2026, 9, 16, 5, 0, 0);

    expect(formatDateParam(localEarlyMorning)).toBe('2026-10-16');
  });

  it('does not shift the day for dates shortly after midnight', () => {
    const justAfterMidnight = new Date(2026, 9, 16, 0, 30, 0);

    expect(formatDateParam(justAfterMidnight)).toBe('2026-10-16');
    // The previous `toISOString().split('T')[0]` implementation returned 2026-10-15 here.
    expect(justAfterMidnight.toISOString().slice(0, 10)).toBe('2026-10-15');
  });

  it('returns an empty string for missing dates', () => {
    expect(formatDateParam(null)).toBe('');
    expect(formatDateParam(undefined)).toBe('');
  });
});
