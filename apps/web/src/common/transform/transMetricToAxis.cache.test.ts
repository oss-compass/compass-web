import { QueryClient } from '@tanstack/react-query';
import transMetricToAxis from './transMetricToAxis';

const opts = {
  xKey: 'grimoireCreationDate',
  yKey: 'metricCodequality.activeC1PrCommentsContributorCount',
  legendName: 'contributors',
};
const early = '2026-10-01T00:00:00Z';
const late = '2026-10-08T00:00:00Z';
const metric = (date: string, value: number | null, type?: string) => ({
  grimoireCreationDate: date,
  activeC1PrCommentsContributorCount: value,
  ...(type ? { type } : {}),
});

describe('transMetricToAxis with native query-cache gaps', () => {
  let client: QueryClient;
  beforeEach(() => {
    client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  });
  afterEach(() => client.clear());

  const key = (label: string) => ['Metric', { label }];
  const item = (label: string) => ({
    label,
    level: 'repo' as any,
    result: client.getQueryData<any>(key(label)),
  });
  const expected = (label: string, data: unknown[]) => ({
    label,
    level: 'repo',
    data,
    legendName: opts.legendName,
    key: opts.yKey,
  });

  it('accepts an empty query cache and retains the requested series', () => {
    expect(client.getQueryData(key('missing'))).toBeUndefined();
    expect(transMetricToAxis([item('missing')], opts)).toEqual({
      xAxis: [],
      yResults: [expected('missing', [])],
    });
  });

  it('accepts a genuinely pending native query without waiting for its result', async () => {
    let resolve!: (value: object) => void;
    const response = new Promise<object>((done) => {
      resolve = done;
    });
    const pending = client.fetchQuery({
      queryKey: key('pending'),
      queryFn: () => response,
    });
    try {
      expect(client.getQueryState(key('pending'))?.status).toBe('loading');
      expect(transMetricToAxis([item('pending')], opts)).toEqual({
        xAxis: [],
        yResults: [expected('pending', [])],
      });
    } finally {
      resolve({ metricCodequality: [] });
      await pending;
    }
  });

  it('aligns a missing result with the dates from a completed comparison', () => {
    client.setQueryData(key('ready'), {
      metricCodequality: [metric(late, 3), metric(early, 0)],
    });
    expect(transMetricToAxis([item('missing'), item('ready')], opts)).toEqual({
      xAxis: [early, late],
      yResults: [expected('missing', ['-', '-']), expected('ready', [0, 3])],
    });
  });

  it('accepts the result after its native cache entry has been removed', () => {
    client.setQueryData(key('removed'), {
      metricCodequality: [metric(early, 2)],
    });
    expect(transMetricToAxis([item('removed')], opts).yResults[0].data).toEqual(
      [2]
    );
    client.removeQueries({ queryKey: key('removed'), exact: true });
    expect(client.getQueryData(key('removed'))).toBeUndefined();
    expect(transMetricToAxis([item('removed')], opts)).toEqual({
      xAxis: [],
      yResults: [expected('removed', [])],
    });
  });

  it('preserves labels and order when all comparison results are missing', () => {
    expect(transMetricToAxis([item('first'), item('second')], opts)).toEqual({
      xAxis: [],
      yResults: [expected('first', []), expected('second', [])],
    });
  });

  it('preserves the empty-input result', () => {
    expect(transMetricToAxis([], opts)).toEqual({ xAxis: [], yResults: [] });
  });

  it('preserves ordering, rounding, zero and nullable values in complete data', () => {
    client.setQueryData(key('ready'), {
      metricCodequality: [metric(late, 1.23456), metric(early, 0)],
    });
    client.setQueryData(key('other'), {
      metricCodequality: [metric(early, -2), metric(late, null)],
    });
    expect(transMetricToAxis([item('ready'), item('other')], opts)).toEqual({
      xAxis: [early, late],
      yResults: [expected('ready', [0, 1.235]), expected('other', [-2, null])],
    });
  });

  it('preserves default and explicit community repository-type filtering', () => {
    client.setQueryData(key('community'), {
      metricCodequality: [
        metric(early, 1, 'software-artifact'),
        metric(late, 2, 'governance'),
      ],
    });
    expect(transMetricToAxis([item('community')], opts).xAxis).toEqual([early]);
    expect(
      transMetricToAxis([item('community')], opts, 'governance').xAxis
    ).toEqual([late]);
  });

  it('preserves the existing fallback when the selected metric field is absent', () => {
    client.setQueryData(key('partial'), {});
    expect(transMetricToAxis([item('partial')], opts)).toEqual({
      xAxis: [],
      yResults: [expected('partial', [])],
    });
  });
});
