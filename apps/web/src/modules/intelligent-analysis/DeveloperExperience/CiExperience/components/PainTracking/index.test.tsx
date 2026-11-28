import React from 'react';
import toast from 'react-hot-toast';
import {
  act,
  configure,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  CiPainTrackingButton,
  CiPainTrackingProvider,
  findStepTime,
  useCiPainListNavigation,
} from './index';
import { fetchTrackings, saveTracking, TrackingApiError } from './api';
import { trackingProblemKey } from './model';
import type { TrackingRecord } from './model';
import type { CiProblem } from '../../types';
import { fetchRunRuleReviews, savePainRunReview } from '../../ruleReviews';
import { CiRuleReviewProvider } from '../RuleReviews';
import { formatTrackingTime } from '../../../IssueContribution/components/PainTrackingModal/utils';

jest.mock('./api', () => ({
  fetchTrackings: jest.fn(),
  saveTracking: jest.fn(),
  TrackingApiError: class extends Error {
    constructor(message: string, public status: number) {
      super(message);
    }
  },
}));
jest.mock('../../ruleReviews', () => ({
  ...jest.requireActual('../../ruleReviews'),
  fetchRunRuleReviews: jest.fn(),
  savePainRunReview: jest.fn(),
}));
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.setTimeout(120000);
configure({ asyncUtilTimeout: 10000 });

const scope = {
  org: 'cann',
  repo: 'runtime',
  workflow: 'runtime_action',
  day: '2026-09-15',
};
const problem: CiProblem = {
  kb: '执行失败',
  title: '同一步骤多次失败',
  dimkey: 'stability',
  dim: '稳定性',
  pri: 'P0',
  cls: '待定',
  mech: '执行失败',
  owner: '待确认',
  stages: { Compile: 2 },
  impact: { runs: 2, prs: 1, streak_days: 1, window_total: 2 },
  runs: [],
  root: { status: 'pending' },
};
const runProblem: CiProblem = {
  ...problem,
  runs: [
    {
      n: 1,
      id: '101',
      pr: '1',
      t: '',
      stage: 'Compile',
      job: 'build',
      msg: '执行失败',
    },
  ],
};
const confirmed: TrackingRecord = {
  problemKey: trackingProblemKey(problem),
  status: 'confirmed',
  revision: 1,
  updatedAt: '2026-09-15T10:00:00Z',
  history: [
    {
      action: 'confirm',
      from: 'pending',
      to: 'confirmed',
      operator: '张三',
      reason: '',
      at: '2026-09-15T10:00:00Z',
    },
  ],
};
const mockedFetch = fetchTrackings as jest.Mock;
const mockedSave = saveTracking as jest.Mock;

const page = (day = scope.day, problems = [problem]) => (
  <CiPainTrackingProvider
    key={day}
    scope={{ ...scope, day }}
    repo="runtime"
    problems={problems}
  >
    <CiPainTrackingButton problem={problems[0]} />
  </CiPainTrackingProvider>
);

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
  // antd 测量滚动条会传入伪元素，jsdom 只支持普通元素样式。
  const getComputedStyle = window.getComputedStyle;
  window.getComputedStyle = (element) => getComputedStyle(element);
});

beforeEach(() => {
  jest.clearAllMocks();
  mockedSave.mockReset();
  localStorage.clear();
  mockedFetch.mockResolvedValue({ items: [] });
});

const openModal = async () => {
  await act(async () => {
    await Promise.resolve();
  });
  await waitFor(() =>
    expect(
      screen.getAllByRole('button', {
        name: /待确认|进行中|状态加载失败/,
      })[0]
    ).toBeEnabled()
  );
  fireEvent.click(
    screen.getAllByRole('button', {
      name: /待确认|进行中|状态加载失败/,
    })[0]
  );
};
it('shows legacy and structured evidence in the pain management dialog', async () => {
  const reportProblem: CiProblem = {
    ...problem,
    root: {
      ...problem.root,
      evidence: [
        '历史证据文本',
        { step: '编译', line: 42, text: '缺少构建依赖' },
      ],
    },
  };
  render(page(scope.day, [reportProblem]));
  await openModal();

  const modal = within(await screen.findByRole('dialog', { name: '痛点管理' }));
  expect(modal.getByText('历史证据文本')).toBeInTheDocument();
  expect(modal.getByText('编译 · L42：缺少构建依赖')).toBeInTheDocument();
});

