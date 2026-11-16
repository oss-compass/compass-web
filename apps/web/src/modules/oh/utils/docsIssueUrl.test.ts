import { buildDocsIssueUrl } from './utils';

describe('buildDocsIssueUrl', () => {
  it('encodes the title and the body', () => {
    const url = buildDocsIssueUrl('A & B 报告', 'line1 & line2');

    expect(url).toContain('title=A%20%26%20B%20%E6%8A%A5%E5%91%8A');
    expect(url).toContain('description=line1%20%26%20line2');
    expect(url).not.toContain('title=A & B');
  });

  it('does not let a "&" in the title start a new query parameter', () => {
    const url = buildDocsIssueUrl('a&b=c', 'x');

    expect(url.split('?')[1].split('&')).toHaveLength(2);
  });
});
