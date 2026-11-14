import { parseMileage, parseFilterOpts, parseSortOpts } from './queryParams';

const invalidParams = [
  { value: undefined },
  { value: null },
  { value: '' },
  { value: 'abc' },
  { value: '["core",' },
  { value: '{"type":"contribution","direction":' },
  { value: 'null' },
  { value: '{}' },
  { value: '42' },
  { value: 'true' },
  { value: '"abc"' },
];

describe('contributor query parsing', () => {
  it.each(invalidParams)('uses safe defaults for %j', ({ value }) => {
    expect(parseMileage(value)).toEqual(['core', 'regular']);
    expect(parseFilterOpts(value)).toEqual([]);
    expect(parseSortOpts(value)).toBeNull();
  });

  it.each([
    { value: [] },
    { value: ['["guest"]'] },
    { value: ['[{"type":"contribution_type","values":["pr_creation"]}]'] },
    { value: ['{"type":"contribution","direction":"asc"}'] },
    { value: ['["core"]', '["guest"]'] },
    { value: ['["core"', '"regular"]'] },
  ])('rejects raw query arrays without coercing %j', ({ value }) => {
    expect(parseMileage(value)).toEqual(['core', 'regular']);
    expect(parseFilterOpts(value)).toEqual([]);
    expect(parseSortOpts(value)).toBeNull();
  });
});

describe('parseMileage', () => {
  it.each(['["core",1]', '[null]', '[true]', '[{}]', '["unknown"]', '[""]'])(
    'rejects invalid mileage elements in %s',
    (value) => {
      const mileage = parseMileage(value);
      expect(mileage).toEqual(['core', 'regular']);
      expect([...mileage]).toEqual(['core', 'regular']);
      expect(mileage.includes('core')).toBe(true);
    }
  );

  it.each([
    { value: '["core","regular"]', expected: ['core', 'regular'] },
    {
      value: '["guest","core","regular"]',
      expected: ['guest', 'core', 'regular'],
    },
    { value: '["guest"]', expected: ['guest'] },
    { value: '[]', expected: [] },
  ])('preserves valid mileage %s', ({ value, expected }) => {
    expect(parseMileage(value)).toEqual(expected);
  });

  it('keeps empty mileage from adding a mileage_type filter', () => {
    const mileage = parseMileage('[]');
    expect(mileage.length).toBe(0);
  });
});

describe('parseFilterOpts', () => {
  it.each([
    '[null]',
    '[{}]',
    '[42]',
    '[true]',
    '["abc"]',
    '[[]]',
    '[{"values":["a"]}]',
    '[{"type":null,"values":["a"]}]',
    '[{"type":42,"values":["a"]}]',
    '[{"type":[],"values":["a"]}]',
    '[{"type":"contribution_type"}]',
    '[{"type":"contribution_type","values":null}]',
    '[{"type":"contribution_type","values":{}}]',
    '[{"type":"contribution_type","values":42}]',
    '[{"type":"contribution_type","values":true}]',
    '[{"type":"contribution_type","values":"pr_creation"}]',
    '[{"type":"contribution_type","values":["pr_creation",1]}]',
    '[{"type":"contribution_type","values":[null]}]',
    '[{"type":"contribution_type","values":[{}]}]',
    '[{"type":"contribution_type","values":[true]}]',
    '[{"type":"contributor","values":["alice"]},null]',
    '[{"type":"contributor","values":["alice"]},{"type":"contribution_type"}]',
  ])('rejects the entire invalid filter array %s', (value) => {
    const filters = parseFilterOpts(value);
    expect(filters).toEqual([]);
    expect([...filters]).toEqual([]);
    expect(
      filters.find((filter) => filter.type === 'contribution_type')
    ).toBeUndefined();
  });

  it('preserves filters written by the table and safely consumes their values', () => {
    const filters = parseFilterOpts(
      '[{"type":"contributor","values":["alice"]},{"type":"ecological_type","values":["individual participant"]},{"type":"contribution_type","values":["pr_creation","issue_creation"]},{"type":"organization","values":["Example"]}]'
    );
    expect(filters).toEqual([
      { type: 'contributor', values: ['alice'] },
      { type: 'ecological_type', values: ['individual participant'] },
      { type: 'contribution_type', values: ['pr_creation', 'issue_creation'] },
      { type: 'organization', values: ['Example'] },
    ]);
    expect(
      filters.find((filter) => filter.type === 'contributor')?.values
    ).toEqual(['alice']);
    const contributionFilter = filters.find(
      (filter) => filter.type === 'contribution_type'
    );
    expect(contributionFilter?.values.includes('pr_creation')).toBe(true);
    expect(contributionFilter?.values.includes('star')).toBe(false);
  });

  it('preserves empty filter and values arrays', () => {
    expect(parseFilterOpts('[]')).toEqual([]);
    expect(
      parseFilterOpts('[{"type":"contribution_type","values":[]}]')
    ).toEqual([{ type: 'contribution_type', values: [] }]);
  });
});

describe('parseSortOpts', () => {
  it.each([
    '[]',
    '[{"type":"contribution","direction":"asc"}]',
    '{"type":"contribution"}',
    '{"direction":"asc"}',
    '{"type":null,"direction":"asc"}',
    '{"type":42,"direction":"asc"}',
    '{"type":[],"direction":"asc"}',
    '{"type":"unknown","direction":"asc"}',
    '{"type":"","direction":"asc"}',
    '{"type":"contribution","direction":null}',
    '{"type":"contribution","direction":42}',
    '{"type":"contribution","direction":["asc"]}',
    '{"type":"contribution","direction":"ascend"}',
    '{"type":"contribution","direction":"descend"}',
    '{"type":"contribution","direction":"ASC"}',
    '{"type":"contribution","direction":""}',
  ])('uses no sorting for invalid sort %s', (value) => {
    expect(parseSortOpts(value)).toBeNull();
  });

  it.each([
    { type: 'contribution', direction: 'asc' },
    { type: 'contribution', direction: 'desc' },
    { type: 'contribution_filterd', direction: 'asc' },
    { type: 'contribution_filterd', direction: 'desc' },
  ])('preserves table sorting %j', (sort) => {
    expect(parseSortOpts(JSON.stringify(sort))).toEqual(sort);
  });

  it('preserves no sorting for missing, raw null and JSON null parameters', () => {
    expect(parseSortOpts(undefined)).toBeNull();
    expect(parseSortOpts(null)).toBeNull();
    expect(parseSortOpts('null')).toBeNull();
  });
});