it('changes the responsible party before the rule reviews are complete', async () => {
  const original = { ...runProblem, responsible_party: '业务团队' };
  mockedSave.mockResolvedValueOnce({
    data: {
      problemKey: trackingProblemKey(original),
      status: 'pending',
      responsibleParty: '平台',
      revision: 1,
      updatedAt: '2026-09-15T10:00:00Z',
      history: [],
    },
  });
  render(page(scope.day, [original]));
  await openModal();

  const dialog = within(screen.getByRole('dialog', { name: '痛点管理' }));
  const responsibility = within(dialog.getByRole('group', { name: '责任方' }));
  expect(responsibility.getByText('业务团队')).toBeInTheDocument();
  const editParty = responsibility.getByRole('button', { name: '更改' });
  fireEvent.click(editParty);
  const choices = within(
    await screen.findByRole('radiogroup', { name: '新责任方' })
  );
  expect(choices.getAllByRole('radio')).toHaveLength(3);
  expect(choices.getByRole('radio', { name: '开发者' })).toBeInTheDocument();
  expect(choices.getByRole('radio', { name: '业务团队' })).toBeChecked();
  fireEvent.click(choices.getByRole('radio', { name: '平台' }));
  expect(mockedSave).not.toHaveBeenCalled();
  expect(dialog.getByRole('textbox', { name: '提交人' })).toHaveFocus();
  await waitFor(() =>
    expect(editParty).toHaveAttribute('aria-expanded', 'false')
  );

  fireEvent.change(dialog.getByRole('textbox', { name: '提交人' }), {
    target: { value: '张三' },
  });
  fireEvent.click(editParty);
  fireEvent.click(await screen.findByRole('radio', { name: '平台' }));
  expect(await responsibility.findByText('平台')).toBeInTheDocument();
  await waitFor(() =>
    expect(editParty).toHaveAttribute('aria-expanded', 'false')
  );
  expect(mockedSave).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'change_responsible_party',
      responsibleParty: '平台',
      operator: '张三',
      revision: 0,
    })
  );
  fireEvent.click(dialog.getByRole('button', { name: 'Close' }));
  expect(await screen.findByRole('cell', { name: '平台' })).toBeInTheDocument();
});

