import { transToAxis } from './transToAxis';
import inputData from './testdata/input.json';
import outputData from './testdata/output.json';

describe('transToAxis', () => {
  it('transToAxis', function () {
    // @ts-ignore
    const result = transToAxis(inputData, {
      metricType: 'metricCodequality',
      xAxisKey: 'grimoireCreationDate',
      yAxisOpts: [
        {
          legendName: 'Commit Frequency',
          valueKey: 'commitFrequency',
        },
        {
          legendName: 'Code Quality',
          valueKey: 'codeQualityGuarantee',
        },
      ],
    });
    expect(result).toEqual(outputData);
  });
});
