import type { NextApiRequest, NextApiResponse } from 'next';

import { getDatasetCacheValue } from '@modules/intelligent-analysis/server/intelligentAnalysisNewDatasetCache';

import developersHandler from './[dataset]/developers';
import organizationsHandler from './[dataset]/organizations';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  parsePagination,
} from '../pagination';

jest.mock(
  '@modules/intelligent-analysis/server/intelligentAnalysisNewDatasetCache',
  () => ({
    getDatasetCacheValue: jest.fn(),
  })
);

const mockedGetDatasetCacheValue = jest.mocked(getDatasetCacheValue);

function createDatasetValue() {
  return {
    organizations: [{ id: 'organization-1' }, { id: 'organization-2' }],
    orgRegions: [],
    orgByRegion: new Map<string, number[]>(),
    orgByOrgType: new Map<string, number[]>(),
    developers: [{ id: 'developer-1' }, { id: 'developer-2' }],
    devRegions: [],
    devByRegion: new Map<string, number[]>(),
    devByRole: new Map<'individual' | 'org', number[]>(),
    stats: {
      all: 2,
      individual: 2,
      orgDevs: 0,
      orgCount: 2,
    },
    regionMetrics: {
      all: [],
      individual: [],
      org_devs: [],
      org_count: [],
    },
  };
}

function createRequest(query: Record<string, unknown>): NextApiRequest {
  return {
    method: 'GET',
    query,
  } as unknown as NextApiRequest;
}

function createResponse() {
  const response = {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as NextApiResponse;

  return {
    response,
    json: response.json as jest.Mock,
    status: response.status as jest.Mock,
  };
}

describe('intelligent analysis pagination', () => {
  it.each([
    ['abc', DEFAULT_PAGE],
    ['1.5', DEFAULT_PAGE],
    [['2'], DEFAULT_PAGE],
    ['0', DEFAULT_PAGE],
    ['-1', DEFAULT_PAGE],
    ['2', 2],
  ])('parses page %p as %p', (value, expected) => {
    expect(parsePagination({ page: value }).page).toBe(expected);
  });

  it.each([
    ['abc', DEFAULT_PAGE_SIZE],
    ['1.5', DEFAULT_PAGE_SIZE],
    [['20'], DEFAULT_PAGE_SIZE],
    ['0', DEFAULT_PAGE_SIZE],
    ['-1', DEFAULT_PAGE_SIZE],
    ['101', MAX_PAGE_SIZE],
    ['20', 20],
  ])('parses pageSize %p as %p', (value, expected) => {
    expect(parsePagination({ pageSize: value }).pageSize).toBe(expected);
  });

  it('keeps invalid developer pagination from producing an empty successful page', async () => {
    mockedGetDatasetCacheValue.mockResolvedValueOnce(createDatasetValue());
    const { response, json, status } = createResponse();

    await developersHandler(
      createRequest({ dataset: 'test', page: 'abc', pageSize: '1' }),
      response
    );

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        page: DEFAULT_PAGE,
        pageSize: 1,
        total: 2,
        items: [expect.objectContaining({ id: 'developer-1' })],
      })
    );
  });

  it('uses the shared validation for organization pagination', async () => {
    mockedGetDatasetCacheValue.mockResolvedValueOnce(createDatasetValue());
    const { response, json, status } = createResponse();

    await organizationsHandler(
      createRequest({
        dataset: 'test',
        page: ['2'],
        pageSize: '101',
      }),
      response
    );

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        page: DEFAULT_PAGE,
        pageSize: MAX_PAGE_SIZE,
        total: 2,
        items: [
          expect.objectContaining({ id: 'organization-1' }),
          expect.objectContaining({ id: 'organization-2' }),
        ],
      })
    );
  });
});
