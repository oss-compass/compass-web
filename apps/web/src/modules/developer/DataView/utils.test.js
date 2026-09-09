import { calcData } from '@modules/developer/DataView/utils';

const rawData = [
  { repo: 'https://github.com/a/r1', total_contribution: 100 },
  { repo: 'https://github.com/a/r2', total_contribution: 50 },
  { repo: 'https://github.com/a/r3', total_contribution: 70 },
];

const getRepoNodes = (graph) => graph.nodes.filter((n) => n.type === 'repo');
const byContribution = (a, b) => a.contributor_count - b.contributor_count;

describe('calcData', () => {
  it('keeps every node symbol size within the configured range', () => {
    const graph = calcData(rawData, 'alice', 0, 'repo');

    getRepoNodes(graph).forEach((n) => {
      expect(n.symbolSize).toBeGreaterThanOrEqual(1);
      expect(n.symbolSize).toBeLessThanOrEqual(70);
    });
  });

  it('maps the smallest contribution to the minimum symbol size', () => {
    const graph = calcData(rawData, 'alice', 0, 'repo');
    const sorted = getRepoNodes(graph).sort(byContribution);

    expect(sorted[0].symbolSize).toBeLessThan(5);
  });

  it('scales node sizes in the same order as the contributions', () => {
    const graph = calcData(rawData, 'alice', 0, 'repo');
    const sorted = getRepoNodes(graph).sort(byContribution);

    expect(sorted[0].symbolSize).toBeLessThan(sorted[1].symbolSize);
    expect(sorted[1].symbolSize).toBeLessThan(sorted[2].symbolSize);
  });

  it('keeps link opacity within [0.01, 0.99]', () => {
    const graph = calcData(rawData, 'alice', 0, 'repo');

    expect(graph.links).toHaveLength(3);
    graph.links.forEach((l) => {
      expect(l.lineStyle.opacity).toBeGreaterThanOrEqual(0.01);
      expect(l.lineStyle.opacity).toBeLessThanOrEqual(0.99);
    });
  });

  it('excludes repos below the contribution limit', () => {
    const graph = calcData(rawData, 'alice', 60, 'repo');

    expect(getRepoNodes(graph).map((n) => n.id)).toEqual(['a/r1', 'a/r3']);
  });
});
