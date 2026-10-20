import { percentRound } from './number';

describe('percentRound correction direction', () => {
  it.each([
    {
      name: 'integer deficit',
      input: [1.51, 1.48, 1.48, 1.48, 94.05],
      precision: 0,
      expected: [2, 2, 1, 1, 94],
    },
    {
      name: 'integer excess',
      input: [1.49, 1.52, 1.52, 1.52, 93.95],
      precision: 0,
      expected: [1, 1, 2, 2, 94],
    },
    {
      name: 'one-decimal deficit',
      input: [1.151, 1.148, 1.148, 1.148, 95.405],
      precision: 1,
      expected: [1.2, 1.2, 1.1, 1.1, 95.4],
    },
    {
      name: 'one-decimal excess',
      input: [1.149, 1.152, 1.152, 1.152, 95.395],
      precision: 1,
      expected: [1.1, 1.1, 1.2, 1.2, 95.4],
    },
    {
      name: 'two-decimal deficit with unnormalized weights',
      input: [10151, 10148, 10148, 10148, 959405],
      precision: 2,
      expected: [1.02, 1.02, 1.01, 1.01, 95.94],
    },
    {
      name: 'two-decimal excess with unnormalized weights',
      input: [10149, 10152, 10152, 10152, 959395],
      precision: 2,
      expected: [1.01, 1.01, 1.02, 1.02, 95.94],
    },
    {
      name: 'multiple upward corrections',
      input: [1.51, 1.48, 1.48, 1.48, 1.48, 1.48, 1.48, 89.61],
      precision: 0,
      expected: [2, 2, 2, 1, 1, 1, 1, 90],
    },
    {
      name: 'multiple downward corrections',
      input: [1.49, 1.52, 1.52, 1.52, 1.52, 1.52, 1.52, 89.39],
      precision: 0,
      expected: [1, 1, 1, 2, 2, 2, 2, 89],
    },
  ])('$name', ({ input, precision, expected }) => {
    const original = [...input];
    expect(percentRound(input, precision)).toEqual(expected);
    expect(input).toEqual(original);
  });

  it.each([
    { count: 3, expected: [33.34, 33.33, 33.33] },
    { count: 6, expected: [16.66, 16.66, 16.67, 16.67, 16.67, 16.67] },
    { count: 7, expected: [14.28, 14.28, 14.28, 14.29, 14.29, 14.29, 14.29] },
  ])(
    'preserves equal metric allocations for $count entries',
    ({ count, expected }) => {
      expect(percentRound(new Array(count).fill(1), 2)).toEqual(expected);
    }
  );

  it('preserves an empty input', () => {
    expect(percentRound([], 2)).toEqual([]);
  });

  it('preserves all-zero inputs', () => {
    expect(percentRound([0, 0, 0], 2)).toEqual([0, 0, 0]);
  });

  it('keeps each share between its floor and ceiling while summing to 100', () => {
    const weights = [1.51, 1.48, 1.48, 1.48, 1.48, 1.48, 1.48, 89.61];
    for (let offset = 0; offset < weights.length; offset++) {
      const input = [...weights.slice(offset), ...weights.slice(0, offset)];
      const total = input.reduce((sum, weight) => sum + weight, 0);
      const output = percentRound(input);
      expect(output.reduce((sum, share) => sum + share, 0)).toBe(100);
      output.forEach((share, index) => {
        const exact = (100 * input[index]) / total;
        expect(share).toBeGreaterThanOrEqual(Math.floor(exact));
        expect(share).toBeLessThanOrEqual(Math.ceil(exact));
      });
    }
  });
});
