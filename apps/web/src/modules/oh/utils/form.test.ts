import { validateCoderUrl, validateCommitSHA } from './form';

describe('source repository URL validation', () => {
  it.each([
    'https://github.com/owner/repo',
    'https://gitee.com/owner/repo.git',
    'https://gitcode.com/owner/repo/',
    'http://github.com/owner/repo',
    'https://GITHUB.COM/owner/repo',
  ])('accepts a repository on a supported host: %s', async (value) => {
    await expect(validateCoderUrl(null, value)).resolves.toBeUndefined();
  });

  it.each([
    'https://github.com.example.org/owner/repo',
    'https://example.org/github.com/owner/repo',
    'https://example.org/?repo=https://gitee.com/owner/repo',
    'https://github.com@example.org/owner/repo',
    'https://notgithub.com/owner/repo',
    'ftp://github.com/owner/repo',
    'github.com/owner/repo',
    'https://github.com',
    'https://github.com/owner',
    '',
    undefined,
  ])(
    'rejects a value that is not a supported repository URL: %s',
    async (value) => {
      await expect(validateCoderUrl(null, value)).rejects.toThrow(
        '请输入正确的Github、Gitee、Gitcode仓库'
      );
    }
  );

  it('retains the independent optional commit SHA validation', async () => {
    await expect(
      validateCommitSHA(null, 'a'.repeat(40))
    ).resolves.toBeUndefined();
    await expect(validateCommitSHA(null, '')).resolves.toBeUndefined();
    await expect(validateCommitSHA(null, 'invalid')).rejects.toThrow();
  });
});
