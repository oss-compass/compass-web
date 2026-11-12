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

const renderModal = async () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, cacheTime: 0 } },
  });
  const modal = (
    query: React.ComponentProps<typeof IssuePainDetailModal>['query'],
    title = '进行中'
  ) => (
    <QueryClientProvider client={client}>
      <IssuePainDetailModal
        open
        title={title}
        query={query}
        stageOptions={[]}
        onClose={() => {}}
        reportHref={() => '/report'}
      />
    </QueryClientProvider>
  );
  const { rerender } = render(modal({ state: 'inProgress', team: '算子分队' }));
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
  // API 调用发生时 React Query 尚未提交结果，等待查询结束后再操作筛选。
  await waitFor(() => expect(client.isFetching()).toBe(0));
  return {
    client,
    changeEntry: () => rerender(modal({ repo: 'oam-tools' }, '问题总数')),
  };
};

it('filters concrete statuses within all 61 entry rows and restores the entry on all', async () => {
  const { client } = await renderModal();
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
  await waitFor(() => expect(client.isFetching()).toBe(0));
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
});

it('combines stage and priority filters within the entry scope', async () => {
  await renderModal();
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
});

it('resets pagination when the entry changes', async () => {
  const { changeEntry } = await renderModal();
  fireEvent.click(await screen.findByTitle('2'));
  await waitFor(() =>
    expect(fetchPains).toHaveBeenCalledWith(
      expect.objectContaining({ state: 'inProgress', page: 2, pageSize: 10 }),
      expect.anything()
    )
  );
  changeEntry();
  await waitFor(() =>
    expect(fetchPains).toHaveBeenLastCalledWith(
      expect.objectContaining({ repo: 'oam-tools', page: 1, pageSize: 10 }),
      expect.anything()
    )
  );
});

it.each([
  ['阶段', '创建', 'stage', '创建'],
  ['优先级', 'P2 明显影响', 'prio', 'P2'],
  ['状态', '已修复待复测', 'trackingStatus', '3'],
])(
  'resets the %s filter when the entry changes',
  async (label, option, key, value) => {
    const { changeEntry } = await renderModal();
    fireEvent.click(screen.getByRole('button', { name: `筛选${label}` }));
    fireEvent.click(await screen.findByRole('radio', { name: option }));
    await waitFor(() =>
      expect(fetchPains).toHaveBeenCalledWith(
        expect.objectContaining({
          state: 'inProgress',
          team: '算子分队',
          [key]: value,
        }),
        expect.anything()
      )
    );
    changeEntry();
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
        sort: 'team',
        order: 'asc',
      });
    });
  }
);

it('sorts the full filtered scope on the server and resets the current page', async () => {
  await renderModal();
  fireEvent.click(await screen.findByTitle('2'));
  await waitFor(() =>
    expect(fetchPains).toHaveBeenCalledWith(
      expect.objectContaining({ page: 2, pageSize: 10 }),
      expect.anything()
    )
  );
  fireEvent.click(screen.getByRole('button', { name: /痛点.*↕/ }));
  await waitFor(() =>
    expect(fetchPains).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        sort: 'title',
        order: 'asc',
        state: 'inProgress',
        team: '算子分队',
      }),
      expect.anything()
    )
  );
  fireEvent.click(screen.getByRole('button', { name: /痛点.*↑/ }));
  await waitFor(() =>
    expect(fetchPains).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1, sort: 'title', order: 'desc' }),
      expect.anything()
    )
  );
});
