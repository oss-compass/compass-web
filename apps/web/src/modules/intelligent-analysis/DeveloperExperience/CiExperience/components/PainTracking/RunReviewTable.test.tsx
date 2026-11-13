import React, { act, useState } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RunReviewTable from './RunReviewTable';
import { CiRuleReviewProvider } from '../RuleReviews';
import {
  fetchRunRuleReviews,
  savePainRunReview,
  savePainRunReviews,
  RunReviewError,
  type CiRunRuleReview,
} from '../../ruleReviews';
import type { CiProblem } from '../../types';
import { trackingProblemKey } from './model';

jest.mock('../../ruleReviews', () => ({
  ...jest.requireActual('../../ruleReviews'),
  fetchRunRuleReviews: jest.fn(),
  savePainRunReview: jest.fn(),
  savePainRunReviews: jest.fn(),
}));
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));
const fetchRows = fetchRunRuleReviews as jest.MockedFunction<
  typeof fetchRunRuleReviews
>;
const save = savePainRunReview as jest.MockedFunction<typeof savePainRunReview>;
const saveBatch = savePainRunReviews as jest.MockedFunction<
  typeof savePainRunReviews
>;
const onTracking = jest.fn();
const scope = { org: 'cann', repo: 'repo', workflow: 'wf', day: '2026-11-01' };
const problem: CiProblem = {
  pri: 'P1',
  dim: '稳定性',
  dimkey: 'stability',
  kb: 'compile',
  cls: '代码失败',
  mech: '编译',
  owner: '代码',
  title: '编译失败',
  stages: {},
  root: { status: 'pending' },
  impact: { runs: 2, prs: 1, streak_days: 1, window_total: 2 },
  runs: [1, 2].map((n) => ({
    id: `run${n}`,
    n,
    pr: '1',
    t: '12:00',
    stage: 'Compile',
    job: 'build',
    msg: `error ${n}`,
  })),
};
const rows: CiRunRuleReview[] = problem.runs.map((run, index) => ({
  instance_id: String(index + 1).repeat(64),
  problem_key: trackingProblemKey(problem),
  title: problem.title,
  dim: problem.dim,
  kb: problem.kb,
  run,
  rule_id: 'code/compile/1',
  rule_status: 'matched',
  rule: {
    rule_id: 'code/compile/1',
    version: 'v55',
    pattern: 'compile error',
    desc: '编译判据说明',
  },
  status: 'pending',
  decision: null,
  history: [],
  evidence: { sig: 'compile error' },
  revision: 0,
  evidence_revision: 'a'.repeat(64),
}));

function Harness({ inputProblem = problem }: { inputProblem?: CiProblem }) {
  const [operator, setOperator] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  return (
    <RunReviewTable
      problem={inputProblem}
      scope={scope}
      operator={operator}
      operatorField={
        <label>
          提交人
          <input
            aria-label="提交人"
            value={operator}
            onChange={(event) => setOperator(event.target.value)}
          />
          <span>{error}</span>
        </label>
      }
      busy={busy}
      onBusy={setBusy}
      onOperatorInvalid={setError}
      rememberOperator={(value) => value.trim()}
      onTracking={onTracking}
    />
  );
}
function page(inputProblem = problem) {
  const client = new QueryClient({
    defaultOptions: { queries: { retryDelay: 0, cacheTime: 0 } },
  });
  return render(
    <QueryClientProvider client={client}>
      <CiRuleReviewProvider repo="repo" day={scope.day}>
        <Harness inputProblem={inputProblem} />
      </CiRuleReviewProvider>
    </QueryClientProvider>
  );
}
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
  const getComputedStyle = window.getComputedStyle;
  window.getComputedStyle = (element) => getComputedStyle(element);
});
beforeEach(() => {
  jest.clearAllMocks();
  fetchRows.mockResolvedValue({ items: rows });
  save.mockResolvedValue({
    data: { instance_id: rows[0].instance_id },
    tracking: null,
  });
  saveBatch.mockImplementation(async (payload) => ({
    items: payload.items.map((item) => ({
      instance_id: item.instance_id,
      ok: true,
    })),
    succeeded_count: payload.items.length,
    failed_count: 0,
    tracking: null,
  }));
});

