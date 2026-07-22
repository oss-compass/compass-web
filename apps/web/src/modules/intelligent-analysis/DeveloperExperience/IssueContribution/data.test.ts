import fs from 'fs';
import path from 'path';
import {
  getIssueReport,
  getIssueReportCatalog,
  getIssueOverview,
  ISSUE_REPORTS,
} from './serverData';

const RAWDATA_DIR = path.join(__dirname, 'rawdata');

const countReportFiles = (dir: string): number =>
  fs.readdirSync(dir, { withFileTypes: true }).reduce((total, entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return total + countReportFiles(full);
    return total + (entry.name.toLowerCase().endsWith('.json') ? 1 : 0);
  }, 0);

describe('Issue contribution report registry', () => {
  it('auto-discovers every report file under rawdata/', () => {
    expect(ISSUE_REPORTS.length).toBeGreaterThan(0);
    expect(ISSUE_REPORTS).toHaveLength(countReportFiles(RAWDATA_DIR));
  });

  it('maps each JSON file to a catalog record with the expected shape', () => {
    ISSUE_REPORTS.forEach((record) => {
      expect(record).toMatchObject({
        key: expect.any(String),
        org: expect.any(String),
        platform: expect.any(String),
        community: expect.any(String),
        period: expect.any(String),
        periodLabel: expect.any(String),
        version: expect.any(String),
      });
    });
  });

  it('exposes multiple repositories and multiple periods', () => {
    const communities = new Set(ISSUE_REPORTS.map((r) => r.community));
    expect(communities.size).toBeGreaterThanOrEqual(2);

    const samplePeriods = new Set(
      ISSUE_REPORTS.filter((r) => r.community === 'cann/cann-samples').map(
        (r) => r.period
      )
    );
    expect(samplePeriods.size).toBeGreaterThanOrEqual(3);
  });

  it('resolves an exact selector combination to a single report', () => {
    const report = getIssueReport({
      org: 'cann',
      platform: 'gitcode',
      community: 'cann/cann-samples',
      period: '2026-07-13_to_2026-07-19',
      version: 'v3',
    });

    expect(report?.data.report_context.idx_total).toBe(47.6);
    expect(report?.data.report_context.stage_ids).toEqual([
      'I0',
      'I1',
      'I2',
      'I3',
      'G',
    ]);
  });

  it('derives pain_issues for each stage from the source stage data', () => {
    const report = getIssueReport({
      community: 'cann/cann-samples',
      period: '2026-07-13_to_2026-07-19',
    });
    report?.data.report_context.stages.forEach((stage) => {
      expect(stage.pain_issues).toHaveLength(stage.pain_count);
    });
  });

  it('keeps organization scope atomic', () => {
    expect(getIssueReport({ org: 'other' })).toBeUndefined();
    expect(getIssueReport({ platform: 'github' })).toBeUndefined();
    expect(getIssueReportCatalog({ org: 'other' })).toEqual([]);
    expect(getIssueReportCatalog({ org: 'cann' }).length).toBe(
      ISSUE_REPORTS.length
    );
  });

  it('does not expose source issue threads in the public report DTO', () => {
    ISSUE_REPORTS.forEach((record) => {
      expect(record.data).not.toHaveProperty('source_data');
      expect(record.data).not.toHaveProperty('state');
    });
  });

  it('returns the complete pain list with consistent priority totals', () => {
    const overview = getIssueOverview({ org: 'cann' });
    const { p0, p1, p2 } = overview.topPainPriorityCounts;

    expect(p0 + p1 + p2).toBe(overview.topPainTotal);
    expect(overview.topPains).toHaveLength(overview.topPainTotal);
  });
});
