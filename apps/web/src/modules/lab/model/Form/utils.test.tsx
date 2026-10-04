import { sumPre, adjustmentArray } from './utils';

describe('utils', () => {
  it('sumPre', function () {
    expect(sumPre(1, [1, 2, 3, 4])).toEqual(1);
    expect(sumPre(2, [0.2, 0.1])).toEqual(0.3);
  });

  it('adjustmentArray ', function () {
    expect(adjustmentArray([34, 33, 33], 0, 44)).toEqual([44, 23, 33]);
    expect(adjustmentArray([34, 33, 33], 0, 99)).toEqual([99, 0, 1]);
    expect(adjustmentArray([33, 33, 33, 1], 0, 99)).toEqual([99, 0, 0, 1]);
    expect(adjustmentArray([22.2, 17.13, 35.67, 25], 0, 22.23)).toEqual([
      22.23, 17.1, 35.67, 25,
    ]);
  });
});

it('caps a middle weight to the budget left by preceding metrics', () => {
  expect(adjustmentArray([34, 33, 33], 1, 99)).toEqual([34, 66, 0]);
  expect(adjustmentArray([25, 25, 25, 25], 1, 90)).toEqual([25, 75, 0, 0]);
  expect(adjustmentArray([22.2, 17.13, 35.67, 25], 1, 90)).toEqual([
    22.2, 77.8, 0, 0,
  ]);
});

it('keeps a single metric at 100 percent', () => {
  expect(adjustmentArray([100], 0, 20)).toEqual([100]);
  expect(adjustmentArray([100], 0, 0)).toEqual([100]);
});

it('still redistributes decreases and edits to the last metric', () => {
  expect(adjustmentArray([34, 33, 33], 1, 3)).toEqual([34, 3, 63]);
  expect(adjustmentArray([34, 33, 33], 2, 99)).toEqual([1, 0, 99]);
});
