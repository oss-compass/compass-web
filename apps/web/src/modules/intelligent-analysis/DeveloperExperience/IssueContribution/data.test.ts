import {
  getIssueReport,
  getIssueReportCatalog,
  ISSUE_REPORTS,
} from './serverData';

describe('Issue contribution report registry', () => {
  it('maps the JSON fixture to the community, period and report version', () => {
    expect(ISSUE_REPORTS).toHaveLength(1);
    expect(ISSUE_REPORTS[0]).toMatchObject({
      org: 'cann',
      platform: 'gitcode',
      community: 'cann/cann-samples',
      period: '2026_w28',
      periodLabel: '2026-07-06 至 2026-07-12',
      version: 'v3',
    });
  });

  it('requires an exact selector combination', () => {
    expect(
      getIssueReport({
        org: 'cann',
        platform: 'gitcode',
        community: 'cann/cann-samples',
        period: '2026_w28',
        version: 'v3',
      })?.data.report_context.idx_total
    ).toBe(47.7);

    expect(
      getIssueReport({
        org: 'cann',
        platform: 'gitcode',
        community: 'cann/cann-samples',
        period: '2026_w28',
        version: 'v2',
      })
    ).toBeUndefined();
  });

  it('keeps organization and platform scope atomic', () => {
    expect(getIssueReport({ org: 'other' })).toBeUndefined();
    expect(getIssueReport({ platform: 'github' })).toBeUndefined();
    expect(getIssueReportCatalog({ org: 'other' })).toEqual([]);
  });

  it('does not expose source issue threads in the public report DTO', () => {
    expect(ISSUE_REPORTS[0].data).not.toHaveProperty('source_data');
    expect(ISSUE_REPORTS[0].data).not.toHaveProperty('state');
  });
});
