import {
  compassApiFetch,
  compassApiUrl,
} from '../../UserJourney/rawData/apiClient';
import type {
  TrackingRecord,
  TrackingScope,
} from './components/PainTracking/model';
import type { CiRun } from './types';

export type CiRule = {
  rule_id: string;
  version: string;
  cat?: string;
  sub_label?: string;
  cls?: string;
  mech?: string;
  pattern?: string;
  desc?: string;
  round?: string;
  tier?: string;
};
export type CiRunDecision = {
  action: string;
  reviewed_by: string;
  reviewed_at: string;
  reason: string;
  corrected_rule: CiRule | null;
  original_rule: CiRule | null;
};
export type CiRunRuleReview = {
  instance_id: string;
  problem_key: string;
  title: string;
  dim: string;
  kb: string;
  run: CiRun;
  rule_id: string | null;
  rule_status: 'matched' | 'unlinked' | 'missing' | 'ambiguous';
  rule: CiRule | null;
  status:
    | 'pending'
    | 'needs_review'
    | 'confirmed'
    | 'incorrect'
    | 'insufficient';
  decision: CiRunDecision | null;
  history: CiRunDecision[];
  evidence: { sig?: string };
  revision: number;
  evidence_revision: string;
};
export const runReviewLabels: Record<CiRunRuleReview['status'], string> = {
  pending: '待确认',
  needs_review: '需重新确认',
  confirmed: '判据正确',
  incorrect: '判据有误',
  insufficient: '证据不足',
};
export const ruleLinkLabels: Record<CiRunRuleReview['rule_status'], string> = {
  matched: '已关联',
  unlinked: '未关联',
  missing: '判据不存在',
  ambiguous: '判据版本不唯一',
};
export const fetchRunRuleReviews = (
  repo: string,
  day: string,
  signal?: AbortSignal
) =>
  compassApiFetch<{ items: CiRunRuleReview[] }>(
    `/ci-experience/run-rule-reviews/report?${new URLSearchParams({
      repo,
      day,
    })}`,
    { signal }
  );

export type CiRunReviewAction = 'confirmed' | 'incorrect' | 'insufficient';
export class RunReviewError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}
export type CiRunBatchReviewResult = {
  items: Array<{
    instance_id: string;
    ok: boolean;
    error?: string;
    status_code?: number;
  }>;
  succeeded_count: number;
  failed_count: number;
  tracking: TrackingRecord | null;
  tracking_error?: string | null;
};
export const savePainRunReviews = async (
  payload: TrackingScope & {
    problemKey: string;
    items: Array<
      Pick<CiRunRuleReview, 'instance_id' | 'evidence_revision' | 'revision'>
    >;
    action: CiRunReviewAction;
    operator: string;
    reason: string;
  }
): Promise<CiRunBatchReviewResult> => {
  const response = await fetch(
    compassApiUrl('/ci-experience/pain-trackings/run-reviews/actions-batch'),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new RunReviewError(
      typeof body?.detail === 'string'
        ? body.detail
        : '批量判定保存失败，请刷新后重试',
      response.status
    );
  }
  return response.json();
};
export const savePainRunReview = async (
  payload: TrackingScope & {
    problemKey: string;
    instance_id: string;
    evidence_revision: string;
    revision: number;
    action: CiRunReviewAction;
    operator: string;
    reason: string;
  }
) => {
  const response = await fetch(
    compassApiUrl('/ci-experience/pain-trackings/run-reviews/actions'),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new RunReviewError(
      typeof body?.detail === 'string'
        ? body.detail
        : '执行记录判定保存失败，请重试',
      response.status
    );
  }
  return response.json() as Promise<{
    data: { instance_id: string };
    tracking: TrackingRecord | null;
  }>;
};
