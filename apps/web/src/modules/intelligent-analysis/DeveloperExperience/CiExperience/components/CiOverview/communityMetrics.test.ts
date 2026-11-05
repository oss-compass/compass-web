import { computeCommunityOverview } from './communityMetrics';
import rawData from '../../ci-runtime-data.json';
import rawJourneys from '../CiReport/ci-journey.json';
import type { CiJourney, CiRepoData, CiRepoKey } from '../../types';

it('uses injected backend scores, includes new repositories and preserves zero scores', () => {
  const data = JSON.parse(JSON.stringify(rawData)) as CiRepoData;
  const journey = JSON.parse(JSON.stringify(rawJourneys.runtime)) as CiJourney;
  const day = data.days[data.days.length - 1];
  journey.days = [...data.days];
  journey.boards[day].scores!.total = 0;
  const m = computeCommunityOverview(
    { ge: data } as Record<CiRepoKey, CiRepoData>,
    { ge: journey }
  );
  expect(m.repos).toHaveLength(1);
  expect(m.repos[0]).toMatchObject({ repo: 'ge', scoreOverall: 0 });
  expect(m.kpis[0].value).toBe('0');
});

it('does not fill a missing latest score from an earlier date', () => {
  const data = JSON.parse(JSON.stringify(rawData)) as CiRepoData;
  const journey = JSON.parse(JSON.stringify(rawJourneys.runtime)) as CiJourney;
  journey.days = [...data.days];
  journey.boards[data.days[data.days.length - 1]].scores = null;
  const m = computeCommunityOverview(
    { runtime: data } as Record<CiRepoKey, CiRepoData>,
    { runtime: journey }
  );
  expect(m.repos[0].scoreOverall).toBeNull();
  expect(m.kpis[0].value).toBe('—');
});
