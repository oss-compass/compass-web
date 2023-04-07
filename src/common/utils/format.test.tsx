import { formatRepoName, shortenAxisLabel } from './format';

describe('format', () => {
  it('formatRepoName', function () {
    const result = formatRepoName({
      label: 'https://github.com/oss-compass/compass-web',
      compareLabels: [
        'https://github.com/oss-compass/compass-web',
        'https://github.com/xxxx/compass-web',
        'https://gitee.com/oss-compass/compass-web',
      ],
    });
    expect(result).toEqual({
      name: 'compass-web',
      meta: {
        namespace: 'oss-compass',
        provider: 'Github',
        showProvider: true,
      },
    });
  });
});
