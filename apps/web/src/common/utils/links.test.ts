import {
  compareIdsAdd,
  compareIdsRemove,
  compareIdsJoin,
  compareIdsSplit,
  getShortAnalyzeLink,
  getShortCompareLink,
  getDeveloperLink,
} from './links';

describe('links', () => {
  it('compareIdsAdd', function () {
    expect(compareIdsAdd('s35ic7p4', 's35icxd4')).toBe('s35ic7p4..s35icxd4');
    expect(compareIdsAdd('', 's35icxd4')).toBe('s35icxd4');
  });

  it('compareIdsRemove', function () {
    expect(compareIdsRemove('s35ic7p4..s35icxd4', 's35icxd4')).toBe('s35ic7p4');
    expect(compareIdsRemove('', 's35icxd4')).toBe('');
  });

  it('compareIdsJoin', function () {
    expect(compareIdsJoin(['s35ic7p4', 's35ic7p4'])).toBe('s35ic7p4');
  });

  it('compareIdsSplit', function () {
    expect(compareIdsSplit('s35ic7p4..s35icxd4')).toStrictEqual([
      's35ic7p4',
      's35icxd4',
    ]);
    expect(compareIdsSplit('')).toStrictEqual([]);
  });

  it('getShortAnalyzeLink', function () {
    expect(getShortAnalyzeLink('S35IC7P4')).toBe('/analyze/S35IC7P4');
  });

  it('getShortCompareLink', () => {
    expect(getShortCompareLink(['S35IC7P4', 'S35ICXD4'])).toBe(
      '/compare/S35IC7P4..S35ICXD4'
    );
  });

  it('getDeveloperLink', () => {
    expect(getDeveloperLink('https://github.com/EdmondFrank')).toBe(
      '/developer/github/EdmondFrank'
    );
    expect(getDeveloperLink('https://gitee.com/dotnetchina')).toBe(
      '/developer/gitee/dotnetchina'
    );
    expect(getDeveloperLink('https://gitcode.com/openharmony-sig')).toBe(
      '/developer/gitcode/openharmony-sig'
    );
    expect(getDeveloperLink('https://atomgit.com/openharmony')).toBe(
      '/developer/atomgit/openharmony'
    );
  });
});
