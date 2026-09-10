import client from '@common/gqlClient';
import {
  MetricDocument,
  MetricContributorDocument,
  StatusVerifyDocument,
  MetricQuery,
  MetricContributorQuery,
  StatusVerifyQuery,
} from '@oss-compass/graphql';
import type { CommunityRepoType } from '@common/constant';
import { ReportMetric, reportModels } from './catalog';

export interface ReportSelection {
  projects: { label: string; level: string; shortCode: string }[];
  start: string;
  end: string;
  dateLabel: string;
  language: 'en' | 'zh';
  topic: 'collaboration' | 'contributor';
  repoType: CommunityRepoType;
  model: string;
}
export interface ReportSnapshot {
  selection: ReportSelection;
  preparedAt: string;
  results: (MetricQuery | MetricContributorQuery)[];
}
export class AnalysisNotReadyError extends Error {}

export async function loadReportSnapshot(
  selection: ReportSelection,
  signal: AbortSignal
): Promise<ReportSnapshot> {
  // Own the selection and responses: subsequent navigation and query-cache
  // refreshes cannot change a preview that has already been prepared.
  const frozen = JSON.parse(JSON.stringify(selection)) as ReportSelection;
  if (!frozen.projects.length) throw new Error('No selected projects');
  const statuses = await Promise.all(
    frozen.projects.map(({ shortCode }) =>
      client.request<StatusVerifyQuery>({
        document: StatusVerifyDocument,
        variables: { shortCode },
        signal,
      })
    )
  );
  if (
    statuses.some(
      ({ analysisStatusVerify: item }, index) =>
        !item ||
        item.status !== 'success' ||
        item.label !== frozen.projects[index].label ||
        item.level !== frozen.projects[index].level
    )
  ) {
    throw new AnalysisNotReadyError();
  }
  const results = await Promise.all(
    frozen.projects.map(({ label, level }) =>
      client.request<MetricQuery | MetricContributorQuery>({
        document:
          frozen.topic === 'collaboration'
            ? MetricDocument
            : MetricContributorDocument,
        variables: {
          label,
          level,
          start: frozen.start,
          end: frozen.end,
          repoType: level === 'community' ? frozen.repoType : '',
        },
        signal,
      })
    )
  );
  // A null/missing model is not an empty result array. Do not silently publish
  // a partial report when the service violates the selected model contract.
  const models = reportModels.filter(
    (model) =>
      model.topic === frozen.topic &&
      (frozen.model === 'all' || model.key === frozen.model)
  );
  if (
    !models.length ||
    results.some((result) =>
      models.some((model) => !Array.isArray(result?.[model.key]))
    )
  )
    throw new Error('Incomplete metric response');
  return {
    selection: frozen,
    preparedAt: new Date().toISOString(),
    results: JSON.parse(JSON.stringify(results)),
  };
}

export function metricSeries(
  snapshot: ReportSnapshot,
  model: string,
  metric: ReportMetric
) {
  // The API applies the date bounds before aggregation. Its first bucket
  // label can precede the requested start; filtering labels again loses data.
  const rows = snapshot.results.map((result) =>
    (result[model] as Record<string, unknown>[]).filter(
      (row) =>
        (!row.type || row.type === snapshot.selection.repoType) &&
        typeof row.grimoireCreationDate === 'string' &&
        Number.isFinite(Date.parse(row.grimoireCreationDate))
    )
  );
  const dates = Array.from(
    new Set(
      rows.flatMap((items) =>
        items.map((row) => row.grimoireCreationDate as string)
      )
    )
  ).sort((a, b) => Date.parse(a) - Date.parse(b));
  const series = rows.map((items, index) => {
    const values = new Map(
      items.map((row) => [row.grimoireCreationDate, row[metric.field]])
    );
    return {
      label: snapshot.selection.projects[index].label,
      values: dates.map((date) => {
        const value = values.get(date);
        return typeof value === 'number' && Number.isFinite(value)
          ? value * (metric.factor ?? 1)
          : null;
      }),
    };
  });
  return { dates, series };
}
