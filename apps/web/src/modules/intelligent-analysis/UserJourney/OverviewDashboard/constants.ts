import type { IssueBucket, Severity } from './types';

type KnownSeverity = Exclude<Severity, ''>;

export const SEVERITY_CFG: Record<
  KnownSeverity,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    tagBg: string;
    tagColor: string;
    tagBorder: string;
  }
> = {
  P0_BLOCKER: {
    label: 'P0完全阻塞',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    tagBg: '#fff1f0',
    tagColor: '#d14343',
    tagBorder: '#ffccc7',
  },
  P1_CRITICAL: {
    label: 'P1关键卡点',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    tagBg: '#fff7e8',
    tagColor: '#f4840c',
    tagBorder: '#ffd8a8',
  },
  P2_MAJOR: {
    label: 'P2显著影响',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    tagBg: '#edf4ff',
    tagColor: '#4791ff',
    tagBorder: '#bfd7ff',
  },
  P3_MINOR: {
    label: 'P3轻微影响',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-200',
    tagBg: '#f8fafc',
    tagColor: '#94a3b8',
    tagBorder: '#dbe3ee',
  },
  P4_TRIVIAL: {
    label: 'P4极致体验',
    bg: 'bg-slate-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    tagBg: '#f0fdf4',
    tagColor: '#16a34a',
    tagBorder: '#86efac',
  },
};

export const STATUS_CFG: Record<
  IssueBucket,
  {
    label: string;
    badge: string;
    dot: string;
    tagBg: string;
    tagColor: string;
    tagBorder: string;
  }
> = {
  pending: {
    label: '待处理',
    badge: 'border-orange-200 bg-orange-50 text-orange-700',
    dot: 'bg-orange-400',
    tagBg: '#fff7e8',
    tagColor: '#d46b08',
    tagBorder: '#ffd591',
  },
  inProgress: {
    label: '进行中',
    badge: 'border-amber-200 bg-amber-50 text-amber-700',
    dot: 'bg-amber-400',
    tagBg: '#fffbe6',
    tagColor: '#d4b106',
    tagBorder: '#ffe58f',
  },
  resolved: {
    label: '已闭环',
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
    tagBg: '#e6fffb',
    tagColor: '#08979c',
    tagBorder: '#87e8de',
  },
  na: {
    label: '不需要修复',
    badge: 'border-slate-200 bg-slate-100 text-slate-500',
    dot: 'bg-slate-400',
    tagBg: '#f6ffed',
    tagColor: '#389e0d',
    tagBorder: '#b7eb8f',
  },
};

export const NON_ACTIONABLE_SEVERITY: KnownSeverity[] = ['P4_TRIVIAL'];

export const SEVERITY_RANK: Record<KnownSeverity, number> = {
  P0_BLOCKER: 5,
  P1_CRITICAL: 4,
  P2_MAJOR: 3,
  P3_MINOR: 2,
  P4_TRIVIAL: 1,
};

export const STATUS_RANK: Record<IssueBucket, number> = {
  pending: 4,
  inProgress: 3,
  resolved: 2,
  na: 1,
};

export const PAIN_STATUS_LABEL: Record<string, string> = {
  '1': '待确认',
  '2': '已确认待修复',
  '3': '已修复待复测',
  '4': '已复测待确认',
  '5': '已复测通过',
  '6': '不需要修复',
  '7': '复测不通过',
};

export const PAIN_STATUS_CFG: Record<
  string,
  { label: string; tagBg: string; tagColor: string; tagBorder: string }
> = {
  '1': {
    label: '待确认',
    tagBg: '#fff7e8',
    tagColor: '#d46b08',
    tagBorder: '#ffd591',
  },
  '2': {
    label: '已确认待修复',
    tagBg: '#fffbe6',
    tagColor: '#d4b106',
    tagBorder: '#ffe58f',
  },
  '3': {
    label: '已修复待复测',
    tagBg: '#e6f4ff',
    tagColor: '#1677ff',
    tagBorder: '#91caff',
  },
  '4': {
    label: '已复测待确认',
    tagBg: '#f5f0ff',
    tagColor: '#722ed1',
    tagBorder: '#d3adf7',
  },
  '5': {
    label: '已复测通过',
    tagBg: '#e6fffb',
    tagColor: '#08979c',
    tagBorder: '#87e8de',
  },
  '6': {
    label: '不需要修复',
    tagBg: '#f6ffed',
    tagColor: '#389e0d',
    tagBorder: '#b7eb8f',
  },
  '7': {
    label: '复测不通过',
    tagBg: '#fff1f0',
    tagColor: '#e11d48',
    tagBorder: '#fda4af',
  },
};

export const ISSUE_TYPE_CFG = {
  tagBg: '#f5f0ff',
  tagColor: '#722ed1',
  tagBorder: '#d3adf7',
  solidBg: '#722ed1',
};

export const ISSUE_TYPE_PALETTE = [
  {
    tagBg: '#fff0f6',
    tagColor: '#c41d7f',
    tagBorder: '#ffadd2',
    solidBg: '#eb2f96',
  },
  {
    tagBg: '#f5f0ff',
    tagColor: '#722ed1',
    tagBorder: '#d3adf7',
    solidBg: '#722ed1',
  },
  {
    tagBg: '#f0f5ff',
    tagColor: '#2f54eb',
    tagBorder: '#adc6ff',
    solidBg: '#2f54eb',
  },
  {
    tagBg: '#feffe6',
    tagColor: '#ad8b00',
    tagBorder: '#fffb8f',
    solidBg: '#d4b106',
  },
  {
    tagBg: '#fff7e6',
    tagColor: '#d46b08',
    tagBorder: '#ffd591',
    solidBg: '#fa8c16',
  },
  {
    tagBg: '#e6f4ff',
    tagColor: '#1677ff',
    tagBorder: '#91caff',
    solidBg: '#1677ff',
  },
  {
    tagBg: '#f9f0ff',
    tagColor: '#7c3aed',
    tagBorder: '#c4b5fd',
    solidBg: '#7c3aed',
  },
  {
    tagBg: '#fff1f0',
    tagColor: '#cf1322',
    tagBorder: '#ffa39e',
    solidBg: '#f5222d',
  },
];

const ISSUE_TYPE_OVERRIDES: Record<
  string,
  {
    tagBg: string;
    tagColor: string;
    tagBorder: string;
    solidBg: string;
  }
> = {
  SoC代号映射: {
    tagBg: '#fff0f6',
    tagColor: '#c41d7f',
    tagBorder: '#ffadd2',
    solidBg: '#f759ab',
  },
  百度SEO搜索: {
    tagBg: '#f5f0ff',
    tagColor: '#722ed1',
    tagBorder: '#d3adf7',
    solidBg: '#9254de',
  },
};

const getIssueTypeIndex = (issueType: string): number => {
  const hash = issueType.split('').reduce((acc, char) => {
    return (acc << 5) - acc + char.charCodeAt(0);
  }, 0);
  return Math.abs(hash) % ISSUE_TYPE_PALETTE.length;
};

const getIssueTypePalette = (issueType: string) => {
  return (
    ISSUE_TYPE_OVERRIDES[issueType] ??
    ISSUE_TYPE_PALETTE[getIssueTypeIndex(issueType)]
  );
};

export const getIssueTypeMarkerColor = (issueType: string): string => {
  return getIssueTypePalette(issueType).solidBg;
};

export const getIssueTypeTagStyle = (issueType: string) => {
  const palette = getIssueTypePalette(issueType);
  return {
    background: palette.solidBg,
    color: '#ffffff',
    borderColor: 'transparent',
  };
};
