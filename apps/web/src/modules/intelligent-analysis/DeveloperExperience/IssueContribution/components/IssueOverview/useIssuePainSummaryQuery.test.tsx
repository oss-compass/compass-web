import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchIssueOverviewPainSummary } from '../../data';
import type { IssueOverviewV2PainSummary } from '../../types';
import { useIssuePainSummaryQuery } from './useIssuePainSummaryQuery';
import { getWeeklyClosureData } from './weeklyClosure';

jest.mock('../../data', () => ({
  fetchIssueOverviewPainSummary: jest.fn(),
}));

const fetchSummary = fetchIssueOverviewPainSummary as jest.MockedFunction<
  typeof fetchIssueOverviewPainSummary
>;
const ready: IssueOverviewV2PainSummary = {
  total: 4,
  counts: { resolved: 1, pending: 3 },
  closeRate: 25,
  priorities: [],
  repoOptions: [],
  stageOptions: [],
  periodsReady: true,
  periods: [
    {
      period: '2026-10-19_to_2026-10-25',
      total: 4,
      counts: { resolved: 1, pending: 3 },
      closeRate: 25,
      priorities: [],
    },
  ],
};
const pending = { ...ready, periodsReady: false, periods: [] };

beforeEach(() => {
  jest.useFakeTimers();
  fetchSummary.mockReset();
});

afterEach(() => jest.useRealTimers());

const setup = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, cacheTime: 0 } },
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  return renderHook(() => useIssuePainSummaryQuery('cann'), { wrapper });
};

const advancePoll = async () => {
  await act(async () => {
    jest.advanceTimersByTime(10000);
  });
};

it('polls pending snapshots, updates the shared trends and stops when ready', async () => {
  fetchSummary
    .mockResolvedValueOnce(pending)
    .mockResolvedValueOnce(pending)
    .mockResolvedValue(ready);
  const { result } = setup();
  await waitFor(() => expect(result.current.data).toEqual(pending));
  expect(getWeeklyClosureData(result.current.data).trend.values).toEqual([]);
  await advancePoll();
  expect(fetchSummary).toHaveBeenCalledTimes(2);
  await advancePoll();
  await waitFor(() => expect(result.current.data).toEqual(ready));
  expect(getWeeklyClosureData(result.current.data).trend.values).toEqual([25]);
  await advancePoll();
  expect(fetchSummary).toHaveBeenCalledTimes(3);
  expect(fetchSummary).toHaveBeenLastCalledWith('cann', expect.anything());
});

it('does not poll a snapshot that is already ready', async () => {
  fetchSummary.mockResolvedValue(ready);
  const { result } = setup();
  await waitFor(() => expect(result.current.data).toEqual(ready));
  await advancePoll();
  expect(fetchSummary).toHaveBeenCalledTimes(1);
});

it('stops polling after leaving the page', async () => {
  fetchSummary.mockResolvedValue(pending);
  const { result, unmount } = setup();
  await waitFor(() => expect(result.current.data).toEqual(pending));
  unmount();
  await advancePoll();
  expect(fetchSummary).toHaveBeenCalledTimes(1);
});
