// CI 体验诊断 · 数据类型（对齐 v2 设计稿 DATA schema，纯数据、不含 ReactNode）

export type CiRepoKey = 'runtime' | 'opsnn';

export type CiDimKey = 'stability' | 'efficiency' | 'interaction' | 'cost';

/** 维度状态：红=需处理 / 黄=关注 / 绿=正常 */
export type CiStatus = 'red' | 'yellow' | 'green';

export type CiPri = 'P0' | 'P1' | 'P2';

/** 根因块状态 */
export type CiRootStatus = 'known' | 'partial' | 'guide' | 'pending';

/** 数值单元：{v} 为显示值，demo 为示例数据标记（挂〔示〕徽标） */
export type CiVal = {
  v: string;
  demo?: boolean;
};

/** [标签, 值] 二元组（维度卡 vals、当日 meta） */
export type CiLabeledVal = [string, CiVal];

/** 迷你趋势线 */
export type CiSpark = {
  label: string;
  pts: number[];
  demo?: boolean;
};

/** 维度卡 */
export type CiDim = {
  key: CiDimKey;
  name: string;
  s: CiStatus;
  word: string;
  note: string;
  probn: number;
  toppri: CiPri | null;
  vals: CiLabeledVal[];
  spark: CiSpark;
};

/** 问题卡内单条 run×PR 映射 */
export type CiRun = {
  n: number;
  id: string;
  pr: string;
  t: string;
  stage: string;
  job: string;
  msg: string;
};

/** 问题影响面 */
export type CiProblemImpact = {
  runs: number;
  prs: number;
  streak_days: number;
  window_total: number;
  wasted_min?: number;
  cross?: string[];
};

/** 问题根因块 */
export type CiProblemRoot = {
  status: CiRootStatus;
  cause?: string;
  evidence?: string[];
  guess?: string;
  action?: string;
  dest?: string;
};

/** 单个问题卡 */
export type CiProblem = {
  pri: CiPri;
  dim: string;
  kb: string;
  cls: string;
  mech: string;
  owner: string;
  title: string;
  stages: Record<string, number>;
  impact: CiProblemImpact;
  runs: CiRun[];
  dimkey: CiDimKey;
  root: CiProblemRoot;
};

/** 指标表行：[指标, 当日值, 前 7 日中位, 口径, 备注] */
export type CiMetricRow = [string, CiVal, CiVal, string, string];

/** 稳定性细分 */
export type CiDiagStability = {
  mech: Record<string, number>;
};

export type CiStageBillRow = {
  stage: string;
  med_s: number;
  p90_s: number;
  n: number;
};

export type CiTopJob = {
  stage: string;
  job: string;
  med_s: number;
  n: number;
};

/** 效率细分 */
export type CiDiagEfficiency = {
  stage_bill: CiStageBillRow[];
  top_jobs: CiTopJob[];
};

/** 交互体验细分 */
export type CiDiagInteraction = {
  ttff_by_owner: Record<string, number>;
  retry: { rate: number | null; n: number };
};

/** 成本细分 */
export type CiDiagCost = {
  pools: [string, number][];
};

export type CiDiag = {
  stability: CiDiagStability;
  efficiency: CiDiagEfficiency;
  interaction: CiDiagInteraction;
  cost: CiDiagCost;
};

/** 稳定性矩阵：阶段 × 二级机理（按一级责任方分组） */
export type CiMatrixStabGroup = {
  g: string;
  cls: string;
  mechs: string[];
};

export type CiMatrixStab = {
  note: string;
  stages: string[];
  groups: CiMatrixStabGroup[];
  cells: Record<string, Record<string, number>>;
};

/** 效率矩阵：阶段 × 耗时统计 */
export type CiMatrixEffRow = {
  stage: string;
  med_s: number | null;
  p90_s: number | null;
  n: number;
  base_med_s: number | null;
  dev_pct: number | null;
  over_n: number;
  total_min: number;
};

export type CiMatrixEff = {
  note: string;
  rows: CiMatrixEffRow[];
};

/** 成本矩阵：阶段 × 机时归属 */
export type CiMatrixCostRow = {
  stage: string;
  cells: Record<string, number>;
};

export type CiMatrixCost = {
  note: string;
  cols: string[];
  rows: CiMatrixCostRow[];
  total: Record<string, number>;
};

export type CiMatrices = {
  stab: CiMatrixStab;
  eff: CiMatrixEff;
  cost: CiMatrixCost;
};

/** 日观测板：一天一份 */
export type CiBoard = {
  date: string;
  meta: CiLabeledVal[];
  default_dim: CiDimKey;
  dims: CiDim[];
  problems: CiProblem[];
  metrics: Record<CiDimKey, CiMetricRow[]>;
  diag: CiDiag;
  matrices: CiMatrices;
};

/** 周问题榜 / 回填台账共用条目 */
export type CiWeeklyProb = {
  kb: string;
  dim: string;
  pri: CiPri;
  first: string;
  days_hit: number;
  runs: number;
  prs: number;
  trend: number[];
  tdays: string[];
  status: string;
  stages: string;
  action: string;
  dest: string;
};

/** 改进项候选 */
export type CiImp = {
  id: string;
  p: CiPri;
  title: string;
  owner: string;
  cls: string;
  ev: string;
  check: string;
  st: string;
  stOn: number;
};

/** 四维度周对比行：[维度, 结果指标, 本周, 上周, 说明] */
export type CiDimCmpRow = [string, string, CiVal, CiVal, string];

/** 趋势图 */
export type CiTrend = {
  title: string;
  pts: number[];
  days: string[];
  note: string;
  anno?: { i: number; label: string };
  demo?: boolean;
};

/** 机时账单 */
export type CiBill = {
  note: string;
  cols: string[];
  rows: (string | CiVal)[][];
};

export type CiWeekly = {
  period: string;
  probs: CiWeeklyProb[];
  imps: CiImp[];
  dimcmp: CiDimCmpRow[];
  trends: CiTrend[];
  matrices: CiMatrices;
  bill: CiBill;
  backfill: CiWeeklyProb[];
};

export type CiRepoData = {
  workflow: string;
  days: string[];
  boards: Record<string, CiBoard>;
  weekly: CiWeekly;
};
