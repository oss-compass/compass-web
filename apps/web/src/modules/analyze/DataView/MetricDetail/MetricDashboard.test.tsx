import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import client from '@common/gqlClient';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import { StatusContextProvider } from '@modules/analyze/context';
import AnalysisStatus from '../Status/AnalysisStatus';
import MetricDashboard from './MetricDashboard';

let mockIds = ['a'];
let mockStart = '2026-01-01';
jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('next/router', () => ({
  useRouter: () => ({ query: { slugs: mockIds, range: mockStart } }),
}));
jest.mock('@modules/analyze/hooks/useExtractShortIds', () => ({
  __esModule: true,
  default: () => ({ shortIds: mockIds }),
}));
jest.mock('@modules/analyze/hooks/useQueryDateRange', () => ({
  __esModule: true,
  default: () => ({ timeStart: mockStart, timeEnd: '2026-06-01' }),
}));
jest.mock('@common/gqlClient', () => ({
  __esModule: true,
  default: { request: jest.fn() },
}));
jest.mock('@common/utils', () => ({
  ...jest.requireActual('@common/utils/number'),
  getPathname: (label: string) => label,
  compareIdsJoin: (ids: string[]) => ids.join('...'),
}));

const request = client.request as jest.Mock;
const analysis = (status = 'success', id = 'a') => ({
  analysisStatusVerify: {
    label: `https://github.com/compass/${id}`,
    level: 'repo',
    shortCode: id,
    collections: [],
    status,
  },
});
const zeroMetrics = {
  contributorsDetailOverview: { contributorAllCount: 0, orgAllCount: 0 },
  issuesDetailOverview: {
    issueCount: 0,
    issueCompletionCount: 0,
    issueCompletionRatio: 0,
    issueUnresponsiveCount: 0,
    issueCommentFrequencyMean: 0,
  },
  pullsDetailOverview: {
    pullCount: 0,
    pullCompletionCount: 0,
    pullCompletionRatio: 0,
    pullUnresponsiveCount: 0,
    commitCount: 0,
  },
};
const pendingText =
  'analyze:the_current_project_is_under_analysis_please_visit';
const metricCalls = () =>
  request.mock.calls.filter(([r]) =>
    r.document.includes('query metricDashboard')
  );
const statusCalls = () =>
  request.mock.calls.filter(([r]) => r.document.includes('query statusVerify'));
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
let queryClient: QueryClient;
function Report({ statusOnly = false }) {
  const status = useLabelStatus();
  return (
    <StatusContextProvider value={status}>
      {statusOnly ? (
        <AnalysisStatus>
          <span>Ready</span>
        </AnalysisStatus>
      ) : (
        <MetricDashboard />
      )}
    </StatusContextProvider>
  );
}
function mount(statusOnly = false) {
  const element = () => (
    <QueryClientProvider client={queryClient}>
      <Report statusOnly={statusOnly} />
    </QueryClientProvider>
  );
  const view = render(element());
  return { ...view, refresh: () => view.rerender(element()) };
}
function valueOf(name: string) {
  return screen.getByText(`analyze:metric_detail:${name}`)
    .previousElementSibling?.textContent;
}
beforeEach(() => {
  mockIds = ['a'];
  mockStart = '2026-01-01';
  request.mockReset();
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
      },
    },
    logger: { log: console.log, warn: console.warn, error: () => {} },
  });
  request.mockImplementation(({ document, variables }) =>
    Promise.resolve(
      document.includes('query statusVerify')
        ? analysis('success', variables.shortCode)
        : zeroMetrics
    )
  );
});
afterEach(() => {
  queryClient.clear();
  jest.useRealTimers();
});

