import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WeeklyReportManagementSection from './WeeklyReportManagementSection';
import {
  fetchFormalWeeklyReportRecords,
  fetchWeeklyReportPreviewConfig,
  updateWeeklyReportPreviewConfig,
} from '../rawData/apiClient';

jest.mock('../rawData/apiClient', () => ({
  fetchFormalWeeklyReportRecords: jest.fn(),
  fetchWeeklyReportPreviewConfig: jest.fn(),
  updateWeeklyReportPreviewConfig: jest.fn(),
  sendFormalWeeklyReport: jest.fn(),
}));

jest.mock('antd', () => ({
  Button: ({ children, onClick, disabled, loading }) => (
    <button onClick={onClick} disabled={disabled || loading}>
      {children}
    </button>
  ),
  Select: ({ id, value, onChange, disabled }) => (
    <input
      id={id}
      value={value.join(',')}
      disabled={disabled}
      onChange={(event) =>
        onChange(event.target.value ? event.target.value.split(',') : [])
      }
    />
  ),
  Switch: () => null,
  Popconfirm: ({ children }) => <>{children}</>,
  Table: () => null,
  Tag: ({ children }) => <>{children}</>,
  message: {
    useMessage: () => [{ success: jest.fn(), error: jest.fn() }, null],
  },
}));

const config = {
  preview_enabled: false,
  preview_recipients: ['preview@example.com'],
  formal_auto_enabled: false,
  formal_recipients: ['saved@example.com'],
  formal_cc_recipients: ['cc@example.com'],
  timezone: 'Asia/Shanghai',
};
beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(fetchWeeklyReportPreviewConfig).mockResolvedValue(config);
  jest
    .mocked(fetchFormalWeeklyReportRecords)
    .mockResolvedValue({ items: [], total: 0, page: 1, size: 10 });
  jest
    .mocked(updateWeeklyReportPreviewConfig)
    .mockResolvedValue({ message: '已保存', data: config });
});
const renderForm = (reportType: 'community' | 'issue' = 'community') => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <WeeklyReportManagementSection reportType={reportType} />
    </QueryClientProvider>
  );
};
test.each(['community', 'issue'] as const)(
  'saves formal To and cleared CC for %s independently',
  async (reportType) => {
    renderForm(reportType);
    const to = screen.getByLabelText('正式周报收件人');
    await waitFor(() => expect(to).toHaveValue('saved@example.com'));
    fireEvent.change(to, { target: { value: 'new@example.com' } });
    fireEvent.change(screen.getByLabelText('正式周报抄送人（可留空）'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button', { name: '保存正式收件配置' }));
    await waitFor(() =>
      expect(updateWeeklyReportPreviewConfig).toHaveBeenCalledWith(
        { formal_recipients: ['new@example.com'], formal_cc_recipients: [] },
        undefined,
        reportType
      )
    );
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: '保存正式收件配置' })
      ).not.toBeDisabled()
    );
  }
);
test('rejects invalid formal recipients before updating', async () => {
  renderForm();
  const to = screen.getByLabelText('正式周报收件人');
  await waitFor(() => expect(to).toHaveValue('saved@example.com'));
  fireEvent.change(to, { target: { value: 'invalid' } });
  fireEvent.click(screen.getByRole('button', { name: '保存正式收件配置' }));
  expect(updateWeeklyReportPreviewConfig).not.toHaveBeenCalled();
});

test.each(['community', 'issue'] as const)(
  'prefills the existing effective To and CC for %s',
  async (reportType) => {
    jest.mocked(fetchWeeklyReportPreviewConfig).mockResolvedValue({
      ...config,
      formal_recipients: null,
      formal_cc_recipients: null,
      effective_formal_recipients: [
        'existing@example.com',
        'owner@example.com',
      ],
      effective_formal_cc_recipients: ['admin@example.com'],
    });
    renderForm(reportType);
    await waitFor(() =>
      expect(screen.getByLabelText('正式周报收件人')).toHaveValue(
        'existing@example.com,owner@example.com'
      )
    );
    expect(screen.getByLabelText('正式周报抄送人（可留空）')).toHaveValue(
      'admin@example.com'
    );
    expect(updateWeeklyReportPreviewConfig).not.toHaveBeenCalled();
  }
);

test('keeps an explicitly cleared CC empty when prefilling', async () => {
  jest.mocked(fetchWeeklyReportPreviewConfig).mockResolvedValue({
    ...config,
    formal_cc_recipients: [],
    effective_formal_cc_recipients: ['old@example.com'],
  });
  renderForm();
  await waitFor(() =>
    expect(screen.getByLabelText('正式周报收件人')).toHaveValue(
      'saved@example.com'
    )
  );
  expect(screen.getByLabelText('正式周报抄送人（可留空）')).toHaveValue('');
});
