import type { CiDimKey, CiRepoData, CiPri } from '../../types';
import {
  daySeries,
  firstNZ,
  lastNZ,
  median,
  metaNum,
  sum,
  type CiDaySeries,
} from '../../helpers';

// 迷你图配色（对齐 dashboard CSS 变量 → 社区软色）
const COLOR = {
  critical: '#e11d48', // rose-600
  series: '#2563eb', // blue-600
  series2: '#7c3aed', // violet-600
  warning: '#d97706', // amber-600
};

/** 单张迷你趋势图配置（移植 dashboard dimTrends → miniChart 入参） */
export type CiMiniChart = {
  title: string;
  meaning: string;
  series: (number | null)[];
  unit: string;
  color: string;
  lowerBetter: boolean;
};

/** 选中维度对应的关键指标趋势（逐日窗口序列） */
export const dimTrends = (k: CiDimKey, s: CiDaySeries): CiMiniChart[] => {
  const M: Record<CiDimKey, CiMiniChart[]> = {
    stability: [
      {
        title: '流水线失败率',
        meaning: '完结 run 里失败的比例',
        series: s.finish,
        unit: '%',
        color: COLOR.critical,
        lowerBetter: true,
      },
      {
        title: '平台故障占比',
        meaning: '失败里属平台自身故障的比例',
        series: s.plat,
        unit: '%',
        color: COLOR.critical,
        lowerBetter: true,
      },
    ],
    efficiency: [
      {
        title: '流水线时长(中位)',
        meaning: '开发者等一次结果的典型时长',
        series: s.dur,
        unit: 'min',
        color: COLOR.series,
        lowerBetter: true,
      },
    ],
    interaction: [
      {
        title: '被 CI 卡住的 PR',
        meaning: '被失败流水线阻塞的 PR 数',
        series: s.block,
        unit: '个',
        color: COLOR.series2,
        lowerBetter: true,
      },
    ],
    cost: [
      {
        title: '无效机时',
        meaning: '浪费在非代码失败上的算力',
        series: s.waste,
        unit: '机时',
        color: COLOR.warning,
        lowerBetter: true,
      },
      {
        title: '每日机时',
        meaning: '当日 CI 总算力消耗(观察量)',
        series: s.hours,
        unit: '机时',
        color: COLOR.warning,
        lowerBetter: false,
      },
    ],
  };
  return M[k] || [];
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
