export const validateCommitSHA = (_, value) => {
  const commitSHARegex = /^[0-9a-f]{40}$/;
  if (!value || commitSHARegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('请输入有效的 commit SHA'));
};
export const validateCoderUrl = (_, value) => {
  const validHosts = ['github.com', 'gitee.com', 'gitcode.com'];
  for (let host of validHosts) {
    if (value?.includes(host)) {
      return Promise.resolve();
    }
  }
  return Promise.reject(new Error('请输入正确的Github、Gitee、Gitcode仓库'));
};
