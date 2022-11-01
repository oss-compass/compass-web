import { getUrlReg } from './index';

describe('submitProject Misc', () => {
  it('getUrlReg', function () {
    expect(getUrlReg('github').test('https://github.com/xxx/xxx')).toBe(true);
    expect(getUrlReg('github').test('https://github.com/xxx/xxx')).toBe(true);
    expect(getUrlReg('github').test('github.com/xxx/xxx')).toBe(true);
    expect(getUrlReg('gitee').test('https://gitee.com/xxx/xxx')).toBe(true);
    expect(getUrlReg('gitee').test('gitee.com/xxx/xxx')).toBe(true);
  });
});