it('asks for the submitter, then all run reviews, then an explicit overall conclusion', async () => {
  const commonProblem = {
    ...runProblem,
    is_common_issue: true,
    runs: [runProblem.runs[0], { ...runProblem.runs[0], id: 'run2', n: 2 }],
  };
  const items = commonProblem.runs.map((run) => ({
    instance_id: String(run.n).repeat(64),
    problem_key: trackingProblemKey(commonProblem),
    title: commonProblem.title,
    dim: commonProblem.dim,
    kb: commonProblem.kb,
    run,
    rule_id: 'compile',
    rule_status: 'matched' as const,
    rule: { rule_id: 'compile', version: 'v1' },
    status: 'pending' as const,
    decision: null,
    history: [],
    evidence: {},
    revision: 0,
    evidence_revision: 'a'.repeat(64),
  }));
  const reviews = jest.mocked(fetchRunRuleReviews);
  reviews.mockResolvedValue({ items });
  const reviewRun = jest.mocked(savePainRunReview);
  reviewRun.mockResolvedValue({
    data: { instance_id: items[0].instance_id },
    tracking: null,
  });
  mockedSave.mockResolvedValueOnce({
    data: { ...confirmed, manualDecision: true },
  });
  const queryClient = new QueryClient({
    defaultOptions: { queries: { cacheTime: 0 } },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <CiRuleReviewProvider repo={scope.repo} day={scope.day}>
        {page(scope.day, [commonProblem])}
      </CiRuleReviewProvider>
    </QueryClientProvider>
  );
  await openModal();

  const dialog = within(screen.getByRole('dialog', { name: '痛点管理' }));
  const section = dialog.getByRole('region', { name: '问题审核' });
  const form = within(section).getByRole('form', { name: '问题审核表单' });
  const operator = within(form).getByRole('textbox', { name: '提交人' });
  const review = within(form).getByRole('region', { name: '判据审核' });
  const validity = within(form).getByRole('radiogroup', {
    name: '是否为有效问题',
  });
  const yes = within(validity).getByRole('radio', { name: '是' });
  const submit = within(form).getByRole('button', { name: '提交' });
  const approveFirst = within(form).getByRole('button', {
    name: '执行记录 #1：判据正确',
  });
  await within(review).findByText('判据待审核');
  expect(operator).toBeRequired();
  expect(validity).toBeRequired();
  expect(validity).toHaveAccessibleDescription(
    '请先完成全部判据审核，再提交问题结论或更新处理状态。'
  );
  expect(approveFirst).toBeDisabled();
  expect(yes).toBeDisabled();
  expect(submit).toBeDisabled();

  fireEvent.change(operator, { target: { value: '张三' } });
  expect(approveFirst).toBeEnabled();
  expect(yes).toBeDisabled();
  reviews.mockResolvedValueOnce({
    items: [{ ...items[0], status: 'confirmed' }, items[1]],
  });
  fireEvent.click(approveFirst);
  await within(form).findByText('1/2');
  expect(yes).toBeDisabled();
  expect(mockedSave).not.toHaveBeenCalled();

  reviews.mockResolvedValueOnce({
    items: [
      { ...items[0], status: 'confirmed' },
      { ...items[1], status: 'confirmed' },
    ],
  });
  fireEvent.click(
    within(form).getByRole('button', { name: '执行记录 #2：判据正确' })
  );
  await waitFor(() => expect(yes).toBeEnabled());
  expect(validity).not.toHaveAccessibleDescription();
  expect(yes).not.toBeChecked();
  expect(submit).toBeDisabled();
  expect(mockedSave).not.toHaveBeenCalled();
  expect(
    dialog.queryByRole('button', { name: '完成修复' })
  ).not.toBeInTheDocument();

  fireEvent.click(yes);
  fireEvent.click(submit);
  expect(await dialog.findByText('调整问题判定')).toBeInTheDocument();
  expect(mockedSave).toHaveBeenCalledWith(
    expect.objectContaining({
      ...scope,
      problemKey: trackingProblemKey(commonProblem),
      type: 'confirm',
      operator: '张三',
    })
  );
  expect(reviewRun).toHaveBeenCalledTimes(2);
});

it('requires evidence for an overall negative decision and allows restoring validity for a common issue', async () => {
  const invalid: TrackingRecord = {
    ...confirmed,
    status: 'invalid',
    manualDecision: true,
    history: [],
  };
  mockedSave.mockResolvedValueOnce({ data: invalid }).mockResolvedValueOnce({
    data: { ...confirmed, manualDecision: true, revision: 2 },
  });
  render(
    page(scope.day, [
      { ...problem, is_common_issue: true, common_issue_type: '环境一致性' },
    ])
  );
  await openModal();

  expect(
    screen.queryByRole('region', { name: '共性问题判断' })
  ).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '张三' },
  });
  const no = screen.getByRole('radio', { name: '否' });
  fireEvent.click(no);
  expect(no).toBeChecked();
  const evidence = screen.getByLabelText('无效问题判断依据');
  expect(evidence).toBeRequired();
  expect(mockedSave).not.toHaveBeenCalled();
  const submit = screen.getByRole('button', { name: '提交' });
  fireEvent.change(evidence, { target: { value: '   ' } });
  fireEvent.click(submit);
  expect(await screen.findByText('请填写判断依据')).toBeInTheDocument();
  expect(mockedSave).not.toHaveBeenCalled();
  fireEvent.change(evidence, { target: { value: '重复告警' } });
  fireEvent.click(submit);
  fireEvent.click(await screen.findByRole('button', { name: '调整问题判定' }));
  fireEvent.click(screen.getByRole('checkbox', { name: '是' }));
  const restore = screen.getByRole('button', { name: '保存判定' });
  expect(mockedSave).toHaveBeenCalledWith(
    expect.objectContaining({ type: 'mark_invalid', reason: '重复告警' })
  );

  fireEvent.click(restore);
  expect(
    await within(screen.getByRole('dialog')).findByText('进行中（观测中）')
  ).toBeInTheDocument();
  expect(mockedSave).toHaveBeenLastCalledWith(
    expect.objectContaining({ type: 'restore_valid', revision: 1 })
  );
});

