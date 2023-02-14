import { toFixed, numberFormatK } from './number';

describe('utils number ', () => {
  it('numberFormatK', function () {
    expect(numberFormatK(33333)).toBe('33.3K');
    expect(numberFormatK(1000)).toBe('1K');
    expect(numberFormatK(1101)).toBe('1.1K');
    expect(numberFormatK(999)).toBe(999);
  });

  it('toFixed', () => {
    expect(toFixed(0.1, 3)).toEqual(0.1);
  });
});
