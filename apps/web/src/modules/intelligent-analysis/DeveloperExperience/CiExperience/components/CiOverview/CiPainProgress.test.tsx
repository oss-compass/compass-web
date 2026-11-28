import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import CiPainProgress from './CiPainProgress';
import { useCiCommonIssuesQuery, useCiPainTrendsQuery } from '../../queries';
import type { CiTopIssue } from './communityMetrics';

jest.mock('../../queries', () => ({
  useCiPainTrendsQuery: jest.fn(),
  useCiCommonIssuesQuery: jest.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  });
});

beforeEach(() => {
  (useCiCommonIssuesQuery as jest.Mock).mockReturnValue({
    data: { snapshots: [] },
  });
});

it('keeps zero-problem progress at 100 percent and uses the shared overview status labels', () => {
  (useCiPainTrendsQuery as jest.Mock).mockReturnValue({
    data: { points: [] },
    isLoading: false,
    isError: false,
  });
  render(<CiPainProgress issues={[]} reportHref={() => '/report'} />);
  expect(screen.queryByText('痛点问题进展及趋势')).not.toBeInTheDocument();
  expect(screen.getByRole('radio', { name: '总体问题' })).toBeChecked();
  expect(screen.getAllByText('100.0%').length).toBeGreaterThan(0);
  ['待处理', '进行中', '已修复', '闭环率'].forEach((label) => {
    expect(screen.getAllByText(label).length).toBeGreaterThan(0);
  });
  ['待确认', '已确认待修复', '已修复待复测', '修复率'].forEach((label) => {
    expect(screen.queryByText(label)).not.toBeInTheDocument();
  });
  expect(screen.queryByText('已消退')).not.toBeInTheDocument();
});

it('shows a retryable trend error while keeping a successfully loaded current snapshot', () => {
  const refetch = jest.fn();
  (useCiPainTrendsQuery as jest.Mock).mockReturnValue({
    isLoading: false,
    isError: true,
    refetch,
  });
  render(<CiPainProgress issues={[]} reportHref={() => '/report'} />);
  expect(screen.getByText('周度趋势加载失败')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /重\s*试/ }));
  expect(refetch).toHaveBeenCalledTimes(1);
  expect(screen.getAllByText('100.0%').length).toBeGreaterThan(0);
});

it('uses the shared overview loading placeholder when switching to common issues', () => {
  (useCiPainTrendsQuery as jest.Mock).mockReturnValue({ data: { points: [] } });
  (useCiCommonIssuesQuery as jest.Mock).mockReturnValue({ isLoading: true });
  render(<CiPainProgress issues={[]} reportHref={() => '/report'} />);

  fireEvent.click(screen.getByRole('radio', { name: '共性问题' }));
  const overview = within(screen.getByRole('region', { name: '共性问题总览' }));
  const loading = within(
    overview.getByRole('status', { name: '共性问题加载中' })
  );
  expect(loading.getByText('共性问题加载中')).toHaveClass('sr-only');
  expect(overview.queryByText('暂无共性问题')).not.toBeInTheDocument();
});

it('shows an empty common overview independently of the overall trend', () => {
  (useCiPainTrendsQuery as jest.Mock).mockReturnValue({
    data: { points: [] },
    isLoading: false,
    isError: false,
  });
  render(<CiPainProgress issues={[]} reportHref={() => '/report'} />);
  fireEvent.click(screen.getByRole('radio', { name: '共性问题' }));
  expect(useCiPainTrendsQuery).toHaveBeenLastCalledWith(false, false);
  expect(screen.getByText('暂无共性问题')).toBeInTheDocument();
  expect(screen.queryByText('痛点问题进展及趋势')).not.toBeInTheDocument();
  expect(
    screen.queryByRole('region', { name: '总体问题' })
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('radio', { name: '总体问题' }));
  expect(screen.getByRole('region', { name: '总体问题' })).toBeInTheDocument();
  expect(
    screen.queryByRole('region', { name: '共性问题总览' })
  ).not.toBeInTheDocument();
});

