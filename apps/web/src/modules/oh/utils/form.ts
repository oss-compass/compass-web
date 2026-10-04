export const validateCommitSHA = (_, value) => {
  const commitSHARegex = /^[0-9a-f]{40}$/;
  if (!value || commitSHARegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('请输入有效的 commit SHA'));
};
export const validateCoderUrl = (_, value) => {
  const validHosts = ['github.com', 'gitee.com', 'gitcode.com'];
  try {
    const url = new URL(value);
    if (
      ['http:', 'https:'].includes(url.protocol) &&
      validHosts.includes(url.hostname) &&
      url.pathname.split('/').filter(Boolean).length >= 2
    ) {
      return Promise.resolve();
    }
  } catch {
    // Malformed or relative URLs cannot identify a supported source repository.
  }
  return Promise.reject(new Error('请输入正确的Github、Gitee、Gitcode仓库'));
};
