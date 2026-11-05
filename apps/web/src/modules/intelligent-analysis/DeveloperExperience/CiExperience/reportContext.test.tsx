import React from 'react';
import { render, screen } from '@testing-library/react';
import DeepAnalysis from './components/CiReport/DeepAnalysis';
import Appendix from './components/Appendix';
import type { CiReportContext } from './reportContext';

jest.mock('./components/shared', () => ({
  Collapsible: ({ children }: any) => <div>{children}</div>,
}));
const context = (
  day: string,
  value: string,
  count: number
): CiReportContext => ({
  day,
  repo: 'backend-repo',
  name: '后端仓库',
  workflow: 'backend-workflow',
  caliber: `version-${day}`,
  dict_version: null,
  uploaded_at: null,
  generated_at: null,
  score_note: '后端评分说明',
  low_confidence: false,
  rules: null,
  score_dimensions: [
    {
      key: 'stability',
      score: 0,
      metrics: [{ label: '后端指标', score: 0, weight: 0.35 }],
    },
  ],
  findings: [
    {
      key: 'stability',
      title: '后端分析标题',
      tone: 'neutral',
      summary: `${day} 的后端事实`,
      metrics: [
        {
          dimension: '稳定性',
          label: '后端指标',
          value: { v: value },
          score: 0,
          weight: 0.35,
        },
      ],
      recommendations: [],
    },
  ],
  metrics: [
    {
      dimension: '稳定性',
      label: '后端指标',
      value: { v: value },
      score: 0,
      weight: 0.35,
    },
  ],
  taxonomy: [
    {
      classification: '后端类别',
      mechanism: '后端机理',
      problem_count: count,
      owners: ['后端责任方'],
    },
  ],
  problem_count: count,
  taxonomy_note: '来自后端的统计口径',
});

it('renders only the selected date analysis and does not invent advice', () => {
  const { rerender } = render(
    <DeepAnalysis context={context('2026-11-02', '0%', 1)} />
  );
  expect(screen.getByText('2026-11-02 的后端事实')).toBeInTheDocument();
  expect(screen.getByText('后端指标：0%')).toBeInTheDocument();
  expect(screen.getByText('当前报告未提供改进建议')).toBeInTheDocument();
  rerender(<DeepAnalysis context={context('2026-11-03', '20%', 2)} />);
  expect(screen.queryByText('2026-11-02 的后端事实')).not.toBeInTheDocument();
  expect(screen.getByText('后端指标：20%')).toBeInTheDocument();
});

it('renders backend taxonomy, zero scores and source weights without historical samples', () => {
  const { rerender } = render(
    <Appendix context={context('2026-11-02', '0%', 1)} />
  );
  expect(screen.getByText(/来自后端的统计口径共 1 个问题/)).toBeInTheDocument();
  expect(screen.getByText(/后端类别 · 后端机理：1 个问题/)).toBeInTheDocument();
  expect(screen.getByText(/后端指标：0 · 权重 0.35/)).toBeInTheDocument();
  expect(
    screen.getByText('当前报告未提供评分公式与阈值。')
  ).toBeInTheDocument();
  rerender(<Appendix context={context('2026-11-03', '20%', 2)} />);
  expect(screen.getByText(/来自后端的统计口径共 2 个问题/)).toBeInTheDocument();
  expect(screen.queryByText(/20,661|20661|v3.8.6/)).not.toBeInTheDocument();
});

it('does not fall back to frontend data when report context is absent', () => {
  render(
    <>
      <DeepAnalysis />
      <Appendix />
    </>
  );
  expect(screen.getByText('暂无当日分析数据')).toBeInTheDocument();
  expect(screen.getByText('暂无当日口径与来源数据')).toBeInTheDocument();
  expect(screen.queryByText(/平台的锅|PR 在累积/)).not.toBeInTheDocument();
});
