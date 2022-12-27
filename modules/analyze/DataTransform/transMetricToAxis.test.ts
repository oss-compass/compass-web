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
});
