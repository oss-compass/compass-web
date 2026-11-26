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
const confirmed = {
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
        name: /待确认|已确认待修复|状态加载失败/,
      })[0]
    ).toBeEnabled()
  );
  fireEvent.click(
    screen.getAllByRole('button', {
      name: /待确认|已确认待修复|状态加载失败/,
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

const enterEvidence = () => {
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '张三' },
  });
  fireEvent.change(screen.getByRole('textbox', { name: /修复说明/ }), {
    target: { value: '已核实执行日志' },
  });
};

it('keeps the report, fields, and run reviews separate and focuses a missing submitter', async () => {
  const runProblem = {
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
  jest.mocked(fetchRunRuleReviews).mockResolvedValue({
    items: [
      {
        instance_id: '1'.repeat(64),
        problem_key: trackingProblemKey(runProblem),
        title: runProblem.title,
        dim: runProblem.dim,
        kb: runProblem.kb,
        run: runProblem.runs[0],
        rule_id: 'compile',
        rule_status: 'matched',
        rule: { rule_id: 'compile', version: 'v1' },
        status: 'pending',
        decision: null,
        history: [],
        evidence: {},
        revision: 0,
        evidence_revision: 'a'.repeat(64),
      },
    ],
  });
  const queryClient = new QueryClient({
    defaultOptions: { queries: { cacheTime: 0 } },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <CiRuleReviewProvider repo={scope.repo} day={scope.day}>
        {page(scope.day, [runProblem])}
      </CiRuleReviewProvider>
    </QueryClientProvider>
  );
  await openModal();

  const dialog = within(screen.getByRole('dialog', { name: '痛点管理' }));
  const information = dialog.getByRole('region', { name: '痛点信息' });
  const handling = dialog.getByRole('region', { name: '处理信息' });
  const executions = dialog.getByRole('region', { name: '执行记录' });
  expect(within(information).getByText(problem.title)).toBeInTheDocument();
  expect(within(information).queryByRole('textbox')).not.toBeInTheDocument();
  const operator = within(handling).getByRole('textbox', { name: '提交人' });
  expect(operator).toBeRequired();
  expect(within(executions).queryByLabelText('提交人')).not.toBeInTheDocument();
  const reviewPrompt = await within(executions).findByText(
    '待确认：请逐条审核判据'
  );
  expect(
    handling.compareDocumentPosition(reviewPrompt) &
      Node.DOCUMENT_POSITION_FOLLOWING
  ).toBeTruthy();
  fireEvent.click(
    within(executions).getByRole('button', { name: '执行记录 #1：判据正确' })
  );
  expect(operator).toHaveFocus();
  expect(operator).toHaveAccessibleDescription('请填写提交人');
  expect(savePainRunReview).not.toHaveBeenCalled();

  const section = within(handling).getByRole('region', {
    name: '共性问题判断',
  });
  expect(
    section.compareDocumentPosition(operator) & Node.DOCUMENT_POSITION_FOLLOWING
  ).toBeTruthy();
  fireEvent.click(within(section).getByText('共性问题参考'));
  expect(within(section).getByText('暂无已知共性问题')).toBeInTheDocument();
  const yes = within(section).getByRole('radio', { name: '是' });
  const no = within(section).getByRole('radio', { name: '否' });
  expect(yes).not.toBeChecked();
  expect(no).not.toBeChecked();

  fireEvent.click(yes);
  expect(yes).toBeChecked();
  expect(within(section).getByText('报告暂无可选类型')).toBeInTheDocument();
  fireEvent.click(no);
  expect(no).toBeChecked();
  expect(within(section).queryByText('共性问题类型')).not.toBeInTheDocument();
  expect(mockedSave).not.toHaveBeenCalled();
});

it('prefills the judgment and lists types supplied by the report', async () => {
  render(
    page(scope.day, [
      { ...problem, is_common_issue: true, common_issue_type: '环境一致性' },
      {
        ...problem,
        title: '日志缺少统一格式',
        common_issue_type: '日志规范',
      },
    ])
  );
  await openModal();

  const section = screen.getByRole('region', { name: '共性问题判断' });
  expect(within(section).getByRole('radio', { name: '是' })).toBeChecked();
  const reportType = within(section).getByRole('radio', { name: '环境一致性' });
  const alternativeType = within(section).getByRole('radio', {
    name: '日志规范',
  });
  expect(reportType).toBeChecked();
  fireEvent.click(within(section).getByText('共性问题参考'));
  expect(
    within(section).getByText('日志规范 · 日志缺少统一格式')
  ).toBeInTheDocument();
  fireEvent.click(alternativeType);
  expect(alternativeType).toBeChecked();
});

it('confirms, manually fixes, shares status across entries and leaves rerun disabled', async () => {
  mockedSave.mockResolvedValueOnce({ data: confirmed }).mockResolvedValueOnce({
    data: { ...confirmed, status: 'fixed', revision: 2 },
  });
  render(page());
  await openModal();
  expect(
    screen.queryByRole('button', { name: '重跑（暂未开放）' })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: '完成修复' })
  ).not.toBeInTheDocument();
  expect(screen.getByText('是否为有效问题')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /是，有效问题/ })).toBeEnabled();
  expect(screen.getByRole('button', { name: /否，非有效问题/ })).toBeEnabled();
  fireEvent.click(screen.getByRole('button', { name: /是，有效问题/ }));
  expect(mockedSave).not.toHaveBeenCalled();
  expect(
    screen.getByText('请先填写提交人，再进行痛点判定')
  ).toBeInTheDocument();
  expect(screen.queryByLabelText('无效问题判断依据')).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '张三' },
  });
  fireEvent.click(screen.getByRole('button', { name: /是，有效问题/ }));
  await waitFor(() =>
    expect(screen.getByRole('button', { name: '完成修复' })).toBeEnabled()
  );
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
    '已确认有效问题，进入「已确认待修复」'
  );
  expect(
    within(screen.getByRole('dialog')).getByText('已确认待修复')
  ).toBeInTheDocument();
  expect(screen.getByLabelText('待确认时间')).toHaveTextContent(
    formatTrackingTime(confirmed.history[0].at)
  );
  enterEvidence();
  fireEvent.click(screen.getByRole('button', { name: '完成修复' }));
  await waitFor(() =>
    expect(screen.getByRole('button', { name: '撤销修复' })).toBeEnabled()
  );
  expect(mockedSave).toHaveBeenLastCalledWith(
    expect.objectContaining({ type: 'mark_fixed', revision: 1 })
  );
  expect(
    screen.getByRole('button', { name: '重跑（暂未开放）' })
  ).toBeDisabled();
  expect(screen.getByText('修复已完成，等待重跑复测')).toBeInTheDocument();
});

