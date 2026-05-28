import { USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO } from '../../rawData/constants';

import type { PainStatus } from './types';

export const STATUS_LABELS: Record<number, string> = {
  [1]: '待确认',
  [2]: '已确认待修复',
  [3]: '已修复待复测',
  [4]: '已复测待确认',
  [5]: '已复测通过',
  [6]: '不需要修复',
  [7]: '复测不通过',
};

export const SEVERITY_OPTIONS = USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO.filter(
  (item) => item.level !== 'P5'
).map((item) => ({
  label: item.label,
  value: item.level,
  description: item.description,
}));

export const CONFIRMED_BY_PATTERN = /^[\u4e00-\u9fa5a-zA-Z0-9 \-_]{1,20}$/;
export const FALLBACK_LINK_TEXT = '未记录';

export const GITCODE_ISSUE_LINK_RE =
  /^https?:\/\/gitcode\.com\/[^/]+\/[^/]+\/issues\/\d+\/?$/;
export const GITCODE_PR_LINK_RE =
  /^https?:\/\/gitcode\.com\/[^/]+\/[^/]+\/pull\/\d+\/?$/;

void (STATUS_LABELS as Record<PainStatus, string>);
