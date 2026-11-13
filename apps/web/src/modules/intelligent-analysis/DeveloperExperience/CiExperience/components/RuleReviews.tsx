import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { CiProblem, CiRun } from '../types';
import {
  fetchRunRuleReviews,
  ruleLinkLabels,
  runReviewLabels,
  type CiRunRuleReview,
  type CiRule,
} from '../ruleReviews';

const ReviewContext = createContext<{
  rows: CiRunRuleReview[];
  loading: boolean;
  error: boolean;
  retry: () => Promise<unknown>;
} | null>(null);
export const useCiRuleReviews = () => useContext(ReviewContext);

export const sameReviewProblem = (row: CiRunRuleReview, problem: CiProblem) =>
  row.title === problem.title &&
  row.kb === problem.kb &&
  row.dim === problem.dim;

export const CiRuleReviewProvider: React.FC<{
  repo: string;
  day: string;
  children: React.ReactNode;
}> = ({ repo, day, children }) => {
  const query = useQuery({
    queryKey: ['ci-run-rule-reviews', repo, day],
    queryFn: ({ signal }) => fetchRunRuleReviews(repo, day, signal),
    staleTime: 0,
    retry: 1,
  });
  return (
    <ReviewContext.Provider
      value={{
        rows: query.isError ? [] : query.data?.items || [],
        loading: query.isLoading,
        error: query.isError,
        retry: () => query.refetch(),
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const CiRuleDescription: React.FC<{ rule: CiRule }> = ({ rule }) => (
  <details className="text-xs leading-5">
    <summary className="cursor-pointer break-all text-blue-600">
      {rule.rule_id} · {rule.version}
    </summary>
    <div className="mt-2 space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-600">
      <div>{rule.desc || '暂无判据说明'}</div>
      <div>
        {rule.cls} / {rule.mech}
      </div>
      <div>
        分类：{rule.cat} / {rule.sub_label}
      </div>
      <div>
        匹配表达式：
        <code className="whitespace-pre-wrap break-all">
          {rule.pattern || '—'}
        </code>
      </div>
      <div>
        轮次 / 层级：{rule.round || '—'} / {rule.tier || '—'}
      </div>
    </div>
  </details>
);

export const CiProblemRuleSummary: React.FC<{ problem: CiProblem }> = ({
  problem,
}) => {
  const context = useCiRuleReviews();
  if (!context) return null;
  if (context.loading)
    return (
      <div className="px-4 pb-2 text-xs text-slate-400">
        正在读取判据与审核进度…
      </div>
    );
  if (context.error)
    return (
      <div className="px-4 pb-2 text-xs text-red-600">
        判据与审核读取失败{' '}
        <button type="button" onClick={() => void context.retry()}>
          重试
        </button>
      </div>
    );
  const rows = context.rows.filter((row) => sameReviewProblem(row, problem));
  const count = rows.filter((row) =>
    ['confirmed', 'incorrect'].includes(row.status)
  ).length;
  const ids = Array.from(
    new Set(rows.map((row) => row.rule_id).filter(Boolean))
  );
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 pb-2 text-xs text-slate-500">
      <span>判据：{ids.join('、') || problem.rule_id || '未关联'}</span>
      <span>
        已确认 {count}/{rows.length}
      </span>
    </div>
  );
};

export const CiRunRuleCell: React.FC<{ problem: CiProblem; run: CiRun }> = ({
  problem,
  run,
}) => {
  const context = useCiRuleReviews();
  const row = context?.rows.find(
    (item) =>
      sameReviewProblem(item, problem) &&
      item.run.id === run.id &&
      item.run.stage === run.stage &&
      item.run.job === run.job
  );
  if (!row)
    return (
      <span>
        {context?.loading
          ? '读取中'
          : context?.error
          ? '读取失败'
          : run.rule_id || problem.rule_id || '未关联'}
      </span>
    );
  return (
    <div className="space-y-1">
      {row.rule ? (
        <CiRuleDescription rule={row.rule} />
      ) : (
        <span>
          {row.rule_id || ''} {ruleLinkLabels[row.rule_status]}
        </span>
      )}
      <div className="text-xs text-slate-500">
        {runReviewLabels[row.status]}
      </div>
    </div>
  );
};
