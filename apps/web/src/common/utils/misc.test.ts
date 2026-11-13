import { safeJsonParse } from './misc';

describe('utils misc safeJsonParse', () => {
  it('parses valid JSON', () => {
    expect(safeJsonParse('["core", "regular"]', [])).toEqual([
      'core',
      'regular',
    ]);
    expect(safeJsonParse('{"a": 1}', {})).toEqual({ a: 1 });
  });

  it('returns the fallback for malformed JSON', () => {
    const fallback = ['core', 'regular'];
    expect(safeJsonParse('abc', fallback)).toBe(fallback);
    expect(safeJsonParse('{broken', null)).toBeNull();
  });

  it('returns the fallback for non-string input', () => {
    expect(safeJsonParse(undefined, null)).toBeNull();
    expect(safeJsonParse(null, [])).toEqual([]);
  });
});