test('keeps selection across pages and submits only the two selected runs', async () => {
  const manyRuns = Array.from({ length: 12 }, (_, index) => ({
    ...problem.runs[0],
    id: `run${index + 1}`,
    n: index + 1,
  }));
  const manyReviews = manyRuns.map((run, index) => ({
    ...rows[0],
    run,
    instance_id: (index + 1).toString(16).padStart(64, '0'),
  }));
  fetchRows.mockResolvedValue({ items: manyReviews });
  page({ ...problem, runs: manyRuns });
  await screen.findAllByText('编译判据说明');
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '张三' },
  });
  fireEvent.click(screen.getByRole('checkbox', { name: '选择执行记录 #1' }));
  fireEvent.click(screen.getByTitle('Next Page'));
  fireEvent.click(
    await screen.findByRole('checkbox', { name: '选择执行记录 #11' })
  );
  expect(
    screen.getByRole('status', { name: '执行记录判定进度' })
  ).toHaveTextContent('已选 2 项');
  fireEvent.click(screen.getByRole('button', { name: '批量确认有效' }));
  fireEvent.click(await screen.findByRole('button', { name: '确认提交 2 条' }));
  await screen.findByText('已保存 2/2 条');
  expect(saveBatch).toHaveBeenCalledTimes(1);
  expect(
    saveBatch.mock.calls[0][0].items.map((item) => item.instance_id)
  ).toEqual([manyReviews[0].instance_id, manyReviews[10].instance_id]);
  expect(saveBatch.mock.calls[0][0].operator).toBe('张三');
});

test('batch non-effective decisions require a reason and preserve failed selections', async () => {
  page();
  await screen.findAllByText('编译判据说明');
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '张三' },
  });
  fireEvent.click(screen.getByRole('button', { name: '更多批量操作' }));
  fireEvent.click(
    await screen.findByRole('menuitem', { name: '选择全部待确认（2）' })
  );
  fireEvent.click(screen.getByRole('button', { name: '批量判为非有效' }));
  const confirm = await screen.findByRole('button', { name: '确认提交 2 条' });
  expect(confirm).toBeDisabled();
  fireEvent.change(screen.getByLabelText('批量判定依据'), {
    target: { value: '预期环境行为' },
  });
  saveBatch.mockResolvedValueOnce({
    items: [
      { instance_id: rows[0].instance_id, ok: true },
      { instance_id: rows[1].instance_id, ok: false, error: '记录已更新' },
    ],
    succeeded_count: 1,
    failed_count: 1,
    tracking: null,
  });
  fireEvent.click(confirm);
  await screen.findByText('已保存 1/2 条，请查看失败明细');
  expect(
    screen.getByRole('status', { name: '执行记录判定进度' })
  ).toHaveTextContent('已选 1 项');
  expect(
    screen.getByRole('checkbox', { name: '选择执行记录 #2' })
  ).toBeChecked();
  expect(saveBatch).toHaveBeenCalledWith(
    expect.objectContaining({ action: 'incorrect', reason: '预期环境行为' })
  );
  expect(saveBatch).toHaveBeenCalledTimes(1);
});

test('reviews a single run in the pain table using the shared submitter', async () => {
  page();
  await screen.findAllByText('编译判据说明');
  expect(
    screen.getByRole('columnheader', { name: '判据' })
  ).toBeInTheDocument();
  fireEvent.click(
    screen.getByRole('button', { name: '执行记录 #1：有效问题' })
  );
  expect(save).not.toHaveBeenCalled();
  expect(screen.getByText('请填写提交人')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '张三' },
  });
  fetchRows.mockResolvedValue({
    items: [{ ...rows[0], status: 'confirmed', revision: 1 }, rows[1]],
  });
  fireEvent.click(
    screen.getByRole('button', { name: '执行记录 #1：有效问题' })
  );
  await waitFor(() =>
    expect(
      screen.getByRole('progressbar', { name: '执行记录审核完成进度' })
    ).toHaveAttribute('aria-valuenow', '50')
  );
  expect(save).toHaveBeenCalledTimes(1);
  expect(save).toHaveBeenCalledWith(
    expect.objectContaining({
      ...scope,
      problemKey: trackingProblemKey(problem),
      instance_id: rows[0].instance_id,
      action: 'confirmed',
      operator: '张三',
      revision: 0,
    })
  );
  const otherRun = screen
    .getAllByRole('row')
    .find((row) =>
      within(row).queryByRole('button', { name: '执行记录 #2：有效问题' })
    );
  if (!otherRun) throw new Error('Missing second run');
  expect(within(otherRun).getByText('待确认')).toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: '进入审核' })
  ).not.toBeInTheDocument();
});

