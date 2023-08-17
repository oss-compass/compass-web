import { sumPre, adjustmentArray } from './utils';

describe('utils', () => {
  it('sumPre', function () {
    expect(sumPre(1, [1, 2, 3, 4])).toEqual(1);
  });

  it('adjustmentArray ', function () {
    expect(adjustmentArray([34, 33, 33], 0, 44)).toEqual([44, 23, 33]);
    expect(adjustmentArray([34, 33, 33], 0, 99)).toEqual([99, 0, 1]);
    expect(adjustmentArray([33, 33, 33, 1], 0, 99)).toEqual([99, 0, 0, 1]);
    expect(adjustmentArray([33, 33, 33, 1], 2, 99)).toEqual([33, 33, 99, 0]);
  });
});
