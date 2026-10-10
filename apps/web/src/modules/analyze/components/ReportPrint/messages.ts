import type { i18n } from 'i18next';

// Keep this phase usable with the pinned i18n submodule. Published catalog
// entries override these defaults without changing the report implementation.
const en = {
  title: 'Model and metric report',
  open: 'Print report / Save as PDF',
  print: 'Print / Save as PDF',
  generate: 'Prepare report',
  scope:
    'Includes model scores and metric trends for the selected projects and dates. Choose Save as PDF in the browser print dialog.',
  models: 'Models',
  all: 'All models',
  language: 'Report language',
  dates: 'Date range',
  projects: 'Projects',
  captured: 'Snapshot prepared at',
  repositoryType: 'Community repository type',
  preparing: 'Preparing the report…',
  failed: 'The report could not be prepared. Please try again.',
  notReady:
    'Analysis is not complete for every selected project. Please try again later.',
  empty: 'No data in this date range',
  missing: 'No data',
  latest: 'Last available value',
  observed: 'Date / interval start',
  value: 'Value',
  days: 'Days',
  score: 'Score (0-1)',
  ratio: 'Ratio (0-1)',
  note: 'Scores and ratios use the original 0-1 scale. Missing observations are gaps, not zero. Each table shows the last available observation and its date. Dates label observations or aggregation intervals; the first interval may start before the selected range. This report contains metric trends; it excludes the 3D distribution, insight totals and individual records.',
};
const zh: typeof en = {
  title: '模型与指标报告',
  open: '打印报告 / 保存为 PDF',
  print: '打印 / 保存为 PDF',
  generate: '准备报告',
  scope:
    '包含所选项目和时间范围的模型得分及指标趋势。请在浏览器打印窗口中选择“保存为 PDF”。',
  models: '模型',
  all: '全部模型',
  language: '报告语言',
  dates: '时间范围',
  projects: '项目',
  captured: '快照准备时间',
  repositoryType: '社区仓库类型',
  preparing: '正在准备报告…',
  failed: '报告准备失败，请重试。',
  notReady: '部分所选项目尚未完成分析，请稍后重试。',
  empty: '此时间范围内没有数据',
  missing: '无数据',
  latest: '最近有效值',
  observed: '日期 / 区间起点',
  value: '数值',
  days: '天',
  score: '得分（0-1）',
  ratio: '比例（0-1）',
  note: '得分和比例使用原始的 0-1 刻度。缺失观测显示为间断，不计为零。表格列出最近的有效观测值及其日期。日期为观测或聚合区间标签，首个区间的起点可能早于所选日期。本报告包含指标趋势，不含三维分布、洞察汇总和逐条明细。',
};

export const reportMessages = (i18n: i18n, language: string) => {
  const defaults = language === 'zh' ? zh : en;
  const t = i18n.getFixedT(language);
  return Object.fromEntries(
    Object.entries(defaults).map(([key, defaultValue]) => [
      key,
      t(`analyze:report_pdf.${key}`, { defaultValue }),
    ])
  ) as typeof en;
};
export type ReportMessages = typeof en;
