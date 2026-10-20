import { formatToNow, formatToNowStrict, formatISO } from './time';

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
    expect(formatToNow('2022-09-28T02:11:54Z')).toBe('about 2 months');
  });

  it('formatToNowStrict', function () {
    expect(formatToNowStrict('2022-09-28T02:11:54Z')).toBe('2 months');
  });
});

describe('time locale', () => {
  it('follows the locale that is active at call time', () => {
    let locale = 'en';
    jest.isolateModules(() => {
      jest.doMock('@common/utils/getLocale', () => ({
        __esModule: true,
        default: () => locale,
      }));
      const mod = require('./time');
      const en = mod.formatToNow('2022-09-28T02:11:54Z');
      locale = 'zh';
      const zh = mod.formatToNow('2022-09-28T02:11:54Z');
      expect(en).toContain('about');
      expect(zh).not.toEqual(en);
    });
  });
});
