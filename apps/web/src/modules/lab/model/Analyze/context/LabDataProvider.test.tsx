import React, { act, useContext } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import type { NextRouter } from 'next/router';
import {
  LabModelVersionReportDetailQuery,
  useLabModelVersionReportDetailQuery,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Level } from '@common/constant';
import useVerifiedItems from '../hooks/useVerifiedItems';
import useLabDataMetric from '../hooks/useLabDataMetric';
import LabDataProvider, { ChartsDataContext } from './LabDataProvider';

jest.mock('../hooks/useVerifiedItems', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('@modules/analyze/hooks/useQueryDateRange', () => ({
  __esModule: true,
  default: () => ({ timeStart: '2026-01-01', timeEnd: '2026-10-01' }),
}));

const verifiedItems = useVerifiedItems as jest.MockedFunction<
  typeof useVerifiedItems
>;
const router = {
  query: { model: '1', version: '2' },
} as unknown as NextRouter;
const queryKey = (shortCode: string) =>
  useLabModelVersionReportDetailQuery.getKey({
    modelId: 1,
    versionId: 2,
    shortCode,
    beginDate: '2026-01-01',
    endDate: '2026-10-01',
  });
const report = (value: number): LabModelVersionReportDetailQuery => ({
  labModelVersionReportDetail: {
    mainScore: { dates: ['2026-09-01'], values: [value], type: 'line' },
    panels: [
      {
        metric: { id: 1, ident: 'activity', category: 'activity' },
        diagrams: [
          {
            tabIdent: 'all',
            type: 'line',
            dates: ['2026-09-01'],
            values: [value],
          },
        ],
      },
    ],
  },
});

// Exercise the same last-report panel selection used by LayoutMetricCards,
// then call the actual hook used by each CardMetric.
const Consumer = () => {
  const context = useContext(ChartsDataContext);
  const { data, loading, pickDataByMetric } = useLabDataMetric();
  const ident = data[data.length - 1]?.panels?.[0]?.metric?.ident;
  let selected = [];
  let error = null;
  try {
    selected = ident ? pickDataByMetric(ident) : [];
  } catch (caught) {
    error = `${caught.name}: ${caught.message}`;
  }
  return (
    <output>
      {JSON.stringify({
        loading,
        labels: data.map((item) => item.label),
        undefinedResults: context.items.filter((item) => !item.result).length,
        selectedLabels: selected.map((item) => item.label),
        selectedValues: selected.map((item) => item.diagrams[0].values),
        error,
      })}
    </output>
  );
};

describe('LabDataProvider report availability', () => {
  let cache: QueryClient;
  let container: HTMLDivElement;
  let root: Root;
  let request: jest.SpyInstance;
  let pending: Map<
    string,
    { resolve: (value: LabModelVersionReportDetailQuery) => void }
  >;

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    cache = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: Infinity,
          staleTime: Infinity,
          refetchOnMount: false,
        },
      },
    });
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    pending = new Map();
    // Only the HTTP transport is replaced. The generated key/fetcher,
    // useQueries, query cache, provider, context and metric hook are real.
    request = jest.spyOn(client, 'request').mockImplementation((options) => {
      const { shortCode } = (options as { variables: { shortCode: string } })
        .variables;
      return new Promise<LabModelVersionReportDetailQuery>((resolve) =>
        pending.set(shortCode, { resolve })
      );
    });
  });

  afterEach(async () => {
    await act(async () => {
      root.unmount();
      pending.forEach(({ resolve }) => resolve(report(0)));
      await Promise.resolve();
    });
    cache.clear();
    request.mockRestore();
    container.remove();
    delete (globalThis as any).IS_REACT_ACT_ENVIRONMENT;
  });

  const mount = async (codes: string[]) => {
    const expectedPending = codes.filter(
      (code) => cache.getQueryData(queryKey(code)) === undefined
    );
    verifiedItems.mockReturnValue({
      compareItems: codes.map((shortCode) => ({
        label: shortCode,
        shortCode,
        name: shortCode,
        level: Level.REPO,
      })),
      slugs: codes.join('..'),
    });
    await act(async () => {
      root.render(
        <QueryClientProvider client={cache}>
          <RouterContext.Provider value={router}>
            <LabDataProvider>
              <Consumer />
            </LabDataProvider>
          </RouterContext.Provider>
        </QueryClientProvider>
      );
    });
    expect([...pending.keys()].sort()).toEqual(expectedPending.sort());
    expectedPending.forEach((code) => {
      expect(cache.getQueryState(queryKey(code)).status).toBe('loading');
    });
  };
  const snapshot = () =>
    JSON.parse(container.querySelector('output').textContent);

  it('keeps an empty comparison idle', async () => {
    await mount([]);
    expect(snapshot()).toMatchObject({
      loading: false,
      labels: [],
      error: null,
    });
    expect(request).not.toHaveBeenCalled();
  });

  it('keeps all pending reports loading without publishing undefined results', async () => {
    await mount(['first', 'second']);
    expect(snapshot()).toMatchObject({
      loading: true,
      labels: [],
      undefinedResults: 0,
      error: null,
    });
    expect(cache.getQueryState(queryKey('first')).status).toBe('loading');
    expect(cache.getQueryState(queryKey('second')).status).toBe('loading');
    expect(request).toHaveBeenCalledTimes(2);
  });

  it('renders ready metric panels when an earlier report is still pending', async () => {
    cache.setQueryData(queryKey('second'), report(2));
    await mount(['first', 'second']);
    expect(snapshot()).toMatchObject({
      loading: true,
      labels: ['second'],
      selectedLabels: ['second'],
      selectedValues: [[2]],
      error: null,
    });
  });

  it('retains the ready report when the last comparison is still pending', async () => {
    cache.setQueryData(queryKey('first'), report(1));
    await mount(['first', 'second']);
    expect(snapshot()).toMatchObject({
      loading: true,
      labels: ['first'],
      selectedLabels: ['first'],
      selectedValues: [[1]],
      error: null,
    });
  });

  it('preserves all ready reports in comparison order', async () => {
    cache.setQueryData(queryKey('second'), report(2));
    cache.setQueryData(queryKey('first'), report(1));
    await mount(['first', 'second']);
    expect(snapshot()).toMatchObject({
      loading: false,
      labels: ['first', 'second'],
      selectedValues: [[1], [2]],
      error: null,
    });
    expect(request).not.toHaveBeenCalled();
  });

  it('retains a successful report with an empty panel list', async () => {
    cache.setQueryData(queryKey('first'), {
      labModelVersionReportDetail: { panels: [], mainScore: null },
    });
    await mount(['first']);
    expect(snapshot()).toMatchObject({
      loading: false,
      labels: ['first'],
      selectedLabels: [],
      error: null,
    });
  });

  it('omits a successful response with no report without staying loading', async () => {
    cache.setQueryData(queryKey('first'), {
      labModelVersionReportDetail: null,
    });
    await mount(['first']);
    expect(snapshot()).toMatchObject({
      loading: false,
      labels: [],
      error: null,
    });
  });

  it('restores the original order when a pending report completes', async () => {
    cache.setQueryData(queryKey('second'), report(2));
    await mount(['first', 'second']);
    expect(snapshot()).toMatchObject({ loading: true, error: null });
    await act(async () => {
      pending.get('first').resolve(report(1));
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(snapshot()).toMatchObject({
      loading: false,
      labels: ['first', 'second'],
      selectedValues: [[1], [2]],
      error: null,
    });
    expect(cache.getQueryData(queryKey('first'))).toEqual(report(1));
    expect(cache.getQueryData(queryKey('second'))).toEqual(report(2));
  });
});
