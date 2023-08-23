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
