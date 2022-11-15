import { getHostLabel, repoUrlFormat, getNameSpace, getRepoName } from './url';

describe('utils url ', () => {
  it('getHostLabel', () => {
    const testCases = [
      { input: 'https://github.com/EdmondFrank/.emacs.d', result: 'github' },
      { input: 'https://github.com/ant-design/ant-design', result: 'github' },
      { input: 'https://gitee.com/dotnetchina/MiniWord', result: 'gitee' },
    ];
    testCases.map((item) => {
      expect(getHostLabel(item.input)).toEqual(item.result);
    });
  });

  it('repoUrlFormat', () => {
    const testCases = [
      { input: 'https://github.com/EdmondFrank/.emacs.d', result: '.emacs.d' },
      {
        input: 'https://github.com/ant-design/ant-design',
        result: 'ant-design',
      },
      { input: 'https://gitee.com/dotnetchina/MiniWord', result: 'MiniWord' },
    ];

    testCases.map((item) => {
      expect(repoUrlFormat(item.input)).toEqual(item.result);
    });
  });

  it('getNameSpace', function () {
    const testCases = [
      {
        input: 'https://github.com/EdmondFrank/.emacs.d',
        result: 'EdmondFrank',
      },
      {
        input: 'https://github.com/ant-design/ant-design',
        result: 'ant-design',
      },
      {
        input: 'https://gitee.com/dotnetchina/MiniWord',
        result: 'dotnetchina',
      },
    ];

    testCases.map((item) => {
      expect(getNameSpace(item.input)).toEqual(item.result);
    });
  });

  it('getRepoName', function () {
    const testCases = [
      {
        input: 'https://github.com/EdmondFrank/.emacs.d',
        result: '.emacs.d',
      },
      {
        input: 'https://github.com/ant-design/ant-design',
        result: 'ant-design',
      },
      {
        input: 'https://gitee.com/dotnetchina/MiniWord',
        result: 'MiniWord',
      },
    ];

    testCases.map((item) => {
      expect(getRepoName(item.input)).toEqual(item.result);
    });
  });
});
