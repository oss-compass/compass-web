import { toFixed } from '@common/utils';

export type EcologyTestCoverageDetail = {
  coverageRatio: number | null | undefined;
  coverageScore: number | null | undefined;
  duplicationRatio: number | null | undefined;
  duplicationScore: number | null | undefined;
};

const hasValue = (value: number | null | undefined): value is number =>
  typeof value === 'number';

/**
 * Detail text of the graduation "测试覆盖度" metric.
 *
 * `coverage_ratio` / `duplication_ratio` are produced by
 * `tpc_software_graduation_report_metric.rb#get_ecology_test_coverage` from the SonarQube
 * measures (`measure['value'].to_i`) and scored against 0..100 ranges
 * (`80% - 100% => 10 分`), so they are already percentages and must not be multiplied by
 * 100 again.
 */
export const formatEcologyTestCoverageDetail = ({
  coverageRatio,
  coverageScore,
  duplicationRatio,
  duplicationScore,
}: EcologyTestCoverageDetail): string => {
  let res = '';
  if (hasValue(coverageRatio)) {
    res += `测试覆盖率：${toFixed(coverageRatio, 2) + '%'}；`;
    if (hasValue(coverageScore)) {
      res += `测试覆盖率得分：${coverageScore}；`;
    }
  }
  if (hasValue(duplicationRatio)) {
    res += `代码重复率：${toFixed(duplicationRatio, 2) + '%'}；`;
    if (hasValue(duplicationScore)) {
      res += `代码重复率得分：${duplicationScore}；`;
    }
  }
  return res || '无';
};
