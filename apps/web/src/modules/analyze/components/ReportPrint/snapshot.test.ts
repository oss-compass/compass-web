import { parse, OperationDefinitionNode, FieldNode } from 'graphql';
import { createInstance } from 'i18next';
import client from '@common/gqlClient';
import {
  MetricDocument,
  MetricContributorDocument,
  StatusVerifyDocument,
} from '@oss-compass/graphql';
import {
  AnalysisNotReadyError,
  loadReportSnapshot,
  metricSeries,
  ReportSelection,
  ReportSnapshot,
} from './snapshot';
import { reportModels } from './catalog';
import enAnalyze from '../../../../../i18n/en/analyze.json';
import zhAnalyze from '../../../../../i18n/zh/analyze.json';
import enMetrics from '../../../../../i18n/en/metrics_models.json';
import zhMetrics from '../../../../../i18n/zh/metrics_models.json';

const selection: ReportSelection = {
  projects: [
    {
      label: 'https://github.com/example/one',
      level: 'repo',
      shortCode: 'one',
    },
  ],
  start: '2026-01-01T00:00:00.000Z',
  end: '2026-03-31T23:59:59.999Z',
  dateLabel: '2026-01-01 ~ 2026-03-31',
  language: 'en',
  topic: 'collaboration',
  repoType: 'software-artifact',
  model: 'metricActivity',
};
const success = {
  analysisStatusVerify: { ...selection.projects[0], status: 'success' },
};

beforeEach(() => jest.restoreAllMocks());

test('captures the effective dates, original values and selection independently of later updates', async () => {
  const input = JSON.parse(JSON.stringify(selection));
  const result = {
    metricActivity: [{ grimoireCreationDate: '2026-02-01', activityScore: 0 }],
  };
  const request = jest
    .spyOn(client, 'request')
    .mockResolvedValueOnce(success)
    .mockResolvedValueOnce(result);
  const controller = new AbortController();
  const pending = loadReportSnapshot(input, controller.signal);
  input.start = '2030-01-01';
  input.projects[0].label = 'changed';
  const snapshot = await pending;
  result.metricActivity[0].activityScore = 1;
  expect(snapshot.selection).toEqual(selection);
  expect(snapshot.results[0]).toEqual({
    metricActivity: [{ grimoireCreationDate: '2026-02-01', activityScore: 0 }],
  });
  expect(request).toHaveBeenNthCalledWith(1, {
    document: StatusVerifyDocument,
    variables: { shortCode: 'one' },
    signal: controller.signal,
  });
  expect(request).toHaveBeenNthCalledWith(2, {
    document: MetricDocument,
    variables: {
      label: selection.projects[0].label,
      level: 'repo',
      start: selection.start,
      end: selection.end,
      repoType: '',
    },
    signal: controller.signal,
  });
});

test('uses the contributor query and community repository filter', async () => {
  const input: ReportSelection = {
    ...selection,
    topic: 'contributor',
    model: 'all',
    repoType: 'governance',
    projects: [{ ...selection.projects[0], level: 'community' }],
  };
  const request = jest
    .spyOn(client, 'request')
    .mockResolvedValueOnce({
      analysisStatusVerify: { ...input.projects[0], status: 'success' },
    })
    .mockResolvedValueOnce({
      metricMilestonePersona: [],
      metricDomainPersona: [],
      metricRolePersona: [],
    });
  await loadReportSnapshot(input, new AbortController().signal);
  expect(request).toHaveBeenLastCalledWith(
    expect.objectContaining({
      document: MetricContributorDocument,
      variables: expect.objectContaining({
        repoType: 'governance',
        level: 'community',
      }),
    })
  );
});

test.each(['pending', 'progress', 'error', 'canceled', 'unsubmit', 'unknown'])(
  'blocks %s status without requesting metrics',
  async (status) => {
    const request = jest.spyOn(client, 'request').mockResolvedValueOnce({
      analysisStatusVerify: { ...selection.projects[0], status },
    });
    await expect(
      loadReportSnapshot(selection, new AbortController().signal)
    ).rejects.toBeInstanceOf(AnalysisNotReadyError);
    expect(request).toHaveBeenCalledTimes(1);
  }
);

