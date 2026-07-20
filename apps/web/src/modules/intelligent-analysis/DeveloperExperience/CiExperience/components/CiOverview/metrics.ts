import type { CiRepoData } from '../../types';
import {
  CI_CAP_OK,
  CI_CAP_TOTAL,
  daySeries,
  firstNZ,
  lastNZ,
  median,
  metaNum,
  sum,
} from '../../helpers';

export type CiOverviewLevel = 'crit' | 'warn' | 'good';

/** 总览计算模型（移植 dashboard renderTop 数学层，纯数据、不含 ReactNode） */
export type CiOverviewModel = {
  dayCount: number;
  level: CiOverviewLevel;
  levelText: string;
  failRate: number;
  totRun: number;
  totFail: number;
  platMed: number | null;
  blk0: number | null;
  blkL: number | null;
  totWaste: number;
  wasteShare: number;
  activeP01: number;
  faded: number;
  backfill: number;
  capOk: number;
  capTotal: number;
};

const LEVEL_TEXT: Record<CiOverviewLevel, string> = {
  crit: '需重点关注',
  warn: '需关注',
  good: '总体平稳',
};

/** 计算总览模型：失败率、平台故障中位、无效机时、在跟踪问题、能力就绪与整体级别。 */
export const computeOverview = (d: CiRepoData): CiOverviewModel => {
  const { days, weekly: w } = d;
  const runs = days.map((dt) => metaNum(d.boards[dt], 'run'));
  const fails = days.map((dt) => metaNum(d.boards[dt], '失败'));
  const totRun = sum(runs);
  const totFail = sum(fails);
  const failRate = totRun ? (totFail / totRun) * 100 : 0;
  const s = daySeries(d);
  const platMed = median(s.plat);
  const totWaste = sum(s.waste);
  const activeP01 = w.probs.filter(
    (p) => /^仍活跃/.test(p.status) && p.pri !== 'P2'
  ).length;
  const hasP0 = w.probs.some((p) => p.pri === 'P0' && /^仍活跃/.test(p.status));
  const faded = w.probs.filter((p) => /已消退/.test(p.status)).length;
  const backfill = w.probs.filter((p) => /待回填/.test(p.status)).length;
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
  const level: CiOverviewLevel = hasP0
    ? 'crit'
    : activeP01 > 0 || (platMed != null && platMed >= 40)
    ? 'warn'
    : 'good';
  return {
    dayCount: days.length,
    level,
    levelText: LEVEL_TEXT[level],
    failRate,
    totRun,
    totFail,
    platMed,
    blk0,
    blkL,
    totWaste,
    wasteShare,
    activeP01,
    faded,
    backfill,
    capOk: CI_CAP_OK,
    capTotal: CI_CAP_TOTAL,
  };
};
