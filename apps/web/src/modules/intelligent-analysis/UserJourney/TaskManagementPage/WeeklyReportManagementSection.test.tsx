import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
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
  Input: ({
    id,
    value,
    onChange,
    disabled,
    placeholder,
    onPressEnter,
    'aria-invalid': invalid,
    'aria-describedby': describedBy,
  }) => (
    <input
      id={id}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      onKeyDown={(event) => {
        if (event.key === 'Enter') onPressEnter(event);
      }}
    />
  ),
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
const toLabel = '正式周报收件人';
const ccLabel = '正式周报抄送人（可留空）';
const previewLabel = '预览周报收件人';
const list = (label: string) =>
  screen.getByRole('list', { name: `${label}名单` });
const input = (label: string) => screen.getByLabelText(`新增${label}`);
const add = (label: string, text: string) => {
  fireEvent.change(input(label), { target: { value: text } });
  fireEvent.click(
    within(screen.getByRole('region', { name: label })).getByRole('button', {
      name: '验证并添加',
    })
  );
};
const remove = (label: string, email: string) =>
  fireEvent.click(
    screen.getByRole('button', { name: `${label}：移除 ${email}` })
  );
const saveButton = () =>
  screen.getByRole('button', { name: '保存正式收件配置' });
const renderForm = (reportType: 'community' | 'issue' = 'community') => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, cacheTime: 0 } },
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

test.each(['community', 'issue'] as const)(
  'validates and stages %s recipients before explicit save',
  async (reportType) => {
    renderForm(reportType);
    await waitFor(() =>
      expect(list(toLabel)).toHaveTextContent('saved@example.com')
    );
    expect(input(toLabel)).toHaveValue('');
    add(toLabel, 'new@example.com');
    expect(list(toLabel)).toHaveTextContent('new@example.com');
    expect(input(toLabel)).toHaveValue('');
    expect(
      screen.getByText('有未保存修改，点击保存后生效')
    ).toBeInTheDocument();
    expect(updateWeeklyReportPreviewConfig).not.toHaveBeenCalled();
    remove(toLabel, 'saved@example.com');
    remove(ccLabel, 'cc@example.com');
    fireEvent.click(saveButton());
    await waitFor(() =>
      expect(updateWeeklyReportPreviewConfig).toHaveBeenCalledWith(
        { formal_recipients: ['new@example.com'], formal_cc_recipients: [] },
        undefined,
        reportType
      )
    );
    await waitFor(() => expect(saveButton()).not.toBeDisabled());
  }
);

test('rejects invalid email addresses without modifying the list', async () => {
  renderForm();
  await waitFor(() =>
    expect(list(toLabel)).toHaveTextContent('saved@example.com')
  );
  add(toLabel, 'valid@example.com, invalid');
  expect(screen.getByRole('alert')).toHaveTextContent('邮箱格式不正确');
  expect(list(toLabel)).not.toHaveTextContent('valid@example.com');
  expect(input(toLabel)).toHaveValue('valid@example.com, invalid');
  expect(input(toLabel)).toHaveAttribute('aria-invalid', 'true');
  expect(saveButton()).toBeDisabled();
  expect(updateWeeklyReportPreviewConfig).not.toHaveBeenCalled();
});

test('blocks saving pending input until validation or cancellation', async () => {
  renderForm();
  await waitFor(() =>
    expect(list(toLabel)).toHaveTextContent('saved@example.com')
  );
  fireEvent.change(input(toLabel), {
    target: { value: 'pending@example.com' },
  });
  expect(list(toLabel)).not.toHaveTextContent('pending@example.com');
  expect(saveButton()).toBeDisabled();
  fireEvent.change(input(toLabel), { target: { value: '' } });
  expect(saveButton()).not.toBeDisabled();
  expect(updateWeeklyReportPreviewConfig).not.toHaveBeenCalled();
});

test('deduplicates validated pasted emails without overwriting existing recipients', async () => {
  renderForm();
  await waitFor(() =>
    expect(list(toLabel)).toHaveTextContent('saved@example.com')
  );
  add(
    toLabel,
    'SAVED@example.com，first@example.com;FIRST@example.com；second@example.com'
  );
  expect(within(list(toLabel)).getAllByRole('listitem')).toHaveLength(3);
  expect(list(toLabel)).toHaveTextContent('first@example.com');
  expect(list(toLabel)).toHaveTextContent('second@example.com');
  fireEvent.click(saveButton());
  await waitFor(() =>
    expect(updateWeeklyReportPreviewConfig).toHaveBeenCalledWith(
      {
        formal_recipients: [
          'saved@example.com',
          'first@example.com',
          'second@example.com',
        ],
        formal_cc_recipients: ['cc@example.com'],
      },
      undefined,
      'community'
    )
  );
  await waitFor(() => expect(saveButton()).not.toBeDisabled());
});