it('enters automatic observation on confirmation and displays the refreshed repair result', async () => {
  const observation = {
    daysRequired: 7,
    cleanDays: 0,
    lastSeenDay: scope.day,
    fixedOn: null,
  };
  mockedSave.mockResolvedValueOnce({ data: { ...confirmed, observation } });
  render(page());
  await openModal();
  expect(
    screen.queryByRole('button', { name: '重跑（暂未开放）' })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: '完成修复' })
  ).not.toBeInTheDocument();
  expect(screen.getByText('是否为有效问题')).toBeInTheDocument();
  expect(screen.getByRole('radio', { name: '是' })).not.toBeChecked();
  expect(screen.getByRole('radio', { name: '否' })).not.toBeChecked();
  const submit = screen.getByRole('button', { name: '提交' });
  expect(submit).toBeDisabled();
  expect(screen.getByText('请先填写提交人。')).toBeInTheDocument();
  expect(mockedSave).not.toHaveBeenCalled();
  expect(screen.queryByLabelText('无效问题判断依据')).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '张三' },
  });
  fireEvent.click(screen.getByRole('radio', { name: '是' }));
  fireEvent.click(submit);
  expect(await screen.findByText('观测进度 0/7 天')).toBeInTheDocument();
  expect(mockedSave).toHaveBeenCalledWith(
    expect.objectContaining({
      ...scope,
      type: 'confirm',
      revision: 0,
      operator: '张三',
      reason: '',
    })
  );
  expect(toast.success).toHaveBeenCalledWith(
    '已确认有效问题，当前状态为「进行中（观测中）」'
  );
  expect(
    within(screen.getByRole('dialog')).getByText('进行中（观测中）')
  ).toBeInTheDocument();
  expect(screen.getByLabelText('待确认时间')).toHaveTextContent(
    formatTrackingTime(confirmed.history[0].at)
  );
  const review = within(screen.getByRole('region', { name: '问题审核' }));
  expect(review.getByText('已完成')).toBeInTheDocument();
  const conclusion = within(
    review.getByRole('group', { name: '是否为有效问题' })
  );
  const savedYes = conclusion.getByRole('checkbox', { name: '是' });
  const savedNo = conclusion.getByRole('checkbox', { name: '否' });
  expect(savedYes).toBeChecked();
  expect(savedYes).toBeDisabled();
  expect(savedNo).not.toBeChecked();
  expect(savedNo).toBeDisabled();

  fireEvent.click(review.getByRole('button', { name: '调整问题判定' }));
  expect(savedNo).toBeEnabled();
  fireEvent.click(savedNo);
  expect(savedNo).toBeChecked();
  expect(savedYes).not.toBeChecked();
  expect(review.getByLabelText('无效问题判断依据')).toBeRequired();
  expect(review.getByRole('button', { name: '保存判定' })).toBeDisabled();
  fireEvent.click(review.getByRole('button', { name: '取消调整' }));
  expect(savedYes).toBeChecked();
  expect(savedNo).toBeDisabled();
  expect(
    screen.queryByRole('button', { name: '完成修复' })
  ).not.toBeInTheDocument();
  mockedFetch.mockResolvedValueOnce({
    items: [
      {
        ...confirmed,
        status: 'fixed',
        observation: { ...observation, cleanDays: 7, fixedOn: '2026-09-22' },
      },
    ],
  });
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  fireEvent.click(screen.getByRole('button', { name: '刷新状态' }));
  await waitFor(() =>
    expect(screen.getAllByRole('button', { name: '已修复' })[0]).toBeEnabled()
  );
  fireEvent.click(screen.getAllByRole('button', { name: '已修复' })[0]);
  expect(screen.getByText('已达到修复条件')).toBeInTheDocument();
  expect(screen.getByLabelText('已修复时间')).toHaveTextContent('2026-09-22');
  expect(mockedSave).toHaveBeenCalledTimes(1);
});

