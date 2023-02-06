import { formatToNow, formatISO } from './time';

describe('time', () => {
  beforeAll(() => {
    jest.useFakeTimers({ now: new Date('2022-11-14T14:33:00') });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('formatISO', () => {
    expect(formatISO('2022-09-28T02:11:54Z')).toEqual('2022-09-28');
  });

  it('formatToNow', function () {
    expect(formatToNow('2022-09-28T02:11:54Z')).toBe('2 months');
  });
});
