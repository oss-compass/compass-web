import transToAxisWithSummary from './transToAxisWithSummary';
import inputData from './testdata/inputWithSummary.json';
import outputWithSummary from './testdata/outputWithSummary.json';

describe('transToAxis', () => {
  it('transToAxis', function () {
    const config = {
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.activeC1PrCommentsContributorCount',
      statKey: 'summaryCodequality.activeC1PrCommentsContributorCount',
    };

    // @ts-ignore
    const result = transToAxisWithSummary(inputData, config);
    expect(result).toEqual(outputWithSummary);
  });
});