test('keeps duplicate additions out of the list and clears the new input', async () => {
  renderForm();
  await waitFor(() =>
    expect(list(toLabel)).toHaveTextContent('saved@example.com')
  );
  add(toLabel, 'SAVED@example.com');
  expect(within(list(toLabel)).getAllByRole('listitem')).toHaveLength(1);
  expect(input(toLabel)).toHaveValue('');
  expect(screen.getByText('邮箱已在名单中，未重复添加')).toBeInTheDocument();
  expect(updateWeeklyReportPreviewConfig).not.toHaveBeenCalled();
});

test('allows optional Enter validation without saving the server configuration', async () => {
  renderForm();
  await waitFor(() =>
    expect(list(toLabel)).toHaveTextContent('saved@example.com')
  );
  fireEvent.change(input(toLabel), { target: { value: 'enter@example.com' } });
  fireEvent.keyDown(input(toLabel), { key: 'Enter', code: 'Enter' });
  expect(list(toLabel)).toHaveTextContent('enter@example.com');
  expect(updateWeeklyReportPreviewConfig).not.toHaveBeenCalled();
});

test.each(['community', 'issue'] as const)(
  'prefills the effective %s To and CC into existing lists',
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
      expect(list(toLabel)).toHaveTextContent('existing@example.com')
    );
    expect(list(toLabel)).toHaveTextContent('owner@example.com');
    expect(list(ccLabel)).toHaveTextContent('admin@example.com');
    expect(input(toLabel)).toHaveValue('');
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
    expect(list(toLabel)).toHaveTextContent('saved@example.com')
  );
  expect(list(ccLabel)).not.toHaveTextContent('old@example.com');
  expect(list(ccLabel)).toHaveTextContent('暂无收件人');
});

test('validates preview recipients before staging and saving them', async () => {
  renderForm();
  await waitFor(() =>
    expect(list(previewLabel)).toHaveTextContent('preview@example.com')
  );
  add(previewLabel, 'new-preview@example.com');
  expect(list(previewLabel)).toHaveTextContent('new-preview@example.com');
  expect(updateWeeklyReportPreviewConfig).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: '保存预览配置' }));
  await waitFor(() =>
    expect(updateWeeklyReportPreviewConfig).toHaveBeenCalledWith(
      {
        preview_recipients: ['preview@example.com', 'new-preview@example.com'],
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

test('preserves the staged list if saving fails', async () => {
  jest
    .mocked(updateWeeklyReportPreviewConfig)
    .mockRejectedValueOnce(new Error('保存失败'));
  renderForm();
  await waitFor(() =>
    expect(list(toLabel)).toHaveTextContent('saved@example.com')
  );
  add(toLabel, 'keep-draft@example.com');
  fireEvent.click(saveButton());
  await waitFor(() =>
    expect(updateWeeklyReportPreviewConfig).toHaveBeenCalledTimes(1)
  );
  await waitFor(() => expect(saveButton()).not.toBeDisabled());
  expect(list(toLabel)).toHaveTextContent('keep-draft@example.com');
  expect(screen.getByText('有未保存修改，点击保存后生效')).toBeInTheDocument();
});

test('keeps both pending inputs and staged lists when toggling a schedule', async () => {
  jest
    .mocked(fetchWeeklyReportPreviewConfig)
    .mockResolvedValueOnce(config)
    .mockResolvedValue({ ...config, preview_enabled: true });
  renderForm();
  await waitFor(() =>
    expect(list(toLabel)).toHaveTextContent('saved@example.com')
  );
  add(toLabel, 'formal-draft@example.com');
  fireEvent.change(input(previewLabel), {
    target: { value: 'preview-draft@example.com' },
  });
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
  expect(input(previewLabel)).toHaveValue('preview-draft@example.com');
  expect(list(toLabel)).toHaveTextContent('formal-draft@example.com');
});

test.each(['community', 'issue'] as const)(
  'hides %s weekly management and makes no requests for non-admins',
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
    expect(
      screen.queryByRole('region', { name: toLabel })
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

test('unmounts weekly management immediately when switching away from an administrator', async () => {
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
    expect(list(toLabel)).toHaveTextContent('saved@example.com')
  );
  rerender(
    <QueryClientProvider client={client}>
      <WeeklyReportManagementSection
        user={{ username: 'member', role: 'repo_owner' }}
      />
    </QueryClientProvider>
  );
  expect(
    screen.queryByRole('region', { name: toLabel })
  ).not.toBeInTheDocument();
});
