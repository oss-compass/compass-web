import { convertResult } from './utils';
import { DataContainerResult } from '@modules/analyze/type';

const buildResult = (
  partial: Partial<DataContainerResult>
): DataContainerResult => ({
  isCompare: false,
  compareLabels: [],
  xAxis: ['2024-01-01'],
  yResults: [],
  summaryMean: [],
  summaryMedian: [],
  ...partial,
});

describe('UpdatedSince convertResult', () => {
  it('converts mean and median independently from months to days', () => {
    const result = convertResult(
      buildResult({ summaryMean: [2], summaryMedian: [3] })
    );

    expect(result.summaryMean).toEqual([60]);
    // 回归点：median 必须由 summaryMedian 换算（3×30），
    // 而不是错误地借用已换算过的 summaryMean（2×30×30=1800）
    expect(result.summaryMedian).toEqual([90]);
  });

  it('converts each y series value', () => {
    const result = convertResult(
      buildResult({
        yResults: [
          {
            label: 'a',
            level: 'community',
            legendName: 'a',
            key: 'a',
            data: [1, 2],
          },
        ] as any,
      })
    );

    expect(result.yResults[0].data).toEqual([30, 60]);
  });

  it('leaves non-numeric summary values untouched', () => {
    const result = convertResult(
      buildResult({ summaryMean: ['-'], summaryMedian: [null as any] })
    );

    expect(result.summaryMean).toEqual(['-']);
    expect(result.summaryMedian).toEqual([null]);
  });
});
