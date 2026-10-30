import { downloadCsv, escapeCsvCell, exportPainIssues } from './issueExport';

describe('Issue CSV export', () => {
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
    const click = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    try {
      exportPainIssues(
        Array.from({ length: 12 }, (_, i) => ({
          number: String(i),
          score: 60,
          metric_code: 'metric',
        }))
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
    } finally {
      click.mockRestore();
      URL.createObjectURL = originalCreate;
      URL.revokeObjectURL = originalRevoke;
    }
  });
});
