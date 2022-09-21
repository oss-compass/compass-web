import { getHostLabel, repoUrlFormatForChart } from './url';

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

  it('repoUrlFormatForChart', () => {
    const testCases = [
      {
        input: 'https://github.com/EdmondFrank/.emacs.d',
        result: 'github EdmondFrank/.emacs.d',
      },
      {
        input: 'https://github.com/ant-design/ant-design',
        result: 'github ant-design/ant-design',
      },
      {
        input: 'https://gitee.com/dotnetchina/MiniWord',
        result: 'gitee dotnetchina/MiniWord',
      },
    ];

    testCases.map((item) => {
      expect(repoUrlFormatForChart(item.input)).toEqual(item.result);
    });
  });
});
