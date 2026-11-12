import {
  fetchAllIssueOverviewTeamRepos,
  fetchIssueOverviewTopPainsV2,
} from './data';

const originalFetch = global.fetch;
const fetchMock = jest.fn();

beforeEach(() => {
  global.fetch = fetchMock;
  fetchMock.mockReset();
});
afterAll(() => {
  global.fetch = originalFetch;
});

it('loads every team repository instead of truncating at the first 100', async () => {
  fetchMock.mockImplementation(async (url: string) => {
    const page = Number(
      new URL(url, 'http://localhost').searchParams.get('page')
    );
    return {
      ok: true,
      json: async () => ({
        total: 103,
        items: Array.from({ length: page === 1 ? 100 : 3 }, (_, i) => ({
          repoShort: `repo-${(page - 1) * 100 + i}`,
        })),
      }),
    };
  });
  const rows = await fetchAllIssueOverviewTeamRepos('cann', 'Team A');
  expect(rows).toHaveLength(103);
  expect(rows[102].repoShort).toBe('repo-102');
  expect(fetchMock).toHaveBeenCalledTimes(2);
  expect(
    new URL(fetchMock.mock.calls[1][0], 'http://localhost').searchParams.get(
      'team'
    )
  ).toBe('Team A');
});

it('rejects an incomplete team list rather than silently displaying partial totals', async () => {
  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => ({ total: 103, items: [] }),
  });
  await expect(
    fetchAllIssueOverviewTeamRepos('cann', 'Team A')
  ).rejects.toThrow('未完整加载');
});

it('sends sorting and combined pain filters with the requested page', async () => {
  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => ({ total: 0, items: [] }),
  });
  await fetchIssueOverviewTopPainsV2({
    page: 3,
    pageSize: 10,
    team: 'Team A',
    stage: '创建',
    prio: 'P2',
    sort: 'title',
    order: 'desc',
  });
  const params = new URL(fetchMock.mock.calls[0][0], 'http://localhost')
    .searchParams;
  expect(Object.fromEntries(params)).toMatchObject({
    page: '3',
    pageSize: '10',
    team: 'Team A',
    stage: '创建',
    prio: 'P2',
    sort: 'title',
    order: 'desc',
  });
});
