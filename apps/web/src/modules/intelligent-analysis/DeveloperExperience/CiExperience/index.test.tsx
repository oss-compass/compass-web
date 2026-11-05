import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import CiExperience from './index';
import { useCiCatalogQuery, useCiDatasetQuery } from './queries';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('./queries', () => ({
  useCiCatalogQuery: jest.fn(),
  useCiDatasetQuery: jest.fn(),
}));
jest.mock(
  '../components/ExperienceBackLink',
  () =>
    function MockExperienceBackLink() {
      return <span>返回看板</span>;
    }
);
jest.mock(
  './components/CiReport',
  () =>
    function MockCiReport({ repo, day, journey }: any) {
      return (
        <div data-testid="report">
          {repo}:{day}:{journey.boards[day]?.scores?.total}
        </div>
      );
    }
);
jest.mock(
  './components/CiControls',
  () =>
    function MockCiControls({ day, days, onDayChange, onRepoChange }: any) {
      return (
        <>
          <select
            aria-label="日期"
            value={day}
            onChange={(e) => onDayChange(e.target.value)}
          >
            {days.map((d: string) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <button onClick={() => onRepoChange('ge')}>选择 ge</button>
        </>
      );
    }
);

const catalog = [
  { repo: 'runtime', name: 'runtime' },
  { repo: 'ge', name: 'ge' },
];
const response = (repo = 'runtime', days = ['2026-11-02', '2026-11-03']) => ({
  dataset: { name: repo, workflow: 'w', days, boards: {} },
  journey: {
    boards: Object.fromEntries(
      days.map((d) => [d, { scores: { total: repo === 'runtime' ? 71 : 80 } }])
    ),
  },
});
const refetch = jest.fn();
let router: any;
let current: ReturnType<typeof response>;
beforeEach(() => {
  jest.clearAllMocks();
  router = { query: {}, isReady: true, pathname: '/report', push: jest.fn() };
  current = response();
  (useRouter as jest.Mock).mockImplementation(() => router);
  (useCiCatalogQuery as jest.Mock).mockReturnValue({
    data: catalog,
    isLoading: false,
    refetch,
  });
  (useCiDatasetQuery as jest.Mock).mockImplementation((repo) => ({
    data: repo ? current : undefined,
    isLoading: false,
    refetch,
  }));
});

it('defaults to latest day and preserves historical selection across refreshes', () => {
  const { rerender } = render(<CiExperience />);
  expect(screen.getByTestId('report')).toHaveTextContent(
    'runtime:2026-11-03:71'
  );
  fireEvent.change(screen.getByLabelText('日期'), {
    target: { value: '2026-11-02' },
  });
  current = response('runtime', ['2026-11-02', '2026-11-03', '2026-11-04']);
  rerender(<CiExperience />);
  expect(screen.getByTestId('report')).toHaveTextContent(
    'runtime:2026-11-02:71'
  );
});

it('resets date on repository changes and browser back navigation', () => {
  const { rerender } = render(<CiExperience />);
  fireEvent.change(screen.getByLabelText('日期'), {
    target: { value: '2026-11-02' },
  });
  fireEvent.click(screen.getByText('选择 ge'));
  expect(router.push).toHaveBeenCalledWith(
    { pathname: '/report', query: { repo: 'ge' } },
    undefined,
    { shallow: true }
  );
  router.query = { repo: 'ge' };
  current = response('ge', ['2026-11-01', '2026-11-04']);
  rerender(<CiExperience />);
  expect(screen.getByTestId('report')).toHaveTextContent('ge:2026-11-04:80');
  router.query = { repo: 'runtime' };
  current = response();
  rerender(<CiExperience />);
  expect(screen.getByTestId('report')).toHaveTextContent(
    'runtime:2026-11-03:71'
  );
});

it('shows empty for unknown repositories and disables queries for other organizations', () => {
  router.query = { repo: 'unknown' };
  const { rerender } = render(<CiExperience />);
  expect(screen.queryByTestId('report')).not.toBeInTheDocument();
  expect(screen.getByText('该仓库暂无 CI 报告数据')).toBeInTheDocument();
  expect(useCiDatasetQuery).toHaveBeenLastCalledWith(null, true);
  router.query = {};
  rerender(<CiExperience org="nvidia" />);
  expect(screen.queryByTestId('report')).not.toBeInTheDocument();
  expect(useCiCatalogQuery).toHaveBeenLastCalledWith(false);
});

it('shows retry on API errors instead of static reports', () => {
  (useCiCatalogQuery as jest.Mock).mockReturnValue({
    error: new Error('offline'),
    isLoading: false,
    refetch,
  });
  render(<CiExperience />);
  expect(screen.getByText('CI 报告加载失败')).toBeInTheDocument();
  expect(screen.queryByTestId('report')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /重\s*试/ }));
  expect(refetch).toHaveBeenCalled();
});