it('does not treat a read failure as pending and allows retry', async () => {
  mockedFetch
    .mockRejectedValueOnce(new Error('连接失败'))
    .mockResolvedValueOnce({ items: [confirmed] });
  render(page());
  await screen.findByText('痛点状态加载失败');
  expect(
    screen.getAllByRole('button', {
      name: /待确认|进行中|状态加载失败/,
    })[0]
  ).toBeDisabled();
  fireEvent.click(
    screen.getByRole('button', { name: '执行失败 同一步骤多次失败' })
  );
  const details = screen.getByRole('dialog');
  expect(details).toHaveTextContent('同一步骤多次失败');
  expect(details).toHaveTextContent('处理状态暂不可用');
  expect(within(details).queryByText('待确认')).not.toBeInTheDocument();
  expect(
    within(details).queryByRole('radiogroup', { name: '是否为有效问题' })
  ).not.toBeInTheDocument();
  fireEvent.click(
    within(details).getByRole('button', { name: '重新加载状态' })
  );
  expect(
    await within(details).findByText('进行中（观测中）')
  ).toBeInTheDocument();
  expect(within(details).getByLabelText('提交人')).toBeEnabled();
});

it('keeps input on save failure and reloads a concurrent change without retrying the action', async () => {
  mockedSave
    .mockRejectedValueOnce(new Error('保存失败'))
    .mockRejectedValueOnce(new TrackingApiError('记录已被更新', 409));
  render(page());
  await openModal();
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '张三' },
  });
  fireEvent.click(screen.getByRole('radio', { name: '否' }));
  fireEvent.change(screen.getByLabelText('无效问题判断依据'), {
    target: { value: '已核实执行日志' },
  });
  fireEvent.click(screen.getByRole('button', { name: '提交' }));
  await screen.findByText('保存失败');
  expect(toast.error).toHaveBeenCalledWith('保存失败');
  expect(screen.getByLabelText('无效问题判断依据')).toHaveValue(
    '已核实执行日志'
  );
  mockedFetch.mockResolvedValueOnce({ items: [confirmed] });
  fireEvent.click(screen.getByRole('button', { name: '提交' }));
  await screen.findByText('记录已被更新');
  expect(
    await within(screen.getByRole('dialog')).findByText('进行中（观测中）')
  ).toBeInTheDocument();
  expect(mockedSave).toHaveBeenCalledTimes(2);
  await waitFor(() =>
    expect(screen.queryByLabelText('无效问题判断依据')).not.toBeInTheDocument()
  );
});

it('opens without a selected validity choice after changing report dates', async () => {
  const { rerender } = render(page());
  await openModal();
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '张三' },
  });
  fireEvent.click(screen.getByRole('radio', { name: '否' }));
  expect(screen.getByRole('radio', { name: '否' })).toBeChecked();
  rerender(page('2026-09-16'));
  await waitFor(() =>
    expect(mockedFetch).toHaveBeenLastCalledWith(
      { ...scope, day: '2026-09-16' },
      expect.anything()
    )
  );
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  await openModal();
  expect(screen.getByRole('radio', { name: '是' })).not.toBeChecked();
  expect(screen.getByRole('radio', { name: '否' })).not.toBeChecked();
  expect(screen.queryByLabelText('无效问题判断依据')).not.toBeInTheDocument();
});