it('does not treat a read failure as pending and allows retry', async () => {
  mockedFetch
    .mockRejectedValueOnce(new Error('连接失败'))
    .mockResolvedValueOnce({ items: [confirmed] });
  render(page());
  await screen.findByText('痛点状态加载失败');
  expect(
    screen.getAllByRole('button', {
      name: /待确认|已确认待修复|状态加载失败/,
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
    within(details).queryByRole('button', { name: /是，有效问题/ })
  ).not.toBeInTheDocument();
  fireEvent.click(
    within(details).getByRole('button', { name: '重新加载状态' })
  );
  await waitFor(() =>
    expect(screen.getByRole('button', { name: '完成修复' })).toBeEnabled()
  );
  expect(screen.getByRole('button', { name: '完成修复' })).toBeEnabled();
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
  fireEvent.click(screen.getByRole('button', { name: /否，非有效问题/ }));
  fireEvent.change(screen.getByLabelText('无效问题判断依据'), {
    target: { value: '已核实执行日志' },
  });
  fireEvent.click(screen.getByRole('button', { name: '确认判定' }));
  await screen.findByText('保存失败');
  expect(toast.error).toHaveBeenCalledWith('保存失败');
  expect(screen.getByLabelText('无效问题判断依据')).toHaveValue(
    '已核实执行日志'
  );
  mockedFetch.mockResolvedValueOnce({ items: [confirmed] });
  fireEvent.click(screen.getByRole('button', { name: '确认判定' }));
  await screen.findByText('记录已被更新');
  await waitFor(() =>
    expect(screen.getByRole('button', { name: '完成修复' })).toBeEnabled()
  );
  expect(mockedSave).toHaveBeenCalledTimes(2);
  await waitFor(() =>
    expect(screen.queryByLabelText('无效问题判断依据')).not.toBeInTheDocument()
  );
});

it('closes the old report modal and requests the new date', async () => {
  const { rerender } = render(page());
  await openModal();
  rerender(page('2026-09-16'));
  await waitFor(() =>
    expect(mockedFetch).toHaveBeenLastCalledWith(
      { ...scope, day: '2026-09-16' },
      expect.anything()
    )
  );
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('only shows times for states reached in the current flow', () => {
  const fixedRecord: TrackingRecord = {
    problemKey: trackingProblemKey(problem),
    status: 'fixed',
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
  expect(findStepTime(fixedRecord, 'fixed')).toBe('2026-09-15T11:00:00Z');

  const revertedRecord: TrackingRecord = {
    ...fixedRecord,
    status: 'confirmed',
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
    '2026-09-15T12:00:00Z'
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
  fireEvent.click(await screen.findByText('已修复待复测（0）'));
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
