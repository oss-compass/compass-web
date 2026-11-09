import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useCiReportPageQuery,
  useCiDatasetsQuery,
  useCiPainOverviewQuery,
} from './queries';
import { fetchCiPainOverview } from './overviewApi';
import {
  fetchCiCatalog,
  fetchCiDataset,
  fetchCiDatasets,
  fetchCiReportPage,
} from './api';
jest.mock('./api', () => ({
  fetchCiCatalog: jest.fn(),
  fetchCiDataset: jest.fn(),
  fetchCiDatasets: jest.fn(),
  fetchCiReportPage: jest.fn(),
}));
jest.mock('./overviewApi', () => ({ fetchCiPainOverview: jest.fn() }));

it('does not fetch while disabled and refreshes combined scores and pain statuses on return', async () => {
  const client = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  (fetchCiDatasets as jest.Mock).mockResolvedValue({
    catalog: [],
    datasets: {},
    journeys: {},
  });
  const view = renderHook(({ enabled }) => useCiDatasetsQuery(enabled), {
    wrapper,
    initialProps: { enabled: false },
  });
  expect(fetchCiDatasets).not.toHaveBeenCalled();
  view.rerender({ enabled: true });
  await waitFor(() => expect(view.result.current.isSuccess).toBe(true));
  view.rerender({ enabled: false });
  view.rerender({ enabled: true });
  expect(view.result.current.data).toBeDefined();
  await waitFor(() => expect(fetchCiDatasets).toHaveBeenCalledTimes(2));
  view.unmount();
  client.clear();
});

it('loads one report-page request and separates cached observation dates', async () => {
  jest.clearAllMocks();
  const client = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  (fetchCiReportPage as jest.Mock).mockImplementation((repo, day) =>
    Promise.resolve({ repo, selected_day: day, catalog: [] })
  );
  const view = renderHook(({ day }) => useCiReportPageQuery('ge', day), {
    wrapper,
    initialProps: { day: '2026-11-01' },
  });
  await waitFor(() => expect(view.result.current.isSuccess).toBe(true));
  expect(fetchCiReportPage).toHaveBeenCalledWith(
    'ge',
    '2026-11-01',
    expect.any(AbortSignal)
  );
  view.rerender({ day: '2026-11-02' });
  await waitFor(() =>
    expect(view.result.current.data?.selected_day).toBe('2026-11-02')
  );
  view.rerender({ day: '2026-11-01' });
  expect(view.result.current.data?.selected_day).toBe('2026-11-01');
  expect(fetchCiReportPage).toHaveBeenCalledTimes(2);
  expect(fetchCiCatalog).not.toHaveBeenCalled();
  expect(fetchCiDataset).not.toHaveBeenCalled();
  expect(fetchCiDatasets).not.toHaveBeenCalled();
  view.unmount();
  client.clear();
});

it('does not fetch pain statuses for disabled modules and refreshes them when returning to the overview', async () => {
  const read = fetchCiPainOverview as jest.Mock;
  read.mockReset().mockResolvedValue({ reports: [] });
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  const view = renderHook(({ enabled }) => useCiPainOverviewQuery(enabled), {
    wrapper,
    initialProps: { enabled: false },
  });
  expect(fetchCiPainOverview).not.toHaveBeenCalled();
  view.rerender({ enabled: true });
  await waitFor(() => expect(view.result.current.isSuccess).toBe(true));
  view.unmount();
  const utils = renderHook(() => useCiPainOverviewQuery(), { wrapper });
  await waitFor(() => expect(read).toHaveBeenCalledTimes(2));
  utils.unmount();
  client.clear();
});
