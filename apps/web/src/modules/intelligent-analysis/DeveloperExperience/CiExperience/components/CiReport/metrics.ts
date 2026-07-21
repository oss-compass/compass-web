import type { CiDimKey, CiLabeledVal, CiRepoData, CiPri } from '../../types';
import {
  daySeries,
  firstNZ,
  lastNZ,
  median,
  metaNum,
  pick,
  sum,
} from '../../helpers';

// ============ 卡片内嵌指标缩略趋势（每个维度卡 val 逐日窗口序列） ============

/** 维度主色（对齐 ScoreCards DIM_META 图标色） */
const DIM_TREND_COLOR: Record<CiDimKey, string> = {
  stability: '#0284c7',
  efficiency: '#d97706',
  interaction: '#7c3aed',
  cost: '#059669',
};

/** 从显示值解析尾部单位（去掉数字与千分位，保留单位文本，如 % / min / 机时 / 起） */
const parseUnit = (v: string): string => {
  const m = String(v)
    .trim()
    .match(/-?[\d,]*\.?\d+\s*(.*)$/);
  return m ? (m[1] || '').trim() : '';
};

/** 卡片指标是否越低越好（成本维仅「无效机时」越低越好，机时观察量除外） */
const metricLowerBetter = (dimKey: CiDimKey, label: string): boolean =>
  dimKey === 'cost' ? /无效/.test(label) : true;

/** 单个指标缩略趋势数据（供卡片缩略图 + 弹窗完整图共用） */
export type CiMetricTrend = {
  label: string;
  valueText: string;
  series: (number | null)[];
  days: string[];
  unit: string;
  color: string;
  lowerBetter: boolean;
};

/** 为维度卡的每个 val 构建逐日窗口序列（标签跨日一致，用 pick 按标签取数） */
export const buildCardMetricTrends = (
  data: CiRepoData,
  dimKey: CiDimKey,
  vals: CiLabeledVal[]
): CiMetricTrend[] => {
  const { days, boards } = data;
  const color = DIM_TREND_COLOR[dimKey];
  return vals.map(([label, val]) => ({
    label,
    valueText: val?.v ?? '—',
    series: days.map((dt) =>
      boards[dt] ? pick(boards[dt], dimKey, label) : null
    ),
    days,
    unit: parseUnit(val?.v ?? ''),
    color,
    lowerBetter: metricLowerBetter(dimKey, label),
  }));
};

/** 深度分析头号稳定性问题 / 效率问题的裁剪视图 */
export type CiFindingProblem = {
  kb: string;
  runs: number;
  prs: number;
  days_hit: number;
  status: string;
  pri: CiPri;
  action: string;
  dest: string;
  stages: string;
};

/** 深度分析计算模型（移植 dashboard renderBottom 的 findings 数据层，纯数值） */
export type CiFindingsModel = {
  platMed: number | null;
  durMed: number | null;
  totWaste: number;
  wasteShare: number;
  blk0: number | null;
  blkL: number | null;
  backfill: number;
  pendLast: number | null;
  topStab: CiFindingProblem | null;
  effProb: CiFindingProblem | null;
};

const PRI_ORDER: Record<CiPri, number> = { P0: 0, P1: 1, P2: 2 };

const toFinding = (
  p: CiRepoData['weekly']['probs'][number] | undefined
): CiFindingProblem | null =>
  p
    ? {
        kb: p.kb,
        runs: p.runs,
        prs: p.prs,
        days_hit: p.days_hit,
        status: p.status,
        pri: p.pri,
        action: p.action,
        dest: p.dest,
        stages: p.stages,
      }
    : null;

export const computeFindings = (d: CiRepoData): CiFindingsModel => {
  const { days, weekly: w } = d;
  const last = d.boards[days[days.length - 1]];
  const s = daySeries(d);
  const platMed = median(s.plat);
  const durMed = median(s.dur);
  const totWaste = sum(s.waste);
  const probs = w.probs
    .slice()
    .sort((a, b) => PRI_ORDER[a.pri] - PRI_ORDER[b.pri] || b.runs - a.runs);
  const topStab =
    probs.find(
      (p) => p.dim === '稳定性' && (p.pri === 'P0' || p.pri === 'P1')
    ) || probs[0];
  const effProb = w.probs.find((p) => p.dim === '效率');
  const wm = w.matrices.cost;
  const wmGt = wm.cols.reduce((a, c) => a + (wm.total[c] || 0), 0);
  const wasteShare = wmGt
    ? Math.round(
        (((wm.total['平台失败废弃'] || 0) + (wm.total['取消占用'] || 0)) /
          wmGt) *
          100
      )
    : 0;
  const blk0 = firstNZ(s.block);
  const blkL = lastNZ(s.block);
  const backfill = w.probs.filter((p) => /待回填/.test(p.status)).length;
  const pendLast = last ? metaNum(last, '待定率') : null;
  return {
    platMed,
    durMed,
    totWaste,
    wasteShare,
    blk0,
    blkL,
    backfill,
    pendLast,
    topStab: toFinding(topStab),
    effProb: toFinding(effProb),
  };
};