it('combines all available common issues across days and keeps each observation in the detail', () => {
  (useCiPainTrendsQuery as jest.Mock).mockReturnValue({ data: { points: [] } });
  const issue = {
    id: 'common-device',
    name: 'NPU 设备打开失败',
    priority: 'P2',
    segments: ['真机验证'],
    responsibility: '环境',
    recurring: true,
    runs: 3,
    prs: 3,
    cause: '设备不可用',
    repositories: [
      { name: 'ge', reportRepo: 'ge', runs: 2, prs: 2, cards: [] },
      {
        name: 'graph-autofusion',
        reportRepo: 'graphaf',
        runs: 1,
        prs: 1,
        cards: [{ step: '设备加载', cause: '设备不可用' }],
      },
    ],
  };
  (useCiCommonIssuesQuery as jest.Mock).mockReturnValue({
    data: {
      snapshots: [
        {
          day: '2026-09-01',
          issues: [{ ...issue, id: 'common-gate', name: '门禁权限拦截' }],
        },
        {
          day: '2026-11-24',
          issues: [
            { ...issue, id: 'common-obs', name: 'OBS 下载异常' },
            {
              ...issue,
              id: 'common-device:2026-11-24',
              priority: 'P0',
              runs: 12,
            },
          ],
        },
        {
          day: '2026-11-25',
          issues: [{ ...issue, id: 'common-device:2026-11-25' }],
        },
      ],
    },
  });
  render(
    <CiPainProgress
      issues={[]}
      reportHref={(repo, day) => `/report/${repo}?day=${day}`}
    />
  );
  expect(useCiCommonIssuesQuery).toHaveBeenLastCalledWith(false);
  fireEvent.click(screen.getByRole('radio', { name: '共性问题' }));
  expect(useCiCommonIssuesQuery).toHaveBeenLastCalledWith(true);
  expect(useCiPainTrendsQuery).toHaveBeenLastCalledWith(false, false);
  const overview = within(screen.getByRole('region', { name: '共性问题总览' }));
  expect(overview.getAllByRole('listitem')).toHaveLength(3);
  expect(overview.getByRole('button', { name: 'OBS 下载异常' })).toBeVisible();
  expect(overview.getByRole('button', { name: '门禁权限拦截' })).toBeVisible();
  expect(overview.getByText('P0 完全阻塞')).toBeVisible();
  expect(overview.getAllByText('P2 明显影响')).toHaveLength(2);
  expect(overview.queryByText(/最高/)).not.toBeInTheDocument();
  expect(overview.getByText('出现 2 天')).toBeVisible();
  expect(overview.queryByText(/次执行|个 PR/)).not.toBeInTheDocument();
  expect(overview.queryByRole('combobox')).not.toBeInTheDocument();
  expect(overview.queryByText('闭环率')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'NPU 设备打开失败' }));
  const dialog = within(screen.getByRole('dialog', { name: issue.name }));
  const table = within(dialog.getByRole('table'));
  expect(
    table.getByRole('columnheader', { name: '步骤及原因' })
  ).toBeInTheDocument();
  expect(
    table.getByRole('cell', { name: 'graph-autofusion' })
  ).toBeInTheDocument();
  expect(dialog.getAllByText('设备不可用')).toHaveLength(1);
  expect(dialog.getAllByRole('link', { name: '查看报告' })[1]).toHaveAttribute(
    'href',
    '/report/graphaf?day=2026-11-25'
  );
  fireEvent.mouseDown(dialog.getByRole('combobox', { name: '观测日期' }));
  fireEvent.click(dialog.getByRole('option', { name: '2026-11-24' }));
  expect(dialog.getAllByRole('link', { name: '查看报告' })[1]).toHaveAttribute(
    'href',
    '/report/graphaf?day=2026-11-24'
  );
  expect(dialog.getByText('P0')).toBeInTheDocument();
});

it('groups reported common issues by classification and title across repositories', () => {
  (useCiPainTrendsQuery as jest.Mock).mockReturnValue({ data: { points: [] } });
  const issue: CiTopIssue = {
    key: 'one',
    problemKey: 'problem',
    repo: 'one',
    slug: 'one',
    workflow: 'ci',
    day: '2026-11-20',
    title: '构建环境不稳定',
    kb: '环境异常',
    pri: 'P1',
    dim: '稳定性',
    status: 'pending',
    impact: {},
    journeyStages: ['编译'],
    is_common_issue: true,
    common_issue_type: '平台稳定性',
  };
  render(
    <CiPainProgress
      issues={[
        issue,
        { ...issue, key: 'two', repo: 'two', pri: 'P0' },
        {
          ...issue,
          key: 'three',
          title: '仓库独有问题',
          is_common_issue: false,
          common_issue_type: null,
        },
      ]}
      reportHref={() => '/report'}
    />
  );
  fireEvent.click(screen.getByRole('radio', { name: '共性问题' }));
  const overview = within(screen.getByRole('region', { name: '共性问题总览' }));
  expect(overview.getByText('平台稳定性')).toBeInTheDocument();
  expect(overview.getByText('2 仓')).toBeInTheDocument();
  expect(overview.getByText('P0 完全阻塞')).toBeInTheDocument();
  expect(overview.queryByText('P1 显著影响')).not.toBeInTheDocument();
  expect(
    overview.getByRole('button', { name: '构建环境不稳定' })
  ).toBeInTheDocument();
  expect(overview.queryByText('仓库独有问题')).not.toBeInTheDocument();
});

it('paginates long common-issue lists and returns to a valid page when data shrinks', () => {
  const issues = Array.from({ length: 12 }, (_, index) => ({
    id: `common-${index + 1}`,
    name: `共性问题 ${index + 1}`,
    priority: 'P2',
    repositories: [],
    segments: [],
    runs: 0,
    prs: 0,
  }));
  const setIssues = (visible: typeof issues) =>
    (useCiCommonIssuesQuery as jest.Mock).mockReturnValue({
      data: { snapshots: [{ day: '2026-11-25', issues: visible }] },
    });
  setIssues(issues);
  (useCiPainTrendsQuery as jest.Mock).mockReturnValue({ data: { points: [] } });
  const page = () => (
    <CiPainProgress issues={[]} reportHref={() => '/report'} />
  );
  const { rerender } = render(page());
  fireEvent.click(screen.getByRole('radio', { name: '共性问题' }));
  const overview = within(screen.getByRole('region', { name: '共性问题总览' }));
  const rows = () =>
    within(overview.getByRole('list', { name: '共性问题列表' }));
  expect(rows().getAllByRole('listitem')).toHaveLength(10);
  expect(
    rows().queryByRole('button', { name: '共性问题 12' })
  ).not.toBeInTheDocument();

  const pagination = within(
    overview.getByRole('navigation', { name: '共性问题分页' })
  );
  fireEvent.click(pagination.getByText('2', { exact: true }));
  expect(rows().getAllByRole('listitem')).toHaveLength(2);
  expect(rows().getByRole('button', { name: '共性问题 12' })).toBeVisible();
  expect(
    rows().queryByRole('button', { name: '共性问题 1' })
  ).not.toBeInTheDocument();

  setIssues(issues.slice(0, 4));
  rerender(page());
  expect(overview.getByRole('button', { name: '共性问题 1' })).toBeVisible();
  expect(
    overview.queryByRole('navigation', { name: '共性问题分页' })
  ).not.toBeInTheDocument();
});
