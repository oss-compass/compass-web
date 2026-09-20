/** 两个社区总览共用的基础色。业务组件优先使用下面的语义配置。 */
export const OVERVIEW_COLORS = {
  white: '#ffffff',
  blue: '#2563eb',
  blueDark: '#1d4ed8',
  blueSoft: '#eff6ff',
  blueBorder: '#bfdbfe',
  blueLight: '#93c5fd',
  green: '#059669',
  greenDark: '#047857',
  greenSoft: '#ecfdf5',
  greenBorder: '#a7f3d0',
  greenLight: '#6ee7b7',
  orange: '#d97706',
  orangeDark: '#b45309',
  orangeSoft: '#fffbeb',
  orangeBorder: '#fde68a',
  orangeLight: '#fcd34d',
  red: '#dc2626',
  redDark: '#b91c1c',
  redSoft: '#fef2f2',
  redBorder: '#fecaca',
  redLight: '#fca5a5',
  slate: '#64748b',
  slateDark: '#475569',
  slateSoft: '#f8fafc',
  slateBorder: '#e2e8f0',
  slateLight: '#94a3b8',
  text: '#0f172a',
  textSecondary: '#334155',
  // 保留社区入门原有闭环进展柱色，两个总览共用。
  progressPending: '#f4840c',
  progressInProgress: '#4791ff',
  progressResolved: '#2eb78a',
  priorityBlocker: '#d14343',
  priorityTrivial: '#16a34a',
} as const;

const tone = (name: 'blue' | 'green' | 'orange' | 'red' | 'slate') => ({
  tagBg: OVERVIEW_COLORS[`${name}Soft`],
  tagColor: OVERVIEW_COLORS[`${name}Dark`],
  tagBorder: OVERVIEW_COLORS[`${name}Border`],
  solidBg: OVERVIEW_COLORS[name],
});

export const OVERVIEW_TONES = {
  primary: tone('blue'),
  success: tone('green'),
  warning: tone('orange'),
  danger: tone('red'),
  neutral: tone('slate'),
};

/** 完整静态类名供 Tailwind 扫描；报告页和总览共用优先级样式。 */
export const OVERVIEW_PRIORITY_CLASSES = {
  P0: {
    badge:
      'border-[var(--overview-redBorder)] bg-[var(--overview-redSoft)] text-[var(--overview-priorityBlocker)]',
    edge: 'border-l-[var(--overview-priorityBlocker)]',
    ring: 'ring-[var(--overview-priorityBlocker)]',
  },
  P1: {
    badge:
      'border-[var(--overview-orangeBorder)] bg-[var(--overview-orangeSoft)] text-[var(--overview-progressPending)]',
    edge: 'border-l-[var(--overview-progressPending)]',
    ring: 'ring-[var(--overview-progressPending)]',
  },
  P2: {
    badge:
      'border-[var(--overview-blueBorder)] bg-[var(--overview-blueSoft)] text-[var(--overview-progressInProgress)]',
    edge: 'border-l-[var(--overview-progressInProgress)]',
    ring: 'ring-[var(--overview-progressInProgress)]',
  },
  P3: {
    badge:
      'border-[var(--overview-slateBorder)] bg-[var(--overview-slateSoft)] text-[var(--overview-slateLight)]',
    edge: 'border-l-[var(--overview-slateLight)]',
    ring: 'ring-[var(--overview-slateLight)]',
  },
};

export const OVERVIEW_STATUS_COLORS = {
  pending: {
    ...OVERVIEW_TONES.warning,
    solidBg: OVERVIEW_COLORS.progressPending,
  },
  inProgress: {
    ...OVERVIEW_TONES.primary,
    solidBg: OVERVIEW_COLORS.progressInProgress,
  },
  resolved: {
    ...OVERVIEW_TONES.success,
    solidBg: OVERVIEW_COLORS.progressResolved,
  },
  na: OVERVIEW_TONES.neutral,
};

export const OVERVIEW_BENCHMARK_COLORS = {
  cann: OVERVIEW_TONES.primary,
  benchmark: OVERVIEW_TONES.neutral,
  // 对标结果保留原版配色，不复用普通状态标签的浅底色。
  lead: {
    solidBg: '#16835e',
    tagColor: '#16835e',
    tagBg: '#dff4eb',
    tagBorder: '#b7e2d0',
  },
  tie: {
    solidBg: '#607086',
    tagColor: '#607086',
    tagBg: '#e8edf4',
    tagBorder: '#cbd5e1',
  },
  lag: {
    solidBg: '#c2413b',
    tagColor: '#c2413b',
    tagBg: '#fce4e2',
    tagBorder: '#f3b9b5',
  },
};

/** 原版对标统计卡、阶段柱和明细单元格的分层底色。 */
export const OVERVIEW_BENCHMARK_SURFACES = {
  'lead-card': '#e8f7f1',
  'lead-card-border': '#c9eadc',
  'tie-card': '#f4f7fb',
  'tie-card-border': '#d7dee8',
  'lag-card': '#fff0ee',
  'lag-card-border': '#f5c7c3',
  'lead-stage': '#cdebdd',
  'tie-stage': '#e8edf4',
  'lag-stage': '#f6d4d0',
  'tie-detail': '#eef2f7',
};

/** 多系列图表只使用蓝灰色阶；类别文字和 tooltip 保留精确区分。 */
export const OVERVIEW_CATEGORY_COLORS = [
  OVERVIEW_COLORS.blue,
  OVERVIEW_COLORS.slate,
  OVERVIEW_COLORS.blueLight,
  OVERVIEW_COLORS.slateLight,
];

export const OVERVIEW_ANT_THEME = {
  token: {
    colorPrimary: OVERVIEW_COLORS.blue,
    colorInfo: OVERVIEW_COLORS.blue,
    colorSuccess: OVERVIEW_COLORS.green,
    colorWarning: OVERVIEW_COLORS.orange,
    colorError: OVERVIEW_COLORS.red,
    colorText: OVERVIEW_COLORS.text,
    colorTextSecondary: OVERVIEW_COLORS.slate,
    colorBorder: OVERVIEW_COLORS.slateBorder,
    colorBgContainer: OVERVIEW_COLORS.white,
    colorBgLayout: OVERVIEW_COLORS.slateSoft,
  },
};

/** 背景、文字和边框也通过 CSS 变量共享，支持 Ant Design 的 portal 弹窗。 */
const baseVariables = Object.entries(OVERVIEW_COLORS)
  .map(([name, value]) => {
    const rgb = [1, 3, 5].map((offset) =>
      parseInt(value.slice(offset, offset + 2), 16)
    );
    return `--overview-${name}: ${value}; --overview-${name}-rgb: ${rgb.join(
      ', '
    )};`;
  })
  .join('\n');

const benchmarkVariables = Object.entries(OVERVIEW_BENCHMARK_COLORS)
  .flatMap(([name, colors]) => [
    `--overview-benchmark-${name}: ${colors.solidBg};`,
    `--overview-benchmark-${name}-text: ${colors.tagColor};`,
    `--overview-benchmark-${name}-bg: ${colors.tagBg};`,
    `--overview-benchmark-${name}-border: ${colors.tagBorder};`,
  ])
  .join('\n');

const benchmarkSurfaceVariables = Object.entries(OVERVIEW_BENCHMARK_SURFACES)
  .map(([name, color]) => `--overview-benchmark-${name}: ${color};`)
  .join('\n');

export const OVERVIEW_COLOR_VARIABLES = `${baseVariables}\n${benchmarkVariables}\n${benchmarkSurfaceVariables}`;
