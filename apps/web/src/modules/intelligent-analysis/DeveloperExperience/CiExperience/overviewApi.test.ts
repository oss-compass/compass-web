import { fetchCiPainOverview, fetchCiPainTrends } from './overviewApi';
import { compassApiFetch } from '../../UserJourney/rawData/apiClient';

jest.mock('../../UserJourney/rawData/apiClient', () => ({
  compassApiFetch: jest.fn(),
}));
const request = compassApiFetch as jest.Mock;

beforeEach(() => request.mockReset());

it('loads actual statuses through the shared client and forwards cancellation', async () => {
  const signal = new AbortController().signal;
  const response = {
    reports: [
      {
        repo: 'hcomm',
        workflow: 'w',
        day: '2026-11-03',
        issues: [
          {
            problemKey: 'key',
            pri: 'P2',
            status: 'fixed',
            journeyStages: ['编译'],
          },
        ],
      },
    ],
  };
  request.mockResolvedValue(response);
  expect(await fetchCiPainOverview(signal)).toBe(response);
  expect(request).toHaveBeenCalledWith('/ci-experience/ci-data/pain-overview', {
    signal,
  });
});

it('rejects legacy states and propagates failures without producing pending or empty successes', async () => {
  request.mockRejectedValueOnce(new Error('offline'));
  await expect(fetchCiPainOverview()).rejects.toThrow('offline');
  request.mockResolvedValue({
    reports: [
      {
        repo: 'hcomm',
        workflow: 'w',
        day: '2026-11-03',
        issues: [
          { problemKey: 'key', pri: 'P2', status: '已消退', journeyStages: [] },
        ],
      },
    ],
  });
  await expect(fetchCiPainOverview()).rejects.toThrow('CI 痛点状态数据不完整');
});

it('loads weekly snapshots with cancellation, preserving genuine zero-problem 100 percent weeks', async () => {
  const signal = new AbortController().signal;
  const response = {
    points: [
      {
        weekStart: '2026-11-02',
        weekEnd: '2026-11-03',
        total: 0,
        p0: 0,
        p1: 0,
        p2: 0,
        repoCount: 1,
        counts: { pending: 0, confirmed: 0, fixed: 0, invalid: 0 },
        repairRate: 100,
      },
    ],
  };
  request.mockResolvedValueOnce(response);
  expect(await fetchCiPainTrends(signal)).toBe(response);
  expect(request).toHaveBeenCalledWith('/ci-experience/ci-data/pain-trends', {
    signal,
  });
  request.mockRejectedValueOnce(new Error('weekly unavailable'));
  await expect(fetchCiPainTrends()).rejects.toThrow('weekly unavailable');
});
