import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  CiProblemRuleSummary,
  CiRuleReviewProvider,
  CiRunRuleCell,
} from './RuleReviews';
import { fetchRunRuleReviews, type CiRunRuleReview } from '../ruleReviews';
import type { CiProblem } from '../types';

jest.mock('../ruleReviews', () => ({
  ...jest.requireActual('../ruleReviews'),
  fetchRunRuleReviews: jest.fn(),
}));
const fetchReviews = fetchRunRuleReviews as jest.MockedFunction<
  typeof fetchRunRuleReviews
>;
const problem: CiProblem = {
  pri: 'P1',
  dim: '稳定性',
  kb: 'compile',
  cls: '代码失败',
  mech: '编译',
  owner: '代码',
  title: '编译失败',
  stages: {},
  dimkey: 'stability',
  root: { status: 'pending' },
  impact: { runs: 2, prs: 1, streak_days: 1, window_total: 2 },
  runs: [
    {
      id: 'run1',
      n: 1,
      pr: '1',
      t: '12:00',
      stage: 'Compile',
      job: 'build',
      msg: 'compile error',
    },
  ],
};
const row: CiRunRuleReview = {
  instance_id: 'instance-1',
  problem_key: 'problem',
  title: problem.title,
  dim: problem.dim,
  kb: problem.kb,
  run: problem.runs[0],
  rule_id: 'code/compile/1',
  rule_status: 'matched',
  rule: {
    rule_id: 'code/compile/1',
    version: 'v55',
    pattern: 'compile error',
    desc: '编译判据说明',
  },
  status: 'needs_review',
  decision: null,
  history: [],
  evidence: { sig: 'compile error' },
  revision: 0,
  evidence_revision: 'a'.repeat(64),
};

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
beforeEach(() => jest.clearAllMocks());

function view(repo = 'repo') {
  return (
    <CiRuleReviewProvider key={repo} repo={repo} day="2026-11-01">
      <CiProblemRuleSummary problem={problem} />
      <CiRunRuleCell problem={problem} run={problem.runs[0]} />
    </CiRuleReviewProvider>
  );
}
function client() {
  return new QueryClient({
    defaultOptions: { queries: { retryDelay: 0, cacheTime: 0 } },
  });
}

test('shows rule in the report without an internal review link', async () => {
  fetchReviews.mockResolvedValue({ items: [row] });
  render(<QueryClientProvider client={client()}>{view()}</QueryClientProvider>);
  await screen.findByText('已确认 0/1');
  expect(screen.getByText('code/compile/1 · v55')).toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: '进入审核' })
  ).not.toBeInTheDocument();
});

test('switching reports clears previous review data', async () => {
  fetchReviews
    .mockResolvedValueOnce({ items: [row] })
    .mockResolvedValueOnce({ items: [] });
  const queryClient = client();
  const { rerender } = render(
    <QueryClientProvider client={queryClient}>{view()}</QueryClientProvider>
  );
  await screen.findByText('已确认 0/1');
  rerender(
    <QueryClientProvider client={queryClient}>
      {view('other')}
    </QueryClientProvider>
  );
  await screen.findByText('已确认 0/0');
  expect(fetchReviews).toHaveBeenLastCalledWith(
    'other',
    '2026-11-01',
    expect.any(AbortSignal)
  );
});

test('failed reads show an error and can be retried without claiming an empty result', async () => {
  fetchReviews.mockRejectedValue(new Error('unavailable'));
  render(<QueryClientProvider client={client()}>{view()}</QueryClientProvider>);
  await screen.findByText('判据与审核读取失败');
  expect(screen.queryByText('已确认 0/0')).not.toBeInTheDocument();
  fetchReviews.mockResolvedValue({ items: [{ ...row, status: 'confirmed' }] });
  fireEvent.click(screen.getByRole('button', { name: '重试' }));
  expect(await screen.findByText('已确认 1/1')).toBeInTheDocument();
});
