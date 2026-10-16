import { escapeCsvCell } from './csv';

describe('escapeCsvCell', () => {
  it.each([
    [null, ''],
    [undefined, ''],
    ['', ''],
    [0, '0'],
    [42, '42'],
    [-3.5, '-3.5'],
    [false, 'false'],
    ['Issue 标题', 'Issue 标题'],
    ['2026-10-15', '2026-10-15'],
    [
      'https://github.com/owner/repo/issues/1',
      'https://github.com/owner/repo/issues/1',
    ],
  ])('preserves ordinary values: %p', (value, expected) => {
    expect(escapeCsvCell(value)).toBe(expected);
  });

  it.each([
    ['first,second', '"first,second"'],
    ['a "quoted" title', '"a ""quoted"" title"'],
    ['first\nsecond', '"first\nsecond"'],
    ['first\rsecond', '"first\rsecond"'],
    ['first\r\nsecond', '"first\r\nsecond"'],
  ])(
    'keeps delimiters and line breaks inside one cell: %p',
    (value, expected) => {
      expect(escapeCsvCell(value)).toBe(expected);
    }
  );

  it.each([
    '=1+2',
    '+1+2',
    '-1+2',
    '@SUM(1)',
    '＝1+2',
    '＋1+2',
    '－1+2',
    '＠SUM(1)',
    '  =1+2',
    '\t=1+2',
    '\r=1+2',
    '\n=1+2',
  ])('exports formula-like text as a quoted text cell: %p', (value) => {
    expect(escapeCsvCell(value)).toBe(`"\t${value}"`);
  });

  it('escapes quotes and separators after neutralizing a formula-like title', () => {
    expect(escapeCsvCell('=SUM(1,2) "title"')).toBe('"\t=SUM(1,2) ""title"""');
  });
});
