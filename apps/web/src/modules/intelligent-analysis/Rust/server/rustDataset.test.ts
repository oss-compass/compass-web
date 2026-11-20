import { getRustLeaderboardPage, parseRegionList } from './rustDataset';

jest.setTimeout(120000);

describe('parseRegionList', () => {
  it('returns no filter when the parameter is missing or blank', () => {
    expect(parseRegionList(undefined)).toEqual([]);
    expect(parseRegionList('')).toEqual([]);
    expect(parseRegionList('  ')).toEqual([]);
  });

  it('drops blank entries instead of turning them into the unknown-region filter', () => {
    expect(parseRegionList(',')).toEqual([]);
    expect(parseRegionList(',,')).toEqual([]);
    expect(parseRegionList('美国,')).toEqual(['美国']);
    expect(parseRegionList(',美国')).toEqual(['美国']);
    expect(parseRegionList(' , 中国 , ')).toEqual(['中国']);
  });

  it('keeps real region names and normalizes unknown aliases', () => {
    expect(parseRegionList('美国,中国')).toEqual(['美国', '中国']);
    expect(parseRegionList('unknown')).toEqual(['未知']);
  });
});

describe('blank region filter must not narrow the leaderboard', () => {
  it('returns every developer row when the region parameter is blank', async () => {
    const unfiltered = await getRustLeaderboardPage('developers', {
      page: 1,
      pageSize: 10,
    });
    const blankFilter = await getRustLeaderboardPage('developers', {
      page: 1,
      pageSize: 10,
      regions: parseRegionList(','),
    });

    expect(unfiltered.total).toBeGreaterThan(0);
    expect(blankFilter.total).toBe(unfiltered.total);
    expect(blankFilter.items).toEqual(unfiltered.items);
  });
});
