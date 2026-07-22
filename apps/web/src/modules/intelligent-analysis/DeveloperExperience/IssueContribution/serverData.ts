import fs from 'fs';
import path from 'path';
import type {
  IssueExperienceReportData,
  IssueOverviewData,
  IssueOverviewLevel,
  IssueOverviewRepo,
  IssueOverviewStage,
  IssueOverviewTopPain,
  IssueReportCatalogRecord,
  IssueReportFilters,
  IssueReportRecord,
} from './types';

// rawdata/<repo>/report_<repo>_<since>_to_<until>.json holds one report per
// repository + period. New repositories and periods are discovered
// automatically from the folder, so no code change is required to publish them.
const RAWDATA_SEGMENTS = [
  'src',
  'modules',
  'intelligent-analysis',
  'DeveloperExperience',
  'IssueContribution',
  'rawdata',
] as const;

const resolveRawdataDir = (): string | null => {
  const relative = path.join(...RAWDATA_SEGMENTS);
  const candidates = [
    path.join(process.cwd(), relative),
    path.join(process.cwd(), 'apps', 'web', relative),
    path.join(__dirname, 'rawdata'),
  ];
  return candidates.find((dir) => fs.existsSync(dir)) ?? null;
};

const listReportFiles = (dir: string): string[] => {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listReportFiles(full));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.json')) {
      files.push(full);
    }
  }
  return files;
};

type StagePainIssue = {
  issue_number: string;
  title: string;
  state: string;
  url: string;
  score: number;
};

type RawStageData = Record<
  string,
  { pain_point_issues?: StagePainIssue[] } | undefined
>;

type RawIssueReport = IssueExperienceReportData & {
  source_data?: { stage_data?: RawStageData };
};

const stageScoreKeyById: Record<string, string> = {
  I0: 'creation',
  I1: 'triage',
  I2: 'discussion_resolution',
  I3: 'closure',
  G: 'bot-agent',
};

const getReportVersion = (report: IssueExperienceReportData) => {
  const reportIdVersion =
    report.report_context.report_id.match(/_(v\d+)$/i)?.[1];
  if (reportIdVersion) return reportIdVersion.toLowerCase();

  return (
    report.report_md_file.match(/_(v\d+)\.md$/i)?.[1]?.toLowerCase() ?? '—'
  );
};

const getStagePainIssues = (stageData: RawStageData, stageId: string) => {
  const scoreKey = stageScoreKeyById[stageId];
  if (!scoreKey) return [];

  return (stageData[scoreKey]?.pain_point_issues ?? [])
    .map((issue) => ({
      no: `#${issue.issue_number}`,
      url: issue.url,
      score: issue.score,
      title: issue.title,
      state: issue.state,
    }))
    .sort((a, b) => a.score - b.score);
};

const buildRecord = (raw: RawIssueReport): IssueReportRecord => {
  const stageData = raw.source_data?.stage_data ?? {};

  // Only expose the display model. Raw issue bodies, comments and review cases
  // remain server-side and never enter the browser bundle or API response.
  const publicReportData: IssueExperienceReportData = {
    schema_version: raw.schema_version,
    generated_at: raw.generated_at,
    community_name: raw.community_name,
    platform: raw.platform,
    period: raw.period,
    since: raw.since,
    until: raw.until,
    report_md_file: raw.report_md_file,
    report_context: {
      ...raw.report_context,
      stages: raw.report_context.stages.map((stage) => ({
        ...stage,
        pain_issues: getStagePainIssues(stageData, stage.id),
      })),
    },
  };

  const version = getReportVersion(raw);

  return {
    key: `${raw.platform}:${raw.community_name}:${raw.period}:${version}`,
    org: raw.report_context.project.org,
    platform: raw.platform,
    community: raw.community_name,
    period: raw.period,
    periodLabel: raw.report_context.period_label,
    version,
    data: publicReportData,
  };
};

type CacheEntry = { mtimeMs: number; record: IssueReportRecord };
const recordCache = new Map<string, CacheEntry>();

// Records are sorted by community (A→Z) then period and version (newest first)
// so the default selection (no filters) resolves to the most recent report.
const sortRecords = (records: IssueReportRecord[]): IssueReportRecord[] =>
  [...records].sort(
    (a, b) =>
      a.community.localeCompare(b.community) ||
      b.period.localeCompare(a.period) ||
      b.version.localeCompare(a.version)
  );

