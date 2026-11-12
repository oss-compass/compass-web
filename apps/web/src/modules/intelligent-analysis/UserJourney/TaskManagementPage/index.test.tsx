import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TaskManagementPage from './index';
import {
  fetchCompassOperatorMe,
  fetchOverviewAllRepoRerunRecords,
} from '../rawData/apiClient';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { org: 'cann' },
    push: jest.fn(),
    back: jest.fn(),
  }),
}));
jest.mock('../rawData/apiClient', () => ({
  fetchCompassOperatorMe: jest.fn(),
  getCompassOperatorToken: () => 'token',
  fetchOverviewAllRepoRerunRecords: jest
    .fn()
    .mockResolvedValue({ items: [], total: 0, page: 1, size: 20 }),
  fetchOverviewRerunNodes: jest.fn().mockResolvedValue({ items: [] }),
  fetchRepoRerunScheduleConfig: jest
    .fn()
    .mockResolvedValue({ schedule_tasks: [] }),
  fetchRepoManagementRegisterOptions: jest
    .fn()
    .mockResolvedValue({ items: [] }),
}));
jest.mock(
  '../../DeveloperExperience/components/AdminReviewButton',
  () => () => null
);
jest.mock('../OverviewDashboard/DashboardStyles', () => () => null);
jest.mock('../OverviewDashboard/ManagementModuleNav', () => () => null);
jest.mock('../OverviewDashboard/OperatorAccessModal', () => () => null);
jest.mock('../OverviewDashboard/utils', () => ({
  getReportDisplayText: () => '',
}));
jest.mock('../OverviewDashboard/RepoRerunComponents', () => ({
  RepoRerunModal: () => null,
  RepoRerunRecordsModal: () => null,
  RerunActionButton: () => null,
  getRerunStatusMeta: () => ({ text: '--' }),
}));
jest.mock('./ScheduledRerunConfigSection', () => () => null);
jest.mock(
  './WeeklyReportManagementSection',
  () =>
    function MockWeeklyReportManagement() {
      return <div>周报管理内容</div>;
    }
);

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

const mount = (role: 'admin' | 'repo_owner') => {
  jest.mocked(fetchCompassOperatorMe).mockResolvedValue({
    user_id: role,
    username: role,
    role,
    display_name: role,
    enabled: true,
    repo_keys: [],
    repo_names: [],
  });
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, cacheTime: 0 } },
  });
  return render(
    <QueryClientProvider client={client}>
      <TaskManagementPage />
    </QueryClientProvider>
  );
};

test('hides the community weekly report entry from repository owners on direct page access', async () => {
  mount('repo_owner');
  expect(await screen.findByText('任务管理')).toBeInTheDocument();
  expect(
    screen.queryByRole('tab', { name: '周报管理' })
  ).not.toBeInTheDocument();
  expect(screen.queryByText('周报管理内容')).not.toBeInTheDocument();
});

test('allows administrators to open community weekly report management', async () => {
  mount('admin');
  fireEvent.click(await screen.findByRole('tab', { name: '周报管理' }));
  expect(screen.getByText('周报管理内容')).toBeInTheDocument();
});

test('requests a global task sort and preserves it when paging', async () => {
  const fetchTasks = jest.mocked(fetchOverviewAllRepoRerunRecords);
  fetchTasks.mockClear();
  fetchTasks.mockResolvedValue({ items: [], total: 61, page: 1, size: 20 });
  mount('admin');
  const heading = (await screen.findAllByText('仓库名称'))[0];
  fireEvent.click(heading);
  await waitFor(() =>
    expect(fetchTasks).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        sortKey: 'repo_name',
        sortOrder: 'asc',
      })
    )
  );
  fireEvent.click(await screen.findByTitle('2'));
  await waitFor(() =>
    expect(fetchTasks).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 2,
        sortKey: 'repo_name',
        sortOrder: 'asc',
      })
    )
  );
  fireEvent.click(heading);
  await waitFor(() =>
    expect(fetchTasks).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        sortKey: 'repo_name',
        sortOrder: 'desc',
      })
    )
  );
});
