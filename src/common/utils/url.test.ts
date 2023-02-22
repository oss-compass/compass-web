import {
  getPathname,
  getProvider,
  getNameSpace,
  getRepoName,
  getLastPathSegment,
  removeExtname,
} from './url';

describe('utils url ', () => {
  it('getPathname', () => {
    const testCases = [
      {
        input: 'https://github.com/EdmondFrank/.emacs.d',
        result: 'EdmondFrank/.emacs.d',
      },
      {
        input: 'https://github.com/ant-design/ant-design',
        result: 'ant-design/ant-design',
      },
      {
        input: 'https://gitee.com/dotnetchina/MiniWord',
        result: 'dotnetchina/MiniWord',
      },
    ];
    testCases.map((item) => {
      expect(getPathname(item.input)).toEqual(item.result);
    });
  });

  it('getProvider', () => {
    const testCases = [
      { input: 'https://github.com/EdmondFrank/.emacs.d', result: 'github' },
      { input: 'https://github.com/ant-design/ant-design', result: 'github' },
      { input: 'https://gitee.com/dotnetchina/MiniWord', result: 'gitee' },
    ];
    testCases.map((item) => {
      expect(getProvider(item.input)).toEqual(item.result);
    });
  });

  it('getLastPathSegment', () => {
    const testCases = [
      { input: 'https://github.com/EdmondFrank/.emacs.d', result: '.emacs.d' },
      {
        input: 'https://github.com/ant-design/ant-design',
        result: 'ant-design',
      },
      { input: 'https://gitee.com/dotnetchina/MiniWord', result: 'MiniWord' },
    ];

    testCases.map((item) => {
      expect(getLastPathSegment(item.input)).toEqual(item.result);
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

  it('removeUrlDotGit', function () {
    const testCases = [
      {
        input: 'https://github.com/EdmondFrank/.emacs.d',
        result: 'https://github.com/EdmondFrank/.emacs.d',
      },
      {
        input: 'https://github.com/ant-design/ant-design.git',
        result: 'https://github.com/ant-design/ant-design',
      },
      {
        input: undefined,
        result: '',
      },
    ];

    testCases.map((item) => {
      expect(removeExtname(item.input, '.git')).toEqual(item.result);
    });
  });
});
