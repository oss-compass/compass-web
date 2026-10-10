import type { IssueOverviewTopPain } from '../../types';

export const isHistoricalPain = (pain: IssueOverviewTopPain) =>
  pain.trackingType === 'observe';

export const progressBucket = (pain: IssueOverviewTopPain) => {
  if (isHistoricalPain(pain)) return 'historical';
  const status = Number(pain.trackingStatus);
  if (status === 6) return 'excluded';
  if (status === 1) return 'pending';
  if (status === 5) return 'resolved';
  if ([2, 3, 7].includes(status)) return 'inProgress';
  const state = String(pain.state || '').toLowerCase();
  if (/已闭环|已完成|已解决|closed|resolved/.test(state)) return 'resolved';
  if (/进行中|处理中|修复中|in progress/.test(state)) return 'inProgress';
  return 'pending';
};

export const isResolvedPain = (pain: IssueOverviewTopPain) =>
  progressBucket(pain) === 'resolved';

export const isOpenPain = (pain: IssueOverviewTopPain) =>
  ['pending', 'inProgress'].includes(progressBucket(pain));
