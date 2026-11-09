import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CiPainProgress from './CiPainProgress';
import { useCiPainTrendsQuery } from '../../queries';

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
