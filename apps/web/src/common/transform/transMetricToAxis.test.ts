import transMetricToAxis from './transMetricToAxis';
import inputData from './testdata/transMetricToAxis.input.json';
import outputWithSummary from './testdata/transMetricToAxis.output.json';

describe('transMetricToAxis', () => {
  it('transMetricToAxis', function () {
    const config = {
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.activeC1PrCommentsContributorCount',
    };

    // @ts-ignore
    const result = transMetricToAxis(inputData, config);
    expect(result).toEqual(outputWithSummary);
  });

  it('keeps the series empty when a label has no metric result yet', function () {
    const config = {
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.activeC1PrCommentsContributorCount',
    };

    // 一个数据源可能还没有返回，result 为 undefined（类型上就是可选的）
    const labelsData = [{ label: 'repo-a', level: 'repo', result: undefined }];

    // @ts-ignore
    const result = transMetricToAxis(labelsData, config);
    expect(result).toBeTruthy();
  });
});
