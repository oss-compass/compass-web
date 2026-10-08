import React from 'react';
import toast from 'react-hot-toast';
import {
  act,
  configure,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import {
  CiPainTrackingButton,
  CiPainTrackingProvider,
  findStepTime,
} from './index';
import { fetchTrackings, saveTracking, TrackingApiError } from './api';
import { trackingProblemKey } from './model';
import type { TrackingRecord } from './model';
import type { CiProblem } from '../../types';
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

const page = (day = scope.day) => (
  <CiPainTrackingProvider
    key={day}
    scope={{ ...scope, day }}
    repo="runtime"
    problems={[problem]}
  >
    <CiPainTrackingButton problem={problem} />
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
const enterEvidence = () => {
  fireEvent.change(screen.getByLabelText('提交人'), {
    target: { value: '张三' },
  });
  fireEvent.change(screen.getByLabelText('判断依据或修复说明'), {
    target: { value: '已核实执行日志' },
  });
};

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
  expect(screen.getAllByText('已确认待修复').length).toBeGreaterThanOrEqual(3);
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
  fireEvent.click(screen.getByRole('button', { name: /重\s*试/ }));
  await openModal();
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
