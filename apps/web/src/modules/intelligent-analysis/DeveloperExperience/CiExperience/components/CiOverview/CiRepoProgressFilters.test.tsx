import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { compassApiFetch } from '../../../../UserJourney/rawData/apiClient';
import CiRepoProgressSection from './CiRepoProgressSection';
import type { CiRepoSummary } from './communityMetrics';

jest.setTimeout(30000);

jest.mock('../../../../UserJourney/rawData/apiClient', () => ({
  compassApiFetch: jest.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  });
});

const rows = [
  { repo: 'opsmath', slug: 'ops-math', teamName: '算子', repoCategory: '数学' },
  {
    repo: 'runtime',
    slug: 'runtime',
    teamName: '运行时',
    repoCategory: '其他',
  },
];

const repos: CiRepoSummary[] = rows.map(({ repo, slug }) => ({
  repo,
  slug,
  workflow: 'ci',
  days: [],
  latestDay: '',
  scoreOverall: 80,
  scoreHistory: [],
  scoreMetrics: [],
}));

it('requests the server for active filters and shares its results across both table views', async () => {
  const options = {
    repos: rows.map(({ repo, slug }) => ({ value: repo, label: slug })),
    teams: ['算子', '运行时'],
    categories: ['数学', '其他'],
  };
  const requests: URLSearchParams[] = [];
  (compassApiFetch as jest.Mock).mockImplementation(async (url: string) => {
    const params = new URL(url, 'https://example.test').searchParams;
    requests.push(params);
    return {
      options,
      items: params.has('keyword') ? [] : params.has('team') ? [rows[0]] : rows,
    };
  });
  const client = new QueryClient();
  const { unmount } = render(
    <QueryClientProvider client={client}>
      <CiRepoProgressSection
        repos={repos}
        issues={[]}
        trackingReady
        reportHref={() => '/report'}
      />
    </QueryClientProvider>
  );
  try {
    expect(
      await screen.findByRole('button', { name: '展开运行时' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '筛选责任团队' }));
    const menu = within(await screen.findByRole('menu'));
    fireEvent.click(menu.getByText('算子'));
    await waitFor(() =>
      expect(requests.some((params) => params.get('team') === '算子')).toBe(
        true
      )
    );
    expect(
      screen.queryByRole('button', { name: '展开运行时' })
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('radio', { name: '仓库' }));
    expect(
      await screen.findByRole('cell', { name: 'ops-math' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('cell', { name: 'runtime' })
    ).not.toBeInTheDocument();
    fireEvent.change(
      screen.getByRole('textbox', { name: '搜索仓库、团队或分类' }),
      {
        target: { value: ' 无匹配仓库 ' },
      }
    );
    await waitFor(() =>
      expect(
        requests.some(
          (params) =>
            params.get('team') === '算子' &&
            params.get('keyword') === '无匹配仓库'
        )
      ).toBe(true)
    );
    expect(await screen.findByText('暂无匹配仓库')).toBeInTheDocument();
  } finally {
    unmount();
    client.clear();
  }
});
