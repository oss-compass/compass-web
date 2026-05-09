import type { IssueBucket, Severity } from './types';

export const SEVERITY_CFG: Record<
  Severity,
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
    label: 'P0 阻塞',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    tagBg: '#fff1f0',
    tagColor: '#cf1322',
    tagBorder: '#ffccc7',
  },
  P1_CRITICAL: {
    label: 'P1 严重',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    tagBg: '#fff7e8',
    tagColor: '#d46b08',
    tagBorder: '#ffd591',
  },
  P2_MAJOR: {
    label: 'P2 中等',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
    tagBg: '#e6f4ff',
    tagColor: '#1677ff',
    tagBorder: '#91caff',
  },
  P3_MINOR: {
    label: 'P3 次要',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    tagBg: '#e6fffb',
    tagColor: '#08979c',
    tagBorder: '#87e8de',
  },
  P4_TRIVIAL: {
    label: 'P4 轻微',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-200',
    tagBg: '#f5f5f5',
    tagColor: '#595959',
    tagBorder: '#d9d9d9',
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

export const NON_ACTIONABLE_SEVERITY: Severity[] = ['P4_TRIVIAL'];
export const BLOCKING_SEVERITY: Severity[] = ['P0_BLOCKER'];

export const SEVERITY_RANK: Record<Severity, number> = {
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
