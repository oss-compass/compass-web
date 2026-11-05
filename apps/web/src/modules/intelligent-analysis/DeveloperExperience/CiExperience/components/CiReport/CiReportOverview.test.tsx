import React, { useState } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import type { CiMetricDetailsBoard } from './CiMetricDetails';
import CiReportOverview from './CiReportOverview';
import type { CiDimKey, CiJourney, CiProblem, CiPri } from '../../types';

const day = '2026-11-03';
const journey: CiJourney = {
  projectName: '后端仓库',
  workflow: 'backend-workflow',
  days: [day],
  boards: {
    [day]: {
      day,
      date: day,
      note: '',
      stages: [],
      scores: {
        caliber: 'backend-version',
        total: 0,
        grade: null,
        low_confidence: true,
        note: '后端提供的样本不足说明',
        dims: {
          stability: { score: 0, metrics: {} },
          efficiency: { score: null, metrics: {} },
          interaction: { score: 70, metrics: {} },
          cost: { score: 80, metrics: {} },
        },
      },
    },
  },
};
const problem: CiProblem = {
  kb: '后端问题',
  title: '真实执行失败',
  pri: 'P0',
  dim: '稳定性',
  dimkey: 'stability',
  cls: '待确认',
  mech: '失败',
  owner: '待确认',
  stages: {},
  impact: { runs: 2, prs: 1, streak_days: 1, window_total: 2 },
  runs: [],
  root: { status: 'pending' },
};

const board: CiMetricDetailsBoard = {
  metrics: {
    stability: [
      {
        label: '后端稳定性指标',
        cur: { v: '0%' },
        base: { v: '—' },
        seg: '构建准备',
        score: '后端稳定性指标',
        note: '后端指标口径',
      },
    ],
    efficiency: [],
    interaction: [],
    cost: [],
  },
  diag: {
    stability: { mech: { 后端失败原因: 2 } },
    efficiency: { stage_bill: [], top_jobs: [] },
    interaction: { ttff_by_owner: {}, retry: { rate: null, n: 0 } },
    cost: { pools: [] },
  },
};

it('preserves zero scores, distinguishes missing scores and exposes confidence details on demand', () => {
  render(
    <CiReportOverview
      journey={journey}
      day={day}
      problems={[problem]}
      activeDimension={null}
      activePriority={null}
      onFilterChange={jest.fn()}
    />
  );
  expect(screen.getByText('/ 100')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: '稳定性，0分' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: '效率，未评估' })
  ).toBeInTheDocument();
  expect(screen.queryByText('评分仅供参考')).not.toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /评分说明/ }));
  expect(
    screen.getByRole('region', { name: '综合评分详情' })
  ).toBeInTheDocument();
  expect(screen.getByText('暂无评分口径数据')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '收起指标详情' }));
  expect(
    screen.queryByRole('region', { name: '综合评分详情' })
  ).not.toBeInTheDocument();
});

it('counts priorities within each dimension and combines dimension and priority filters', () => {
  const filterChanged = jest.fn();
  const onProblemJump = jest.fn();
  const ControlledOverview = () => {
    const [dimension, setDimension] = useState<CiDimKey | null>(null);
    const [priority, setPriority] = useState<CiPri | null>(null);
    return (
      <CiReportOverview
        journey={journey}
        day={day}
        board={board}
        onProblemJump={onProblemJump}
        problems={[
          problem,
          { ...problem, kb: '稳定性问题二', pri: 'P2' },
          { ...problem, kb: '稳定性问题三', pri: 'P2' },
          { ...problem, kb: '成本问题', dimkey: 'cost' },
        ]}
        activeDimension={dimension}
        activePriority={priority}
        onFilterChange={(nextDimension, nextPriority) => {
          setDimension(nextDimension);
          setPriority(nextPriority);
          filterChanged(nextDimension, nextPriority);
        }}
      />
    );
  };
  render(<ControlledOverview />);
  expect(screen.queryByText(/全部问题|个问题/)).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: /筛选稳定性 P1/ })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: '筛选稳定性 P0 问题，1 项' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: '筛选成本 P0 问题，1 项' })
  ).toBeInTheDocument();
  const stability = screen.getByRole('button', { name: '稳定性，0分' });
  const p2 = screen.getByRole('button', { name: '筛选稳定性 P2 问题，2 项' });
  fireEvent.click(p2);
  expect(p2).toHaveAttribute('aria-pressed', 'true');
  expect(filterChanged).toHaveBeenLastCalledWith('stability', 'P2');
  const details = screen.getByRole('region', { name: '稳定性详情' });
  expect(details).toHaveTextContent('后端稳定性指标');
  expect(within(details).getByText('0%')).toBeInTheDocument();
  expect(within(details).getByText('—')).toBeInTheDocument();
  expect(within(details).queryByText('后端问题')).not.toBeInTheDocument();
  expect(within(details).queryByText('成本问题')).not.toBeInTheDocument();
  fireEvent.click(
    within(details).getByRole('button', { name: '定位问题：稳定性问题二' })
  );
  expect(onProblemJump).toHaveBeenCalledWith(
    expect.objectContaining({ kb: '稳定性问题二', pri: 'P2' })
  );
  expect(screen.getByRole('button', { name: /诊断细分/ })).toHaveAttribute(
    'aria-expanded',
    'false'
  );
  fireEvent.click(screen.getByRole('button', { name: /诊断细分/ }));
  expect(screen.getByText('后端失败原因')).toBeInTheDocument();
  fireEvent.click(p2);
  expect(filterChanged).toHaveBeenLastCalledWith('stability', null);
  expect(stability).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(stability);
  expect(filterChanged).toHaveBeenLastCalledWith(null, null);
  expect(
    screen.queryByRole('region', { name: '稳定性详情' })
  ).not.toBeInTheDocument();
  fireEvent.click(
    screen.getByRole('button', { name: '筛选成本 P0 问题，1 项' })
  );
  expect(filterChanged).toHaveBeenLastCalledWith('cost', 'P0');
  fireEvent.click(screen.getByRole('button', { name: '成本，80分' }));
  expect(filterChanged).toHaveBeenLastCalledWith(null, null);
  expect(
    screen.queryByRole('region', { name: '成本详情' })
  ).not.toBeInTheDocument();
  fireEvent.click(stability);
  expect(filterChanged).toHaveBeenLastCalledWith('stability', null);
});

it('switches to an empty dimension without keeping old metrics or problems', () => {
  const ControlledOverview = () => {
    const [dimension, setDimension] = useState<CiDimKey | null>(null);
    return (
      <CiReportOverview
        journey={journey}
        day={day}
        board={board}
        problems={[problem]}
        activeDimension={dimension}
        activePriority={null}
        onFilterChange={(value) => setDimension(value)}
      />
    );
  };
  render(<ControlledOverview />);
  const stability = screen.getByRole('button', { name: '稳定性，0分' });
  fireEvent.click(stability);
  expect(stability).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText('后端稳定性指标')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '效率，未评估' }));
  const details = screen.getByRole('region', { name: '效率详情' });
  expect(details).toHaveTextContent('暂无该维度的指标数据');
  expect(details).toHaveTextContent('该维度当日暂无问题');
  expect(screen.queryByText('后端稳定性指标')).not.toBeInTheDocument();
  expect(screen.queryByText('后端问题')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '收起指标详情' }));
  expect(
    screen.queryByRole('region', { name: '效率详情' })
  ).not.toBeInTheDocument();
});
