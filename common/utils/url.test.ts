import { getHostLabel, repoUrlFormat } from './url';

describe('utils url ', () => {
  it('getHostLabel', () => {
    const testCases = [
      {
        input: 'https://github.com/EdmondFrank/.emacs.d',
        result: 'github',
      },
      {
        input: 'https://github.com/ant-design/ant-design',
        result: 'github',
      },
      {
        input: 'https://gitee.com/dotnetchina/MiniWord',
        result: 'gitee',
      },
    ];
    testCases.map((item) => {
      expect(getHostLabel(item.input)).toEqual(item.result);
    });
  });

  it('repoUrlFormat', () => {
    const testCases = [
      {
        input: 'https://github.com/EdmondFrank/.emacs.d',
        result: 'github .emacs.d',
      },
      {
        input: 'https://github.com/ant-design/ant-design',
        result: 'github ant-design',
      },
      {
        input: 'https://gitee.com/dotnetchina/MiniWord',
        result: 'gitee MiniWord',
      },
    ];

    testCases.map((item) => {
      expect(repoUrlFormat(item.input)).toEqual(item.result);
    });
  });
});
