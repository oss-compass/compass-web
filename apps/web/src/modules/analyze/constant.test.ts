import { checkIsPending } from './constant';

describe('analyze status check', () => {
  it('treats only a completed analysis (success) as not pending', () => {
    expect(checkIsPending('success')).toBe(false);
  });

  it('marks every non-success status as pending (under analysis)', () => {
    expect(checkIsPending('pending')).toBe(true);
    expect(checkIsPending('progress')).toBe(true);
    expect(checkIsPending('error')).toBe(true);
    expect(checkIsPending('canceled')).toBe(true);
    expect(checkIsPending('unsumbit')).toBe(true);
    expect(checkIsPending('')).toBe(true);
  });

  it('is case sensitive so only the exact success status is complete', () => {
    expect(checkIsPending('Success')).toBe(true);
    expect(checkIsPending('SUCCESS')).toBe(true);
  });
});
