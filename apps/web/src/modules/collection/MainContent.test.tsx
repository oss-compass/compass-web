import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import client from '@common/gqlClient';
import MainContent from './MainContent';

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));
jest.mock('@common/gqlClient', () => ({
  __esModule: true,
  default: { request: jest.fn() },
}));
jest.mock('@common/components/EChartX/MiniChart', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('./assets/compare.svg', () => ({
  __esModule: true,
  default: () => null,
}));

const mockRouter = { query: { slug: 'sql-database' }, push: jest.fn() };
const request = client.request as jest.Mock;
const clients: QueryClient[] = [];

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
});

afterEach(() => {
  clients.splice(0).forEach((queryClient) => queryClient.clear());
  jest.clearAllMocks();
});

const renderCollection = () => {
  request.mockImplementation(({ variables }) => {
    const count = variables.keyword === 'needle' ? 1 : 61;
    const first = (variables.page - 1) * variables.per;
    const length = Math.max(0, Math.min(variables.per, count - first));
    return Promise.resolve({
      collectionList: {
        count,
        page: variables.page,
        totalPage: Math.ceil(count / variables.per),
        items: Array.from({ length }, (_, index) => ({
          origin: `https://github.com/fixture/${variables.keyword || 'repo'}-${
            first + index + 1
          }`,
          shortCode: `s${first + index + 1}`,
          metricActivity: [{ activityScore: 1 }],
        })),
      },
    });
  });
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, cacheTime: 0 } },
  });
  clients.push(queryClient);
  return render(
    <QueryClientProvider client={queryClient}>
      <MainContent
        collectionArray={[
          {
            ident: 'sql-database',
            slug: '/sql-database',
            name: 'SQL Database',
            name_cn: 'SQL数据库',
            items: [],
          },
        ]}
      />
    </QueryClientProvider>
  );
};

const searchInput = () =>
  screen.getByPlaceholderText('collection:search_repository');
const submitSearch = (keyword: string, method: 'click' | 'enter' = 'click') => {
  const input = searchInput();
  fireEvent.change(input, { target: { value: keyword } });
  if (method === 'enter') {
    input.focus();
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', keyCode: 13 });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', keyCode: 13 });
  } else {
    // The existing icon has no accessible role or name; locate it beside its input.
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(input.nextElementSibling!);
  }
};
const goToPageTwo = async (prefix = 'repo') => {
  await screen.findByRole('link', { name: `${prefix}-1` });
  fireEvent.click(screen.getByTitle('2'));
  await screen.findByRole('link', { name: `${prefix}-31` });
};
const queriesFor = (keyword: string) =>
  request.mock.calls
    .map(([{ variables }]) => variables)
    .filter((variables) => variables.keyword === keyword);

describe('collection search pagination', () => {
  it('keeps normal collection pagination on the selected page', async () => {
    renderCollection();
    await goToPageTwo();
    expect(queriesFor('').map(({ page }) => page)).toEqual([1, 2]);
  });

  it.each(['click', 'enter'] as const)(
    'starts a submitted %s search on page one and displays its only match',
    async (method) => {
      renderCollection();
      await goToPageTwo();
      submitSearch('needle', method);

      await screen.findByRole('link', { name: 'needle-1' });
      expect(queriesFor('needle').map(({ page }) => page)).toEqual([1]);
      expect(screen.queryByRole('link', { name: 'repo-31' })).toBeNull();
    }
  );

  it('allows normal pagination within the new search results', async () => {
    renderCollection();
    await goToPageTwo();
    submitSearch('broad');

    await goToPageTwo('broad');
    expect(queriesFor('broad').map(({ page }) => page)).toEqual([1, 2]);
  });

  it('returns to the first unfiltered page when the search is cleared', async () => {
    renderCollection();
    await screen.findByRole('link', { name: 'repo-1' });
    submitSearch('broad');
    await goToPageTwo('broad');
    request.mockClear();
    submitSearch('');

    await screen.findByRole('link', { name: 'repo-1' });
    expect(queriesFor('').map(({ page }) => page)).toEqual([1]);
  });

  it('preserves the activity sort and page size while resetting search pagination', async () => {
    const { container } = renderCollection();
    await screen.findByRole('link', { name: 'repo-1' });
    // The existing sort trigger is an unnamed anchor without an href.
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    fireEvent.mouseEnter(container.querySelector('.ant-dropdown-trigger')!);
    fireEvent.click(
      await screen.findByText('collection:ascending_order_of_activity')
    );
    await waitFor(() =>
      expect(
        queriesFor('').some(({ sortOpts }) => sortOpts.direction === 'asc')
      ).toBe(true)
    );
    await goToPageTwo();
    submitSearch('needle');

    await screen.findByRole('link', { name: 'needle-1' });
    expect(queriesFor('needle')).toEqual([
      expect.objectContaining({
        page: 1,
        per: 30,
        sortOpts: { type: 'activity_score', direction: 'asc' },
      }),
    ]);
  });
});
