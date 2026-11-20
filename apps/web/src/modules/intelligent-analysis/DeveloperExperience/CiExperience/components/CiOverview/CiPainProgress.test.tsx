import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CiPainProgress from './CiPainProgress';
import { useCiPainTrendsQuery } from '../../queries';
import type { CiTopIssue } from './communityMetrics';

jest.mock('../../queries', () => ({ useCiPainTrendsQuery: jest.fn() }));

it('keeps zero-problem progress at 100 percent and uses the shared overview status labels', () => {
  (useCiPainTrendsQuery as jest.Mock).mockReturnValue({
    data: { points: [] },
    isLoading: false,
    isError: false,
  });
  render(<CiPainProgress issues={[]} reportHref={() => '/report'} />);
  expect(screen.getByText('痛点问题进展及趋势')).toBeInTheDocument();
  expect(screen.getAllByText('100.0%').length).toBeGreaterThan(0);
  ['待处理', '进行中', '已闭环', '闭环率'].forEach((label) => {
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

it('switches empty common issues to an explicit empty list and trend', () => {
  (useCiPainTrendsQuery as jest.Mock).mockReturnValue({
    data: { points: [] },
    isLoading: false,
    isError: false,
  });
  render(<CiPainProgress issues={[]} reportHref={() => '/report'} />);
  fireEvent.click(screen.getByRole('radio', { name: '共性问题' }));
  expect(useCiPainTrendsQuery).toHaveBeenLastCalledWith(true);
  expect(screen.getByText('暂无共性问题')).toBeInTheDocument();
  expect(screen.getByText('所选时间范围暂无共性问题数据')).toBeInTheDocument();
  expect(screen.queryByText('100.0%')).not.toBeInTheDocument();
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
        { ...issue, key: 'two', repo: 'two' },
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
  expect(screen.getByText('平台稳定性')).toBeInTheDocument();
  expect(screen.getByText('2 仓')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: '构建环境不稳定' })
  ).toBeInTheDocument();
  expect(screen.queryByText('仓库独有问题')).not.toBeInTheDocument();
});
