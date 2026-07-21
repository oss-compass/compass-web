import fs from 'fs';
import path from 'path';
import type {
  IssueExperienceReportData,
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
