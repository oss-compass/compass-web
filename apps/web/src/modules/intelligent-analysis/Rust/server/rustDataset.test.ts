import { buildLeaderboardChartItems } from './rustDataset';

const regionRow = (country: string, count: number, share = '0.00%') => ({
  key: `${country}-1`,
  排名: 1,
  国家: country,
  数量: count,
  占比: share,
});

const organizationRow = (
  organization: string,
  count: number,
  share = '0.00%'
) => ({
  key: `${organization}-1`,
  排名: 1,
  组织: organization,
  所属国家: '未知',
  开发者数量: count,
  占比: share,
});

const shareSum = (items: { share: number }[]) =>
  items.reduce((sum, item) => sum + item.share, 0);

describe('buildLeaderboardChartItems', () => {
  it('derives the percentage from the values instead of the source ratio', () => {
    // 数据源「占比」按全量样本计算，与这两行的 value 比例无关
    const rows = [
      regionRow('a', 100, '10.00%'),
      regionRow('b', 300, '80.00%'),
    ];

    const items = buildLeaderboardChartItems('developers', rows);

    expect(items.map((item) => item.share)).toEqual([25, 75, 0]);
  });

  it('keeps every percentage summing to 100', () => {
    const rows = [
      regionRow('a', 100),
      regionRow('b', 100),
      regionRow('c', 200),
      regionRow('d', 600),
    ];

    const items = buildLeaderboardChartItems('developers', rows);

    expect(items.map((item) => item.share)).toEqual([10, 10, 20, 60, 0]);
    expect(shareSum(items)).toBe(100);
  });

  it('folds the rows past the tenth into Other with the matching percentage', () => {
    const rows = Array.from({ length: 12 }, (_item, index) =>
      regionRow(`c${index + 1}`, 10, '1.00%')
    );

    const items = buildLeaderboardChartItems('developers', rows);

    expect(items).toHaveLength(11);
    expect(items[10]).toEqual({
      key: 'developers-other',
      name: 'Other',
      value: 20,
      share: 16.67,
    });
    expect(items[0].share).toBe(8.33);
    expect(shareSum(items)).toBeCloseTo(100, 1);
  });

  it('normalises the organization chart over the rows it actually draws', () => {
    // unknown 组织被排除在饼图之外，占比不能再按包含它的全量样本计算
    const rows = [
      organizationRow('unknown', 900, '90.00%'),
      ...Array.from({ length: 11 }, (_item, index) =>
        organizationRow(`org${index + 1}`, 10, '0.30%')
      ),
    ];

    const items = buildLeaderboardChartItems('organizations', rows);

    expect(items.map((item) => item.name)).not.toContain('unknown');
    expect(items).toHaveLength(11);
    expect(items[10]).toMatchObject({ name: 'Other', value: 10 });
    expect(shareSum(items)).toBeCloseTo(100, 1);
  });

  it('uses the project count for the projects leaderboard', () => {
    const rows = [
      regionRow('a', 100),
      regionRow('b', 100),
      regionRow('c', 200),
      regionRow('d', 600),
    ];

    const items = buildLeaderboardChartItems('projects', rows);

    expect(items.map((item) => item.value)).toEqual([100, 100, 200, 600, 0]);
    expect(shareSum(items)).toBe(100);
  });

  it('reports a zero percentage when there is nothing to plot', () => {
    expect(buildLeaderboardChartItems('developers', [])).toEqual([
      { key: 'developers-other', name: 'Other', value: 0, share: 0 },
    ]);
  });
});
