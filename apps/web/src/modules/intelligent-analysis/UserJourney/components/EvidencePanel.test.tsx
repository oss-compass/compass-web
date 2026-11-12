import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EvidencePanel from './EvidencePanel';
import { usePainConfirmations } from '../hooks/usePainConfirmations';
import {
  fetchOverviewCards,
  fetchOverviewParentChildren,
  fetchPainConfirmations,
  type OverviewPainPointRow,
} from '../rawData/apiClient';

jest.mock('../rawData/apiClient');
jest.mock('../hooks/usePainConfirmations');
jest.mock('../../DeveloperExperience/components/OperationGuide', () => ({
  __esModule: true,
  default: () => null,
}));

const currentFileKey = 'cann_opbase_20261102_1055';
const oldFileKey = 'cann_opbase_20261014_0749';
const taskId = 'install';
const oldChildId = `${oldFileKey}#${taskId}#1`;
const currentChildId = `${currentFileKey}#${taskId}#1`;

const makeRow = (
  overrides: Partial<OverviewPainPointRow> = {}
): OverviewPainPointRow => ({
  id: 'parent',
  fileKey: oldFileKey,
  stepId: taskId,
  painIndex: 1,
  journeyStage: 'S1_SETUP',
  firstFoundReportId: oldFileKey,
  reportTotalScore: 80,
  agentScoreAtFound: 80,
  issueType: '芯片兼容性',
  chipModel: '910C',
  childIds: [oldChildId, currentChildId],
  severity: 'P1_CRITICAL',
  description: 'npu-smi 无法明确识别 910C 芯片及 A3 映射',
  owner: '',
  isRealIssue: true,
  remark: '',
  improvementStatus: 'pending',
  status: '2',
  issueOrPrLink: '',
  retestReportId: '',
  retestReportScore: null,
  agentScoreAfterRetest: null,
  ...overrides,
});

const renderPanel = (rows: OverviewPainPointRow[]) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, cacheTime: 0 } },
  });
  jest.mocked(fetchOverviewCards).mockResolvedValue({
    total: 1,
    page: 1,
    size: 1,
    items: [
      {
        id: 'cann_opbase',
        name: 'cann/opbase',
        sig: '',
        totalPainPoints: rows.length,
        pendingPainPoints: rows.length,
        inProgressPainPoints: 0,
        closedPainPoints: 0,
        naPainPoints: 0,
        closeRate: 0,
        painPoints: rows,
      },
    ],
  });
  const view = render(
    <QueryClientProvider client={queryClient}>
      <EvidencePanel
        fileKey={currentFileKey}
        stepId={taskId}
        variant="compact"
        observations={['安装总结']}
        isLatestReport
      />
    </QueryClientProvider>
  );
  return { ...view, queryClient };
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(usePainConfirmations).mockReturnValue({
    confirmationMap: new Map(),
    overviewPains: [],
    isLoading: false,
    upsert: jest.fn(),
    isSubmitting: false,
  });
  jest.mocked(fetchOverviewParentChildren).mockResolvedValue({
    items: [
      {
        id: oldChildId,
        file_key: oldFileKey,
        task_id: taskId,
        pain_index: 1,
        pain_text: '',
        status: '1',
      },
    ],
  });
  jest.mocked(fetchPainConfirmations).mockResolvedValue({
    file_key: oldFileKey,
    overview_pains: [],
    confirmations: [
      {
        file_key: oldFileKey,
        step_id: taskId,
        pain_index: 1,
        status: 1,
        pain_text: '',
        severity: 'P1_CRITICAL',
        issue_link: null,
        pr_link: null,
        confirmed_by: '',
        confirmed_at: '',
      },
    ],
  });
});

it('shows the current parent status even after pending historical confirmations load', async () => {
  const { queryClient } = renderPanel([makeRow()]);
  const table = await screen.findByRole('table');
  await waitFor(() =>
    expect(fetchPainConfirmations).toHaveBeenCalledWith(oldFileKey)
  );
  await waitFor(() => expect(fetchOverviewParentChildren).toHaveBeenCalled());
  await waitFor(() => expect(queryClient.isFetching()).toBe(0));
  expect(within(table).getByText('已确认待修复')).toBeInTheDocument();
  expect(within(table).queryByText('待确认')).not.toBeInTheDocument();
  expect(
    within(table).getByRole('link', { name: '20261014_0749' })
  ).toBeInTheDocument();
});

it.each([{ isCommonIssue: true }, { commonIssueType: '芯片兼容性' }])(
  'hides merged common issues from history using %j',
  async (commonIssue) => {
    renderPanel([
      makeRow(commonIssue),
      makeRow({
        id: 'ordinary',
        description: '普通历史痛点',
        childIds: [oldChildId],
      }),
    ]);
    const table = await screen.findByRole('table');
    expect(
      screen.getByRole('button', { name: /历史痛点（1）/ })
    ).toBeInTheDocument();
    expect(within(table).queryByText(/npu-smi/)).not.toBeInTheDocument();
    expect(within(table).getByText('普通历史痛点')).toBeInTheDocument();
  }
);

it('retains an unmerged common issue in history', async () => {
  renderPanel([makeRow({ isCommonIssue: true, childIds: [oldChildId] })]);
  expect(await screen.findByRole('table')).toHaveTextContent('npu-smi');
});

it('does not treat duplicated child IDs as a merge', async () => {
  renderPanel([
    makeRow({ isCommonIssue: true, childIds: [oldChildId, oldChildId] }),
  ]);
  expect(await screen.findByRole('table')).toHaveTextContent('npu-smi');
});

it('falls back to a historical status when the parent has no status', async () => {
  const { queryClient } = renderPanel([makeRow({ status: undefined })]);
  const table = await screen.findByRole('table');
  await waitFor(() => expect(queryClient.isFetching()).toBe(0));
  expect(within(table).getByText('待确认')).toBeInTheDocument();
});

it('keeps a merged common issue visible as a current pain', async () => {
  jest.mocked(usePainConfirmations).mockReturnValue({
    confirmationMap: new Map(),
    overviewPains: [
      {
        id: currentChildId,
        task_id: taskId,
        pain_index: 1,
        pain_text: '当前 910C 痛点',
        status: 2,
      },
    ],
    isLoading: false,
    upsert: jest.fn(),
    isSubmitting: false,
  });
  renderPanel([makeRow({ isCommonIssue: true })]);
  expect(
    await screen.findByText(/已确认待修复（已合并）（共性问题）/)
  ).toBeInTheDocument();
  expect(screen.getByText('当前 910C 痛点')).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: /历史痛点/ })
  ).not.toBeInTheDocument();
});
