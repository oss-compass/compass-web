import React from 'react';
import {
  ApiOutlined,
  AppstoreOutlined,
  BuildOutlined,
  CodeOutlined,
  CopyOutlined,
  DashboardOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import {
  ActionCard,
  ActionDetailRecord,
  ActionStatus,
  PainGuideItem,
  PainLevel,
  Tone,
} from './types';
import { USER_JOURNEY_PAIN_GUIDE_ITEMS } from './rawData/constants';

const journeyStepIconMap: Record<string, React.ReactNode> = {
  discover: React.createElement(AppstoreOutlined),
  comprehend: React.createElement(ApiOutlined),
  environment: React.createElement(DashboardOutlined),
  acquire: React.createElement(CopyOutlined),
  build: React.createElement(CodeOutlined),
  deploy: React.createElement(BuildOutlined),
  verify: React.createElement(ToolOutlined),
};

const stepPresentationMap: Record<
  string,
  {
    key: string;
    iconKey: string;
    color: string;
  }
> = {
  // 旧 step_id 体系（向后兼容）
  S0_DISCOVER: {
    key: 'discover',
    iconKey: 'discover',
    color: '#2563eb',
  },
  S1_COMPREHEND: {
    key: 'comprehend',
    iconKey: 'comprehend',
    color: '#7c3aed',
  },
  S2_ENVIRONMENT: {
    key: 'environment',
    iconKey: 'environment',
    color: '#ea580c',
  },
  S3_ACQUIRE: {
    key: 'acquire',
    iconKey: 'acquire',
    color: '#059669',
  },
  S4_BUILD: {
    key: 'build',
    iconKey: 'build',
    color: '#d97706',
  },
  S5_DEPLOY: {
    key: 'deploy',
    iconKey: 'deploy',
    color: '#db2777',
  },
  S6_VERIFY: {
    key: 'verify',
    iconKey: 'verify',
    color: '#1d4ed8',
  },
  // 新 step_id 体系
  S0_DISCOVERY: {
    key: 'discovery',
    iconKey: 'discover',
    color: '#2563eb',
  },
  S1_SETUP: {
    key: 'setup',
    iconKey: 'environment',
    color: '#7c3aed',
  },
  S2_QUICKSTART: {
    key: 'quickstart',
    iconKey: 'build',
    color: '#ea580c',
  },
  S3_DEVELOPMENT: {
    key: 'development',
    iconKey: 'comprehend',
    color: '#059669',
  },
  S4_TESTING: {
    key: 'testing',
    iconKey: 'verify',
    color: '#d97706',
  },
  S5_CONTRIBUTION: {
    key: 'contribution',
    iconKey: 'deploy',
    color: '#db2777',
  },
};

const painLabelMap: Record<PainLevel, string> = {
  P0_BLOCKER: '完全阻塞',
  P1_CRITICAL: '严重',
  P2_MAJOR: '显著',
  P3_MINOR: '轻微',
  P4_TRIVIAL: '无感',
};

export const experienceGradeGuideItems = [
  {
    grade: 'A',
    scoreRange: '90 — 100',
    label: '卓越',
    english: 'Excellent',
    description: '外部开发者可在15-30分钟内丝滑跑通Quick Start全流程',
    rowClassName: 'bg-emerald-50',
    badgeClassName: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    accentColor: '#16a34a',
  },
  {
    grade: 'B',
    scoreRange: '75 — 89',
    label: '良好',
    english: 'Good',
    description: '有小摩擦但不阻塞，30分钟-1小时内可完成全流程',
    rowClassName: 'bg-sky-50',
    badgeClassName: 'border-sky-200 bg-sky-50 text-sky-700',
    accentColor: '#0284c7',
  },
  {
    grade: 'C',
    scoreRange: '60 — 74',
    label: '合格',
    english: 'Acceptable',
    description: '存在显著痛点但可绕过，需1-2小时，可能需查阅社区问答',
    rowClassName: 'bg-amber-50',
    badgeClassName: 'border-amber-200 bg-amber-50 text-amber-700',
    accentColor: '#d97706',
  },
  {
    grade: 'D',
    scoreRange: '40 — 59',
    label: '欠佳',
    english: 'Poor',
    description: '多处阻塞需社区求助，超2小时，首次成功率<50%',
    rowClassName: 'bg-orange-50',
    badgeClassName: 'border-orange-200 bg-orange-50 text-orange-700',
    accentColor: '#ea580c',
  },
  {
    grade: 'F',
    scoreRange: '0 — 39',
    label: '不合格',
    english: 'Failing',
    description: '无法独立完成，需内部团队支持或线下指导',
    rowClassName: 'bg-rose-50',
    badgeClassName: 'border-rose-200 bg-rose-50 text-rose-700',
    accentColor: '#e11d48',
  },
] as const;

export type ExperienceGrade =
  (typeof experienceGradeGuideItems)[number]['grade'];

const experienceGradeGuideItemMap: Record<
  ExperienceGrade,
  (typeof experienceGradeGuideItems)[number]
> = {
  A: experienceGradeGuideItems[0],
  B: experienceGradeGuideItems[1],
  C: experienceGradeGuideItems[2],
  D: experienceGradeGuideItems[3],
  F: experienceGradeGuideItems[4],
};

export const getJourneyStepIcon = (iconKey: string) =>
  journeyStepIconMap[iconKey] ?? React.createElement(AppstoreOutlined);

export const getStepPresentation = (stepId: string) => {
  const mappedPresentation = stepPresentationMap[stepId];

  if (mappedPresentation) {
    return mappedPresentation;
  }

  const fallbackKey = stepId
    .toLowerCase()
    .replace(/^s\d+_/, '')
    .replace(/[^a-z0-9]+/g, '-');

  return {
    key: fallbackKey || stepId.toLowerCase(),
    iconKey: 'discover',
    color: '#2563eb',
  };
};

export const getPainLevelFromScore = (
  score: number | null | undefined
): PainLevel => {
  if (score == null || Number.isNaN(score)) {
    return 'P2_MAJOR';
  }

  // 0 → 完全阻塞
  if (score === 0) {
    return 'P0_BLOCKER';
  }

  // 1–59 → 关键卡点
  if (score < 60) {
    return 'P1_CRITICAL';
  }

  // 60–79 → 显著影响
  if (score < 80) {
    return 'P2_MAJOR';
  }

  // 80–94 → 体验流畅
  if (score < 95) {
    return 'P3_MINOR';
  }

  // 95–100 → 极致体验
  return 'P4_TRIVIAL';
};

export const getPainLabel = (level: PainLevel) => painLabelMap[level];

const painGuideItemMap: Record<PainLevel, PainGuideItem> =
  USER_JOURNEY_PAIN_GUIDE_ITEMS.reduce((acc, item) => {
    acc[item.level] = item;
    return acc;
  }, {} as Record<PainLevel, PainGuideItem>);

/**
 * 根据 PainLevel 获取完整的痛点标准条目，供全景图和说明浮层共用。
 */
export const getPainGuideItem = (level: PainLevel): PainGuideItem =>
  painGuideItemMap[level];

export const getExperienceGradeFromScore = (
  score: number | null | undefined
): ExperienceGrade => {
  if (score == null || Number.isNaN(score)) {
    return 'F';
  }

  if (score >= 90) {
    return 'A';
  }

  if (score >= 75) {
    return 'B';
  }

  if (score >= 60) {
    return 'C';
  }

  if (score >= 40) {
    return 'D';
  }

  return 'F';
};

export const getExperienceGradeGuideItem = (grade: ExperienceGrade) =>
  experienceGradeGuideItemMap[grade];

export const getExperienceGradeLabelFromScore = (
  score: number | null | undefined
) => getExperienceGradeGuideItem(getExperienceGradeFromScore(score)).label;

export const getToneByScore = (score: number | null | undefined): Tone => {
  if (score == null || Number.isNaN(score)) {
    return 'neutral';
  }

  if (score < 40) {
    return 'critical';
  }

  if (score < 60) {
    return 'warning';
  }

  if (score < 80) {
    return 'neutral';
  }

  return 'positive';
};

export const getPainClasses = (level: PainLevel) => {
  switch (level) {
    case 'P0_BLOCKER':
      return 'border-rose-200 bg-rose-50 text-rose-700';
    case 'P1_CRITICAL':
      return 'border-red-200 bg-red-50 text-red-700';
    case 'P2_MAJOR':
      return 'border-amber-200 bg-amber-50 text-amber-700';
    case 'P4_TRIVIAL':
      return 'border-slate-200 bg-slate-50 text-slate-600';
    default:
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  }
};

export const getActionStatusClasses = (status: ActionStatus | undefined) => {
  switch (status) {
    case 'success':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    case 'warning':
      return 'border-amber-200 bg-amber-50 text-amber-700';
    case 'failed':
      return 'border-rose-200 bg-rose-50 text-rose-700';
    default:
      return 'border-slate-200 bg-slate-50 text-slate-600';
  }
};

export const getActionStatus = (
  success: boolean | undefined,
  errorMessage?: string | null
): ActionStatus => {
  if (success) {
    return 'success';
  }

  if (errorMessage) {
    return 'failed';
  }

  return 'warning';
};

export const getAggregateActionStatus = (
  actionStatuses: ActionStatus[]
): ActionStatus => {
  if (!actionStatuses.length) {
    return 'neutral';
  }

  if (actionStatuses.every((status) => status === 'success')) {
    return 'success';
  }

  if (actionStatuses.every((status) => status === 'failed')) {
    return 'failed';
  }

  return 'warning';
};

export const getActionStatusLabel = (status: ActionStatus) => {
  switch (status) {
    case 'success':
      return '全部成功';
    case 'failed':
      return '执行失败';
    case 'warning':
      return '部分成功';
    default:
      return '待确认';
  }
};

export const formatCompactDuration = (seconds: number | null | undefined) => {
  if (seconds == null || Number.isNaN(seconds)) {
    return '';
  }

  if (seconds < 60) {
    return `${Number(seconds.toFixed(1))}s`;
  }

  const totalSeconds = Math.round(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  if (!minutes) {
    return `${totalSeconds}s`;
  }

  return remainingSeconds ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
};

const formatNumber = (value: number) => {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  if (Math.abs(value) >= 1000) {
    return value.toLocaleString('en-US');
  }

  return Number.isInteger(value)
    ? String(value)
    : String(Number(value.toFixed(1)));
};

export const formatMetricValue = (
  value: number | string | null | undefined,
  unit: string
) => {
  if (value == null || value === '') {
    return 'N/A';
  }

  if (typeof value === 'string') {
    return value;
  }

  switch (unit) {
    case 'percentage':
      return `${formatNumber(value)}%`;
    case 'seconds':
      return `${formatNumber(value)} 秒`;
    case 'minutes':
      return `${formatNumber(value)} 分钟`;
    case 'tokens':
      return formatNumber(value);
    case 'count':
      return `${formatNumber(value)} 次`;
    case '0-100 scale':
      return `${formatNumber(value)} 分`;
    default:
      return `${formatNumber(value)} ${unit}`.trim();
  }
};

export const formatBenchmarkValue = (
  value: number | string | null | undefined,
  unit: string
) => {
  if (value == null || value === '') {
    return '对标 N/A';
  }

  return `对标 ${formatMetricValue(value, unit)}`;
};

export const getToolLabel = (actionType: string, detail: string) => {
  if (actionType === 'shell_exec') {
    const command = detail.trim().split(/\s+/).slice(0, 2).join(' ');
    return command || actionType;
  }

  return actionType;
};

export const getActionDetailItems = (
  action: ActionCard
): ActionDetailRecord[] =>
  action.details ??
  (action.detail
    ? action.detail
        .split(/[\uFF1B;]/)
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => ({
          label: 'detail',
          description: item,
        }))
    : []);