test('non-effective decisions require a reason in the confirmation modal and update the shared pain state', async () => {
  page();
  await screen.findAllByText('编译判据说明');
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '张三' },
  });
  fireEvent.click(
    screen.getByRole('button', { name: '执行记录 #2：非有效问题' })
  );
  expect(screen.getByRole('button', { name: '提交判定' })).toBeDisabled();
  fireEvent.change(screen.getByLabelText('执行记录 #2 判断依据'), {
    target: { value: '预期环境行为' },
  });
  const tracking = {
    problemKey: trackingProblemKey(problem),
    status: 'confirmed' as const,
    revision: 1,
    updatedAt: '',
    history: [],
  };
  save.mockResolvedValueOnce({
    data: { instance_id: rows[1].instance_id },
    tracking,
  });
  fireEvent.click(screen.getByRole('button', { name: '提交判定' }));
  await waitFor(() => expect(onTracking).toHaveBeenCalledWith(tracking));
  expect(save).toHaveBeenCalledWith(
    expect.objectContaining({
      instance_id: rows[1].instance_id,
      action: 'incorrect',
      reason: '预期环境行为',
    })
  );
});

test('stale reviews show the conflict and refresh without silently resubmitting', async () => {
  page();
  await screen.findAllByText('编译判据说明');
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '张三' },
  });
  save.mockRejectedValueOnce(new RunReviewError('记录已更新，请刷新', 409));
  fireEvent.click(
    screen.getByRole('button', { name: '执行记录 #1：有效问题' })
  );
  await screen.findByText('记录已更新，请刷新');
  expect(save).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(fetchRows).toHaveBeenCalledTimes(2));
});

test('rule details open outside the table without adding expanded rows', async () => {
  page();
  await screen.findAllByText('编译判据说明');
  const table = screen.getByRole('table');
  const rowCount = within(table).getAllByRole('row').length;
  fireEvent.click(
    screen.getAllByRole('button', { name: '查看判据 code/compile/1' })[0]
  );
  await screen.findByText('匹配表达式');
  expect(within(table).queryByText('匹配表达式')).not.toBeInTheDocument();
  expect(within(table).getAllByRole('row')).toHaveLength(rowCount);
});

test('shows loading for the submitting run, blocks repeated clicks and recovers after failure', async () => {
  let rejectRequest: (error: Error) => void = () => {};
  save.mockImplementationOnce(
    () =>
      new Promise((_, reject) => {
        rejectRequest = reject;
      })
  );
  page();
  await screen.findAllByText('编译判据说明');
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '张三' },
  });
  fireEvent.click(screen.getByRole('button', { name: '执行记录 #1 更多操作' }));
  await screen.findByRole('menuitem', { name: '查看判定记录' });
  expect(
    screen.queryByRole('menuitem', { name: '标记证据不足' })
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '更多批量操作' }));
  await screen.findByRole('menuitem', { name: '选择全部待确认（2）' });
  expect(
    screen.queryByRole('menuitem', { name: '批量标记证据不足' })
  ).not.toBeInTheDocument();
  const button = screen.getByRole('button', { name: '执行记录 #1：有效问题' });
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-busy', 'true');
  expect(button).toBeDisabled();
  expect(
    screen.getByRole('button', { name: '执行记录 #2：有效问题' })
  ).toBeDisabled();
  fireEvent.click(button);
  expect(save).toHaveBeenCalledTimes(1);
  await act(async () => rejectRequest(new Error('保存失败')));
  await waitFor(() => {
    expect(button).not.toBeDisabled();
  });
  expect(button).toHaveAttribute('aria-busy', 'false');
  expect(screen.getByText('保存失败')).toBeInTheDocument();
});
