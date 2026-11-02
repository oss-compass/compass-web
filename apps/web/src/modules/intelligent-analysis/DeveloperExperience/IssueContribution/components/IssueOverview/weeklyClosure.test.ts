import type { IssueOverviewV2PainSummary } from '../../types';
import { getWeeklyClosureData } from './weeklyClosure';

const summary: IssueOverviewV2PainSummary = {
  total: 637,
  counts: { resolved: 9, historical: 216 },
  closeRate: 2.1,
  priorities: [],
  repoOptions: [],
  stageOptions: [],
  periodsReady: true,
  periods: [
    {
      period: '2026-10-26_to_2026-11-01',
      total: 20,
      counts: { resolved: 8, historical: 4 },
      closeRate: 50,
      priorities: [],
    },
    {
      period: '2026-10-19_to_2026-10-25',
      total: 10,
      counts: { resolved: 3 },
      closeRate: 30,
      priorities: [],
    },
  ],
};

it('keeps cumulative card totals while both charts use weekly data', () => {
  const result = getWeeklyClosureData(summary);
  expect(result.value).toBe('9 / 421');
  expect(result.trend.values).toEqual([30, 50]);
  expect(result.trend.periods).toEqual([
    '2026-10-19_to_2026-10-25',
    '2026-10-26_to_2026-11-01',
  ]);
  expect(result.trend.values[1]).toBe((8 / 16) * 100);
  expect(result.periods[1].closeRate).toBe(result.trend.values[1]);
  expect(result.trend.monthly).toEqual({
    periods: ['2026-10', '2026-11'],
    values: [30, 50],
  });
  expect(summary.periods[0].period).toBe('2026-10-26_to_2026-11-01');
});

it('does not dilute an earlier week when later week pains increase', () => {
  const result = getWeeklyClosureData({
    ...summary,
    periods: [
      ...summary.periods,
      {
        period: '2026-11-02_to_2026-11-08',
        total: 100,
        counts: { resolved: 0 },
        closeRate: 0,
        priorities: [],
      },
    ],
  });
  expect(result.value).toBe('9 / 421');
  expect(result.trend.values).toEqual([30, 50, 0]);
});

it('keeps cumulative card data available while weekly data is unavailable', () => {
  for (const data of [
    undefined,
    { ...summary, periods: [] },
    { ...summary, periodsReady: false },
  ]) {
    const result = getWeeklyClosureData(data);
    expect(result.value).toBe(data ? '9 / 421' : '-');
    expect(result.trend.values).toEqual([]);
    expect(result.periods).toEqual([]);
  }
});

it('aggregates every week of the month instead of taking the last week', () => {
  const result = getWeeklyClosureData({
    ...summary,
    periods: [
      ...summary.periods,
      {
        period: '2026-10-12_to_2026-10-18',
        total: 10,
        counts: { resolved: 8 },
        closeRate: 80,
        priorities: [],
      },
    ],
  });
  expect(result.trend.values).toEqual([80, 30, 50]);
  expect(result.trend.monthly).toEqual({
    periods: ['2026-10', '2026-11'],
    values: [55, 50],
  });
});

it('uses summed counts rather than averaging weekly rates and excludes historical pains', () => {
  const result = getWeeklyClosureData({
    ...summary,
    periods: [
      {
        period: '2026-10-05_to_2026-10-11',
        total: 20,
        counts: { resolved: 10, historical: 10 },
        closeRate: 100,
        priorities: [],
      },
      {
        period: '2026-10-12_to_2026-10-18',
        total: 90,
        counts: { resolved: 0 },
        closeRate: 0,
        priorities: [],
      },
      {
        period: '2026-10-19_to_2026-10-25',
        total: 10,
        counts: { historical: 10 },
        closeRate: 0,
        priorities: [],
      },
    ],
  });
  expect(result.trend.monthly).toEqual({ periods: ['2026-10'], values: [10] });
  expect(result.value).toBe('9 / 421');
});

it('rounds the monthly ratio once after summing counts and handles empty denominators', () => {
  const result = getWeeklyClosureData({
    ...summary,
    periods: [
      {
        period: '2026-10-05_to_2026-10-11',
        total: 3,
        counts: { resolved: 1 },
        closeRate: 33.3,
        priorities: [],
      },
      {
        period: '2026-10-12_to_2026-10-18',
        total: 3,
        counts: { resolved: 3 },
        closeRate: 100,
        priorities: [],
      },
      {
        period: '2026-11-02_to_2026-11-08',
        total: 1,
        counts: { historical: 1 },
        closeRate: 0,
        priorities: [],
      },
    ],
  });
  expect(result.trend.monthly).toEqual({
    periods: ['2026-10', '2026-11'],
    values: [66.7, 0],
  });
});
