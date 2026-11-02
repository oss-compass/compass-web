import React from 'react';
import { render, screen } from '@testing-library/react';
import { IssuePainProgressOverview } from './IssuePainInsights';
import type { IssueOverviewV2PainSummary } from '../../types';

jest.mock(
  '../../../../UserJourney/OverviewDashboard/OverviewSummaryBlock',
  () => ({
    TrendChart: ({
      points,
      adaptiveAxes,
    }: {
      points: unknown[];
      adaptiveAxes?: boolean;
    }) => (
      <div data-testid="weekly-points" data-adaptive-axes={adaptiveAxes}>
        {JSON.stringify(points)}
      </div>
    ),
    TrendWindowPicker: () => null,
  })
);
jest.mock('./IssuePainDetailModal', () => () => null);
jest.mock('./IssueTrendSparkline', () => () => null);

const summary: IssueOverviewV2PainSummary = {
  total: 102,
  counts: { resolved: 1, pending: 101 },
  closeRate: 1,
  priorities: [],
  repoOptions: [],
  stageOptions: [],
  periodsReady: true,
  periods: [
    {
      period: '2026-10-19_to_2026-10-25',
      total: 2,
      counts: { resolved: 1, pending: 1 },
      closeRate: 50,
      priorities: [{ priority: 'P1', total: 2, counts: {} }],
    },
    {
      period: '2026-10-26_to_2026-11-01',
      total: 100,
      counts: { pending: 100 },
      closeRate: 0,
      priorities: [{ priority: 'P1', total: 100, counts: {} }],
    },
  ],
};

it('displays backend weekly rates without dividing by next week or cumulative totals', () => {
  render(
    <IssuePainProgressOverview summary={summary} reportHref={() => '/report'} />
  );
  const points = JSON.parse(
    screen.getByTestId('weekly-points').textContent || '[]'
  );
  expect(points).toEqual([
    expect.objectContaining({
      weekStart: '2026-10-19',
      total: 2,
      p1: 2,
      closeRate: 50,
    }),
    expect.objectContaining({
      weekStart: '2026-10-26',
      total: 100,
      p1: 100,
      closeRate: 0,
    }),
  ]);
  expect(
    screen.queryByText(/当周闭环率按该周痛点截至周末/)
  ).not.toBeInTheDocument();
  expect(screen.getByTestId('weekly-points')).toHaveAttribute(
    'data-adaptive-axes',
    'true'
  );
});

it('does not display incomplete migration data as zero closure rates', () => {
  render(
    <IssuePainProgressOverview
      summary={{ ...summary, periodsReady: false }}
      reportHref={() => '/report'}
    />
  );
  expect(
    screen.getByText('周度统计准备中，完成后将自动更新')
  ).toBeInTheDocument();
  expect(screen.queryByTestId('weekly-points')).not.toBeInTheDocument();
  expect(screen.getByText('102')).toBeInTheDocument();
});