const loadAllRecords = (): IssueReportRecord[] => {
  const dir = resolveRawdataDir();
  if (!dir) return [];

  const records: IssueReportRecord[] = [];
  for (const file of listReportFiles(dir)) {
    try {
      const { mtimeMs } = fs.statSync(file);
      const cached = recordCache.get(file);
      if (cached && cached.mtimeMs === mtimeMs) {
        records.push(cached.record);
        continue;
      }
      const raw = JSON.parse(fs.readFileSync(file, 'utf-8')) as RawIssueReport;
      const record = buildRecord(raw);
      recordCache.set(file, { mtimeMs, record });
      records.push(record);
    } catch {
      // Skip unreadable or malformed report files instead of failing the page.
    }
  }
  return sortRecords(records);
};

// Snapshot for consumers (e.g. tests) that expect a static registry. The API
// helpers below rescan the folder per request so newly added reports appear
// without restarting the dev server.
export const ISSUE_REPORTS: IssueReportRecord[] = loadAllRecords();

const matchesFilters = (
  record: IssueReportCatalogRecord,
  filters: IssueReportFilters
) =>
  (!filters.org || record.org === filters.org) &&
  (!filters.platform || record.platform === filters.platform) &&
  (!filters.community || record.community === filters.community) &&
  (!filters.period || record.period === filters.period) &&
  (!filters.version || record.version === filters.version);

export const getIssueReportCatalog = (
  filters: Pick<IssueReportFilters, 'org'> = {}
): IssueReportCatalogRecord[] =>
  loadAllRecords()
    .filter((record) => matchesFilters(record, filters))
    .map(({ data: _data, ...record }) => record);

export const getIssueReport = (filters: IssueReportFilters) =>
  loadAllRecords().find((record) => matchesFilters(record, filters));

// ──────────────────────────────────────────────────────────────
// Issue 贡献总览 · 跨仓聚合（服务端裁剪为紧凑视图模型）
// ──────────────────────────────────────────────────────────────

const repoShortName = (community: string) => {
  const seg = community.split('/');
  return seg[seg.length - 1] || community;
};

const prioRank = (prio: string) => {
  const upper = prio.toUpperCase();
  if (upper.indexOf('P0') >= 0) return 0;
  if (upper.indexOf('P1') >= 0) return 1;
  if (upper.indexOf('P2') >= 0) return 2;
  return 3;
};

const repoLevel = (idxTotal: number, grade: string): IssueOverviewLevel => {
  if (grade.toUpperCase() === 'F' || idxTotal < 50) return 'crit';
  if (idxTotal < 70) return 'warn';
  return 'good';
};

/** 按社区分组，取每个社区的最新一期报告（records 已按 period 降序可取首个）。 */
const latestByCommunity = (
  records: IssueReportRecord[]
): IssueReportRecord[] => {
  const seen: Record<string, IssueReportRecord> = {};
  const order: string[] = [];
  for (const record of records) {
    const existing = seen[record.community];
    if (!existing) {
      seen[record.community] = record;
      order.push(record.community);
    } else if (record.period.localeCompare(existing.period) > 0) {
      seen[record.community] = record;
    }
  }
  return order.map((community) => seen[community]);
};

const buildRepoSummary = (
  record: IssueReportRecord,
  scoreHistory?: Array<{ period: string; idx: number }>
): IssueOverviewRepo => {
  const ctx = record.data.report_context;
  const stages: IssueOverviewStage[] = ctx.stages.map((stage) => ({
    id: stage.id,
    name: stage.name,
    icon: stage.icon,
    score: stage.mixed,
    grade: stage.grade,
    painCount: stage.pain_count,
    painPct: stage.pain_pct,
  }));
  // 得分趋势：跨该仓各周报告的综合指数（时间升序），单期时退化为当前值。
  const hasHistory = scoreHistory && scoreHistory.length > 1;
  const idxTrend = hasHistory
    ? scoreHistory.map((h) => h.idx)
    : [ctx.idx_total];
  const idxTrendPeriods = hasHistory
    ? scoreHistory.map((h) => h.period)
    : [record.period];
  return {
    community: record.community,
    repoShort: repoShortName(record.community),
    org: ctx.project.org,
    period: record.period,
    periodLabel: record.periodLabel,
    idxTotal: ctx.idx_total,
    grade: ctx.grade,
    deltaTotal: ctx.delta_total,
    nTotal: ctx.n_total,
    nOpen: ctx.n_open,
    nClosed: ctx.n_closed,
    closeRate: ctx.close_rate,
    confidence: ctx.confidence,
    dataCompleteness: ctx.data_completeness,
    responderCount: ctx.participants?.responder_count ?? 0,
    responseCount: ctx.participants?.response_count ?? 0,
    level: repoLevel(ctx.idx_total, ctx.grade),
    stages,
    idxTrend,
    idxTrendPeriods,
  };
};

