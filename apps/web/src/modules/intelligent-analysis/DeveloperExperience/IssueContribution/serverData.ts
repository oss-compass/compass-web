import rawIssueReport from './report_cann-cann-samples_2026-07-01_to_2026-07-18(3).json';
import type {
  IssueExperienceReportData,
  IssueReportCatalogRecord,
  IssueReportFilters,
  IssueReportRecord,
} from './types';

const getReportVersion = (report: IssueExperienceReportData) => {
  const reportIdVersion =
    report.report_context.report_id.match(/_(v\d+)$/i)?.[1];
  if (reportIdVersion) return reportIdVersion.toLowerCase();

  return (
    report.report_md_file.match(/_(v\d+)\.md$/i)?.[1]?.toLowerCase() ?? '—'
  );
};

const sourceReport: IssueExperienceReportData = rawIssueReport;

type StagePainIssue = {
  issue_number: string;
  title: string;
  state: string;
  url: string;
  score: number;
};

const stageScoreKeyById: Record<string, string> = {
  I0: 'creation',
  I1: 'triage',
  I2: 'discussion_resolution',
  I3: 'closure',
  G: 'bot-agent',
};

const stageData = rawIssueReport.source_data.stage_data as Record<
  string,
  { pain_point_issues: StagePainIssue[] } | undefined
>;

const getStagePainIssues = (stageId: string) => {
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

// Only expose the display model. Raw issue bodies, comments and review cases
// remain server-side and never enter the browser bundle or API response.
const publicReportData: IssueExperienceReportData = {
  schema_version: sourceReport.schema_version,
  generated_at: sourceReport.generated_at,
  community_name: sourceReport.community_name,
  platform: sourceReport.platform,
  period: sourceReport.period,
  since: sourceReport.since,
  until: sourceReport.until,
  report_md_file: sourceReport.report_md_file,
  report_context: {
    ...sourceReport.report_context,
    stages: sourceReport.report_context.stages.map((stage) => ({
      ...stage,
      pain_issues: getStagePainIssues(stage.id),
    })),
  },
};

export const ISSUE_REPORTS: IssueReportRecord[] = [
  {
    key: `${sourceReport.platform}:${sourceReport.community_name}:${
      sourceReport.period
    }:${getReportVersion(sourceReport)}`,
    org: sourceReport.report_context.project.org,
    platform: sourceReport.platform,
    community: sourceReport.community_name,
    period: sourceReport.period,
    periodLabel: sourceReport.report_context.period_label,
    version: getReportVersion(sourceReport),
    data: publicReportData,
  },
];

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
  ISSUE_REPORTS.filter((record) => matchesFilters(record, filters)).map(
    ({ data: _data, ...record }) => record
  );

export const getIssueReport = (filters: IssueReportFilters) =>
  ISSUE_REPORTS.find((record) => matchesFilters(record, filters));
