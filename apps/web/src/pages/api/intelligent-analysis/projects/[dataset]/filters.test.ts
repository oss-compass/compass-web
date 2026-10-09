import type { NextApiRequest, NextApiResponse } from 'next';
import developersHandler from './developers';
import { getDatasetCacheValue } from '@modules/intelligent-analysis/server/intelligentAnalysisNewDatasetCache';

jest.mock(
  '@modules/intelligent-analysis/server/intelligentAnalysisNewDatasetCache',
  () => ({
    getDatasetCacheValue: jest.fn(),
  })
);

const mockGetDatasetCacheValue = getDatasetCacheValue as jest.Mock;

function response() {
  const res = {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
}

const dataset = {
  developers: [{ 用户ID: 'alice' }, { 用户ID: 'bob' }],
  devByRegion: new Map([['China', [0, 1]]]),
  devByRole: new Map([['individual', [0, 1]]]),
  devRegions: ['China'],
};

async function request(
  handler: typeof developersHandler,
  query: Record<string, string>
) {
  const req = { method: 'GET', query: { dataset: 'sample', ...query } };
  const res = response();
  await handler(
    req as unknown as NextApiRequest,
    res as unknown as NextApiResponse
  );
  expect(res.status).toHaveBeenCalledWith(200);
  return res.json.mock.calls[0][0];
}

beforeEach(() => {
  mockGetDatasetCacheValue.mockResolvedValue(dataset);
});

describe('developer role filter', () => {
  it('returns no developers for a region missing from the index', async () => {
    const result = await request(developersHandler, { regions: 'Atlantis' });
    expect(result).toMatchObject({ total: 0, items: [] });
  });

  it('returns no developers when the selected role has no members', async () => {
    const result = await request(developersHandler, { role: 'org' });
    expect(result).toMatchObject({ total: 0, items: [] });
  });

  it('still returns all rows when no filter is selected', async () => {
    expect(await request(developersHandler, {})).toMatchObject({ total: 2 });
  });
});
