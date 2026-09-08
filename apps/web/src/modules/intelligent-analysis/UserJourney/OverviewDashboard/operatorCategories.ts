import type { RepoProgressRow } from './types';

export const OPERATOR_CATEGORIES = [
  {
    key: 'aal',
    label: 'aal（领域加速库）',
  },
  {
    key: 'catlass',
    label: 'catlass（算子模板库）',
  },
  {
    key: 'ops-basic',
    label: 'ops-basic（基础算子）',
  },
  {
    key: 'ops-nn',
    label: 'ops-nn（神经网络算子）',
  },
  {
    key: 'ops-transformer',
    label: 'ops-transformer',
  },
  {
    key: 'ops-linear-algebra',
    label: 'ops-linear-algebra（线性代数）',
  },
  {
    key: 'cannbot',
    label: 'cannbot（智能体）',
  },
  {
    key: 'render',
    label: 'render（可微渲染）',
  },
];

/** Preserve input order so every category follows the active table sort. */
export function groupOperatorRepos<T extends { repoCategory?: string }>(
  repos: T[]
) {
  const categories = [...OPERATOR_CATEGORIES];
  if (
    repos.some(
      (repo) => !categories.some((group) => group.key === repo.repoCategory)
    )
  ) {
    categories.push({ key: 'uncategorized', label: '未分类' });
  }
  return categories.map((category) => ({
    ...category,
    repos: repos.filter((repo) =>
      category.key === 'uncategorized'
        ? !OPERATOR_CATEGORIES.some((group) => group.key === repo.repoCategory)
        : repo.repoCategory === category.key
    ),
  }));
}

/** Null values do not dilute averages; zero is a valid measured value. */
export function summarizeOperatorRepos(repos: RepoProgressRow[]) {
  const average = (values: Array<number | null | undefined>) => {
    const valid = values.filter(
      (value): value is number =>
        typeof value === 'number' && Number.isFinite(value)
    );
    return valid.length
      ? valid.reduce((sum, value) => sum + value, 0) / valid.length
      : null;
  };
  const latestRepo = repos
    .filter(
      (repo) =>
        repo.latestReportId &&
        Number.isFinite(
          Date.parse(repo.latestReportMetadata?.generatedAt || '')
        )
    )
    .sort(
      (left, right) =>
        Date.parse(right.latestReportMetadata!.generatedAt) -
          Date.parse(left.latestReportMetadata!.generatedAt) ||
        left.id.localeCompare(right.id)
    )[0];
  const latestReportRepos = repos
    .filter(
      (repo) =>
        repo.latestReportId &&
        Number.isFinite(
          Date.parse(repo.latestReportMetadata?.generatedAt || '')
        )
    )
    .sort(
      (left, right) =>
        Date.parse(right.latestReportMetadata!.generatedAt) -
          Date.parse(left.latestReportMetadata!.generatedAt) ||
        left.id.localeCompare(right.id)
    );
  const latestDistinctValues = (
    field: 'hardwareEnv' | 'operatingSystem'
  ): string[] => {
    const values: string[] = [];
    latestReportRepos.forEach((repo) => {
      const value = String(repo.latestReportMetadata?.[field] || '').trim();
      if (value && !values.includes(value)) values.push(value);
    });
    return values.slice(0, 2);
  };
  return {
    score: average(repos.map((repo) => repo.score)),
    successRate: average(repos.map((repo) => repo.successRate)),
    executionTime: average(repos.map((repo) => repo.executionTime)),
    closeRate: average(
      repos.map((repo) =>
        repo.overall.total === 0 ? 100 : repo.overall.closeRate
      )
    ),
    total: repos.reduce((sum, repo) => sum + repo.overall.total, 0),
    pending: repos.reduce((sum, repo) => sum + repo.overall.pending, 0),
    inProgress: repos.reduce((sum, repo) => sum + repo.overall.inProgress, 0),
    resolved: repos.reduce((sum, repo) => sum + repo.overall.resolved, 0),
    latestRepo,
    hardwareEnvs: latestDistinctValues('hardwareEnv'),
    operatingSystems: latestDistinctValues('operatingSystem'),
  };
}
