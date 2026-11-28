import type { NextApiRequest, NextApiResponse } from 'next';
import handler from './developers';
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

const developers = [
  { 用户ID: 'alice', 用户名称: 'Alice', 国家: 'China', 用户类型: '个人' },
  { 用户ID: 'bob', 用户名称: 'Bob', 国家: 'China', 用户类型: '个人' },
  { 用户ID: 'carol', 用户名称: 'Carol', 国家: 'China', 用户类型: '个人' },
];

const dataset = {
  developers,
  devByRegion: new Map([['China', [0, 1, 2]]]),
  devByRole: new Map([['individual', [0, 1, 2]]]),
  devRegions: ['China'],
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

describe('developers handler pagination', () => {
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
