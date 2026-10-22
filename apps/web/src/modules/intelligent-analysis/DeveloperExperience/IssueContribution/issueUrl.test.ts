import { resolveIssueUrl } from './issueUrl';

describe('resolveIssueUrl', () => {
  it('rebuilds missing GitCode links from report identity', () => {
    expect(resolveIssueUrl('', 'gitcode', 'cann/cannbot-dsl', '41')).toBe(
      'https://gitcode.com/cann/cannbot-dsl/issues/41'
    );
  });
  it('supports GitHub and preserves existing links', () => {
    expect(resolveIssueUrl('', 'github', 'org/repo', '49')).toBe(
      'https://github.com/org/repo/issues/49'
    );
    expect(
      resolveIssueUrl('https://gitcode.com/cann/cannbot-dsl/issues/50')
    ).toBe('https://gitcode.com/cann/cannbot-dsl/issues/50');
  });
  it('does not link to the current page or invent a platform', () => {
    expect(resolveIssueUrl('')).toBeUndefined();
    expect(resolveIssueUrl('', 'unknown', 'org/repo', '53')).toBeUndefined();
    expect(resolveIssueUrl('javascript:alert(1)')).toBeUndefined();
  });
});
