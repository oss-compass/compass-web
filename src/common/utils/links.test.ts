import { getShortAnalyzeLink, getShortCompareLink } from './links';

describe('links', () => {
  it('getShortAnalyzeLink', function () {
    expect(getShortAnalyzeLink('S35IC7P4')).toBe('/analyze/S35IC7P4');
  });

  it('getShortCompareLink', () => {
    expect(getShortCompareLink(['S35IC7P4', 'S35ICXD4'])).toBe(
      '/compare/S35IC7P4..S35ICXD4'
    );
  });
});
