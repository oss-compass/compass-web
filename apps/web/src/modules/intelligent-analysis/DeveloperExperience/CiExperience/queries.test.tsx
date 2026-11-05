import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useCiCatalogQuery,
  useCiDatasetQuery,
  useCiDatasetsQuery,
} from './queries';
import { fetchCiCatalog, fetchCiDataset, fetchCiDatasets } from './api';
jest.mock('./api', () => ({
  fetchCiCatalog: jest.fn(),
  fetchCiDataset: jest.fn(),
  fetchCiDatasets: jest.fn(),
}));

it('does not fetch while disabled and caches repeated overview visits', async () => {
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
  expect(fetchCiDatasets).toHaveBeenCalledTimes(1);
  view.unmount();
  client.clear();
});

it('fetches only catalog and selected repository for report pages', async () => {
  jest.clearAllMocks();
  const client = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  (fetchCiCatalog as jest.Mock).mockResolvedValue([]);
  (fetchCiDataset as jest.Mock).mockResolvedValue({
    dataset: null,
    journey: null,
  });
  const view = renderHook(
    () => ({ catalog: useCiCatalogQuery(), report: useCiDatasetQuery('ge') }),
    { wrapper }
  );
  await waitFor(() => expect(view.result.current.report.isSuccess).toBe(true));
  expect(fetchCiDataset).toHaveBeenCalledWith('ge', expect.any(AbortSignal));
  expect(fetchCiDatasets).not.toHaveBeenCalled();
  view.unmount();
  client.clear();
});