test('rejects a missing or mismatched project identity', async () => {
  const request = jest
    .spyOn(client, 'request')
    .mockResolvedValueOnce({ analysisStatusVerify: null })
    .mockResolvedValueOnce({
      analysisStatusVerify: {
        ...selection.projects[0],
        label: 'wrong',
        status: 'success',
      },
    });
  await expect(
    loadReportSnapshot(selection, new AbortController().signal)
  ).rejects.toBeInstanceOf(AnalysisNotReadyError);
  await expect(
    loadReportSnapshot(selection, new AbortController().signal)
  ).rejects.toBeInstanceOf(AnalysisNotReadyError);
  expect(request).toHaveBeenCalledTimes(2);
});

test('does not publish a comparison when one project request fails', async () => {
  const input = {
    ...selection,
    projects: [
      ...selection.projects,
      { label: 'two', shortCode: 'two', level: 'repo' },
    ],
  };
  jest
    .spyOn(client, 'request')
    .mockResolvedValueOnce(success)
    .mockResolvedValueOnce({
      analysisStatusVerify: { ...input.projects[1], status: 'success' },
    })
    .mockResolvedValueOnce({ metricActivity: [] })
    .mockRejectedValueOnce(new Error('Network error'));
  await expect(
    loadReportSnapshot(input, new AbortController().signal)
  ).rejects.toThrow('Network error');
});

test.each([{}, { metricActivity: null }])(
  'rejects incomplete model responses: %j',
  async (result) => {
    jest
      .spyOn(client, 'request')
      .mockResolvedValueOnce(success)
      .mockResolvedValueOnce(result);
    await expect(
      loadReportSnapshot(selection, new AbortController().signal)
    ).rejects.toThrow('Incomplete metric response');
  }
);

test('keeps an empty array distinct from a failed response', async () => {
  jest
    .spyOn(client, 'request')
    .mockResolvedValueOnce(success)
    .mockResolvedValueOnce({ metricActivity: [] });
  await expect(
    loadReportSnapshot(selection, new AbortController().signal)
  ).resolves.toMatchObject({ results: [{ metricActivity: [] }] });
});

test('aligns comparison dates, keeps boundary buckets and zero, and filters invalid dates/types', () => {
  const snapshot = {
    selection: {
      ...selection,
      projects: [...selection.projects, { label: 'two' }],
    },
    results: [
      {
        metricActivity: [
          { grimoireCreationDate: '2026-02-01', updatedSince: 0 },
          { grimoireCreationDate: '2026-03-01', updatedSince: null },
          {
            grimoireCreationDate: '2026-01-01',
            updatedSince: 99,
            type: 'governance',
          },
          { grimoireCreationDate: '2025-12-29', updatedSince: 99 },
          { grimoireCreationDate: 'invalid', updatedSince: 99 },
        ],
      },
      {
        metricActivity: [
          { grimoireCreationDate: '2026-01-01', updatedSince: 2 },
          { grimoireCreationDate: '2026-03-01', updatedSince: '' },
        ],
      },
    ],
  } as ReportSnapshot;
  expect(
    metricSeries(snapshot, 'metricActivity', {
      field: 'updatedSince',
      title: '',
      factor: 30,
    })
  ).toEqual({
    dates: ['2025-12-29', '2026-01-01', '2026-02-01', '2026-03-01'],
    series: [
      { label: selection.projects[0].label, values: [2970, null, 0, null] },
      { label: 'two', values: [null, 60, null, null] },
    ],
  });
});

test('every report field exists in the real GraphQL query and every title is translated in both languages', async () => {
  const i18n = createInstance();
  await i18n.init({
    resources: {
      en: { analyze: enAnalyze, metrics_models: enMetrics },
      zh: { analyze: zhAnalyze, metrics_models: zhMetrics },
    },
    fallbackLng: false,
  });
  for (const model of reportModels) {
    const query = parse(
      model.topic === 'collaboration'
        ? MetricDocument
        : MetricContributorDocument
    ).definitions[0] as OperationDefinitionNode;
    const root = query.selectionSet.selections.find(
      (field: FieldNode) => field.name.value === model.key
    ) as FieldNode;
    const fields = root.selectionSet!.selections.map(
      (field: FieldNode) => field.name.value
    );
    expect(new Set(model.metrics.map((metric) => metric.field)).size).toBe(
      model.metrics.length
    );
    for (const metric of model.metrics) {
      expect(fields).toContain(metric.field);
      for (const lng of ['en', 'zh']) {
        expect(i18n.exists(metric.title, { lng })).toBe(true);
        if (metric.qualifier)
          expect(i18n.exists(metric.qualifier, { lng })).toBe(true);
      }
    }
    for (const lng of ['en', 'zh'])
      expect(i18n.exists(model.title, { lng })).toBe(true);
  }
});
