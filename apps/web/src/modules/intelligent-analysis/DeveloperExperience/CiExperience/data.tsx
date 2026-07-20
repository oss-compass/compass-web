import type { CiRepoData, CiRepoKey, CiWeekly } from './types';
import runtimeBoards from './ci-runtime-data.json';

// ============ 唯一数据源 ============
// runtime 全量实测数据由验证仓 gitcode-ci-lab 日粒度聚合，整块取自 v2 设计稿 DATA.runtime。
// 渲染层零硬编码：所有数字来自下方 JSON。ops-nn 暂为占位空态（仓库切换入口保留）。

type RuntimeBoards = Omit<
  CiRepoData,
  'runs' | 'prs' | 'finFail' | 'runsPerPR' | 'window'
>;

const runtimeData = runtimeBoards as unknown as RuntimeBoards;

const runtime: CiRepoData = {
  ...runtimeData,
  runs: 306,
  prs: 92,
  finFail: '43.5%',
  runsPerPR: '3.3',
  window: '2026-07-11 → 07-18（上线以来全量）',
};

// ops-nn 占位：暂未落库，视图区走空态。
const emptyWeekly: CiWeekly = {
  period: '—',
  probs: [],
  imps: [],
  dimcmp: [],
  trends: [],
  matrices: {
    stab: { note: '', stages: [], groups: [], cells: {} },
    eff: { note: '', rows: [] },
    cost: { note: '', cols: [], rows: [], total: {} },
  },
  bill: { note: '', cols: [], rows: [] },
  backfill: [],
};

const opsnn: CiRepoData = {
  workflow: 'ops_nn_action',
  days: [],
  boards: {},
  weekly: emptyWeekly,
  runs: 0,
  prs: 0,
  finFail: '—',
  runsPerPR: '—',
  window: '数据落库中，暂未开放明细',
};

export const CI_DATA: Record<CiRepoKey, CiRepoData> = {
  runtime,
  opsnn,
};
