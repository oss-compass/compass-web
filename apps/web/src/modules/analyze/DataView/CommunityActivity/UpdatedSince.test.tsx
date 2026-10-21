jest.mock('@modules/analyze/components/CardDropDownMenu', () => ({
  __esModule: true,
  default: () => null,
}));

import { convertResult } from './UpdatedSince';
import { DataContainerResult } from '@modules/analyze/type';

describe('convertResult', () => {
  it('converts the median series from its own values, not the mean series', () => {
    const result = convertResult({
      summaryMean: [1, 2],
      summaryMedian: [3, 4],
      yResults: [{ name: 'a', data: [1, 2] }],
    } as unknown as DataContainerResult);
    expect(result.summaryMean).toEqual([30, 60]);
    expect(result.summaryMedian).toEqual([90, 120]);
  });
});
