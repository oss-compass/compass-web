import {
  getHighestPainIssuePriority,
  getPainIssuePriority,
  resolvePainIssuePriority,
} from './issuePriority';

describe('pain issue priority', () => {
  it.each([
    [0, 'P0'],
    [40, 'P0'],
    [40.9, 'P0'],
    [41, 'P1'],
    [59, 'P1'],
    [59.9, 'P1'],
    [60, 'P2'],
    [69, 'P2'],
    [70, 'P3'],
    [79, 'P3'],
  ])('maps score %s to %s', (score, expected) => {
    expect(getPainIssuePriority(score)).toBe(expected);
  });

  it.each([[-1], [80], [100], [null], [undefined], ['invalid']])(
    'does not assign an out-of-range score %s',
    (score) => {
      expect(getPainIssuePriority(score)).toBeUndefined();
    }
  );

  it('prefers the API priority and falls back to score', () => {
    expect(resolvePainIssuePriority('P2', 20)).toBe('P2');
    expect(resolvePainIssuePriority(undefined, 20)).toBe('P0');
  });

  it('uses the highest priority among the pain issues', () => {
    expect(
      getHighestPainIssuePriority([
        { priority: 'P2', score: 65 },
        { priority: 'P1', score: 55 },
      ])
    ).toBe('P1');
    expect(getHighestPainIssuePriority([])).toBeUndefined();
  });
});
