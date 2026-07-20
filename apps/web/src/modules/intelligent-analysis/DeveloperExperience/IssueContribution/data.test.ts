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
      period: '2026-07-01_to_2026-07-18',
      periodLabel: '2026-07-01_to_2026-07-18',
      version: 'v3',
    });
  });

  it('requires an exact selector combination', () => {
    expect(
      getIssueReport({
        org: 'cann',
        platform: 'gitcode',
        community: 'cann/cann-samples',
        period: '2026-07-01_to_2026-07-18',
        version: 'v3',
      })?.data.report_context.idx_total
    ).toBe(49.2);

    expect(
      getIssueReport({
        org: 'cann',
        platform: 'gitcode',
        community: 'cann/cann-samples',
        period: '2026-07-01_to_2026-07-18',
        version: 'v2',
      })
    ).toBeUndefined();
  });

  it('uses the latest stage model and metric definitions', () => {
    const context = ISSUE_REPORTS[0].data.report_context;

    expect(context.stage_ids).toEqual(['I0', 'I1', 'I2', 'I3', 'G']);
    expect(
      context.stages.find((stage) => stage.id === 'I1')?.metrics_obj
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'OBJ_RESPONSE_SPEED' }),
        expect.objectContaining({ code: 'OBJ_FIRST_SUBSTANTIVE_RESPONSE' }),
      ])
    );
    expect(context.top_recs[1]).toMatchObject({
      id: 'REC-02',
      stage_name: '解决',
      baseline_score: null,
      baseline_value: '—',
    });
    expect(context.top_pains).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'PP-01',
          stage_id: 'I1',
          stage_name: '分配与首次响应',
        }),
        expect.objectContaining({
          id: 'PP-03',
          stage_id: 'I3',
          stage_name: '总结与关闭',
        }),
      ])
    );
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