it('prefills other pains and report dates with the last successfully submitted operator', async () => {
  const other = { ...problem, title: '构建等待时间过长' };
  mockedSave
    .mockResolvedValueOnce({ data: confirmed })
    .mockRejectedValueOnce(new Error('保存失败'));
  const { rerender } = render(page(scope.day, [problem, other]));
  await openModal();

  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: ' 张三 ' },
  });
  fireEvent.click(screen.getByRole('radio', { name: '是' }));
  fireEvent.click(screen.getByRole('button', { name: '提交' }));
  await within(screen.getByRole('dialog')).findByText('调整问题判定');
  expect(mockedSave).toHaveBeenLastCalledWith(
    expect.objectContaining({ operator: '张三' })
  );
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));

  const openOther = () =>
    fireEvent.click(screen.getByRole('button', { name: /构建等待时间过长/ }));
  openOther();
  expect(screen.getByLabelText('提交人')).toHaveValue('张三');
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '李四' },
  });
  fireEvent.click(screen.getByRole('radio', { name: '是' }));
  fireEvent.click(screen.getByRole('button', { name: '提交' }));
  await screen.findByText('保存失败');
  expect(screen.getByLabelText('提交人')).toHaveValue('李四');
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));

  openOther();
  expect(screen.getByLabelText('提交人')).toHaveValue('张三');
  rerender(page('2026-09-16', [problem, other]));
  await openModal();
  expect(screen.getByLabelText('提交人')).toHaveValue('张三');
});

it('only shows times for states reached in the current flow', () => {
  const fixedRecord: TrackingRecord = {
    problemKey: trackingProblemKey(problem),
    status: 'fixed',
    observation: {
      daysRequired: 7,
      cleanDays: 7,
      lastSeenDay: scope.day,
      fixedOn: '2026-09-22',
    },
    revision: 2,
    updatedAt: '2026-09-15T11:00:00Z',
    history: [
      {
        action: 'confirm',
        from: 'pending',
        to: 'confirmed',
        operator: '张三',
        reason: '',
        at: '2026-09-15T10:00:00Z',
      },
      {
        action: 'mark_fixed',
        from: 'confirmed',
        to: 'fixed',
        operator: '张三',
        reason: '',
        at: '2026-09-15T11:00:00Z',
      },
    ],
  };
  expect(findStepTime(fixedRecord, 'fixed')).toBe('2026-09-22');

  const revertedRecord: TrackingRecord = {
    ...fixedRecord,
    status: 'confirmed',
    observation: null,
    revision: 3,
    history: [
      ...fixedRecord.history,
      {
        action: 'undo_fixed',
        from: 'fixed',
        to: 'confirmed',
        operator: '张三',
        reason: '',
        at: '2026-09-15T12:00:00Z',
      },
    ],
  };
  expect(findStepTime(revertedRecord, 'fixed')).toBeUndefined();
  expect(findStepTime(revertedRecord, 'confirmed')).toBe(
    '2026-09-15T10:00:00Z'
  );

  const resetRecord: TrackingRecord = {
    ...revertedRecord,
    status: 'pending',
    revision: 4,
    history: [
      ...revertedRecord.history,
      {
        action: 'reset',
        from: 'confirmed',
        to: 'pending',
        operator: '张三',
        reason: '',
        at: '2026-09-15T13:00:00Z',
      },
    ],
  };
  expect(findStepTime(resetRecord, 'pending')).toBeUndefined();
  expect(findStepTime(resetRecord, 'confirmed')).toBeUndefined();
  expect(findStepTime(resetRecord, 'fixed')).toBeUndefined();
});

