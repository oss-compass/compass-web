import { formatRepoName, shortenAxisLabel, roundedNum } from './format';

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
