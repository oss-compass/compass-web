import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WeeklyReportManagementSection from './WeeklyReportManagementSection';
import {
  fetchFormalWeeklyReportRecords,
  fetchWeeklyReportPreviewConfig,
  updateWeeklyReportPreviewConfig,
  sendFormalWeeklyReport,
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
  Input: {
    TextArea: ({ id, value, onChange, disabled, placeholder }) => (
      <textarea
        id={id}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
      />
    ),
  },
  Switch: ({ checked, onChange, loading, 'aria-label': label }) => (
    <input
      type="checkbox"
      role="switch"
      aria-label={label}
      checked={checked}
      disabled={loading}
      onChange={(event) => onChange(event.target.checked)}
    />
  ),
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
      <WeeklyReportManagementSection
        user={{ username: 'admin', role: 'admin' }}
        reportType={reportType}
      />
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
        'existing@example.com\nowner@example.com'
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

test.each(['community', 'issue'] as const)(
  'hides %s weekly report management and makes no requests for non-admins',
  (reportType) => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const { rerender } = render(
      <QueryClientProvider client={client}>
        <WeeklyReportManagementSection
          user={{ username: 'member', role: 'repo_owner' }}
          reportType={reportType}
        />
      </QueryClientProvider>
    );
    expect(screen.queryByLabelText('正式周报收件人')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '发送正式周报' })
    ).not.toBeInTheDocument();
    rerender(
      <QueryClientProvider client={client}>
        <WeeklyReportManagementSection user={null} reportType={reportType} />
      </QueryClientProvider>
    );
    expect(fetchWeeklyReportPreviewConfig).not.toHaveBeenCalled();
    expect(fetchFormalWeeklyReportRecords).not.toHaveBeenCalled();
    expect(updateWeeklyReportPreviewConfig).not.toHaveBeenCalled();
    expect(sendFormalWeeklyReport).not.toHaveBeenCalled();
  }
);

test('unmounts weekly report management immediately when switching away from an administrator', async () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const { rerender } = render(
    <QueryClientProvider client={client}>
      <WeeklyReportManagementSection
        user={{ username: 'admin', role: 'admin' }}
      />
    </QueryClientProvider>
  );
  await waitFor(() =>
    expect(screen.getByLabelText('正式周报收件人')).toHaveValue(
      'saved@example.com'
    )
  );
  rerender(
    <QueryClientProvider client={client}>
      <WeeklyReportManagementSection
        user={{ username: 'member', role: 'repo_owner' }}
      />
    </QueryClientProvider>
  );
  expect(screen.queryByLabelText('正式周报收件人')).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: '发送正式周报' })
  ).not.toBeInTheDocument();
});

test.each(['community', 'issue'] as const)(
  'saves pasted %s addresses directly without pressing Enter',
  async (reportType) => {
    renderForm(reportType);
    const to = screen.getByLabelText('正式周报收件人');
    await waitFor(() => expect(to).toHaveValue('saved@example.com'));
    const text =
      'first@example.com，SECOND@example.com; first@example.com\nthird@example.com；fourth@example.com';
    fireEvent.change(to, { target: { value: text } });
    expect(to).toHaveValue(text);
    expect(screen.getByText('有未保存修改')).toBeInTheDocument();
    expect(screen.getByText('4 个邮箱')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('正式周报抄送人（可留空）'), {
      target: { value: 'cc@example.com, CC@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: '保存正式收件配置' }));
    await waitFor(() =>
      expect(updateWeeklyReportPreviewConfig).toHaveBeenCalledWith(
        {
          formal_recipients: [
            'first@example.com',
            'SECOND@example.com',
            'third@example.com',
            'fourth@example.com',
          ],
          formal_cc_recipients: ['cc@example.com'],
        },
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

test('saves preview recipients directly from the visible text', async () => {
  renderForm();
  const input = screen.getByLabelText('预览周报收件人');
  await waitFor(() => expect(input).toHaveValue('preview@example.com'));
  fireEvent.change(input, {
    target: { value: 'preview-one@example.com\npreview-two@example.com' },
  });
  fireEvent.click(screen.getByRole('button', { name: '保存预览配置' }));
  await waitFor(() =>
    expect(updateWeeklyReportPreviewConfig).toHaveBeenCalledWith(
      {
        preview_recipients: [
          'preview-one@example.com',
          'preview-two@example.com',
        ],
      },
      undefined,
      'community'
    )
  );
  await waitFor(() =>
    expect(
      screen.getByRole('button', { name: '保存预览配置' })
    ).not.toBeDisabled()
  );
});

test('preserves the edited address text when saving fails', async () => {
  jest
    .mocked(updateWeeklyReportPreviewConfig)
    .mockRejectedValueOnce(new Error('保存失败'));
  renderForm();
  const input = screen.getByLabelText('正式周报收件人');
  await waitFor(() => expect(input).toHaveValue('saved@example.com'));
  fireEvent.change(input, { target: { value: 'keep-draft@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: '保存正式收件配置' }));
  await waitFor(() =>
    expect(updateWeeklyReportPreviewConfig).toHaveBeenCalledTimes(1)
  );
  await waitFor(() =>
    expect(
      screen.getByRole('button', { name: '保存正式收件配置' })
    ).not.toBeDisabled()
  );
  expect(input).toHaveValue('keep-draft@example.com');
  expect(screen.getByText('有未保存修改')).toBeInTheDocument();
});

test('keeps unsaved address drafts when toggling the preview schedule', async () => {
  jest
    .mocked(fetchWeeklyReportPreviewConfig)
    .mockResolvedValueOnce(config)
    .mockResolvedValue({ ...config, preview_enabled: true });
  renderForm();
  const preview = screen.getByLabelText('预览周报收件人');
  const formal = screen.getByLabelText('正式周报收件人');
  await waitFor(() => expect(preview).toHaveValue('preview@example.com'));
  fireEvent.change(preview, { target: { value: 'preview-draft@example.com' } });
  fireEvent.change(formal, { target: { value: 'formal-draft@example.com' } });
  fireEvent.click(screen.getByRole('switch', { name: '预览周报自动发送' }));
  await waitFor(() =>
    expect(updateWeeklyReportPreviewConfig).toHaveBeenCalledWith(
      { preview_enabled: true },
      undefined,
      'community'
    )
  );
  await waitFor(() =>
    expect(
      screen.getByRole('switch', { name: '预览周报自动发送' })
    ).not.toBeDisabled()
  );
  expect(preview).toHaveValue('preview-draft@example.com');
  expect(formal).toHaveValue('formal-draft@example.com');
});
