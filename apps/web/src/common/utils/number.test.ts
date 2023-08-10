import {
  toFixed,
  numberFormatK,
  percentRound,
  countDecimalPlaces,
} from './number';

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

  it('percentRound', () => {
    const r1 = percentRound([10.34, 20.043, 30.04, 39.567]);
    const r2 = percentRound([10.34, 20.043, 30.04, 39.567], 1);
    const r3 = percentRound([10.34, 20.043, 30.04, 39.567], 2);
    const r4 = percentRound([1, 2, 3, 4]);
    const r5 = percentRound([60, 60]);

    expect(r1).toEqual([10, 20, 30, 40]);
    expect(r2).toEqual([10.3, 20.1, 30, 39.6]);
    expect(r3).toEqual([10.34, 20.05, 30.04, 39.57]);
    expect(r4).toEqual([10, 20, 30, 40]);
    expect(r5).toEqual([50, 50]);
  });

  it('countDecimalPlaces', () => {
    expect(countDecimalPlaces(0)).toEqual(0);
    expect(countDecimalPlaces(NaN)).toEqual(0);
    expect(countDecimalPlaces(-1.2)).toEqual(1);
    expect(countDecimalPlaces(0.123456789)).toEqual(9);
  });
});
