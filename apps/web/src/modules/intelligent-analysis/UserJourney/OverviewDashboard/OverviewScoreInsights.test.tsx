import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import OverviewScoreInsights, {
  type OverviewScoreCardRepo,
} from './OverviewScoreInsights';
import { OVERVIEW_SCORE_BANDS } from './scoreVisuals';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
});
const repo = (id: string, score: number): OverviewScoreCardRepo => ({
  id,
  name: id,
  team: '接口团队',
  reportUrl: `/ci?repo=${id}`,
  latestScore: score,
  scoreHistory: [{ date: '2026-11-03', score }],
  stageScores: [{ key: 'source-metric', label: '后端指标', score }],
});

it('shares the distribution, top and bottom cards, sorts real scores and retains zero', () => {
  render(
    <OverviewScoreInsights
      repos={[repo('zero', 0), repo('high', 95), repo('middle', 70)]}
      overallScore={55}
      scoreBands={OVERVIEW_SCORE_BANDS}
    />
  );
  expect(
    screen.getByRole('heading', { name: '综合体验评分分布' })
  ).toBeInTheDocument();
  const top = screen.getByRole('region', {
    name: '综合体验评分 TOP5 仓库',
  });
  const bottom = screen.getByRole('region', {
    name: '综合体验评分 BOTTOM5 仓库',
  });
  expect(within(top).getAllByRole('link')[0]).toHaveTextContent('high');
  expect(within(bottom).getAllByRole('link')[0]).toHaveTextContent('zero');
  fireEvent.click(screen.getByTitle('全部责任团队仓库 · 0–59：1 个仓库'));
  expect(
    within(screen.getByRole('dialog')).getByRole('link', { name: 'zero' })
  ).toHaveAttribute('href', '/ci?repo=zero');
});

it('opens backend metric scores from rankings without generating placeholder metrics', () => {
  render(
    <OverviewScoreInsights
      repos={[repo('actual', 85)]}
      overallScore={85}
      scoreBands={OVERVIEW_SCORE_BANDS}
    />
  );
  fireEvent.click(
    screen.getAllByRole('button', { name: '查看 actual 全部指标得分' })[0]
  );
  expect(
    within(screen.getByRole('dialog')).getByText('后端指标')
  ).toBeInTheDocument();
  expect(
    within(screen.getByRole('dialog')).getByText('85.0')
  ).toBeInTheDocument();
});
