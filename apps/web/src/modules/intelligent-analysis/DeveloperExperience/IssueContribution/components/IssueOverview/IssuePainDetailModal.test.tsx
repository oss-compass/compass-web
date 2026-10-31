import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import IssuePainDetailModal from './IssuePainDetailModal';
import { fetchIssueOverviewTopPainsV2 } from '../../data';

jest.mock('../../data', () => ({
  fetchIssueOverviewTopPainsV2: jest.fn(),
  fetchIssueOverviewPainDetail: jest.fn(),
}));
jest.mock('../PainIssueTable', () => () => null);

const fetchPains = fetchIssueOverviewTopPainsV2 as jest.MockedFunction<
  typeof fetchIssueOverviewTopPainsV2
>;

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  });
});

beforeEach(() => {
  fetchPains.mockReset();
  fetchPains.mockImplementation(async (query) => ({
    items: [],
    total: query.trackingStatus ? 1 : 61,
    page: query.page ?? 1,
    pageSize: query.pageSize ?? 10,
    filterOptions: {
      stages: ['创建', '首响与分配'],
      prios: ['P0', 'P2'],
      states: ['inProgress'],
      trackingStatuses: ['2', '3', '7'],
    },
  }));
});

it('filters concrete statuses within all 61 entry rows and restores the entry on all', async () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, cacheTime: 0 } },
  });
  const { rerender } = render(
    <QueryClientProvider client={client}>
      <IssuePainDetailModal
        open
        title="进行中"
        query={{ state: 'inProgress', team: '算子分队' }}
        stageOptions={[]}
        onClose={() => {}}
        reportHref={() => '/report'}
      />
    </QueryClientProvider>
  );
  await waitFor(() =>
    expect(fetchPains).toHaveBeenCalledWith(
      expect.objectContaining({
        state: 'inProgress',
        team: '算子分队',
        pageSize: 1,
        includeFilterOptions: true,
      }),
      expect.anything()
    )
  );
  fireEvent.click(await screen.findByTitle('2'));
  await waitFor(() =>
    expect(fetchPains).toHaveBeenCalledWith(
      expect.objectContaining({ state: 'inProgress', page: 2, pageSize: 10 }),
      expect.anything()
    )
  );
  fireEvent.click(screen.getByRole('button', { name: '筛选状态' }));
  expect(
    await screen.findByRole('radio', { name: '已确认待修复' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('radio', { name: '已修复待复测' })
  ).toBeInTheDocument();
  expect(screen.getByRole('radio', { name: '复测不通过' })).toBeInTheDocument();
  expect(
    screen.queryByRole('radio', { name: '进行中' })
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('radio', { name: '已修复待复测' }));
  await waitFor(() =>
    expect(fetchPains).toHaveBeenCalledWith(
      expect.objectContaining({
        state: 'inProgress',
        team: '算子分队',
        trackingStatus: '3',
        page: 1,
        pageSize: 10,
      }),
      expect.anything()
    )
  );
  fireEvent.click(screen.getByRole('radio', { name: '全部' }));
  await waitFor(() => {
    const calls = fetchPains.mock.calls.filter(([q]) => q.pageSize === 10);
    expect(calls[calls.length - 1][0]).toMatchObject({
      state: 'inProgress',
      team: '算子分队',
      page: 1,
      trackingStatus: undefined,
    });
  });
  fireEvent.click(screen.getByRole('button', { name: '筛选阶段' }));
  const stageRadio = await screen.findByRole('radio', { name: '创建' });
  expect(screen.getByRole('radio', { name: '首响与分配' })).toBeInTheDocument();
  fireEvent.click(stageRadio);
  await waitFor(() =>
    expect(fetchPains).toHaveBeenCalledWith(
      expect.objectContaining({
        state: 'inProgress',
        team: '算子分队',
        stage: '创建',
        page: 1,
      }),
      expect.anything()
    )
  );
  fireEvent.click(screen.getByRole('button', { name: '筛选优先级' }));
  const priorityRadio = await screen.findByRole('radio', { name: /P2/ });
  fireEvent.click(priorityRadio);
  await waitFor(() =>
    expect(fetchPains).toHaveBeenCalledWith(
      expect.objectContaining({
        state: 'inProgress',
        team: '算子分队',
        stage: '创建',
        prio: 'P2',
        page: 1,
      }),
      expect.anything()
    )
  );
  rerender(
    <QueryClientProvider client={client}>
      <IssuePainDetailModal
        open
        title="问题总数"
        query={{ repo: 'oam-tools' }}
        stageOptions={[]}
        onClose={() => {}}
        reportHref={() => '/report'}
      />
    </QueryClientProvider>
  );
  await waitFor(() => {
    const calls = fetchPains.mock.calls.filter(
      ([q]) => q.pageSize === 10 && q.repo === 'oam-tools'
    );
    expect(calls[calls.length - 1]?.[0]).toEqual({
      page: 1,
      pageSize: 10,
      repo: 'oam-tools',
      stage: undefined,
      prio: undefined,
      trackingStatus: undefined,
    });
  });
});
