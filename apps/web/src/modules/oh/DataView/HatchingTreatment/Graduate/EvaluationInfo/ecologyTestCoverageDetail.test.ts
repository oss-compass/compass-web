import { formatEcologyTestCoverageDetail } from './ecologyTestCoverageDetail';

describe('formatEcologyTestCoverageDetail', () => {
  it('renders the SonarQube ratios as percentages on the 0-100 scale', () => {
    expect(
      formatEcologyTestCoverageDetail({
        coverageRatio: 83,
        coverageScore: 10,
        duplicationRatio: 2,
        duplicationScore: 10,
      })
    ).toBe(
      '测试覆盖率：83%；测试覆盖率得分：10；代码重复率：2%；代码重复率得分：10；'
    );
  });

  it('does not multiply the ratio by 100 again', () => {
    const detailText = formatEcologyTestCoverageDetail({
      coverageRatio: 83,
      coverageScore: 10,
      duplicationRatio: 2,
      duplicationScore: 10,
    });

    expect(detailText).not.toContain('8300');
    expect(detailText).not.toContain('200');
  });

  it('keeps a fractional ratio as it comes from the API', () => {
    expect(
      formatEcologyTestCoverageDetail({
        coverageRatio: 83.5,
        coverageScore: 10,
        duplicationRatio: 4.25,
        duplicationScore: 8,
      })
    ).toBe(
      '测试覆盖率：83.5%；测试覆盖率得分：10；代码重复率：4.25%；代码重复率得分：8；'
    );
  });

  it('keeps a zero ratio visible', () => {
    expect(
      formatEcologyTestCoverageDetail({
        coverageRatio: 0,
        coverageScore: 0,
        duplicationRatio: 0,
        duplicationScore: 10,
      })
    ).toBe(
      '测试覆盖率：0%；测试覆盖率得分：0；代码重复率：0%；代码重复率得分：10；'
    );
  });

  it('skips ratios and scores that are absent', () => {
    expect(
      formatEcologyTestCoverageDetail({
        coverageRatio: 83,
        coverageScore: null,
        duplicationRatio: null,
        duplicationScore: 10,
      })
    ).toBe('测试覆盖率：83%；');

    expect(
      formatEcologyTestCoverageDetail({
        coverageRatio: null,
        coverageScore: null,
        duplicationRatio: null,
        duplicationScore: null,
      })
    ).toBe('无');

    expect(
      formatEcologyTestCoverageDetail({
        coverageRatio: undefined,
        coverageScore: undefined,
        duplicationRatio: undefined,
        duplicationScore: undefined,
      })
    ).toBe('无');
  });
});
