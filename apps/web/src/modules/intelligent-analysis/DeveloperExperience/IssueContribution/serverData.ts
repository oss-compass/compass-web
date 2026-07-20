import rawIssueReport from './issue_experience_report_data(1).json';
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
  report_context: sourceReport.report_context,
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
