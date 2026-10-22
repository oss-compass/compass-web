export const resolveIssueUrl = (
  url?: string,
  platform?: string,
  community?: string,
  number?: string
): string | undefined => {
  const original = url?.trim();
  if (original && /^https?:\/\//i.test(original)) return original;
  const hosts: Record<string, string> = {
    gitcode: 'gitcode.com',
    github: 'github.com',
  };
  const host = hosts[platform?.toLowerCase() ?? ''];
  const repo = community?.trim();
  const issueNumber = number?.replace(/^#/, '').trim();
  if (
    !host ||
    !repo ||
    !/^[^/\s]+\/[^/\s]+$/.test(repo) ||
    !/^\d+$/.test(issueNumber ?? '')
  ) {
    return undefined;
  }
  return `https://${host}/${repo
    .split('/')
    .map(encodeURIComponent)
    .join('/')}/issues/${issueNumber}`;
};
