import { createInstance } from 'i18next';
import { init } from 'echarts/core';
import { reportModels } from './catalog';
import { renderReport } from './renderReport';
import { ReportSnapshot } from './snapshot';
import enAnalyze from '../../../../../i18n/en/analyze.json';
import zhAnalyze from '../../../../../i18n/zh/analyze.json';
import enMetrics from '../../../../../i18n/en/metrics_models.json';
import zhMetrics from '../../../../../i18n/zh/metrics_models.json';

jest.mock('echarts/core', () => ({ init: jest.fn(), use: jest.fn() }));
jest.mock('echarts/charts', () => ({ LineChart: {} }));
jest.mock('echarts/components', () => ({ GridComponent: {} }));
jest.mock('echarts/renderers', () => ({ SVGRenderer: {} }));

const snapshot: ReportSnapshot = {
  selection: {
    projects: [
      {
        label: 'https://example.org/项目',
        level: 'community',
        shortCode: 'one',
      },
    ],
    start: '2026-01-01T00:00:00.000Z',
    end: '2026-03-31T23:59:59.999Z',
    dateLabel: '2026-01-01 ~ 2026-03-31',
    language: 'en',
    topic: 'collaboration',
    repoType: 'governance',
    model: 'metricActivity',
  },
  preparedAt: '2026-04-01T10:00:00.000Z',
  results: [
    {
      metricActivity: [
        {
          grimoireCreationDate: '2026-01-01',
          activityScore: 0,
          commitFrequency: 0.00000001,
        },
        { grimoireCreationDate: '2026-02-01', activityScore: null },
      ],
    },
  ] as ReportSnapshot['results'],
};
let i18n: ReturnType<typeof createInstance>;
let chart: {
  setOption: jest.Mock;
  renderToSVGString: jest.Mock;
  dispose: jest.Mock;
};
beforeEach(async () => {
  i18n = createInstance();
  await i18n.init({
    lng: 'en',
    fallbackLng: false,
    resources: {
      en: { analyze: enAnalyze, metrics_models: enMetrics },
      zh: { analyze: zhAnalyze, metrics_models: zhMetrics },
    },
  });
  chart = {
    setOption: jest.fn(),
    renderToSVGString: jest.fn(
      () => '<svg xmlns="http://www.w3.org/2000/svg"></svg>'
    ),
    dispose: jest.fn(),
  };
  jest.mocked(init).mockReturnValue(chart as any);
});
afterEach(() => jest.clearAllMocks());

test.each(['en', 'zh'] as const)(
  'renders a standalone %s snapshot with dates, metadata, zero, gaps and explicit scope',
  async (language) => {
    const view = await renderReport(
      { ...snapshot, selection: { ...snapshot.selection, language } },
      i18n
    );
    const doc = new DOMParser().parseFromString(view, 'text/html');
    expect(doc.documentElement.lang).toBe(language);
    expect(doc.body.textContent).toContain(snapshot.selection.dateLabel);
    expect(doc.body.textContent).toContain(snapshot.preparedAt);
    expect(doc.body.textContent).toContain(
      language === 'en' ? 'Governance Repository' : '治理仓'
    );
    expect(doc.querySelector('tbody')!.textContent).toContain('0');
    expect(doc.querySelector('tbody')!.textContent).toContain('2026-01-01');
    expect(doc.querySelector('tbody')!.textContent).not.toContain('2026-02-01');
    expect(doc.body.textContent).toContain('0.00000001');
    expect(doc.body.textContent).toContain(
      language === 'en' ? 'No data in this date range' : '此时间范围内没有数据'
    );
    expect(doc.body.textContent).toContain(
      language === 'en' ? 'excludes the 3D' : '不含三维'
    );
    expect(doc.querySelectorAll('figure')).toHaveLength(
      reportModels.find((model) => model.key === 'metricActivity')!.metrics
        .length
    );
    expect(doc.querySelector('nav, button, canvas, script, link')).toBeNull();
    expect(doc.querySelector('img')!.getAttribute('src')).toMatch(
      /^data:image\/svg\+xml/
    );
    expect(chart.setOption).toHaveBeenCalledWith(
      expect.objectContaining({
        animation: false,
        series: [
          expect.objectContaining({ data: [0, null], connectNulls: false }),
        ],
      })
    );
    expect(chart.dispose).toHaveBeenCalledTimes(2);
  }
);

test('includes each selected model and metric even if all data is empty', async () => {
  const copy: ReportSnapshot = {
    ...snapshot,
    selection: { ...snapshot.selection, model: 'all' },
    results: [
      {
        metricActivity: [],
        metricCommunity: [],
        metricCodequality: [],
        metricGroupActivity: [],
      },
    ],
  };
  const doc = new DOMParser().parseFromString(
    await renderReport(copy, i18n),
    'text/html'
  );
  expect(doc.querySelectorAll('section')).toHaveLength(4);
  expect(doc.querySelectorAll('figure')).toHaveLength(44);
  expect(doc.querySelectorAll('img')).toHaveLength(0);
  expect(init).not.toHaveBeenCalled();
});

test('escapes project labels and metadata instead of inserting active HTML', async () => {
  const label = '<img src=x onerror="alert(1)"> & "project"';
  const copy: ReportSnapshot = {
    ...snapshot,
    selection: {
      ...snapshot.selection,
      projects: [{ ...snapshot.selection.projects[0], label }],
      dateLabel: '</title><script>alert(1)</script>',
    },
  };
  const doc = new DOMParser().parseFromString(
    await renderReport(copy, i18n),
    'text/html'
  );
  expect(doc.body.textContent).toContain(label);
  expect(doc.querySelector('script, [onerror]')).toBeNull();
  expect(
    doc.querySelector('meta[http-equiv="Content-Security-Policy"]')
  ).not.toBeNull();
});

test('stops before rendering another chart when the job is cancelled', async () => {
  const controller = new AbortController();
  controller.abort();
  await expect(
    renderReport(snapshot, i18n, controller.signal)
  ).rejects.toMatchObject({ name: 'AbortError' });
  expect(init).not.toHaveBeenCalled();
});

test('disposes a chart if SVG rendering fails', async () => {
  chart.renderToSVGString.mockImplementationOnce(() => {
    throw new Error('render failed');
  });
  await expect(renderReport(snapshot, i18n)).rejects.toThrow('render failed');
  expect(chart.dispose).toHaveBeenCalledTimes(1);
});
