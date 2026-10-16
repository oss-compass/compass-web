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

  it.each(['null', '{}', '42', 'true', '"abc"', '["core",1]'])(
    'returns the fallback when a validator rejects %s',
    (value) => {
      const isStringArray = (parsed: unknown): parsed is string[] =>
        Array.isArray(parsed) &&
        parsed.every((item) => typeof item === 'string');

      expect(safeJsonParse(value, ['core', 'regular'], isStringArray)).toEqual([
        'core',
        'regular',
      ]);
    }
  );

  it('preserves validated empty arrays', () => {
    const isArray = (parsed: unknown): parsed is unknown[] =>
      Array.isArray(parsed);
    expect(safeJsonParse('[]', ['fallback'], isArray)).toEqual([]);
  });

  it.each(['null', '{}', '42', 'true', '"abc"', '[null]'])(
    'still supports valid JSON %s without a validator',
    (value) => {
      expect(safeJsonParse(value, 'fallback')).toEqual(JSON.parse(value));
    }
  );

  it('distinguishes JSON null from raw null', () => {
    expect(safeJsonParse('null', 'fallback')).toBeNull();
    expect(safeJsonParse(null, 'fallback')).toBe('fallback');
  });

  it.each([{ values: [] }, { values: ['42'] }, { values: ['42', 'true'] }])(
    'rejects raw query arrays instead of coercing them: %j',
    ({ values }) => {
      expect(safeJsonParse(values, 'fallback')).toBe('fallback');
    }
  );
});
