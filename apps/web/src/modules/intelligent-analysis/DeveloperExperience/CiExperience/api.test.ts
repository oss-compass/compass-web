import {
  fetchCiCatalog,
  fetchCiDataset,
  fetchCiDatasets,
  fetchCiReportPage,
  validateCiDataset,
} from './api';
import { compassApiFetch } from '../../UserJourney/rawData/apiClient';
import { parseRepoKey, repoKeyToQuery, runURL, prURL } from './helpers';
import type { CiDatasetResponse } from './api';

jest.mock('../../UserJourney/rawData/apiClient', () => ({
  compassApiFetch: jest.fn(),
}));
const request = compassApiFetch as jest.Mock;
const fixture = (): CiDatasetResponse =>
  ({
    repo: 'runtime',
    dataset: {
      name: 'runtime',
      workflow: 'w',
      days: ['2026-11-03'],
      boards: { '2026-11-03': {} },
      weekly: {},
    },
    journey: {
      projectName: 'runtime',
      workflow: 'w',
      days: ['2026-11-03'],
      boards: { '2026-11-03': {} },
    },
  } as unknown as CiDatasetResponse);

beforeEach(() => request.mockReset());

it('uses the shared API client and forwards cancellation for single-repo requests', async () => {
  const data = fixture();
  const signal = new AbortController().signal;
  request.mockResolvedValue(data);
  expect(await fetchCiDataset('runtime', signal)).toBe(data);
  expect(request).toHaveBeenCalledWith('/ci-experience/ci-data?repo=runtime', {
    signal,
  });
});

it('does not use static fallback on request failure or a missing repository', async () => {
  request.mockRejectedValueOnce(new Error('offline'));
  await expect(fetchCiDataset('runtime')).rejects.toThrow('offline');
  request.mockResolvedValueOnce({ dataset: null });
  expect(await fetchCiDataset('ge')).toMatchObject({
    dataset: null,
    journey: null,
  });
});

it('rejects missing or mismatched journey data', () => {
  const data = fixture();
  data.journey!.boards = {};
  expect(() => validateCiDataset(data)).toThrow('不完整或不一致');
  const mismatched = fixture();
  mismatched.journey!.workflow = 'other';
  expect(() => validateCiDataset(mismatched)).toThrow('不完整或不一致');
});

it('reads the 19-repository catalog and validates all overview datasets', async () => {
  request.mockResolvedValueOnce({
    catalog: [
      { repo: 'opsmath', name: 'ops-math' },
      { repo: 'ge', name: 'ge' },
    ],
  });
  expect((await fetchCiCatalog()).map((entry) => entry.repo)).toEqual([
    'opsmath',
    'ge',
  ]);
  const data = fixture();
  request.mockResolvedValueOnce({
    catalog: [{ repo: 'runtime' }],
    datasets: { runtime: data.dataset },
    journeys: { runtime: data.journey },
  });
  const all = await fetchCiDatasets();
  expect(all.datasets.runtime).toBe(data.dataset);
  expect(request).toHaveBeenLastCalledWith(
    '/ci-experience/ci-data/overview?include_pains=true',
    {
      signal: undefined,
    }
  );
});

it.each([
  ['ops-nn', 'opsnn'],
  ['ops-transformer', 'opstransformer'],
  ['asc-devkit', 'ascdevkit'],
  ['pto-isa', 'ptoisa'],
  ['oam-tools', 'oamtools'],
  ['asc-tools', 'asctools'],
  ['ops-math', 'opsmath'],
  ['ge', 'ge'],
])('resolves %s and produces canonical evidence links', (slug, key) => {
  const repo = parseRepoKey(slug, [{ repo: key, name: slug }])!;
  expect(repo).toBe(key);
  expect(repoKeyToQuery(repo)).toBe(key);
  expect(runURL(`https://gitcode.com/cann/${slug}`, '123')).toBe(
    `https://gitcode.com/cann/${slug}/actions/runs/123`
  );
  expect(prURL(`https://gitcode.com/cann/${slug}`, 5)).toBe(
    `https://gitcode.com/cann/${slug}/merge_requests/5`
  );
});

it('does not reinterpret an unknown repository as runtime', () => {
  expect(parseRepoKey('unknown')).toBeNull();
});

it('accepts newly added repositories from the API without a frontend registry', async () => {
  request.mockResolvedValueOnce({
    catalog: [{ repo: 'future-key', name: 'future-slug' }],
  });
  const catalog = await fetchCiCatalog();
  expect(parseRepoKey('future-slug', catalog)).toBe('future-key');
  expect(runURL(undefined, '123')).toBeUndefined();
});

it('rejects report context belonging to another observation day', () => {
  const data = fixture();
  data.report_context = {
    boards: {
      '2026-11-03': {
        day: '2026-11-02',
        repo: 'runtime',
        workflow: 'w',
      } as any,
    },
  };
  expect(() => validateCiDataset(data)).toThrow('仓库或日期不一致');
});

it('loads catalog and only the selected report in one cancellable request', async () => {
  const signal = new AbortController().signal;
  const data = {
    ...fixture(),
    catalog: [{ repo: 'runtime' }],
    available_days: ['2026-11-02', '2026-11-03'],
    selected_day: '2026-11-03',
  };
  request.mockResolvedValue(data);
  expect(await fetchCiReportPage('runtime', '2026-11-03', signal)).toBe(data);
  expect(request).toHaveBeenCalledWith(
    '/ci-experience/ci-data/report?repo=runtime&day=2026-11-03',
    { signal }
  );
});

it('rejects a report page with a selected date outside its available dates', async () => {
  request.mockResolvedValue({
    ...fixture(),
    catalog: [{ repo: 'runtime' }],
    available_days: ['2026-11-02'],
    selected_day: '2026-11-03',
  });
  await expect(fetchCiReportPage()).rejects.toThrow('日期或仓库');
});
