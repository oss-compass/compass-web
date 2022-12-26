import { transDataToAxis } from './transToAxisWithSummary';
import inputData from './testdata/inputWithSummary.json';
import outputWithSummary from './testdata/outputWithSummary.json';

describe('transToAxis', () => {
  it('transToAxis', function () {
    const config = {
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.activeC1PrCommentsContributorCount',
    };

    // @ts-ignore
    const result = transDataToAxis(inputData, config);
    expect(result).toEqual(outputWithSummary);
  });
});
