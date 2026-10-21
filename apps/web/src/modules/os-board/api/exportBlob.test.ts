import { buildExportBlob } from './tableData';

describe('buildExportBlob', () => {
  it('keeps the response content type', () => {
    // Without the type the JSON error guard in downloadExportFile never matches.
    expect(
      buildExportBlob(new Blob(['{}']), 'application/json').type
    ).toBe('application/json');
    expect(
      buildExportBlob(new Blob(['a,b']), 'text/csv; charset=utf-8').type
    ).toBe('text/csv; charset=utf-8');
  });

  it('falls back to an empty type when the header is missing', () => {
    expect(buildExportBlob(new Blob(['x']), undefined).type).toBe('');
    expect(buildExportBlob(new Blob(['x']), null).type).toBe('');
  });
});
