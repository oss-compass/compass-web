import { getSegmentWidth } from './index';

describe('getSegmentWidth', () => {
  it('returns 0 when the distribution is empty', () => {
    // `Math.max()` of an all-zero distribution is 0; the share must not become NaN.
    expect(getSegmentWidth(0, 0)).toBe(0);
  });

  it('scales a segment against the widest one', () => {
    expect(getSegmentWidth(2, 4)).toBe(50);
    expect(getSegmentWidth(4, 4)).toBe(100);
    expect(getSegmentWidth(0, 4)).toBe(0);
  });
});