it('filters the unified list, resets filters and opens full descriptions or the matching step', async () => {
  const onResetFilters = jest.fn();
  const onProblemJump = jest.fn();
  const located = {
    ...problem,
    seg: '编译构建',
    responsible_party: '基础设施团队',
    responsible_person: '李四',
  };
  const other = {
    ...problem,
    kb: '另一问题',
    title: '后端效率问题',
    dimkey: 'efficiency' as const,
    pri: 'P1' as const,
  };
  const list = (dimension: 'stability' | null, priority: 'P0' | null) => (
    <CiPainTrackingProvider
      scope={scope}
      repo="runtime"
      problems={[located, other]}
      activeDimension={dimension}
      activePriority={priority}
      onResetFilters={onResetFilters}
      onProblemJump={onProblemJump}
    >
      <span>报告内容</span>
    </CiPainTrackingProvider>
  );
  const { rerender } = render(list('stability', 'P0'));
  await waitFor(() =>
    expect(screen.getByRole('button', { name: /待确认/ })).toBeEnabled()
  );
  expect(screen.queryByText('后端效率问题')).not.toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: '责任方' })).toBeVisible();
  expect(screen.getByRole('columnheader', { name: '责任人' })).toBeVisible();
  const row = screen.getByRole('row', { name: /同一步骤多次失败/ });
  expect(within(row).getByRole('cell', { name: '基础设施团队' })).toBeVisible();
  expect(within(row).getByRole('cell', { name: '李四' })).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: '定位步骤：编译构建' }));
  expect(onProblemJump).toHaveBeenCalledWith(located);
  fireEvent.click(screen.getByRole('button', { name: '重置筛选' }));
  expect(onResetFilters).toHaveBeenCalledTimes(1);
  rerender(list(null, null));
  expect(screen.getByText('后端效率问题')).toBeInTheDocument();
  const legacyRow = screen.getByRole('row', { name: /后端效率问题/ });
  expect(within(legacyRow).getAllByRole('cell', { name: '—' })).toHaveLength(2);
  fireEvent.click(
    screen.getByRole('button', { name: /另一问题 后端效率问题/ })
  );
  expect(screen.getByRole('dialog')).toHaveTextContent('后端效率问题');
  expect(mockedSave).not.toHaveBeenCalled();
});

it('jumps to the full pain list and clears dimension, priority and status filters', async () => {
  const JumpButton = () => {
    const showAllProblems = useCiPainListNavigation();
    return <button onClick={showAllProblems}>查看全部痛点</button>;
  };
  const Wrapper = () => {
    const [dimension, setDimension] = React.useState<'stability' | null>(
      'stability'
    );
    return (
      <CiPainTrackingProvider
        scope={scope}
        repo="runtime"
        problems={[
          problem,
          {
            ...problem,
            kb: '效率问题',
            title: '另一个维度的痛点',
            dimkey: 'efficiency',
            pri: 'P1',
          },
        ]}
        activeDimension={dimension}
        activePriority={dimension ? 'P0' : null}
        onResetFilters={() => setDimension(null)}
      >
        <JumpButton />
      </CiPainTrackingProvider>
    );
  };
  render(<Wrapper />);
  const list = screen.getByRole('region', { name: '痛点问题' });
  const scrollIntoView = jest.fn();
  list.scrollIntoView = scrollIntoView;
  await waitFor(() =>
    expect(screen.getByRole('button', { name: /待确认/ })).toBeEnabled()
  );
  expect(list).not.toHaveTextContent('另一个维度的痛点');
  fireEvent.mouseDown(screen.getByRole('combobox'));
  fireEvent.click(await screen.findByText('已修复（0）'));
  expect(list).not.toHaveTextContent(problem.title);
  fireEvent.click(screen.getByRole('button', { name: '查看全部痛点' }));
  expect(list).toHaveTextContent(problem.title);
  expect(list).toHaveTextContent('另一个维度的痛点');
  expect(scrollIntoView).toHaveBeenCalledWith({
    behavior: 'smooth',
    block: 'start',
  });
  expect(
    screen.queryByRole('button', { name: '重置筛选' })
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '查看全部痛点' }));
  expect(scrollIntoView).toHaveBeenCalledTimes(2);
});
