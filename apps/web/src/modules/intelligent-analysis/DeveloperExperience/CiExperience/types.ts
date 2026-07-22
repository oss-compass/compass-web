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

// ============ 开发者旅程全景图（对齐 v2 设计稿「开发者旅程全景图 / 旅程段详情」） ============
// 数据由 scripts/extract_ci_journey.js 从设计稿源数据 HTML 内嵌 DATA.journey 程序化抽取，
// 覆盖每仓每个观测日的八段派生旅程（段综合分 / 四维日度信号 / 段三宫格 / 段趋势 / 段内问题）。

/** 旅程段四维之一的日度信号 */
export type CiJourneyCell = {
  /** 维度分数 0~100；null=该维度当日无分数信号（时长类等，只看数值不计分） */
  score: number | null;
  /** 状态词：正常 / 需处理 / 仓级（回退格） */
  word: string;
  /** 主指标显示值（如「2 起」「3.9 min」「—」） */
  disp: string;
  /** 指标口径名（如「平台/待定失败数」「阶段耗时中位」） */
  name: string;
  /** 归属方（部分回退格无） */
  owner?: string;
  /** 该维度关联问题数 */
  probn: number;
  /** true=仓级回退格：该段无此维度日度信号，用仓级维度分占位，不参与段综合分 */
  fallback?: boolean;
};

/** 旅程段四维日度信号（稳定性 / 效率 / 交互体验 / 成本） */
export type CiJourneyCells = {
  stability: CiJourneyCell;
  efficiency: CiJourneyCell;
  interaction: CiJourneyCell;
  cost: CiJourneyCell;
};

/** 旅程段趋势缩略折线（近若干观测日） */
export type CiJourneyTrend = {
  /** 折线口径名（如「阶段中位耗时」） */
  name: string;
  /** 相对值序列，供缩略折线自动取值域 */
  series: number[];
};

/** 旅程段三宫格统计项 */
export type CiJourneyStat = { label: string; v: number };

/** 旅程段内问题卡（= 通用问题卡 + 归属段名） */
export type CiJourneyProblem = CiProblem & { seg: string };

/** 单个旅程段（每卡=段综合分 + 星级 + 状态词 + 段三宫格；点卡进入段详情） */
export type CiJourneyStage = {
  /** 段名（触发确认 / 构建准备 / …），同时用作段唯一标识 */
  seg: string;
  /** 段综合分（段内各有效维度等权均值；「仓级」回退格不参与） */
  segscore: number;
  /** 四维日度信号 */
  cells: CiJourneyCells;
  /** 段三宫格统计 */
  stats: CiJourneyStat[];
  /** 段趋势缩略折线 */
  trend: CiJourneyTrend;
  /** workflow 原生阶段全名（如 runtime_action/PreSmoke；无阶段映射时为空） */
  stages: string[];
  /** workflow 原生阶段短名（如 PreSmoke） */
  bare: string[];
  /** 段内问题（problem.seg === 段名 才归属本段） */
  problems: CiJourneyProblem[];
};

/** 单维评分（口径由验证仓直接给出，冷启动日可能为 null） */
export type CiJourneyScoreDim = {
  score: number | null;
  metrics: Record<string, number | null>;
};

/** 当日报告概览得分（权威口径，直接取自设计稿源数据 board.scores） */
export type CiJourneyScores = {
  caliber: string;
  dims: Record<CiDimKey, CiJourneyScoreDim>;
  total: number | null;
  grade: string | null;
  low_confidence: boolean;
  note: string;
};

/** 单日旅程板：一天一份派生旅程 */
export type CiJourneyDay = {
  day: string;
  date: string;
  /** 当日口径评注 */
  note: string;
  /** 当日报告概览五项得分（综合 + 四维），冷启动日 total 可能为 null */
  scores: CiJourneyScores | null;
  stages: CiJourneyStage[];
};

/** 仓库级旅程全景图数据（按观测日分板） */
export type CiJourney = {
  projectName: string;
  workflow: string;
  /** 有旅程数据的观测日（升序） */
  days: string[];
  /** 逐日旅程板，键为 YYYY-MM-DD */
  boards: Record<string, CiJourneyDay>;
};
