import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { fetchOverviewCommonIssues } from '../../rawData/apiClient';
import PainLevelConfirmModal, { PainStatus } from './index';

jest.mock('../../rawData/apiClient');
jest.mock('../../../DeveloperExperience/components/OperationGuide', () => ({
  __esModule: true,
  default: () => null,
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn(() => ({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
    configurable: true,
  });
});

it.each([
  [
    PainStatus.CONFIRMED_PENDING_FIX,
    /^提\s*交$/,
    '回退到待确认',
    PainStatus.TO_BE_CONFIRMED,
  ],
  [
    PainStatus.FIXED_PENDING_RETEST,
    /^关\s*闭$/,
    '回退到已确认待修复',
    PainStatus.CONFIRMED_PENDING_FIX,
  ],
])(
  'opens the previous step from status %s before submitting a rollback',
  async (status, footerAction, rollbackAction, targetStatus) => {
    jest.mocked(fetchOverviewCommonIssues).mockResolvedValue({ items: [] });
    const queryClient = new QueryClient({
      defaultOptions: { queries: { cacheTime: 0 } },
    });
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    render(
      <QueryClientProvider client={queryClient}>
        <PainLevelConfirmModal
          open
          fileKey="report"
          stepId="install"
          painIndex={1}
          painText="安装失败"
          currentRecord={{
            file_key: 'report',
            step_id: 'install',
            pain_index: 1,
            pain_text: '安装失败',
            status,
            severity: 'P1_CRITICAL',
            issue_link: null,
            pr_link: null,
            confirmed_by: '维护者',
            confirmed_at: '',
          }}
          onCancel={jest.fn()}
          onSubmit={onSubmit}
        />
      </QueryClientProvider>
    );

    expect(screen.getByRole('button', { name: footerAction })).toBeEnabled();
    expect(screen.queryByRole('button', { name: rollbackAction })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: '上一步' }));
    fireEvent.click(screen.getByRole('button', { name: rollbackAction }));
    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.change(screen.getByPlaceholderText('请输入操作人'), {
      target: { value: '维护者' },
    });
    fireEvent.change(screen.getByPlaceholderText('请输入回退原因'), {
      target: { value: '误操作' },
    });
    fireEvent.click(screen.getByRole('button', { name: '确认回退' }));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          status: targetStatus,
          action_reason: '误操作',
        })
      )
    );
  }
);
