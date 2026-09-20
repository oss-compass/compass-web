import {
  OVERVIEW_COLORS,
  OVERVIEW_TONES,
  OVERVIEW_STATUS_COLORS,
  OVERVIEW_CATEGORY_COLORS,
} from './theme';
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
    bg: 'bg-[var(--overview-redSoft)]',
    text: 'text-[var(--overview-redDark)]',
    border: 'border-[var(--overview-redBorder)]',
    ...OVERVIEW_TONES.danger,
    tagColor: OVERVIEW_COLORS.priorityBlocker,
  },
  P1_CRITICAL: {
    label: 'P1关键卡点',
    bg: 'bg-[var(--overview-orangeSoft)]',
    text: 'text-[var(--overview-orangeDark)]',
    border: 'border-[var(--overview-orangeBorder)]',
    ...OVERVIEW_TONES.warning,
    tagColor: OVERVIEW_COLORS.progressPending,
  },
  P2_MAJOR: {
    label: 'P2显著影响',
    bg: 'bg-[var(--overview-blueSoft)]',
    text: 'text-[var(--overview-blueDark)]',
    border: 'border-[var(--overview-blueBorder)]',
    ...OVERVIEW_TONES.primary,
    tagColor: OVERVIEW_COLORS.progressInProgress,
  },
  P3_MINOR: {
    label: 'P3轻微影响',
    bg: 'bg-[var(--overview-slateSoft)]',
    text: 'text-[var(--overview-slate)]',
    border: 'border-[var(--overview-slateBorder)]',
    ...OVERVIEW_TONES.neutral,
    tagColor: OVERVIEW_COLORS.slateLight,
  },
  P4_TRIVIAL: {
    label: 'P4极致体验',
    bg: 'bg-[var(--overview-slateSoft)]',
    text: 'text-[var(--overview-slate)]',
    border: 'border-[var(--overview-slateBorder)]',
    ...OVERVIEW_TONES.neutral,
    tagColor: OVERVIEW_COLORS.priorityTrivial,
  },
};

export const OJ_TREND_COLORS = {
  line: OVERVIEW_COLORS.blue,
  lineGradientStart: OVERVIEW_COLORS.blueLight,
  scoreGradientStart: OVERVIEW_COLORS.blueLight,
  scoreLine: OVERVIEW_COLORS.blue,
} as const;

export const OJ_TREND_SEVERITY_SEGMENTS = [
  {
    key: 'p3' as const,
    label: 'P3 轻微影响',
    markerColor: SEVERITY_CFG.P3_MINOR.tagColor,
  },
  {
    key: 'p2' as const,
    label: 'P2 显著影响',
    markerColor: SEVERITY_CFG.P2_MAJOR.tagColor,
  },
  {
    key: 'p1' as const,
    label: 'P1 关键卡点',
    markerColor: SEVERITY_CFG.P1_CRITICAL.tagColor,
  },
  {
    key: 'p0' as const,
    label: 'P0 完全阻塞',
    markerColor: SEVERITY_CFG.P0_BLOCKER.tagColor,
  },
] as const;

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
    badge:
      'border-[var(--overview-orangeBorder)] bg-[var(--overview-orangeSoft)] text-[var(--overview-orangeDark)]',
    dot: 'bg-[var(--overview-orangeLight)]',
    ...OVERVIEW_STATUS_COLORS.pending,
  },
  inProgress: {
    label: '进行中',
    badge:
      'border-[var(--overview-blueBorder)] bg-[var(--overview-blueSoft)] text-[var(--overview-blueDark)]',
    dot: 'bg-[var(--overview-blue)]',
    ...OVERVIEW_STATUS_COLORS.inProgress,
  },
  resolved: {
    label: '已闭环',
    badge:
      'border-[var(--overview-greenBorder)] bg-[var(--overview-greenSoft)] text-[var(--overview-greenDark)]',
    dot: 'bg-[var(--overview-green)]',
    ...OVERVIEW_STATUS_COLORS.resolved,
  },
  na: {
    label: '不需要修复',
    badge:
      'border-[var(--overview-slateBorder)] bg-[var(--overview-slateSoft)] text-[var(--overview-slate)]',
    dot: 'bg-[var(--overview-slateLight)]',
    ...OVERVIEW_STATUS_COLORS.na,
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
    ...OVERVIEW_TONES.warning,
  },
  '2': {
    label: '已确认待修复',
    ...OVERVIEW_TONES.primary,
  },
  '3': {
    label: '已修复待复测',
    ...OVERVIEW_TONES.primary,
  },
  '4': {
    label: '已复测待确认',
    ...OVERVIEW_TONES.primary,
  },
  '5': {
    label: '已复测通过',
    ...OVERVIEW_TONES.success,
  },
  '6': {
    label: '不需要修复',
    ...OVERVIEW_TONES.neutral,
  },
  '7': {
    label: '复测不通过',
    ...OVERVIEW_TONES.danger,
  },
};

// 问题类别不代表风险等级，使用同一中性色，避免分类数量增加彩虹色。
export const ISSUE_TYPE_CFG = OVERVIEW_TONES.neutral;
export const ISSUE_TYPE_PALETTE = OVERVIEW_CATEGORY_COLORS.map((solidBg) => ({
  ...OVERVIEW_TONES.neutral,
  solidBg,
}));

const getIssueTypeIndex = (issueType: string): number => {
  const hash = issueType.split('').reduce((acc, char) => {
    return (acc << 5) - acc + char.charCodeAt(0);
  }, 0);
  return Math.abs(hash) % ISSUE_TYPE_PALETTE.length;
};

const getIssueTypePalette = (issueType: string) => {
  return ISSUE_TYPE_PALETTE[getIssueTypeIndex(issueType)];
};

export const getIssueTypeMarkerColor = (issueType: string): string => {
  return getIssueTypePalette(issueType).solidBg;
};

export const getIssueTypeTagStyle = (issueType: string) => {
  const palette = getIssueTypePalette(issueType);
  return {
    background: palette.tagBg,
    color: palette.tagColor,
    borderColor: palette.tagBorder,
  };
};
