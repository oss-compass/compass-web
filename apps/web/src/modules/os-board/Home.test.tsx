import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useDashboardList } from './api/dashboard';
import DashboardHome from './Home';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('./api/dashboard', () => ({ useDashboardList: jest.fn() }));
jest.mock('./Banner', () => () => null);
jest.mock(
  '@common/components/Layout/Center',
  () =>
    function MockCenter({ children }) {
      return <div>{children}</div>;
    }
);
jest.mock('@oss-compass/ui', () => ({
  Button: ({ children, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));
jest.mock('antd', () => ({
  Input: ({ value, onChange, placeholder }) => (
    <input value={value} onChange={onChange} placeholder={placeholder} />
  ),
  Tabs: ({ activeKey, onChange, items }) => (
    <div role="tablist">
      {items.map(({ key, label }) => (
        <button
          key={key}
          role="tab"
          aria-selected={activeKey === key}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  ),
}));

const router = {
  pathname: '/os-board',
  query: {} as Record<string, string | string[]>,
  replace: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  router.query = {};
  (useRouter as jest.Mock).mockReturnValue(router);
  (useDashboardList as jest.Mock).mockReturnValue({
    data: { items: [], total_count: 27, total_pages: 3 },
    isLoading: false,
    isError: false,
  });
});

afterEach(() => jest.useRealTimers());

it.each([
  ['community', '社区'],
  ['repo', '仓库'],
])('restores tab=%s from a shared URL', (tab, label) => {
  router.query = { tab };
  render(<DashboardHome />);
  expect(screen.getByRole('tab', { name: label })).toHaveAttribute(
    'aria-selected',
    'true'
  );
  expect(useDashboardList).toHaveBeenLastCalledWith({
    page: 1,
    per_page: 9,
    dashboard_type: tab,
  });
});

it.each([undefined, 'all', 'invalid', ['community', 'repo']])(
  'defaults to all for tab=%s',
  (tab) => {
    router.query = tab === undefined ? {} : { tab };
    render(<DashboardHome />);
    expect(screen.getByRole('tab', { name: '全部' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(useDashboardList).toHaveBeenLastCalledWith({ page: 1, per_page: 9 });
  }
);

it('writes the tab to the URL, preserves other parameters and resets pagination', () => {
  router.query = { tab: 'community', source: 'share' };
  const { rerender } = render(<DashboardHome />);
  fireEvent.click(screen.getByRole('button', { name: '2' }));
  expect(useDashboardList).toHaveBeenLastCalledWith(
    expect.objectContaining({ page: 2 })
  );
  fireEvent.click(screen.getByRole('tab', { name: '仓库' }));
  expect(router.replace).toHaveBeenCalledWith(
    { pathname: '/os-board', query: { tab: 'repo', source: 'share' } },
    undefined,
    { shallow: true, scroll: false }
  );
  router.query = { tab: 'repo', source: 'share' };
  rerender(<DashboardHome />);
  expect(useDashboardList).toHaveBeenLastCalledWith({
    page: 1,
    per_page: 9,
    dashboard_type: 'repo',
  });
  fireEvent.click(screen.getByRole('tab', { name: '全部' }));
  expect(router.replace).toHaveBeenLastCalledWith(
    { pathname: '/os-board', query: { tab: 'all', source: 'share' } },
    undefined,
    { shallow: true, scroll: false }
  );
});

it('restores the search input and filtered query from a shared URL', () => {
  router.query = { tab: 'community', keyword: '开源 & Compass' };
  const { rerender } = render(<DashboardHome />);
  expect(screen.getByRole('textbox')).toHaveValue('开源 & Compass');
  expect(useDashboardList).toHaveBeenLastCalledWith({
    page: 1,
    per_page: 9,
    dashboard_type: 'community',
    keyword: '开源 & Compass',
  });

  router.query = { tab: 'repo', keyword: 'another' };
  rerender(<DashboardHome />);
  expect(screen.getByRole('textbox')).toHaveValue('another');
});

it('debounces search updates, preserves the tab and clears an empty keyword', () => {
  jest.useFakeTimers();
  router.query = { tab: 'community', source: 'share' };
  const { rerender } = render(<DashboardHome />);
  fireEvent.click(screen.getByRole('button', { name: '2' }));
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Comp' } });
  act(() => jest.advanceTimersByTime(200));
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'Compass' },
  });
  act(() => jest.advanceTimersByTime(499));
  expect(router.replace).not.toHaveBeenCalled();
  act(() => jest.advanceTimersByTime(1));
  expect(router.replace).toHaveBeenLastCalledWith(
    {
      pathname: '/os-board',
      query: { tab: 'community', source: 'share', keyword: 'Compass' },
    },
    undefined,
    { shallow: true, scroll: false }
  );

  router.query = { tab: 'community', source: 'share', keyword: 'Compass' };
  rerender(<DashboardHome />);
  expect(useDashboardList).toHaveBeenLastCalledWith(
    expect.objectContaining({ page: 1, keyword: 'Compass' })
  );
  fireEvent.click(screen.getByRole('tab', { name: '仓库' }));
  expect(router.replace).toHaveBeenLastCalledWith(
    {
      pathname: '/os-board',
      query: { tab: 'repo', source: 'share', keyword: 'Compass' },
    },
    undefined,
    { shallow: true, scroll: false }
  );

  router.query = { tab: 'repo', source: 'share', keyword: 'Compass' };
  rerender(<DashboardHome />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
  act(() => jest.advanceTimersByTime(500));
  expect(router.replace).toHaveBeenLastCalledWith(
    { pathname: '/os-board', query: { tab: 'repo', source: 'share' } },
    undefined,
    { shallow: true, scroll: false }
  );
});

it('cancels pending search updates when leaving the page', () => {
  jest.useFakeTimers();
  const { unmount } = render(<DashboardHome />);
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'Compass' },
  });
  unmount();
  act(() => jest.advanceTimersByTime(500));
  expect(router.replace).not.toHaveBeenCalled();
});
