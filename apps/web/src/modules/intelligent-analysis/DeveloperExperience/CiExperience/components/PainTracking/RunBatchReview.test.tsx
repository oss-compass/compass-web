import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RunBatchReview from './RunBatchReview';
import {
  savePainRunReviews,
  RunReviewError,
  type CiRunRuleReview,
} from '../../ruleReviews';

jest.mock('../../ruleReviews', () => ({
  ...jest.requireActual('../../ruleReviews'),
  savePainRunReviews: jest.fn(),
}));
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));
const save = savePainRunReviews as jest.MockedFunction<
  typeof savePainRunReviews
>;
const selected: CiRunRuleReview[] = Array.from({ length: 201 }, (_, index) => ({
  instance_id: index.toString(16).padStart(64, '0'),
  problem_key: 'problem',
  title: 'problem',
  dim: '稳定性',
  kb: 'kb',
  run: {
    id: `run${index}`,
    n: index,
    pr: '',
    t: '',
    stage: 'Compile',
    job: 'build',
    msg: 'error',
  },
  rule_id: null,
  rule_status: 'unlinked',
  rule: null,
  status: 'pending',
  decision: null,
  history: [],
  evidence: {},
  revision: 0,
  evidence_revision: 'a'.repeat(64),
}));
beforeEach(() => jest.clearAllMocks());
test('large selections use at most 100 items per request and stop on network uncertainty', async () => {
  const onSaved = jest.fn();
  const onRefresh = jest.fn().mockResolvedValue(undefined);
  save
    .mockImplementationOnce(async (payload) => ({
      items: payload.items.map((item) => ({
        instance_id: item.instance_id,
        ok: true,
      })),
      succeeded_count: 100,
      failed_count: 0,
      tracking: null,
    }))
    .mockRejectedValueOnce(new RunReviewError('请求超时，请刷新确认', 504));
  render(
    <RunBatchReview
      scope={{ org: 'cann', repo: 'repo', workflow: 'wf', day: '2026-11-01' }}
      problemKey="problem"
      selected={selected}
      pending={selected}
      operator="张三"
      busy={false}
      onOperatorInvalid={jest.fn()}
      rememberOperator={(value) => value}
      onSelectPending={jest.fn()}
      onClear={jest.fn()}
      onSaved={onSaved}
      onBusy={jest.fn()}
      onTracking={jest.fn()}
      onRefresh={onRefresh}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: '批量确认判据正确' }));
  fireEvent.click(
    await screen.findByRole('button', { name: '确认提交 201 条' })
  );
  await screen.findByText('已确认保存 100/201 条，请查看失败明细');
  expect(save).toHaveBeenCalledTimes(2);
  expect(save.mock.calls.map((call) => call[0].items.length)).toEqual([
    100, 100,
  ]);
  expect(onSaved).toHaveBeenCalledWith(
    selected.slice(0, 100).map((row) => row.instance_id)
  );
  fireEvent.click(screen.getByText('查看失败明细'));
  expect(screen.getByText('其余 1 条尚未提交')).toBeInTheDocument();
  await waitFor(() => expect(onRefresh).toHaveBeenCalledTimes(1));
});
