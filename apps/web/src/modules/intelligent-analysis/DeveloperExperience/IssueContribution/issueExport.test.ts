import {
  collectReportPainIssues,
  downloadCsv,
  downloadCsvResponse,
  escapeCsvCell,
  exportIssueScores,
  exportPainIssues,
} from './issueExport';
import type { IssueReportPain, IssueScoreRow } from './types';

describe('downloadCsvResponse', () => {
  const mockAnchor = () => {
    const filenames: string[] = [];
    const click = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(function (this: HTMLAnchorElement) {
        filenames.push(this.download);
      });
    return { click, filenames };
  };

  it('downloads the server CSV with the filename from Content-Disposition', async () => {
    const create = jest.fn<string, [Blob]>(() => 'blob:export');
    const revoke = jest.fn();
    const originalCreate = URL.createObjectURL;
    const originalRevoke = URL.revokeObjectURL;
    URL.createObjectURL = create;
    URL.revokeObjectURL = revoke;
    const { click, filenames } = mockAnchor();
    const response = {
      ok: true,
      headers: {
        get: () => 'attachment; filename="issue_pains_2026-11-17.csv"',
      },
      blob: async () => new Blob(['a,b\n1,2']),
    } as unknown as Response;
    try {
      await downloadCsvResponse(response, '痛点_全部.csv');
      expect(filenames).toEqual(['issue_pains_2026-11-17.csv']);
      expect(create).toHaveBeenCalledWith(expect.any(Blob));
      expect(click).toHaveBeenCalledTimes(1);
      expect(revoke).toHaveBeenCalledWith('blob:export');
    } finally {
      click.mockRestore();
      URL.createObjectURL = originalCreate;
      URL.revokeObjectURL = originalRevoke;
    }
  });

  it('falls back to the local filename and prefers UTF-8 filenames', async () => {
    const { click, filenames } = mockAnchor();
    const originalCreate = URL.createObjectURL;
    const originalRevoke = URL.revokeObjectURL;
    URL.createObjectURL = () => 'blob:export';
    URL.revokeObjectURL = () => undefined;
    try {
      await downloadCsvResponse(
        {
          ok: true,
          headers: { get: () => null },
          blob: async () => new Blob([]),
        } as unknown as Response,
        'fallback.csv'
      );
      await downloadCsvResponse(
        {
          ok: true,
          headers: {
            get: () =>
              'attachment; filename="plain.csv"; filename*=UTF-8\'\'%E7%97%9B%E7%82%B9.csv',
          },
          blob: async () => new Blob([]),
        } as unknown as Response,
        'fallback.csv'
      );
      expect(filenames).toEqual(['fallback.csv', '痛点.csv']);
    } finally {
      click.mockRestore();
      URL.createObjectURL = originalCreate;
      URL.revokeObjectURL = originalRevoke;
    }
  });

  it('throws the server error message without downloading', async () => {
    const { click, filenames } = mockAnchor();
    try {
      await expect(
        downloadCsvResponse(
          {
            ok: false,
            status: 503,
            statusText: 'Service Unavailable',
            text: async () => '数据尚未就绪，请稍后重试',
          } as unknown as Response,
          'fallback.csv'
        )
      ).rejects.toThrow('数据尚未就绪，请稍后重试');
      expect(click).not.toHaveBeenCalled();
      expect(filenames).toEqual([]);
    } finally {
      click.mockRestore();
    }
  });
});

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
