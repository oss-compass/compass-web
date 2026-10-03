import { padArrayStart } from './array';

describe('padArrayStart', () => {
  it('pads only when the requested length exceeds the current length', () => {
    expect(padArrayStart([2, 3], 4, 0)).toEqual([0, 0, 2, 3]);
    expect(padArrayStart([2, 3], 2, 0)).toEqual([2, 3]);
    expect(padArrayStart([2, 3], 1, 0)).toEqual([2, 3]);
  });
});
