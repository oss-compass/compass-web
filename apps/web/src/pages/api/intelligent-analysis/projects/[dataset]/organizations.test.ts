import type { NextApiRequest, NextApiResponse } from 'next';
import handler from './organizations';
import { getDatasetCacheValue } from '@modules/intelligent-analysis/server/intelligentAnalysisNewDatasetCache';

jest.mock(
  '@modules/intelligent-analysis/server/intelligentAnalysisNewDatasetCache',
  () => ({
    getDatasetCacheValue: jest.fn(),
  })
);

const mockCache = getDatasetCacheValue as jest.Mock;

function response() {
  const res = {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
}

const organizations = [
  { 组织: 'alpha', 所属国家: 'China', 组织类型: 'company', 开发者数量: 3 },
  { 组织: 'beta', 所属国家: 'China', 组织类型: 'company', 开发者数量: 2 },
  { 组织: 'gamma', 所属国家: 'China', 组织类型: 'company', 开发者数量: 1 },
];

const dataset = {
  organizations,
  orgByRegion: new Map([['China', [0, 1, 2]]]),
  orgByOrgType: new Map([['company', [0, 1, 2]]]),
};

async function call(query: Record<string, string>) {
  const req = { method: 'GET', query: { dataset: 'sample', ...query } };
  const res = response();
  await handler(
    req as unknown as NextApiRequest,
    res as unknown as NextApiResponse
  );
  return res;
}

describe('organizations handler pagination', () => {
  beforeEach(() => {
    mockCache.mockResolvedValue(dataset);
  });

  it('serves the first page when page is not a number', async () => {
    const res = await call({ page: 'abc', pageSize: '2' });
    expect(res.status).toHaveBeenCalledWith(200);
    const body = res.json.mock.calls[0][0];
    expect(body.items).toHaveLength(2);
    expect(body.total).toBe(3);
  });

  it('serves the default page size when pageSize is not a number', async () => {
    const res = await call({ page: '1', pageSize: 'abc' });
    const body = res.json.mock.calls[0][0];
    expect(body.items).toHaveLength(3);
  });
});
