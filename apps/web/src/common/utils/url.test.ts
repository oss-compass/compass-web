import {
  getPathname,
  getProvider,
  getNameSpace,
  getRepoName,
  getLastPathSegment,
  getRepoOrigin,
  getRepoPath,
  getRepoUrlByName,
  removeExtname,
  removeTrailingSlash,
  getNameSpacePng,
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
      { input: 'http://gitcode.com/org/repo', result: 'gitcode' },
    ];
    testCases.map((item) => {
      expect(getProvider(item.input)).toEqual(item.result);
    });
  });

  it('getRepoOrigin', () => {
    const testCases = [
      { input: 'https://github.com/ant-design/ant-design', result: 'github' },
      { input: 'gitee:dotnetchina/MiniWord', result: 'gitee' },
      { input: 'gitcode.com/org/repo', result: 'gitcode' },
      { input: 'owner/repo', result: 'gitcode', fallbackOrigin: 'gitcode' },
    ];

    testCases.map((item) => {
      expect(getRepoOrigin(item.input, item.fallbackOrigin)).toEqual(
        item.result
      );
    });
  });

  it('getRepoPath', () => {
    const testCases = [
      {
        input: 'https://github.com/ant-design/ant-design',
        result: 'ant-design/ant-design',
      },
      { input: 'gitee:dotnetchina/MiniWord', result: 'dotnetchina/MiniWord' },
      { input: 'gitcode.com/org/repo', result: 'org/repo' },
      { input: 'owner/repo', result: 'owner/repo' },
    ];

    testCases.map((item) => {
      expect(getRepoPath(item.input)).toEqual(item.result);
    });
  });

  it('getRepoUrlByName', () => {
    const testCases = [
      {
        input: 'https://github.com/ant-design/ant-design/',
        result: 'https://github.com/ant-design/ant-design',
      },
      {
        input: 'gitee:dotnetchina/MiniWord',
        result: 'https://gitee.com/dotnetchina/MiniWord',
      },
      {
        input: 'gitcode.com/org/repo',
        result: 'https://gitcode.com/org/repo',
      },
      {
        input: 'owner/repo',
        result: 'https://gitcode.com/owner/repo',
        fallbackOrigin: 'gitcode',
      },
    ];

    testCases.map((item) => {
      expect(getRepoUrlByName(item.input, item.fallbackOrigin)).toEqual(
        item.result
      );
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
        input: 'https://gitee.com/dotnetchina/MiniWord/',
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
        input: 'https://gitee.com/dotnetchina/MiniWord/',
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

  it('removeTrailingSlash', function () {
    const testCases = [
      {
        input: 'EdmondFrank/.emacs.d/',
        result: 'EdmondFrank/.emacs.d',
      },
      {
        input: 'ant-design/ant-design/',
        result: 'ant-design/ant-design',
      },
      {
        input: undefined,
        result: '',
      },
    ];

    testCases.map((item) => {
      expect(removeTrailingSlash(item.input)).toEqual(item.result);
    });
  });

  it('getNameSpacePng', function () {
    const testCases = [
      {
        input: 'https://github.com/EdmondFrank/.emacs.d',
        result: 'https://github.com/EdmondFrank.png',
      },
      {
        input: 'https://github.com/ant-design/ant-design.git',
        result: 'https://github.com/ant-design.png',
      },
      {
        input: undefined,
        result: '/images/default.png',
      },
    ];

    testCases.map((item) => {
      expect(getNameSpacePng(item.input)).toEqual(item.result);
    });
  });
});
