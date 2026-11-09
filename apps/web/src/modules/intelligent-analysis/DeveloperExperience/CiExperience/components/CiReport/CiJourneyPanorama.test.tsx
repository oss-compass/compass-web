import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import CiJourneyPanorama from './CiJourneyPanorama';
import type {
  CiJourney,
  CiJourneyCell,
  CiJourneyStage,
  CiJourneyProblem,
} from '../../types';

jest.mock('../PainTracking', () => ({ CiPainTrackingButton: () => null }));

const day = '2026-11-03';
const cell: CiJourneyCell = {
  score: 80,
  word: '正常',
  disp: '1 min',
  name: '阶段耗时',
  probn: 0,
};
const stage = (seg: string): CiJourneyStage => ({
  seg,
  segscore: 80,
  cells: {
    stability: cell,
    efficiency: cell,
    interaction: cell,
    cost: cell,
  },
  stats: [],
  trend: { name: '阶段耗时趋势', series: [1, 2, 1] },
  stages: [],
  bare: [],
  problems: [],
});
const journey: CiJourney = {
  projectName: 'CI 仓库',
  workflow: 'ci',
  days: [day],
  boards: {
    [day]: {
      day,
      date: day,
      note: '',
      scores: null,
      stages: [stage('触发确认'), stage('编译')],
    },
  },
};
const props = { journey, repo: 'runtime', workflow: 'ci', day };
const getToggle = () => screen.getByRole('button', { name: /任务总结与痛点/ });

it('toggles the detail section and preserves its internal expansion state', () => {
  render(<CiJourneyPanorama {...props} />);
  const details = screen.getByRole('region', { name: '旅程步骤详情' });
  expect(getToggle()).toHaveAttribute('aria-controls', details.id);
  expect(getToggle()).toHaveAttribute('aria-expanded', 'true');

  fireEvent.click(screen.getByRole('button', { name: /四维明细/ }));
  fireEvent.click(getToggle());
  expect(details).not.toBeVisible();
  expect(getToggle()).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(getToggle());
  expect(details).toBeVisible();
  expect(screen.getByRole('button', { name: /四维明细/ })).toHaveAttribute(
    'aria-expanded',
    'false'
  );
});

it('opens collapsed details when selecting a panorama card and keeps the directory in sync', () => {
  render(<CiJourneyPanorama {...props} />);
  fireEvent.click(getToggle());
  fireEvent.click(screen.getByTitle('编译 · 正常'));

  expect(getToggle()).toHaveTextContent('编译');
  expect(getToggle()).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('region', { name: '旅程步骤详情' })).toBeVisible();
  const directory = screen.getByRole('navigation', { name: '旅程名称' });
  expect(
    within(directory).getByRole('button', { name: /编译/ })
  ).toHaveAttribute('aria-pressed', 'true');

  fireEvent.click(within(directory).getByRole('button', { name: /触发确认/ }));
  expect(getToggle()).toHaveTextContent('触发确认');
});

it('reopens collapsed details for external problem jumps, including unmapped problems', () => {
  jest.useFakeTimers();
  const { rerender, unmount } = render(<CiJourneyPanorama {...props} />);
  try {
    ['编译', '__unseg'].forEach((seg, index) => {
      fireEvent.click(getToggle());
      rerender(
        <CiJourneyPanorama
          {...props}
          focus={{ seg, probKey: 'problem', nonce: index + 1 }}
        />
      );
      expect(getToggle()).toHaveAttribute('aria-expanded', 'true');
      expect(getToggle()).toHaveTextContent(
        seg === '__unseg' ? '跨段/未映射' : seg
      );
      expect(
        screen.getByRole('region', { name: '旅程步骤详情' })
      ).toBeVisible();
    });
  } finally {
    unmount();
    jest.useRealTimers();
  }
});

const pain: CiJourneyProblem = {
  seg: '编译',
  kb: 'compile-failure',
  title: '编译环境缺少依赖',
  pri: 'P1',
  dim: '稳定性',
  dimkey: 'stability',
  cls: '待确认',
  mech: '依赖缺失',
  owner: '维护者',
  stages: {},
  impact: { runs: 1, prs: 1, streak_days: 1, window_total: 1 },
  runs: [],
  root: {
    status: 'pending',
    action: '在构建镜像中补齐依赖。',
    dest: 'CI 维护者',
  },
};

it('keeps pain, observation and recommendation counts consistent with details even without a score', () => {
  const zeroCell = { ...cell, name: '失败执行数', disp: '0 次', score: null };
  const currentStage: CiJourneyStage = {
    ...stage('编译'),
    segscore: null,
    cells: {
      stability: zeroCell,
      efficiency: { ...cell, fallback: true },
      interaction: zeroCell,
      cost: { ...cell, disp: '—' },
    },
    problems: [
      pain,
      pain,
      {
        ...pain,
        title: '执行耗时偏长',
        root: { status: 'pending', action: '  ' },
      },
    ],
    stats: [{ label: '问题', v: 99 }],
  };
  const currentJourney: CiJourney = {
    ...journey,
    boards: { [day]: { ...journey.boards[day], stages: [currentStage] } },
  };
  render(<CiJourneyPanorama {...props} journey={currentJourney} />);
  const cardStats = screen.getByRole('group', { name: '编译统计' });
  expect(within(cardStats).getByLabelText('痛点：2')).toHaveTextContent('2');
  expect(within(cardStats).getByLabelText('指标：1')).toHaveTextContent('1');
  expect(within(cardStats).getByLabelText('建议：1')).toHaveTextContent('1');
  expect(cardStats).not.toHaveTextContent('99');

  const observations = screen.getByRole('region', { name: '指标' });
  expect(within(observations).getAllByRole('listitem')).toHaveLength(1);
  expect(observations).toHaveTextContent('失败执行数');
  expect(observations).toHaveTextContent('0 次');
  expect(observations).toHaveTextContent('稳定性 · 交互体验');
  expect(observations).not.toHaveTextContent('阶段耗时');

  const recommendations = screen.getByRole('region', { name: '建议' });
  expect(within(recommendations).getAllByRole('listitem')).toHaveLength(1);
  expect(recommendations).toHaveTextContent('在构建镜像中补齐依赖。');
  expect(recommendations).toHaveTextContent('关联痛点：编译环境缺少依赖');
  expect(recommendations).toHaveTextContent('CI 维护者');
  expect(screen.getByText('2 个痛点')).toBeInTheDocument();
});

it('shows zero counts and explicit empty states when no stage observations or suggestions are available', () => {
  const currentStage = stage('编译');
  currentStage.cells = {
    stability: { ...cell, fallback: true },
    efficiency: { ...cell, disp: '—' },
    interaction: { ...cell, name: '' },
    cost: { ...cell, disp: '' },
  };
  render(
    <CiJourneyPanorama
      {...props}
      journey={{
        ...journey,
        boards: { [day]: { ...journey.boards[day], stages: [currentStage] } },
      }}
    />
  );
  const cardStats = screen.getByRole('group', { name: '编译统计' });
  ['痛点', '指标', '建议'].forEach((label) => {
    expect(within(cardStats).getByLabelText(`${label}：0`)).toHaveTextContent(
      '0'
    );
  });
  expect(screen.getByRole('region', { name: '指标' })).toHaveTextContent(
    '本步骤暂无阶段指标'
  );
  expect(screen.getByRole('region', { name: '建议' })).toHaveTextContent(
    '本步骤暂未提供建议'
  );
});
