import { formatToNow, formatISO } from './time';

describe('time', () => {
  it('formatISO', () => {
    expect(formatISO('2022-09-28T02:11:54Z')).toEqual('2022-09-28');
  });

  it('formatToNow', function () {
    expect(formatToNow('2022-09-28T02:11:54Z')).toBe('1 month');
  });
});
