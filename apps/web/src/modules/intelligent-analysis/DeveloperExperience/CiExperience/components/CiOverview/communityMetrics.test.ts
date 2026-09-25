import { CI_DATA } from '../../data';
import { CI_JOURNEY } from '../CiReport/journeyData';
import { computeCommunityOverview } from './communityMetrics';

describe('computeCommunityOverview', () => {
  it('keeps a latest score of zero instead of falling back to an older score', () => {
    const latestCostScores = (['runtime', 'opsnn'] as const).map((repo) => {
      const journey = CI_JOURNEY[repo];
      const latestDay = journey.days[journey.days.length - 1];
      return journey.boards[latestDay].scores!.dims.cost;
    });
    const originalScores = latestCostScores.map(({ score }) => score);

    try {
      latestCostScores.forEach((dimension) => {
        dimension.score = 0;
      });

      const overview = computeCommunityOverview(CI_DATA);
      const costKpi = overview.kpis.find(({ label }) => label === '成本');

      expect(costKpi).toMatchObject({
        value: '0',
        bad: true,
        trend: {
          last: 0,
        },
      });
    } finally {
      latestCostScores.forEach((dimension, index) => {
        dimension.score = originalScores[index];
      });
    }
  });
});
