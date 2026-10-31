import {
  collectReportPainIssues,
  downloadCsv,
  escapeCsvCell,
  exportIssueScores,
  exportPainIssues,
} from './issueExport';
import type { IssueReportPain, IssueScoreRow } from './types';

describe('Issue CSV export', () => {
  it('exports only current report pain Issues and retains different pain reasons', () => {
    const rows = [
      {
        number: '1',
        title: '当前问题',
        url: '/issues/1',
        state: 'open',
        assignees: ['owner'],
      },
      { number: '2', title: '普通问题' },
    ] as IssueScoreRow[];
    const pains = [
      {
        low_score_issues: [
          { number: '1', reason: '分流原因', score: 30, metric_code: 'triage' },
          { number: 'old', reason: '其他报告的问题' },
        ],
      },
      {
        low_score_issues: [
          {
            number: '1',
            reason: '讨论原因',
            score: 40,
            metric_code: 'discussion',
            assignees: [],
          },
        ],
      },
    ] as IssueReportPain[];

    const issues = collectReportPainIssues(rows, pains);
    expect(issues.map((issue) => issue.number)).toEqual(['1', '1']);
    expect(issues.map((issue) => issue.reason)).toEqual([
      '分流原因',
      '讨论原因',
    ]);
    expect(issues[0]).toMatchObject({
      title: '当前问题',
      url: '/issues/1',
      issue_state: 'open',
      assignees: ['owner'],
    });
    expect(issues[1].assignees).toEqual([]);
    expect(collectReportPainIssues(rows, [])).toEqual([]);
    expect(collectReportPainIssues([], pains)).toEqual([]);
  });

  it('escapes multiline content and prevents spreadsheet formulas', () => {
    expect(escapeCsvCell('a,"b"\nc')).toBe('"a,""b""\nc"');
    expect(escapeCsvCell('=HYPERLINK("url")')).toContain("'=HYPERLINK");
    expect(escapeCsvCell(null)).toBe('');
  });

  it('downloads every Issue rather than a pagination slice', async () => {
    const create = jest.fn<string, [Blob]>(() => 'blob:export');
    const revoke = jest.fn();
    const originalCreate = URL.createObjectURL;
    const originalRevoke = URL.revokeObjectURL;
    URL.createObjectURL = create;
    URL.revokeObjectURL = revoke;
    const filenames: string[] = [];
    const context = {
      community: 'cann/ops-math',
      period: '2026-10-19_to_2026-10-25',
    };
    const click = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(function (this: HTMLAnchorElement) {
        filenames.push(this.download);
      });
    try {
      exportPainIssues(
        Array.from({ length: 12 }, (_, i) => ({
          number: String(i),
          score: 60,
          metric_code: 'metric',
        })),
        context
      );
      expect(filenames[0]).toBe(
        'cann_ops-math_2026-10-19_to_2026-10-25_痛点涉及Issue.csv'
      );
      expect(create).toHaveBeenCalledWith(expect.any(Blob));
      const content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsText(create.mock.calls[0][0] as Blob);
      });
      expect(content.trim().split(/\r?\n/)).toHaveLength(13);
      expect(content).toContain('11,');
      expect(click).toHaveBeenCalledTimes(1);
      expect(revoke).toHaveBeenCalledWith('blob:export');
      downloadCsv('empty.csv', ['Issue'], []);
      expect(click).toHaveBeenCalledTimes(2);
      exportIssueScores([], undefined, context);
      exportIssueScores([], 'I2', context);
      expect(filenames.slice(2)).toEqual([
        'cann_ops-math_2026-10-19_to_2026-10-25_全部Issue得分.csv',
        'cann_ops-math_2026-10-19_to_2026-10-25_I2_全部Issue得分.csv',
      ]);
    } finally {
      click.mockRestore();
      URL.createObjectURL = originalCreate;
      URL.revokeObjectURL = originalRevoke;
    }
  });
});
