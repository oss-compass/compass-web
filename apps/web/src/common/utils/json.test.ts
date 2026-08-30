import { safeJsonParse } from './json';

describe('safeJsonParse', () => {
  it('parses valid json strings', () => {
    expect(safeJsonParse('["core","regular"]', [])).toEqual([
      'core',
      'regular',
    ]);
    expect(safeJsonParse('{"type":"title"}', null)).toEqual({
      type: 'title',
    });
  });

  it('returns the fallback for non-string input', () => {
    expect(safeJsonParse(undefined, ['core', 'regular'])).toEqual([
      'core',
      'regular',
    ]);
    // 重复的 query 参数会被 next/router 解析成数组
    expect(safeJsonParse(['a'], 'fallback')).toBe('fallback');
    expect(safeJsonParse(null, 'fallback')).toBe('fallback');
    expect(safeJsonParse('', 'fallback')).toBe('fallback');
  });

  it('returns the fallback for malformed json instead of throwing', () => {
    expect(safeJsonParse('{bad json', [])).toEqual([]);
    expect(safeJsonParse('[object Object]', null)).toBeNull();
  });
});
