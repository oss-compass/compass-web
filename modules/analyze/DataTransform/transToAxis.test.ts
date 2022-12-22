import { formatRepoNameV2, transToAxis } from './transToAxis';
import inputData from './testdata/input.json';
import outputData from './testdata/output.json';
import { Level } from '@modules/analyze/constant';

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

  it('checkHasSameRepoPath', function () {});

  it('formatRepoNameV2', function () {
    const result = formatRepoNameV2({
      label: 'https://github.com/oss-compass/compass-web',
      compareLabels: [
        'https://github.com/oss-compass/compass-web',
        'https://github.com/xxxx/compass-web',
        'https://gitee.com/oss-compass/compass-web',
      ],
    });
    expect(result).toEqual({
      name: 'compass-web',
      meta: {
        namespace: 'oss-compass',
        provider: 'Github',
        showProvider: true,
      },
    });
  });
});
