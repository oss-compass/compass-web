import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import IssueTaskManagementPage from './index';
import { fetchIssueTaskManagementAccess } from '../data';
import { fetchCompassOperatorMe } from '../../../UserJourney/rawData/apiClient';

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { org: 'cann' }, push: jest.fn() }),
}));
jest.mock('../data', () => ({ fetchIssueTaskManagementAccess: jest.fn() }));
jest.mock('../../../UserJourney/rawData/apiClient', () => ({
  fetchCompassOperatorMe: jest.fn(),
  getCompassOperatorToken: () => 'token',
  clearCompassOperatorToken: jest.fn(),
  loginCompassOperator: jest.fn(),
  setCompassOperatorToken: jest.fn(),
}));
jest.mock('../../components/AdminReviewButton', () => () => null);
jest.mock(
  '../../../UserJourney/OverviewDashboard/DashboardStyles',
  () => () => null
);
jest.mock(
  '../../../UserJourney/OverviewDashboard/ManagementModuleNav',
  () => () => null
);
jest.mock(
  '../../../UserJourney/OverviewDashboard/OperatorAccessModal',
  () => () => null
);
jest.mock(
  '../../../UserJourney/TaskManagementPage/WeeklyReportManagementSection',
  () =>
    function MockWeeklyReports() {
      return <div>周报管理内容</div>;
    }
);
jest.mock(
  './RerunManagementSection',
  () =>
    function MockRerunManagement({ repositories }: { repositories: string[] }) {
      return <div>{repositories.join('、')}</div>;
    }
);

const mockFetchUser = jest.mocked(fetchCompassOperatorMe);
const mockAccess = jest.mocked(fetchIssueTaskManagementAccess);

const mount = (admin = false) => {
  mockFetchUser.mockResolvedValue({
    user_id: 'user',
    username: 'user',
    display_name: '用户',
    role: admin ? 'admin' : 'repo_owner',
    enabled: true,
    repo_keys: [],
    repo_names: [],
  });
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, cacheTime: 0 } },
  });
  return render(
    <QueryClientProvider client={client}>
      <IssueTaskManagementPage />
    </QueryClientProvider>
  );
};

afterEach(() => jest.clearAllMocks());

it('shows only rerun tasks for repository owners', async () => {
  mockAccess.mockResolvedValue({ isAdmin: false, repositories: ['cann/demo'] });
  mount();
  expect(
    await screen.findByRole('tab', { name: '重跑任务' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('tab', { name: '周报管理' })
  ).not.toBeInTheDocument();
  expect(screen.getByText('cann/demo')).toBeInTheDocument();
});

it('keeps weekly report management for administrators', async () => {
  mockAccess.mockResolvedValue({
    isAdmin: true,
    repositories: ['cann/demo', 'cann/other'],
  });
  mount(true);
  fireEvent.click(await screen.findByRole('tab', { name: '周报管理' }));
  expect(screen.getByText('周报管理内容')).toBeInTheDocument();
});

it('does not show either management tab when server denies access', async () => {
  mockAccess.mockRejectedValue(new Error('当前账号没有负责的仓库'));
  mount();
  expect(await screen.findByText('当前账号没有负责的仓库')).toBeInTheDocument();
  expect(
    screen.queryByRole('tab', { name: '重跑任务' })
  ).not.toBeInTheDocument();
});

it('hides weekly report entry for a non-admin even if cached access says admin', async () => {
  mockAccess.mockResolvedValue({ isAdmin: true, repositories: ['cann/demo'] });
  mount();
  expect(
    await screen.findByRole('tab', { name: '重跑任务' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('tab', { name: '周报管理' })
  ).not.toBeInTheDocument();
  expect(screen.queryByText('周报管理内容')).not.toBeInTheDocument();
});
