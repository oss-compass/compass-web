import { processLanguages } from './Languages';

const makeLanguage = (
  name: string,
  ratio: number,
  contribution = 0
): { language: string; ratio: number; contribution: number } => ({
  language: name,
  ratio,
  contribution,
});

describe('processLanguages', () => {
  it('keeps every language when there are 10 or fewer', () => {
    const data = Array.from({ length: 7 }, (_, i) =>
      makeLanguage(`lang${i + 1}`, i + 1)
    );

    const result = processLanguages(data);

    expect(result.map((l) => l.name)).toEqual([
      'lang1',
      'lang2',
      'lang3',
      'lang4',
      'lang5',
      'lang6',
      'lang7',
    ]);
  });

  it('merges entries beyond the first 10 into Others without dropping any', () => {
    const data = Array.from({ length: 12 }, (_, i) =>
      makeLanguage(`lang${i + 1}`, i + 1)
    );

    const result = processLanguages(data);

    expect(result).toHaveLength(11);
    expect(result.slice(0, 10).map((l) => l.name)).toEqual(
      Array.from({ length: 10 }, (_, i) => `lang${i + 1}`)
    );
    expect(result[10]).toEqual({
      name: 'Others',
      percentage: 23,
      contribution: 0,
    });
  });

  it('preserves the total percentage', () => {
    const data = Array.from({ length: 12 }, (_, i) =>
      makeLanguage(`lang${i + 1}`, i + 1)
    );
    const total = data.reduce((sum, l) => sum + l.ratio, 0);

    const result = processLanguages(data);

    expect(result.reduce((sum, l) => sum + l.percentage, 0)).toEqual(total);
  });

  it('filters out zero-ratio languages', () => {
    const data = [
      makeLanguage('go', 40),
      makeLanguage('cobol', 0),
      makeLanguage('rust', 60),
    ];

    const result = processLanguages(data);

    expect(result.map((l) => l.name)).toEqual(['go', 'rust']);
  });

  it('returns an empty list for missing data', () => {
    expect(processLanguages(undefined)).toEqual([]);
  });
});
