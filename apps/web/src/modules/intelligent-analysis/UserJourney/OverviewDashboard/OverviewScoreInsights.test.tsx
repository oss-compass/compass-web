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

it('groups metrics by their source dimension, orders group scores and keeps equal labels separate', () => {
  const first = repo('first', 85);
  const second = repo('second', 75);
  first.stageScores = [
    {
      key: 'cost:same',
      label: '同名指标',
      score: 80,
      groupKey: 'cost',
      groupLabel: '成本',
      groupOrder: 3,
    },
    {
      key: 'stability:zero',
      label: '零分指标',
      score: 0,
      groupKey: 'stability',
      groupLabel: '稳定性',
      groupOrder: 0,
    },
    {
      key: 'stability:same',
      label: '同名指标',
      score: 95,
      groupKey: 'stability',
      groupLabel: '稳定性',
      groupOrder: 0,
    },
    {
      key: 'efficiency:missing',
      label: '未评分指标',
      score: null,
      groupKey: 'efficiency',
      groupLabel: '效率',
      groupOrder: 1,
    },
  ];
  second.stageScores = first.stageScores.map((metric) => ({
    ...metric,
    score: metric.groupKey === 'cost' ? 100 : null,
  }));
  render(
    <OverviewScoreInsights
      repos={[first, second]}
      overallScore={80}
      scoreBands={OVERVIEW_SCORE_BANDS}
    />
  );
  fireEvent.click(screen.getByRole('tab', { name: '指标', exact: true }));
  const distribution = screen.getByRole('region', { name: '综合体验评分分布' });
  expect(
    within(distribution)
      .getAllByRole('heading', { level: 4 })
      .map((node) => node.textContent)
  ).toEqual(['稳定性', '成本']);
  expect(
    within(distribution)
      .getAllByText(/^(同名指标|零分指标)$/)
      .map((node) => node.textContent)
  ).toEqual(['同名指标', '零分指标', '同名指标']);
  expect(
    within(distribution).queryByText('未评分指标')
  ).not.toBeInTheDocument();
  fireEvent.click(
    within(distribution).getByTitle('稳定性 · 同名指标 · 90–100：1 个仓库')
  );
  const dialog = within(screen.getByRole('dialog'));
  expect(dialog.getByRole('link', { name: 'first' })).toBeInTheDocument();
  expect(
    dialog.queryByRole('link', { name: 'second' })
  ).not.toBeInTheDocument();
  expect(dialog.getByText('稳定性 · 同名指标 · 90–100')).toBeInTheDocument();
});
