import { calcRadarAxisMax } from './Chart';

describe('calcRadarAxisMax', () => {
  it('rounds the maximum up to the next multiple of 10', () => {
    expect(calcRadarAxisMax([17, 3, 5])).toBe(20);
  });

  it('keeps an exact multiple of 10', () => {
    expect(calcRadarAxisMax([100, 4])).toBe(100);
  });

  it('gives a single small value the minimum headroom', () => {
    expect(calcRadarAxisMax([1])).toBe(10);
  });

  it('rounds up across a multiple of 10', () => {
    expect(calcRadarAxisMax([101, 4])).toBe(110);
  });

  it('returns a number, not a formatted string', () => {
    expect(typeof calcRadarAxisMax([17, 3])).toBe('number');
  });
});
