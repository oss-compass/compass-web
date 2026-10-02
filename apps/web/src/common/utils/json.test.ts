import { safeJsonParse } from './json';

describe('safeJsonParse', () => {
  it('returns the parsed value for valid JSON', () => {
    expect(safeJsonParse('["core","regular"]', [])).toEqual([
      'core',
      'regular',
    ]);
    expect(safeJsonParse('{"type":"x","values":["a"]}', null)).toEqual({
      type: 'x',
      values: ['a'],
    });
  });

  it('returns the fallback for malformed JSON', () => {
    expect(safeJsonParse('abc', ['core', 'regular'])).toEqual([
      'core',
      'regular',
    ]);
    expect(safeJsonParse('[1,2,', [])).toEqual([]);
  });

  it('returns the fallback for empty, undefined and null input', () => {
    expect(safeJsonParse('', ['core', 'regular'])).toEqual(['core', 'regular']);
    expect(safeJsonParse(undefined, [])).toEqual([]);
    expect(safeJsonParse(null, null)).toBeNull();
  });
});
