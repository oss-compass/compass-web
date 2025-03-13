export const validateCommitSHA = (_, value) => {
  const commitSHARegex = /^[0-9a-f]{40}$/;
  if (!value || commitSHARegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('请输入有效的 commit SHA'));
};
export const validateCoderUrl = (_, value) => {
  if (value?.includes('gitcode.com')) {
    return Promise.reject(
      new Error('Gitcode平台尚未支持！请选择Github或Gitee仓库')
    );
  }
  return Promise.resolve();
};
