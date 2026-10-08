import {
  formatRepoName,
  checkHasSameRepoPath,
  shortenAxisLabel,
  roundedNum,
} from './format';

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

  it('formatRepoName does not mark unrelated repos as the same repository', function () {
    // Regression: apache/dubbo is a substring of apache/dubbo-go, so the old
    // substring check counted two distinct repos as the same one and the legend
    // rendered the wrong provider for both of them.
    const result = formatRepoName({
      label: 'https://github.com/apache/dubbo',
      compareLabels: [
        'https://github.com/apache/dubbo',
        'https://github.com/apache/dubbo-go',
      ],
    });
    expect(result).toEqual({
      name: 'dubbo',
      meta: {
        namespace: 'apache',
        provider: 'Github',
        showProvider: false,
      },
    });
  });

  it('formatRepoName marks the same repo across providers despite trailing slash and case', function () {
    // Regression: getPathname kept the trailing slash, so
    // github.com/oss-compass/compass-web/ never matched
    // gitee.com/oss-compass/compass-web and the same repo was left without a
    // provider, producing two identical legend entries.
    const result = formatRepoName({
      label: 'https://github.com/oss-compass/compass-web/',
      compareLabels: [
        'https://github.com/oss-compass/compass-web/',
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

  it('formatRepoName ignores non-URL labels', function () {
    expect(
      formatRepoName({
        label: 'compass-web',
        compareLabels: ['compass-web', 'gitee.com/oss-compass/compass-web'],
      })
    ).toEqual({ name: 'compass-web' });
  });

  it('checkHasSameRepoPath only matches the exact repository path', function () {
    const testCases = [
      {
        // apache/dubbo is a substring of apache/dubbo-go, so the previous
        // indexOf-based check wrongly reported these as the same repo.
        label: 'https://github.com/apache/dubbo',
        labels: [
          'https://github.com/apache/dubbo',
          'https://github.com/apache/dubbo-go',
        ],
        result: false,
      },
      {
        label: 'https://github.com/cli/cli',
        labels: [
          'https://github.com/cli/cli',
          'https://github.com/cli/cli-extra',
        ],
        result: false,
      },
      {
        // Two completely unrelated repos must never be flagged.
        label: 'https://github.com/apache/dubbo',
        labels: [
          'https://github.com/apache/dubbo',
          'https://github.com/spring-projects/spring-boot',
        ],
        result: false,
      },
      {
        // Same repo on two hosts is the intended positive case.
        label: 'https://github.com/cli/cli',
        labels: ['https://github.com/cli/cli', 'https://gitee.com/cli/cli'],
        result: true,
      },
      {
        // Trailing slashes used to break the equality check.
        label: 'https://github.com/oss-compass/compass-web/',
        labels: [
          'https://github.com/oss-compass/compass-web/',
          'https://gitee.com/oss-compass/compass-web',
        ],
        result: true,
      },
      {
        // Case differences must not hide the same repo either.
        label: 'https://github.com/OSS-Compass/Compass-Web',
        labels: [
          'https://github.com/OSS-Compass/Compass-Web',
          'https://gitee.com/oss-compass/compass-web',
        ],
        result: true,
      },
      {
        // The label does not have to be present in compareLabels.
        label: 'https://github.com/cli/cli',
        labels: ['https://gitee.com/cli/cli', 'https://gitcode.com/cli/cli'],
        result: true,
      },
      {
        // Duplicates on a single provider have nothing to disambiguate.
        label: 'https://github.com/apache/dubbo',
        labels: [
          'https://github.com/apache/dubbo',
          'https://github.com/apache/dubbo',
        ],
        result: false,
      },
      {
        // Non-URL labels cannot be compared reliably.
        label: 'apache/dubbo',
        labels: ['apache/dubbo', 'gitee.com/apache/dubbo'],
        result: false,
      },
      {
        label: 'https://github.com/apache/dubbo',
        labels: [],
        result: false,
      },
    ];
    testCases.forEach((item) => {
      expect(checkHasSameRepoPath(item.label, item.labels)).toBe(item.result);
    });
  });

  it('shortenAxisLabel ', function () {
    expect(shortenAxisLabel('10000')).toEqual('10k');
    expect(shortenAxisLabel('10001')).toEqual('10k');
    expect(shortenAxisLabel('10200')).toEqual('10.2k');
    expect(shortenAxisLabel('1000009')).toEqual('1m');
  });

  it('roundedNum', function () {
    expect(roundedNum(1.2345)).toEqual(1.23);
    expect(roundedNum(1.2345, 3)).toEqual(1.235);
    expect(roundedNum(100000)).toEqual(100000);
  });
});