const buildTopPains = (latest: IssueReportRecord[]): IssueOverviewTopPain[] => {
  const pains: IssueOverviewTopPain[] = [];
  latest.forEach((record) => {
    const repoShort = repoShortName(record.community);
    (record.data.report_context.top_pains ?? []).forEach((pain, i) => {
      pains.push({
        key: `${record.community}-${pain.id || i}`,
        community: record.community,
        repoShort,
        prio: pain.prio,
        stageName: pain.stage_name,
        title: pain.title,
        evidence: pain.evidence,
        impact: pain.impact,
        action: pain.action,
        state: (pain.state ?? '').trim(),
      });
    });
  });
  return pains.sort((a, b) => prioRank(a.prio) - prioRank(b.prio)).slice(0, 24);
};

/** 跨仓逐周聚合序列（按问题数加权综合指数 / 问题总数 / 关闭率）。 */
const buildAggSeries = (records: IssueReportRecord[]) => {
  const byPeriod: Record<
    string,
    { n: number; idxWeighted: number; closed: number }
  > = {};
  const periods: string[] = [];
  records.forEach((record) => {
    const ctx = record.data.report_context;
    const bucket = byPeriod[record.period];
    if (!bucket) {
      byPeriod[record.period] = {
        n: ctx.n_total,
        idxWeighted: ctx.idx_total * ctx.n_total,
        closed: ctx.n_closed,
      };
      periods.push(record.period);
    } else {
      bucket.n += ctx.n_total;
      bucket.idxWeighted += ctx.idx_total * ctx.n_total;
      bucket.closed += ctx.n_closed;
    }
  });
  periods.sort((a, b) => a.localeCompare(b));
  return {
    periods,
    idx: periods.map((p) => {
      const b = byPeriod[p];
      return b.n ? +(b.idxWeighted / b.n).toFixed(1) : 0;
    }),
    nTotal: periods.map((p) => byPeriod[p].n),
    closeRate: periods.map((p) => {
      const b = byPeriod[p];
      return b.n ? +((b.closed / b.n) * 100).toFixed(1) : 0;
    }),
  };
};

export const getIssueOverview = (
  filters: Pick<IssueReportFilters, 'org'> = {}
): IssueOverviewData => {
  const all = loadAllRecords().filter(
    (record) => !filters.org || record.org === filters.org
  );
  const latest = latestByCommunity(all);

  // 各仓得分历史：按周（period 升序）收集综合指数，供「得分趋势」缩略图/弹窗使用。
  const historyByCommunity: Record<
    string,
    Array<{ period: string; idx: number }>
  > = {};
  all
    .slice()
    .sort((a, b) => a.period.localeCompare(b.period))
    .forEach((record) => {
      const list = historyByCommunity[record.community] || [];
      list.push({
        period: record.period,
        idx: record.data.report_context.idx_total,
      });
      historyByCommunity[record.community] = list;
    });

  const repos = latest.map((record) =>
    buildRepoSummary(record, historyByCommunity[record.community])
  );

  // 阶段展示顺序：取阶段数最多的一份报告作为模板（各仓阶段口径一致）。
  const stageTemplate = latest.reduce<IssueReportRecord | null>(
    (best, record) =>
      !best ||
      record.data.report_context.stages.length >
        best.data.report_context.stages.length
        ? record
        : best,
    null
  );
  const stageOrder = (stageTemplate?.data.report_context.stages ?? []).map(
    (stage) => ({ id: stage.id, name: stage.name, icon: stage.icon })
  );

  return {
    generatedAt: latest[0]?.data.generated_at ?? '',
    repos,
    stageOrder,
    topPains: buildTopPains(latest),
    topPainTotal: latest.reduce(
      (a, r) => a + (r.data.report_context.top_pains?.length ?? 0),
      0
    ),
    agg: buildAggSeries(all),
  };
};