it('shows request loading before the task status is known without requesting metrics', () => {
  request.mockReturnValue(new Promise(() => {}));
  mount();
  expect(
    screen.getByRole('status', { name: 'common:loading' })
  ).toHaveAttribute('aria-busy', 'true');
  expect(metricCalls()).toHaveLength(0);
});
it.each(['pending', 'progress'])(
  'shows %s as analysis in progress without requesting zero metrics',
  async (status) => {
    request.mockResolvedValue(analysis(status));
    mount();
    expect(await screen.findByText(pendingText)).toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
    expect(metricCalls()).toHaveLength(0);
  }
);
it.each(['error', 'canceled', 'unknown'])(
  'shows task status %s as retryable failure, not 404 or progress',
  async (status) => {
    request.mockResolvedValueOnce(analysis(status));
    mount();
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'common:error.something_went_wrong'
    );
    expect(screen.queryByText(pendingText)).not.toBeInTheDocument();
    expect(metricCalls()).toHaveLength(0);
    fireEvent.click(
      screen.getByRole('button', { name: 'common:error.try_again' })
    );
    await waitFor(() => expect(valueOf('contributor_count')).toBe('0'));
  }
);
it('shows a failed status request as retryable failure instead of 404', async () => {
  request.mockRejectedValueOnce(new Error('Network unavailable'));
  mount();
  await screen.findByRole('alert');
  expect(screen.queryByText('common:error.url_404')).not.toBeInTheDocument();
  fireEvent.click(
    screen.getByRole('button', { name: 'common:error.try_again' })
  );
  await waitFor(() => expect(valueOf('contributor_count')).toBe('0'));
});
it('keeps an unsubmitted report distinct from a failed analysis', async () => {
  request.mockResolvedValue(analysis('unsubmit'));
  mount();
  expect(await screen.findByText('common:error.url_404')).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(metricCalls()).toHaveLength(0);
});
it('polls pending and progress until success, then stops polling', async () => {
  jest.useFakeTimers();
  request
    .mockResolvedValueOnce(analysis('pending'))
    .mockResolvedValueOnce(analysis('progress'));
  mount();
  await screen.findByText(pendingText);
  await act(async () => {
    jest.advanceTimersByTime(5000);
  });
  await waitFor(() => expect(statusCalls()).toHaveLength(2));
  await act(async () => {
    jest.advanceTimersByTime(5000);
  });
  await waitFor(() => expect(valueOf('contributor_count')).toBe('0'));
  await act(async () => {
    jest.advanceTimersByTime(15000);
  });
  expect(statusCalls()).toHaveLength(3);
});
it('stops polling when a pending task status request fails', async () => {
  jest.useFakeTimers();
  request
    .mockResolvedValueOnce(analysis('pending'))
    .mockRejectedValueOnce(new Error('Offline'));
  mount();
  await screen.findByText(pendingText);
  await act(async () => {
    jest.advanceTimersByTime(5000);
  });
  await screen.findByRole('alert');
  await act(async () => {
    jest.advanceTimersByTime(15000);
  });
  expect(statusCalls()).toHaveLength(2);
});
it('does not treat a partially verified comparison as ready', async () => {
  mockIds = ['a', 'b'];
  const later = deferred<ReturnType<typeof analysis>>();
  request.mockImplementation(({ variables }) =>
    variables.shortCode === 'a' ? Promise.resolve(analysis()) : later.promise
  );
  mount(true);
  expect(
    screen.getByRole('status', { name: 'common:loading' })
  ).toBeInTheDocument();
  await act(async () => later.resolve(analysis('progress', 'b')));
  expect(await screen.findByText(pendingText)).toBeInTheDocument();
  expect(screen.queryByText('Ready')).not.toBeInTheDocument();
});
it.each(['error', 'unsubmit'])(
  'does not discard a comparison report with status %s',
  async (status) => {
    mockIds = ['a', 'b'];
    request.mockImplementation(({ variables }) =>
      Promise.resolve(
        analysis(
          variables.shortCode === 'a' ? 'success' : status,
          variables.shortCode
        )
      )
    );
    mount(true);
    await screen.findByText(
      status === 'error'
        ? 'common:error.something_went_wrong'
        : 'common:error.url_404'
    );
    expect(screen.queryByText('Ready')).not.toBeInTheDocument();
  }
);
it('separates metric request loading from task progress', async () => {
  request
    .mockResolvedValueOnce(analysis())
    .mockReturnValue(new Promise(() => {}));
  mount();
  await waitFor(() => expect(metricCalls()).toHaveLength(1));
  expect(
    screen.getByRole('status', { name: 'common:loading' })
  ).toBeInTheDocument();
  expect(screen.queryByText(pendingText)).not.toBeInTheDocument();
});
it('retries a failed metric query without presenting empty data or zeroes', async () => {
  request
    .mockResolvedValueOnce(analysis())
    .mockRejectedValueOnce(new Error('GraphQL error'));
  mount();
  await screen.findByRole('alert');
  expect(screen.queryByText('common:no_data')).not.toBeInTheDocument();
  expect(screen.queryByText('0')).not.toBeInTheDocument();
  fireEvent.click(
    screen.getByRole('button', { name: 'common:error.try_again' })
  );
  await waitFor(() => expect(valueOf('contributor_count')).toBe('0'));
  expect(statusCalls()).toHaveLength(1);
});
it.each([
  {},
  {
    contributorsDetailOverview: null,
    issuesDetailOverview: null,
    pullsDetailOverview: null,
  },
  {
    contributorsDetailOverview: { contributorAllCount: null },
    issuesDetailOverview: { issueCount: null },
    pullsDetailOverview: { pullCount: null },
  },
])('shows successful empty data explicitly for %j', async (metrics) => {
  request.mockResolvedValueOnce(analysis()).mockResolvedValueOnce(metrics);
  mount();
  expect(await screen.findByText('common:no_data')).toBeInTheDocument();
  expect(screen.queryByText('0')).not.toBeInTheDocument();
});
it('preserves valid zero counts, averages and completion rates', async () => {
  mount();
  await screen.findByText('analyze:metric_detail:contributor_count');
  for (const name of [
    'contributor_count',
    'org_count',
    'newly_created_issues',
    'unanswered_issue_count',
    'average_comments_count',
    'newly_created_pr_count',
    'unanswered_pr_count',
    'commit_count',
  ]) {
    expect(valueOf(name)).toBe('0');
  }
  expect(valueOf('issue_completion_rate')).toBe('0% (0)');
  expect(valueOf('pr_completion_rate')).toBe('0% (0)');
  expect(screen.queryByText('common:no_data')).not.toBeInTheDocument();
});
it.each([null, undefined])(
  'keeps partial missing values (%s) distinct from zero',
  async (missing) => {
    request.mockResolvedValueOnce(analysis()).mockResolvedValueOnce({
      contributorsDetailOverview: {
        contributorAllCount: missing,
        orgAllCount: 2,
      },
      issuesDetailOverview: {
        issueCount: missing,
        issueCompletionRatio: 0,
        issueCompletionCount: missing,
        issueUnresponsiveCount: missing,
        issueCommentFrequencyMean: missing,
      },
      pullsDetailOverview: {
        pullCount: missing,
        pullCompletionRatio: missing,
        pullUnresponsiveCount: missing,
        commitCount: missing,
      },
    });
    mount();
    await screen.findByText('analyze:metric_detail:contributor_count');
    for (const name of [
      'contributor_count',
      'newly_created_issues',
      'unanswered_issue_count',
      'average_comments_count',
      'newly_created_pr_count',
      'pr_completion_rate',
      'unanswered_pr_count',
      'commit_count',
    ])
      expect(valueOf(name)).toBe('/');
    expect(valueOf('issue_completion_rate')).toBe('0% (/)');
  }
);
it('does not apply a late status response to the newly selected report', async () => {
  const old = deferred<ReturnType<typeof analysis>>();
  request.mockImplementation(({ document, variables }) =>
    document.includes('query statusVerify')
      ? variables.shortCode === 'a'
        ? old.promise
        : Promise.resolve(analysis('progress', 'b'))
      : Promise.resolve(zeroMetrics)
  );
  const view = mount();
  mockIds = ['b'];
  view.refresh();
  await screen.findByText(pendingText);
  await act(async () => old.resolve(analysis('success', 'a')));
  expect(screen.getByText(pendingText)).toBeInTheDocument();
  expect(metricCalls()).toHaveLength(0);
});
it('hides the previous report immediately while the new status is loading', async () => {
  const view = mount();
  await screen.findByText('analyze:metric_detail:contributor_count');
  request.mockReturnValue(new Promise(() => {}));
  mockIds = ['b'];
  view.refresh();
  expect(
    screen.getByRole('status', { name: 'common:loading' })
  ).toBeInTheDocument();
  expect(
    screen.queryByText('analyze:metric_detail:contributor_count')
  ).not.toBeInTheDocument();
});
it('ignores late metric responses when the date range changes', async () => {
  const old = deferred<typeof zeroMetrics>();
  const recent = deferred<typeof zeroMetrics>();
  request.mockImplementation(({ document, variables }) =>
    document.includes('query statusVerify')
      ? Promise.resolve(analysis())
      : variables.beginDate === '2026-01-01'
      ? old.promise
      : recent.promise
  );
  const view = mount();
  await waitFor(() => expect(metricCalls()).toHaveLength(1));
  mockStart = '2026-03-01';
  view.refresh();
  await waitFor(() => expect(metricCalls()).toHaveLength(2));
  await act(async () => recent.resolve(zeroMetrics));
  await waitFor(() => expect(valueOf('contributor_count')).toBe('0'));
  await act(async () =>
    old.resolve({
      ...zeroMetrics,
      contributorsDetailOverview: { contributorAllCount: 999, orgAllCount: 3 },
    })
  );
  expect(valueOf('contributor_count')).toBe('0');
  expect(screen.queryByText('999')).not.toBeInTheDocument();
});
