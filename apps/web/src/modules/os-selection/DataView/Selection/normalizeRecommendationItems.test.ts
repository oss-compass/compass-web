import { normalizeRecommendationItems } from './normalizeRecommendationItems';

describe('normalizeRecommendationItems', () => {
  it('keeps valid GitHub, Gitee, and npm identifiers', () => {
    const items = [
      { packageId: 'owner/repo@@@@$$@@@@selected.github', score: 0.9 },
      { packageId: 'org/repo@@@@$$@@@@selected.gitee', label: 'gitee' },
      { packageId: '@scope/pkg@@@@$$@@@@selected.npm', score: 0 },
    ];

    expect(normalizeRecommendationItems(items)).toEqual([
      { ...items[0], name: 'owner/repo', target: 'selected.github' },
      { ...items[1], name: 'org/repo', target: 'selected.gitee' },
      { ...items[2], name: '@scope/pkg', target: 'selected.npm' },
    ]);
    expect(items[0]).not.toHaveProperty('name');
  });

  it('skips nullable and malformed entries without losing valid results', () => {
    const valid = { packageId: 'owner/repo@@@@$$@@@@selected.github' };
    const items = [
      null,
      { packageId: null },
      { packageId: '' },
      { packageId: 'owner/repo' },
      { packageId: '@@@@$$@@@@selected.github' },
      { packageId: 'owner/repo@@@@$$@@@@' },
      { packageId: 'owner/repo@@@@$$@@@@selected.github@@@@$$@@@@extra' },
      valid,
    ];

    expect(normalizeRecommendationItems(items)).toEqual([
      { ...valid, name: 'owner/repo', target: 'selected.github' },
    ]);
  });

  it('treats missing result lists as empty', () => {
    expect(normalizeRecommendationItems(null)).toEqual([]);
    expect(normalizeRecommendationItems(undefined)).toEqual([]);
  });
});
