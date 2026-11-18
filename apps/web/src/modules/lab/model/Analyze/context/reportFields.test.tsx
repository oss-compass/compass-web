import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server.node';
import { Level } from '@common/constant';
import type { LabModelVersionReportDetailQuery } from '@oss-compass/graphql';
import { ChartsDataContext } from './LabDataProvider';
import useLabDataMainScore from '../hooks/useLabDataMainScore';
import useLabDataMetric from '../hooks/useLabDataMetric';
import { alignValuesWithDates, pickDataByTab, pickTabs } from './dataHandle';

jest.mock('../hooks/useTimeAndChartType', () => ({
  __esModule: true,
  default: () => ({ chartType: null }),
}));

type Report = LabModelVersionReportDetailQuery['labModelVersionReportDetail'];
const metric = { id: 1, ident: 'activity', category: 'activity' };
const diagram = () => ({
  tabIdent: 'all',
  type: 'line',
  dates: ['2026-09-01T00:00:00Z'],
  values: [0],
});
const panel = () => ({ metric, diagrams: [diagram()] });
const entry = (label: string, value: Report) => ({
  label,
  level: Level.REPO,
  result: { labModelVersionReportDetail: value },
});
const readHook = <T,>(items: ReturnType<typeof entry>[], hook: () => T): T => {
  let result: T;
  const Probe = () => {
    result = hook();
    return null;
  };
  // All responses are ready: this is the branch where ChartPanel mounts
  // its card content, rather than the separate pending/loading branch.
  renderToStaticMarkup(
    <ChartsDataContext.Provider value={{ loading: false, items }}>
      <Probe />
    </ChartsDataContext.Provider>
  );
  return result;
};

describe('ready Lab report fields', () => {
  it.each([null, undefined])(
    'accepts an unavailable main score (%s)',
    (score) => {
      const result = readHook(
        [entry('first', { mainScore: score, panels: [] })],
        useLabDataMainScore
      );
      expect(result).toEqual({
        loading: false,
        data: [
          {
            label: 'first',
            level: Level.REPO,
            chartType: 'line',
            dates: [],
            values: [],
          },
        ],
      });
      expect(alignValuesWithDates(result.data)).toEqual(result.data);
    }
  );

  it('normalizes nullable score arrays', () => {
    const result = readHook(
      [entry('first', { mainScore: { dates: null, values: null } })],
      useLabDataMainScore
    );
    expect(result.data[0]).toMatchObject({ dates: [], values: [] });
  });

  it('preserves zero scores and ready comparison order', () => {
    const result = readHook(
      [
        entry('first', { mainScore: diagram() }),
        entry('second', { mainScore: diagram() }),
      ],
      useLabDataMainScore
    );
    expect(result.data.map((item) => item.label)).toEqual(['first', 'second']);
    expect(result.data[0]).toMatchObject({
      chartType: 'line',
      dates: diagram().dates,
      values: [0],
    });
  });

  it('keeps valid metric data alongside a ready report with null panels', () => {
    const result = readHook(
      [
        entry('first', { panels: null }),
        entry('second', { panels: [panel()] }),
      ],
      useLabDataMetric
    );
    expect(result.data[0].panels).toEqual([]);
    const selected = result.pickDataByMetric('activity');
    expect(selected.map((item) => item.label)).toEqual(['second']);
    expect(pickDataByTab(selected, 'all')[0].values).toEqual([0]);
  });

  it('ignores panels without a metric descriptor', () => {
    const result = readHook(
      [
        entry('first', {
          panels: [{ metric: null, diagrams: [diagram()] }, panel()],
        }),
      ],
      useLabDataMetric
    );
    expect(result.data[0].panels).toEqual([panel()]);
    expect(result.pickDataByMetric('activity')).toHaveLength(1);
  });

  it('omits a report without the requested metric before selecting its diagram', () => {
    const result = readHook(
      [
        entry('first', {
          panels: [{ metric: { ident: 'other' }, diagrams: [diagram()] }],
        }),
        entry('second', { panels: [panel()] }),
      ],
      useLabDataMetric
    );
    const selected = result.pickDataByMetric('activity');
    expect(pickDataByTab(selected, 'all').map((item) => item.label)).toEqual([
      'second',
    ]);
  });

  it('preserves matching metrics for every ready comparison', () => {
    const result = readHook(
      [
        entry('first', { panels: [panel()] }),
        entry('second', { panels: [panel()] }),
      ],
      useLabDataMetric
    );
    expect(
      result.pickDataByMetric('activity').map((item) => item.label)
    ).toEqual(['first', 'second']);
  });
});

describe('Lab diagram selection', () => {
  const slug = (label: string, diagrams) => ({
    label,
    level: Level.REPO,
    metric,
    diagrams,
  });

  it.each([null, []])(
    'finds available tabs after an empty diagram list (%s)',
    (diagrams) => {
      expect(
        pickTabs([slug('first', diagrams), slug('second', [diagram()])])
      ).toEqual([{ label: 'all', value: 'all' }]);
    }
  );

  it('returns an empty tab list when no diagrams exist', () => {
    expect(pickTabs([])).toEqual([]);
  });

  it('represents an absent selected diagram with empty arrays', () => {
    const selected = pickDataByTab([slug('first', [diagram()])], 'missing');
    expect(selected[0]).toMatchObject({ dates: [], values: [] });
    expect(alignValuesWithDates(selected)).toEqual(selected);
  });

  it('normalizes nullable diagram arrays before date alignment', () => {
    const selected = pickDataByTab(
      [slug('first', [{ ...diagram(), dates: null, values: null }])],
      'all'
    );
    expect(selected[0]).toMatchObject({ dates: [], values: [] });
    expect(alignValuesWithDates(selected)).toEqual(selected);
  });

  it.each([null, undefined])(
    'tolerates an unavailable metric descriptor (%s)',
    (descriptor) => {
      expect(
        pickDataByTab(
          [{ ...slug('first', [diagram()]), metric: descriptor }],
          'all'
        )[0]
      ).toMatchObject({ values: [0] });
    }
  );

  it('keeps yearly metrics as bar charts', () => {
    expect(
      pickDataByTab(
        [{ ...slug('first', [diagram()]), metric: { ident: 'activity_year' } }],
        'all'
      )[0].chartType
    ).toBe('bar');
  });
});
