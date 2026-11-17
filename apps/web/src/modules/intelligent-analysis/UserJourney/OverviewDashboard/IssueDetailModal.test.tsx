import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import IssueDetailModal from './IssueDetailModal';
import { downloadFileResponse } from '@common/utils/file';
import {
  fetchOverviewScopedIssues,
  fetchOverviewScopedIssuesCsv,
} from '../rawData/apiClient';

jest.mock('../rawData/apiClient', () => ({
  fetchOverviewScopedIssues: jest.fn(),
  fetchOverviewScopedIssuesCsv: jest.fn(),
  fetchOverviewIssuePage: jest.fn(),
}));
jest.mock('@common/utils/file', () => ({ downloadFileResponse: jest.fn() }));
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Modal: ({
    open,
    title,
    children,
  }: React.PropsWithChildren<{
    open: boolean;
    title: React.ReactNode;
  }>) =>
    open ? (
      <section role="dialog">
        {title}
        {children}
      </section>
    ) : null,
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn(() => ({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  });
});

const fetchRows = jest.mocked(fetchOverviewScopedIssues);
const fetchCsv = jest.mocked(fetchOverviewScopedIssuesCsv);
const download = jest.mocked(downloadFileResponse);
const scope = { team: '团队 A', bucket: 'inProgress' as const };

beforeEach(() => {
  jest.clearAllMocks();
  fetchRows.mockImplementation(async (params) => ({
    items: [],
    total: 61,
    page: params.page,
    size: params.size,
    options: {
      team: [],
      stage: ['构建'],
      severity: [],
      status: ['2', '3'],
      owner: [],
    },
  }));
  fetchCsv.mockResolvedValue({ ok: true } as Response);
});

const renderModal = async () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  render(
    <QueryClientProvider client={client}>
      <IssueDetailModal
        state={{ open: true, title: '团队问题', issues: [], scope }}
        onClose={() => {}}
      />
    </QueryClientProvider>
  );
  await waitFor(() => expect(client.isFetching()).toBe(0));
};

it('exports the filtered full scope when a later page is displayed', async () => {
  await renderModal();
  fireEvent.click(await screen.findByTitle('2'));
  await waitFor(() =>
    expect(fetchRows).toHaveBeenLastCalledWith(
      expect.objectContaining({ page: 2 }),
      expect.anything()
    )
  );
  fireEvent.click(screen.getByRole('button', { name: '筛选阶段' }));
  const stageOption = await screen.findByRole('radio', { name: '构建' });
  fireEvent.click(stageOption);
  await waitFor(() =>
    expect(fetchRows).toHaveBeenLastCalledWith(
      expect.objectContaining({
        page: 1,
        filters: expect.objectContaining({ stage: ['构建'] }),
      }),
      expect.anything()
    )
  );
  await waitFor(() =>
    expect(screen.getByRole('button', { name: '导出' })).toBeEnabled()
  );
  fireEvent.click(screen.getByRole('button', { name: '导出' }));
  await waitFor(() => expect(download).toHaveBeenCalledTimes(1));
  expect(fetchCsv).toHaveBeenCalledWith({
    scope,
    filters: {
      team: [],
      stage: ['构建'],
      severity: [],
      status: [],
      owner: [],
    },
    sort_by: 'team',
    sort_order: 'asc',
  });
  expect(fetchCsv.mock.calls[0][0]).not.toHaveProperty('page');
  expect(fetchCsv.mock.calls[0][0]).not.toHaveProperty('size');
});

it('shows export errors and allows retry without downloading a partial file', async () => {
  fetchCsv.mockRejectedValueOnce(new Error('导出未完整生成'));
  await renderModal();
  fireEvent.click(screen.getByRole('button', { name: '导出' }));
  expect(await screen.findByText('导出未完整生成')).toBeInTheDocument();
  expect(download).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: '导出' }));
  await waitFor(() => expect(download).toHaveBeenCalledTimes(1));
});
