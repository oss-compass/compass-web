import type { CiPri } from '../../types';
import type { CiTopIssue } from './communityMetrics';

export type CiPainView = 'all' | 'open' | 'done';

export type CiFrequentPain = {
  key: string;
  title: string;
  dimension: string | null;
  stages: string[];
  priority: CiPri;
  repoCount: number;
  issues: CiTopIssue[];
};

/** 只汇总各仓最新日报中的有效痛点；跨仓同类问题按维度及后端问题类型合并。 */
export const buildCiFrequentPains = (
  issues: CiTopIssue[],
  view: CiPainView
): CiFrequentPain[] => {
  const grouped = new Map<string, CiTopIssue[]>();
  const unique = new Map(issues.map((issue) => [issue.key, issue]));
  unique.forEach((issue) => {
    if (
      issue.status === 'invalid' ||
      (view === 'open' && issue.status === 'fixed') ||
      (view === 'done' && issue.status !== 'fixed')
    )
      return;
    const title = issue.kb.trim() || issue.title.trim() || issue.problemKey;
    const key = JSON.stringify([issue.dim, title]);
    const group = grouped.get(key) ?? [];
    group.push(issue);
    grouped.set(key, group);
  });
  return Array.from(grouped, ([key, values]) => ({
    key,
    title:
      values[0].kb.trim() || values[0].title.trim() || values[0].problemKey,
    dimension: values[0].dim,
    stages: Array.from(
      new Set(values.flatMap((issue) => issue.journeyStages))
    ).filter(Boolean),
    priority: values.reduce<CiPri>(
      (priority, issue) => (issue.pri < priority ? issue.pri : priority),
      values[0].pri
    ),
    repoCount: new Set(values.map((issue) => issue.repo)).size,
    issues: values,
  })).sort((left, right) => {
    const frequency =
      view === 'all'
        ? right.repoCount - left.repoCount
        : right.issues.length - left.issues.length;
    return (
      frequency ||
      right.issues.length - left.issues.length ||
      left.priority.localeCompare(right.priority) ||
      left.title.localeCompare(right.title, 'zh-CN') ||
      left.key.localeCompare(right.key)
    );
  });
};
